import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ProjectFormStep2Props {
  form: any;
  labels: any;
  placeholders: any;
  t: (key: string, params?: Record<string, any>) => string;
  industries: { value: string; label: string }[];
}

const ProjectFormStep2: React.FC<ProjectFormStep2Props> = ({
  form,
  labels,
  placeholders,
  t,
  industries,
}) => {
  const getTranslatedArray = (key: string) => {
    const arr = t(key);
    if (Array.isArray(arr)) return arr;
    return [];
  };
  const goals = getTranslatedArray("project.initialize.projectGoals");
  const features = getTranslatedArray("project.initialize.commonFeatures");

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.industry}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder={placeholders.industry} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              {t("project.initialize.descriptions.industry")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="targetAudience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.targetAudience}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholders.targetAudience}
                className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("project.initialize.descriptions.targetAudience")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="existingWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.existingWebsite}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholders.existingWebsite}
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormDescription>
              {t("project.initialize.descriptions.existingWebsite")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="goals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.projectGoals}</FormLabel>
            <FormDescription className="mb-4">
              {t("project.initialize.descriptions.goals")}
            </FormDescription>
            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
              {goals.map((goal: any) => (
                <div
                  key={goal.value}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all touch-manipulation project-selection-item ${
                    field.value?.includes(goal.value)
                      ? "border-primary bg-primary/5 selected"
                      : "border-border hover:border-primary/30 active:bg-muted/50"
                  }`}
                  onClick={() => {
                    const newValue = field.value?.includes(goal.value)
                      ? field.value.filter((v: string) => v !== goal.value)
                      : [...(field.value || []), goal.value];
                    field.onChange(newValue);
                  }}
                >
                  <span
                    style={
                      !field.value?.includes(goal.value)
                        ? {
                            color: "#000",
                            WebkitTextFillColor: "#000",
                            filter: "none",
                          }
                        : {}
                    }
                    className={`font-medium flex items-center gap-2 ${
                      field.value?.includes(goal.value)
                        ? "text-primary"
                        : "dark:text-white"
                    }`}
                  >
                    {field.value?.includes(goal.value) && (
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {goal.label}
                  </span>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labels.features}</FormLabel>
            <FormDescription className="mb-4">
              {t("project.initialize.descriptions.features")}
            </FormDescription>
            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
              {features.map((feature: any) => (
                <div
                  key={feature.value}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all touch-manipulation project-selection-item ${
                    field.value?.includes(feature.value)
                      ? "border-primary bg-primary/5 selected"
                      : "border-border hover:border-primary/30 active:bg-muted/50"
                  }`}
                  onClick={() => {
                    const newValue = field.value?.includes(feature.value)
                      ? field.value.filter((v: string) => v !== feature.value)
                      : [...(field.value || []), feature.value];
                    field.onChange(newValue);
                  }}
                >
                  <span
                    style={
                      !field.value?.includes(feature.value)
                        ? {
                            color: "#000",
                            WebkitTextFillColor: "#000",
                            filter: "none",
                          }
                        : {}
                    }
                    className={`font-medium flex items-center gap-2 ${
                      field.value?.includes(feature.value)
                        ? "text-primary"
                        : "dark:text-white"
                    }`}
                  >
                    {field.value?.includes(feature.value) && (
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProjectFormStep2;
