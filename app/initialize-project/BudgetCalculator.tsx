// ngc/app/initialize-project/BudgetCalculator.tsx

import { useFormContext } from "react-hook-form";
import { ProjectFormValues } from "./types";

const featureCosts: Record<string, number> = {
  "responsive-design": 2000,
  "seo-optimization": 3000,
  "ecommerce-integration": 5000,
  "cms-integration": 4000,
  "multi-language": 2500,
  "user-authentication": 3500,
};

const urgencyMultiplier: Record<string, number> = {
  "urgent": 1.5,
  "standard": 1.0,
  "flexible": 0.8,
};

export const BudgetCalculator = () => {
  const { watch } = useFormContext<ProjectFormValues>();
  const projectType = watch("type");
  const features = watch("features") || [];
  const urgency = watch("urgency");

  const calculateEstimatedBudget = (): number => {
    let baseBudget = 0;

    // Base budget by project type
    switch (projectType) {
      case "website-redesign":
        baseBudget = 8000;
        break;
      case "new-website":
        baseBudget = 12000;
        break;
      case "ecommerce":
        baseBudget = 20000;
        break;
      case "web-app":
        baseBudget = 35000;
        break;
      case "mobile-app":
        baseBudget = 45000;
        break;
      case "branding":
        baseBudget = 6000;
        break;
      default:
        baseBudget = 10000;
    }

    // Add feature costs
    features.forEach((feature) => {
      baseBudget += featureCosts[feature] || 0;
    });

    // Apply urgency multiplier
    if (urgency) {
      baseBudget *= urgencyMultiplier[urgency] || 1.0;
    }

    return Math.round(baseBudget);
  };

  const estimatedBudget = calculateEstimatedBudget();

  return (
    <div className="text-lg font-bold text-blue-800 card-value">
      ${estimatedBudget.toLocaleString()}
    </div>
  );
};
