#!/usr/bin/env node

/**
 * Convex Diagnostics Tool
 *
 * This script performs basic diagnostic tests on your Convex connection
 * and database schema to help troubleshoot issues.
 *
 * Usage:
 * node scripts/diagnose-convex.js [--verbose]
 */

import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";
import chalk from "chalk";
import { parseArgs } from "node:util";

// Parse command line arguments
const options = {
  verbose: { type: "boolean", short: "v" },
  help: { type: "boolean", short: "h" },
};

const { values: args } = parseArgs({ options });

if (args.help) {
  console.log(`
Convex Diagnostics Tool

Usage:
  node scripts/diagnose-convex.js [--verbose] [--help]

Options:
  --verbose, -v  Show detailed diagnostic information
  --help, -h     Show this help message
  `);
  process.exit(0);
}

// Load environment variables from .env.local or .env
dotenv.config({ path: ".env.local" });
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  dotenv.config(); // Try the default .env file
}

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error(chalk.red("Error: NEXT_PUBLIC_CONVEX_URL environment variable is required"));
  console.error(chalk.yellow("Make sure you have a .env.local file with this variable set"));
  process.exit(1);
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
console.log(chalk.cyan(`Using Convex URL: ${convexUrl}`));
console.log(chalk.cyan(`Current environment: ${process.env.NODE_ENV || "development"}`));

// Create Convex client
const client = new ConvexHttpClient(convexUrl);

// Utility function for test result output
function logResult(name, result, success) {
  const icon = success ? chalk.green("✓") : chalk.red("✗");
  console.log(`${icon} ${name}: ${success ? chalk.green("Success") : chalk.red("Failed")}`);

  if (args.verbose || !success) {
    if (typeof result === "object") {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(result);
    }
  }
}

// Show environment information
function showEnvironment() {
  console.log(chalk.cyan("\n=== Environment Information ==="));
  console.log(`Node.js version: ${process.version}`);
  console.log(`Platform: ${process.platform}`);
  console.log(`Convex URL: ${convexUrl}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || "not set"}`);
  console.log(`CONVEX_SITE_URL: ${process.env.CONVEX_SITE_URL || "not set"}`);
  console.log(`NEXT_PUBLIC_CONVEX_HTTP_URL: ${process.env.NEXT_PUBLIC_CONVEX_HTTP_URL || "not set"}`);
}

// Main diagnostic function
async function runDiagnostics() {
  console.log(chalk.bold("\n=== Convex Diagnostics Tool ==="));

  showEnvironment();

  console.log(chalk.cyan("\n=== Running Tests ==="));

  try {
    // Test 1: Basic Connection
    try {
      console.log(chalk.yellow("\nTesting basic Convex connection..."));
      const timestamp = await client.query("_system:serverTime");
      logResult(
        "Basic Connection Test",
        `Connected successfully! Server time: ${new Date(timestamp).toISOString()}`,
        true
      );
    } catch (error) {
      logResult(
        "Basic Connection Test",
        `Error: ${error.message}`,
        false
      );
      // If we can't connect at all, exit early
      console.error(chalk.red("\nCritical connection error. Please check your Convex URL and network connection."));
      process.exit(1);
    }

    // Test 2: Echo Diagnostic Function
    try {
      console.log(chalk.yellow("\nTesting echo diagnostic function..."));
      const message = `Test message at ${new Date().toISOString()}`;
      const result = await client.query("diagnostics:echo", { message });
      logResult(
        "Echo Function",
        result,
        result.message === message
      );
    } catch (error) {
      logResult(
        "Echo Function",
        `Error: ${error.message}`,
        false
      );
    }

    // Test 3: System Info
    try {
      console.log(chalk.yellow("\nFetching Convex system info..."));
      const systemInfo = await client.query("diagnostics:getSystemInfo");
      logResult(
        "System Info",
        systemInfo,
        !!systemInfo.serverTime
      );
    } catch (error) {
      logResult(
        "System Info",
        `Error: ${error.message}`,
        false
      );
    }

    // Test 4: Count Records
    try {
      console.log(chalk.yellow("\nCounting database records..."));
      const counts = await client.query("diagnostics:countRecords");
      logResult(
        "Database Record Counts",
        counts,
        !!counts.counts
      );
    } catch (error) {
      logResult(
        "Database Record Counts",
        `Error: ${error.message}`,
        false
      );
    }

    // Test 5: Activity Schema Test
    try {
      console.log(chalk.yellow("\nTesting activity schema..."));
      const activityResult = await client.mutation("diagnostics:testActivitySchema", {
        message: "Diagnostic test for activity schema"
      });
      logResult(
        "Activity Schema Test",
        activityResult,
        activityResult.success
      );
    } catch (error) {
      logResult(
        "Activity Schema Test",
        `Error: ${error.message}`,
        false
      );
    }

    // Test 6: Contact Creation Test
    try {
      console.log(chalk.yellow("\nTesting contact creation..."));
      const timestamp = Date.now();
      const contactResult = await client.mutation("diagnostics:testCreateContact", {
        name: "Diagnostic User",
        email: `diagnostic-${timestamp}@example.com`,
        message: "Test message from diagnostic script"
      });
      logResult(
        "Contact Creation Test",
        contactResult,
        contactResult.success
      );
    } catch (error) {
      logResult(
        "Contact Creation Test",
        `Error: ${error.message}`,
        false
      );
    }

    // Test 7: Real Contact Creation Test
    try {
      console.log(chalk.yellow("\nTesting actual contact creation function..."));
      const timestamp = Date.now();
      const contactId = await client.mutation("contacts:createContact", {
        name: "Real Test User",
        email: `real-test-${timestamp}@example.com`,
        message: "This is a test message from the diagnostic script",
        contactType: "general",
        priority: "medium"
      });
      logResult(
        "Real Contact Creation",
        `Successfully created contact with ID: ${contactId}`,
        !!contactId
      );
    } catch (error) {
      logResult(
        "Real Contact Creation",
        `Error: ${error.message}`,
        false
      );
    }

    console.log(chalk.cyan("\n=== Diagnostics Complete ==="));

  } catch (error) {
    console.error(chalk.red("\nUnexpected error during diagnostics:"), error);
  }
}

// Run the diagnostics
runDiagnostics()
  .then(() => {
    console.log(chalk.green("\nDiagnostics completed."));

    console.log(chalk.cyan("\n=== Troubleshooting Tips ==="));
    console.log("1. If connection tests fail, check your NEXT_PUBLIC_CONVEX_URL value");
    console.log("2. If function tests fail, ensure your schema matches your function expectations");
    console.log("3. For production deployments, verify all environment variables are set correctly");
    console.log("4. Run 'npx convex dev' in a separate terminal when testing locally");
    console.log("5. Check the Convex dashboard at https://dashboard.convex.dev for more information");

    process.exit(0);
  })
  .catch(error => {
    console.error(chalk.red("Unhandled error:"), error);
    process.exit(1);
  });
