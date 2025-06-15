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
  }): Promise<{
    success: boolean;
    contactId?: any;
    error?: string;
    originalError?: any;
  }> => {
    console.log("[Convex] submitContact called with data:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      contactType: data.contactType,
    });

    // Add timestamp for tracking submission duration
    const startTime = Date.now();
    console.log(
      `[Convex] Form submission started at ${new Date().toISOString()}`,
    );

    try {
      if (!createContact) {
        console.error(
          "[Convex] Contact mutation not available - createContact is null or undefined",
        );
        return {
          success: false,
          error: "Server connection not available. Please try again later.",
        };
      }

      if (typeof createContact !== "function") {
        console.error(
          `[Convex] Contact mutation not available - createContact is not a function but a ${typeof createContact}`,
        );
        return {
          success: false,
          error:
            "Server connection error. Please refresh the page and try again.",
        };
      }

      // Prepare submission data with required defaults for any missing fields
      const submissionData = {
        ...data,
        // Ensure required fields have defaults
        name: data.name || "Unknown",
        email: data.email || "unknown@example.com",
        message: data.message || "No message provided",
        contactType: data.contactType || "general",
        priority: data.priority || "medium",
        // Add metadata
        source: "website",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        referrer:
          typeof document !== "undefined"
            ? document.referrer || undefined
            : undefined,
      };

      console.log("[Convex] Submitting contact with data:", submissionData);

      try {
        // Log before attempting to call the function
        console.log("[Convex] Calling createContact function...");

        // Create a timeout promise to prevent hanging
        let timeoutId: NodeJS.Timeout | null = null;
        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error("Request timed out after 15 seconds"));
          }, 15000); // 15 second timeout
        });

        // Create the API call promise
        const apiCallPromise = createContact(submissionData);

        // Race the API call against the timeout
        const contactId = await Promise.race([
          apiCallPromise,
          timeoutPromise,
        ]).finally(() => {
          if (timeoutId) clearTimeout(timeoutId);
        });

        const endTime = Date.now();
        console.log(
          `[Convex] Contact created successfully in ${endTime - startTime}ms, ID:`,
          contactId,
        );
        return { success: true, contactId };
      } catch (convexError) {
        console.error("[Convex] Error creating contact:", convexError);

        // More detailed error logging
        if (convexError instanceof Error) {
          console.error("[Convex] Error name:", convexError.name);
          console.error("[Convex] Error message:", convexError.message);
          console.error("[Convex] Error stack:", convexError.stack);
        } else {
          console.error("[Convex] Non-Error object thrown:", convexError);
        }

        // Handle timeout errors specially
        if (
          convexError instanceof Error &&
          convexError.message.includes("timed out")
        ) {
          return {
            success: false,
            error: "Request timed out. Please try again later.",
            originalError: convexError,
          };
        }

        // Instead of re-throwing, return an error object to prevent loading state from hanging
        return {
          success: false,
          error:
            convexError instanceof Error
              ? convexError.message
              : "Error creating contact",
          originalError: convexError,
        };
      }
    } catch (error) {
      const endTime = Date.now();
      console.error(
        `[Convex] Error submitting contact form after ${endTime - startTime}ms:`,
        error,
      );

      // Provide more specific error messages
      let errorMessage = "Unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
        console.error("[Convex] Error stack:", error.stack);

        // Check for specific error types
        if (
          errorMessage.includes("network") ||
          errorMessage.includes("connection") ||
          errorMessage.includes("fetch")
        ) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (errorMessage.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
        } else if (
          errorMessage.includes("permission") ||
          errorMessage.includes("access")
        ) {
          errorMessage = "Permission error. Please contact support.";
        } else if (
          errorMessage.includes("undefined") ||
          errorMessage.includes("null")
        ) {
          errorMessage = "System error. Please refresh the page and try again.";
        } else if (errorMessage.includes("extra field")) {
          errorMessage =
            "Form submission error: Invalid form data. Please try again.";
        }
      }

      // Try to send a fallback analytics event if possible
      try {
        if (typeof window !== "undefined") {
          console.log(
            "[Convex] Attempting to log fallback analytics for failed submission",
          );
          // This could be expanded to actually send analytics

          // Check if the error is due to network issues and provide recovery instructions
          if (
            error instanceof Error &&
            (error.message.includes("network") ||
              error.message.includes("connection") ||
              error.message.includes("timeout"))
          ) {
            console.log(
              "[Convex] Network-related error detected, adding recovery instructions",
            );
          }
        }
      } catch (analyticsError) {
        console.error("[Convex] Failed to log analytics:", analyticsError);
      }

      return {
        success: false,
        error: errorMessage,
        originalError: error,
      };
    }
  };

  // Helper function to check if the contact was actually created despite errors
  const verifyContactCreation = async (email: string): Promise<boolean> => {
    try {
      // This would need to be implemented if we want to verify if a contact was created
      // despite errors in the response. For now, it's just a placeholder.
      return false;
    } catch (error) {
      console.error("[Convex] Error verifying contact creation:", error);
      return false;
    }
  };

  return {
    submitContact,
    isInitialized,
    createContactAvailable: typeof createContact === "function",
    verifyContactCreation,
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
