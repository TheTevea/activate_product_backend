// Role-Based Access Control
export type UserRole = 'super_admin' | 'admin' | 'operator' | 'support' | 'finance'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
}

export interface AuthSession {
  user: AdminUser
  token: string
  expiresAt: Date
}

// User Management
export interface TelegramUser {
  id: string
  telegramId: number
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  status: 'active' | 'blocked' | 'inactive'
  totalOrders: number
  successfulOrders: number
  failedOrders: number
  totalSpending: number
  registeredAt: Date
  lastActivityAt?: Date
  internalNotes?: string
}

// Product Management
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  currency: string
  durationDays: number
  activationType: 'auto' | 'manual'
  requiredFields: string[]
  isActive: boolean
  salesCount: number
  totalRevenue: number
  successRate: number
  failureRate: number
  createdAt: Date
  updatedAt: Date
}

// Order Management
export type OrderStatus = 'pending_payment' | 'paid' | 'queued' | 'processing' | 'activated' | 'failed' | 'manual_review' | 'cancelled'

export interface Order {
  id: string
  userId: string
  productId: string
  targetUrl: string
  inputData: Record<string, any>
  status: OrderStatus
  paymentStatus: 'pending' | 'paid' | 'failed'
  activationStatus: 'pending' | 'processing' | 'success' | 'failed' | 'manual_review'
  amount: number
  currency: string
  adminNotes?: string
  supportNotes?: string
  retryCount: number
  createdAt: Date
  updatedAt: Date
  activatedAt?: Date
}

// Payment Management
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'card' | 'wallet' | 'crypto' | 'manual'

export interface Payment {
  id: string
  orderId: string
  userId: string
  method: PaymentMethod
  amount: number
  currency: string
  status: PaymentStatus
  transactionReference: string
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}



// Audit & Logs
export interface AuditLog {
  id: string
  actorId: string
  action: string
  targetType: 'user' | 'product' | 'order' | 'payment'
  targetId: string
  metadata: Record<string, any>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

export interface SystemAlert {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  resolvedAt?: Date
  createdAt: Date
}

// Reports
export interface Report {
  id: string
  title: string
  type: 'revenue' | 'orders' | 'activation' | 'users' | 'payments'
  generatedAt: Date
  generatedBy: string
  period: 'daily' | 'weekly' | 'monthly'
  startDate: Date
  endDate: Date
  metrics: Record<string, any>
  description: string
}

// User Feedback
export interface UserFeedback {
  id: string
  userId?: string
  email: string
  feedbackType: 'bug' | 'feature' | 'general' | 'performance'
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high'
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  attachmentUrl?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  resolvedBy?: string
  internalNotes?: string
}

// System Logs
export interface SystemLog {
  id: string
  actor: string
  action: string
  targetType: 'user' | 'order' | 'product' | 'payment' | 'setting'
  targetId: string
  metadata: Record<string, any>
  ipAddress?: string
  status: 'success' | 'failed'
  timestamp: Date
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number
  totalActiveProducts: number
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  activatedOrders: number
  failedOrders: number
  manualReviewOrders: number
  todayRevenue: number
  monthRevenue: number
  failedActivationCount: number
  paymentPendingCount: number
  recentAlerts: SystemAlert[]
}

// Coupon Management
export type CouponType = 'percentage' | 'fixed'
export type CouponStatus = 'active' | 'inactive' | 'expired'

export interface Coupon {
  id: string
  code: string
  type: CouponType
  value: number
  description: string
  maxUsage: number
  currentUsage: number
  associatedProducts: string[]
  minOrderValue?: number
  maxDiscount?: number
  expiryDate: Date
  status: CouponStatus
  createdAt: Date
  updatedAt: Date
  createdBy: string
  usageHistory?: CouponUsage[]
}

export interface CouponUsage {
  id: string
  couponId: string
  orderId: string
  userId: string
  discountAmount: number
  usedAt: Date
}

// License Tokens
export type LicenseTokenStatus = 'paid_not_activated' | 'activated' | 'revoked'

export interface LicenseToken {
  id: string
  tokenCode: string
  userId: string
  productId: string
  orderId: string
  status: LicenseTokenStatus
  createdAt: Date
  activatedAt?: Date
  boundDevice?: string
  boundAccount?: string
  verifyAttemptCount: number
  lastVerifyAttempt?: Date
}

// Activation Logs
export type ActivationAttemptResult = 'success' | 'failed'

export interface ActivationLog {
  id: string
  tokenId: string
  tokenCode: string
  userId: string
  productId: string
  result: ActivationAttemptResult
  failureReason?: string
  ipAddress: string
  deviceInfo: string
  attemptTime: Date
  location?: string
  requestSource?: string
  appVersion?: string
}
