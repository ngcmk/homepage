import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ProjectFormStep4Props {
  form: any;
  t: (key: string, params?: Record<string, any>) => string;
  contactMethods: { value: string; label: string; description: string }[];
}

const ProjectFormStep4: React.FC<ProjectFormStep4Props> = ({
  form,
  t,
  contactMethods,
}) => (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
    <FormField
      control={form.control}
      name="contactName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.contactName")}</FormLabel>
          <FormControl>
            <Input placeholder={t("project.initialize.placeholders.contactName")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="contactEmail"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.contactEmail")}</FormLabel>
          <FormControl>
            <Input placeholder={t("project.initialize.placeholders.contactEmail")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="contactPhone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.contactPhone")}</FormLabel>
          <FormControl>
            <Input placeholder={t("project.initialize.placeholders.contactPhone")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.company")}</FormLabel>
          <FormControl>
            <Input placeholder={t("project.initialize.placeholders.company")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="preferredContact"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.preferredContact")}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("project.initialize.placeholders.preferredContact")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-lg text-black dark:text-white">
              {contactMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="additionalInfo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.additionalInfo")}</FormLabel>
          <FormControl>
            <Textarea placeholder={t("project.initialize.placeholders.additionalInfo")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default ProjectFormStep4;
