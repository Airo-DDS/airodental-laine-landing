"use client"

import { useState } from 'react'
import { toast, Toaster } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useVapi from '@/hooks/use-vapi'
import SystemPromptForm from '@/components/admin/SystemPromptForm'

export default function SystemPromptUpdatePage() {
  // States for Main Assistant
  const [systemPrompt, setSystemPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // States for Marketing Assistant
  const [marketingSystemPrompt, setMarketingSystemPrompt] = useState('')
  const [isMarketingLoading, setIsMarketingLoading] = useState(false)
  
  // Voice configuration states
  const [selectedAssistant, setSelectedAssistant] = useState<'main' | 'marketing'>('main')
  const [currentVoice, setCurrentVoice] = useState({ provider: '', voiceId: '' })

  // Voice options
  const voiceOptions = {
    elevenlabs: [
      { name: 'Thayer', id: 'Zw3H3VuToVuSpGZZCXA0' },
      { name: 'Callen', id: 'KpjFQOwd4HKC7aZE2njc' },
      { name: 'Marin', id: 'Bba1XLLs3Isa9TJ3MH3L' },
    ],
    vapi: [
      { name: 'Elliot', id: 'elliot' },
    ],
  }

  // Initialize VAPI hook
  const { isSessionActive, toggleCall } = useVapi()

  // No need to load prompts on mount - the SystemPromptForm component handles this

  // Voice configuration handlers
  const handleSaveVoice = async () => {
    if (!currentVoice.provider || !currentVoice.voiceId) {
      toast.error('Please select both voice provider and voice')
      return
    }

    try {
      const response = await fetch('/api/assistant/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantType: selectedAssistant,
          voice: currentVoice
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`Voice configuration updated successfully for ${selectedAssistant} assistant! 🎉`)
      } else {
        toast.error(data.error || 'Failed to update voice configuration')
      }
    } catch (error) {
      console.error('Error updating voice:', error)
      toast.error('Network error occurred')
    }
  }

  const handlePreviewVoice = () => {
    if (!currentVoice.provider || !currentVoice.voiceId) {
      toast.error('Please select both voice provider and voice')
      return
    }

    const assistantType = selectedAssistant === 'main' ? 'unintegrated' : 'marketing'
    toggleCall(assistantType, { voice: currentVoice })
  }



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster position="top-center" richColors />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LAINE Configuration Panel</h1>
          <p className="text-gray-600">Update system prompts and voice configurations for both LAINE assistants.</p>
        </div>

        {/* System Prompts Card */}
        <Card>
          <CardHeader>
            <CardTitle>System Prompts</CardTitle>
            <CardDescription>Configure the behavior and personality of both LAINE assistants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <SystemPromptForm
              assistantType="main"
              title="Main Assistant"
              description="System prompt for the main LAINE assistant used in the hero section."
              systemPrompt={systemPrompt}
              setSystemPrompt={setSystemPrompt}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              accentColor="#09474C"
            />
            
            <SystemPromptForm
              assistantType="marketing"
              title="Marketing Assistant"
              description="System prompt for the marketing LAINE assistant in the floating button."
              systemPrompt={marketingSystemPrompt}
              setSystemPrompt={setMarketingSystemPrompt}
              isLoading={isMarketingLoading}
              setIsLoading={setIsMarketingLoading}
              accentColor="#c33764"
            />
          </CardContent>
        </Card>

        {/* Voice Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>Voice Configuration</CardTitle>
            <CardDescription>Configure and preview voice settings for LAINE assistants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Assistant Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Assistant</label>
                <Select value={selectedAssistant} onValueChange={(value: 'main' | 'marketing') => setSelectedAssistant(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assistant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Assistant</SelectItem>
                    <SelectItem value="marketing">Marketing Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Voice Provider Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Voice Provider</label>
                <Select 
                  value={currentVoice.provider} 
                  onValueChange={(value) => setCurrentVoice({ provider: value, voiceId: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                    <SelectItem value="vapi">VAPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Voice ID Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Voice</label>
                <Select 
                  value={currentVoice.voiceId} 
                  onValueChange={(value) => setCurrentVoice({ ...currentVoice, voiceId: value })}
                  disabled={!currentVoice.provider}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentVoice.provider && voiceOptions[currentVoice.provider as keyof typeof voiceOptions]?.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePreviewVoice}
                disabled={!currentVoice.provider || !currentVoice.voiceId}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSessionActive ? 'Stop Preview' : 'Preview Voice'}
              </button>
              
              <button
                type="button"
                onClick={handleSaveVoice}
                disabled={!currentVoice.provider || !currentVoice.voiceId}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Voice
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">💡 Tips for Configuration:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>System Prompts:</strong> Define LAINE&apos;s role, personality, and expertise clearly</li>
            <li>• <strong>Voice Selection:</strong> Choose voices that match your brand and user expectations</li>
            <li>• <strong>Preview First:</strong> Always preview voice changes before saving</li>
            <li>• <strong>Main Assistant:</strong> Focus on technical support and guidance</li>
            <li>• <strong>Marketing Assistant:</strong> Focus on lead generation and product education</li>
            <li>• <strong>ElevenLabs:</strong> Premium quality voices with natural speech patterns</li>
            <li>• <strong>VAPI:</strong> Built-in voices optimized for real-time conversations</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 