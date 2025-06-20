# Localization Implementation Guide

This document outlines the localization implementation in the Next.js application, including the current setup, components using localization, and guidelines for adding localization to new components.

## Table of Contents
- [Current Implementation](#current-implementation)
- [Components Using Localization](#components-using-localization)
- [Components Needing Localization](#components-needing-localization)
- [How to Add Localization to a Component](#how-to-add-localization-to-a-component)
- [Adding New Translations](#adding-new-translations)
- [Best Practices](#best-practices)

## Current Implementation

The application uses a React Context-based localization system with the following features:
- Support for multiple languages: English (`en`), Macedonian (`mk`), and Serbian (`sr`)
- Centralized translation keys in `language-context.tsx`
- Automatic language detection based on user preferences
- Ability to switch languages dynamically

## Components Using Localization

The following components are already using the localization context:

1. `app/components/Portfolio.tsx`
2. `app/components/NewsletterForm.tsx`
3. `app/components/Testimonials.tsx`
4. `app/components/Services.tsx`
5. `app/components/Header.tsx`
6. `app/components/ContactForm.tsx`
7. `app/components/Hero/HeroSection.tsx`
8. `app/components/Footer.tsx`
9. `app/components/Breadcrumb.tsx`
10. `app/components/SearchForm.tsx`
11. `app/services/[service]/ServiceTemplate.tsx`
12. `app/components/Contact/ContactHub.tsx`
13. `app/components/LanguageSwitcher.tsx`
14. `app/initialize-project/page.tsx`

## Components Needing Localization

The following components have been identified as potentially needing localization but are not currently using the language context:

1. `app/components/ConvexContactForm.tsx` - Contains hardcoded strings
2. `app/components/ErrorFallback.tsx` - Contains error messages
3. `app/components/ProjectConsultationsList.tsx` - Contains UI text
4. Service pages (`app/services/*/page.tsx`) - May contain hardcoded content
5. `app/thank-you/page.tsx` - Contains success messages

## How to Add Localization to a Component

### 1. Import the useLanguage Hook

```tsx
import { useLanguage } from "../contexts/language-context";
```

### 2. Use the Hook in Your Component

```tsx
function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('myComponent.title')}</h1>
      <p>{t('myComponent.description')}</p>
    </div>
  );
}
```

### 3. Add Translation Keys

Add your translation keys to the `translations` object in `language-context.tsx`:

```tsx
const translations = {
  en: {
    // ... existing translations
    myComponent: {
      title: "My Component Title",
      description: "This is a localized description.",
    },
  },
  mk: {
    myComponent: {
      title: "Наслов на компонента",
      description: "Ова е локализиран опис.",
    },
  },
  sr: {
    myComponent: {
      title: "Naslov komponente",
      description: "Ovo je lokalizovani opis.",
    },
  },
};
```

## Adding New Translations

1. Add new translation keys to all supported languages in `language-context.tsx`
2. Keep the translation keys consistent across all languages
3. Use nested objects to group related translations
4. Prefix keys with the component name for better organization (e.g., `contactForm.submitButton`)

## Best Practices

1. **Always use translation keys**: Avoid hardcoding text in components
2. **Keep translations organized**: Group related translations under common prefixes
3. **Provide all translations**: Always add translations for all supported languages
4. **Use descriptive keys**: Make keys descriptive of their purpose, not their content
5. **Keep components pure**: Components should not contain language-specific logic
6. **Test all languages**: Verify that all text is properly displayed in each supported language
7. **Handle dynamic content**: Use the `params` argument for dynamic values:
   ```tsx
   t('welcomeMessage', { name: userName })
   ```

## Common Pitfalls

1. **Missing translations**: Always provide translations for all supported languages
2. **Hardcoded text**: Be vigilant about not hardcoding text in components
3. **Inconsistent keys**: Keep key naming consistent across the application
4. **Forgetting to update all languages**: When adding new strings, update all language versions

## Adding a New Language

To add support for a new language:

1. Add the language code to the `Language` type in `language-context.tsx`
2. Add a new entry in the `translations` object with all the translations
3. Update the `languageOptions` array in `LanguageSwitcher.tsx` if needed
4. Test thoroughly to ensure all text is properly displayed
