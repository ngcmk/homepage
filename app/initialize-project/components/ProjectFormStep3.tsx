import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectFormStep3Props {
  form: any;
  t: (key: string, params?: Record<string, any>) => string;
  calculateEstimatedBudget: () => number;
}

const ProjectFormStep3: React.FC<ProjectFormStep3Props> = ({
  form,
  t,
  calculateEstimatedBudget,
}) => {
  // Load timelines and budgets from translations with fallback
  const timelines = [
    { value: "urgent", label: t("project.initialize.timelines.urgent", { default: "Urgent (ASAP)" }) },
    { value: "1-2-months", label: t("project.initialize.timelines.oneToTwoMonths", { default: "1-2 months" }) },
    { value: "2-4-months", label: t("project.initialize.timelines.twoToFourMonths", { default: "2-4 months" }) },
    { value: "4-6-months", label: t("project.initialize.timelines.fourToSixMonths", { default: "4-6 months" }) },
    { value: "6-months-plus", label: t("project.initialize.timelines.sixMonthsPlus", { default: "6+ months" }) },
    { value: "flexible", label: t("project.initialize.timelines.flexible", { default: "Flexible timeline" }) },
  ];
  const budgets = [
    { value: "under-5k", label: t("project.initialize.budgets.under5k", { default: "Under $5,000" }) },
    { value: "5k-15k", label: t("project.initialize.budgets.fiveTo15k", { default: "$5,000 - $15,000" }) },
    { value: "15k-30k", label: t("project.initialize.budgets.fifteenTo30k", { default: "$15,000 - $30,000" }) },
    { value: "30k-50k", label: t("project.initialize.budgets.thirtyTo50k", { default: "$30,000 - $50,000" }) },
    { value: "50k-100k", label: t("project.initialize.budgets.fiftyTo100k", { default: "$50,000 - $100,000" }) },
    { value: "over-100k", label: t("project.initialize.budgets.over100k", { default: "Over $100,000" }) },
    { value: "discuss", label: t("project.initialize.budgets.discuss", { default: "Let's discuss" }) },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <FormField
        control={form.control}
        name="timeline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("project.initialize.fields.timeline")}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder={t("project.initialize.placeholders.timeline")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-lg text-black dark:text-white">
                {timelines.map((timeline) => (
                  <SelectItem key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              {/* {t("project.initialize.descriptions.timeline")} */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("project.initialize.fields.budget")}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder={t("project.initialize.placeholders.budget")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-lg text-black dark:text-white">
                {budgets.map((budget) => (
                  <SelectItem key={budget.value} value={budget.value}>
                    {budget.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              {/* {t("project.initialize.descriptions.budget")} */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <Card className="bg-blue-50 border-blue-200 project-estimate-card">
        <CardContent className="p-4">
          <div className="text-lg font-semibold">
            {t("project.initialize.estimate.budget")}: ${calculateEstimatedBudget()}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default ProjectFormStep3;
