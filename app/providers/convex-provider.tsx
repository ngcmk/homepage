"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

// Initialize the client outside of the component to maintain a single instance
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Ensure we have a valid URL before initializing
if (!convexUrl) {
  console.error("NEXT_PUBLIC_CONVEX_URL is not defined");
}

let convex: ConvexReactClient;

try {
  convex = new ConvexReactClient(convexUrl!);
  console.log("Convex client initialized successfully");
} catch (error) {
  console.error("Failed to initialize Convex client:", error);
  // Fallback to a minimal client to prevent crashes
  convex = new ConvexReactClient("https://strong-meadowlark-984.convex.cloud");
}

// Log for debugging
if (typeof window !== "undefined") {
  console.log(`Initializing Convex with URL: ${convexUrl}`);
}

interface ConvexClientProviderProps {
  children: ReactNode;
}

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized after mount
    setIsInitialized(true);

    // Log Convex connection details
    console.log("Convex provider mounted, URL:", convexUrl);

    // Test connection
    const testConnection = async () => {
      try {
        // Simple fetch to test if the server is reachable
        await fetch(convexUrl || "", { method: "HEAD", mode: "no-cors" });
        console.log("Convex server reachable");
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to reach Convex server:", error);
        setIsConnected(false);
        toast.error(
          "Unable to connect to application server. Some features may not work correctly.",
        );
      }
    };

    testConnection();

    // Set up connection status monitoring
    const handleOnline = () => {
      console.log("Convex: Reconnecting after network recovery");
      setIsConnected(true);
      toast.success("Connection restored");
      testConnection();
    };

    const handleOffline = () => {
      console.log("Convex: Network connection lost");
      setIsConnected(false);
      toast.error("Network connection lost. Reconnecting...");
    };

    // Listen for online/offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isInitialized) {
    return <div>Initializing connection...</div>;
  }

  return (
    <ConvexProvider client={convex}>
      {!isConnected && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          Connection issue detected. Some features may not work correctly.
        </div>
      )}
      {children}
    </ConvexProvider>
  );
}
