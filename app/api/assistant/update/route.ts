import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: string;
  content: string;
}

interface Assistant {
  model?: {
    messages?: Message[];
  };
}

// GET endpoint to fetch current assistant data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assistantType = searchParams.get('assistant'); // 'marketing' or default (main)
    
    const vapiApiKey = process.env.VAPI_API_KEY;
    let assistantId: string | undefined;
    
    if (assistantType === 'marketing') {
      assistantId = process.env.VAPI_MARKETING_ASSISTANT_ID;
    } else {
      assistantId = process.env.VAPI_UNINTEGRATED_ASSISTANT_ID || process.env.VAPI_UNINTEGRATED_ASSISTANT_ID;
    }
    
    if (!vapiApiKey) {
      return NextResponse.json(
        { error: 'Vapi API key not configured' },
        { status: 500 }
      );
    }

    if (!assistantId) {
      return NextResponse.json(
        { error: `${assistantType === 'marketing' ? 'Marketing assistant' : 'Main assistant'} ID not configured` },
        { status: 500 }
      );
    }

    // Fetch current assistant data
    const response = await fetch(`https://api.vapi.ai/assistant/${assistantId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Vapi API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch assistant data' },
        { status: response.status }
      );
    }

    const assistantData: Assistant = await response.json();

    // Extract the current system prompt from the model messages
    const systemMessage = assistantData.model?.messages?.find(
      (msg: Message) => msg.role === 'system'
    );

    return NextResponse.json({
      success: true,
      assistant: assistantData,
      assistantType: assistantType || 'main',
      currentSystemPrompt: systemMessage?.content || ''
    });

  } catch (error) {
    console.error('Error fetching assistant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update system prompt
export async function PATCH(request: NextRequest) {
  try {
    const { systemPrompt, assistantType } = await request.json();

    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'System prompt is required' },
        { status: 400 }
      );
    }

    // Determine assistant ID based on type
    let assistantId: string | undefined;
    if (assistantType === 'marketing') {
      assistantId = process.env.VAPI_MARKETING_ASSISTANT_ID;
    } else {
      assistantId = process.env.VAPI_UNINTEGRATED_ASSISTANT_ID || process.env.VAPI_UNINTEGRATED_ASSISTANT_ID;
    }

    if (!assistantId) {
      return NextResponse.json(
        { error: `${assistantType === 'marketing' ? 'Marketing assistant' : 'Main assistant'} ID not configured` },
        { status: 500 }
      );
    }

    const vapiApiKey = process.env.VAPI_API_KEY;
    
    if (!vapiApiKey) {
      return NextResponse.json(
        { error: 'Vapi API key not configured' },
        { status: 500 }
      );
    }

    // First, fetch the current assistant data
    const getCurrentResponse = await fetch(`https://api.vapi.ai/assistant/${assistantId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!getCurrentResponse.ok) {
      const errorData = await getCurrentResponse.text();
      console.error('Vapi API error (fetch):', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch current assistant data' },
        { status: getCurrentResponse.status }
      );
    }

    const currentAssistant: Assistant = await getCurrentResponse.json();

    // Preserve existing model configuration and update only the system message
    const updatedModel = {
      ...currentAssistant.model,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        // Keep any non-system messages
        ...(currentAssistant.model?.messages?.filter((msg: Message) => msg.role !== 'system') || [])
      ]
    };

    // Update the assistant with new system prompt while preserving other settings
    const updateResponse = await fetch(`https://api.vapi.ai/assistant/${assistantId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${vapiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: updatedModel
      }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.text();
      console.error('Vapi API error (update):', errorData);
      return NextResponse.json(
        { error: 'Failed to update assistant' },
        { status: updateResponse.status }
      );
    }

    const updatedAssistant = await updateResponse.json();

    return NextResponse.json({
      success: true,
      message: 'System prompt updated successfully',
      assistant: updatedAssistant
    });

  } catch (error) {
    console.error('Error updating assistant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 