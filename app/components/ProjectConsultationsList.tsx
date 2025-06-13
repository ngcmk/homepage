"use client";

import { useState } from "react";
import { useProjectConsultations, useProjectManagement } from "../hooks/use-project-consultations";
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
        await markAsReviewing(projectId, "Status updated to reviewing");
        toast.success("Project marked as reviewing");
      } else if (newStatus === "quoted") {
        await markAsQuoted(projectId, "Quote prepared and sent");
        toast.success("Project marked as quoted");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleAddNote = async (projectId: Id<"projectConsultations">, note: string) => {
    try {
      await addProjectNote(projectId, note, "Admin", "note");
      toast.success("Note added successfully");
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      reviewing: "bg-yellow-100 text-yellow-800",
      quoted: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800",
      in_progress: "bg-indigo-100 text-indigo-800",
      completed: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-gray-100 text-gray-800",
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
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Consultations</h1>
          <p className="text-gray-600">
            {filteredProjects?.length || 0} consultation requests
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project Type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="website-redesign">Website Redesign</SelectItem>
                    <SelectItem value="new-website">New Website</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="web-app">Web App</SelectItem>
                    <SelectItem value="mobile-app">Mobile App</SelectItem>
                    <SelectItem value="branding">Branding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency</label>
                <Select
                  value={filters.urgency}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgencies</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
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
            <p className="mt-4 text-gray-600">Loading project consultations...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">
                {filters.search || filters.status !== "all" || filters.type !== "all" || filters.urgency !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No project consultations have been submitted yet."}
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
                        {project.name || "Untitled Project"}
                      </CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace("_", " ")}
                      </Badge>
                      <Badge className={getUrgencyColor(project.priority)}>
                        <Zap className="w-3 h-3 mr-1" />
                        {project.priority}
                      </Badge>
                    </div>

                    {project.type && (
                      <Badge variant="outline">
                        {project.type.replace("-", " ")}
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
                        Start Review
                      </Button>
                    )}
                    {project.status === "reviewing" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(project._id, "quoted")}
                      >
                        Send Quote
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
                        <p className="text-xs text-gray-600">Est. Budget</p>
                      </div>
                    </div>
                  )}

                  {project.estimatedTimeline && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {project.estimatedTimeline} weeks
                        </p>
                        <p className="text-xs text-gray-600">Est. Timeline</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(project.createdAt)}
                      </p>
                      <p className="text-xs text-gray-600">Submitted</p>
                    </div>
                  </div>
                </div>

                {/* Goals and Features */}
                {(project.goals?.length || project.features?.length) && (
                  <div className="space-y-2">
                    {project.goals && project.goals.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Goals:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.goals.slice(0, 3).map((goal, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {goal.replace("-", " ")}
                            </Badge>
                          ))}
                          {project.goals.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.goals.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {project.features && project.features.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature.replace("-", " ")}
                            </Badge>
                          ))}
                          {project.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.features.length - 3} more
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
                      const note = prompt("Add a note:");
                      if (note) handleAddNote(project._id, note);
                    }}
                  >
                    Add Note
                  </Button>

                  {project.contactEmail && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${project.contactEmail}`)}
                    >
                      Send Email
                    </Button>
                  )}

                  {project.existingWebsite && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.existingWebsite, "_blank")}
                    >
                      View Website
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
