import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Progress 
      value={value} 
      className="mb-4 h-0.5 w-full" 
    />
  );
}
