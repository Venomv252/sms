# Platform Overview Grid CSS Documentation

## Overview
The `.platform-overview-grid` class creates a responsive two-column layout for dashboard panels, optimized for displaying summary information side-by-side.

---

## CSS Properties Added

### Desktop Layout (> 950px)
```css
.superadmin-role-shell .platform-overview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 20px;
}
```

**Properties**:
- `display: grid` - Uses CSS Grid for flexible layout
- `grid-template-columns: repeat(2, minmax(0, 1fr))` - Two equal-width columns
- `gap: 18px` - Space between columns
- `margin-bottom: 20px` - Space below the grid

### Tablet/Mobile Layout (≤ 950px)
```css
@media (max-width: 950px) {
  .superadmin-role-shell .platform-overview-grid {
    grid-template-columns: 1fr;
  }
}
```

**Changes**:
- Stacks panels vertically in single column
- Better readability on smaller screens

### Mobile Optimization (≤ 680px)
```css
@media (max-width: 680px) {
  .superadmin-role-shell .platform-overview-grid {
    gap: 14px;
  }
}
```

**Changes**:
- Reduces gap to 14px for tighter spacing on mobile

---

## Usage Example

```jsx
<div className="platform-overview-grid">
  <section className="superadmin-panel">
    <div className="superadmin-section-title">
      <div>
        <h2><Building2 size={19} /> Top Schools</h2>
        <p>Schools with highest enrollment</p>
      </div>
      <button>View all</button>
    </div>
    {/* Panel content */}
  </section>
  
  <section className="superadmin-panel">
    <div className="superadmin-section-title">
      <div>
        <h2><Users size={19} /> Recent Schools</h2>
        <p>Recently created schools</p>
      </div>
      <button>Manage Directors</button>
    </div>
    {/* Panel content */}
  </section>
</div>
```

---

## Related Components Added

### 1. Panel Container
```css
.superadmin-role-shell .superadmin-panel {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.035);
  padding: 22px;
  margin-bottom: 18px;
}
```

**Features**:
- Clean white background
- Subtle border and shadow
- Rounded corners (14px)
- Consistent padding

### 2. Section Title
```css
.superadmin-role-shell .superadmin-section-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f3f5;
}
```

**Features**:
- Flexbox layout with space-between
- Icon + Title in h2
- Description in p
- Action button on right
- Bottom border separator

### 3. Compact Rows
```css
.superadmin-role-shell .platform-compact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid #f1f3f5;
  transition: background-color 0.15s ease;
}
```

**Features**:
- Icon/Mark + Title + Badge/Count layout
- Hover effect with background highlight
- Text overflow handling
- Responsive spacing

**Structure**:
```html
<div className="platform-compact-row">
  <div className="network-school-mark">
    <School size={18} />
  </div>
  <div>
    <strong>School Name</strong>
    <small>School Code</small>
  </div>
  <b>50 users</b>
</div>
```

### 4. Empty States
```css
.superadmin-role-shell .superadmin-empty {
  padding: 32px 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px dashed #e5e7eb;
}
```

**Usage**:
```jsx
{data.length === 0 && (
  <div className="superadmin-empty">
    No data available
  </div>
)}
```

---

## Related Layouts

### KPI Overview (4-column grid)
```css
.superadmin-role-shell .superadmin-overview {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}
```

**Responsive**:
- Desktop (> 1200px): 4 columns
- Tablet (≤ 1200px): 2 columns
- Mobile (≤ 680px): 2 columns with tighter gap

---

## Responsive Breakpoints

| Breakpoint | Overview Grid | KPI Overview | Behavior |
|------------|---------------|--------------|----------|
| > 1200px | 2 columns | 4 columns | Full desktop layout |
| 950px - 1200px | 2 columns | 2 columns | Tablet optimization |
| 680px - 950px | 1 column | 2 columns | Mobile landscape |
| < 680px | 1 column | 2 columns | Mobile portrait |

---

## Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| Panel Background | `#ffffff` | Main panel background |
| Panel Border | `#e5e7eb` | Panel borders |
| Panel Shadow | `rgba(0,0,0,0.035)` | Subtle depth |
| Divider | `#f1f3f5` | Section separators |
| Hover Background | `#f9fafb` | Row hover state |
| Primary Text | `#111827` | Headings, strong text |
| Secondary Text | `#6b7280` | Descriptions, small text |
| Muted Text | `#9ca3af` | Empty states |
| Primary Green | `#0a7c59` | Buttons, icons, marks |
| Green Light | `rgba(10,124,89,0.1)` | Button backgrounds |
| Green Soft | `#e6f4f0` | Icon backgrounds |

---

## Visual Hierarchy

```
platform-overview-grid
├── superadmin-panel (Left)
│   ├── superadmin-section-title
│   │   ├── h2 (with icon)
│   │   ├── p (description)
│   │   └── button (action)
│   └── platform-compact-row (repeating)
│       ├── network-school-mark (icon)
│       ├── div (title + subtitle)
│       └── b (count/badge)
└── superadmin-panel (Right)
    ├── superadmin-section-title
    │   ├── h2 (with icon)
    │   ├── p (description)
    │   └── button (action)
    └── platform-compact-row (repeating)
        ├── network-school-mark (icon)
        ├── div (title + subtitle)
        └── b (count/badge)
```

---

## Best Practices

### ✅ DO
- Use `.platform-overview-grid` for side-by-side panel layouts
- Include descriptive section titles with icons
- Add action buttons for quick navigation
- Use `.platform-compact-row` for list items
- Include empty states for zero-data scenarios
- Keep panel content concise (5-8 items max)

### ❌ DON'T
- Nest overview grids inside each other
- Use more than 2 panels in overview grid
- Overload panels with too many items
- Skip empty states
- Use different spacing/padding per panel
- Mix different content types in same grid

---

## Accessibility

- **Semantic HTML**: Use `<section>` for panels
- **Headings**: Proper heading hierarchy (h2 for section titles)
- **Buttons**: Clear action labels
- **Alt Text**: Icons should have aria-labels or titles
- **Keyboard Navigation**: All interactive elements focusable
- **Screen Readers**: Meaningful text descriptions

---

## Performance

- **CSS Grid**: Hardware accelerated, performant
- **Transitions**: Smooth hover effects (0.15s ease)
- **Shadow**: Single layer for minimal repaints
- **Text Overflow**: Prevents layout shifts

---

## Browser Compatibility

✅ Chrome/Edge (Chromium) - Full support
✅ Firefox - Full support  
✅ Safari - Full support
✅ Mobile browsers - Full support

**Note**: CSS Grid has 95%+ browser support. All modern browsers from 2017+ support it.

---

## Maintenance

When modifying:
1. Keep gap values consistent (16-18px)
2. Maintain 2-column desktop / 1-column mobile pattern
3. Test all breakpoints (1200px, 950px, 680px)
4. Ensure panel margins don't stack (use `margin-bottom: 0` on grid children)
5. Verify hover states work on all rows
6. Test with varying content lengths

---

## Summary

The `.platform-overview-grid` class provides:
- ✅ Responsive 2-column → 1-column layout
- ✅ Consistent spacing and gaps
- ✅ Professional panel styling
- ✅ Interactive hover effects
- ✅ Clean typography hierarchy
- ✅ Empty state handling
- ✅ Mobile-optimized breakpoints
- ✅ Accessible markup support

Perfect for dashboard overview sections displaying related information side-by-side!
