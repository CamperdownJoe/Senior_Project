import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type Props = {
  onExport: (format: string) => void;
  isProcessing: boolean;
};

export default function ExportOptions({ onExport, isProcessing }: Props) {
  const [selectedFormat, setSelectedFormat] = React.useState<string>('');

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={setSelectedFormat} disabled={isProcessing}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="chrome">Chrome</SelectItem>
          <SelectItem value="edge">Edge</SelectItem>
          <SelectItem value="firefox">Firefox</SelectItem>
          <SelectItem value="safari">Safari</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        onClick={() => onExport(selectedFormat)} 
        disabled={!selectedFormat || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Remove and Export'}
      </Button>
    </div>
  );
}