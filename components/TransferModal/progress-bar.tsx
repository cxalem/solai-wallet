interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  // Get progress bar width based on current step
  const getProgressWidth = () => {
    if (step === 1) return "33.33%";
    if (step === 2) return "66.66%";
    if (step === 2.5) return "83.33%"; // Intermediate step
    return "100%"; // Step 3
  };

  return (
    <div className="w-full bg-gray-600 h-1 mt-0 pt-0 rounded-full overflow-hidden mb-4">
      <div
        className="bg-purple-500 h-full transition-all duration-300 ease-in-out"
        style={{
          width: getProgressWidth(),
        }}
      ></div>
    </div>
  );
}
