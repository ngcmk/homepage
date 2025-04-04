"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

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

  const projectTypes = [
    "Website Redesign",
    "New Website",
    "E-commerce",
    "Web Application",
    "Mobile App",
    "Branding",
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Start Your Project</h1>
            <p className="text-neutral-600">
              Tell us about your project and we'll get back to you within 24
              hours.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex border-b">
              <div
                className={`flex-1 py-4 text-center font-medium ${step === 1 ? "text-neutral-900 border-b-2 border-[rgb(var(--accent))]" : "text-neutral-500"}`}
              >
                Project Details
              </div>
              <div
                className={`flex-1 py-4 text-center font-medium ${step === 2 ? "text-neutral-900 border-b-2 border-[rgb(var(--accent))]" : "text-neutral-500"}`}
              >
                Project Type
              </div>
              <div
                className={`flex-1 py-4 text-center font-medium ${step === 3 ? "text-neutral-900 border-b-2 border-[rgb(var(--accent))]" : "text-neutral-500"}`}
              >
                Confirmation
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
                      Project Name
                    </label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full"
                      placeholder="e.g. Company Website Redesign"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="block mb-2 text-sm font-medium text-neutral-700"
                    >
                      Project Description
                    </label>
                    <Textarea
                      id="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full"
                      placeholder="Tell us about your project goals and requirements..."
                      rows={5}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block mb-4 text-sm font-medium text-neutral-700">
                    Project Type
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
                    Project Summary
                  </h2>
                  <div className="bg-neutral-50 p-6 rounded-lg mb-6">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Project Name
                      </h3>
                      <p className="text-neutral-900">
                        {projectName || "Not specified"}
                      </p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Project Type
                      </h3>
                      <p className="text-neutral-900">
                        {projectType || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Project Description
                      </h3>
                      <p className="text-neutral-900">
                        {projectDescription || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">
                    By submitting this form, you agree to our terms and
                    conditions. We'll review your project details and get back
                    to you within 24 hours.
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
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white ml-auto"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button className="bg-[rgb(var(--accent))] hover:bg-[rgb(var(--accent-light))] text-white ml-auto">
                    Submit Project
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
