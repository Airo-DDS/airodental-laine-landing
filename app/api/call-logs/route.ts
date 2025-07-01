import { NextResponse } from 'next/server';

// TypeScript interfaces based on VAPI documentation
interface VAPICall {
  id: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  endedAt?: string;
  status: string;
  type: string;
  cost?: number;
  analysis?: {
    summary?: string;
  };
  artifact?: {
    transcript?: string;
    recordingUrl?: string;
    recording?: {
      stereoUrl?: string;
      mono?: {
        combinedUrl?: string;
      };
    };
  };
}

// Simplified call object for frontend
interface CallLogItem {
  id: string;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  status: string;
  type: string;
  cost?: number;
  summary?: string;
  transcript?: string;
  recordingUrl?: string;
  duration?: number;
}

export async function GET() {
  try {
    const vapiApiKey = process.env.VAPI_API_KEY;
    
    if (!vapiApiKey) {
      return NextResponse.json(
        { error: 'VAPI API key not configured' },
        { status: 500 }
      );
    }

    // Fetch calls from VAPI
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vapiApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('VAPI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch call logs' },
        { status: response.status }
      );
    }

    const calls: VAPICall[] = await response.json();

    // Transform calls into simplified format for frontend
    const callLogs: CallLogItem[] = calls.map(call => {
      // Calculate duration if both start and end times exist
      let duration: number | undefined;
      if (call.startedAt && call.endedAt) {
        const start = new Date(call.startedAt).getTime();
        const end = new Date(call.endedAt).getTime();
        duration = Math.round((end - start) / 1000); // duration in seconds
      }

      // Get recording URL (prefer stereo, fallback to combined)
      let recordingUrl: string | undefined;
      if (call.artifact?.recording?.stereoUrl) {
        recordingUrl = call.artifact.recording.stereoUrl;
      } else if (call.artifact?.recording?.mono?.combinedUrl) {
        recordingUrl = call.artifact.recording.mono.combinedUrl;
      } else if (call.artifact?.recordingUrl) {
        recordingUrl = call.artifact.recordingUrl;
      }

      return {
        id: call.id,
        createdAt: call.createdAt,
        startedAt: call.startedAt,
        endedAt: call.endedAt,
        status: call.status,
        type: call.type,
        cost: call.cost,
        summary: call.analysis?.summary,
        transcript: call.artifact?.transcript,
        recordingUrl,
        duration,
      };
    });

    // Sort by creation date (newest first)
    callLogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      callLogs,
      total: callLogs.length,
    });

  } catch (error) {
    console.error('Error fetching call logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 