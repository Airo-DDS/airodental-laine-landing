import { NextResponse } from 'next/server';

export async function GET() {
  const assistantId = process.env.VAPI_EMAIL_EXPERIMENT_ASSISTANT_ID;

  if (!assistantId) {
    return NextResponse.json({ error: 'VAPI_EMAIL_EXPERIMENT_ASSISTANT_ID not configured' }, { status: 500 });
  }

  return NextResponse.json({ assistantId });
} 