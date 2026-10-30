"use client";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { useState } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
import "./admin.css";
export default function AdminLayout({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is missing");
    return new ConvexReactClient(url);
  });
  return <ClerkProvider><ConvexProviderWithClerk client={client} useAuth={useAuth}><div className="ngc-admin">{children}</div></ConvexProviderWithClerk></ClerkProvider>;
}

