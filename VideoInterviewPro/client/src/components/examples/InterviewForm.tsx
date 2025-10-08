import InterviewForm from '../InterviewForm';

export default function InterviewFormExample() {
  return (
    <InterviewForm 
      onSubmit={(data) => console.log('Form submitted:', data)} 
    />
  );
}
