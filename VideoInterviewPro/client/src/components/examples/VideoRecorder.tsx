import VideoRecorder from '../VideoRecorder';

export default function VideoRecorderExample() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <VideoRecorder 
        questionNumber={1}
        questionText="Tell us about a challenging project you worked on and how you overcame obstacles."
        candidateName="John Doe"
        onRecordingComplete={(blob, fileName) => console.log('Recording complete:', fileName, blob.size, 'bytes')}
      />
    </div>
  );
}
