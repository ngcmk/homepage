# Form Component Troubleshooting Guide

This guide covers common issues and solutions for form components in the NGC application, with a particular focus on the integration between React Hook Form and UI components like Select dropdowns.

## Common Issues and Solutions

### Select Dropdown Issues

#### Problem: Dropdown Value Not Updating

**Symptoms:**
- Select component doesn't display the selected value
- Form submits empty values despite selection
- Dropdown resets to placeholder after selection

**Solutions:**

1. **Set Default Values on Form Initialization**
   ```tsx
   const form = useForm<FormValues>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       subject: "general", // Always provide default values for select fields
       priority: "medium",
     },
   });
   ```

2. **Ensure Proper Width for Select Trigger**
   ```tsx
   <SelectTrigger className="w-full">
     <SelectValue placeholder="Select an option" />
   </SelectTrigger>
   ```

3. **Specify Position for SelectContent**
   ```tsx
   <SelectContent position="popper">
     {/* Select items */}
   </SelectContent>
   ```

4. **Proper Type Handling in onValueChange**
   ```tsx
   <Select
     value={formData.contactType}
     onValueChange={(value) =>
       handleInputChange("contactType", value as "general" | "business")
     }
   >
   ```

#### Problem: Form Value Not Syncing with Visual Selection

**Symptoms:**
- Form data doesn't match what's displayed in the UI
- Values reset unexpectedly

**Solutions:**

1. **Force Field Updates When Setting Values**
   ```tsx
   form.setValue("fieldName", value, {
     shouldDirty: true,
     shouldValidate: true,
   });
   
   // Force rerender to update the Select component
   setTimeout(() => form.trigger("fieldName"), 0);
   ```

2. **Add Both Value and DefaultValue Props**
   ```tsx
   <Select
     value={field.value}
     defaultValue={field.value}
     onValueChange={field.onChange}
   >
   ```

3. **Use the Debugging Utility Functions**
   ```tsx
   import { debugSelectField, forceSelectFieldUpdate } from "@/lib/form-debug";
   
   // In your component
   useEffect(() => {
     if (form.getValues().subject === "") {
       forceSelectFieldUpdate(form, "subject", "general");
     }
   }, []);
   ```

### React Hook Form Integration Issues

#### Problem: Field Validation Not Triggering

**Solutions:**

1. **Set Proper Mode on useForm**
   ```tsx
   const form = useForm<FormValues>({
     mode: "onChange", // or "onBlur" or "onSubmit" depending on requirements
     // other options
   });
   ```

2. **Ensure Validation in Schema**
   ```tsx
   const formSchema = z.object({
     subject: z.string({
       required_error: "Please select a subject",
     }).min(1, "Please select a subject"),
   });
   ```

3. **Manually Trigger Validation After Setting Values**
   ```tsx
   form.setValue("fieldName", value);
   form.trigger("fieldName"); // Triggers validation for this field
   ```

#### Problem: Form Submission with Incorrect Values

**Solutions:**

1. **Log Form Values Before Submission**
   ```tsx
   const onSubmit = (data: FormValues) => {
     console.log("Form data to submit:", data);
     // then proceed with submission
   };
   ```

2. **Use FormState to Track Status**
   ```tsx
   const { isSubmitting, isValid, errors } = form.formState;
   
   // Check before submission
   if (!isValid) {
     console.error("Form validation errors:", errors);
     return;
   }
   ```

## Debugging Tools

We've added debugging utilities to help with form issues:

### Form Debug Utilities (`lib/form-debug.ts`)

```tsx
// Debug a specific select field
import { debugSelectField } from "@/lib/form-debug";

// In your component
useEffect(() => {
  debugSelectField(form, "subject");
}, [form]);

// Force update a select field with a default value
import { forceSelectFieldUpdate } from "@/lib/form-debug";

useEffect(() => {
  forceSelectFieldUpdate(form, "budget", "discuss");
}, []);

// Create a custom onChange handler with logging
import { createSelectChangeHandler } from "@/lib/form-debug";

<Select
  onValueChange={createSelectChangeHandler(form, "priority")}
  // other props
>
```

## Best Practices for Form Components

1. **Always Set Default Values**
   - Provide initial values for all form fields, especially selects
   - Use empty strings rather than undefined for text fields

2. **Consistent Width Styling**
   - Ensure all form controls have proper width (usually `w-full`)
   - Use consistent spacing between form elements

3. **Robust Error Handling**
   - Display clear error messages for validation failures
   - Provide user guidance on how to fix issues

4. **Detailed Logging**
   - Log form state changes during development
   - Include field names and values in logs

5. **Accessible Form Elements**
   - Use proper labels and aria attributes
   - Ensure keyboard navigation works for all form elements

## Convex Integration Considerations

When integrating forms with Convex:

1. **Type Safety**
   - Ensure form data types match your Convex schema
   - Use proper type casting when necessary

2. **Error Handling**
   - Provide fallback UI when Convex connection fails
   - Implement retry logic for transient errors

3. **Loading States**
   - Show clear loading indicators during submission
   - Disable form during submission to prevent double-submits

4. **Success Feedback**
   - Provide clear success messages after submission
   - Consider redirecting to a confirmation page

## Specific Component Solutions

### ConvexContactForm

Recent fixes:

- Added proper width to Select triggers
- Fixed type handling in onValueChange handlers
- Added position="popper" to SelectContent
- Implemented proper mounting status tracking
- Added detailed logging

### ContactForm (with React Hook Form)

Recent fixes:

- Set default values for subject and budget fields
- Added force re-renders after setting values
- Fixed SelectTrigger width
- Added position="popper" to SelectContent components
- Added both value and defaultValue props to Select
- Improved debugging with detailed logging