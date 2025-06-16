# Form Components Documentation

## Overview

This project includes a comprehensive set of form components built with React Hook Form, Zod validation, and shadcn/ui components. All forms are fully typed with TypeScript and include accessibility features, loading states, and modern UX patterns.

## 🚀 Quick Start

### Dependencies

The following packages are required and already installed:

```bash
npm install react-hook-form @hookform/resolvers zod
npx shadcn@latest add form label input textarea select button card badge tabs
```

### Basic Usage

```tsx
import ContactForm from './components/ContactForm';

function MyPage() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <ContactForm onSubmit={handleSubmit} />
  );
}
```

## 📋 Available Form Components

### 1. ContactForm

A comprehensive contact form with all essential fields for business inquiries.

**Features:**
- ✅ Name, email, phone, company, subject, budget, message fields
- ✅ Advanced validation with custom error messages
- ✅ Subject categorization dropdown
- ✅ Budget range selection
- ✅ Loading states and submission feedback
- ✅ Professional styling with icons

**Usage:**

```tsx
import ContactForm from './components/ContactForm';

<ContactForm
  onSubmit={(data) => console.log(data)}
  className="max-w-lg mx-auto"
/>
```

**Form Data Type:**
```tsx
type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
};
```

### 2. NewsletterForm

Flexible newsletter subscription forms with multiple display variants.

**Variants:**
- `default` - Full featured with benefits list
- `minimal` - Simple email input and submit button
- `inline` - Horizontal layout for headers/footers

**Usage:**

```tsx
import NewsletterForm from './components/NewsletterForm';

// Default variant
<NewsletterForm
  variant="default"
  title="Stay Updated"
  description="Get weekly insights"
  showBenefits={true}
  onSubmit={(data) => console.log(data)}
/>

// Minimal variant
<NewsletterForm
  variant="minimal"
  onSubmit={(data) => console.log(data)}
/>

// Inline variant
<NewsletterForm
  variant="inline"
  onSubmit={(data) => console.log(data)}
/>
```

**Form Data Type:**
```tsx
type NewsletterFormValues = {
  email: string;
  firstName?: string;
};
```

### 3. SearchForm

Advanced search functionality with filtering and suggestions.

**Variants:**
- `default` - Full featured with filters and results
- `header` - Compact for navigation bars
- `minimal` - Simple search input

**Usage:**

```tsx
import SearchForm from './components/SearchForm';

// Full featured search
<SearchForm
  variant="default"
  showFilters={true}
  showResults={true}
  onSearch={(data) => console.log(data)}
  onResultSelect={(result) => navigate(result.url)}
/>

// Header search
<SearchForm
  variant="header"
  placeholder="Search..."
  onSearch={(data) => console.log(data)}
/>
```

**Form Data Type:**
```tsx
type SearchFormValues = {
  query: string;
  category?: string;
  sortBy?: string;
};
```

### 4. Enhanced Initialize Project Form

Multi-step project initialization form with validation at each step.

**Features:**
- ✅ 4-step wizard interface
- ✅ Progress indicator
- ✅ Step-by-step validation
- ✅ Project details, timeline, budget, contact info
- ✅ Summary review before submission

**Already integrated in:** `/initialize-project`

## 🎨 Form Architecture

### Validation Schema Pattern

All forms use Zod schemas for type-safe validation:

```tsx
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
});

type FormValues = z.infer<typeof formSchema>;
```

### Form Setup Pattern

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    name: "",
  },
  mode: "onChange", // Real-time validation
});
```

### Form Component Structure

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Field Label</FormLabel>
          <FormControl>
            <Input placeholder="Enter value..." {...field} />
          </FormControl>
          <FormDescription>Helper text</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <Button type="submit" disabled={form.formState.isSubmitting}>
      {form.formState.isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  </form>
</Form>
```

## 🎯 Key Features

### Accessibility
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Error announcements

### User Experience
- ✅ Real-time validation feedback
- ✅ Loading states and animations
- ✅ Success/error state handling
- ✅ Mobile-responsive design
- ✅ Touch-friendly interactions

### Developer Experience
- ✅ Full TypeScript support
- ✅ Reusable component patterns
- ✅ Consistent API across forms
- ✅ Easy customization
- ✅ Well-documented props

## 🛠 Customization

### Styling

All components accept a `className` prop for custom styling:

```tsx
<ContactForm 
  className="max-w-2xl mx-auto shadow-lg"
  onSubmit={handleSubmit}
/>
```

### Custom Validation

Extend validation schemas for specific needs:

```tsx
const customContactSchema = contactFormSchema.extend({
  website: z.string().url().optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
});
```

### Custom Submission Handling

```tsx
const handleCustomSubmit = async (data: ContactFormValues) => {
  try {
    setIsLoading(true);
    
    // Send to your API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      toast.success('Message sent successfully!');
      form.reset();
    } else {
      toast.error('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    toast.error('An error occurred. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

## 📱 Responsive Design

All forms are built with mobile-first responsive design:

- **Mobile (< 768px)**: Single column layout, optimized touch targets
- **Tablet (768px - 1024px)**: Improved spacing, some side-by-side fields
- **Desktop (> 1024px)**: Full layout with optimal spacing and alignment

## 🧪 Demo Page

Visit `/forms-demo` to see all form components in action with:
- Live interactive examples
- Different variants and configurations
- Implementation code snippets
- Feature explanations

## 🔧 Integration Examples

### With Next.js API Routes

```tsx
// pages/api/contact.ts
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    // Validate data server-side
    const result = contactFormSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    
    // Process form data (send email, save to database, etc.)
    await sendEmail({ name, email, message });
    
    res.status(200).json({ success: true });
  }
}
```

### With State Management

```tsx
import { useFormStore } from './store/formStore';

function ContactPage() {
  const { submitContact, isLoading } = useFormStore();
  
  const handleSubmit = async (data: ContactFormValues) => {
    await submitContact(data);
  };
  
  return (
    <ContactForm 
      onSubmit={handleSubmit}
      disabled={isLoading}
    />
  );
}
```

## 📚 Best Practices

1. **Always validate on both client and server side**
2. **Provide clear, helpful error messages**
3. **Use loading states for better UX**
4. **Test with keyboard navigation and screen readers**
5. **Keep forms simple and focused**
6. **Provide clear success feedback**
7. **Handle errors gracefully**
8. **Make forms mobile-friendly**

## 🔄 Future Enhancements

Planned improvements:
- [ ] File upload components
- [ ] Multi-select dropdown fields
- [ ] Date/time picker integration
- [ ] Conditional field display
- [ ] Form analytics and tracking
- [ ] Internationalization support
- [ ] Advanced field validation rules
- [ ] Form templates and presets

## 🤝 Contributing

When adding new form components:

1. Follow the established patterns (Zod + React Hook Form + shadcn/ui)
2. Include TypeScript definitions
3. Add accessibility features
4. Create responsive designs
5. Include loading and error states
6. Add documentation and examples
7. Test with various screen sizes and input methods

## 📞 Support

For questions or issues with form components:
- Check the demo page at `/forms-demo`
- Review this documentation
- Check component source code for implementation details
- Test different variants and configurations