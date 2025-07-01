'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// TypeScript interface matching our API response
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

interface CallLogsResponse {
  success: boolean;
  callLogs: CallLogItem[];
  total: number;
  error?: string;
}

export default function CallLogsPage() {
  const [callLogs, setCallLogs] = useState<CallLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<CallLogItem | null>(null);
  const [transcriptModalOpen, setTranscriptModalOpen] = useState(false);
  const [audioModalOpen, setAudioModalOpen] = useState(false);

  useEffect(() => {
    fetchCallLogs();
  }, []);

  const fetchCallLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/call-logs');
      const data: CallLogsResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch call logs');
      }
      
      if (data.success) {
        setCallLogs(data.callLogs);
      } else {
        throw new Error(data.error || 'Failed to fetch call logs');
      }
    } catch (err) {
      console.error('Error fetching call logs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch call logs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatCost = (cost?: number) => {
    if (cost === undefined) return 'N/A';
    return `$${cost.toFixed(4)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ended':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-gray-600">Loading call logs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Call Logs</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchCallLogs}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Call Logs</h1>
        <button
          onClick={fetchCallLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {callLogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No call logs found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callLogs.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">
                    {formatDate(call.createdAt)}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize">
                    {call.type.replace(/([A-Z])/g, ' $1').trim()}
                  </TableCell>
                  <TableCell>
                    {formatDuration(call.duration)}
                  </TableCell>
                  <TableCell>
                    {formatCost(call.cost)}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {call.transcript && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCall(call);
                          setTranscriptModalOpen(true);
                        }}
                      >
                        View Transcript
                      </Button>
                    )}
                    {call.recordingUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCall(call);
                          setAudioModalOpen(true);
                        }}
                      >
                        Play Recording
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <div className="text-sm text-gray-500 text-center">
        Showing {callLogs.length} call{callLogs.length !== 1 ? 's' : ''}
      </div>

      {/* Transcript Modal */}
      <Dialog open={transcriptModalOpen} onOpenChange={setTranscriptModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Call Transcript</DialogTitle>
            <DialogDescription>
              Call from {selectedCall ? formatDate(selectedCall.createdAt) : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedCall?.transcript ? (
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {selectedCall.transcript}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No transcript available for this call.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Audio Recording Modal */}
      <Dialog open={audioModalOpen} onOpenChange={setAudioModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Call Recording</DialogTitle>
            <DialogDescription>
              Call from {selectedCall ? formatDate(selectedCall.createdAt) : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedCall?.recordingUrl ? (
              <audio 
                controls 
                className="w-full"
                preload="none"
              >
                <source src={selectedCall.recordingUrl} type="audio/mpeg" />
                <source src={selectedCall.recordingUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-gray-500">No recording available for this call.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 