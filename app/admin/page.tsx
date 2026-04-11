'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  useProjectConsultations, 
  useDeleteProjectConsultation,
  useProjectConsultation 
} from '../hooks/use-project-consultations';
import { Id } from '@/convex/_generated/dataModel';
import { Eye, Trash2, X } from 'lucide-react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'ngcmk7654321';

interface ProjectConsultation {
  _id: string;
  name?: string;
  description?: string;
  type?: string;
  urgency?: string;
  industry?: string;
  targetAudience?: string;
  existingWebsite?: string;
  timeline?: string;
  budget?: string;
  hasContent?: string;
  designPreferences?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  company?: string;
  preferredContact?: string;
  additionalInfo?: string;
  status?: string;
  priority?: string;
  createdAt: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectConsultation | null>(null);

  const projects = useProjectConsultations({ limit: 100 });
  const deleteProject = useDeleteProjectConsultation();
  const loading = projects === undefined;

  const handleViewDetails = (projectId: string) => {
    const project = projects?.find(p => p._id === projectId);
    if (project) {
      setViewingProjectId(projectId);
      setProjectDetails(project);
    }
  };

  const handleCloseDetails = () => {
    setViewingProjectId(null);
    setProjectDetails(null);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const handleDelete = async (projectId: string) => {
    try {
      await deleteProject({ id: projectId as Id<"projectConsultations"> });
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      quoted: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800',
      in_progress: 'bg-indigo-100 text-indigo-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-gray-100 text-gray-600',
    };
    return colors[status || ''] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyColor = (urgency?: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-600',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return colors[urgency || ''] || 'bg-gray-100 text-gray-600';
  };

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Project Consultations ({projects?.length || 0})
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : !projects || projects.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No project consultations yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(project.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {project.contactName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.contactEmail}
                        </div>
                        {project.contactPhone && (
                          <div className="text-sm text-gray-500">
                            {project.contactPhone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.type?.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status?.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(
                            project.urgency
                          )}`}
                        >
                          {project.urgency?.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Medium'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.budget || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewDetails(project._id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(project._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* View Details Modal */}
      {viewingProjectId && projectDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <button
                onClick={() => setProjectDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Project Name</label>
                  <p className="text-gray-900">{projectDetails.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-gray-900">{projectDetails.type?.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(projectDetails.status)}`}>
                    {projectDetails.status?.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'New'}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Urgency</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(projectDetails.urgency)}`}>
                    {projectDetails.urgency?.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Medium'}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Industry</label>
                  <p className="text-gray-900">{projectDetails.industry || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Budget</label>
                  <p className="text-gray-900">{projectDetails.budget || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Timeline</label>
                  <p className="text-gray-900">{projectDetails.timeline || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Has Content</label>
                  <p className="text-gray-900">{projectDetails.hasContent || 'N/A'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900">{projectDetails.description || 'N/A'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Target Audience</label>
                <p className="text-gray-900">{projectDetails.targetAudience || 'N/A'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Design Preferences</label>
                <p className="text-gray-900">{projectDetails.designPreferences || 'N/A'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Existing Website</label>
                <p className="text-gray-900">{projectDetails.existingWebsite || 'N/A'}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-md font-semibold mb-2">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{projectDetails.contactName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{projectDetails.contactEmail || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{projectDetails.contactPhone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Company</label>
                    <p className="text-gray-900">{projectDetails.company || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Preferred Contact</label>
                    <p className="text-gray-900">{projectDetails.preferredContact || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {projectDetails.additionalInfo && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Additional Information</label>
                  <p className="text-gray-900">{projectDetails.additionalInfo}</p>
                </div>
              )}

              <div className="text-sm text-gray-500">
                Created: {formatDate(projectDetails.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this project consultation? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}