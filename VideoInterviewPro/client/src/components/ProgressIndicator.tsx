import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  stepLabels: string[];
}

export default function ProgressIndicator({ 
  totalSteps, 
  currentStep, 
  stepLabels 
}: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                    ${isCurrent ? 'border-2 border-primary text-primary' : ''}
                    ${isUpcoming ? 'border-2 border-border text-muted-foreground' : ''}
                  `}
                  data-testid={`step-${stepNumber}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" data-testid={`check-${stepNumber}`} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`
                  mt-2 text-xs font-medium text-center max-w-[80px]
                  ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}
                `}
                data-testid={`label-${stepNumber}`}
                >
                  {stepLabels[index]}
                </span>
              </div>
              
              {index < totalSteps - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-2
                  ${stepNumber < currentStep ? 'bg-primary' : 'bg-border'}
                `}
                data-testid={`line-${stepNumber}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
