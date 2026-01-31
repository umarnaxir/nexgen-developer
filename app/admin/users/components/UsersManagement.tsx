"use client";

import { useState, useEffect } from "react";
import { 
  Edit2, 
  Trash2, 
  Search,
  UserPlus,
  Shield,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { User, UserRole, getRoleDisplayName, getRoleBadgeColor } from "@/types/auth";
import { getUsers, createUser, updateUser, deleteUser, getPasswordForUser, updatePassword, PermissionError } from "@/services/authService";
import { getCreatableRoles, getAssignableRoles, canDeleteUser as rbacCanDeleteUser } from "@/lib/rbac";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/ui/Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function UsersManagement() {
  const { user: currentUser, hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showViewPassword, setShowViewPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    role: UserRole.CLIENT,
    isActive: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  // Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const loadedUsers = getUsers();
    setUsers(loadedUsers);
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle create user
  const handleCreateUser = () => {
    if (!formData.username || !formData.email || !formData.name || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const existingUser = users.find(u => u.username.toLowerCase() === formData.username.toLowerCase());
    if (existingUser) {
      toast.error("Username already exists");
      return;
    }

    try {
      createUser(
        {
          username: formData.username,
          email: formData.email,
          name: formData.name,
          role: formData.role,
          isActive: formData.isActive,
        },
        formData.password,
        currentUser ?? undefined
      );
      loadUsers();
      setIsCreateModalOpen(false);
      resetForm();
      toast.success("User created successfully");
    } catch (err) {
      if (err instanceof PermissionError) {
        toast.error(err.message);
      } else {
        toast.error("Failed to create user");
      }
    }
  };

  // Handle edit user
  const handleEditUser = () => {
    if (!selectedUser) return;

    try {
      const updated = updateUser(
        selectedUser.id,
        {
          username: formData.username,
          email: formData.email,
          name: formData.name,
          role: formData.role,
          isActive: formData.isActive,
        },
        currentUser ?? undefined
      );
      if (updated) {
        loadUsers();
        setIsEditModalOpen(false);
        setSelectedUser(null);
        resetForm();
        toast.success("User updated successfully");
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      if (err instanceof PermissionError) {
        toast.error(err.message);
      } else {
        toast.error("Failed to update user");
      }
    }
  };

  // Handle delete user
  const handleDeleteUser = () => {
    if (!selectedUser) return;

    if (selectedUser.id === currentUser?.id) {
      toast.error("You cannot delete your own account");
      return;
    }

    try {
      const deleted = deleteUser(selectedUser.id, currentUser ?? undefined);
      if (deleted) {
        loadUsers();
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
        toast.success("User deleted successfully");
      } else {
        toast.error("Cannot delete this user. They may be the last Super Admin.");
      }
    } catch (err) {
      if (err instanceof PermissionError) {
        toast.error(err.message);
      } else {
        toast.error("Cannot delete this user.");
      }
    }
  };

  // Open edit modal
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      name: user.name,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Open view modal
  const openViewModal = (user: User) => {
    setViewUser(user);
    setShowViewPassword(false);
    setIsViewModalOpen(true);
  };

  // Open change password modal (for another user)
  const openChangePasswordModal = (user: User) => {
    setSelectedUser(user);
    setPasswordForm({ newPassword: "", confirmPassword: "" });
    setIsChangePasswordModalOpen(true);
    setIsViewModalOpen(false);
  };

  // Handle change password (Super Admin changing another user's password)
  const handleChangeUserPassword = () => {
    if (!selectedUser) return;
    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    const ok = updatePassword(selectedUser.username, passwordForm.newPassword);
    if (ok) {
      toast.success(`Password updated for ${selectedUser.name}`);
      setIsChangePasswordModalOpen(false);
      setSelectedUser(null);
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } else {
      toast.error("Failed to update password");
    }
  };

  // Reset form
  const resetForm = () => {
    setShowPassword(false);
    setFormData({
      username: "",
      email: "",
      name: "",
      password: "",
      role: UserRole.CLIENT,
      isActive: true,
    });
  };

  const canManageUsers = hasPermission("manage_users");
  const canAssignRoles = hasPermission("assign_roles");
  const creatableRoles = currentUser ? getCreatableRoles(currentUser.role) : [];
  const assignableRoles = currentUser ? getAssignableRoles(currentUser.role) : [];
  const canDeleteUserFor = (target: User) =>
    currentUser && target.id !== currentUser.id && rbacCanDeleteUser(currentUser.role, target.role);
  const isSuperAdmin = currentUser?.role === UserRole.SUPER_ADMIN;
  const canViewUsers = hasPermission("view_users") || canManageUsers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        {canManageUsers && (
          <button
            onClick={() => {
              resetForm();
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                      <Shield className="w-3 h-3" />
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      user.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canViewUsers && (
                        <button
                          onClick={() => openViewModal(user)}
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="View user details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {canManageUsers && (
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {isSuperAdmin && (
                        <button
                          onClick={() => openChangePasswordModal(user)}
                          className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="Change password"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                      )}
                      {canDeleteUserFor(user) && (
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete user"
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

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Create/Edit User Modal */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedUser(null);
          resetForm();
        }}
        title={isCreateModalOpen ? "Create New User" : "Edit User"}
        size="md"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          isCreateModalOpen ? handleCreateUser() : handleEditUser();
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
              placeholder="Enter email address"
              required
            />
          </div>

          {isCreateModalOpen && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-gray-500"
                  placeholder="Enter password"
                  required={isCreateModalOpen}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-black transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {(canAssignRoles || isCreateModalOpen) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="z-[10001]">
                  {(isCreateModalOpen
                    ? creatableRoles
                    : [...assignableRoles, ...(assignableRoles.includes(formData.role) ? [] : [formData.role])]
                  ).map((role) => (
                    <SelectItem key={role} value={role}>
                      {getRoleDisplayName(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Active account
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsEditModalOpen(false);
                setSelectedUser(null);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isCreateModalOpen ? "Create User" : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title=""
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{selectedUser?.name}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* View User Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewUser(null);
        }}
        title="User Details"
        size="md"
      >
        {viewUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {viewUser.avatar ? (
                  <img src={viewUser.avatar} alt={viewUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-600 text-xl font-medium">{viewUser.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{viewUser.name}</p>
                <p className="text-sm text-gray-500">@{viewUser.username}</p>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <dt className="text-gray-500 font-medium">Email</dt>
                <dd className="text-gray-900">{viewUser.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Username</dt>
                <dd className="text-gray-900">{viewUser.username}</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Role</dt>
                <dd>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(viewUser.role)}`}>
                    <Shield className="w-3 h-3" />
                    {getRoleDisplayName(viewUser.role)}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Status</dt>
                <dd>
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${viewUser.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {viewUser.isActive ? "Active" : "Inactive"}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Created</dt>
                <dd className="text-gray-900">{new Date(viewUser.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Last updated</dt>
                <dd className="text-gray-900">{new Date(viewUser.updatedAt).toLocaleString()}</dd>
              </div>
              {isSuperAdmin && (() => {
                const storedPassword = getPasswordForUser(viewUser.username, currentUser ?? undefined);
                return (
                  <div>
                    <dt className="text-gray-500 font-medium">Password (Super Admin only)</dt>
                    <dd className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-gray-900 font-mono text-sm">
                        {storedPassword ? (showViewPassword ? storedPassword : "••••••••") : "—"}
                      </code>
                      {storedPassword && (
                        <button
                          type="button"
                          onClick={() => setShowViewPassword(!showViewPassword)}
                          className="p-2 text-gray-600 hover:text-black rounded-lg transition-colors"
                          aria-label={showViewPassword ? "Hide password" : "Show password"}
                        >
                          {showViewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </dd>
                  </div>
                );
              })()}
            </dl>
            {isSuperAdmin && (
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => openChangePasswordModal(viewUser)}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  Change password
                </button>
              </div>
            )}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => { setIsViewModalOpen(false); setViewUser(null); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Change User Password Modal (Super Admin) */}
      <Modal
        isOpen={isChangePasswordModalOpen}
        onClose={() => {
          setIsChangePasswordModalOpen(false);
          setSelectedUser(null);
          setPasswordForm({ newPassword: "", confirmPassword: "" });
        }}
        title={selectedUser ? `Change password for ${selectedUser.name}` : "Change password"}
        size="md"
      >
        {selectedUser && (
          <form onSubmit={(e) => { e.preventDefault(); handleChangeUserPassword(); }} className="space-y-4">
            <p className="text-sm text-gray-600">Set a new password for <span className="font-medium text-gray-900">{selectedUser.name}</span> (@{selectedUser.username}).</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Enter new password"
                required
                minLength={4}
              />
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
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => { setIsChangePasswordModalOpen(false); setSelectedUser(null); setPasswordForm({ newPassword: "", confirmPassword: "" }); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Update password
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
