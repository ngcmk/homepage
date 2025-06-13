"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  type: "services" | "portfolio" | "testimonials" | "form";
  count?: number;
}

export default function SkeletonLoader({ type, count = 3 }: SkeletonLoaderProps) {
  const renderServicesSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-px w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPortfolioSkeleton = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-6 w-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative">
          <Skeleton className="absolute -top-6 -left-6 w-12 h-12" />
          <div className="bg-white p-8 rounded-lg shadow-sm relative z-10 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );

  switch (type) {
    case "services":
      return renderServicesSkeleton();
    case "portfolio":
      return renderPortfolioSkeleton();
    case "testimonials":
      return renderTestimonialsSkeleton();
    case "form":
      return renderFormSkeleton();
    default:
      return null;
  }
}
