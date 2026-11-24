# SuperAdminDeleteConfirmation Component

## Overview

Reusable delete confirmation modal specifically designed for the **Super Admin Dashboard**. Handles both School and Director deletions with type-specific messaging and consequences.

## Visual Design

```
┌────────────────────────────────────────┐
│  Delete school/Director?            ✕  │
├────────────────────────────────────────┤
│  Are you sure you want to delete       │
│  School Name / Director Name?          │
│                                        │
│  Before you continue: / This will:     │
│  • Consequence 1                       │
│  • Consequence 2                       │
│  • Consequence 3                       │
│                                        │
│         [Cancel]  [🗑️ Delete School]   │
└────────────────────────────────────────┘
```

## Usage

### Basic Example

```jsx
import { useState } from 'react';
import SuperAdminDeleteConfirmation from '../components/SuperAdminDeleteConfirmation.jsx';
import { apiDelete } from '../api.js';

function SuperAdminDashboard() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  // Handle delete confirmation
  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      if (deleteConfirmation.type === 'school') {
        await apiDelete(`/platform/superadmin/schools/${deleteConfirmation.item.id}`);
      } else {
        await apiDelete(`/platform/superadmin/directors/${deleteConfirmation.item.id}`);
      }
      
      // Update UI, show success message
      setDeleteConfirmation(null);
    } catch (err) {
      // Handle error
      console.error(err);
    } finally {
      setDeletingRecord(false);
    }
  };

  return (
    <>
      {/* Delete School Button */}
      <button onClick={() => setDeleteConfirmation({ type: 'school', item: school })}>
        Delete School
      </button>

      {/* Delete Director Button */}
      <button onClick={() => setDeleteConfirmation({ type: 'director', item: director })}>
        Delete Director
      </button>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <SuperAdminDeleteConfirmation
          type={deleteConfirmation.type}
          item={deleteConfirmation.item}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
          isDeleting={deletingRecord}
        />
      )}
    </>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"school"` \| `"director"` | ✅ Yes | Type of item being deleted |
| `item` | `object` | ✅ Yes | The item to delete |
| `onConfirm` | `function` | ✅ Yes | Callback when delete is confirmed |
| `onCancel` | `function` | ✅ Yes | Callback when modal is closed/cancelled |
| `isDeleting` | `boolean` | ❌ No | Shows loading state (default: `false`) |

### Item Structure

**For School (`type: "school"`):**
```js
{
  id: "uuid",
  name: "School Name",
  // ... other fields
}
```

**For Director (`type: "director"`):**
```js
{
  id: "uuid",
  firstName: "John",
  lastName: "Doe",
  // ... other fields
}
```

## Type-Specific Consequences

### School Deletion

> **Before you continue:**
> - School-owned users, notices, and related records will be permanently deleted.
> - Records belonging to other schools will be preserved.
> - This action cannot be undone after successful deletion.

### Director Deletion

> **This action will:**
> - Delete the Director's login account.
> - Remove all school assignments linked to this Director.
> - Keep the schools and their student, teacher, parent and other staff accounts unchanged.

## State Management Pattern

```jsx
// State for tracking what's being deleted
const [deleteConfirmation, setDeleteConfirmation] = useState(null);
// Structure: { type: 'school' | 'director', item: {...} }

// State for tracking deletion in progress
const [deletingRecord, setDeletingRecord] = useState(false);

// Open modal for school
const deleteSchool = (school) => {
  setDeleteConfirmation({ type: 'school', item: school });
};

// Open modal for director
const deleteDirector = (director) => {
  setDeleteConfirmation({ type: 'director', item: director });
};

// Close modal
const closeModal = () => {
  setDeleteConfirmation(null);
};

// Confirm deletion
const confirmDelete = async () => {
  if (!deleteConfirmation) return;
  
  setDeletingRecord(true);
  try {
    const endpoint = deleteConfirmation.type === 'school'
      ? `/platform/superadmin/schools/${deleteConfirmation.item.id}`
      : `/platform/superadmin/directors/${deleteConfirmation.item.id}`;
    
    await apiDelete(endpoint);
    
    // Success: update UI, close modal
    closeModal();
  } catch (err) {
    // Error: show error message, keep modal open
    console.error(err);
  } finally {
    setDeletingRecord(false);
  }
};
```

## CSS Classes Used

The component uses these CSS classes (defined in `admin.css` or `superadmin-zip-theme.css`):

- `.superadmin-modal-backdrop` - Semi-transparent backdrop
- `.superadmin-modal` - Modal container
- `.superadmin-confirm-modal` - Specific styling for confirmation modal
- `.superadmin-modal-heading` - Modal header
- `.superadmin-icon-button` - Close button (X icon)
- `.superadmin-delete-details` - Consequences section
- `.superadmin-confirm-actions` - Action buttons container
- `.superadmin-cancel-button` - Cancel button
- `.superadmin-delete-confirm` - Delete button (red/danger style)

## Accessibility

- ✅ ARIA labels: `aria-modal`, `aria-labelledby`, `aria-describedby`
- ✅ Keyboard navigation: Tab cycles through buttons
- ✅ ESC key: Closes modal (via backdrop click)
- ✅ Disabled states: Prevents interaction during deletion
- ✅ Focus management: Trapped within modal

## Comparison with Other Delete Modals

| Feature | SuperAdminDeleteConfirmation | DeleteConfirmation (SchoolWorkspace) |
|---------|------------------------------|--------------------------------------|
| **Used in** | Super Admin Dashboard | Director Dashboard (SchoolWorkspace) |
| **CSS Classes** | `superadmin-*` | `sw-*` |
| **Warning Icon** | ❌ No | ✅ Yes (Red AlertTriangle) |
| **Item Types** | School, Director | Principal, any single item |
| **Details Box** | ❌ No | ✅ Yes (Name, Email, Username) |
| **Consequences** | Type-specific (school vs director) | Custom per item |
| **Style** | Simpler, text-focused | Rich, visual with icon |

## When to Use

✅ **Use SuperAdminDeleteConfirmation for:**
- Deleting schools in Super Admin Dashboard
- Deleting directors in Super Admin Dashboard
- Any Super Admin delete operation that fits school/director pattern

✅ **Use DeleteConfirmation (from `/components`) for:**
- Deleting principals in SchoolWorkspace
- Deleting teachers, students, etc.
- Any delete operation that needs the warning icon and details box

## Example: Multiple Delete Types

```jsx
function SuperAdminSchools() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      if (deleteConfirmation.type === 'school') {
        await apiDelete(`/platform/superadmin/schools/${deleteConfirmation.item.id}`);
        // Update schools list
      } else if (deleteConfirmation.type === 'director') {
        await apiDelete(`/platform/superadmin/directors/${deleteConfirmation.item.id}`);
        // Update directors list
      }
      setDeleteConfirmation(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingRecord(false);
    }
  };

  return (
    <>
      {/* Schools Table */}
      {schools.map(school => (
        <button onClick={() => setDeleteConfirmation({ type: 'school', item: school })}>
          Delete
        </button>
      ))}

      {/* Directors Table */}
      {directors.map(director => (
        <button onClick={() => setDeleteConfirmation({ type: 'director', item: director })}>
          Delete
        </button>
      ))}

      {/* Single Modal for Both Types */}
      {deleteConfirmation && (
        <SuperAdminDeleteConfirmation
          type={deleteConfirmation.type}
          item={deleteConfirmation.item}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
          isDeleting={deletingRecord}
        />
      )}
    </>
  );
}
```

## Best Practices

### 1. Always Pass Correct Type

```jsx
// ✅ Correct
setDeleteConfirmation({ type: 'school', item: school });
setDeleteConfirmation({ type: 'director', item: director });

// ❌ Wrong
setDeleteConfirmation({ type: 'School', item: school }); // Case-sensitive
setDeleteConfirmation({ type: 'user', item: user });     // Not supported
```

### 2. Ensure Item Has Required Fields

```jsx
// ✅ School must have 'name'
const school = { id: '123', name: 'ABC School' };

// ✅ Director must have 'firstName' and 'lastName'
const director = { id: '456', firstName: 'John', lastName: 'Doe' };

// ❌ Missing required fields will cause errors
const school = { id: '123' }; // Missing 'name'
```

### 3. Handle Errors Gracefully

```jsx
try {
  await apiDelete(endpoint);
  setDeleteConfirmation(null); // Only close on success
} catch (err) {
  // Show error, keep modal open so user can retry
  setError(err.message);
  // Don't close modal
}
```

### 4. Disable Actions During Deletion

```jsx
// Always pass isDeleting state
<SuperAdminDeleteConfirmation
  // ... other props
  isDeleting={deletingRecord} // ✅ Required!
/>
```

## Migration Guide

### Before (Inline Modal - 100 lines)

```jsx
{deleteConfirmation && (
  <div className="superadmin-modal-backdrop">
    <section className="superadmin-modal">
      {/* 100 lines of inline JSX */}
    </section>
  </div>
)}
```

### After (Reusable Component - 7 lines)

```jsx
{deleteConfirmation && (
  <SuperAdminDeleteConfirmation
    type={deleteConfirmation.type}
    item={deleteConfirmation.item}
    onConfirm={confirmDelete}
    onCancel={() => setDeleteConfirmation(null)}
    isDeleting={deletingRecord}
  />
)}
```

## File Location

```
frontend/
  src/
    components/
      SuperAdminDeleteConfirmation.jsx         ← Component file
      SUPERADMIN_DELETE_CONFIRMATION.md        ← This documentation
```

## Support

For questions or customization:
- Component source: `src/components/SuperAdminDeleteConfirmation.jsx`
- Usage examples in this document
- Current implementation: `src/role-dashboards/SuperAdminDashboard.jsx`
