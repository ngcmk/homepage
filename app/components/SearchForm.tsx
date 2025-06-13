"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/language-context";
import { Search, Filter, X, Loader2 } from "lucide-react";

// Validation schema
const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query must be less than 100 characters"),
  category: z.string().optional(),
  sortBy: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

interface SearchFormProps {
  onSearch?: (data: SearchFormValues) => void;
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
  placeholder?: string;
  showFilters?: boolean;
  showResults?: boolean;
  variant?: "default" | "minimal" | "header";
}

export default function SearchForm({
  onSearch,
  onResultSelect,
  className,
  placeholder = "Search for services, projects, or information...",
  showFilters = true,
  showResults = true,
  variant = "default",
}: SearchFormProps) {
  const { t } = useLanguage();
  const [isSearching, setIsSearching] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
      category: "",
      sortBy: "relevance",
    },
  });

  const categories = [
    { value: "", label: "All Categories" },
    { value: "services", label: "Services" },
    { value: "portfolio", label: "Portfolio" },
    { value: "blog", label: "Blog" },
    { value: "about", label: "About" },
    { value: "contact", label: "Contact" },
  ];

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "recent", label: "Most Recent" },
    { value: "popular", label: "Most Popular" },
    { value: "alphabetical", label: "A-Z" },
  ];

  // Mock search suggestions
  const suggestions = [
    "Web design services",
    "Mobile app development",
    "E-commerce solutions",
    "Brand identity design",
    "UI/UX consulting",
    "Digital strategy",
    "Portfolio examples",
    "Contact information",
  ];

  const handleSubmit = async (data: SearchFormValues) => {
    try {
      setIsSearching(true);
      setShowSuggestions(false);

      // Add to recent searches
      if (data.query && !recentSearches.includes(data.query)) {
        setRecentSearches(prev => [data.query, ...prev.slice(0, 4)]);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Web Design Services",
          description: "Professional web design services for modern businesses",
          category: "services",
          url: "/services/design",
        },
        {
          id: "2",
          title: "Mobile App Development",
          description: "Cross-platform mobile applications that deliver results",
          category: "services",
          url: "/services/mobile",
        },
        {
          id: "3",
          title: "E-commerce Portfolio",
          description: "See our latest e-commerce projects and case studies",
          category: "portfolio",
          url: "/portfolio/ecommerce",
        },
      ];

      setSearchResults(mockResults);

      if (onSearch) {
        onSearch(data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputFocus = () => {
    if (variant !== "minimal") {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("query", suggestion);
    setShowSuggestions(false);
    form.handleSubmit(handleSubmit)();
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  const clearSearch = () => {
    form.reset();
    setSearchResults([]);
    setShowSuggestions(false);
  };

  // Header variant - minimal inline search
  if (variant === "header") {
    return (
      <div className={`relative ${className}`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={placeholder}
                        {...field}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearSearch}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Quick suggestions dropdown */}
        {showSuggestions && (
          <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto">
                {recentSearches.length > 0 && (
                  <div className="p-3 border-b">
                    <h4 className="text-sm font-medium mb-2 text-muted-foreground">Recent Searches</h4>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                )}
                <div className="p-3">
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Suggestions</h4>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <div className={className}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSearching || !form.watch("query")}
              className="shrink-0"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  // Default variant - full featured search
  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Main search input */}
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={placeholder}
                          {...field}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                        {field.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={clearSearch}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Category
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sortBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort By</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sort results" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sortOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Search button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSearching || !form.watch("query")}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </div>
                )}
              </Button>
            </form>
          </Form>

          {/* Search suggestions */}
          {showSuggestions && !isSearching && (
            <div className="space-y-3">
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Recent Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 5).map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search results */}
          {showResults && searchResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <Badge variant="secondary">
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </Badge>
              </div>

              <div className="space-y-3">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">
                          {result.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {result.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results state */}
          {showResults && searchResults.length === 0 && form.watch("query") && !isSearching && !showSuggestions && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse our popular content.
              </p>
              <Button variant="outline" onClick={clearSearch}>
                Clear Search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
