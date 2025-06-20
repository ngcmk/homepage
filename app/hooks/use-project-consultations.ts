"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Hook for fetching all project consultations with optional filtering
export function useProjectConsultations(filters?: {
  status?:
    | "new"
    | "reviewing"
    | "quoted"
    | "accepted"
    | "declined"
    | "in_progress"
    | "completed"
    | "cancelled";
  type?:
    | "website-redesign"
    | "new-website"
    | "ecommerce"
    | "web-app"
    | "mobile-app"
    | "branding";
  urgency?: "low" | "medium" | "high" | "urgent";
  assignedTo?: Id<"users">;
  limit?: number;
}) {
  type ProjectConsultationsQuery =
    typeof api.projectConsultations.getProjectConsultations;

  return useQuery<ProjectConsultationsQuery>(
    api.projectConsultations.getProjectConsultations,
    filters || {},
  );
}

// Hook for fetching a single project consultation
export function useProjectConsultation(id: Id<"projectConsultations">) {
  type ProjectConsultationQuery =
    typeof api.projectConsultations.getProjectConsultation;

  return useQuery<ProjectConsultationQuery>(
    api.projectConsultations.getProjectConsultation,
    { id },
  );
}

// Hook for creating a new project consultation
export function useCreateProjectConsultation() {
  type ProjectConsultationMutation =
    typeof api.projectConsultations.createProjectConsultation;

  try {
    return useMutation<ProjectConsultationMutation>(
      api.projectConsultations.createProjectConsultation,
    );
  } catch (error) {
    console.error("Failed to initialize Convex mutation:", error);
    // Return a function that will gracefully fail
    return (async () => {
      throw new Error("Convex API not properly initialized");
    }) as unknown as ReturnType<
      typeof useMutation<ProjectConsultationMutation>
    >;
  }
}

// Hook for updating project status
export function useUpdateProjectStatus() {
  type UpdateStatusMutation =
    typeof api.projectConsultations.updateProjectStatus;

  return useMutation<UpdateStatusMutation>(
    api.projectConsultations.updateProjectStatus,
  );
}

// Hook for assigning a project to a user
export function useAssignProject() {
  type AssignProjectMutation = typeof api.projectConsultations.assignProject;

  return useMutation<AssignProjectMutation>(
    api.projectConsultations.assignProject,
  );
}

// Hook for adding notes to a project
export function useAddProjectNote() {
  type AddNoteMutation = typeof api.projectConsultations.addProjectNote;

  return useMutation<AddNoteMutation>(api.projectConsultations.addProjectNote);
}

// Hook for searching project consultations
export function useSearchProjectConsultations(
  searchTerm: string,
  filters?: {
    type?:
      | "website-redesign"
      | "new-website"
      | "ecommerce"
      | "web-app"
      | "mobile-app"
      | "branding";
    status?:
      | "new"
      | "reviewing"
      | "quoted"
      | "accepted"
      | "declined"
      | "in_progress"
      | "completed"
      | "cancelled";
    limit?: number;
  },
) {
  type SearchProjectsQuery =
    typeof api.projectConsultations.searchProjectConsultations;

  return useQuery<SearchProjectsQuery>(
    api.projectConsultations.searchProjectConsultations,
    searchTerm.trim() ? { searchTerm, ...filters } : "skip",
  );
}

// Hook for getting project consultation statistics
export function useProjectStats() {
  type ProjectStatsQuery = typeof api.projectConsultations.getProjectStats;

  return useQuery<ProjectStatsQuery>(
    api.projectConsultations.getProjectStats,
    {},
  );
}

// Hook for deleting a project consultation
export function useDeleteProjectConsultation() {
  type DeleteProjectMutation =
    typeof api.projectConsultations.deleteProjectConsultation;

  return useMutation<DeleteProjectMutation>(
    api.projectConsultations.deleteProjectConsultation,
  );
}

// Hook for getting project activities
export function useProjectActivities(
  projectId: Id<"projectConsultations">,
  limit?: number,
) {
  type ProjectActivitiesQuery =
    typeof api.projectConsultations.getProjectActivities;

  return useQuery<ProjectActivitiesQuery>(
    api.projectConsultations.getProjectActivities,
    {
      projectId,
      limit,
    },
  );
}

// Hook for updating project estimates
export function useUpdateProjectEstimates() {
  type UpdateEstimatesMutation =
    typeof api.projectConsultations.updateProjectEstimates;

  return useMutation<UpdateEstimatesMutation>(
    api.projectConsultations.updateProjectEstimates,
  );
}

// Custom hook for project consultation form submission
export function useProjectConsultationForm() {
  // Define the type for the mutation function and initialize it
  const createProjectMutation = useCreateProjectConsultation();

  // Store the mutation function safely
  const createProject = createProjectMutation;

  // Log initialization status
  // if (!createProject) {
  //   console.error("Failed to initialize project consultation form");
  // } else {
  //   console.log("Convex mutation initialized successfully");
  // }

  type ProjectConsultationData = {
    name?: string;
    description?: string;
    type?:
      | "website-redesign"
      | "new-website"
      | "ecommerce"
      | "web-app"
      | "mobile-app"
      | "branding";
    urgency?: "low" | "medium" | "high" | "urgent";
    industry?: string;
    targetAudience?: string;
    existingWebsite?: string;
    goals?: string[];
    features?: string[];
    timeline?: string;
    budget?: string;
    hasContent?: string;
    designPreferences?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    company?: string;
    preferredContact?: string;
    additionalInfo?: string;
  };

  type SubmissionResult =
    | { success: true; projectId: Id<"projectConsultations"> }
    | { success: false; error: string; originalError?: unknown };

  const submitProjectConsultation = async (
    data: ProjectConsultationData & { t?: (key: string) => string },
  ): Promise<SubmissionResult> => {
    // Get the translation function from data or use a default implementation
    const t = data.t || ((key: string) => key);
    
    if (!createProject) {
      console.error("Convex mutation not available");
      return {
        success: false,
        error: t("project.initialize.errors.serverUnavailable"),
      } as SubmissionResult;
    }

    try {
      // console.log("Starting project submission with Convex...");

      // Validate required fields
      if (!data.contactEmail) {
        return {
          success: false,
          error: t("project.initialize.errors.emailRequired"),
        } as SubmissionResult;
      }

      const projectData = {
        ...data,
        source: "website",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        referrer:
          typeof document !== "undefined"
            ? document.referrer || undefined
            : undefined,
      };

      // console.log("Calling Convex API with data:", projectData);

      try {
        const projectId = await createProject(projectData);
        // console.log("Project submitted successfully, ID:", projectId);
        return { success: true, projectId } as SubmissionResult;
      } catch (error) {
        // Check specifically for ArgumentValidationError
        if (
          error instanceof Error &&
          error.message.includes("ArgumentValidationError") &&
          error.message.includes("extra field")
        ) {
          console.error("Schema validation error:", error.message);

          // Create a cleaned version of the data without any potentially problematic fields
          const cleanedData = {
            name: data.name,
            description: data.description,
            type: data.type,
            urgency: data.urgency,
            industry: data.industry,
            targetAudience: data.targetAudience,
            existingWebsite: data.existingWebsite,
            goals: data.goals,
            features: data.features,
            timeline: data.timeline,
            budget: data.budget,
            hasContent: data.hasContent,
            designPreferences: data.designPreferences,
            contactName: data.contactName,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            company: data.company,
            preferredContact: data.preferredContact,
            additionalInfo: data.additionalInfo,
            source: "website",
          };

          // console.log("Retrying with cleaned data");
          const projectId = await createProject(cleanedData);
          // console.log(
          //   "Project submitted successfully after cleaning, ID:",
          //   projectId,
          // );
          return { success: true, projectId } as SubmissionResult;
        }
        throw error; // Re-throw if not a validation error
      }
    } catch (error) {
      console.error("Error submitting project consultation:", error);

      // Provide more detailed error messages based on the type of error
      let errorMessage = t("project.initialize.errors.unknownError");

      if (error instanceof Error) {
        errorMessage = error.message;

        // Check for specific error types
        if (
          errorMessage.includes("network") ||
          errorMessage.includes("connection")
        ) {
          errorMessage = t("project.initialize.errors.networkError");
        } else if (errorMessage.includes("timeout")) {
          errorMessage = t("project.initialize.errors.timeoutError");
        } else if (
          errorMessage.includes("permission") ||
          errorMessage.includes("access")
        ) {
          errorMessage = t("project.initialize.errors.permissionError");
        } else if (errorMessage.includes("ArgumentValidationError")) {
          errorMessage = t("project.initialize.errors.validationError");
        }
      }

      return {
        success: false,
        error: errorMessage,
        originalError: error,
      } as SubmissionResult;
    }
  };

  return { submitProjectConsultation };
}

// Hook for project management operations
export function useProjectManagement() {
  const updateStatus = useUpdateProjectStatus();
  const assignProject = useAssignProject();
  const addNote = useAddProjectNote();
  const deleteProject = useDeleteProjectConsultation();
  const updateEstimates = useUpdateProjectEstimates();

  const markAsReviewing = async (
    projectId: Id<"projectConsultations">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: projectId,
        status: "reviewing",
        notes,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const markAsQuoted = async (
    projectId: Id<"projectConsultations">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: projectId,
        status: "quoted",
        notes,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const markAsAccepted = async (
    projectId: Id<"projectConsultations">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: projectId,
        status: "accepted",
        notes,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const markAsInProgress = async (
    projectId: Id<"projectConsultations">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: projectId,
        status: "in_progress",
        notes,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const markAsCompleted = async (
    projectId: Id<"projectConsultations">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: projectId,
        status: "completed",
        notes,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const markAsDeclined = async (
    projectId: Id<"projectConsultations">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: projectId,
        status: "declined",
        notes,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const cancelProject = async (projectId: Id<"projectConsultations">) => {
    try {
      await deleteProject({
        id: projectId,
        permanent: false,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const assign = async (
    projectId: Id<"projectConsultations">,
    userId: Id<"users">,
  ) => {
    try {
      await assignProject({
        projectId,
        userId,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const addProjectNote = async (
    projectId: Id<"projectConsultations">,
    content: string,
    author: string,
    type: "note" | "email" | "call" | "meeting" = "note",
  ) => {
    try {
      await addNote({
        projectId,
        content,
        author,
        type,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const updateProjectEstimates = async (
    projectId: Id<"projectConsultations">,
    estimates: {
      estimatedBudget?: number;
      estimatedTimeline?: number;
      complexityScore?: number;
    },
  ) => {
    try {
      await updateEstimates({
        id: projectId,
        ...estimates,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  return {
    markAsReviewing,
    markAsQuoted,
    markAsAccepted,
    markAsInProgress,
    markAsCompleted,
    markAsDeclined,
    cancelProject,
    assign,
    addProjectNote,
    updateProjectEstimates,
  };
}

// Hook for filtering and sorting project consultations
export function useProjectFilters() {
  const allProjects = useProjectConsultations();

  const getFilteredProjects = (filters: {
    search?: string;
    status?: string;
    type?: string;
    urgency?: string;
    dateRange?: { from: Date; to: Date };
    budgetRange?: { min: number; max: number };
  }) => {
    if (!allProjects) return [];

    return allProjects.filter((project) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          project.name,
          project.description,
          project.contactName,
          project.contactEmail,
          project.company,
          project.industry,
          project.targetAudience,
        ].filter(Boolean);

        const matchesSearch = searchFields.some((field) =>
          field?.toLowerCase().includes(searchTerm),
        );
        if (!matchesSearch) return false;
      }

      // Status filter
      if (
        filters.status &&
        filters.status !== "all" &&
        project.status !== filters.status
      ) {
        return false;
      }

      // Type filter
      if (
        filters.type &&
        filters.type !== "all" &&
        project.type !== filters.type
      ) {
        return false;
      }

      // Urgency filter
      if (
        filters.urgency &&
        filters.urgency !== "all" &&
        project.priority !== filters.urgency
      ) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const projectDate = new Date(project.createdAt);
        if (
          projectDate < filters.dateRange.from ||
          projectDate > filters.dateRange.to
        ) {
          return false;
        }
      }

      // Budget range filter
      if (filters.budgetRange && project.estimatedBudget) {
        if (
          project.estimatedBudget < filters.budgetRange.min ||
          project.estimatedBudget > filters.budgetRange.max
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const getSortedProjects = (
    projects: typeof allProjects,
    sortBy:
      | "createdAt"
      | "updatedAt"
      | "name"
      | "urgency"
      | "status"
      | "estimatedBudget"
      | "estimatedTimeline",
    sortOrder: "asc" | "desc" = "desc",
  ) => {
    if (!projects) return [];

    return [...projects].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "createdAt":
        case "updatedAt":
        case "estimatedBudget":
        case "estimatedTimeline":
          const aValue = a[sortBy] || 0;
          const bValue = b[sortBy] || 0;
          comparison = aValue - bValue;
          break;
        case "name":
          const aName = a.name || "";
          const bName = b.name || "";
          comparison = aName.localeCompare(bName);
          break;
        case "urgency":
          const urgencyOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = urgencyOrder[a.priority] - urgencyOrder[b.priority];
          break;
        case "status":
          const statusOrder = {
            new: 1,
            reviewing: 2,
            quoted: 3,
            accepted: 4,
            in_progress: 5,
            completed: 6,
            declined: 7,
            cancelled: 8,
          };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const getProjectsByStatus = () => {
    if (!allProjects) return {};

    return allProjects.reduce(
      (acc, project) => {
        if (!acc[project.status]) {
          acc[project.status] = [];
        }
        acc[project.status].push(project);
        return acc;
      },
      {} as Record<string, typeof allProjects>,
    );
  };

  const getProjectsByType = () => {
    if (!allProjects) return {};

    return allProjects.reduce(
      (acc, project) => {
        const type = project.type || "unknown";
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(project);
        return acc;
      },
      {} as Record<string, typeof allProjects>,
    );
  };

  const getProjectsByUrgency = () => {
    if (!allProjects) return {};

    return allProjects.reduce(
      (acc, project) => {
        if (!acc[project.priority]) {
          acc[project.priority] = [];
        }
        acc[project.priority].push(project);
        return acc;
      },
      {} as Record<string, typeof allProjects>,
    );
  };

  return {
    getFilteredProjects,
    getSortedProjects,
    getProjectsByStatus,
    getProjectsByType,
    getProjectsByUrgency,
  };
}

// Hook for project consultation analytics
export function useProjectAnalytics() {
  const stats = useProjectStats();
  const allProjects = useProjectConsultations();

  const getConversionRate = () => {
    if (!stats) return 0;
    const totalLeads =
      stats.byStatus.new + stats.byStatus.reviewing + stats.byStatus.quoted;
    const converted =
      stats.byStatus.accepted +
      stats.byStatus.in_progress +
      stats.byStatus.completed;
    return totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0;
  };

  const getCompletionRate = () => {
    if (!stats) return 0;
    const totalActive =
      stats.byStatus.accepted +
      stats.byStatus.in_progress +
      stats.byStatus.completed;
    return totalActive > 0
      ? Math.round((stats.byStatus.completed / totalActive) * 100)
      : 0;
  };

  const getAverageProjectValue = () => {
    return stats?.averageEstimatedBudget || 0;
  };

  const getAverageTimeline = () => {
    return stats?.averageEstimatedTimeline || 0;
  };

  const getRecentProjects = (days: number = 30) => {
    if (!allProjects) return [];
    const cutoffDate = Date.now() - days * 24 * 60 * 60 * 1000;
    return allProjects.filter((project) => project.createdAt >= cutoffDate);
  };

  const getTrendData = (days: number = 30) => {
    const recentProjects = getRecentProjects(days);
    const dailyData: Record<string, number> = {};

    recentProjects.forEach((project) => {
      const date = new Date(project.createdAt).toISOString().split("T")[0];
      dailyData[date] = (dailyData[date] || 0) + 1;
    });

    return Object.entries(dailyData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  return {
    stats,
    getConversionRate,
    getCompletionRate,
    getAverageProjectValue,
    getAverageTimeline,
    getRecentProjects,
    getTrendData,
  };
}
