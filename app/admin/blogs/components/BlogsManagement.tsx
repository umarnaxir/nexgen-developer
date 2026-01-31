"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Eye,
  EyeOff,
  Image as ImageIcon,
  X,
  FileText,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Blog, getBlogs, createBlog, updateBlog, deleteBlog, generateSlug, initializeBlogs } from "@/services/blogsService";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/ui/Modal";

export default function BlogsManagement() {
  const { user, hasPermission } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published",
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  // Load blogs
  useEffect(() => {
    initializeBlogs();
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const loadedBlogs = getBlogs();
    setBlogs(loadedBlogs);
  };

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || blog.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle title change (auto-generate slug)
  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      seo: {
        ...formData.seo,
        metaTitle: title ? `${title} | NexGen` : "",
      },
    });
  };

  // Handle create/update blog
  const handleSaveBlog = () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    const blogData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      excerpt: formData.excerpt,
      content: formData.content,
      featuredImage: formData.featuredImage,
      category: formData.category || "Uncategorized",
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      author: {
        name: user?.name || "Admin",
        avatar: user?.avatar,
      },
      seo: {
        metaTitle: formData.seo.metaTitle || `${formData.title} | NexGen`,
        metaDescription: formData.seo.metaDescription || formData.excerpt,
        metaKeywords: formData.seo.metaKeywords.split(",").map(kw => kw.trim()).filter(Boolean),
      },
      status: formData.status,
      publishedAt: formData.status === "published" ? new Date().toISOString() : undefined,
    };

    if (selectedBlog) {
      // Update existing blog
      const updated = updateBlog(selectedBlog.id, blogData);
      if (updated) {
        toast.success("Blog updated successfully");
      } else {
        toast.error("Failed to update blog");
        return;
      }
    } else {
      // Create new blog
      createBlog(blogData);
      toast.success("Blog created successfully");
    }

    loadBlogs();
    closeEditor();
  };

  // Handle delete blog
  const handleDeleteBlog = () => {
    if (!selectedBlog) return;

    const deleted = deleteBlog(selectedBlog.id);
    if (deleted) {
      loadBlogs();
      setIsDeleteModalOpen(false);
      setSelectedBlog(null);
      toast.success("Blog deleted successfully");
    } else {
      toast.error("Failed to delete blog");
    }
  };

  // Open editor for new blog
  const openNewBlogEditor = () => {
    setSelectedBlog(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "",
      tags: "",
      status: "draft",
      seo: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      },
    });
    setIsEditorOpen(true);
  };

  // Open editor for existing blog
  const openEditBlogEditor = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: blog.category,
      tags: blog.tags.join(", "),
      status: blog.status,
      seo: {
        metaTitle: blog.seo.metaTitle,
        metaDescription: blog.seo.metaDescription,
        metaKeywords: blog.seo.metaKeywords.join(", "),
      },
    });
    setIsEditorOpen(true);
  };

  // Close editor
  const closeEditor = () => {
    setIsEditorOpen(false);
    setSelectedBlog(null);
  };

  // Open delete modal
  const openDeleteModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const canManageBlogs = hasPermission("manage_blogs");
  const canDeleteBlogs = hasPermission("delete_blogs");

  if (isEditorOpen) {
    return (
      <div className="space-y-6">
        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedBlog ? "Edit Blog" : "Create New Blog"}
            </h1>
            <p className="text-gray-600">
              {selectedBlog ? "Update your blog post" : "Write a new blog post"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={closeEditor}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, status: "draft" });
                handleSaveBlog();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, status: "published" });
                handleSaveBlog();
              }}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {selectedBlog?.status === "published" ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Enter blog title"
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">/blogs/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                  placeholder="blog-url-slug"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Brief description of the blog post..."
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 font-mono text-sm"
                placeholder="Write your blog content here... (HTML supported)"
              />
              <p className="mt-2 text-sm text-gray-500">
                Supports HTML formatting (h2, p, ul, li, strong, em, etc.)
              </p>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.seo.metaTitle}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      seo: { ...formData.seo, metaTitle: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                    placeholder="SEO title (appears in search results)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.seo.metaDescription}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      seo: { ...formData.seo, metaDescription: e.target.value } 
                    })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                    placeholder="SEO description (appears in search results)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.seo.metaKeywords}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      seo: { ...formData.seo, metaKeywords: e.target.value } 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Featured Image</h3>
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, featuredImage: "" })}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Enter image URL</p>
                </div>
              )}
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full mt-3 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="/images/blog/image.jpg"
              />
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                placeholder="Technology, Design, etc."
              />
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                placeholder="tag1, tag2, tag3"
              />
              <p className="mt-2 text-xs text-gray-500">Separate tags with commas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs Management</h1>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        {canManageBlogs && (
          <button
            onClick={openNewBlogEditor}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Blog
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Blogs List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-xs">
                          {blog.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {blog.status === "published" ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {blog.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {blog.status === "published" && (
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="View blog"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      {canManageBlogs && (
                        <button
                          onClick={() => openEditBlogEditor(blog)}
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit blog"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {canDeleteBlogs && (
                        <button
                          onClick={() => openDeleteModal(blog)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No blogs found</p>
            {canManageBlogs && (
              <button
                onClick={openNewBlogEditor}
                className="mt-4 text-black hover:underline font-medium"
              >
                Create your first blog
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBlog(null);
        }}
        title=""
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Blog</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "<span className="font-semibold">{selectedBlog?.title}</span>"?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedBlog(null);
              }}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBlog}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
