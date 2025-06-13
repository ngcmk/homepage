import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NODE_ENV === "production"
      ? "https://your-domain.com" // Replace with your actual domain
      : "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// Helper function to create JSON responses
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

// Helper function to handle errors
function errorResponse(message: string, status = 400) {
  return new Response(
    JSON.stringify({
      error: message,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    },
  );
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Handle CORS preflight requests
http.route({
  path: "/contacts",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }),
});

http.route({
  path: "/contacts/{id}",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }),
});

// GET /contacts - List all contacts with optional filtering
http.route({
  path: "/contacts",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const params = url.searchParams;

      // Extract query parameters
      const status = params.get("status") as any;
      const contactType = params.get("contactType") as any;
      const priority = params.get("priority") as any;
      const assignedTo = params.get("assignedTo");
      const limit = params.get("limit")
        ? parseInt(params.get("limit")!)
        : undefined;
      const search = params.get("search");

      let contacts;

      if (search) {
        // Use search if search term is provided
        contacts = await ctx.runQuery(api.contacts.searchContacts, {
          searchTerm: search,
          contactType,
          status,
          limit,
        });
      } else {
        // Regular filtered query
        contacts = await ctx.runQuery(api.contacts.getContacts, {
          status,
          contactType,
          priority,
          assignedTo: assignedTo as Id<"users"> | undefined,
          limit,
        });
      }

      return jsonResponse({
        success: true,
        data: contacts,
        count: contacts.length,
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return errorResponse("Failed to fetch contacts", 500);
    }
  }),
});

// POST /contacts - Create a new contact
http.route({
  path: "/contacts",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.name || typeof body.name !== "string") {
        return errorResponse("Name is required and must be a string");
      }

      if (!body.email || typeof body.email !== "string") {
        return errorResponse("Email is required and must be a string");
      }

      if (!isValidEmail(body.email)) {
        return errorResponse("Invalid email format");
      }

      if (!body.message || typeof body.message !== "string") {
        return errorResponse("Message is required and must be a string");
      }

      if (!body.contactType) {
        return errorResponse("Contact type is required");
      }

      // Validate contactType
      const validContactTypes = [
        "general",
        "business",
        "support",
        "partnership",
        "careers",
      ];
      if (!validContactTypes.includes(body.contactType)) {
        return errorResponse(
          `Invalid contact type. Must be one of: ${validContactTypes.join(", ")}`,
        );
      }

      // Validate priority if provided
      if (body.priority) {
        const validPriorities = ["low", "medium", "high", "urgent"];
        if (!validPriorities.includes(body.priority)) {
          return errorResponse(
            `Invalid priority. Must be one of: ${validPriorities.join(", ")}`,
          );
        }
      }

      // Extract client information from headers
      const userAgent = request.headers.get("user-agent") || undefined;
      const forwarded = request.headers.get("x-forwarded-for");
      const ipAddress = forwarded ? forwarded.split(",")[0].trim() : undefined;
      const referrer = request.headers.get("referer") || undefined;

      // Create the contact
      const contactId = await ctx.runMutation(api.contacts.createContact, {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        subject: body.subject,
        message: body.message,
        contactType: body.contactType,
        priority: body.priority,
        source: body.source || "api",
        userAgent,
        ipAddress,
        referrer,
        gdprConsent: body.gdprConsent,
        marketingConsent: body.marketingConsent,
      });

      return jsonResponse(
        {
          success: true,
          data: { id: contactId },
          message: "Contact created successfully",
        },
        201,
      );
    } catch (error) {
      console.error("Error creating contact:", error);
      return errorResponse("Failed to create contact", 500);
    }
  }),
});

// GET /contacts/{id} - Get a specific contact
http.route({
  path: "/contacts/{id}",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();

      if (!id) {
        return errorResponse("Contact ID is required");
      }

      const contact = await ctx.runQuery(api.contacts.getContact, {
        id: id as Id<"contacts">,
      });

      if (!contact) {
        return errorResponse("Contact not found", 404);
      }

      return jsonResponse({
        success: true,
        data: contact,
      });
    } catch (error) {
      console.error("Error fetching contact:", error);
      return errorResponse("Failed to fetch contact", 500);
    }
  }),
});

// PUT /contacts/{id}/status - Update contact status
http.route({
  path: "/contacts/{id}/status",
  method: "PUT",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /contacts/{id}/status
      const body = await request.json();

      if (!id) {
        return errorResponse("Contact ID is required");
      }

      if (!body.status) {
        return errorResponse("Status is required");
      }

      const validStatuses = [
        "new",
        "in_progress",
        "resolved",
        "closed",
        "spam",
      ];
      if (!validStatuses.includes(body.status)) {
        return errorResponse(
          `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        );
      }

      await ctx.runMutation(api.contacts.updateContactStatus, {
        id: id as Id<"contacts">,
        status: body.status,
        userId: body.userId as Id<"users"> | undefined,
        notes: body.notes,
      });

      return jsonResponse({
        success: true,
        message: "Contact status updated successfully",
      });
    } catch (error) {
      console.error("Error updating contact status:", error);
      if (error instanceof Error && error.message === "Contact not found") {
        return errorResponse("Contact not found", 404);
      }
      return errorResponse("Failed to update contact status", 500);
    }
  }),
});

// POST /contacts/{id}/notes - Add a note to a contact
http.route({
  path: "/contacts/{id}/notes",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /contacts/{id}/notes
      const body = await request.json();

      if (!id) {
        return errorResponse("Contact ID is required");
      }

      if (!body.content || typeof body.content !== "string") {
        return errorResponse("Note content is required and must be a string");
      }

      if (!body.author || typeof body.author !== "string") {
        return errorResponse("Note author is required and must be a string");
      }

      const validTypes = ["note", "email", "call"];
      const type = body.type || "note";
      if (!validTypes.includes(type)) {
        return errorResponse(
          `Invalid note type. Must be one of: ${validTypes.join(", ")}`,
        );
      }

      await ctx.runMutation(api.contacts.addNote, {
        contactId: id as Id<"contacts">,
        content: body.content,
        author: body.author,
        type,
      });

      return jsonResponse(
        {
          success: true,
          message: "Note added successfully",
        },
        201,
      );
    } catch (error) {
      console.error("Error adding note:", error);
      if (error instanceof Error && error.message === "Contact not found") {
        return errorResponse("Contact not found", 404);
      }
      return errorResponse("Failed to add note", 500);
    }
  }),
});

// GET /contacts/{id}/activities - Get contact activities
http.route({
  path: "/contacts/{id}/activities",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /contacts/{id}/activities
      const params = url.searchParams;
      const limit = params.get("limit")
        ? parseInt(params.get("limit")!)
        : undefined;

      if (!id) {
        return errorResponse("Contact ID is required");
      }

      const activities = await ctx.runQuery(api.contacts.getContactActivities, {
        contactId: id as Id<"contacts">,
        limit,
      });

      return jsonResponse({
        success: true,
        data: activities,
        count: activities.length,
      });
    } catch (error) {
      console.error("Error fetching contact activities:", error);
      return errorResponse("Failed to fetch contact activities", 500);
    }
  }),
});

// DELETE /contacts/{id} - Delete a contact
http.route({
  path: "/contacts/{id}",
  method: "DELETE",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();
      const params = url.searchParams;
      const permanent = params.get("permanent") === "true";

      if (!id) {
        return errorResponse("Contact ID is required");
      }

      await ctx.runMutation(api.contacts.deleteContact, {
        id: id as Id<"contacts">,
        permanent,
      });

      return jsonResponse({
        success: true,
        message: permanent
          ? "Contact permanently deleted"
          : "Contact marked as spam",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      if (error instanceof Error && error.message === "Contact not found") {
        return errorResponse("Contact not found", 404);
      }
      return errorResponse("Failed to delete contact", 500);
    }
  }),
});

// GET /contacts/stats - Get contact statistics
http.route({
  path: "/contacts/stats",
  method: "GET",
  handler: httpAction(async (ctx) => {
    try {
      const stats = await ctx.runQuery(api.contacts.getContactStats, {});

      return jsonResponse({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Error fetching contact stats:", error);
      return errorResponse("Failed to fetch contact statistics", 500);
    }
  }),
});

// PUT /contacts/{id}/assign - Assign contact to user
http.route({
  path: "/contacts/{id}/assign",
  method: "PUT",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /contacts/{id}/assign
      const body = await request.json();

      if (!id) {
        return errorResponse("Contact ID is required");
      }

      if (!body.userId) {
        return errorResponse("User ID is required");
      }

      await ctx.runMutation(api.contacts.assignContact, {
        contactId: id as Id<"contacts">,
        userId: body.userId as Id<"users">,
        assignedBy: body.assignedBy as Id<"users"> | undefined,
      });

      return jsonResponse({
        success: true,
        message: "Contact assigned successfully",
      });
    } catch (error) {
      console.error("Error assigning contact:", error);
      if (
        error instanceof Error &&
        (error.message === "Contact not found" ||
          error.message === "User not found")
      ) {
        return errorResponse(error.message, 404);
      }
      return errorResponse("Failed to assign contact", 500);
    }
  }),
});

// GET /project-consultations - List all project consultations with optional filtering
http.route({
  path: "/project-consultations",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const params = url.searchParams;

      // Extract query parameters
      const status = params.get("status") as any;
      const type = params.get("type") as any;
      const urgency = params.get("urgency") as any;
      const assignedTo = params.get("assignedTo");
      const limit = params.get("limit")
        ? parseInt(params.get("limit")!)
        : undefined;
      const search = params.get("search");

      let projects;

      if (search) {
        // Use search if search term is provided
        projects = await ctx.runQuery(
          api.projectConsultations.searchProjectConsultations,
          {
            searchTerm: search,
            type,
            status,
            limit,
          },
        );
      } else {
        // Regular filtered query
        projects = await ctx.runQuery(
          api.projectConsultations.getProjectConsultations,
          {
            status,
            type,
            urgency,
            assignedTo: assignedTo as Id<"users"> | undefined,
            limit,
          },
        );
      }

      return jsonResponse({
        success: true,
        data: projects,
        count: projects.length,
      });
    } catch (error) {
      console.error("Error fetching project consultations:", error);
      return errorResponse("Failed to fetch project consultations", 500);
    }
  }),
});

// POST /project-consultations - Create a new project consultation
http.route({
  path: "/project-consultations",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();

      // Validate required fields (since most are optional, minimal validation)
      if (body.contactEmail && !isValidEmail(body.contactEmail)) {
        return errorResponse("Invalid email format");
      }

      // Validate type if provided
      if (body.type) {
        const validTypes = [
          "website-redesign",
          "new-website",
          "ecommerce",
          "web-app",
          "mobile-app",
          "branding",
        ];
        if (!validTypes.includes(body.type)) {
          return errorResponse(
            `Invalid project type. Must be one of: ${validTypes.join(", ")}`,
          );
        }
      }

      // Validate urgency if provided
      if (body.urgency) {
        const validUrgencies = ["low", "medium", "high", "urgent"];
        if (!validUrgencies.includes(body.urgency)) {
          return errorResponse(
            `Invalid urgency. Must be one of: ${validUrgencies.join(", ")}`,
          );
        }
      }

      // Extract client information from headers
      const userAgent = request.headers.get("user-agent") || undefined;
      const forwarded = request.headers.get("x-forwarded-for");
      const ipAddress = forwarded ? forwarded.split(",")[0].trim() : undefined;
      const referrer = request.headers.get("referer") || undefined;

      // Create the project consultation
      const projectId = await ctx.runMutation(
        api.projectConsultations.createProjectConsultation,
        {
          name: body.name,
          description: body.description,
          type: body.type,
          urgency: body.urgency,
          industry: body.industry,
          targetAudience: body.targetAudience,
          existingWebsite: body.existingWebsite,
          goals: body.goals,
          features: body.features,
          timeline: body.timeline,
          budget: body.budget,
          hasContent: body.hasContent,
          designPreferences: body.designPreferences,
          contactName: body.contactName,
          contactEmail: body.contactEmail,
          contactPhone: body.contactPhone,
          company: body.company,
          preferredContact: body.preferredContact,
          additionalInfo: body.additionalInfo,
          source: body.source || "api",
          userAgent,
          ipAddress,
          referrer,
        },
      );

      return jsonResponse(
        {
          success: true,
          data: { id: projectId },
          message: "Project consultation created successfully",
        },
        201,
      );
    } catch (error) {
      console.error("Error creating project consultation:", error);
      return errorResponse("Failed to create project consultation", 500);
    }
  }),
});

// GET /project-consultations/{id} - Get a specific project consultation
http.route({
  path: "/project-consultations/{id}",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      const project = await ctx.runQuery(
        api.projectConsultations.getProjectConsultation,
        {
          id: id as Id<"projectConsultations">,
        },
      );

      if (!project) {
        return errorResponse("Project consultation not found", 404);
      }

      return jsonResponse({
        success: true,
        data: project,
      });
    } catch (error) {
      console.error("Error fetching project consultation:", error);
      return errorResponse("Failed to fetch project consultation", 500);
    }
  }),
});

// PUT /project-consultations/{id}/status - Update project consultation status
http.route({
  path: "/project-consultations/{id}/status",
  method: "PUT",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /project-consultations/{id}/status
      const body = await request.json();

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      if (!body.status) {
        return errorResponse("Status is required");
      }

      const validStatuses = [
        "new",
        "reviewing",
        "quoted",
        "accepted",
        "declined",
        "in_progress",
        "completed",
        "cancelled",
      ];
      if (!validStatuses.includes(body.status)) {
        return errorResponse(
          `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        );
      }

      await ctx.runMutation(api.projectConsultations.updateProjectStatus, {
        id: id as Id<"projectConsultations">,
        status: body.status,
        userId: body.userId as Id<"users"> | undefined,
        notes: body.notes,
      });

      return jsonResponse({
        success: true,
        message: "Project consultation status updated successfully",
      });
    } catch (error) {
      console.error("Error updating project consultation status:", error);
      if (
        error instanceof Error &&
        error.message === "Project consultation not found"
      ) {
        return errorResponse("Project consultation not found", 404);
      }
      return errorResponse("Failed to update project consultation status", 500);
    }
  }),
});

// POST /project-consultations/{id}/notes - Add a note to a project consultation
http.route({
  path: "/project-consultations/{id}/notes",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /project-consultations/{id}/notes
      const body = await request.json();

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      if (!body.content || typeof body.content !== "string") {
        return errorResponse("Note content is required and must be a string");
      }

      if (!body.author || typeof body.author !== "string") {
        return errorResponse("Note author is required and must be a string");
      }

      const validTypes = ["note", "email", "call", "meeting"];
      const type = body.type || "note";
      if (!validTypes.includes(type)) {
        return errorResponse(
          `Invalid note type. Must be one of: ${validTypes.join(", ")}`,
        );
      }

      await ctx.runMutation(api.projectConsultations.addProjectNote, {
        projectId: id as Id<"projectConsultations">,
        content: body.content,
        author: body.author,
        type,
      });

      return jsonResponse(
        {
          success: true,
          message: "Note added successfully",
        },
        201,
      );
    } catch (error) {
      console.error("Error adding note:", error);
      if (
        error instanceof Error &&
        error.message === "Project consultation not found"
      ) {
        return errorResponse("Project consultation not found", 404);
      }
      return errorResponse("Failed to add note", 500);
    }
  }),
});

// GET /project-consultations/{id}/activities - Get project consultation activities
http.route({
  path: "/project-consultations/{id}/activities",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /project-consultations/{id}/activities
      const params = url.searchParams;
      const limit = params.get("limit")
        ? parseInt(params.get("limit")!)
        : undefined;

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      const activities = await ctx.runQuery(
        api.projectConsultations.getProjectActivities,
        {
          projectId: id as Id<"projectConsultations">,
          limit,
        },
      );

      return jsonResponse({
        success: true,
        data: activities,
        count: activities.length,
      });
    } catch (error) {
      console.error("Error fetching project consultation activities:", error);
      return errorResponse(
        "Failed to fetch project consultation activities",
        500,
      );
    }
  }),
});

// DELETE /project-consultations/{id} - Delete a project consultation
http.route({
  path: "/project-consultations/{id}",
  method: "DELETE",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();
      const params = url.searchParams;
      const permanent = params.get("permanent") === "true";

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      await ctx.runMutation(
        api.projectConsultations.deleteProjectConsultation,
        {
          id: id as Id<"projectConsultations">,
          permanent,
        },
      );

      return jsonResponse({
        success: true,
        message: permanent
          ? "Project consultation permanently deleted"
          : "Project consultation cancelled",
      });
    } catch (error) {
      console.error("Error deleting project consultation:", error);
      if (
        error instanceof Error &&
        error.message === "Project consultation not found"
      ) {
        return errorResponse("Project consultation not found", 404);
      }
      return errorResponse("Failed to delete project consultation", 500);
    }
  }),
});

// GET /project-consultations/stats - Get project consultation statistics
http.route({
  path: "/project-consultations/stats",
  method: "GET",
  handler: httpAction(async (ctx) => {
    try {
      const stats = await ctx.runQuery(
        api.projectConsultations.getProjectStats,
        {},
      );

      return jsonResponse({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Error fetching project consultation stats:", error);
      return errorResponse(
        "Failed to fetch project consultation statistics",
        500,
      );
    }
  }),
});

// PUT /project-consultations/{id}/assign - Assign project consultation to user
http.route({
  path: "/project-consultations/{id}/assign",
  method: "PUT",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /project-consultations/{id}/assign
      const body = await request.json();

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      if (!body.userId) {
        return errorResponse("User ID is required");
      }

      await ctx.runMutation(api.projectConsultations.assignProject, {
        projectId: id as Id<"projectConsultations">,
        userId: body.userId as Id<"users">,
        assignedBy: body.assignedBy as Id<"users"> | undefined,
      });

      return jsonResponse({
        success: true,
        message: "Project consultation assigned successfully",
      });
    } catch (error) {
      console.error("Error assigning project consultation:", error);
      if (
        error instanceof Error &&
        (error.message === "Project consultation not found" ||
          error.message === "User not found")
      ) {
        return errorResponse(error.message, 404);
      }
      return errorResponse("Failed to assign project consultation", 500);
    }
  }),
});

// PUT /project-consultations/{id}/estimates - Update project estimates
http.route({
  path: "/project-consultations/{id}/estimates",
  method: "PUT",
  handler: httpAction(async (ctx, request) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/")[2]; // /project-consultations/{id}/estimates
      const body = await request.json();

      if (!id) {
        return errorResponse("Project consultation ID is required");
      }

      const estimates: any = {};
      if (body.estimatedBudget !== undefined) {
        if (
          typeof body.estimatedBudget !== "number" ||
          body.estimatedBudget < 0
        ) {
          return errorResponse("Estimated budget must be a positive number");
        }
        estimates.estimatedBudget = body.estimatedBudget;
      }
      if (body.estimatedTimeline !== undefined) {
        if (
          typeof body.estimatedTimeline !== "number" ||
          body.estimatedTimeline < 0
        ) {
          return errorResponse("Estimated timeline must be a positive number");
        }
        estimates.estimatedTimeline = body.estimatedTimeline;
      }
      if (body.complexityScore !== undefined) {
        if (
          typeof body.complexityScore !== "number" ||
          body.complexityScore < 0
        ) {
          return errorResponse("Complexity score must be a positive number");
        }
        estimates.complexityScore = body.complexityScore;
      }

      await ctx.runMutation(api.projectConsultations.updateProjectEstimates, {
        id: id as Id<"projectConsultations">,
        ...estimates,
        userId: body.userId as Id<"users"> | undefined,
      });

      return jsonResponse({
        success: true,
        message: "Project estimates updated successfully",
      });
    } catch (error) {
      console.error("Error updating project estimates:", error);
      if (
        error instanceof Error &&
        error.message === "Project consultation not found"
      ) {
        return errorResponse("Project consultation not found", 404);
      }
      return errorResponse("Failed to update project estimates", 500);
    }
  }),
});

// CORS preflight for project consultations
http.route({
  path: "/project-consultations",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }),
});

http.route({
  path: "/project-consultations/{id}",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }),
});

export default http;
