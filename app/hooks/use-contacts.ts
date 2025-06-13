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
export function useSearchContacts(searchTerm: string, filters?: {
  contactType?: "general" | "business" | "support" | "partnership" | "careers";
  status?: "new" | "in_progress" | "resolved" | "closed" | "spam";
  limit?: number;
}) {
  return useQuery(
    api.contacts.searchContacts,
    searchTerm.trim() ? { searchTerm, ...filters } : "skip"
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
export function useContactActivities(contactId: Id<"contacts">, limit?: number) {
  return useQuery(api.contacts.getContactActivities, {
    contactId,
    limit,
  });
}

// Custom hook for contact form submission
export function useContactForm() {
  const createContact = useCreateContact();

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
  }) => {
    try {
      const contactId = await createContact({
        ...data,
        source: "website",
        userAgent: navigator.userAgent,
        referrer: document.referrer || undefined,
      });
      return { success: true, contactId };
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  };

  return { submitContact };
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
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  };

  const markAsInProgress = async (contactId: Id<"contacts">, notes?: string) => {
    try {
      await updateStatus({
        id: contactId,
        status: "in_progress",
        notes,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
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
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
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
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  };

  const addContactNote = async (
    contactId: Id<"contacts">,
    content: string,
    author: string,
    type: "note" | "email" | "call" = "note"
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
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
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
          field?.toLowerCase().includes(searchTerm)
        );
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status !== "all" && contact.status !== filters.status) {
        return false;
      }

      // Contact type filter
      if (filters.contactType && filters.contactType !== "all" && contact.contactType !== filters.contactType) {
        return false;
      }

      // Priority filter
      if (filters.priority && filters.priority !== "all" && contact.priority !== filters.priority) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const contactDate = new Date(contact.createdAt);
        if (contactDate < filters.dateRange.from || contactDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  };

  const getSortedContacts = (
    contacts: typeof allContacts,
    sortBy: "createdAt" | "updatedAt" | "name" | "priority" | "status",
    sortOrder: "asc" | "desc" = "desc"
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
