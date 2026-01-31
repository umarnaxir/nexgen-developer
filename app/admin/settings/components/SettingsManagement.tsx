"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { authenticate, updatePassword } from "@/services/authService";

interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "NexGen",
  tagline: "Building Digital Excellence",
  logo: "/images/logo.png",
  favicon: "/favicon.ico",
  contact: {
    email: "hello@nexgen.dev",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94102",
  },
  social: {
    facebook: "https://facebook.com/nexgen",
    twitter: "https://twitter.com/nexgen",
    instagram: "https://instagram.com/nexgen",
    linkedin: "https://linkedin.com/company/nexgen",
    youtube: "",
  },
};

const SETTINGS_STORAGE_KEY = "nexgen_settings";

export default function SettingsManagement() {
  const { user: currentUser, hasPermission, canAccessAdmin } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    if (typeof window === "undefined") return;

    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  };

  const handleChange = (section: keyof SiteSettings, field: string, value: string) => {
    setSettings((prev) => {
      if (typeof prev[section] === "object") {
        return {
          ...prev,
          [section]: {
            ...(prev[section] as object),
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [section]: value,
      };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    setHasChanges(false);
    toast.success("Settings saved successfully");
  };

  const canManageSettings = hasPermission("manage_settings");

  const handleChangeMyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.username) return;
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    if (passwordForm.newPassword.length < 4) {
      toast.error("New password must be at least 4 characters");
      return;
    }
    const result = authenticate({ username: currentUser.username, password: passwordForm.currentPassword });
    if (!result.success) {
      toast.error("Current password is incorrect");
      return;
    }
    setIsChangingPassword(true);
    const ok = updatePassword(currentUser.username, passwordForm.newPassword);
    setIsChangingPassword(false);
    if (ok) {
      toast.success("Your password has been updated");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage website configuration</p>
        </div>
        {canManageSettings && hasChanges && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        )}
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          General Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", "", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => handleChange("tagline", "", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              type="text"
              value={settings.logo}
              onChange={(e) => handleChange("logo", "", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Favicon URL
            </label>
            <input
              type="text"
              value={settings.favicon}
              onChange={(e) => handleChange("favicon", "", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </span>
            </label>
            <input
              type="email"
              value={settings.contact.email}
              onChange={(e) => handleChange("contact", "email", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone
              </span>
            </label>
            <input
              type="text"
              value={settings.contact.phone}
              onChange={(e) => handleChange("contact", "phone", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Address
              </span>
            </label>
            <input
              type="text"
              value={settings.contact.address}
              onChange={(e) => handleChange("contact", "address", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Social Media Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Facebook className="w-4 h-4" /> Facebook
              </span>
            </label>
            <input
              type="url"
              value={settings.social.facebook}
              onChange={(e) => handleChange("social", "facebook", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Twitter className="w-4 h-4" /> Twitter / X
              </span>
            </label>
            <input
              type="url"
              value={settings.social.twitter}
              onChange={(e) => handleChange("social", "twitter", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Instagram
              </span>
            </label>
            <input
              type="url"
              value={settings.social.instagram}
              onChange={(e) => handleChange("social", "instagram", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </span>
            </label>
            <input
              type="url"
              value={settings.social.linkedin}
              onChange={(e) => handleChange("social", "linkedin", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
              placeholder="https://linkedin.com/company/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <Youtube className="w-4 h-4" /> YouTube
              </span>
            </label>
            <input
              type="url"
              value={settings.social.youtube}
              onChange={(e) => handleChange("social", "youtube", e.target.value)}
              disabled={!canManageSettings}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-gray-50 placeholder:text-gray-500"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </div>

      {/* Change my password (any admin user) */}
      {currentUser && canAccessAdmin() && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Change my password
          </h2>
          <form onSubmit={handleChangeMyPassword} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-black"
                  aria-label={showCurrentPassword ? "Hide" : "Show"}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Enter new password"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-black"
                  aria-label={showNewPassword ? "Hide" : "Show"}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Confirm new password"
                required
                minLength={4}
              />
            </div>
            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isChangingPassword ? "Updating…" : "Update my password"}
            </button>
          </form>
        </div>
      )}

      {/* Save Button (Mobile) */}
      {canManageSettings && hasChanges && (
        <div className="sm:hidden">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      )}

      {/* Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">
          Note About Settings
        </h3>
        <p className="text-yellow-800">
          These settings are stored in local storage for demonstration purposes.
          In a production environment, you would integrate these with your backend
          to persist changes across all users and sessions.
        </p>
      </div>
    </div>
  );
}
