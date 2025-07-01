'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        on: 'call-end', // Note: VAPI docs sometimes use 'call.ending', but 'call-end' is also common. Verify if issues arise.
        do: [{ type: 'webhook', url: webhookUrl }],
      },
    ],
  };
};

export default function ExperimentsPage() {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [latestCall, setLatestCall] = useState<CallData | null>(null);
  const [isFetching, setIsFetching] = useState(true);

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
    </div>
  );
} 