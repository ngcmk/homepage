"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

// Hook for fetching all contacts with optional filtering
export function useContacts(filters?: {
  status?: "new" | "in_progress" | "resolved" | "closed" | "spam";
  contactType?: "general" | "business" | "support" | "partnership" | "careers";
  priority?: "low" | "medium" | "high" | "urgent";
  assignedTo?: Id<"users">;
  limit?: number;
}) {
  return useQuery(api.contacts.getContacts, filters || {});
}

// Hook for fetching a single contact
export function useContact(id: Id<"contacts">) {
  return useQuery(api.contacts.getContact, { id });
}

// Hook for creating a new contact
export function useCreateContact() {
  return useMutation(api.contacts.createContact);
}

// Hook for updating contact status
export function useUpdateContactStatus() {
  return useMutation(api.contacts.updateContactStatus);
}

// Hook for assigning a contact to a user
export function useAssignContact() {
  return useMutation(api.contacts.assignContact);
}

// Hook for adding notes to a contact
export function useAddNote() {
  return useMutation(api.contacts.addNote);
}

// Hook for searching contacts
export function useSearchContacts(
  searchTerm: string,
  filters?: {
    contactType?:
      | "general"
      | "business"
      | "support"
      | "partnership"
      | "careers";
    status?: "new" | "in_progress" | "resolved" | "closed" | "spam";
    limit?: number;
  },
) {
  return useQuery(
    api.contacts.searchContacts,
    searchTerm.trim() ? { searchTerm, ...filters } : "skip",
  );
}

// Hook for getting contact statistics
export function useContactStats() {
  return useQuery(api.contacts.getContactStats, {});
}

// Hook for deleting a contact
export function useDeleteContact() {
  return useMutation(api.contacts.deleteContact);
}

// Hook for getting contact activities
export function useContactActivities(
  contactId: Id<"contacts">,
  limit?: number,
) {
  return useQuery(api.contacts.getContactActivities, {
    contactId,
    limit,
  });
}

// Custom hook for contact form submission
export function useContactForm() {
  // Use createContact directly to avoid initialization errors
  const createContact = useCreateContact();
  console.log("[Convex] Contact form hook initialized");

  // Track initialization state
  const isInitialized = createContact !== undefined && createContact !== null;
  console.log("[Convex] Hook initialized status:", isInitialized);

  // Add detailed function info for debugging
  if (typeof createContact === "function") {
    console.log(
      "[Convex] createContact function details:",
      createContact.toString().substring(0, 100) + "...",
    );
  }

  const submitContact = async (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    contactType: "general" | "business" | "support" | "partnership" | "careers";
    priority?: "low" | "medium" | "high" | "urgent";
    gdprConsent?: boolean;
    marketingConsent?: boolean;
    // Explicitly document fields that should NOT be included
    timestamp?: never; // This signals that timestamp should never be included
  }) => {
    console.log("[Convex] submitContact called with data:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      contactType: data.contactType,
    });

    // Simple check for createContact function
    if (!createContact || typeof createContact !== "function") {
      console.error("[Convex] createContact function not available");
      return {
        success: false,
        error: "Server connection not available. Please try again later.",
      };
    }

    // Create submission data without timestamp
    // Use a clean approach that only picks the fields we want
    const allowedFields = [
      "name",
      "email",
      "phone",
      "company",
      "subject",
      "message",
      "contactType",
      "priority",
      "gdprConsent",
      "marketingConsent",
      "source",
      "userAgent",
      "referrer",
      "ipAddress",
    ];

    // Define the type explicitly to match Convex mutation parameters
    type SubmissionDataType = {
      name: string;
      email: string;
      message: string;
      contactType:
        | "general"
        | "business"
        | "support"
        | "partnership"
        | "careers";
      priority?: "low" | "medium" | "high" | "urgent";
      phone?: string;
      company?: string;
      subject?: string;
      source?: string;
      userAgent?: string;
      referrer?: string;
      ipAddress?: string;
      gdprConsent?: boolean;
      marketingConsent?: boolean;
    };

    // Start with a clean object with the correct type
    const submissionData: SubmissionDataType = {
      // Set required fields with defaults
      name: data.name || "Unknown",
      email: data.email || "unknown@example.com",
      message: data.message || "No message provided",
      contactType: data.contactType || "general",
      priority: data.priority || "medium",
      source: "website",
    };

    // Only add allowed optional fields if they exist in data
    // For the allowed fields in the data object
    for (const field of allowedFields) {
      if (
        field in data &&
        !submissionData[field as keyof typeof submissionData]
      ) {
        // Use type assertion to handle dynamic property access
        (submissionData as Record<string, any>)[field] = (
          data as Record<string, any>
        )[field];
      }
    }

    // Add browser metadata
    if (typeof navigator !== "undefined") {
      submissionData.userAgent = navigator.userAgent;
    }

    if (typeof document !== "undefined") {
      submissionData.referrer = document.referrer || undefined;
    }

    // console.log("[Convex] Cleaned submission data:", submissionData);

    // try {
    //   // Add verbose diagnostic logging before submission
    //   console.log(
    //     "[Convex] DIAGNOSTIC: Submission data structure:",
    //     JSON.stringify(submissionData, null, 2),
    //   );
    //   console.log(
    //     "[Convex] DIAGNOSTIC: Fields being sent:",
    //     Object.keys(submissionData),
    //   );

    //   // Check for potentially problematic fields
    //   if ("timestamp" in submissionData) {
    //     console.error(
    //       "[Convex] DIAGNOSTIC WARNING: 'timestamp' field detected in submission data!",
    //     );
    //   }

      // Direct call to createContact without Promise.race
      const contactId = await createContact(submissionData);
      // console.log("[Convex] Contact created successfully, ID:", contactId);

      // // Check for direct Convex response format
      // if (typeof contactId === "object" && contactId !== null) {
      //   // Use type assertion for the response object
      //   const responseObj = contactId as Record<string, any>;
      //   if ("success" in responseObj && responseObj.success === true) {
      //     console.log("[Convex] Detected direct Convex response format");
      //     return {
      //       success: true,
      //       contactId: "result" in responseObj ? responseObj.result : contactId,
      //     };
      //   }
      // }

      return { success: true, contactId };
    // } catch (error) {
    //   console.error("[Convex] Error creating contact:", error);

      let errorMessage = "Failed to submit contact form";

      // if (error instanceof Error) {
      //   errorMessage = error.message;

      //   // Log detailed error information
      //   console.error(
      //     "[Convex] DIAGNOSTIC: Error type:",
      //     error.constructor.name,
      //   );
      //   console.error(
      //     "[Convex] DIAGNOSTIC: Full error message:",
      //     error.message,
      //   );
      //   console.error("[Convex] DIAGNOSTIC: Error stack:", error.stack);

      //   // More specific error messages
      //   if (error.message.includes("extra field")) {
      //     console.error(
      //       "[Convex] DIAGNOSTIC: Field validation error detected!",
      //     );
      //     errorMessage = "Form validation error: Invalid form data";
      //   } else if (
      //     error.message.includes("network") ||
      //     error.message.includes("connection")
      //   ) {
      //     errorMessage = "Network error: Please check your connection";
      //   } else if (error.message.includes("timeout")) {
      //     errorMessage = "Request timed out: Server might be busy";
      //   }
      // } else {
      //   // Log non-Error objects
      //   console.error("[Convex] DIAGNOSTIC: Non-Error object thrown:", error);
      // }

      // return {
      //   success: false,
      //   error: errorMessage,
      // };
    // }
  };

  // Helper to parse response formats
  const parseConvexResponse = (response: any) => {
    // Handle standard responses
    if (response && typeof response === "object") {
      // Direct Convex format: {type: "MutationResponse", success: true, result: "id"}
      if (response.type === "MutationResponse" && response.success === true) {
        return { success: true, contactId: response.result };
      }
    }
    return response;
  };

  return {
    submitContact,
    isInitialized,
    createContactAvailable: typeof createContact === "function",
    parseConvexResponse,
  };
}

// Hook for contact management operations
export function useContactManagement() {
  const updateStatus = useUpdateContactStatus();
  const assignContact = useAssignContact();
  const addNote = useAddNote();
  const deleteContact = useDeleteContact();

  const markAsResolved = async (contactId: Id<"contacts">, notes?: string) => {
    try {
      await updateStatus({
        id: contactId,
        status: "resolved",
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
    contactId: Id<"contacts">,
    notes?: string,
  ) => {
    try {
      await updateStatus({
        id: contactId,
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

  const markAsSpam = async (contactId: Id<"contacts">) => {
    try {
      await deleteContact({
        id: contactId,
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

  const assign = async (contactId: Id<"contacts">, userId: Id<"users">) => {
    try {
      await assignContact({
        contactId,
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

  const addContactNote = async (
    contactId: Id<"contacts">,
    content: string,
    author: string,
    type: "note" | "email" | "call" = "note",
  ) => {
    try {
      await addNote({
        contactId,
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

  return {
    markAsResolved,
    markAsInProgress,
    markAsSpam,
    assign,
    addContactNote,
  };
}

// Hook for filtering and sorting contacts
export function useContactFilters() {
  const allContacts = useContacts();

  const getFilteredContacts = (filters: {
    search?: string;
    status?: string;
    contactType?: string;
    priority?: string;
    dateRange?: { from: Date; to: Date };
  }) => {
    if (!allContacts) return [];

    return allContacts.filter((contact) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          contact.name,
          contact.email,
          contact.company,
          contact.message,
          contact.subject,
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
        contact.status !== filters.status
      ) {
        return false;
      }

      // Contact type filter
      if (
        filters.contactType &&
        filters.contactType !== "all" &&
        contact.contactType !== filters.contactType
      ) {
        return false;
      }

      // Priority filter
      if (
        filters.priority &&
        filters.priority !== "all" &&
        contact.priority !== filters.priority
      ) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const contactDate = new Date(contact.createdAt);
        if (
          contactDate < filters.dateRange.from ||
          contactDate > filters.dateRange.to
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const getSortedContacts = (
    contacts: typeof allContacts,
    sortBy: "createdAt" | "updatedAt" | "name" | "priority" | "status",
    sortOrder: "asc" | "desc" = "desc",
  ) => {
    if (!contacts) return [];

    return [...contacts].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "createdAt":
        case "updatedAt":
          comparison = a[sortBy] - b[sortBy];
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  return {
    getFilteredContacts,
    getSortedContacts,
  };
}
