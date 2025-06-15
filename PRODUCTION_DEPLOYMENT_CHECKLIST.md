# Production Deployment Checklist

This checklist ensures a smooth and successful production deployment of the NGC application with Convex backend integration.

## Pre-Deployment Preparation

### Convex Backend Preparation

- [ ] All Convex functions tested locally with `npx convex dev`
- [ ] Schema fully validated and consistent with frontend needs
- [ ] Database indexes optimized for production queries
- [ ] Authentication setup verified (if applicable)
- [ ] Storage configuration checked (if using file uploads)
- [ ] Rate limiting considered for public endpoints

### Frontend Preparation

- [ ] All environment variables documented in `.env.production.example`
- [ ] Static assets optimized (images, fonts, etc.)
- [ ] Build process tested locally with `npm run build:prod`
- [ ] TypeScript errors resolved
- [ ] Ensure no development-only code in production build
- [ ] Responsive design tested across devices
- [ ] Cross-browser compatibility verified
- [ ] Form components tested, especially Select dropdowns (see `FORM_COMPONENT_TROUBLESHOOTING.md`)

### Environment Configuration

- [ ] `.env.production` created with correct values:
- [ ] `NEXT_PUBLIC_CONVEX_URL` set to production deployment URL
- [ ] `CONVEX_URL` set to production deployment URL
- [ ] `CONVEX_SITE_URL` set to HTTP Actions URL (your-deployment-id-site.convex.cloud)
- [ ] `NEXT_PUBLIC_CONVEX_HTTP_URL` set to same HTTP Actions URL for client-side use
- [ ] `NODE_ENV=production` (without quotes)
- [ ] `NEXT_PUBLIC_DOMAIN` set to production domain
- [ ] Sensitive variables secured and not committed to Git

## Deployment Process

### Convex Deployment

- [ ] Login to Convex CLI: `npx convex login`
- [ ] Deploy to production: `npm run convex:prod`
- [ ] Note the production deployment URL (e.g., `https://grateful-ant-828.convex.cloud`)
- [ ] Verify functions are deployed: check dashboard at https://dashboard.convex.dev
- [ ] Test a simple query/mutation against the production deployment

### Frontend Deployment

- [ ] Update environment variables with production Convex URL
- [ ] Build the frontend for production: `npm run build:prod`
- [ ] Deploy to hosting provider (Vercel, Netlify, etc.)
- [ ] Set environment variables on hosting platform:
  - [ ] `NEXT_PUBLIC_CONVEX_URL=https://your-deployment-id.convex.cloud`
  - [ ] `CONVEX_SITE_URL=https://your-deployment-id-site.convex.cloud`
  - [ ] `NEXT_PUBLIC_CONVEX_HTTP_URL=https://your-deployment-id-site.convex.cloud`
  - [ ] `NODE_ENV=production` (without quotes)
  - [ ] Any other required variables

## Post-Deployment Verification

### Functionality Testing

- [ ] Verify Convex connection in browser console
- [ ] Test project consultation form submission
- [ ] Test contact form with all dropdown selections
- [ ] Confirm data is being saved to production database
- [ ] Test HTTP Actions endpoints if your app uses them
- [ ] Validate form error handling
- [ ] Check "thank you" page redirection
- [ ] Verify any other critical functionality

### Performance & Security

- [ ] Run Lighthouse audit for performance metrics
- [ ] Check network tab for proper CORS configuration
- [ ] Verify HTTPS is enabled
- [ ] Test load times for critical pages
- [ ] Ensure no development logs appear in production

### Monitoring Setup

- [ ] Convex dashboard access configured for team members
- [ ] Error reporting system in place (e.g., Sentry)
- [ ] Analytics configured (if applicable)
- [ ] Regular database backup schedule confirmed

## Rollback Plan

In case of deployment issues:

1. Identify the problem - frontend or backend
2. For Convex issues:
   - Roll back to previous deployment: `npx convex deploy --deploymentName=<previous-name>`
   - Update environment variables to match the previous deployment URLs
3. For frontend issues:
   - Revert to previous frontend deployment in hosting provider dashboard
   - Ensure environment variables match the active Convex deployment

## Final Checklist

- [ ] Client/stakeholder notification of deployment
- [ ] Documentation updated with production URLs
- [ ] Team members have necessary access to monitoring tools
- [ ] Support contact information updated in application
- [ ] Deployment tagged in version control

---

**Important Notes:**

1. Always deploy during low-traffic periods if possible
2. Keep the development environment available during initial production rollout
3. Monitor error rates closely for the first 24-48 hours after deployment
4. Have a support team member ready to respond to critical issues
5. Refer to `FORM_COMPONENT_TROUBLESHOOTING.md` for resolving form component issues