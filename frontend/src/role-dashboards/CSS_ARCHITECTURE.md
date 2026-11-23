# CSS Architecture - Dashboard Styling

## Problem: Overly Generic Selectors

The original CSS architecture had **universal selectors** that affected multiple dashboards simultaneously. This caused styling changes in one dashboard to bleed into another.

### Problematic Selectors in `platform-role-theme.css`:

1. **`.platform-shell`** - Applied to BOTH Super Admin AND Director dashboards
2. **`.platform-sidebar`** - Universal selector affecting all sidebars
3. **`.platform-brand`** - Universal brand styling
4. **`.platform-topbar`** - Universal top bar
5. **`.platform-main`** - Universal main content area
6. **`.superadmin-*`** classes without proper scoping
7. **`.director-*`** classes without proper scoping

### Why This Was Bad:

```css
/* This affected BOTH dashboards */
.platform-sidebar {
  background: var(--rp-sidebar) !important;  /* Dark background */
  color: #fff !important;
}

/* When you changed Super Admin, Director changed too! */
```

## Solution: Scoped CSS Files

### File Structure:

```
frontend/src/role-dashboards/
├── platform-role-theme.css     (Shared base styles - DO NOT USE ALONE)
├── superadmin-zip-theme.css    (Super Admin specific - GREEN sidebar)
├── director-theme.css          (Director specific - GREEN sidebar)
├── admin.css                   (Shared admin utilities)
└── director.css                (Director base styles)
```

### How It Works Now:

#### Super Admin Dashboard:
```jsx
// SuperAdminDashboard.jsx
<div className="platform-shell superadmin-role-shell">
  {/* Styled by superadmin-zip-theme.css */}
</div>
```

```css
/* superadmin-zip-theme.css - Only affects Super Admin */
.superadmin-role-shell > .platform-sidebar {
  background: #0a7c59 !important;  /* Green */
  color: #fff !important;
}
```

#### Director Dashboard:
```jsx
// DirectorDashboard.jsx
<div className="platform-shell director-shell director-role-shell">
  {/* Styled by director-theme.css */}
</div>
```

```css
/* director-theme.css - Only affects Director */
.director-role-shell > .platform-sidebar {
  background: #0a7c59 !important;  /* Green */
  color: #fff !important;
}
```

## CSS Specificity Rules Used:

1. **Parent class selector**: `.superadmin-role-shell` or `.director-role-shell`
2. **Child combinator**: `>` ensures direct children only
3. **Important flag**: `!important` to override base styles
4. **High specificity**: `.director-role-shell .platform-sidebar nav button.active`

## Import Order (Critical):

```jsx
// DirectorDashboard.jsx
import "./director.css";              // 1. Base director styles
import "./admin.css";                 // 2. Shared admin utilities
import "./platform-role-theme.css";   // 3. Platform base (gets overridden)
import "./director-theme.css";        // 4. Director specific (LAST - highest priority)
```

```jsx
// SuperAdminDashboard.jsx
import "./admin.css";                    // 1. Shared admin utilities
import "./platform-role-theme.css";      // 2. Platform base (gets overridden)
import "./superadmin-zip-theme.css";     // 3. Super Admin specific (LAST)
```

## Best Practices Going Forward:

### ✅ DO:
- Use scoped parent classes: `.director-role-shell`, `.superadmin-role-shell`
- Create separate theme files for each dashboard
- Use child combinators: `.parent-class > .child-class`
- Keep specificity high: `.parent .child .grandchild`

### ❌ DON'T:
- Use universal selectors: `.platform-sidebar` (without parent scope)
- Share theme files between different dashboards
- Rely on CSS order alone (use specificity)
- Use element selectors: `button`, `input` (too generic)

## Testing Checklist:

When making CSS changes:

1. ✓ Check Super Admin dashboard still looks correct
2. ✓ Check Director dashboard still looks correct
3. ✓ Check other dashboards (Student, Teacher, etc.)
4. ✓ Test responsive breakpoints (mobile, tablet)
5. ✓ Test dark/light mode if applicable
6. ✓ Clear browser cache and test again

## Common Pitfall:

```css
/* BAD - Affects everything */
.platform-topbar {
  background: red !important;
}

/* GOOD - Only affects Director */
.director-role-shell .platform-topbar {
  background: red !important;
}
```

## Current Dashboard Color Schemes:

| Dashboard   | Sidebar BG | Active Nav | Accent      |
|-------------|------------|------------|-------------|
| Super Admin | #0a7c59    | White      | #0a7c59     |
| Director    | #0a7c59    | White      | #0a7c59     |
| Student     | #fff       | -          | Various     |
| Teacher     | -          | -          | -           |

## Maintenance Notes:

- All dashboard-specific styling should live in their own theme files
- `platform-role-theme.css` is now mostly legacy - avoid adding to it
- When creating new dashboards, create a new `{role}-theme.css` file
- Always scope with parent class: `.{role}-shell`
