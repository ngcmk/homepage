import React from "react";

interface ProjectFormStep5Props {
  t: (key: string, params?: Record<string, any>) => string;
  formValues: any;
  labels: any;
  projectTypes: { value: string; label: string }[];
  urgencyLevels: { value: string; label: string }[];
  industries: { value: string; label: string }[];
  projectGoals: { value: string; label: string }[];
  commonFeatures: { value: string; label: string }[];
  timelines: { value: string; label: string }[];
  budgets: { value: string; label: string }[];
}

const ProjectFormStep5: React.FC<ProjectFormStep5Props> = ({
  t,
  formValues,
  labels,
  projectTypes,
  urgencyLevels,
  industries,
  projectGoals,
  commonFeatures,
  timelines,
  budgets,
}) => {
  const getLabel = (arr: { value: string; label: string }[], value: string) => {
    if (!value) return "-";
    const found = arr.find((item) => item.value === value);
    if (found) return found.label;
    // If value looks like a translation key, try t() fallback
    if (typeof value === "string" && value.startsWith("project.initialize.")) {
      // Try to get the translation for the key
      const translated = t(value);
      if (translated && translated !== value) return translated;
    }
    // Fallback: prettify value
    return value.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getMultiLabels = (arr: { value: string; label: string }[], values: string[] = []) =>
    values && values.length
      ? values.map((v) => getLabel(arr, v)).join(", ")
      : "-";

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t("project.initialize.summary.title")}</h2>
        <p className="text-lg text-muted-foreground mb-6">
          {t("project.initialize.summary.description")}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">{t("project.initialize.summary.projectBasics")}</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-left">
          <div>
            <dt className="font-medium">{labels.projectName}</dt>
            <dd>{formValues.name || <span className="text-muted-foreground">-</span>}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.projectDescription}</dt>
            <dd>{formValues.description || <span className="text-muted-foreground">-</span>}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.projectType}</dt>
            <dd>{getLabel(projectTypes, formValues.type)}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.projectUrgency}</dt>
            <dd>{getLabel(urgencyLevels, formValues.urgency)}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.industry}</dt>
            <dd>{getLabel(industries, formValues.industry)}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.targetAudience}</dt>
            <dd>{formValues.targetAudience || <span className="text-muted-foreground">-</span>}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.existingWebsite}</dt>
            <dd>{formValues.existingWebsite || <span className="text-muted-foreground">-</span>}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.projectGoals}</dt>
            <dd>{getMultiLabels(projectGoals, formValues.goals)}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.features}</dt>
            <dd>{getMultiLabels(commonFeatures, formValues.features)}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.timeline}</dt>
            <dd>{getLabel(timelines, formValues.timeline)}</dd>
          </div>
          <div>
            <dt className="font-medium">{labels.budget}</dt>
            <dd>{getLabel(budgets, formValues.budget)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProjectFormStep5;
