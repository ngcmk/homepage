import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Helper function to log activity for project consultations
async function logProjectActivity(
  ctx: any,
  projectId: Id<"projectConsultations">,
  action: string,
  details?: string,
  metadata?: any,
) {
  // Check if the projectId is valid
  try {
    await ctx.db.insert("activities", {
      projectId, // Use projectId field instead of contactId
      contactId: undefined, // Explicitly set contactId to undefined
      userId: undefined, // Set userId to undefined since it's not a user action
      action,
      details,
      metadata,
      timestamp: Date.now(),
    });
  } catch (error) {
    // Log the error but don't fail the entire operation
    console.error("Failed to log project activity:", error);
  }
}

// Helper function to calculate estimated budget
function calculateEstimatedBudget(data: {
  type?: string;
  features?: string[];
  urgency?: string;
}): number {
  let baseBudget = 0;

  // Base budget by project type
  if (data.type) {
    switch (data.type) {
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
  } else {
    baseBudget = 10000;
  }

  // Add feature costs
  const featureCosts: Record<string, number> = {
    "user-accounts": 3000,
    "payment-processing": 5000,
    "content-management": 4000,
    analytics: 2000,
    "social-integration": 1500,
    "search-functionality": 2500,
    "multi-language": 4000,
    "api-integration": 3500,
    "mobile-app": 20000,
    "admin-dashboard": 6000,
    "email-notifications": 1000,
    "file-uploads": 2000,
  };

  if (data.features && data.features.length > 0) {
    data.features.forEach((feature) => {
      baseBudget += featureCosts[feature] || 0;
    });
  }

  // Urgency multiplier
  const urgencyMultiplier: Record<string, number> = {
    low: 0.9,
    medium: 1.0,
    high: 1.2,
    urgent: 1.5,
  };

  if (data.urgency) {
    baseBudget *= urgencyMultiplier[data.urgency] || 1.0;
  }

  return Math.round(baseBudget);
}

// Helper function to calculate estimated timeline (in weeks)
function calculateEstimatedTimeline(data: {
  type?: string;
  features?: string[];
  hasContent?: string;
  urgency?: string;
}): number {
  let baseWeeks = 0;

  // Base timeline by project type (in weeks)
  if (data.type) {
    switch (data.type) {
      case "website-redesign":
        baseWeeks = 6;
        break;
      case "new-website":
        baseWeeks = 8;
        break;
      case "ecommerce":
        baseWeeks = 12;
        break;
      case "web-app":
        baseWeeks = 16;
        break;
      case "mobile-app":
        baseWeeks = 20;
        break;
      case "branding":
        baseWeeks = 4;
        break;
      default:
        baseWeeks = 8;
    }
  } else {
    baseWeeks = 8;
  }

  // Add feature time
  const featureWeeks: Record<string, number> = {
    "user-accounts": 2,
    "payment-processing": 3,
    "content-management": 2,
    analytics: 1,
    "social-integration": 1,
    "search-functionality": 2,
    "multi-language": 3,
    "api-integration": 2,
    "mobile-app": 8,
    "admin-dashboard": 4,
    "email-notifications": 1,
    "file-uploads": 1,
  };

  if (data.features && data.features.length > 0) {
    data.features.forEach((feature) => {
      baseWeeks += featureWeeks[feature] || 0;
    });
  }

  // Content preparation impact
  const contentMultiplier: Record<string, number> = {
    ready: 1.0,
    partial: 1.2,
    "need-help": 1.5,
    "not-sure": 1.3,
  };

  if (data.hasContent) {
    baseWeeks *= contentMultiplier[data.hasContent] || 1.2;
  } else {
    baseWeeks *= 1.2; // Default multiplier when not specified
  }

  // Urgency impact
  const urgencyMultiplier: Record<string, number> = {
    low: 1.1,
    medium: 1.0,
    high: 0.8,
    urgent: 0.6,
  };

  if (data.urgency) {
    baseWeeks *= urgencyMultiplier[data.urgency] || 1.0;
  }

  return Math.round(baseWeeks);
}

// Helper function to calculate complexity score
function calculateComplexityScore(data: {
  type?: string;
  features?: string[];
}): number {
  let complexity = 0;

  // Base complexity by project type
  const typeComplexity: Record<string, number> = {
    "website-redesign": 2,
    "new-website": 3,
    ecommerce: 5,
    "web-app": 7,
    "mobile-app": 8,
    branding: 2,
  };

  if (data.type) {
    complexity += typeComplexity[data.type] || 3;
  } else {
    complexity += 3; // Default complexity when no type selected
  }

  if (data.features && data.features.length > 0) {
    complexity += data.features.length * 0.5;
  }

  return Math.round(complexity * 10) / 10; // Round to 1 decimal place
}

// Create a new project consultation
export const createProjectConsultation = mutation({
  args: {
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(
      v.union(
        v.literal("website-redesign"),
        v.literal("new-website"),
        v.literal("ecommerce"),
        v.literal("web-app"),
        v.literal("mobile-app"),
        v.literal("branding"),
      ),
    ),
    urgency: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent"),
      ),
    ),
    industry: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
    existingWebsite: v.optional(v.string()),
    goals: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),
    timeline: v.optional(v.string()),
    budget: v.optional(v.string()),
    hasContent: v.optional(v.string()),
    designPreferences: v.optional(v.string()),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    company: v.optional(v.string()),
    preferredContact: v.optional(v.string()),
    additionalInfo: v.optional(v.string()),
    source: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Calculate estimates
    const estimatedBudget = calculateEstimatedBudget({
      type: args.type,
      features: args.features,
      urgency: args.urgency,
    });

    const estimatedTimeline = calculateEstimatedTimeline({
      type: args.type,
      features: args.features,
      hasContent: args.hasContent,
      urgency: args.urgency,
    });

    const complexityScore = calculateComplexityScore({
      type: args.type,
      features: args.features,
    });

    // Determine priority based on urgency
    const priority = args.urgency || "medium";

    const projectId = await ctx.db.insert("projectConsultations", {
      ...args,
      status: "new",
      priority: priority as "low" | "medium" | "high" | "urgent",
      estimatedBudget,
      estimatedTimeline,
      complexityScore,
      createdAt: now,
      updatedAt: now,
    });

    // Log the creation activity
    await logProjectActivity(
      ctx,
      projectId,
      "project_created",
      `New project consultation created: ${args.name || "Untitled Project"}`,
      {
        type: args.type,
        estimatedBudget,
        estimatedTimeline,
        complexityScore,
        contactEmail: args.contactEmail,
      },
    );

    return projectId;
  },
});

// Get all project consultations with optional filtering
export const getProjectConsultations = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("reviewing"),
        v.literal("quoted"),
        v.literal("accepted"),
        v.literal("declined"),
        v.literal("in_progress"),
        v.literal("completed"),
        v.literal("cancelled"),
      ),
    ),
    type: v.optional(
      v.union(
        v.literal("website-redesign"),
        v.literal("new-website"),
        v.literal("ecommerce"),
        v.literal("web-app"),
        v.literal("mobile-app"),
        v.literal("branding"),
      ),
    ),
    urgency: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent"),
      ),
    ),
    assignedTo: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Apply filters with proper type checking
    if (args.status) {
      const results = await ctx.db
        .query("projectConsultations")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    if (args.type) {
      const results = await ctx.db
        .query("projectConsultations")
        .withIndex("by_type", (q) => q.eq("type", args.type!))
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    if (args.urgency) {
      const results = await ctx.db
        .query("projectConsultations")
        .withIndex("by_urgency", (q) => q.eq("urgency", args.urgency!))
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    if (args.assignedTo) {
      const results = await ctx.db
        .query("projectConsultations")
        .withIndex("by_assigned_to", (q) =>
          q.eq("assignedTo", args.assignedTo!),
        )
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    // Default query ordered by creation date
    const results = await ctx.db
      .query("projectConsultations")
      .withIndex("by_created_at")
      .order("desc")
      .collect();

    return args.limit ? results.slice(0, args.limit) : results;
  },
});

// Get a single project consultation by ID
export const getProjectConsultation = query({
  args: { id: v.id("projectConsultations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update project consultation status
export const updateProjectStatus = mutation({
  args: {
    id: v.id("projectConsultations"),
    status: v.union(
      v.literal("new"),
      v.literal("reviewing"),
      v.literal("quoted"),
      v.literal("accepted"),
      v.literal("declined"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    userId: v.optional(v.id("users")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingProject = await ctx.db.get(args.id);
    if (!existingProject) {
      throw new Error("Project consultation not found");
    }

    const previousStatus = existingProject.status;
    const now = Date.now();

    // Update the project with appropriate timestamp
    const updateData: any = {
      status: args.status,
      updatedAt: now,
    };

    // Set specific timestamps based on status
    switch (args.status) {
      case "reviewing":
        updateData.reviewedAt = now;
        break;
      case "quoted":
        updateData.quotedAt = now;
        break;
      case "accepted":
        updateData.acceptedAt = now;
        break;
      case "completed":
        updateData.completedAt = now;
        break;
    }

    await ctx.db.patch(args.id, updateData);

    // Add note if provided
    if (args.notes) {
      const currentNotes = existingProject.notes || [];
      await ctx.db.patch(args.id, {
        notes: [
          ...currentNotes,
          {
            content: args.notes,
            author: "System", // You might want to get this from auth
            timestamp: now,
            type: "note" as const,
          },
        ],
      });
    }

    // Log the status change
    await logProjectActivity(
      ctx,
      args.id,
      "status_changed",
      `Status changed from ${previousStatus} to ${args.status}`,
      {
        previousValue: previousStatus,
        newValue: args.status,
        field: "status",
        userId: args.userId,
      },
    );

    return args.id;
  },
});

// Assign project to user
export const assignProject = mutation({
  args: {
    projectId: v.id("projectConsultations"),
    userId: v.id("users"),
    assignedBy: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project consultation not found");
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const previousAssignee = project.assignedTo;

    await ctx.db.patch(args.projectId, {
      assignedTo: args.userId,
      updatedAt: Date.now(),
    });

    // Log the assignment
    await logProjectActivity(
      ctx,
      args.projectId,
      "project_assigned",
      `Project assigned to ${user.name}`,
      {
        previousValue: previousAssignee,
        newValue: args.userId,
        field: "assignedTo",
        assignedBy: args.assignedBy,
      },
    );

    return args.projectId;
  },
});

// Add note to project
export const addProjectNote = mutation({
  args: {
    projectId: v.id("projectConsultations"),
    content: v.string(),
    author: v.string(),
    type: v.union(
      v.literal("note"),
      v.literal("email"),
      v.literal("call"),
      v.literal("meeting"),
    ),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project consultation not found");
    }

    const currentNotes = project.notes || [];
    const newNote = {
      content: args.content,
      author: args.author,
      timestamp: Date.now(),
      type: args.type,
    };

    await ctx.db.patch(args.projectId, {
      notes: [...currentNotes, newNote],
      updatedAt: Date.now(),
    });

    // Log the note addition
    await logProjectActivity(
      ctx,
      args.projectId,
      "note_added",
      `${args.type} note added by ${args.author}`,
      { noteType: args.type },
    );

    return args.projectId;
  },
});

// Search project consultations
export const searchProjectConsultations = query({
  args: {
    searchTerm: v.string(),
    type: v.optional(
      v.union(
        v.literal("website-redesign"),
        v.literal("new-website"),
        v.literal("ecommerce"),
        v.literal("web-app"),
        v.literal("mobile-app"),
        v.literal("branding"),
      ),
    ),
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("reviewing"),
        v.literal("quoted"),
        v.literal("accepted"),
        v.literal("declined"),
        v.literal("in_progress"),
        v.literal("completed"),
        v.literal("cancelled"),
      ),
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("projectConsultations")
      .withSearchIndex("search_projects", (q) =>
        q.search("description", args.searchTerm),
      );

    // Apply filters
    if (args.type) {
      query = query.filter((q) => q.eq(q.field("type"), args.type));
    }
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    if (args.limit) {
      return await query.take(args.limit);
    }

    return await query.collect();
  },
});

// Get project consultation statistics
export const getProjectStats = query({
  args: {},
  handler: async (ctx) => {
    const allProjects = await ctx.db.query("projectConsultations").collect();

    const stats = {
      total: allProjects.length,
      byStatus: {
        new: 0,
        reviewing: 0,
        quoted: 0,
        accepted: 0,
        declined: 0,
        in_progress: 0,
        completed: 0,
        cancelled: 0,
      },
      byType: {
        "website-redesign": 0,
        "new-website": 0,
        ecommerce: 0,
        "web-app": 0,
        "mobile-app": 0,
        branding: 0,
      },
      byUrgency: {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0,
      },
      averageEstimatedBudget: 0,
      averageEstimatedTimeline: 0,
      averageComplexityScore: 0,
    };

    let totalBudget = 0;
    let totalTimeline = 0;
    let totalComplexity = 0;
    let budgetCount = 0;
    let timelineCount = 0;
    let complexityCount = 0;

    allProjects.forEach((project) => {
      stats.byStatus[project.status]++;
      if (project.type) {
        stats.byType[project.type]++;
      }
      stats.byUrgency[project.priority]++;

      if (project.estimatedBudget) {
        totalBudget += project.estimatedBudget;
        budgetCount++;
      }
      if (project.estimatedTimeline) {
        totalTimeline += project.estimatedTimeline;
        timelineCount++;
      }
      if (project.complexityScore) {
        totalComplexity += project.complexityScore;
        complexityCount++;
      }
    });

    stats.averageEstimatedBudget =
      budgetCount > 0 ? Math.round(totalBudget / budgetCount) : 0;
    stats.averageEstimatedTimeline =
      timelineCount > 0 ? Math.round(totalTimeline / timelineCount) : 0;
    stats.averageComplexityScore =
      complexityCount > 0
        ? Math.round((totalComplexity / complexityCount) * 10) / 10
        : 0;

    return stats;
  },
});

// Delete project consultation
export const deleteProjectConsultation = mutation({
  args: {
    id: v.id("projectConsultations"),
    permanent: v.optional(v.boolean()),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project consultation not found");
    }

    if (args.permanent) {
      // Hard delete
      await ctx.db.delete(args.id);

      // Log the deletion
      await logProjectActivity(
        ctx,
        args.id,
        "project_deleted",
        `Project consultation permanently deleted`,
        {
          projectName: project.name,
          contactEmail: project.contactEmail,
          deletedBy: args.userId,
        },
      );
    } else {
      // Soft delete by marking as cancelled
      await ctx.db.patch(args.id, {
        status: "cancelled",
        updatedAt: Date.now(),
      });

      // Log the soft deletion
      await logProjectActivity(
        ctx,
        args.id,
        "project_cancelled",
        `Project consultation cancelled`,
        {
          projectName: project.name,
          contactEmail: project.contactEmail,
          cancelledBy: args.userId,
        },
      );
    }

    return args.id;
  },
});

// Get project activities (reusing the activities table)
export const getProjectActivities = query({
  args: {
    projectId: v.id("projectConsultations"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("activities")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc");

    if (args.limit) {
      return await query.take(args.limit);
    }

    return await query.collect();
  },
});

// Update project estimates (for admin use)
export const updateProjectEstimates = mutation({
  args: {
    id: v.id("projectConsultations"),
    estimatedBudget: v.optional(v.number()),
    estimatedTimeline: v.optional(v.number()),
    complexityScore: v.optional(v.number()),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project consultation not found");
    }

    const updateData: any = {
      updatedAt: Date.now(),
    };

    if (args.estimatedBudget !== undefined) {
      updateData.estimatedBudget = args.estimatedBudget;
    }
    if (args.estimatedTimeline !== undefined) {
      updateData.estimatedTimeline = args.estimatedTimeline;
    }
    if (args.complexityScore !== undefined) {
      updateData.complexityScore = args.complexityScore;
    }

    await ctx.db.patch(args.id, updateData);

    // Log the estimate update
    await logProjectActivity(
      ctx,
      args.id,
      "estimates_updated",
      `Project estimates updated`,
      {
        estimatedBudget: args.estimatedBudget,
        estimatedTimeline: args.estimatedTimeline,
        complexityScore: args.complexityScore,
        updatedBy: args.userId,
      },
    );

    return args.id;
  },
});
