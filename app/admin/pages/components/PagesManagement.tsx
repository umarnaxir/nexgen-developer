"use client";

import { useState, useEffect } from "react";
import { 
  Edit2, 
  Eye,
  FileText,
  Home,
  Info,
  Shield,
  ScrollText,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { PageContent, PageSection, getPages, updatePage, initializePages } from "@/services/pagesService";
import { useAuth } from "@/contexts/AuthContext";

const PAGE_ICONS: Record<string, React.ElementType> = {
  home: Home,
  about: Info,
  privacy: Shield,
  terms: ScrollText,
};

export default function PagesManagement() {
  const { hasPermission } = useAuth();
  const [pages, setPages] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<PageContent | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Load pages
  useEffect(() => {
    initializePages();
    loadPages();
  }, []);

  const loadPages = () => {
    const loadedPages = getPages();
    setPages(loadedPages);
  };

  // Open page editor
  const openPageEditor = (page: PageContent) => {
    setSelectedPage(page);
    setEditedContent(JSON.parse(JSON.stringify(page))); // Deep copy
    setIsEditing(true);
    // Expand all sections by default
    const expanded: Record<string, boolean> = {};
    page.sections.forEach((section) => {
      expanded[section.id] = true;
    });
    setExpandedSections(expanded);
  };

  // Close editor
  const closeEditor = () => {
    setSelectedPage(null);
    setEditedContent(null);
    setIsEditing(false);
  };

  // Save changes
  const handleSave = () => {
    if (!editedContent) return;

    const updated = updatePage(editedContent.id, editedContent);
    if (updated) {
      loadPages();
      toast.success("Page updated successfully");
      closeEditor();
    } else {
      toast.error("Failed to update page");
    }
  };

  // Update section content
  const updateSectionContent = (sectionId: string, updates: Partial<PageSection>) => {
    if (!editedContent) return;

    const updatedSections = editedContent.sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section
    );

    setEditedContent({ ...editedContent, sections: updatedSections });
  };

  // Toggle section visibility
  const toggleSectionVisibility = (sectionId: string) => {
    if (!editedContent) return;

    const section = editedContent.sections.find((s) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, { visible: !section.visible });
    }
  };

  // Toggle section expand/collapse
  const toggleSectionExpand = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const canManagePages = hasPermission("manage_pages");

  // Editor view
  if (isEditing && editedContent) {
    return (
      <div className="space-y-6">
        {/* Editor Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={closeEditor}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit {editedContent.title}
              </h1>
              <p className="text-gray-600">
                Customize page content and sections
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${editedContent.slug === "home" ? "" : editedContent.slug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={editedContent.seo.metaTitle}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    seo: { ...editedContent.seo, metaTitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <input
                type="text"
                value={editedContent.seo.metaDescription}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    seo: { ...editedContent.seo, metaDescription: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Page Sections</h3>
          
          {editedContent.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div
                key={section.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  !section.visible ? "opacity-60" : ""
                }`}
              >
                {/* Section Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleSectionExpand(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {section.title || `${section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section`}
                      </p>
                      <p className="text-sm text-gray-500">Type: {section.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSectionVisibility(section.id);
                      }}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        section.visible
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {section.visible ? "Visible" : "Hidden"}
                    </button>
                    {expandedSections[section.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Section Content Editor */}
                {expandedSections[section.id] && (
                  <div className="p-4 border-t border-gray-200 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title || ""}
                        onChange={(e) =>
                          updateSectionContent(section.id, { title: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                        placeholder="Enter section title"
                      />
                    </div>

                    {/* Subtitle (for hero, features, cta) */}
                    {["hero", "features", "cta", "stats"].includes(section.type) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={section.subtitle || ""}
                          onChange={(e) =>
                            updateSectionContent(section.id, { subtitle: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                          placeholder="Enter subtitle"
                        />
                      </div>
                    )}

                    {/* Content (for text sections) */}
                    {section.type === "text" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content (HTML)
                        </label>
                        <textarea
                          value={section.content || ""}
                          onChange={(e) =>
                            updateSectionContent(section.id, { content: e.target.value })
                          }
                          rows={10}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500 font-mono text-sm"
                          placeholder="Enter HTML content..."
                        />
                      </div>
                    )}

                    {/* Items (for features, stats, values) */}
                    {section.items && section.items.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Items
                        </label>
                        <div className="space-y-3">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={item.id}
                              className="p-3 bg-gray-50 rounded-lg space-y-2"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={item.title || ""}
                                  onChange={(e) => {
                                    const newItems = [...(section.items || [])];
                                    newItems[itemIndex] = { ...item, title: e.target.value };
                                    updateSectionContent(section.id, { items: newItems });
                                  }}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
                                  placeholder="Title"
                                />
                                {item.value !== undefined && (
                                  <input
                                    type="text"
                                    value={item.value || ""}
                                    onChange={(e) => {
                                      const newItems = [...(section.items || [])];
                                      newItems[itemIndex] = { ...item, value: e.target.value };
                                      updateSectionContent(section.id, { items: newItems });
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
                                    placeholder="Value"
                                  />
                                )}
                              </div>
                              {item.description !== undefined && (
                                <textarea
                                  value={item.description || ""}
                                  onChange={(e) => {
                                    const newItems = [...(section.items || [])];
                                    newItems[itemIndex] = { ...item, description: e.target.value };
                                    updateSectionContent(section.id, { items: newItems });
                                  }}
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
                                  placeholder="Description"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }

  // Pages list view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pages Management</h1>
        <p className="text-gray-600">Edit and manage website page content</p>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page) => {
          const Icon = PAGE_ICONS[page.id] || FileText;
          return (
            <div
              key={page.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        /{page.slug === "home" ? "" : page.slug}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <span>{page.sections.length} sections</span>
                  <span>•</span>
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={`/${page.slug === "home" ? "" : page.slug}`}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  {canManagePages && (
                    <button
                      onClick={() => openPageEditor(page)}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          About Page Management
        </h3>
        <p className="text-blue-800">
          Edit page content, SEO settings, and manage sections for each page. 
          Changes are saved to local storage and will be reflected on the website.
          For production use, integrate with a database to persist changes across sessions.
        </p>
      </div>
    </div>
  );
}
