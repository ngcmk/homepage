"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import "./admin.css";

function AdminConvexProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!url) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL is missing");
    }

    return new ConvexReactClient(url);
  });

  return (
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      <div className="ngc-admin">{children}</div>
    </ConvexProviderWithClerk>
  );
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <AdminConvexProvider>{children}</AdminConvexProvider>
    </ClerkProvider>
  );
}
