import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import React from "react";

interface Step {
  number: number;
  title: string;
}

interface StepProgressBarProps {
  steps: Step[];
  currentStep: number;
  t: (key: string, params?: Record<string, any>) => string;
  getStepProgress: () => number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  steps,
  currentStep,
  t,
  getStepProgress,
}) => (
  <div className="mb-12">
    {/* Step Progress Bar */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-600">
          {t("project.initialize.progress.step", {
            current: currentStep,
            total: steps.length,
          })}
        </span>
        <span className="text-sm font-medium text-primary">
          {t("project.initialize.progress.percentage", {
            percentage: Math.round(getStepProgress()),
          })}
        </span>
      </div>
      <Progress value={getStepProgress()} className="h-3 mb-2" />
      <div className="text-center">
        <span className="text-lg font-semibold text-gray-900">
          {steps[currentStep - 1].title}
        </span>
      </div>
    </div>

    {/* Step Indicators */}
    <div className="hidden md:flex justify-between items-center overflow-x-auto pb-2">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`flex items-center ${index < steps.length - 1 ? "flex-1 min-w-0" : "shrink-0"}`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 text-sm font-medium mb-2 ${
                currentStep >= step.number
                  ? "bg-primary border-primary text-primary-foreground shadow-lg"
                  : currentStep === step.number - 1
                  ? "border-primary text-primary bg-primary/10"
                  : "border-neutral-300 text-neutral-500"
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs text-center font-medium px-2 ${
                currentStep >= step.number
                  ? "text-primary"
                  : "text-neutral-500"
              }`}
            >
              {t(`project.initialize.steps.step${step.number}`)}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 rounded transition-all duration-300 ${
                currentStep > step.number ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>

    {/* Mobile Step Indicators */}
    <div className="md:hidden flex justify-center space-x-2 mt-4">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentStep >= step.number ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  </div>
);

export default StepProgressBar;
