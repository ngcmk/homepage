# Form Submission Troubleshooting Guide

This guide provides solutions for common form submission issues in the NGC application, particularly focusing on Convex integration.

## Common Form Submission Issues

### 1. Form Data Captured But Not Submitted

**Symptoms:**
- Form values are logged in the console but no submission occurs
- No errors appear in the console
- Form appears to reset without submission confirmation

**Debugging Steps:**

1. **Check Form Event Propagation**
   - Verify that the form's `onSubmit` event is properly wired up
   - Add explicit logging at the start of the submission handler
   ```tsx
   <form
     onSubmit={(e) => {
       console.log("[Form] Submit event triggered");
       return form.handleSubmit(handleSubmit)(e);
     }}
   >
   ```

2. **Validate Hook Initialization**
   - Ensure Convex hooks are properly initialized
   - Check for initialization logs like `[Convex] Contact form hook initialized`
   - Verify the hook returns a valid function with `typeof submitContact === "function"`

3. **Test Form Validation**
   - Log validation status before submission
   ```tsx
   console.log("Form is valid:", form.formState.isValid);
   console.log("Form errors:", form.formState.errors);
   ```

### 2. "Connection error" When Submitting

**Symptoms:**
- Form submission fails with connection error
- Console shows network request failures
- Toast error messages appear

**Debugging Steps:**

1. **Check Environment Variables**
   - Verify `NEXT_PUBLIC_CONVEX_URL` is set correctly
   - For development: Should point to local Convex instance
   - For production: Should point to your deployment URL

2. **Verify Convex Development Server**
   - Ensure `npx convex dev` is running in development
   - Check terminal for any Convex server errors
   - Try restarting the Convex development server

3. **Network Request Inspection**
   - Open browser DevTools Network tab
   - Filter for failed requests to Convex
   - Look for CORS errors or authentication issues

### 3. "Missing Field" Errors

**Symptoms:**
- Form submission fails with "missing required field" errors
- Convex throws validation errors
- Data appears correct in logs but fails server-side validation

**Debugging Steps:**

1. **Compare Schema Definitions**
   - Check that your form field names exactly match Convex schema
   - Verify required fields in Convex schema are provided in form data
   ```ts
   // Convex schema
   export const createContact = mutation({
     args: {
       name: v.string(),  // Required field
       email: v.string(), // Required field
       // Other fields...
     }
   });
   ```

2. **Check Type Conversions**
   - Ensure proper type casting before submission
   - Convert numbers from strings if needed
   - Format dates properly
   ```tsx
   // Example conversion
   const formattedData = {
     ...formData,
     budget: formData.budget ? parseInt(formData.budget, 10) : undefined,
   };
   ```

3. **Inspect Payload Before Submission**
   - Log the exact payload being sent to Convex
   ```tsx
   console.log("Submitting data:", submissionData);
   ```

## React Hook Form Specific Issues

### 1. Form Values Not Updating

**Symptoms:**
- Select fields appear to change but form values don't update
- Form submission contains stale or empty values
- Console shows different values than UI selection

**Solutions:**

1. **Use the Correct onChange Handler**
   ```tsx
   <Select
     onValueChange={(value) => {
       console.log("Value selected:", value);
       field.onChange(value);
     }}
     value={field.value}
   >
   ```

2. **Force Value Updates**
   ```tsx
   form.setValue("fieldName", value, {
     shouldDirty: true,
     shouldValidate: true,
   });
   
   // Trigger validation to update UI
   setTimeout(() => form.trigger("fieldName"), 0);
   ```

3. **Prevent Field Unregistration**
   ```tsx
   const form = useForm({
     // ...other options
     shouldUnregister: false, // Prevents fields from being removed
   });
   ```

### 2. Async Submission Failures

**Symptoms:**
- Form appears to submit but no data is saved
- Promise rejections in console
- Loading state gets stuck

**Solutions:**

1. **Proper Async/Await Usage**
   ```tsx
   const onSubmit = async (data: FormValues) => {
     try {
       setIsSubmitting(true);
       await submitData(data); // Make sure to await
       setIsSuccess(true);
     } catch (error) {
       console.error(error);
       setError("Submission failed");
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

2. **Component Unmount Protection**
   ```tsx
   const isMounted = useRef(true);
   
   useEffect(() => {
     return () => {
       isMounted.current = false;
     };
   }, []);
   
   const onSubmit = async (data) => {
     try {
       // async operation
     } finally {
       if (isMounted.current) {
         setIsSubmitting(false);
       }
     }
   };
   ```

## Convex Integration Issues

### 1. Convex Hook Not Available

**Symptoms:**
- Error: `[Convex] Contact mutation not available`
- Form submission fails immediately
- Error: `Cannot read properties of undefined`

**Solutions:**

1. **Check ConvexProvider**
   - Ensure your component is wrapped in a ConvexProvider
   - Check that ConvexProvider is correctly configured
   ```tsx
   // _app.tsx or layout.tsx
   import { ConvexProvider, ConvexReactClient } from "convex/react";
   
   const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
   
   function App({ Component, pageProps }) {
     return (
       <ConvexProvider client={convex}>
         <Component {...pageProps} />
       </ConvexProvider>
     );
   }
   ```

2. **Hook Initialization Check**
   ```tsx
   const { submitContact, isInitialized } = useContactForm();
   
   useEffect(() => {
     console.log("Convex hook initialized:", isInitialized);
   }, [isInitialized]);
   
   // Disable submit button if not initialized
   <Button 
     type="submit" 
     disabled={isSubmitting || !isInitialized}
   >
     {!isInitialized ? "System Unavailable" : "Submit"}
   </Button>
   ```

3. **Lazy Loading Considerations**
   - If using lazy loading or code splitting, ensure Convex client is initialized
   - Consider using a loading state until hook is available

### 2. Convex Mutation Errors

**Symptoms:**
- Error in console from Convex mutation
- Form submission fails but no client-side errors
- "Server error" message in UI

**Solutions:**

1. **Better Error Handling**
   ```tsx
   try {
     const result = await submitContact(data);
     if (result.success) {
       // Success handling
     } else {
       console.error("Submission failed:", result.error);
       // Error handling
     }
   } catch (error) {
     console.error("Exception during submission:", error);
     // Exception handling
   }
   ```

2. **Check Convex Console**
   - Review Convex dashboard for server-side errors
   - Check function logs for validation failures
   - Verify permissions if using authentication

3. **Data Formatting**
   - Ensure data is formatted correctly for Convex
   - Check for missing fields or incorrect types
   - Remove undefined fields before submission

## Debugging Tools

### Console Logging Strategy

Use a structured logging approach:

```tsx
// Form initialization
console.log("[ContactForm] Initialized with defaults:", form.getValues());

// Value changes
console.log("[ContactForm] Field changed:", {
  field: name,
  value: value,
  formState: form.formState.isDirty
});

// Before submission
console.log("[ContactForm] Submitting form:", {
  values: form.getValues(),
  isValid: form.formState.isValid,
  errors: form.formState.errors
});

// After submission
console.log("[ContactForm] Submission result:", result);
```

### Network Monitoring

1. **Browser DevTools Network Tab**
   - Filter for Convex requests
   - Examine request payloads and responses
   - Look for error status codes

2. **Convex Dashboard**
   - Monitor function invocations
   - Check for errors in your mutation functions
   - Verify data is being saved correctly

## Production Considerations

### Environment Configuration

Ensure these environment variables are correctly set:

```
# Development
NEXT_PUBLIC_CONVEX_URL=https://[dev-id].convex.cloud

# Production
NEXT_PUBLIC_CONVEX_URL=https://[prod-id].convex.cloud
CONVEX_SITE_URL=https://[prod-id]-site.convex.cloud
NEXT_PUBLIC_CONVEX_HTTP_URL=https://[prod-id]-site.convex.cloud
NODE_ENV=production
```

### Deployment Checklist

1. **Pre-Deployment Testing**
   - Test form submission in development environment
   - Verify all fields submit correctly
   - Check error handling and validation

2. **Initial Production Deployment**
   - Deploy Convex functions first: `npx convex deploy`
   - Update environment variables in frontend hosting
   - Deploy frontend with new Convex URL

3. **Post-Deployment Verification**
   - Test form submission in production
   - Check Convex dashboard for successful mutations
   - Verify data appears in production database

## Quick Reference

### Common Error Messages and Solutions

| Error Message | Likely Cause | Solution |
|---------------|--------------|----------|
| "Contact mutation not available" | Convex hook not initialized | Check ConvexProvider setup |
| "Network error" | Connection to Convex failed | Check NEXT_PUBLIC_CONVEX_URL |
| "Missing required field" | Schema validation failure | Compare form fields with schema |
| "TypeError: Cannot read properties of undefined" | Using hook result before initialized | Add initialization checks |
| "Form validation failed" | Client-side validation error | Check form errors object |

### Quick Fixes

1. **Form Reset Issues**
   ```tsx
   // Reset form with default values
   form.reset({
     subject: "general",
     budget: "discuss",
   });
   ```

2. **Select Component Fixes**
   ```tsx
   <SelectTrigger className="w-full">
     <SelectValue placeholder="Select an option" />
   </SelectTrigger>
   <SelectContent position="popper">
     {/* options */}
   </SelectContent>
   ```

3. **React Hook Form + Select Integration**
   ```tsx
   <FormField
     control={form.control}
     name="subject"
     render={({ field }) => (
       <FormItem>
         <FormLabel>Subject</FormLabel>
         <Select
           value={field.value}
           defaultValue={field.value || "general"}
           onValueChange={field.onChange}
         >
           <SelectTrigger className="w-full">
             <SelectValue placeholder="Select subject" />
           </SelectTrigger>
           <SelectContent position="popper">
             {options.map((option) => (
               <SelectItem key={option.value} value={option.value}>
                 {option.label}
               </SelectItem>
             ))}
           </SelectContent>
         </Select>
         <FormMessage />
       </FormItem>
     )}
   />
   ```
