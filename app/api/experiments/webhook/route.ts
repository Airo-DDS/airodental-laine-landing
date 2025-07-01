import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a default value to prevent build errors
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');
const VAPI_API_KEY = process.env.VAPI_API_KEY;

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Check if API keys are properly configured
  if (!process.env.RESEND_API_KEY || !VAPI_API_KEY) {
    return NextResponse.json({ error: 'API keys not configured' }, { status: 500 });
  }

  // We only care about the 'call.ending' message
  if (body.message.type !== 'call.ending') {
    return NextResponse.json({ status: 'ignored, not a call.ending event' });
  }

  const callId = body.message.call.id;

  try {
    // Fetch the full call details from VAPI
    const vapiResponse = await fetch(`https://api.vapi.ai/call/${callId}`, {
      headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` },
    });
    const callDetails = await vapiResponse.json();

    const summary = callDetails.analysis?.summary;
    const userEmail = callDetails.analysis?.structuredData?.email;

    if (!summary || !userEmail) {
      console.log(`Call ${callId} ended without a summary or extracted email.`);
      return NextResponse.json({ status: 'ignored, missing data' });
    }

    // Send email to the caller
    await resend.emails.send({
      from: 'Laine from AiroDental <onboarding@resend.dev>', // Replace with your verified Resend domain
      to: userEmail,
      subject: 'Your Call Summary from AiroDental',
      html: `<p>Hi there,</p><p>Thanks for calling. Here is a summary of our conversation:</p><blockquote>${summary}</blockquote><p>Best,</p><p>The AiroDental Team</p>`,
    });

    // Send email to the CEO
    await resend.emails.send({
      from: 'Laine Experiment Bot <onboarding@resend.dev>', // Replace with your verified Resend domain
      to: 'deren@airodental.com',
      subject: `New Experiment Call Summary - ${userEmail}`,
      html: `<p>A new call was completed with ${userEmail}.</p><p><strong>Summary:</strong></p><blockquote>${summary}</blockquote><p>Call ID: ${callId}</p>`,
    });

    return NextResponse.json({ status: 'emails sent successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
} 