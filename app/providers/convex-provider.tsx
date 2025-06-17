"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

// Function to create a new client instance with the correct URL
// This helps avoid caching issues between environments
function createConvexClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const nodeEnv = process.env.NODE_ENV;

  // Ensure we have a valid URL before initializing
  if (!convexUrl) {
    console.error("NEXT_PUBLIC_CONVEX_URL is not defined");
    return null;
  }

  try {
    // console.log(
    //   `[CONVEX] Initializing client in ${nodeEnv} mode with URL: ${convexUrl}`,
    // );

    // Add timestamp to help prevent caching issues
    const clientOptions = {
      unsavedChangesWarning: false,
    };

    const client = new ConvexReactClient(convexUrl, clientOptions);

    // console.log(`[CONVEX] Client initialized successfully for ${nodeEnv}`);

    // Store the URL in localStorage to detect environment changes
    if (typeof window !== "undefined") {
      localStorage.setItem("convex_url", convexUrl);
      localStorage.setItem("convex_env", nodeEnv || "undefined");
    }

    return client;
  } catch (error) {
    console.error("Failed to initialize Convex client:", error);
    return null;
  }
}

// Create the client instance
const convex =
  createConvexClient() ||
  new ConvexReactClient("https://grateful-ant-828.convex.cloud");

// Additional debug info
if (typeof window !== "undefined") {
  const nodeEnv = process.env.NODE_ENV;
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  // console.log(`[CONVEX] Running in browser with:
  // - URL: ${convexUrl}
  // - Environment: ${nodeEnv || "undefined"}
  // - Browser: ${navigator.userAgent}`);
}

interface ConvexClientProviderProps {
  children: ReactNode;
}

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [client, setClient] = useState(convex);
  const nodeEnv = process.env.NODE_ENV;
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  useEffect(() => {
    // Check if we need to recreate the client (environment changed)
    const checkEnvironmentChange = () => {
      if (typeof window === "undefined") return false;

      const storedUrl = localStorage.getItem("convex_url");
      const storedEnv = localStorage.getItem("convex_env");

      // If URL or environment changed, we need a new client
      if (storedUrl !== convexUrl || storedEnv !== nodeEnv) {
        // console.log(
        //   `[CONVEX] Environment changed from ${storedEnv} to ${nodeEnv}`,
        // );
        // console.log(`[CONVEX] URL changed from ${storedUrl} to ${convexUrl}`);
        return true;
      }

      return false;
    };

    // If environment changed, recreate client
    if (checkEnvironmentChange()) {
      const newClient = createConvexClient();
      if (newClient) {
        setClient(newClient);
        // console.log(`[CONVEX] Created new client for changed environment`);
      }
    }

    // Mark as initialized after mount
    setIsInitialized(true);

    // Log Convex connection details
    // console.log(
    //   `[CONVEX] Provider mounted in ${nodeEnv} mode with URL:`,
    //   convexUrl,
    // );

    // Test connection
    const testConnection = async () => {
      try {
        // Simple fetch to test if the server is reachable
        await fetch(convexUrl || "", { method: "HEAD", mode: "no-cors" });
        // console.log(`[CONVEX] Server reachable at ${convexUrl}`);
        setIsConnected(true);

        // Show toast in development mode
        if (nodeEnv === "development") {
          toast.success(
            `Connected to Convex (${convexUrl?.split(".")[0].split("//")[1]})`,
          );
        }
      } catch (error) {
        console.error(
          `[CONVEX] Failed to reach server at ${convexUrl}:`,
          error,
        );
        setIsConnected(false);
        toast.error(
          "Unable to connect to application server. Some features may not work correctly.",
        );
      }
    };

    testConnection();

    // Set up connection status monitoring
    const handleOnline = () => {
      // console.log("Convex: Reconnecting after network recovery");
      setIsConnected(true);
      toast.success("Connection restored");
      testConnection();
    };

    const handleOffline = () => {
      // console.log("Convex: Network connection lost");
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
    return <div>Loading...</div>;
  }

  return (
    <ConvexProvider client={client}>
      {!isConnected && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          Connection issue detected. Some features may not work correctly.
          <div className="text-xs mt-1">
            URL: {convexUrl?.substring(0, 20)}...
          </div>
        </div>
      )}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50 opacity-70 hover:opacity-100 transition-opacity">
          Using Convex: {convexUrl?.split(".")[0].split("//")[1]}
          <div className="text-xs">{nodeEnv} mode</div>
        </div>
      )}
      {children}
    </ConvexProvider>
  );
}
