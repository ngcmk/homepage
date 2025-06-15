#!/usr/bin/env node

/**
 * Convex Form Submission Test Tool
 *
 * This script tests form submission directly to the Convex API
 * without going through the UI. It helps diagnose issues with
 * form submission when the UI appears to be working correctly
 * but data isn't being saved.
 *
 * Usage:
 * node scripts/test-form-submission.js
 */

const { ConvexHttpClient } = require("convex/browser");
require("dotenv").config({ path: ".env.local" });

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error(
    "Error: NEXT_PUBLIC_CONVEX_URL environment variable is required",
  );
  console.error("Make sure you have a .env.local file with this variable set");
  process.exit(1);
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
console.log(`Using Convex URL: ${convexUrl}`);
console.log(`Current environment: ${process.env.NODE_ENV || "development"}`);

console.log(`Testing connection to Convex at: ${convexUrl}`);
const client = new ConvexHttpClient(convexUrl);

// Generate a unique identifier for this test run
const testId = `test-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Sample form data
const testData = {
  name: `Test User (${testId})`,
  email: "test@example.com",
  phone: "123-456-7890",
  company: "Test Company",
  subject: "Test Subject",
  message: `This is a test message sent from the debug script. Test ID: ${testId}`,
  contactType: "general",
  priority: "medium",
  gdprConsent: true,
  marketingConsent: false,
  source: "test-script",
};

console.log("Test data prepared with unique identifier:", testId);

async function runTest() {
  console.log("Starting Convex form submission test...");
  console.log("Test data:", testData);

  // Test Convex connection first
  console.log("Testing Convex connection...");
  try {
    console.log("Connection test: Attempting to fetch server timestamp...");
    // This is just a simple test to verify connectivity - it will fail if we can't reach Convex
    const timestamp = await client.query("_system:serverTime");
    console.log("✅ Connection test successful! Convex server timestamp:", new Date(timestamp).toISOString());
  } catch (connectionError) {
    console.error("❌ CONNECTION ERROR: Cannot reach Convex server");
    console.error("Connection error details:", connectionError);
    console.error(
      "\nPlease check your network connection and Convex URL configuration.",
    );
    return {
      success: false,
      error: "Connection failed",
      details: connectionError,
    };
  }

  try {
    console.log(
      `Attempting to submit contact form data to Convex (Test ID: ${testId})...`,
    );
    console.time("Submission time");
    const result = await client.mutation("contacts:createContact", testData);
    console.timeEnd("Submission time");

    console.log("✅ SUCCESS! Contact form submission successful");
    console.log("Contact ID:", result);
    console.log(
      "Check the Convex dashboard to verify the data was saved correctly",
    );
    console.log(`Look for test ID: ${testId} in the submission message`);

    return { success: true, contactId: result };
  } catch (error) {
    console.error("❌ ERROR: Failed to submit contact form data");
    console.error("Error details:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.message && error.message.includes("not found")) {
      console.error(
        '\nThe mutation "contacts:createContact" could not be found.',
      );
      console.error("Check that:");
      console.error("1. The function name is correct");
      console.error("2. You have deployed your Convex functions");
      console.error("3. The function is exported in contacts.ts");
      console.error(
        '4. The function name in your API is exactly "contacts:createContact"',
      );

      // Try to list available functions if possible
      try {
        console.log("\nAttempting to debug available functions...");
        console.log(
          "This may not work depending on your Convex configuration.",
        );
        // Note: This will likely fail in production but worth trying for debugging
        try {
          // Add a debug call to a simpler function
          console.log("\nAttempting to call a simple function instead...");
          try {
            await client.mutation("contacts:createContact", {
              name: "Debug Test User",
              email: "debug@example.com",
              message: "Simple test message",
              contactType: "general",
            });
            console.log("Simple function call worked! Check your schema.");
          } catch (simpleError) {
            console.log("Simple function call failed too:", simpleError.message);
          }

          const functions = await client.query("_system:listFunctions");
          if (functions && functions.length) {
            console.log("\nAvailable functions:");
            functions.forEach((fn) => console.log(`- ${fn}`));
          }
        } catch (listError) {
          console.log("Could not list available functions:", listError.message);
        }
    } else if (
      error.message &&
      (error.message.includes("network") ||
        error.message.includes("connection"))
    ) {
      console.error("\nA network error occurred. Check that:");
      console.error("1. Your NEXT_PUBLIC_CONVEX_URL is correct");
      console.error("2. You have an active internet connection");
      console.error("3. The Convex server is running");
      console.error(
        `4. The URL ${convexUrl} is accessible from your current network`,
      );
    } else if (error.message && error.message.includes("validation")) {
      console.error("\nA validation error occurred. Check that:");
      console.error("1. All required fields are provided");
      console.error("2. Field types match the schema definitions");
      console.error(
        "3. The schema in contacts.ts matches what your form is sending",
      );
    }

    return {
      success: false,
      error: error.message || "Unknown error",
      details: error,
    };
  }
}

// Display environment information
function showEnvironmentInfo() {
  console.log("\n--- Environment Information ---");
  console.log(`Node.js version: ${process.version}`);
  console.log(`Platform: ${process.platform}`);
  console.log(`Convex URL: ${convexUrl}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || "not set"}`);
  console.log(`CONVEX_SITE_URL: ${process.env.CONVEX_SITE_URL || "not set"}`);
  console.log(
    `NEXT_PUBLIC_CONVEX_HTTP_URL: ${process.env.NEXT_PUBLIC_CONVEX_HTTP_URL || "not set"}`,
  );
  console.log("--- End Environment Info ---\n");
}

// Run the test
showEnvironmentInfo();
console.log("Starting form submission test...");

runTest()
  .then((result) => {
    console.log(
      "\nTest complete with result:",
      result.success ? "SUCCESS" : "FAILURE",
    );
    if (result.success) {
      console.log(
        "\nIMPORTANT: If this test succeeded but your form still fails, the issue is likely:",
      );
      console.log("1. In the React integration with the Convex hook");
      console.log("2. In form event handling (not submitting properly)");
      console.log("3. In the environment configuration of your app");
    }
    process.exit(result.success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Unhandled error during test:", error);
    process.exit(1);
  });
