#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
// Check if cross-env is installed
try {
  require.resolve("cross-env");
} catch (e) {
  console.warn(
    "\x1b[33mWarning: cross-env is not installed. For cross-platform compatibility, install it with: npm install -D cross-env\x1b[0m",
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Console colors for better readability
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

console.log(
  `${colors.bright}${colors.cyan}=== NGC Production Build Script ====${colors.reset}\n`,
);

function runCommand(command, description) {
  console.log(`${colors.yellow}> ${description}...${colors.reset}`);
  try {
    const output = execSync(command, { stdio: "inherit" });
    console.log(`${colors.green}✓ Success!${colors.reset}`);
    return output;
  } catch (error) {
    console.error(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

async function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Step 1: Check if we have a .env.production file
    console.log(
      `${colors.bright}Checking production configuration...${colors.reset}`,
    );

    const envProdPath = path.join(process.cwd(), ".env.production");
    if (!fs.existsSync(envProdPath)) {
      throw new Error(
        ".env.production file not found. Please create this file first.",
      );
    }

    // Step 2: Read the production environment file
    const envContent = fs.readFileSync(envProdPath, "utf8");

    // Step 3: Extract Convex URL
    let convexUrl = "";
    const urlMatch = envContent.match(/NEXT_PUBLIC_CONVEX_URL=([^\n]+)/);
    if (urlMatch && urlMatch[1]) {
      convexUrl = urlMatch[1];
    } else {
      throw new Error("NEXT_PUBLIC_CONVEX_URL not found in .env.production");
    }

    console.log(
      `${colors.bright}Found Convex URL:${colors.reset} ${convexUrl}`,
    );

    // Step 4: Ask for confirmation before building
    console.log(
      `\n${colors.yellow}You are about to build for production with these settings:${colors.reset}`,
    );
    console.log(`- Convex URL: ${convexUrl}`);
    console.log(`- Environment: production`);

    const confirmation = await promptUser(
      `\n${colors.bright}Proceed with production build? (yes/no)${colors.reset} `,
    );

    if (confirmation.toLowerCase() !== "yes") {
      console.log(`${colors.yellow}Build cancelled.${colors.reset}`);
      process.exit(0);
    }

    // Step 5: Verify Convex deployment is available
    console.log(
      `\n${colors.bright}${colors.cyan}Verifying Convex deployment...${colors.reset}`,
    );
    try {
      execSync(`curl -s -o /dev/null -w "%{http_code}" ${convexUrl}`, {
        stdio: "pipe",
      });
      console.log(
        `${colors.green}✓ Convex deployment is accessible!${colors.reset}`,
      );
    } catch (error) {
      console.warn(
        `${colors.yellow}⚠️ Could not verify Convex deployment. Continuing anyway...${colors.reset}`,
      );
    }

    // Step 6: Clean previous build
    console.log(
      `\n${colors.bright}${colors.cyan}Cleaning previous build...${colors.reset}`,
    );
    if (fs.existsSync(path.join(process.cwd(), ".next"))) {
      runCommand("rm -rf .next", "Removing .next directory");
    }

    // Step 7: Build the application
    console.log(
      `\n${colors.bright}${colors.cyan}Building for production...${colors.reset}`,
    );

    // Copy .env.production to .env.local to ensure it's used during the build
    fs.copyFileSync(envProdPath, path.join(process.cwd(), ".env.local"));
    console.log(
      `${colors.green}✓ Copied .env.production to .env.local for build${colors.reset}`,
    );

    // Set NODE_ENV explicitly and run the build
    runCommand(
      "cross-env NODE_ENV=production npx next build",
      "Building Next.js application",
    );

    // Step 8: Verify the build succeeded
    if (fs.existsSync(path.join(process.cwd(), ".next/static"))) {
      console.log(
        `${colors.green}${colors.bright}✓ Production build successful!${colors.reset}`,
      );

      // Step 9: Show some statistics about the build
      try {
        console.log(`\n${colors.cyan}Build statistics:${colors.reset}`);
        const sizeOutput = execSync("du -sh .next").toString();
        console.log(`- Build size: ${sizeOutput.split("\t")[0]}`);

        const pageCount = fs.readdirSync(
          path.join(process.cwd(), ".next/server/app"),
        ).length;
        console.log(`- Pages built: ${pageCount}`);
      } catch (error) {
        // Non-critical error, just log it
        console.warn(
          `${colors.yellow}Could not get build statistics: ${error.message}${colors.reset}`,
        );
      }

      // Step 10: Instructions for deployment
      console.log(`\n${colors.bright}Next steps:${colors.reset}`);
      console.log(`1. Deploy the .next directory to your hosting provider`);
      console.log(
        `2. Ensure your hosting environment has these environment variables:`,
      );
      console.log(
        `   ${colors.cyan}NEXT_PUBLIC_CONVEX_URL=${convexUrl}${colors.reset}`,
      );
      console.log(`   ${colors.cyan}NODE_ENV: "production"${colors.reset}`);
    } else {
      throw new Error("Build directory not found. The build may have failed.");
    }
  } catch (error) {
    console.error(`\n${colors.red}ERROR: ${error.message}${colors.reset}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
