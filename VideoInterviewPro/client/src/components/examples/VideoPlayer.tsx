import VideoPlayer from '../VideoPlayer';

export default function VideoPlayerExample() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <VideoPlayer 
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="Welcome to Your Interview"
        description="Please watch this introductory video before beginning your interview"
        onVideoEnd={() => console.log('Video ended')}
      />
    </div>
  );
}
