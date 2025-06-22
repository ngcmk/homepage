import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ProjectFormStep1Props {
  form: any;
  t: (key: string, params?: Record<string, any>) => string;
  projectTypes: { value: string; label: string }[];
  urgencyLevels: { value: string; label: string }[];
}

const ProjectFormStep1: React.FC<ProjectFormStep1Props> = ({
  form,
  t,
  projectTypes,
  urgencyLevels,
}) => (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.name")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("project.initialize.placeholders.name")}
              {...field}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.description")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("project.initialize.placeholders.description")}
              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              {...field}
            />
          </FormControl>
          <FormDescription>
            {field.value?.length || 0}/1000{" "}
            {t("project.initialize.labels.characters")}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.type")}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={t("project.initialize.placeholders.type")}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
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
      name="urgency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("project.initialize.fields.urgency")}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={t("project.initialize.placeholders.urgency")}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {urgencyLevels.map((urgency) => (
                <SelectItem key={urgency.value} value={urgency.value}>
                  {urgency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            {t("project.initialize.descriptions.urgency")}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default ProjectFormStep1;
