import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a default value to prevent build errors
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Test email endpoint called`);

  try {
    // Check if API key is properly configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy_key_for_build') {
      console.error(`[${timestamp}] ERROR: RESEND_API_KEY not configured`);
      return NextResponse.json({ 
        error: 'RESEND_API_KEY not configured',
        timestamp 
      }, { status: 500 });
    }

    const body = await request.json();
    const { to, subject, message } = body;

    // Set defaults
    const emailTo = to || 'deren@airodental.com';
    const emailSubject = subject || 'Test Email from AiroDental Laine Experiments';
    const emailMessage = message || 'This is a test email to verify that Resend is working correctly with your AiroDental Laine platform.';

    console.log(`[${timestamp}] Sending test email to: ${emailTo}`);
    console.log(`[${timestamp}] Email subject: ${emailSubject}`);

    // Send the test email
    const emailResult = await resend.emails.send({
      from: 'Laine Test <onboarding@resend.dev>', // Replace with your verified Resend domain
      to: emailTo,
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🧪 AiroDental Laine Test Email</h2>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #2563eb; padding-left: 16px; margin: 16px 0; color: #666;">
            ${emailMessage}
          </blockquote>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #666; font-size: 14px;">
            This email was sent as a test from the AiroDental Laine experiments system.<br>
            If you received this email, your Resend integration is working correctly! ✅
          </p>
        </div>
      `,
    });

    console.log(`[${timestamp}] ✅ Test email sent successfully:`, emailResult);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      details: {
        to: emailTo,
        subject: emailSubject,
        emailId: emailResult.data?.id,
        timestamp
      },
      resendResponse: emailResult
    });

  } catch (error) {
    console.error(`[${timestamp}] ❌ Failed to send test email:`, error);
    
    let errorMessage = 'Unknown error';
    let errorDetails = {};
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
      console.error(`[${timestamp}] Error details:`, errorDetails);
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to send test email',
      message: errorMessage,
      details: errorDetails,
      timestamp
    }, { status: 500 });
  }
}

export async function GET() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    message: 'Test Email API Endpoint',
    usage: 'POST to this endpoint with optional { "to", "subject", "message" } parameters',
    defaults: {
      to: 'deren@airodental.com',
      subject: 'Test Email from AiroDental Laine Experiments',
      message: 'This is a test email to verify that Resend is working correctly.'
    },
    timestamp,
    resendConfigured: !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'dummy_key_for_build'
  });
} 