import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Progress 
      value={value} 
      className="w-full h-0.5 mb-4" 
    />
  );
}
