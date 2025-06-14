#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to parse URLs
function extractDeploymentId(url) {
  if (!url) return null;
  const match = url.match(/https:\/\/([^.]+)\.convex\.cloud/);
  return match ? match[1] : null;
}

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
  `${colors.bright}${colors.cyan}=== NGC Convex Production Deployment ====${colors.reset}\n`,
);

function runCommand(command, description) {
  console.log(`${colors.yellow}> ${description}...${colors.reset}`);
  try {
    const output = execSync(command, { stdio: "pipe" }).toString().trim();
    console.log(`${colors.green}✓ Success!${colors.reset}`);
    return output;
  } catch (error) {
    console.error(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
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
    // Step 1: Check if we have a Convex configuration
    console.log(
      `${colors.bright}Checking Convex configuration...${colors.reset}`,
    );

    if (!fs.existsSync(path.join(process.cwd(), "convex"))) {
      throw new Error(
        "Convex directory not found. Are you in the correct project directory?",
      );
    }

    // Step 2: Check if we're logged in to Convex
    runCommand("npx convex whoami", "Checking Convex login status");

    // Step 3: Ask for confirmation before deploying to production
    console.log(
      `\n${colors.yellow}⚠️  WARNING: You are about to deploy to production!${colors.reset}`,
    );
    const confirmation = await promptUser(
      `${colors.bright}Are you sure you want to continue? (yes/no)${colors.reset} `,
    );

    if (confirmation.toLowerCase() !== "yes") {
      console.log(`${colors.yellow}Deployment cancelled.${colors.reset}`);
      process.exit(0);
    }

    // Step 4: Deploy to production
    console.log(
      `\n${colors.bright}${colors.cyan}Deploying to Convex production...${colors.reset}`,
    );
    const deployOutput = runCommand(
      "npx convex deploy",
      "Deploying Convex functions to production",
    );

    // Extract deployment URL from output
    let deploymentUrl = "";
    const urlMatch = deployOutput.match(
      /https:\/\/[a-zA-Z0-9-]+\.convex\.cloud/,
    );
    if (urlMatch) {
      deploymentUrl = urlMatch[0];
    }

    // Step 5: Update environment variables if needed
    if (deploymentUrl) {
      console.log(
        `${colors.bright}Deployment URL: ${deploymentUrl}${colors.reset}`,
      );

      // Generate HTTP Actions URL from the main deployment URL
      const deploymentId = extractDeploymentId(deploymentUrl);
      const httpActionsUrl = deploymentId
        ? `https://${deploymentId}-site.convex.cloud`
        : null;

      if (httpActionsUrl) {
        console.log(
          `${colors.bright}HTTP Actions URL: ${httpActionsUrl}${colors.reset}`,
        );
      }

      console.log(`\n${colors.bright}Next steps:${colors.reset}`);
      console.log(
        `1. Update your production environment variables with these URLs:`,
      );
      console.log(
        `   ${colors.cyan}NEXT_PUBLIC_CONVEX_URL=${deploymentUrl}${colors.reset}`,
      );
      if (httpActionsUrl) {
        console.log(
          `   ${colors.cyan}CONVEX_SITE_URL=${httpActionsUrl}${colors.reset}`,
        );
        console.log(
          `   ${colors.cyan}NEXT_PUBLIC_CONVEX_HTTP_URL=${httpActionsUrl}${colors.reset}`,
        );
      }
      console.log(
        `2. Deploy your frontend application with the updated environment variables`,
      );

      // Offer to update .env.production
      const updateEnv = await promptUser(
        `\nUpdate .env.production with these URLs? (yes/no) `,
      );

      if (updateEnv.toLowerCase() === "yes") {
        try {
          let envContent = "";
          const envPath = path.join(process.cwd(), ".env.production");

          if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, "utf8");
            // Replace or add NEXT_PUBLIC_CONVEX_URL
            if (envContent.includes("NEXT_PUBLIC_CONVEX_URL=")) {
              envContent = envContent.replace(
                /NEXT_PUBLIC_CONVEX_URL=.*/,
                `NEXT_PUBLIC_CONVEX_URL=${deploymentUrl}`,
              );
            } else {
              envContent += `\nNEXT_PUBLIC_CONVEX_URL=${deploymentUrl}\n`;
            }

            // Replace or add CONVEX_URL
            if (envContent.includes("CONVEX_URL=")) {
              envContent = envContent.replace(
                /CONVEX_URL=.*/,
                `CONVEX_URL=${deploymentUrl}`,
              );
            } else {
              envContent += `CONVEX_URL=${deploymentUrl}\n`;
            }

            // Add HTTP Actions URL if we have it
            if (httpActionsUrl) {
              // Replace or add CONVEX_SITE_URL
              if (envContent.includes("CONVEX_SITE_URL=")) {
                envContent = envContent.replace(
                  /CONVEX_SITE_URL=.*/,
                  `CONVEX_SITE_URL=${httpActionsUrl}`,
                );
              } else {
                envContent += `\n# HTTP Actions URL for Convex functions\nCONVEX_SITE_URL=${httpActionsUrl}\n`;
              }

              // Replace or add NEXT_PUBLIC_CONVEX_HTTP_URL
              if (envContent.includes("NEXT_PUBLIC_CONVEX_HTTP_URL=")) {
                envContent = envContent.replace(
                  /NEXT_PUBLIC_CONVEX_HTTP_URL=.*/,
                  `NEXT_PUBLIC_CONVEX_HTTP_URL=${httpActionsUrl}`,
                );
              } else {
                envContent += `NEXT_PUBLIC_CONVEX_HTTP_URL=${httpActionsUrl}\n`;
              }
            }
          } else {
            envContent = `# Convex Production Configuration\n\nNEXT_PUBLIC_CONVEX_URL=${deploymentUrl}\nCONVEX_URL=${deploymentUrl}\n`;

            if (httpActionsUrl) {
              envContent += `CONVEX_SITE_URL=${httpActionsUrl}\nNEXT_PUBLIC_CONVEX_HTTP_URL=${httpActionsUrl}\n`;
            }

            envContent += `NODE_ENV=production\n`;
          }

          fs.writeFileSync(envPath, envContent);
          console.log(
            `${colors.green}✓ Updated .env.production successfully!${colors.reset}`,
          );
        } catch (error) {
          console.error(
            `${colors.red}✗ Error updating .env.production: ${error.message}${colors.reset}`,
          );
        }
      }
    }

    console.log(
      `\n${colors.bright}${colors.green}Deployment complete! 🚀${colors.reset}`,
    );
  } catch (error) {
    console.error(`\n${colors.red}ERROR: ${error.message}${colors.reset}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
