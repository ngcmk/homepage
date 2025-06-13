import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Helper function to log activity
async function logActivity(
  ctx: any,
  contactId: Id<"contacts">,
  action: string,
  details?: string,
  metadata?: any,
) {
  await ctx.db.insert("activities", {
    contactId,
    action,
    details,
    metadata,
    timestamp: Date.now(),
  });
}

// Create a new contact
export const createContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    contactType: v.union(
      v.literal("general"),
      v.literal("business"),
      v.literal("support"),
      v.literal("partnership"),
      v.literal("careers"),
    ),
    priority: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent"),
      ),
    ),
    source: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    referrer: v.optional(v.string()),
    gdprConsent: v.optional(v.boolean()),
    marketingConsent: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const contactId = await ctx.db.insert("contacts", {
      ...args,
      priority: args.priority || "medium",
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    // Log the creation activity
    await logActivity(
      ctx,
      contactId,
      "contact_created",
      `Contact created by ${args.name}`,
      { email: args.email, contactType: args.contactType },
    );

    return contactId;
  },
});

// Get all contacts with optional filtering
export const getContacts = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("in_progress"),
        v.literal("resolved"),
        v.literal("closed"),
        v.literal("spam"),
      ),
    ),
    contactType: v.optional(
      v.union(
        v.literal("general"),
        v.literal("business"),
        v.literal("support"),
        v.literal("partnership"),
        v.literal("careers"),
      ),
    ),
    priority: v.optional(
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
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    if (args.contactType) {
      const results = await ctx.db
        .query("contacts")
        .withIndex("by_contact_type", (q) =>
          q.eq("contactType", args.contactType!),
        )
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    if (args.priority) {
      const results = await ctx.db
        .query("contacts")
        .withIndex("by_priority", (q) => q.eq("priority", args.priority!))
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    if (args.assignedTo) {
      const results = await ctx.db
        .query("contacts")
        .withIndex("by_assigned_to", (q) =>
          q.eq("assignedTo", args.assignedTo!),
        )
        .order("desc")
        .collect();

      return args.limit ? results.slice(0, args.limit) : results;
    }

    // Default query ordered by creation date
    const results = await ctx.db
      .query("contacts")
      .withIndex("by_created_at")
      .order("desc")
      .collect();

    return args.limit ? results.slice(0, args.limit) : results;
  },
});

// Get a single contact by ID
export const getContact = query({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update contact status
export const updateContactStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed"),
      v.literal("spam"),
    ),
    userId: v.optional(v.id("users")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingContact = await ctx.db.get(args.id);
    if (!existingContact) {
      throw new Error("Contact not found");
    }

    const previousStatus = existingContact.status;
    const now = Date.now();

    // Update the contact
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: now,
      ...(args.status === "resolved" && { resolvedAt: now }),
    });

    // Add note if provided
    if (args.notes) {
      const currentNotes = existingContact.notes || [];
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
    await logActivity(
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

// Assign contact to user
export const assignContact = mutation({
  args: {
    contactId: v.id("contacts"),
    userId: v.id("users"),
    assignedBy: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const previousAssignee = contact.assignedTo;

    await ctx.db.patch(args.contactId, {
      assignedTo: args.userId,
      updatedAt: Date.now(),
    });

    // Log the assignment
    await logActivity(
      ctx,
      args.contactId,
      "contact_assigned",
      `Contact assigned to ${user.name}`,
      {
        previousValue: previousAssignee,
        newValue: args.userId,
        field: "assignedTo",
        assignedBy: args.assignedBy,
      },
    );

    return args.contactId;
  },
});

// Add note to contact
export const addNote = mutation({
  args: {
    contactId: v.id("contacts"),
    content: v.string(),
    author: v.string(),
    type: v.union(v.literal("note"), v.literal("email"), v.literal("call")),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }

    const currentNotes = contact.notes || [];
    const newNote = {
      content: args.content,
      author: args.author,
      timestamp: Date.now(),
      type: args.type,
    };

    await ctx.db.patch(args.contactId, {
      notes: [...currentNotes, newNote],
      updatedAt: Date.now(),
      ...(args.type !== "note" && { lastContactedAt: Date.now() }),
    });

    // Log the note addition
    await logActivity(
      ctx,
      args.contactId,
      "note_added",
      `${args.type} note added by ${args.author}`,
      { noteType: args.type },
    );

    return args.contactId;
  },
});

// Search contacts
export const searchContacts = query({
  args: {
    searchTerm: v.string(),
    contactType: v.optional(
      v.union(
        v.literal("general"),
        v.literal("business"),
        v.literal("support"),
        v.literal("partnership"),
        v.literal("careers"),
      ),
    ),
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("in_progress"),
        v.literal("resolved"),
        v.literal("closed"),
        v.literal("spam"),
      ),
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("contacts")
      .withSearchIndex("search_contacts", (q) =>
        q.search("message", args.searchTerm),
      );

    // Apply filters
    if (args.contactType) {
      query = query.filter((q) =>
        q.eq(q.field("contactType"), args.contactType),
      );
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

// Get contact statistics
export const getContactStats = query({
  args: {},
  handler: async (ctx) => {
    const allContacts = await ctx.db.query("contacts").collect();

    const stats = {
      total: allContacts.length,
      byStatus: {
        new: 0,
        in_progress: 0,
        resolved: 0,
        closed: 0,
        spam: 0,
      },
      byType: {
        general: 0,
        business: 0,
        support: 0,
        partnership: 0,
        careers: 0,
      },
      byPriority: {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0,
      },
    };

    allContacts.forEach((contact) => {
      stats.byStatus[contact.status]++;
      stats.byType[contact.contactType]++;
      stats.byPriority[contact.priority]++;
    });

    return stats;
  },
});

// Delete contact (soft delete by marking as spam or hard delete)
export const deleteContact = mutation({
  args: {
    id: v.id("contacts"),
    permanent: v.optional(v.boolean()),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    if (args.permanent) {
      // Hard delete
      await ctx.db.delete(args.id);

      // Log the deletion
      await logActivity(
        ctx,
        args.id,
        "contact_deleted",
        `Contact permanently deleted`,
        { email: contact.email, deletedBy: args.userId },
      );
    } else {
      // Soft delete by marking as spam
      await ctx.db.patch(args.id, {
        status: "spam",
        updatedAt: Date.now(),
      });

      // Log the soft deletion
      await logActivity(
        ctx,
        args.id,
        "contact_marked_spam",
        `Contact marked as spam`,
        { email: contact.email, markedBy: args.userId },
      );
    }

    return args.id;
  },
});

// Get contact activities
export const getContactActivities = query({
  args: {
    contactId: v.id("contacts"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("activities")
      .withIndex("by_contact", (q) => q.eq("contactId", args.contactId))
      .order("desc");

    if (args.limit) {
      return await query.take(args.limit);
    }

    return await query.collect();
  },
});
