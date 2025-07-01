'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';

interface CallData {
  id: string;
  endedAt: string;
  analysis?: {
    summary?: string;
    structuredData?: {
      email?: string;
    };
  };
}

// This is the full configuration we will send to VAPI
const getExperimentConfig = () => {
  // Use the deployed URL from environment variables
  const webhookUrl = `${process.env.NEXT_PUBLIC_URL}/api/experiments/webhook`;

  const systemPrompt = `[IDENTITY]
You are LAINE, an AI-powered dental receptionist for AiroDental. You&apos;re helpful, professional, and knowledgeable about dental services. Your main role is to assist patients with scheduling appointments, answering questions about dental procedures, and providing general information about the practice.

[PERSONALITY]
- Professional but friendly and approachable
- Patient and understanding when dealing with dental anxiety
- Knowledgeable about common dental procedures and terminology
- Efficient in gathering necessary information for appointments
- Empathetic to patient concerns and needs

[CORE RESPONSIBILITIES]
1. Schedule appointments for new and existing patients
2. Collect patient information (name, contact details, insurance information)
3. Answer questions about dental procedures and services
4. Provide practice information (location, hours, policies)
5. Handle appointment modifications and cancellations
6. Offer general dental health advice when appropriate

[EMAIL COLLECTION]
After confirming the appointment details and before delivering the [DEMO CLOSE SCRIPT], you must say:
"And just so I can send you a written summary of our conversation, what's the best email address for you?"
Wait for the user's response. Once you have the email, thank them and then proceed immediately to the [DEMO CLOSE SCRIPT]. Do not ask for spelling unless absolutely necessary.

[DEMO CLOSE SCRIPT]
Thank the patient for calling and confirm you've scheduled their appointment. Mention they'll receive confirmation details via email. End with: "We look forward to seeing you at AiroDental!"

[COMMUNICATION STYLE]
- Use clear, simple language
- Be concise but thorough
- Ask one question at a time to avoid overwhelming patients
- Confirm information to ensure accuracy
- Show enthusiasm about helping patients with their dental health

[PRACTICE INFORMATION]
Practice Name: AiroDental
Address: 7101 NW 150th St, Ste 100, Oklahoma City, OK 73142
Phone: Available through main number
Hours: Monday-Friday 8:00 AM - 5:00 PM (adjust as needed)

Remember to always be helpful, professional, and focused on providing excellent customer service while collecting the necessary information to assist patients effectively.`;

  return {
    model: {
      provider: 'openai',
      model: 'gpt-4-turbo',
      messages: [{ role: 'system', content: systemPrompt }],
    },
    analysisPlan: {
      summaryPlan: { enabled: true },
      structuredDataPlan: {
        enabled: true,
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'The email address provided by the caller.',
            },
          },
          required: ['email'],
        },
      },
    },
    hooks: [
      {
        on: 'call.ending',
        do: [{ type: 'webhook', url: webhookUrl }],
      },
    ],
  };
};

export default function ExperimentsPage() {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [latestCall, setLatestCall] = useState<CallData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  
  // Web call interface state
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);
  const vapiRef = useRef<Vapi | null>(null);

  const fetchLatestCall = async () => {
    setIsFetching(true);
    try {
      const response = await fetch('/api/experiments/latest-call');
      const data = await response.json();
      setLatestCall(data);
    } catch {
      toast.error('Failed to fetch latest call data.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchLatestCall();
  }, []);

  // Initialize VAPI for web calls
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      console.warn('NEXT_PUBLIC_VAPI_PUBLIC_KEY not found');
      return;
    }

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    // Event listeners
    vapi.on('call-start', () => {
      console.log('Web call started');
      setIsCallConnected(true);
      setTranscript([]);
      toast.success('Call connected!');
    });

    vapi.on('call-end', () => {
      console.log('Web call ended');
      setIsCallConnected(false);
      setIsSpeaking(false);
      toast.info('Call ended');
    });

    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
    });

    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        setTranscript(prev => [...prev, {
          role: message.role,
          text: message.transcript
        }]);
      }
    });

    vapi.on('error', (error) => {
      console.error('VAPI error:', error);
      toast.error('Call error occurred');
      setIsCallConnected(false);
      setIsSpeaking(false);
    });

    return () => {
      vapi?.stop();
    };
  }, []);

  const handleConfigureAssistant = async () => {
    if (!process.env.NEXT_PUBLIC_URL) {
      toast.error('NEXT_PUBLIC_URL environment variable is not set. Please configure your deployed URL.');
      return;
    }

    setIsConfiguring(true);
    toast.info('Configuring experiment assistant...');

    const config = getExperimentConfig();
    
    try {
      const response = await fetch('/api/assistant/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantType: 'experiment',
          systemPrompt: config.model.messages[0].content,
          analysisPlan: config.analysisPlan,
          hooks: config.hooks,
        }),
      });

      if (!response.ok) throw new Error('Failed to configure assistant');
      
      toast.success('Experiment assistant configured successfully!');
    } catch (error) {
      toast.error('Configuration failed. Check console for details.');
      console.error(error);
    } finally {
      setIsConfiguring(false);
    }
  };

  const startWebCall = () => {
    if (!vapiRef.current) {
      toast.error('VAPI not initialized');
      return;
    }

    // Use the experiment assistant ID from environment variable
    const assistantId = process.env.VAPI_EMAIL_EXPERIMENT_ASSISTANT_ID;
    
    if (!assistantId) {
      toast.error('VAPI_EMAIL_EXPERIMENT_ASSISTANT_ID environment variable is not set.');
      return;
    }

    vapiRef.current.start(assistantId);
  };

  const endWebCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Summary Experiment</CardTitle>
          <CardDescription>
            This will update the dedicated experiment assistant with the necessary prompt,
            analysis plan, and webhook to automatically email call summaries.
            <strong className="block mt-2 text-red-600">
              Warning: This is a destructive action and will overwrite the assistant&apos;s current configuration.
            </strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleConfigureAssistant} disabled={isConfiguring}>
            {isConfiguring ? 'Configuring...' : 'Run One-Time Configuration'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Latest Experiment Call</CardTitle>
            <CardDescription>
              Showing the summary and extracted data from the last call.
            </CardDescription>
          </div>
          <Button onClick={fetchLatestCall} disabled={isFetching} variant="outline">
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </Button>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <p>Loading latest call...</p>
          ) : latestCall ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Extracted Email:</h4>
                <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                  {latestCall.analysis?.structuredData?.email || 'Not found'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Call Summary:</h4>
                <p className="text-gray-700 border-l-4 pl-4 italic">
                  {latestCall.analysis?.summary || 'No summary available.'}
                </p>
              </div>
              <div className="text-xs text-gray-500 pt-2 border-t">
                Call ID: {latestCall.id} | Ended at: {new Date(latestCall.endedAt).toLocaleString()}
              </div>
            </div>
          ) : (
            <p>No calls found for the experiment assistant yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Web Call Interface</CardTitle>
          <CardDescription>
            Test the experiment assistant directly from your browser using VAPI&apos;s Web SDK.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isCallConnected ? (
            <div className="text-center">
              <Button
                onClick={startWebCall}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                disabled={!vapiRef.current}
              >
                🎤 Start Voice Call
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Click to start a voice conversation with the experiment assistant
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className="font-medium text-green-800">
                    {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
                  </span>
                </div>
                <Button
                  onClick={endWebCall}
                  variant="destructive"
                  size="sm"
                >
                  End Call
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <h4 className="font-semibold mb-3 text-gray-800">Live Transcript</h4>
                {transcript.length === 0 ? (
                  <p className="text-gray-500 italic">Conversation will appear here...</p>
                ) : (
                  <div className="space-y-2">
                    {transcript.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg max-w-[85%] ${
                          msg.role === 'user'
                            ? 'bg-blue-100 text-blue-900 ml-auto text-right'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <div className="text-xs font-medium mb-1 opacity-75">
                          {msg.role === 'user' ? 'You' : 'Assistant'}
                        </div>
                        <div className="text-sm">{msg.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                💡 <strong>Tip:</strong> Speak clearly and wait for the assistant to finish speaking before responding.
                The conversation will be analyzed for email extraction and summary generation.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 