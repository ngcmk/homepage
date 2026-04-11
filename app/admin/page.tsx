'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  useProjectConsultations, 
  useDeleteProjectConsultation,
} from '../hooks/use-project-consultations';
import { useContacts, useDeleteContact } from '../hooks/use-contacts';
import { Id } from '@/convex/_generated/dataModel';
import { Eye, Trash2, X, Search, Filter } from 'lucide-react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'ngcmk7654321';
const ITEMS_PER_PAGE = 20;

interface ProjectConsultation {
  _id: string;
  name?: string;
  description?: string;
  type?: string;
  urgency?: string;
  industry?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  company?: string;
  status?: string;
  budget?: string;
  createdAt: number;
}

interface Contact {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  contactType?: string;
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
  
  const [activeTab, setActiveTab] = useState<'projects' | 'contacts'>('projects');
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectConsultation | null>(null);
  
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('all');
  const [projectPage, setProjectPage] = useState(1);
  
  const [contactSearch, setContactSearch] = useState('');
  const [contactTypeFilter, setContactTypeFilter] = useState('all');
  const [contactPage, setContactPage] = useState(1);

  const projects = useProjectConsultations({ limit: 100 });
  const contacts = useContacts({ limit: 100 });
  const deleteProject = useDeleteProjectConsultation();
  const deleteContact = useDeleteContact();
  const loading = projects === undefined;

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(p => {
      const matchesSearch = !projectSearch || 
        p.contactName?.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.contactEmail?.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.company?.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.name?.toLowerCase().includes(projectSearch.toLowerCase());
      const matchesStatus = projectStatusFilter === 'all' || p.status === projectStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, projectSearch, projectStatusFilter]);

  const paginatedProjects = useMemo(() => {
    const start = (projectPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, projectPage]);

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    return contacts.filter(c => {
      const matchesSearch = !contactSearch || 
        c.name?.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.email?.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.company?.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.subject?.toLowerCase().includes(contactSearch.toLowerCase());
      const matchesType = contactTypeFilter === 'all' || c.contactType === contactTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [contacts, contactSearch, contactTypeFilter]);

  const paginatedContacts = useMemo(() => {
    const start = (contactPage - 1) * ITEMS_PER_PAGE;
    return filteredContacts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredContacts, contactPage]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeTab === 'projects') setProjectPage(1);
    else setContactPage(1);
  }, [activeTab, projectSearch, projectStatusFilter, contactSearch, contactTypeFilter]);

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

  const handleDelete = async (itemId: string) => {
    try {
      if (itemId.startsWith('contact-')) {
        const contactId = itemId.replace('contact-', '');
        await deleteContact({ id: contactId as Id<"contacts"> });
      } else {
        await deleteProject({ id: itemId as Id<"projectConsultations"> });
      }
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete:', err);
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

  const getContactTypeColor = (type?: string) => {
    const colors: Record<string, string> = {
      general: 'bg-gray-100 text-gray-800',
      business: 'bg-green-100 text-green-800',
      support: 'bg-blue-100 text-blue-800',
      partnership: 'bg-purple-100 text-purple-800',
      careers: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type || ''] || 'bg-gray-100 text-gray-800';
  };

  const Pagination = ({ 
    currentPage, 
    totalItems, 
    onPageChange 
  }: { 
    currentPage: number; 
    totalItems: number; 
    onPageChange: (page: number) => void;
  }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Home</Link>
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
          <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Project Consultations ({filteredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Messages ({filteredContacts.length})
            </button>
          </nav>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="pl-10 w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <select
                value={projectStatusFilter}
                onChange={(e) => setProjectStatusFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="quoted">Quoted</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Table */}
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading...</div>
            ) : paginatedProjects.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No projects found.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urgency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedProjects.map((project) => (
                        <tr key={project._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(project.createdAt)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{project.contactName || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{project.contactEmail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {project.type?.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                              {project.status?.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'New'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(project.urgency)}`}>
                              {project.urgency?.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Medium'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.budget || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button onClick={() => { setViewingProjectId(project._id); setProjectDetails(project); }} className="text-blue-600 hover:text-blue-900 mr-3">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button onClick={() => setShowDeleteConfirm(project._id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination currentPage={projectPage} totalItems={filteredProjects.length} onPageChange={setProjectPage} />
              </>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="pl-10 w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <select
                value={contactTypeFilter}
                onChange={(e) => setContactTypeFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="general">General</option>
                <option value="business">Business</option>
                <option value="support">Support</option>
                <option value="partnership">Partnership</option>
                <option value="careers">Careers</option>
              </select>
            </div>

            {/* Table */}
            {!contacts || contacts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No contacts found.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedContacts.map((contact) => (
                        <tr key={contact._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(contact.createdAt)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{contact.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContactTypeColor(contact.contactType)}`}>
                              {contact.contactType?.replace(/\b\w/g, (c) => c.toUpperCase()) || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.subject || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.message || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button onClick={() => setShowDeleteConfirm(`contact-${contact._id}`)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination currentPage={contactPage} totalItems={filteredContacts.length} onPageChange={setContactPage} />
              </>
            )}
          </div>
        )}
      </main>

      {/* Project Details Modal */}
      {viewingProjectId && projectDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <button onClick={() => setProjectDetails(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-500">Project Name</label><p className="text-gray-900">{projectDetails.name || 'N/A'}</p></div>
                <div><label className="text-sm font-medium text-gray-500">Type</label><p className="text-gray-900">{projectDetails.type?.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'N/A'}</p></div>
                <div><label className="text-sm font-medium text-gray-500">Status</label><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(projectDetails.status)}`}>{projectDetails.status?.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'New'}</span></div>
                <div><label className="text-sm font-medium text-gray-500">Urgency</label><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(projectDetails.urgency)}`}>{projectDetails.urgency?.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Medium'}</span></div>
                <div><label className="text-sm font-medium text-gray-500">Industry</label><p className="text-gray-900">{projectDetails.industry || 'N/A'}</p></div>
                <div><label className="text-sm font-medium text-gray-500">Budget</label><p className="text-gray-900">{projectDetails.budget || 'N/A'}</p></div>
              </div>
              <div><label className="text-sm font-medium text-gray-500">Description</label><p className="text-gray-900">{projectDetails.description || 'N/A'}</p></div>
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold mb-2">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-500">Name</label><p className="text-gray-900">{projectDetails.contactName || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-500">Email</label><p className="text-gray-900">{projectDetails.contactEmail || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-500">Phone</label><p className="text-gray-900">{projectDetails.contactPhone || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-500">Company</label><p className="text-gray-900">{projectDetails.company || 'N/A'}</p></div>
                </div>
              </div>
              <div className="text-sm text-gray-500">Created: {formatDate(projectDetails.createdAt)}</div>
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
              <p className="text-gray-600 mb-4">Are you sure you want to delete this? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={() => handleDelete(showDeleteConfirm)} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}