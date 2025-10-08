import { useState } from "react";
import InterviewForm from "@/components/InterviewForm";
import VideoPlayer from "@/components/VideoPlayer";
import VideoRecorder from "@/components/VideoRecorder";
import ProgressIndicator from "@/components/ProgressIndicator";
import CompletionScreen from "@/components/CompletionScreen";
import { Button } from "@/components/ui/button";

//todo: remove mock functionality - replace with actual video URLs from admin uploads
const MOCK_INTRO_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const MOCK_QUESTIONS = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    text: "Tell us about a challenging project you worked on and how you overcame obstacles."
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    text: "Describe a time when you had to work with a difficult team member. How did you handle it?"
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    text: "What are your greatest strengths and how do they relate to this position?"
  },
  {
    id: 4,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    text: "Where do you see yourself in 5 years and how does this role fit into your career goals?"
  },
  {
    id: 5,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    text: "Tell us about a time you failed and what you learned from the experience."
  }
];

type InterviewStep = 
  | { type: 'form' }
  | { type: 'intro-video' }
  | { type: 'question-video'; questionIndex: number }
  | { type: 'question-record'; questionIndex: number }
  | { type: 'complete' };

export default function InterviewFlow() {
  const [candidateInfo, setCandidateInfo] = useState<{ fullName: string; email: string } | null>(null);
  const [currentStep, setCurrentStep] = useState<InterviewStep>({ type: 'form' });
  const [completedRecordings, setCompletedRecordings] = useState<number>(0);

  const getStepNumber = (): number => {
    if (currentStep.type === 'form') return 1;
    if (currentStep.type === 'intro-video') return 2;
    if (currentStep.type === 'question-video' || currentStep.type === 'question-record') {
      return 3 + currentStep.questionIndex;
    }
    return 8;
  };

  const handleFormSubmit = (data: { fullName: string; email: string }) => {
    setCandidateInfo(data);
    setCurrentStep({ type: 'intro-video' });
  };

  const handleIntroVideoEnd = () => {
    // Video ended, but user can still control playback
  };

  const handleContinueAfterIntro = () => {
    setCurrentStep({ type: 'question-video', questionIndex: 0 });
  };

  const handleQuestionVideoEnd = () => {
    // Video ended, but user can still control playback
  };

  const handleContinueAfterQuestion = (questionIndex: number) => {
    setCurrentStep({ type: 'question-record', questionIndex });
  };

  const handleRecordingComplete = (blob: Blob, fileName: string) => {
    console.log(`Recording saved: ${fileName}`, blob.size, 'bytes');
    const newCompletedCount = completedRecordings + 1;
    setCompletedRecordings(newCompletedCount);

    if (currentStep.type === 'question-record') {
      const nextQuestionIndex = currentStep.questionIndex + 1;
      if (nextQuestionIndex < MOCK_QUESTIONS.length) {
        setCurrentStep({ type: 'question-video', questionIndex: nextQuestionIndex });
      } else {
        setCurrentStep({ type: 'complete' });
      }
    }
  };

  const stepLabels = [
    'Your Info',
    'Welcome',
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5'
  ];

  if (currentStep.type === 'form') {
    return <InterviewForm onSubmit={handleFormSubmit} />;
  }

  if (currentStep.type === 'complete' && candidateInfo) {
    return (
      <CompletionScreen 
        candidateName={candidateInfo.fullName}
        totalQuestions={MOCK_QUESTIONS.length}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <ProgressIndicator 
          totalSteps={stepLabels.length}
          currentStep={getStepNumber()}
          stepLabels={stepLabels}
        />
      </div>

      <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        {currentStep.type === 'intro-video' && (
          <div className="space-y-6 w-full">
            <VideoPlayer 
              videoUrl={MOCK_INTRO_VIDEO}
              title="Welcome to Your Interview"
              description="Please watch this introduction before beginning your interview questions"
              onVideoEnd={handleIntroVideoEnd}
            />
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleContinueAfterIntro}
                className="h-12 px-8 text-base font-medium"
                data-testid="button-continue-intro"
              >
                Continue to Questions
              </Button>
            </div>
          </div>
        )}

        {currentStep.type === 'question-video' && (
          <div className="space-y-6 w-full">
            <VideoPlayer 
              videoUrl={MOCK_QUESTIONS[currentStep.questionIndex].videoUrl}
              title={`Question ${currentStep.questionIndex + 1} of ${MOCK_QUESTIONS.length}`}
              description={MOCK_QUESTIONS[currentStep.questionIndex].text}
              onVideoEnd={handleQuestionVideoEnd}
            />
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => handleContinueAfterQuestion(currentStep.questionIndex)}
                className="h-12 px-8 text-base font-medium"
                data-testid={`button-continue-question-${currentStep.questionIndex}`}
              >
                Ready to Record Your Answer
              </Button>
            </div>
          </div>
        )}

        {currentStep.type === 'question-record' && candidateInfo && (
          <VideoRecorder 
            questionNumber={currentStep.questionIndex + 1}
            questionText={MOCK_QUESTIONS[currentStep.questionIndex].text}
            candidateName={candidateInfo.fullName}
            onRecordingComplete={handleRecordingComplete}
          />
        )}
      </div>
    </div>
  );
}
