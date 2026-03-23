# Telegram Mini App Admin Dashboard

A comprehensive, production-ready admin dashboard for managing digital subscription services through a Telegram Mini App. Built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

This dashboard is designed for internal admin, operator, support, and finance staff to manage users, products, orders, and payments. It features a dark cyberpunk aesthetic with orange accents, role-based access control, and comprehensive analytics.

## Architecture

### Folder Structure

```
/app
  /page.tsx                 # Dashboard overview
  /users/page.tsx          # User management module
  /products/page.tsx       # Product management module
  /orders/page.tsx         # Order management module
  /payments/page.tsx       # Payment management module
  /analytics/page.tsx      # Analytics and reports
  /reports/page.tsx        # Reports generation and management
  /feedback/page.tsx       # User feedback and issues
  /logs/page.tsx           # Audit logs and system activity
  /settings/page.tsx       # System settings
  /layout.tsx              # Root layout

/components
  /dashboard
    /layout.tsx            # Main dashboard layout with sidebar
    /stat-card.tsx         # KPI statistics card component
    /status-badge.tsx      # Status badge for order/payment states
    /data-table.tsx        # Reusable data table with search and pagination
  /ui                      # shadcn/ui components

/lib
  /types.ts               # TypeScript types for all entities
  /auth.ts                # Authentication utilities and permissions
  /mock-data.ts           # Mock data for development
  /utils.ts               # Utility functions

/public                   # Static assets
```

## Key Features

### 1. Multi-Tab Workspace (Chrome-Like Navigation)

The dashboard features a professional multi-tab workspace similar to enterprise ERP systems and web browsers:

**Tab Management:**
- Open up to 8 concurrent tabs for different pages/details
- Each tab shows its content independently - no page replacement
- Switch between tabs instantly without losing state
- Tabs persist across page refreshes via localStorage
- Visual tab counter showing current/max (e.g., "3/8")

**Tab Operations:**
- **Click tab**: Switch to that tab instantly
- **Close button (X)**: Close individual tabs
- **Right-click context menu**: Reload tab, close other tabs, or close current tab
- **Close All button**: Clear all tabs at once
- **Scroll arrows**: Navigate through tabs when there are 4+

**Keyboard Shortcuts:**
- `Ctrl/Cmd+W` - Close current tab
- `Ctrl/Cmd+Tab` - Switch to next tab
- `Ctrl/Cmd+Shift+Tab` - Switch to previous tab
- `Ctrl/Cmd+Shift+W` - Close all tabs

**How It Works:**
1. Navigate to any page (Orders, Users, Products, etc.)
2. Click "View" on any item to open its details in a new tab
3. The details page opens as a new tab (doesn't replace current page)
4. Click any tab to switch between them
5. All tabs remain open until explicitly closed
6. Refresh the page - all tabs are restored automatically

**Example Workflow:**
- Open Orders page (Tab 1)
- Click "View" on Order #123 (Tab 2 opens)
- Click "View" on the customer (Tab 3 opens)
- Switch back to Tab 1 to see orders list
- Click "View" on Order #456 (Tab 4 opens)
- All 4 tabs are available for instant switching

### 2. Authentication & Role-Based Access Control

**Supported Roles:**
- `super_admin` - Full system access
- `admin` - Almost full access except sensitive system settings
- `operator` - Manage orders
- `support` - View users and orders, update support notes
- `finance` - View payments, reconcile payment status, export reports

**Permission System:**
- Implements granular permission checking via `canAccess()` and `canAccessModule()` functions
- All routes protected based on user role
- Audit trail for critical actions

### 2. Dashboard Overview

KPI Cards displaying:
- Total users
- Active products
- Total/pending/processing/activated/failed/manual review orders
- Today and monthly revenue
- System health metrics

Charts and visualizations:
- Order status distribution
- Revenue trends
- Activation success vs failure rates
- Top selling products

### 3. User Management

**Features:**
- List all Telegram users with search and filtering
- View user profiles with Telegram info
- Display order history and total spending
- Block/unblock users
- Add internal notes
- Export user lists
- Status tracking (active, blocked, inactive)

**User Model:**
```typescript
- telegramId: number
- username, firstName, lastName
- status: 'active' | 'blocked' | 'inactive'
- totalOrders, successfulOrders, failedOrders
- totalSpending, registeredAt, lastActivityAt
- internalNotes
```

### 4. Product Management

**Features:**
- Create, edit, activate/deactivate products
- Track sales count and revenue per product
- Monitor success and failure rates
- Filter by status, search by name
- Display product performance metrics

**Product Model:**
```typescript
- name, slug, description
- price, currency, durationDays
- activationType: 'auto' | 'manual'
- requiredFields: string[]
- isActive: boolean
- salesCount, totalRevenue, successRate, failureRate
```

### 5. Order Management

**Features:**
- List all orders with advanced filtering and search
- Filter by status, date range, product
- View detailed order information
- Order actions: mark paid, retry, move to manual review, etc.
- Admin and support notes on orders
- Export orders to CSV
- Retry history tracking

**Order Statuses:**
- pending_payment, paid, queued, processing, activated, failed, manual_review, cancelled

**Order Model:**
```typescript
- orderId, userId, productId
- targetUrl, inputData
- status, paymentStatus, activationStatus
- amount, currency, retryCount
- adminNotes, supportNotes, timestamps
```

### 6. Payment Management

**Features:**
- Reconcile payments manually or automatically
- Filter by status, method, date range
- Confirm/reject payments
- Link payments to orders
- Finance reports and revenue summaries
- Payment history per user
- Export payment reports

**Payment Model:**
```typescript
- orderId, userId
- method: 'card' | 'wallet' | 'crypto' | 'manual'
- amount, currency
- status: 'pending' | 'paid' | 'failed' | 'refunded'
- transactionReference, paidAt, createdAt
```

### 7. Analytics & Reports

**Metrics Displayed:**
- Success rate percentage
- Failure rate percentage
- Conversion rate
- Average order value
- Revenue by product (with percentages)
- Daily revenue trends
- Order status distribution
- Top performing customers
- Error distribution analysis
- Monthly/weekly/daily revenue summaries

**Reports Module Features:**
- View all generated reports (daily, weekly, monthly)
- Report templates for revenue, orders, activation, users, payments
- Download reports in multiple formats
- Scheduled reports with email delivery
- Report metrics preview
- Filter by report type and period

**Report Model:**
```typescript
- title, type: 'revenue' | 'orders' | 'activation' | 'users' | 'payments'
- period: 'daily' | 'weekly' | 'monthly'
- startDate, endDate
- metrics: Record<string, number | string>
- generatedBy, generatedAt
```

### 8. User Feedback & Issues

**Features:**
- Track bug reports, feature requests, and general feedback
- Priority levels: low, medium, high
- Status tracking: new, in_progress, resolved, closed
- Filter by feedback type and status
- Add internal notes for team communication
- View feedback statistics by type and priority
- Categorize and analyze feedback trends

**Feedback Model:**
```typescript
- email, feedbackType: 'bug' | 'feature' | 'general' | 'performance'
- subject, message
- priority: 'low' | 'medium' | 'high'
- status: 'new' | 'in_progress' | 'resolved' | 'closed'
- internalNotes, resolvedBy, resolvedAt
```

### 9. Audit Logs & System Activity

**Features:**
- Complete audit trail of all admin actions
- Track actor, action, target, timestamp
- Filter by action type, actor, target type, status
- View detailed metadata for each action
- Export logs for compliance and analysis
- Dashboard showing most active admins
- Action breakdown statistics
- IP address tracking for security

**Log Model:**
```typescript
- actor: admin email
- action: UPDATE_ORDER_STATUS, RETRY_ACTIVATION_JOB, etc.
- targetType: 'user' | 'order' | 'product' | 'payment' | 'setting'
- targetId: string
- metadata: Record<string, any>
- status: 'success' | 'failed'
- timestamp, ipAddress
```

### 10. System Settings

**Configuration Areas:**
- General application settings
- Payment provider configuration
- Activation and retry settings
- Security settings (2FA, audit logging, session timeout)
- Admin user roles management
- Maintenance mode

### 11. Dashboard Layout

**Components:**
- Fixed sidebar with collapsible navigation
- Top navigation bar with user info, notifications, and actions
- Breadcrumb navigation showing current page
- Mobile-responsive design
- Dark theme with orange accent color

## Data Models

### Core Types (see `/lib/types.ts`)

```typescript
// User Management
TelegramUser - Telegram user with order history and spending
AdminUser - System administrator with role and permissions

// Product Catalog
Product - Subscription product with pricing and performance metrics

// Order Management
Order - Customer order with status tracking
OrderStatus - pending_payment | paid | queued | processing | activated | failed | manual_review | cancelled

// Payment Processing
Payment - Payment record linked to orders
PaymentStatus - pending | paid | failed | refunded
PaymentMethod - card | wallet | crypto | manual


// Logging
AuditLog - Tracks all admin actions
SystemAlert - System notifications and warnings
SystemLog - Detailed audit logs with metadata

// Reports
Report - Generated business report with metrics and period

// Feedback
UserFeedback - User feedback, bug reports, and feature requests

// Analytics
DashboardStats - Aggregated KPI data for overview
```

## Mock Data

The dashboard includes realistic mock data in `/lib/mock-data.ts`:

- 3 sample Telegram users with different statuses and activity
- 3 subscription products with varying prices and performance
- 4 orders in different statuses
- 3 payment records
- System alerts

This mock data enables full UI development and testing without backend connection.

## Authentication & Authorization

### Permission System

```typescript
// Permission checking
canAccess(role, permission) - Check if role has permission
canAccessModule(role, module) - Check if role can access a module

// Current user (mock)
mockCurrentUser - Default super_admin for development
mockAuthSession - Session with auth token
```

### Protected Routes

All routes are protected by the `DashboardLayout` component which:
- Displays role-based navigation
- Enforces module access based on user permissions
- Shows user profile in sidebar

## Component Library

### Reusable Components

**StatCard** (`/components/dashboard/stat-card.tsx`)
- Displays KPI with label, value, and optional trend
- Supports custom icons
- Shows positive/negative trend indicators

**StatusBadge** (`/components/dashboard/status-badge.tsx`)
- Color-coded status badges for all entities
- Supports multiple statuses with semantic colors
- Two size options (sm, md)

**DataTable** (`/components/dashboard/data-table.tsx`)
- Searchable table with built-in pagination
- Configurable columns with custom renderers
- Mobile-responsive with horizontal scroll
- Page size customization

**DashboardLayout** (`/components/dashboard/layout.tsx`)
- Main dashboard wrapper with sidebar and top bar
- Collapsible navigation
- User profile display
- Mobile overlay handling
- Current page highlighting

## Styling & Theme

**Color Palette:**
- Background: `#000000` (black)
- Sidebar/Cards: `#171717` (neutral-900)
- Borders: `#404040` (neutral-700)
- Text: `#FAFAFA` (white)
- Accent: `#EA580C` (orange-500)
- Status colors: Green (success), Red (failed), Yellow (pending), Blue (processing)

**Typography:**
- Monospace font (Geist Mono) for consistency
- Uppercase labels with letter-spacing
- Semantic HTML with proper hierarchy

**Spacing & Layout:**
- Flexbox-based layouts
- Consistent padding/margin scale
- Mobile-first responsive design
- Dark theme optimized contrast

## Integration Notes

### Connecting to Backend

1. **API Routes**: Replace mock data fetching with real API calls
   - Update `/lib/mock-data.ts` to use actual API endpoints
   - Implement error handling and loading states

2. **Authentication**: Integrate with real auth system
   - Replace mock auth in `/lib/auth.ts`
   - Implement JWT token validation
   - Add login/logout flows

3. **Database Queries**: Connect to NestJS backend
   - Update service layer calls
   - Implement real-time updates with WebSockets if needed
   - Add proper error boundaries

4. **File Storage**: Setup file uploads for exports
   - Implement CSV export functionality
   - Add document upload for user verification

### Environment Variables

Create `.env.local` file (after backend setup):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Telegram Admin Dashboard
API_SECRET_KEY=your_secret_key
```

## Development

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run start
```

### Project Structure Best Practices

- **Pages**: Route-based page components in `/app`
- **Components**: Reusable UI components in `/components`
- **Services**: API and utility functions in `/lib`
- **Types**: TypeScript interfaces in `/lib/types.ts`
- **Styling**: Tailwind CSS with design tokens

## Next Steps

1. Connect NestJS backend API endpoints
2. Implement real authentication with JWT
3. Add WebSocket support for real-time updates
4. Implement export to CSV functionality
5. Add advanced filtering and date range selectors
6. Setup notification system for alerts
7. Add user activity timeline views
8. Implement payment reconciliation workflows
9. Add system backup and maintenance utilities
10. Setup monitoring and alerting dashboard

## Security Considerations

- All admin actions should be audit-logged
- Implement row-level security for sensitive data
- Use HTTPS for production
- Validate all user inputs server-side
- Implement rate limiting for API endpoints
- Use secure HTTP-only cookies for sessions
- Regular security audits and penetration testing

## Performance Optimization

- Implement pagination for large datasets
- Use React Query/SWR for data fetching and caching
- Lazy load components and code splitting
- Optimize images and assets
- Implement request debouncing for filters
- Cache API responses appropriately

## Support & Maintenance

For questions or issues:
1. Check existing documentation
2. Review mock data structure for field mappings
3. Verify role-based access permissions
4. Check browser console for errors
5. Test with different user roles
