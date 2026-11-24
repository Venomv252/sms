# Reusable Components

This directory contains reusable UI components used across the SMS application.

## Available Components

### 1. **CredentialDisplay** 
📄 `CredentialDisplay.jsx`

Modal for displaying and copying user credentials after account creation.

**Features:**
- Password visibility toggle
- Individual copy buttons for username/password
- Copy all credentials button
- Formatted text output
- Security warning banner
- Success animations

**Usage:** See component file for inline documentation

---

### 2. **DeleteConfirmation** ⭐
📄 `DeleteConfirmation.jsx`  
📚 `DELETE_CONFIRMATION_PATTERN.md` (Full documentation)  
⚡ `DELETE_CONFIRMATION_QUICK_REFERENCE.md` (Quick start)

Reusable modal for confirming dangerous delete operations.

**Features:**
- Warning icon with red gradient
- Clear consequences list
- Item details display
- Loading states
- Consistent styling
- Accessibility support

**Quick Start:**
```jsx
import DeleteConfirmation from '../components/DeleteConfirmation.jsx';

// In your component:
const [deleteItem, setDeleteItem] = useState(null);
const [deleting, setDeleting] = useState(false);

{deleteItem && (
  <DeleteConfirmation
    title="Delete Item?"
    itemName={deleteItem.name}
    warningMessage={`Are you sure you want to delete ${deleteItem.name}?`}
    consequences={[
      "First consequence",
      "Second consequence",
      "Third consequence"
    ]}
    details={[
      { label: "Name", value: deleteItem.name },
      { label: "ID", value: deleteItem.id }
    ]}
    confirmButtonText="Delete Item"
    onConfirm={confirmDelete}
    onCancel={() => setDeleteItem(null)}
    isDeleting={deleting}
  />
)}
```

**Documentation:**
- **Full Guide**: `DELETE_CONFIRMATION_PATTERN.md` - Complete examples, best practices, migration guide
- **Quick Reference**: `DELETE_CONFIRMATION_QUICK_REFERENCE.md` - Copy-paste templates, props cheat sheet

---

### 3. **LoginPage**
📄 `LoginPage.jsx` + `LoginPage.css`

Authentication page with role-based login.

---

### 4. **TrackingToast**
📄 `TrackingToast.jsx`

Toast notifications for GPS tracking events.

---

### 5. **BackendDataPanel**
📄 `BackendDataPanel.jsx`

Development panel for displaying backend data.

---

## Component Standards

### File Naming
- Component files: PascalCase (e.g., `DeleteConfirmation.jsx`)
- CSS files: PascalCase matching component (e.g., `LoginPage.css`)
- Documentation: UPPERCASE with underscores (e.g., `DELETE_CONFIRMATION_PATTERN.md`)

### Documentation Requirements
Components should include:
1. **Inline JSDoc**: At top of component file
2. **Usage examples**: In comments or separate `.md` file
3. **Props documentation**: Types, required/optional, defaults
4. **Pattern guide** (for complex components): Best practices, common mistakes

### Code Style
- Use functional components with hooks
- Prefer inline styles for reusable components (portability)
- Use CSS files only when styles are complex/repeated
- Always handle loading/error states
- Support keyboard navigation
- Include ARIA labels for accessibility

### Testing Checklist
Before committing a new component:
- [ ] Component renders without errors
- [ ] Props validation works
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Keyboard navigation works
- [ ] Mobile responsive
- [ ] Accessible (ARIA labels, focus management)
- [ ] Documentation complete
- [ ] Usage examples provided

---

## Usage Patterns

### Import Paths
```jsx
// From role-dashboards
import ComponentName from '../components/ComponentName.jsx';

// From nested pages
import ComponentName from '../../components/ComponentName.jsx';

// From root-level pages
import ComponentName from './components/ComponentName.jsx';
```

### State Management
Most components expect you to manage state externally:

```jsx
// Parent component manages state
const [modalOpen, setModalOpen] = useState(false);
const [data, setData] = useState(null);

// Component receives callbacks
<Component 
  data={data}
  onClose={() => setModalOpen(false)}
  onSubmit={handleSubmit}
/>
```

### Error Handling
Components should not handle API errors internally. Pass errors as props:

```jsx
// ❌ Bad: Component makes API call
function Component() {
  const [data, setData] = useState(null);
  useEffect(() => {
    apiGet('/endpoint').then(setData);
  }, []);
}

// ✅ Good: Parent handles data fetching
function Parent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  
  useEffect(() => {
    apiGet('/endpoint')
      .then(setData)
      .catch(err => setError(err.message));
  }, []);
  
  return <Component data={data} error={error} />;
}
```

---

## Contributing

### Adding a New Component

1. **Create component file** in `components/`
2. **Add JSDoc** at top of file with usage examples
3. **Create documentation** (for complex components):
   - Pattern guide: `COMPONENT_NAME_PATTERN.md`
   - Quick reference: `COMPONENT_NAME_QUICK_REFERENCE.md`
4. **Update this README** with component description
5. **Test component** in multiple contexts
6. **Create PR** with screenshots/demo

### Updating Existing Components

1. **Check existing usage** before making breaking changes
2. **Update documentation** if behavior changes
3. **Add migration guide** if breaking changes required
4. **Test all usage locations** after changes

---

## Component Directory Structure

```
components/
├── BackendDataPanel.jsx
├── CredentialDisplay.jsx
├── DeleteConfirmation.jsx                    ⭐ Reusable delete modal
├── DELETE_CONFIRMATION_PATTERN.md            📚 Full documentation
├── DELETE_CONFIRMATION_QUICK_REFERENCE.md    ⚡ Quick start guide
├── LoginPage.jsx
├── LoginPage.css
├── TrackingToast.jsx
└── README.md                                  📖 This file
```

---

## Questions?

If you need help with:
- **Using a component**: Check component file JSDoc and documentation files
- **Modifying a component**: Check pattern guide for design decisions
- **Creating a new component**: Follow standards above and reference existing components

For complex components like `DeleteConfirmation`, always read the documentation files first!
