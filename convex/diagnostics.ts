import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Simple echo function that returns whatever you send it.
 *
 * This function is useful for testing the Convex connection and API access.
 */
export const echo = query({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return {
      message: args.message,
      timestamp: Date.now(),
      serverTime: new Date().toISOString(),
    };
  },
});

/**
 * Test the schema validation for the activities table.
 *
 * This function attempts to insert a minimal activity record to test
 * if the schema validation is working correctly.
 */
export const testActivitySchema = mutation({
  args: {
    contactId: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      // Create a timestamp for unique identification
      const timestamp = Date.now();

      // Create an activity with minimal required fields
      const activityId = await ctx.db.insert("activities", {
        action: "diagnostic_test",
        details: args.message || `Diagnostic test at ${new Date(timestamp).toISOString()}`,
        timestamp,
        metadata: {
          // Only include the fields defined in the schema
          field: "test",
          newValue: timestamp,
          previousValue: null,
        }
      });

      return {
        success: true,
        activityId,
        message: "Successfully created activity record",
        timestamp,
      };
    } catch (error) {
      // Return error details instead of throwing
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: Date.now(),
      };
    }
  },
});

/**
 * Test creating a minimal contact record.
 *
 * This can help diagnose issues with the contact creation process.
 */
export const testCreateContact = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const timestamp = Date.now();

      // Create a contact with minimal required fields
      const contactId = await ctx.db.insert("contacts", {
        name: args.name || "Test User",
        email: args.email || `test-${timestamp}@example.com`,
        message: args.message || `Test message created at ${new Date(timestamp).toISOString()}`,
        contactType: "general",
        priority: "medium",
        status: "new",
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      return {
        success: true,
        contactId,
        message: "Successfully created contact",
        timestamp,
      };
    } catch (error) {
      // Return error details
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: Date.now(),
      };
    }
  },
});

/**
 * Get system information for diagnostics.
 */
export const getSystemInfo = query({
  args: {},
  handler: async (ctx) => {
    return {
      timestamp: Date.now(),
      serverTime: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    };
  },
});

/**
 * Test database access by counting records in tables.
 */
export const countRecords = query({
  args: {},
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").collect();
    const activities = await ctx.db.query("activities").collect();
    const users = await ctx.db.query("users").collect();
    const projects = await ctx.db.query("projectConsultations").collect();

    return {
      counts: {
        contacts: contacts.length,
        activities: activities.length,
        users: users.length,
        projects: projects.length,
      },
      timestamp: Date.now(),
    };
  },
});
