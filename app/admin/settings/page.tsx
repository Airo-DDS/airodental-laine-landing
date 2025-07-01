"use client"

import { useState, useEffect, useCallback } from 'react'
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
  const [isVoiceLoading, setIsVoiceLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Voice options - Note: ElevenLabs uses "11labs" as provider value in Vapi API
  const voiceOptions = {
    "11labs": [
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

  // Load current voice configuration for selected assistant
  const loadCurrentVoiceConfig = useCallback(async (assistantType: 'main' | 'marketing') => {
    setIsVoiceLoading(true)
    try {
      const url = assistantType === 'marketing' ? '/api/assistant/update?assistant=marketing' : '/api/assistant/update'
      const response = await fetch(url, { method: 'GET' })
      const data = await response.json()

      if (response.ok && data.currentVoice) {
        const voice = data.currentVoice
        setCurrentVoice({
          provider: voice.provider || '',
          voiceId: voice.voiceId || ''
        })
        if (voice.provider && voice.voiceId) {
          toast.success(`${assistantType === 'main' ? 'Main' : 'Marketing'} assistant voice configuration loaded`)
        } else {
          toast.info(`No voice configuration found for ${assistantType} assistant`)
        }
      } else {
        console.error(`Error loading ${assistantType} voice config:`, data)
        toast.error(data.error || `Failed to load ${assistantType} assistant voice configuration`)
      }
    } catch (error) {
      console.error(`Error loading ${assistantType} voice config:`, error)
      toast.error(`Network error while loading ${assistantType} assistant voice configuration`)
    } finally {
      setIsVoiceLoading(false)
    }
  }, [])

  // Auto-load configurations when page loads
  useEffect(() => {
    const initializePage = async () => {
      setIsPageLoading(true)
      // Load voice configuration for the initially selected assistant
      await loadCurrentVoiceConfig('main') // Start with main assistant
      setIsPageLoading(false)
    }
    
    initializePage()
  }, [loadCurrentVoiceConfig]) // Only run on component mount

  // Load voice config when assistant selection changes
  useEffect(() => {
    if (!isPageLoading) { // Don't reload if page is still initializing
      loadCurrentVoiceConfig(selectedAssistant)
    }
  }, [selectedAssistant, loadCurrentVoiceConfig, isPageLoading])

  // Voice configuration handlers
  const handleSaveVoice = async () => {
    if (!currentVoice.provider || !currentVoice.voiceId) {
      toast.error('Please select both voice provider and voice')
      return
    }

    setIsVoiceLoading(true)
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
      toast.error('Network error occurred while updating voice configuration')
    } finally {
      setIsVoiceLoading(false)
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

  const handleReloadVoiceConfig = () => {
    loadCurrentVoiceConfig(selectedAssistant)
  }

  // Get current voice display name
  const getCurrentVoiceName = () => {
    if (!currentVoice.provider || !currentVoice.voiceId) return 'None selected'
    
    const provider = voiceOptions[currentVoice.provider as keyof typeof voiceOptions]
    if (provider) {
      const voice = provider.find(v => v.id === currentVoice.voiceId)
      const displayProvider = currentVoice.provider === '11labs' ? 'ElevenLabs' : currentVoice.provider
      return voice ? `${voice.name} (${displayProvider})` : currentVoice.voiceId
    }
    return currentVoice.voiceId
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

        {/* Loading overlay for initial page load */}
        {isPageLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-lg font-medium">Loading LAINE configurations...</span>
            </div>
          </div>
        )}

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
            {/* Current Voice Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Current Configuration</h4>
              <div className="text-sm text-blue-700">
                <p><strong>Assistant:</strong> {selectedAssistant === 'main' ? 'Main Assistant' : 'Marketing Assistant'}</p>
                <p><strong>Voice:</strong> {isVoiceLoading ? 'Loading...' : getCurrentVoiceName()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Assistant Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Assistant</label>
                <Select 
                  value={selectedAssistant} 
                  onValueChange={(value: 'main' | 'marketing') => setSelectedAssistant(value)}
                  disabled={isVoiceLoading}
                >
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
                  disabled={isVoiceLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11labs">ElevenLabs</SelectItem>
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
                  disabled={!currentVoice.provider || isVoiceLoading}
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
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleReloadVoiceConfig}
                disabled={isVoiceLoading}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVoiceLoading ? 'Loading...' : 'Reload Current Config'}
              </button>
              
              <button
                type="button"
                onClick={handlePreviewVoice}
                disabled={!currentVoice.provider || !currentVoice.voiceId || isVoiceLoading}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSessionActive ? 'Stop Preview' : 'Preview Voice'}
              </button>
              
              <button
                type="button"
                onClick={handleSaveVoice}
                disabled={!currentVoice.provider || !currentVoice.voiceId || isVoiceLoading}
                className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isVoiceLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Update Voice Configuration</span>
                )}
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