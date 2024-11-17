interface StepCleaningProps {
    progress: number;
  }
  
  export default function StepCleaning({ progress }: StepCleaningProps) {
    return (
      <p className="text-center">Cleaning your bookmarks... {progress}% complete</p>
    );
  }