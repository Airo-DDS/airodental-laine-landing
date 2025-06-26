import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = {
      unintegratedAssistantId: process.env.VAPI_UNINTEGRATED_ASSISTANT_ID,
      marketingAssistantId: process.env.VAPI_MARKETING_ASSISTANT_ID,
    };

    // Check if required environment variables are defined
    if (!config.unintegratedAssistantId || !config.marketingAssistantId) {
      return NextResponse.json(
        { error: 'Assistant IDs not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching assistant config:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 