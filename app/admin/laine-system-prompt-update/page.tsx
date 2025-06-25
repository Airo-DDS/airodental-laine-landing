"use client"

import { useState, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

export default function SystemPromptUpdatePage() {
  // States for Main Assistant
  const [systemPrompt, setSystemPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(true)
  
  // States for Marketing Assistant
  const [marketingSystemPrompt, setMarketingSystemPrompt] = useState('')
  const [isMarketingLoading, setIsMarketingLoading] = useState(false)
  const [isMarketingLoadingCurrent, setIsMarketingLoadingCurrent] = useState(true)
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminKey, setAdminKey] = useState('')

  // Load current system prompts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentSystemPrompt()
      loadCurrentMarketingSystemPrompt()
    }
  }, [isAuthenticated])

  const loadCurrentSystemPrompt = async () => {
    setIsLoadingCurrent(true)
    try {
      const response = await fetch('/api/assistant/update', {
        method: 'GET',
      })

      const data = await response.json()

      if (response.ok) {
        setSystemPrompt(data.currentSystemPrompt || '')
        if (data.currentSystemPrompt) {
          toast.success('Main assistant system prompt loaded successfully')
        } else {
          toast.info('No main assistant system prompt found - you can create one')
        }
      } else {
        toast.error(data.error || 'Failed to load main assistant system prompt')
      }
    } catch (error) {
      console.error('Error loading current prompt:', error)
      toast.error('Failed to load main assistant system prompt')
    } finally {
      setIsLoadingCurrent(false)
    }
  }

  const loadCurrentMarketingSystemPrompt = async () => {
    setIsMarketingLoadingCurrent(true)
    try {
      const response = await fetch('/api/assistant/update?assistant=marketing', {
        method: 'GET',
      })

      const data = await response.json()

      if (response.ok) {
        setMarketingSystemPrompt(data.currentSystemPrompt || '')
        if (data.currentSystemPrompt) {
          toast.success('Marketing assistant system prompt loaded successfully')
        } else {
          toast.info('No marketing assistant system prompt found - you can create one')
        }
      } else {
        toast.error(data.error || 'Failed to load marketing assistant system prompt')
      }
    } catch (error) {
      console.error('Error loading marketing prompt:', error)
      toast.error('Failed to load marketing assistant system prompt')
    } finally {
      setIsMarketingLoadingCurrent(false)
    }
  }

  // Simple authentication check
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // You can change this to any password you want
    if (adminKey === 'laine-admin-2024') {
      setIsAuthenticated(true)
      toast.success('Authentication successful')
    } else {
      toast.error('Invalid admin key')
    }
  }

  const handleUpdatePrompt = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!systemPrompt.trim()) {
      toast.error('Main assistant system prompt cannot be empty')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/assistant/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: systemPrompt.trim(),
          assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Main assistant system prompt updated successfully! 🎉')
      } else {
        toast.error(data.error || 'Failed to update main assistant system prompt')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateMarketingPrompt = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!marketingSystemPrompt.trim()) {
      toast.error('Marketing assistant system prompt cannot be empty')
      return
    }

    setIsMarketingLoading(true)

    try {
      const response = await fetch('/api/assistant/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: marketingSystemPrompt.trim(),
          assistantId: process.env.NEXT_PUBLIC_VAPI_MARKETING_ASSISTANT_ID
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Marketing assistant system prompt updated successfully! 🎉')
      } else {
        toast.error(data.error || 'Failed to update marketing assistant system prompt')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Network error occurred')
    } finally {
      setIsMarketingLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Toaster position="top-center" richColors />
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter admin key to access system prompt configuration</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Key
              </label>
              <input
                type="password"
                id="adminKey"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09474C] focus:border-transparent"
                placeholder="Enter admin key"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#09474C] text-white py-2 px-4 rounded-md hover:bg-[#083c40] transition-colors duration-200 font-medium"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (isLoadingCurrent || isMarketingLoadingCurrent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Toaster position="top-center" richColors />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09474C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading current system prompts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster position="top-center" richColors />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LAINE System Prompt Configuration</h1>
          <p className="text-gray-600">Update the system prompts for both LAINE assistants.</p>
        </div>

        {/* Main Assistant Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Main Assistant (Unintegrated)</h2>
            <p className="text-gray-600">System prompt for the main LAINE assistant used in the hero section.</p>
            
            <div className="mt-4">
              <button
                onClick={loadCurrentSystemPrompt}
                disabled={isLoadingCurrent}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {isLoadingCurrent ? 'Loading...' : 'Reload Current Prompt'}
              </button>
            </div>
          </div>

          <form onSubmit={handleUpdatePrompt} className="space-y-6">
            <div>
              <label htmlFor="systemPrompt" className="block text-lg font-medium text-gray-700 mb-3">
                System Prompt
              </label>
              <textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09474C] focus:border-transparent resize-none text-sm font-mono"
                placeholder="Enter the system prompt for the main LAINE assistant..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                This prompt defines how the main LAINE assistant behaves and responds to users.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Characters: {systemPrompt.length}
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSystemPrompt('')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  disabled={isLoading}
                >
                  Clear
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading || !systemPrompt.trim()}
                  className="px-8 py-2 bg-[#09474C] text-white rounded-md hover:bg-[#083c40] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Main Assistant</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Marketing Assistant Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketing Assistant</h2>
            <p className="text-gray-600">System prompt for the marketing LAINE assistant in the floating button.</p>
            
            <div className="mt-4">
              <button
                onClick={loadCurrentMarketingSystemPrompt}
                disabled={isMarketingLoadingCurrent}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {isMarketingLoadingCurrent ? 'Loading...' : 'Reload Current Prompt'}
              </button>
            </div>
          </div>

          <form onSubmit={handleUpdateMarketingPrompt} className="space-y-6">
            <div>
              <label htmlFor="marketingSystemPrompt" className="block text-lg font-medium text-gray-700 mb-3">
                Marketing System Prompt
              </label>
              <textarea
                id="marketingSystemPrompt"
                value={marketingSystemPrompt}
                onChange={(e) => setMarketingSystemPrompt(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c33764] focus:border-transparent resize-none text-sm font-mono"
                placeholder="Enter the system prompt for the marketing LAINE assistant..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                This prompt defines how the marketing LAINE assistant behaves when users engage via the floating button.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Characters: {marketingSystemPrompt.length}
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setMarketingSystemPrompt('')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  disabled={isMarketingLoading}
                >
                  Clear
                </button>
                
                <button
                  type="submit"
                  disabled={isMarketingLoading || !marketingSystemPrompt.trim()}
                  className="px-8 py-2 bg-[#c33764] text-white rounded-md hover:bg-[#a12b54] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isMarketingLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Marketing Assistant</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">💡 Tips for Writing Effective System Prompts:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
                         <li>• Define LAINE&apos;s role and expertise clearly</li>
            <li>• Specify the tone and personality you want</li>
            <li>• Include any specific instructions or constraints</li>
            <li>• Mention how to handle dental-specific scenarios</li>
            <li>• For marketing: Focus on lead generation and product education</li>
            <li>• For main assistant: Focus on technical support and guidance</li>
            <li>• Keep it concise but comprehensive</li>
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
} 