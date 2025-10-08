import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, Square, RotateCcw, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoRecorderProps {
  questionNumber: number;
  questionText: string;
  onRecordingComplete: (blob: Blob, fileName: string) => void;
  candidateName: string;
}

export default function VideoRecorder({ 
  questionNumber, 
  questionText, 
  onRecordingComplete,
  candidateName 
}: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      setStream(mediaStream);
      setPermissionGranted(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please grant camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const retryRecording = () => {
    setRecordedBlob(null);
    setRecordingTime(0);
    startCamera();
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const fileName = `${candidateName.replace(/\s+/g, '_')}_Question_${questionNumber}_${Date.now()}.webm`;
      onRecordingComplete(recordedBlob, fileName);
      
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm" data-testid="badge-question-number">
            Question {questionNumber}
          </Badge>
        </div>
        <h2 className="text-xl font-medium" data-testid="text-question">
          {questionText}
        </h2>
      </div>

      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted={!recordedBlob}
              playsInline
              src={recordedBlob ? URL.createObjectURL(recordedBlob) : undefined}
              className="w-full h-full"
              data-testid="video-preview"
            />
            
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive/90 px-3 py-2 rounded-lg">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" data-testid="indicator-recording" />
                <span className="text-white text-sm font-medium">Recording</span>
              </div>
            )}

            {isRecording && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-white font-mono text-lg" data-testid="text-recording-time">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4">
        {!recordedBlob && (
          <>
            {!isRecording ? (
              <Button
                size="lg"
                onClick={startRecording}
                disabled={!permissionGranted}
                className="h-16 px-8 text-base font-medium gap-2"
                data-testid="button-start-recording"
              >
                <Circle className="h-5 w-5" />
                Start Recording
              </Button>
            ) : (
              <Button
                size="lg"
                variant="destructive"
                onClick={stopRecording}
                className="h-16 px-8 text-base font-medium gap-2"
                data-testid="button-stop-recording"
              >
                <Square className="h-5 w-5" />
                Stop Recording
              </Button>
            )}
          </>
        )}

        {recordedBlob && (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={retryRecording}
              className="h-12 px-6 gap-2"
              data-testid="button-retry"
            >
              <RotateCcw className="h-5 w-5" />
              Re-record
            </Button>
            <Button
              size="lg"
              onClick={downloadRecording}
              className="h-12 px-8 text-base font-medium gap-2"
              data-testid="button-download"
            >
              <Download className="h-5 w-5" />
              Download & Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
