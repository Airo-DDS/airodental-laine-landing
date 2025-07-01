import { NextResponse } from 'next/server';

export async function GET() {
  const VAPI_API_KEY = process.env.VAPI_API_KEY;
  const EXPERIMENT_ASSISTANT_ID = process.env.VAPI_EMAIL_EXPERIMENT_ASSISTANT_ID;

  if (!VAPI_API_KEY || !EXPERIMENT_ASSISTANT_ID) {
    return NextResponse.json({ error: 'API Key or Assistant ID not configured' }, { status: 500 });
  }

  try {
    const url = `https://api.vapi.ai/call?assistantId=${EXPERIMENT_ASSISTANT_ID}&limit=1`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch latest call from VAPI');
    }

    const data = await response.json();
    // The API returns an array, so we return the first element or null
    return NextResponse.json(data[0] || null);
  } catch (error) {
    console.error('Error fetching latest call:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 