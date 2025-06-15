/**
 * Form Debug Utilities
 *
 * This file contains helper functions to debug form components, especially Select
 * components that integrate with React Hook Form.
 */

import { type FieldValues, type UseFormReturn } from "react-hook-form";

/**
 * Debug form state changes and field values
 *
 * @param form The React Hook Form instance
 * @returns A cleanup function to unsubscribe from form changes
 */
export function debugFormState(form: any) {
  console.log("[FormDebug] Initial form values:", form.getValues());
  console.log("[FormDebug] Initial form errors:", form.formState.errors);

  // Subscribe to form changes
  const subscription = form.watch((value: any, { name, type }: any) => {
    if (!name) return;
    console.log(`[FormDebug] Field "${name}" changed (${type})`, value[name]);
  });

  // Return cleanup function
  return () => subscription.unsubscribe();
}

/**
 * Debug Select component integration with React Hook Form
 *
 * @param form The React Hook Form instance
 * @param fieldName The name of the select field
 */
export function debugSelectField(form: any, fieldName: string) {
  console.log(`[FormDebug] Select field "${fieldName}" debug info:`, {
    currentValue: form.getValues(fieldName),
    error: form.formState.errors[fieldName],
  });
}

/**
 * Helper function to force an update of a select field
 * This can help when the select component doesn't reflect the current form value
 *
 * @param form The React Hook Form instance
 * @param fieldName The name of the select field
 * @param defaultValue Optional default value to set if current value is empty
 */
export function forceSelectFieldUpdate(
  form: any,
  fieldName: string,
  defaultValue?: any,
) {
  const currentValue = form.getValues(fieldName);

  // If no current value and default provided, set it
  if ((!currentValue || currentValue === "") && defaultValue) {
    console.log(
      `[FormDebug] Setting default value for "${fieldName}":`,
      defaultValue,
    );
    form.setValue(fieldName, defaultValue, {
      shouldDirty: true,
      shouldValidate: true,
    });
  } else {
    // Otherwise just force a refresh of the current value
    console.log(
      `[FormDebug] Refreshing field "${fieldName}" with current value:`,
      currentValue,
    );

    // Small delay to ensure the DOM has updated
    setTimeout(() => {
      form.setValue(fieldName, currentValue, {
        shouldValidate: true,
      });
    }, 0);
  }

  // Trigger validation to update UI
  setTimeout(() => form.trigger(fieldName), 10);
}

/**
 * Create a custom onChange handler for Select components
 * This adds additional logging and ensures proper form updates
 *
 * @param form The React Hook Form instance
 * @param fieldName The name of the field in the form
 * @returns A function to use as the onValueChange prop for Select
 */
export function createSelectChangeHandler(form: any, fieldName: string) {
  return (value: string) => {
    console.log(`[FormDebug] Select onValueChange for "${fieldName}":`, value);

    // Update the form value
    form.setValue(fieldName, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    // Log the updated form state
    console.log(
      `[FormDebug] After select change, form value:`,
      form.getValues(fieldName),
    );
  };
}
