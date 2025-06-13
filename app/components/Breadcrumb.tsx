"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemData {
  label: string;
  href: string;
  current?: boolean;
}

export default function PageBreadcrumb() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Don't show breadcrumbs on homepage
  if (pathname === "/") {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItemData[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItemData[] = [
      {
        label: t("nav.home"),
        href: "/",
      },
    ];

    let currentPath = "";

    paths.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === paths.length - 1;

      let label = segment;

      // Handle specific routes
      if (segment === "initialize-project") {
        label = t("nav.startProject");
      } else if (segment === "services") {
        label = t("nav.services");
      } else if (segment === "design") {
        label = t("services.design.title");
      } else if (segment === "development") {
        label = t("services.development.title");
      } else if (segment === "mobile") {
        label = t("services.mobile.title");
      } else if (segment === "poc") {
        label = t("services.poc.title");
      } else if (segment === "ai") {
        label = t("services.ai.title");
      } else if (segment === "ngo-support") {
        label = t("services.ngo-support.title");
      } else {
        // Capitalize and replace hyphens with spaces for unknown segments
        label = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.current ? (
                  <BreadcrumbPage className="flex items-center">
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href} className="flex items-center">
                      {index === 0 && <Home className="h-4 w-4 mr-1" />}
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
