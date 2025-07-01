import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a default value to prevent build errors
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');
const VAPI_API_KEY = process.env.VAPI_API_KEY;

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Webhook received`);
  
  try {
    const body = await request.json();
    console.log(`[${timestamp}] Webhook body:`, JSON.stringify(body, null, 2));

    // Check if API keys are properly configured
    if (!process.env.RESEND_API_KEY || !VAPI_API_KEY) {
      console.error(`[${timestamp}] ERROR: Missing API keys - RESEND_API_KEY: ${!!process.env.RESEND_API_KEY}, VAPI_API_KEY: ${!!VAPI_API_KEY}`);
      return NextResponse.json({ error: 'API keys not configured' }, { status: 500 });
    }

    // We only care about the 'call.ending' message
    if (body.message.type !== 'call.ending') {
      console.log(`[${timestamp}] Ignoring webhook event type: ${body.message.type}`);
      return NextResponse.json({ status: 'ignored, not a call.ending event' });
    }

    const callId = body.message.call.id;
    console.log(`[${timestamp}] Processing call.ending event for call ID: ${callId}`);

    // Fetch the full call details from VAPI
    console.log(`[${timestamp}] Fetching call details from VAPI for call ${callId}`);
    const vapiResponse = await fetch(`https://api.vapi.ai/call/${callId}`, {
      headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` },
    });
    
    if (!vapiResponse.ok) {
      console.error(`[${timestamp}] VAPI API error: ${vapiResponse.status} ${vapiResponse.statusText}`);
      return NextResponse.json({ error: 'Failed to fetch call details from VAPI' }, { status: 500 });
    }
    
    const callDetails = await vapiResponse.json();
    console.log(`[${timestamp}] Call details fetched:`, JSON.stringify(callDetails.analysis, null, 2));

    const summary = callDetails.analysis?.summary;
    const userEmail = callDetails.analysis?.structuredData?.email;

    console.log(`[${timestamp}] Extracted data - Email: ${userEmail}, Summary length: ${summary?.length || 0} chars`);

    if (!summary || !userEmail) {
      console.warn(`[${timestamp}] Call ${callId} ended without required data - Summary: ${!!summary}, Email: ${!!userEmail}`);
      return NextResponse.json({ status: 'ignored, missing data' });
    }

    // Send email to the caller
    console.log(`[${timestamp}] Attempting to send email to caller: ${userEmail}`);
    try {
      const callerEmailResult = await resend.emails.send({
        from: 'Laine from AiroDental <onboarding@resend.dev>', // Replace with your verified Resend domain
        to: userEmail,
        subject: 'Your Call Summary from AiroDental',
        html: `<p>Hi there,</p><p>Thanks for calling. Here is a summary of our conversation:</p><blockquote>${summary}</blockquote><p>Best,</p><p>The AiroDental Team</p>`,
      });
      console.log(`[${timestamp}] ✅ Caller email sent successfully:`, callerEmailResult);
    } catch (callerEmailError) {
      console.error(`[${timestamp}] ❌ Failed to send email to caller ${userEmail}:`, callerEmailError);
      // Continue to send CEO email even if caller email fails
    }

    // Send email to the CEO
    console.log(`[${timestamp}] Attempting to send email to CEO: deren@airodental.com`);
    try {
      const ceoEmailResult = await resend.emails.send({
        from: 'Laine Experiment Bot <onboarding@resend.dev>', // Replace with your verified Resend domain
        to: 'deren@airodental.com',
        subject: `New Experiment Call Summary - ${userEmail}`,
        html: `<p>A new call was completed with ${userEmail}.</p><p><strong>Summary:</strong></p><blockquote>${summary}</blockquote><p>Call ID: ${callId}</p>`,
      });
      console.log(`[${timestamp}] ✅ CEO email sent successfully:`, ceoEmailResult);
    } catch (ceoEmailError) {
      console.error(`[${timestamp}] ❌ Failed to send email to CEO:`, ceoEmailError);
    }

    console.log(`[${timestamp}] Webhook processing completed for call ${callId}`);
    return NextResponse.json({ 
      status: 'processing completed',
      callId,
      userEmail,
      timestamp
    });
    
  } catch (error) {
    console.error(`[${timestamp}] ❌ Critical error processing webhook:`, error);
    if (error instanceof Error) {
      console.error(`[${timestamp}] Error details:`, {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json({ 
      error: 'Failed to process webhook',
      timestamp,
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 