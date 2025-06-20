"use client";

import { useState } from "react";
import { useProjectConsultations, useProjectManagement } from "../hooks/use-project-consultations";
import { useLanguage } from "../contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Mail,
  Phone,
  Building,
  Target,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

interface FilterState {
  status: string;
  type: string;
  urgency: string;
  search: string;
}

export function ProjectConsultationsList() {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    type: "all",
    urgency: "all",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Build query filters for Convex
  const queryFilters = {
    ...(filters.status !== "all" && { status: filters.status as any }),
    ...(filters.type !== "all" && { type: filters.type as any }),
    ...(filters.urgency !== "all" && { urgency: filters.urgency as any }),
    limit: 50,
  };

  const projects = useProjectConsultations(queryFilters);
  const { markAsReviewing, markAsQuoted, addProjectNote } = useProjectManagement();

  // Filter projects client-side for search
  const filteredProjects = projects?.filter(project => {
    if (!filters.search) return true;
    const searchTerm = filters.search.toLowerCase();
    return (
      project.name?.toLowerCase().includes(searchTerm) ||
      project.contactName?.toLowerCase().includes(searchTerm) ||
      project.contactEmail?.toLowerCase().includes(searchTerm) ||
      project.company?.toLowerCase().includes(searchTerm) ||
      project.description?.toLowerCase().includes(searchTerm)
    );
  });

  const handleStatusChange = async (projectId: Id<"projectConsultations">, newStatus: string) => {
    try {
      if (newStatus === "reviewing") {
        await markAsReviewing(projectId, t('project.consultations.success.markedReviewing'));
        toast.success(t('project.consultations.success.markedReviewing'));
      } else if (newStatus === "quoted") {
        await markAsQuoted(projectId, t('project.consultations.success.markedQuoted'));
        toast.success(t('project.consultations.success.markedQuoted'));
      }
    } catch (error) {
      toast.error(t('project.consultations.errors.updateStatus'));
    }
  };

  const handleAddNote = async (projectId: Id<"projectConsultations">, note: string) => {
    try {
      await addProjectNote(projectId, note, "Admin", "note");
      toast.success(t('project.consultations.success.noteAdded'));
    } catch (error) {
      toast.error(t('project.consultations.errors.addNote'));
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      reviewing: "bg-yellow-100 text-yellow-800",
      quoted: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      in_progress: "bg-indigo-100 text-indigo-800",
      completed: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-gray-100 text-gray-800",
      declined: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[urgency as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : 
      language === 'sr' ? 'sr-RS' : 'en-US',
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(
      language === 'mk' ? 'mk-MK' : 
      language === 'sr' ? 'sr-RS' : 'en-US',
      {
        style: "currency",
        currency: language === 'mk' ? 'MKD' :
                language === 'sr' ? 'RSD' : 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    ).format(amount);
  };

  // Helper to get status display text
  const getStatusText = (status: string) => {
    const statuses = t('project.consultations.filters.statuses') as Record<string, string>;
    return statuses[status] || status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getTypeText = (type: string) => {
    const types = t('project.consultations.filters.types') as Record<string, string>;
    return types[type] || type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getUrgencyText = (urgency: string) => {
    const urgencies = t('project.consultations.filters.urgencies') as Record<string, string>;
    return urgencies[urgency] || urgency.charAt(0).toUpperCase() + urgency.slice(1);
  };

  // Get filter options with proper typing
  const statusOptions = Object.entries(t('project.consultations.filters.statuses') as Record<string, string>);
  const typeOptions = Object.entries(t('project.consultations.filters.types') as Record<string, string>);
  const urgencyOptions = Object.entries(t('project.consultations.filters.urgencies') as Record<string, string>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('projectConsultations.title')}
          </h1>
          <p className="text-gray-600">
            {filteredProjects?.length || 0} {t('projectConsultations.messages.noProjects').toLowerCase()}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {t('projectConsultations.actions.filters')}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('projectConsultations.filters.searchPlaceholder')}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('projectConsultations.filters.searchPlaceholder')}
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('projectConsultations.filters.statusLabel')}
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t('projectConsultations.filters.allStatuses')}
                    </SelectItem>
                    {statusOptions.map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('projectConsultations.filters.typeLabel')}
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t('projectConsultations.filters.allTypes')}
                    </SelectItem>
                    {typeOptions.map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('projectConsultations.filters.urgencyLabel')}
                </label>
                <Select
                  value={filters.urgency}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t('projectConsultations.filters.allUrgencies')}
                    </SelectItem>
                    {urgencyOptions.map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project List */}
      <div className="space-y-4">
        {!filteredProjects ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {t('projectConsultations.messages.loading')}
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('projectConsultations.messages.noProjects')}
              </h3>
              <p className="text-gray-600">
                {filters.search || filters.status !== "all" || filters.type !== "all" || filters.urgency !== "all"
                  ? t('projectConsultations.messages.noProjectsFiltered')
                  : t('projectConsultations.messages.noProjectsDefault')}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project._id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {project.name || t('projectConsultations.messages.untitledProject')}
                      </CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                      <Badge className={getUrgencyColor(project.priority)}>
                        <Zap className="w-3 h-3 mr-1" />
                        {getUrgencyText(project.priority)}
                      </Badge>
                    </div>

                    {project.type && (
                      <Badge variant="outline">
                        {getTypeText(project.type)}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.status === "new" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(project._id, "reviewing")}
                      >
                        {t('projectConsultations.actions.startReview')}
                      </Button>
                    )}
                    {project.status === "reviewing" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(project._id, "quoted")}
                      >
                        {t('projectConsultations.actions.sendQuote')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Project Description */}
                {project.description && (
                  <p className="text-gray-700 line-clamp-2">{project.description}</p>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {project.contactName && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{project.contactName}</span>
                    </div>
                  )}

                  {project.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{project.contactEmail}</span>
                    </div>
                  )}

                  {project.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{project.contactPhone}</span>
                    </div>
                  )}

                  {project.company && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{project.company}</span>
                    </div>
                  )}
                </div>


                {/* Project Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  {project.estimatedBudget && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(project.estimatedBudget)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {t('projectConsultations.labels.estBudget')}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.estimatedTimeline && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {project.estimatedTimeline} {t('projectConsultations.labels.estTimeline').split(' ')[1]}
                        </p>
                        <p className="text-xs text-gray-600">
                          {t('projectConsultations.labels.estTimeline')}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(project.createdAt)}
                      </p>
                      <p className="text-xs text-gray-600">
                        {t('projectConsultations.labels.submitted')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Goals and Features */}
                {(project.goals?.length || project.features?.length) && (
                  <div className="space-y-2">
                    {project.goals && project.goals.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {t('projectConsultations.labels.goals')}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.goals.slice(0, 3).map((goal, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {goal.replace("-", " ")}
                            </Badge>
                          ))}
                          {project.goals.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.goals.length - 3} {t('projectConsultations.labels.more')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {project.features && project.features.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {t('projectConsultations.labels.features')}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature.replace("-", " ")}
                            </Badge>
                          ))}
                          {project.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.features.length - 3} {t('projectConsultations.labels.more')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const note = prompt(t('projectConsultations.actions.addNote') + ":");
                      if (note) handleAddNote(project._id, note);
                    }}
                  >
                    {t('projectConsultations.actions.addNote')}
                  </Button>

                  {project.contactEmail && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${project.contactEmail}`)}
                    >
                      {t('projectConsultations.actions.sendEmail')}
                    </Button>
                  )}

                  {project.existingWebsite && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.existingWebsite, "_blank")}
                    >
                      {t('projectConsultations.actions.viewWebsite')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
