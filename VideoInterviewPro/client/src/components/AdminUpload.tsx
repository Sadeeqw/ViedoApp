import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Video, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoFile {
  id: string;
  file: File;
  url: string;
  questionText: string;
}

export default function AdminUpload() {
  const [introVideo, setIntroVideo] = useState<VideoFile | null>(null);
  const [questionVideos, setQuestionVideos] = useState<VideoFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const introInputRef = useRef<HTMLInputElement>(null);
  const [currentQuestionText, setCurrentQuestionText] = useState("");

  const handleIntroVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const videoFile: VideoFile = {
        id: Date.now().toString(),
        file,
        url: URL.createObjectURL(file),
        questionText: "Introduction Video"
      };
      setIntroVideo(videoFile);
    }
  };

  const handleQuestionVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/') && questionVideos.length < 5) {
      const videoFile: VideoFile = {
        id: Date.now().toString(),
        file,
        url: URL.createObjectURL(file),
        questionText: currentQuestionText || `Question ${questionVideos.length + 1}`
      };
      setQuestionVideos([...questionVideos, videoFile]);
      setCurrentQuestionText("");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeIntroVideo = () => {
    if (introVideo) {
      URL.revokeObjectURL(introVideo.url);
      setIntroVideo(null);
    }
  };

  const removeQuestionVideo = (id: string) => {
    const video = questionVideos.find(v => v.id === id);
    if (video) {
      URL.revokeObjectURL(video.url);
      setQuestionVideos(questionVideos.filter(v => v.id !== id));
    }
  };

  const handleSave = () => {
    console.log('Saving videos:', { introVideo, questionVideos });
    alert(`Successfully configured:\n- Introduction video\n- ${questionVideos.length} question videos`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Interview Setup</h1>
          <p className="text-lg text-muted-foreground">
            Upload your introduction video and question videos for the interview
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Introduction Video</CardTitle>
            <CardDescription>
              Upload a welcome video that candidates will watch first
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!introVideo ? (
              <div
                onClick={() => introInputRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-12 text-center hover-elevate active-elevate-2 cursor-pointer transition-colors"
                data-testid="dropzone-intro"
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-base font-medium mb-1">Click to upload introduction video</p>
                <p className="text-sm text-muted-foreground">MP4, WebM, or MOV</p>
                <input
                  ref={introInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleIntroVideoUpload}
                  className="hidden"
                  data-testid="input-intro-video"
                />
              </div>
            ) : (
              <div className="border rounded-lg p-4 flex items-center gap-4">
                <Video className="h-10 w-10 text-primary" />
                <div className="flex-1">
                  <p className="font-medium" data-testid="text-intro-filename">{introVideo.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(introVideo.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={removeIntroVideo}
                  data-testid="button-remove-intro"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Question Videos</CardTitle>
                <CardDescription>
                  Upload up to 5 question videos ({questionVideos.length}/5 uploaded)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questionText" className="text-sm font-medium">
                  Question Text (displayed to candidate)
                </Label>
                <Input
                  id="questionText"
                  placeholder="e.g., Tell us about your experience with..."
                  value={currentQuestionText}
                  onChange={(e) => setCurrentQuestionText(e.target.value)}
                  className="h-12"
                  data-testid="input-question-text"
                />
              </div>

              {questionVideos.length < 5 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-xl p-8 text-center hover-elevate active-elevate-2 cursor-pointer transition-colors"
                  data-testid="dropzone-question"
                >
                  <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-base font-medium mb-1">Click to upload question video</p>
                  <p className="text-sm text-muted-foreground">MP4, WebM, or MOV</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleQuestionVideoUpload}
                    className="hidden"
                    data-testid="input-question-video"
                  />
                </div>
              )}
            </div>

            {questionVideos.length > 0 && (
              <div className="space-y-3">
                {questionVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="border rounded-lg p-4 flex items-center gap-4"
                    data-testid={`video-item-${index}`}
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="secondary" className="text-sm">
                      Q{index + 1}
                    </Badge>
                    <Video className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{video.questionText}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.file.name} • {(video.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeQuestionVideo(video.id)}
                      data-testid={`button-remove-${index}`}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={!introVideo || questionVideos.length === 0}
            className="h-12 px-8 text-base font-medium"
            data-testid="button-save"
          >
            Save Interview Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
