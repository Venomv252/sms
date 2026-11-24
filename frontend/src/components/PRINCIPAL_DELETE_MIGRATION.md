# Principal Delete Confirmation - Migration Guide

## Overview

The `SuperAdminDeleteConfirmation` component has been **extended to support Principal deletions** in addition to School and Director deletions. You can now use the same component across Super Admin and Director dashboards.

## What Changed

### Before (Type Support)
```jsx
type: "school" | "director"
```

### After (Type Support)
```jsx
type: "school" | "director" | "principal"
```

## Principal-Specific Features

### Consequences Message
When `type="principal"`, the modal displays:

> **This action will:**
> - Permanently remove their Principal account.
> - They will lose access to the school management system.
> - This action cannot be undone.

### Name Handling
The component intelligently handles both name formats:

**Option 1: Single name field**
```js
const principal = {
  id: '123',
  name: 'Jane Smith',  // ✅ Uses this directly
  email: 'jane@school.com'
};
```

**Option 2: First + Last name**
```js
const principal = {
  id: '123',
  firstName: 'Jane',
  lastName: 'Smith',  // ✅ Combines to "Jane Smith"
  email: 'jane@school.com'
};
```

## How to Use for Principal Deletion

### Step 1: Import the Component

```jsx
import SuperAdminDeleteConfirmation from '../components/SuperAdminDeleteConfirmation.jsx';
```

### Step 2: Set Up State

```jsx
const [deleteConfirmation, setDeleteConfirmation] = useState(null);
const [deletingRecord, setDeletingRecord] = useState(false);
```

### Step 3: Create Delete Handler

```jsx
const confirmDelete = async () => {
  setDeletingRecord(true);
  try {
    await apiDelete(
      `/platform/director/schools/${schoolId}/principals/${deleteConfirmation.item.id}`
    );
    
    setDeleteConfirmation(null);
    // Refresh principals list or callback
  } catch (err) {
    console.error('Failed to delete principal:', err);
  } finally {
    setDeletingRecord(false);
  }
};
```

### Step 4: Trigger Delete

```jsx
<button onClick={() => setDeleteConfirmation({ type: 'principal', item: principal })}>
  Delete Principal
</button>
```

### Step 5: Render Modal

```jsx
{deleteConfirmation && (
  <SuperAdminDeleteConfirmation
    type="principal"
    item={deleteConfirmation.item}
    onConfirm={confirmDelete}
    onCancel={() => setDeleteConfirmation(null)}
    isDeleting={deletingRecord}
  />
)}
```

## Complete Example

```jsx
import React, { useState } from 'react';
import SuperAdminDeleteConfirmation from '../components/SuperAdminDeleteConfirmation.jsx';
import { apiDelete } from '../api.js';

function PrincipalsManagement({ schoolId }) {
  const [principals, setPrincipals] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      await apiDelete(
        `/platform/director/schools/${schoolId}/principals/${deleteConfirmation.item.id}`
      );
      
      // Remove from local state
      setPrincipals(prev => 
        prev.filter(p => p.id !== deleteConfirmation.item.id)
      );
      
      setDeleteConfirmation(null);
    } catch (err) {
      console.error('Failed to delete principal:', err);
    } finally {
      setDeletingRecord(false);
    }
  };

  return (
    <>
      <div className="principals-list">
        {principals.map(principal => (
          <div key={principal.id}>
            <h3>{principal.name}</h3>
            <button 
              onClick={() => setDeleteConfirmation({ 
                type: 'principal', 
                item: principal 
              })}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {deleteConfirmation && (
        <SuperAdminDeleteConfirmation
          type="principal"
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

## Migration from DeleteConfirmation Component

If you were using the `/components/DeleteConfirmation.jsx` (with red warning icon) for principals, you have two options:

### Option 1: Keep Using DeleteConfirmation
Best for SchoolWorkspace where you want the visual red warning icon and details box.

```jsx
import DeleteConfirmation from '../../../../components/DeleteConfirmation.jsx';

<DeleteConfirmation
  title="Delete Principal?"
  subtitle="This action cannot be undone"
  itemName={principal.name}
  warningMessage={`Are you sure you want to delete ${principal.name}?`}
  consequences={[
    "This will permanently remove their Principal account",
    "They will lose access to the school management system",
    "This action cannot be undone"
  ]}
  details={[
    { label: "Name", value: principal.name },
    { label: "Email", value: principal.email },
    { label: "Username", value: principal.username }
  ]}
  confirmButtonText="Delete Principal"
  onConfirm={confirmDelete}
  onCancel={() => setDeleteConfirmation(null)}
  isDeleting={deleting}
/>
```

### Option 2: Switch to SuperAdminDeleteConfirmation
Best for Director dashboard where you want simpler styling consistent with super admin.

```jsx
import SuperAdminDeleteConfirmation from '../components/SuperAdminDeleteConfirmation.jsx';

<SuperAdminDeleteConfirmation
  type="principal"
  item={principal}
  onConfirm={confirmDelete}
  onCancel={() => setDeleteConfirmation(null)}
  isDeleting={deleting}
/>
```

## Comparison: Which Component to Use?

| Feature | DeleteConfirmation | SuperAdminDeleteConfirmation |
|---------|-------------------|------------------------------|
| **Best for** | SchoolWorkspace, detailed UI | Super Admin, Director Dashboard |
| **Warning Icon** | ✅ Red AlertTriangle | ❌ No icon |
| **Details Box** | ✅ Name, Email, Username | ❌ No details |
| **Item Types** | Any (custom per use) | school, director, principal |
| **Styling** | `sw-*` classes | `superadmin-*` classes |
| **Props** | 10 props (more detailed) | 5 props (simpler) |
| **Visual Style** | Rich, colorful | Clean, minimal |

## Recommendations

**Use DeleteConfirmation when:**
- ✅ You need the red warning icon for visual emphasis
- ✅ You want to show user details (Name, Email, Username)
- ✅ You're in SchoolWorkspace or similar detailed views
- ✅ You want maximum visual impact

**Use SuperAdminDeleteConfirmation when:**
- ✅ You're in Super Admin or Director Dashboard
- ✅ You want consistent styling with admin interfaces
- ✅ You need to handle multiple types (school/director/principal)
- ✅ You prefer cleaner, simpler UI

## Testing

After migration, test:
1. ✅ Click delete button opens modal
2. ✅ Principal name displays correctly
3. ✅ Consequences message is correct for principal
4. ✅ Cancel button closes modal
5. ✅ Delete button triggers API call
6. ✅ Loading state shows "Deleting…"
7. ✅ Success closes modal and refreshes list
8. ✅ Error keeps modal open
9. ✅ Backdrop click closes modal
10. ✅ ESC key closes modal (via backdrop)

## Need Help?

See examples:
- `SUPERADMIN_DELETE_USAGE_EXAMPLES.jsx` - Full working examples
- `SUPERADMIN_DELETE_CONFIRMATION.md` - Complete documentation
- `SuperAdminDeleteConfirmation.jsx` - Component source
