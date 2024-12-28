import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StepInitialProps {
  onClean: () => void;
  onSkip: () => void;
}

const steps = [
  { name: "Import", description: "Upload your bookmarks", status: "complete" },
  { name: "Clean Duplicates", description: "Remove duplicate bookmarks", status: "current" },
  { name: "Fix Broken Links", description: "Identify and update broken links", status: "upcoming" },
  { name: "Reorganize", description: "Use AI to categorize bookmarks", status: "upcoming" },
  { name: "Export", description: "Save in your preferred format", status: "upcoming" },
];

export default function StepInitial({ onClean, onSkip }: StepInitialProps) {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted) {
      const timer = setTimeout(() => {
        onClean();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isStarted, onClean]);

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Organize Your Bookmarks</CardTitle>
        <CardDescription>Clean and organize your bookmark collection</CardDescription>
      </CardHeader>
      <CardContent>
        <nav aria-label="Progress" className="mb-8">
          <ol role="list">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pb-10' : ''}`}>
                {stepIdx !== steps.length - 1 ? (
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                    animate={{ backgroundColor: isStarted || step.status === "complete" ? "#4F46E5" : "#D1D5DB" }}
                    transition={{ delay: stepIdx * 0.1 }}
                  />
                ) : null}
                <div className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <motion.span
                      className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
                      animate={{
                        backgroundColor: isStarted || step.status === "complete" ? "#4F46E5" : "#FFFFFF",
                        borderColor: isStarted || step.status === "complete" ? "#4F46E5" : "#D1D5DB",
                      }}
                      transition={{ delay: stepIdx * 0.1 }}
                    >
                      {isStarted || step.status === "complete" ? (
                        step.name === "Import" ? (
                          <CheckIcon className="size-5 text-white" />
                        ) : (
                          <CheckIcon className="size-5 text-white" />
                        )
                      ) : (
                        <span className="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      )}
                    </motion.span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <motion.span
                      className="text-sm font-medium"
                      animate={{ 
                        color: isStarted || step.status === "complete" ? "#4F46E5" : 
                               step.status === "current" ? "#111827" : "#6B7280" 
                      }}
                      transition={{ delay: stepIdx * 0.1 }}
                    >
                      {step.name}
                    </motion.span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onSkip}>
            Skip
          </Button>
          <Button onClick={() => setIsStarted(true)} disabled={isStarted}>
            {isStarted ? "Processing..." : "Start Cleaning"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}