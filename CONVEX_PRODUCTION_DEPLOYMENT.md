# Convex Production Deployment Guide

This document provides a step-by-step guide for deploying your Convex backend to production, configuring your frontend application, and ensuring everything works correctly in a production environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Production Deployment](#creating-a-production-deployment)
3. [Environment Variables](#environment-variables)
4. [Frontend Integration](#frontend-integration)
5. [Troubleshooting](#troubleshooting)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Prerequisites

Before deploying to production, ensure you have:

- A Convex account with access to the project
- The Convex CLI installed (`npm install -g convex`)
- Logged in to Convex CLI (`npx convex login`)
- Completed local development and testing

## Creating a Production Deployment

### Manual Deployment

1. **Deploy to production**:

   ```bash
   npx convex deploy
   ```

   When prompted, select "Create a new production deployment" instead of using your development deployment.

2. **Note the deployment URL**:

   After a successful deployment, you'll receive a URL like:
   ```
   https://example-123abc.convex.cloud
   ```
   
   Save this URL for your environment variables.

### Using the Deployment Script

We've created a script to automate the deployment process:

1. **Run the production deployment script**:

   ```bash
   npm run convex:prod
   ```

   This script will:
   - Check your Convex login status
   - Deploy to production
   - Update your `.env.production` file (if desired)
   - Provide next steps

## Environment Variables

### Local Production Environment

Create or update your `.env.production` file with:

```
# Convex Production Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-id.convex.cloud
CONVEX_URL=https://your-deployment-id.convex.cloud
NODE_ENV=production
```

### Hosting Provider (Vercel, Netlify, etc.)

Configure these environment variables in your hosting provider's dashboard:

1. **NEXT_PUBLIC_CONVEX_URL**: Your production Convex deployment URL
2. **CONVEX_URL**: Same as above (used for server-side operations)
3. **NEXT_PUBLIC_DOMAIN**: Your frontend domain (e.g., `https://yourdomain.com`)

## Frontend Integration

### Building for Production

When building your Next.js application for production:

```bash
# Build with production environment variables
npm run build

# Or explicitly
NODE_ENV=production npm run build
```

### CORS Configuration

Ensure your `http.ts` file properly handles CORS for production:

```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_DOMAIN || "*"
      : "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400",
};
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check your CORS configuration in `http.ts`
   - Verify the `NEXT_PUBLIC_DOMAIN` environment variable is set correctly
   - Ensure your frontend is using the correct Convex URL

2. **Authentication Issues**:
   - Make sure you're logged in with `npx convex login`
   - Check if you have the correct permissions for the project

3. **Schema Errors**:
   - Run `npx convex dev` locally to catch any schema errors before deploying
   - Check for incompatible changes between development and production

### Validation

To verify your production deployment:

1. **Check the deployment status**:
   ```bash
   npx convex dashboard
   ```

2. **Test HTTP endpoints**:
   ```bash
   curl https://your-deployment-id.convex.cloud/api/http_endpoint
   ```

## Monitoring and Maintenance

### Dashboard Access

Access your Convex dashboard to monitor:
- Function execution metrics
- Database usage
- Error logs

URL: https://dashboard.convex.dev

### Regular Maintenance

1. **Keep dependencies updated**:
   ```bash
   npm update convex
   ```

2. **Run regular backups**:
   Use the Convex dashboard to create database backups

3. **Monitor performance**:
   - Check function execution times
   - Monitor database query performance

### Rollback Process

If you need to rollback to a previous deployment:

1. **View deployment history**:
   ```bash
   npx convex deployments list
   ```

2. **Rollback to a specific deployment**:
   ```bash
   npx convex deploy --deploymentName=<deployment-name>
   ```

## Additional Resources

- [Convex Documentation](https://docs.convex.dev)
- [Deployment Best Practices](https://docs.convex.dev/production/best-practices)
- [Monitoring & Observability](https://docs.convex.dev/production/monitoring)

---

**Note**: Keep this document updated with any changes to your deployment process or environment configuration.