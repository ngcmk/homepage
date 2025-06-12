"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";

export default function InitializeProject() {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const { t } = useLanguage();
  const projectTypes = [
    t("initializeProject.typeRedesign"),
    t("initializeProject.typeNewSite"),
    t("initializeProject.typeEcommerce"),
    t("initializeProject.typeWebApp"),
    t("initializeProject.typeMobileApp"),
    t("initializeProject.typeBranding"),
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">{t("initializeProject.title")}</h1>
            <p className="text-neutral-600">
              {t("initializeProject.subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex border-b">
              <div
                className={`flex-1 py-4 text-center font-medium ${step === 1 ? "text-neutral-900 border-b-2 border-[rgb(var(--accent))]" : "text-neutral-500"}`}
              >
                {t("initializeProject.step1")}
              </div>
              <div
                className={`flex-1 py-4 text-center font-medium ${step === 2 ? "text-neutral-900 border-b-2 border-[rgb(var(--accent))]" : "text-neutral-500"}`}
              >
                {t("initializeProject.step2")}
              </div>
              <div
                className={`flex-1 py-4 text-center font-medium ${step === 3 ? "text-neutral-900 border-b-2 border-[rgb(var(--accent))]" : "text-neutral-500"}`}
              >
                {t("initializeProject.step3")}
              </div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="projectName"
                      className="block mb-2 text-sm font-medium text-neutral-700"
                    >
                      {t("initializeProject.nameLabel")}
                    </label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full"
                      placeholder={t("initializeProject.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="block mb-2 text-sm font-medium text-neutral-700"
                    >
                      {t("initializeProject.descriptionLabel")}
                    </label>
                    <Textarea
                      id="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full"
                      placeholder={t("initializeProject.descriptionPlaceholder")}
                      rows={5}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block mb-4 text-sm font-medium text-neutral-700">
                    {t("initializeProject.typeLabel")}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          projectType === type
                            ? "border-[rgb(var(--accent))] bg-[rgba(var(--accent),0.05)]"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                              projectType === type
                                ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]"
                                : "border-neutral-300"
                            }`}
                          >
                            {projectType === type && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span>{type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {t("initializeProject.summaryTitle")}
                  </h2>
                  <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        {t("initializeProject.summaryName")}
                      </h3>
                      <p className="text-neutral-900">
                        {projectName || t("initializeProject.notSpecified")}
                      </p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        {t("initializeProject.summaryType")}
                      </h3>
                      <p className="text-neutral-900">
                        {projectType || t("initializeProject.notSpecified")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        {t("initializeProject.summaryDescription")}
                      </h3>
                      <p className="text-neutral-900">
                        {projectDescription || t("initializeProject.notSpecified")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {t("initializeProject.terms")}
                  </p>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  >
                    {t("initializeProject.back")}
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white ml-auto"
                  >
                    {t("initializeProject.continue")}
                  </Button>
                ) : (
                  <Button className="bg-[rgb(var(--accent))] hover:bg-[rgb(var(--accent-light))] text-white ml-auto">
                    {t("project.submit")}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* <div className="text-sm text-neutral-500 text-center mt-6">
            This is a demo. No actual project will be created.
          </div> */}
        </div>
      </div>
    </div>
  );
}
