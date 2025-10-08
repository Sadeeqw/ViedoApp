import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface CompletionScreenProps {
  candidateName: string;
  totalQuestions: number;
}

export default function CompletionScreen({ candidateName, totalQuestions }: CompletionScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl shadow-md text-center">
        <CardHeader className="space-y-6 pb-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-primary" data-testid="icon-complete" />
            </div>
          </div>
          <CardTitle className="text-4xl font-semibold">Interview Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">
              Thank you, {candidateName}!
            </p>
            <p className="text-base text-muted-foreground">
              You have successfully completed all {totalQuestions} questions. 
              Your video responses have been downloaded to your computer.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Please submit your downloaded videos as instructed by the interviewer.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => window.location.reload()}
            className="h-12 px-8 text-base font-medium"
            data-testid="button-new-interview"
          >
            Start New Interview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
