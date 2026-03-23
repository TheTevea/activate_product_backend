// Mock authentication context and utilities
import { AdminUser, AuthSession, UserRole } from './types'

// Permission definitions
const PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ['*'],
  admin: ['users:read', 'users:write', 'products:read', 'products:write', 'orders:read', 'orders:write', 'payments:read', 'jobs:read', 'jobs:write', 'logs:read', 'settings:read'],
  operator: ['users:read', 'orders:read', 'orders:write', 'jobs:read', 'jobs:write', 'logs:read'],
  support: ['users:read', 'orders:read', 'orders:write', 'logs:read'],
  finance: ['payments:read', 'orders:read', 'logs:read'],
}

export function canAccess(role: UserRole, permission: string): boolean {
  const rolePerms = PERMISSIONS[role]
  if (!rolePerms) return false
  if (rolePerms.includes('*')) return true
  return rolePerms.includes(permission)
}

export function canAccessModule(role: UserRole, module: 'users' | 'products' | 'orders' | 'payments' | 'jobs' | 'settings' | 'analytics'): boolean {
  const modulePermissions: Record<string, string> = {
    users: 'users:read',
    products: 'products:read',
    orders: 'orders:read',
    payments: 'payments:read',
    jobs: 'jobs:read',
    settings: 'settings:read',
    analytics: 'logs:read',
  }
  return canAccess(role, modulePermissions[module])
}

// Mock current user
export const mockCurrentUser: AdminUser = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'super_admin',
  createdAt: new Date('2025-01-01'),
  lastLogin: new Date(),
  isActive: true,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
}

// Mock auth session
export const mockAuthSession: AuthSession = {
  user: mockCurrentUser,
  token: 'mock_token_xyz123',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
}
