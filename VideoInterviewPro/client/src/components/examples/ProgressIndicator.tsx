import ProgressIndicator from '../ProgressIndicator';

export default function ProgressIndicatorExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <ProgressIndicator 
        totalSteps={7}
        currentStep={3}
        stepLabels={['Info', 'Welcome', 'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']}
      />
    </div>
  );
}
