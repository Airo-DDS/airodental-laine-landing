'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface SystemPromptFormProps {
  assistantType: 'main' | 'marketing';
  title: string;
  description: string;
  systemPrompt: string;
  setSystemPrompt: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  accentColor: string;
}

export default function SystemPromptForm({
  assistantType,
  title,
  description,
  systemPrompt,
  setSystemPrompt,
  isLoading,
  setIsLoading,
  accentColor,
}: SystemPromptFormProps) {

  // Auto-load current prompt when component mounts
  useEffect(() => {
    loadCurrentPrompt();
  }, [assistantType]); // Reload when assistant type changes

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!systemPrompt.trim()) {
      toast.error('System prompt cannot be empty');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/assistant/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: systemPrompt.trim(), assistantType }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`${title} system prompt updated successfully! 🎉`);
      } else {
        toast.error(data.error || `Failed to update ${title} system prompt`);
      }
    } catch (error) {
      console.error(`Error updating ${assistantType} prompt:`, error);
      toast.error('A network error occurred while updating the system prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCurrentPrompt = async () => {
    setIsLoading(true);
    try {
      const url = assistantType === 'marketing' ? '/api/assistant/update?assistant=marketing' : '/api/assistant/update';
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();

      if (response.ok) {
        const promptContent = data.currentSystemPrompt || '';
        setSystemPrompt(promptContent);
        if (promptContent) {
          toast.success(`${title} configuration loaded successfully`);
        } else {
          toast.info(`No ${title.toLowerCase()} system prompt found - you can create one`);
        }
      } else {
        console.error(`Error loading ${assistantType} prompt:`, data);
        toast.error(data.error || `Failed to load ${title.toLowerCase()} configuration`);
      }
    } catch (error) {
      console.error(`Error loading ${assistantType} prompt:`, error);
      toast.error(`Network error while loading ${title.toLowerCase()} configuration`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        <div className="mt-4">
          <button
            onClick={loadCurrentPrompt}
            disabled={isLoading}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Reload Current Prompt'}
          </button>
        </div>
      </div>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor={`${assistantType}-prompt`} className="block text-lg font-medium text-gray-700 mb-3">
            System Prompt
          </label>
          {isLoading ? (
            <div className="w-full h-64 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                <span>Loading current system prompt...</span>
              </div>
            </div>
          ) : (
            <textarea
              id={`${assistantType}-prompt`}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={12}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm font-mono focus:ring-[${accentColor}]`}
              placeholder={`Enter the system prompt for the ${title.toLowerCase()}...`}
              required
            />
          )}
          <p className="mt-2 text-sm text-gray-500">
            {assistantType === 'main' 
              ? 'This prompt defines how the main LAINE assistant behaves and responds to users.'
              : 'This prompt defines how the marketing LAINE assistant behaves when users engage via the floating button.'
            }
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">Characters: {systemPrompt.length}</div>
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
              className={`px-8 py-2 text-white rounded-md transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
              style={{ backgroundColor: accentColor }}
              onMouseEnter={(e) => {
                if (!isLoading && systemPrompt.trim()) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update {title}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 