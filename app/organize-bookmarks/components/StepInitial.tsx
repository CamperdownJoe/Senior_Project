import { Button } from "@/components/ui/button";

interface StepInitialProps {
  onClean: () => void;
  onSkip: () => void;
}

export default function StepInitial({ onClean, onSkip }: StepInitialProps) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <Button onClick={onClean}>Clean Collections</Button>
      <Button variant="outline" onClick={onSkip}>Skip</Button>
    </div>
  );
}