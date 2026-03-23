# Multi-Tab Workspace System

## Overview

The dashboard features a Chrome-like multi-tab workspace system that allows users to open and manage up to 8 concurrent tabs. All tab state is automatically persisted to localStorage and restored on page refresh.

## Features

### Tab Management
- **Open Tabs**: Click "View" on any list item to open a new tab (max 8 tabs)
- **Close Tabs**: Click the X button on a tab or use keyboard shortcut (Ctrl/Cmd+W)
- **Close Other Tabs**: Right-click on a tab and select "Close Other Tabs"
- **Switch Tabs**: Click on any tab to switch focus, or use keyboard shortcuts (Ctrl/Cmd+Tab)
- **Tab Persistence**: All open tabs are automatically saved to localStorage and restored on refresh

### Keyboard Shortcuts
- **Ctrl/Cmd+W**: Close the current active tab
- **Ctrl/Cmd+Tab**: Switch to the next tab
- **Ctrl/Cmd+Shift+Tab**: Switch to the previous tab
- **Right-Click**: Open context menu with tab options

### Tab Bar Features
- **Visual Indicators**: Active tab is highlighted with orange accent
- **Tab Counter**: Shows current tab count (e.g., "3/8")
- **Auto-Scroll**: Scroll arrows appear when tabs exceed screen width
- **Context Menu**: Right-click for quick access to close/close-other/reload options
- **Smooth Transitions**: All tab interactions have smooth animations

## Implementation

### Using Tabs in Pages

#### Basic Usage
```typescript
import { useTabs } from '@/components/dashboard/tabs-context'

export default function UsersPage() {
  const { addTab } = useTabs()

  const handleOpenTab = (id: string, title: string) => {
    addTab({
      id: `user-${id}`,
      title: title,
      type: 'user',
      url: `/users/${id}`,
    })
  }

  return (
    <button onClick={() => handleOpenTab('123', 'John Doe')}>
      View User
    </button>
  )
}
```

#### Using Tab Opener Hook
```typescript
import { useTabOpener } from '@/hooks/use-tab-opener'

export default function ProductsPage() {
  const { openTab } = useTabOpener()

  return (
    <button onClick={() => openTab('Premium Package', '/products/1', 'product')}>
      View Product
    </button>
  )
}
```

### Context API Methods

The `useTabs()` hook provides these methods:

- **addTab(tab)**: Add a new tab (duplicates are ignored)
- **closeTab(tabId)**: Close a specific tab
- **closeOtherTabs(tabId)**: Close all tabs except the specified one
- **closeAllTabs()**: Close all open tabs
- **setActiveTab(tabId)**: Switch to a specific tab
- **tabs**: Array of open TabItem objects
- **activeTabId**: Currently active tab ID
- **maxTabs**: Maximum allowed tabs (8)
- **isLoading**: Loading state for tab persistence

### Tab Item Structure
```typescript
interface TabItem {
  id: string              // Unique identifier (e.g., "user-123")
  title: string           // Display name (e.g., "John Doe")
  type: string            // Type of content (order, user, product, coupon, payment, feedback, report, dashboard)
  url: string             // Full URL path (e.g., "/users/123")
  icon?: string           // Optional icon identifier
}
```

## Persistence

Tabs are stored in localStorage with the key `dashboard_tabs`. The storage includes:
- Tab list with all metadata
- Currently active tab ID
- Timestamp of last update

When the app loads, tabs are automatically restored if they exist in storage.

## Architecture

```
DashboardLayout
├── TabsBar (displays open tabs with controls)
├── KeyboardShortcuts (handles keyboard shortcuts)
├── Page Content
└── Children
```

### Components
- **TabsProvider**: React Context provider that manages tab state
- **TabsBar**: Displays the tab bar UI with tab switching and management
- **KeyboardShortcuts**: Handles keyboard shortcuts for tab management
- **useTabOpener**: Custom hook for easy tab opening from any page

### Storage
Tabs are persisted to `localStorage` under the key `dashboard_tabs` with the following structure:
```json
{
  "tabs": [...],
  "activeTabId": "string",
  "timestamp": "ISO string"
}
```

## Best Practices

1. **Use meaningful tab titles**: Titles should clearly identify the content (e.g., "Order #ORD-123" not just "123")
2. **Use proper tab types**: Choose the correct type from the enum to enable better filtering/management in future
3. **Handle data updates**: Tab data is preserved but not actively synced; refresh the detail page if data changes
4. **Close unused tabs**: Remind users to close tabs they no longer need to free up the limit
5. **Test keyboard shortcuts**: Ensure all keyboard shortcuts work as expected in your browser

## Future Enhancements

Potential improvements for the tab system:
- Tab groups/collections
- Tab search/filter
- Recently closed tabs recovery
- Tab preview on hover
- Duplicate tab functionality
- Tab rearranging/pinning
- Session management (save/restore workspaces)
- Cross-tab communication for live updates
