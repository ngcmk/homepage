import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contacts: defineTable({
    // Basic Information
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),

    // Contact Details
    subject: v.optional(v.string()),
    message: v.string(),

    // Categorization
    contactType: v.union(
      v.literal("general"),
      v.literal("business"),
      v.literal("support"),
      v.literal("partnership"),
      v.literal("careers"),
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent"),
    ),

    // Status Tracking
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed"),
      v.literal("spam"),
    ),

    // Additional Information
    source: v.optional(v.string()), // website, mobile app, etc.
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    referrer: v.optional(v.string()),

    // Assignment and Organization
    assignedTo: v.optional(v.id("users")),
    department: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),

    // Communication History
    notes: v.optional(
      v.array(
        v.object({
          content: v.string(),
          author: v.string(),
          timestamp: v.number(),
          type: v.union(
            v.literal("note"),
            v.literal("email"),
            v.literal("call"),
          ),
        }),
      ),
    ),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    resolvedAt: v.optional(v.number()),
    lastContactedAt: v.optional(v.number()),

    // Privacy and Compliance
    gdprConsent: v.optional(v.boolean()),
    marketingConsent: v.optional(v.boolean()),
    dataRetentionDate: v.optional(v.number()),
  })
    // Indexes for efficient querying
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_contact_type", ["contactType"])
    .index("by_priority", ["priority"])
    .index("by_assigned_to", ["assignedTo"])
    .index("by_status_and_priority", ["status", "priority"])
    .index("by_type_and_status", ["contactType", "status"])

    // Search index for full-text search
    .searchIndex("search_contacts", {
      searchField: "message",
      filterFields: ["contactType", "status", "priority", "assignedTo"],
    })

    // Search index for names and companies
    .searchIndex("search_names", {
      searchField: "name",
      filterFields: ["contactType", "company"],
    }),

  // Users table for assignment functionality
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("agent"),
      v.literal("manager"),
      v.literal("viewer"),
    ),
    department: v.optional(v.string()),
    isActive: v.boolean(),
    lastLogin: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_department", ["department"]),

  // Contact templates for quick responses
  templates: defineTable({
    name: v.string(),
    subject: v.string(),
    content: v.string(),
    category: v.string(),
    isActive: v.boolean(),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_created_by", ["createdBy"]),

  // Activity log for audit trail
  activities: defineTable({
    contactId: v.optional(v.id("contacts")),
    projectId: v.optional(v.id("projectConsultations")),
    userId: v.optional(v.id("users")),
    action: v.string(),
    details: v.optional(v.string()),
    metadata: v.optional(
      v.object({
        previousValue: v.any(),
        newValue: v.any(),
        field: v.optional(v.string()),
      }),
    ),
    timestamp: v.number(),
  })
    .index("by_contact", ["contactId"])
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),

  // Project consultations table
  projectConsultations: defineTable({
    // Basic Project Information
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

    // Project Details
    industry: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
    existingWebsite: v.optional(v.string()),
    goals: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),

    // Timeline & Budget
    timeline: v.optional(v.string()),
    budget: v.optional(v.string()),
    hasContent: v.optional(v.string()),
    designPreferences: v.optional(v.string()),

    // Contact Information
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    company: v.optional(v.string()),
    preferredContact: v.optional(v.string()),
    additionalInfo: v.optional(v.string()),

    // Status Tracking
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
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent"),
    ),

    // Assignment and Organization
    assignedTo: v.optional(v.id("users")),
    estimatedBudget: v.optional(v.number()),
    estimatedTimeline: v.optional(v.number()), // in weeks
    complexityScore: v.optional(v.number()),

    // Client metadata
    source: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    referrer: v.optional(v.string()),

    // File attachments (stored as file IDs)
    attachments: v.optional(v.array(v.id("_storage"))),

    // Communication History
    notes: v.optional(
      v.array(
        v.object({
          content: v.string(),
          author: v.string(),
          timestamp: v.number(),
          type: v.union(
            v.literal("note"),
            v.literal("email"),
            v.literal("call"),
            v.literal("meeting"),
          ),
        }),
      ),
    ),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    reviewedAt: v.optional(v.number()),
    quotedAt: v.optional(v.number()),
    acceptedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
  })
    // Indexes for efficient querying
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_urgency", ["urgency"])
    .index("by_type", ["type"])
    .index("by_assigned_to", ["assignedTo"])
    .index("by_contact_email", ["contactEmail"])
    .index("by_status_and_urgency", ["status", "urgency"])
    .index("by_type_and_status", ["type", "status"])

    // Search index for project descriptions and names
    .searchIndex("search_projects", {
      searchField: "description",
      filterFields: ["type", "status", "urgency", "industry"],
    })

    // Search index for contact information
    .searchIndex("search_contacts", {
      searchField: "contactName",
      filterFields: ["status", "type"],
    }),
});
