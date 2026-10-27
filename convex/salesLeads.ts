import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireSuperAdmin } from "./adminAuth";

const stage = v.union(
  v.literal("new"),
  v.literal("contacted"),
  v.literal("proposal"),
  v.literal("negotiation"),
  v.literal("won"),
  v.literal("lost")
);

const source = v.union(
  v.literal("business_check"),
  v.literal("contact"),
  v.literal("project"),
  v.literal("manual")
);

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireSuperAdmin(ctx);
    return await ctx.db.query("salesLeads")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    source,
    businessCheckId: v.optional(v.id("businessChecks")),
    contactId: v.optional(v.id("contacts")),
    projectId: v.optional(v.id("projectConsultations")),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    solution: v.optional(v.string()),
    estimatedValue: v.optional(v.number()),
    currency: v.optional(v.string()),
    nextFollowUpAt: v.optional(v.number()),
    assignedTo: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireSuperAdmin(ctx);
    const now = Date.now();
    return await ctx.db.insert("salesLeads", {
      ...args,
      stage: "new",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("salesLeads"),
    stage: v.optional(stage),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    solution: v.optional(v.string()),
    estimatedValue: v.optional(v.number()),
    currency: v.optional(v.string()),
    nextFollowUpAt: v.optional(v.number()),
    assignedTo: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...changes }) => {
    await requireSuperAdmin(ctx);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Lead not found");
    await ctx.db.patch(id, {
      ...changes,
      updatedAt: Date.now(),
    });
  },
});
