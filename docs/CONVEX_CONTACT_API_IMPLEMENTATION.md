# Convex Contact API Implementation Guide

## Overview

This document provides a comprehensive implementation guide for integrating Convex as the backend database and creating API routes for contact management in the Next.js application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Convex Setup and Initialization](#phase-1-convex-setup-and-initialization)
3. [Phase 2: Backend Schema Design](#phase-2-backend-schema-design)
4. [Phase 3: Convex Backend Functions](#phase-3-convex-backend-functions)
5. [Phase 4: HTTP API Routes](#phase-4-http-api-routes)
6. [Phase 5: Next.js API Route Integration](#phase-5-nextjs-api-route-integration)
7. [Phase 6: Frontend Integration](#phase-6-frontend-integration)
8. [Phase 7: Testing and Validation](#phase-7-testing-and-validation)
9. [Error Handling and Security](#error-handling-and-security)
10. [Performance Optimization](#performance-optimization)
11. [Deployment Considerations](#deployment-considerations)

## Prerequisites

- Node.js 18+ installed
- Next.js 13+ with App Router
- Basic understanding of TypeScript
- Convex account (free tier available)

## Phase 1: Convex Setup and Initialization

### 1.1 Install Dependencies

```bash
# Install core Convex package
npm install convex

# Install enhanced React integration (optional but recommended)
npm install @convex-dev/react-query @tanstack/react-query

# Install additional utilities
npm install zod  # For enhanced validation
```

### 1.2 Initialize Convex Project

```bash
# Initialize Convex development environment
npx convex dev
```

This command will:
- Prompt you to log in to Convex
- Create a new project or link to existing one
- Generate the `convex/` directory structure
- Create `.env.local` with your deployment URL
- Set up authentication configuration

### 1.3 Project Structure After Setup

```
ngc/
├── convex/
│   ├── _generated/
│   │   ├── api.d.ts
│   │   ├── api.js
│   │   └── server.d.ts
│   ├── schema.ts
│   ├── contacts.ts
│   ├── http.ts
│   └── convex.json
├── app/
│   ├── api/
│   │   └── contact/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── providers/
│   │   └── convex-provider.tsx
│   └── hooks/
│       └── use-contacts.ts
├── .env.local
└── package.json
```

### 1.4 Environment Configuration

Update `.env.local`:

```env
# Convex deployment URL (auto-generated)
CONVEX_URL=https://your-deployment.convex.cloud

# Public URL for client-side usage
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Optional: API keys for external services
RESEND_API_KEY=your_resend_key  # For email notifications
```

## Phase 2: Backend Schema Design

### 2.1 Contact Schema (`convex/schema.ts`)

```typescript
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
      v.literal("careers")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),

    // Status Tracking
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed"),
      v.literal("spam")
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
    notes: v.optional(v.array(v.object({
      content: v.string(),
      author: v.string(),
      timestamp: v.number(),
      type: v.union(v.literal("note"), v.literal("email"), v.literal("call"))
    }))),

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
      filterFields: ["contactType", "status", "priority", "assignedTo"]
    })

    // Search index for names and companies
    .searchIndex("search_names", {
      searchField: "name",
      filterFields: ["contactType", "company"]
    }),

  // Users table for assignment functionality
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("agent"),
      v.literal("manager"),
      v.literal("viewer")
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
    contactId: v.id("contacts"),
    userId: v.optional(v.id("users")),
    action: v.string(),
    details: v.optional(v.string()),
    metadata: v.optional(v.object({
      previousValue: v.any(),
      newValue: v.any(),
      field: v.optional(v.string()),
    })),
    timestamp: v.number(),
  })
    .index("by_contact", ["contactId"])
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),
});
```

## Phase 3: Convex Backend Functions

### 3.1 Contact Mutations (`convex/contacts.ts`)

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Helper function to log activity
async function logActivity(
  ctx: any,
  contactId: Id<"contacts">,
  action: string,
  details?: string,
  metadata?: any
) {
  await ctx.db.insert("activities", {
    contactId,
    action,
    details,
    metadata,
    timestamp: Date.now(),
  });
}
