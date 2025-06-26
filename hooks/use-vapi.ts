import { useEffect, useRef, useState, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

interface AssistantConfig {
  unintegratedAssistantId: string;
  marketingAssistantId: string;
}

const useVapi = () => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [conversation, setConversation] = useState<{ role: string, text: string }[]>([]);
  const [assistantConfig, setAssistantConfig] = useState<AssistantConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  const vapiRef = useRef<any>(null);

  // Fetch assistant configuration from API
  const fetchAssistantConfig = useCallback(async () => {
    try {
      setConfigLoading(true);
      const response = await fetch('/api/assistant/config');
      if (!response.ok) {
        throw new Error('Failed to fetch assistant configuration');
      }
      const config = await response.json();
      setAssistantConfig(config);
      setConfigError(null);
    } catch (error) {
      console.error('Error fetching assistant config:', error);
      setConfigError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setConfigLoading(false);
    }
  }, []);

  const initializeVapi = useCallback(() => {
    if (!publicKey) {
      console.error('NEXT_PUBLIC_VAPI_PUBLIC_KEY is not defined');
      return;
    }

    if (!vapiRef.current) {
      const vapiInstance = new Vapi(publicKey);
      vapiRef.current = vapiInstance;

      vapiInstance.on('call-start', () => {
        setIsSessionActive(true);
      });

      vapiInstance.on('call-end', () => {
        setIsSessionActive(false);
        setConversation([]); // Reset conversation on call end
      });

      vapiInstance.on('volume-level', (volume: number) => {
        setVolumeLevel(volume);
      });

      vapiInstance.on('message', (message: any) => {
        if (message.type === 'transcript' && message.transcriptType === 'final') {
          setConversation((prev) => [
            ...prev,
            { role: message.role, text: message.transcript },
          ]);
        }
      });

      vapiInstance.on('error', (e: Error) => {
        console.error('Vapi error:', e);
      });
    }
  }, []);

  useEffect(() => {
    fetchAssistantConfig();
    initializeVapi();

    // Cleanup function to end call and dispose Vapi instance
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    };
  }, [fetchAssistantConfig, initializeVapi]);

  const toggleCall = async (assistantType: 'unintegrated' | 'marketing' = 'unintegrated') => {
    if (!assistantConfig) {
      console.error('Assistant configuration not loaded');
      return;
    }

    const assistantId = assistantType === 'unintegrated' 
      ? assistantConfig.unintegratedAssistantId 
      : assistantConfig.marketingAssistantId;

    if (!assistantId) {
      console.error(`${assistantType} assistant ID is not defined`);
      return;
    }

    try {
      if (isSessionActive) {
        await vapiRef.current.stop();
      } else {
        await vapiRef.current.start(assistantId);
      }
    } catch (err) {
      console.error('Error toggling Vapi session:', err);
    }
  };

  return { 
    volumeLevel, 
    isSessionActive, 
    conversation, 
    toggleCall, 
    assistantConfig,
    configLoading,
    configError
  };
};

export default useVapi; 