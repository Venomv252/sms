/**
 * SuperAdminDeleteConfirmation Component
 * 
 * A reusable modal dialog for confirming delete operations in the Super Admin dashboard.
 * Handles School, Director, and Principal deletions with type-specific messaging.
 * 
 * USAGE EXAMPLE:
 * 
 * ```jsx
 * import SuperAdminDeleteConfirmation from '../components/SuperAdminDeleteConfirmation.jsx';
 * 
 * function MyComponent() {
 *   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
 *   const [deletingRecord, setDeletingRecord] = useState(false);
 * 
 *   const handleDelete = async () => {
 *     setDeletingRecord(true);
 *     try {
 *       if (deleteConfirmation.type === 'school') {
 *         await apiDelete(`/api/schools/${deleteConfirmation.item.id}`);
 *       } else if (deleteConfirmation.type === 'director') {
 *         await apiDelete(`/api/directors/${deleteConfirmation.item.id}`);
 *       } else if (deleteConfirmation.type === 'principal') {
 *         await apiDelete(`/api/principals/${deleteConfirmation.item.id}`);
 *       }
 *       setDeleteConfirmation(null);
 *     } catch (err) {
 *       // Handle error
 *     } finally {
 *       setDeletingRecord(false);
 *     }
 *   };
 * 
 *   return (
 *     <>
 *       <button onClick={() => setDeleteConfirmation({ type: 'principal', item: principal })}>
 *         Delete Principal
 *       </button>
 *       
 *       {deleteConfirmation && (
 *         <SuperAdminDeleteConfirmation
 *           type={deleteConfirmation.type}
 *           item={deleteConfirmation.item}
 *           onConfirm={handleDelete}
 *           onCancel={() => setDeleteConfirmation(null)}
 *           isDeleting={deletingRecord}
 *         />
 *       )}
 *     </>
 *   );
 * }
 * ```
 * 
 * PROPS:
 * - type: "school" | "director" | "principal" (required) - Type of item being deleted
 * - item: object (required) - The item to delete
 *   - For school: { name: string, ... }
 *   - For director/principal: { firstName: string, lastName: string, ... }
 *     OR { name: string, email: string, username: string, ... }
 * - onConfirm: function (required) - Callback when delete is confirmed
 * - onCancel: function (required) - Callback when modal is closed/cancelled
 * - isDeleting: boolean (optional) - Shows loading state on delete button
 * 
 * STYLING:
 * Uses superadmin-* CSS classes from admin.css or director.css
 * 
 * ACCESSIBILITY:
 * - Modal with ARIA labels
 * - Escape key closes modal (via backdrop click)
 * - Disabled states during deletion
 */

import React from 'react';
import { X, Trash2 } from 'lucide-react';

export default function SuperAdminDeleteConfirmation({
  type,
  item,
  onConfirm,
  onCancel,
  isDeleting = false,
}) {
  // Determine display name based on type and item structure
  const getItemName = () => {
    if (type === "school") {
      return item.name;
    }
    // For director/principal: check if name exists, otherwise use firstName + lastName
    if (item.name) {
      return item.name;
    }
    return `${item.firstName} ${item.lastName}`;
  };
  
  const itemName = getItemName();

  // Determine title based on type
  const getTitle = () => {
    if (type === "school") return "school";
    if (type === "director") return "Director";
    if (type === "principal") return "Principal";
    return type; // fallback
  };

  // Type-specific consequences
  const getConsequences = () => {
    if (type === "school") {
      return (
        <>
          <p>Before you continue:</p>
          <ul>
            <li>
              School-owned users, notices, and related records will be
              permanently deleted.
            </li>
            <li>
              Records belonging to other schools will be preserved.
            </li>
            <li>
              This action cannot be undone after successful deletion.
            </li>
          </ul>
        </>
      );
    } else if (type === "director") {
      return (
        <>
          <p>This action will:</p>
          <ul>
            <li>Delete the Director's login account.</li>
            <li>
              Remove all school assignments linked to this Director.
            </li>
            <li>
              Keep the schools and their student, teacher, parent and
              other staff accounts unchanged.
            </li>
          </ul>
        </>
      );
    } else if (type === "principal") {
      return (
        <>
          <p>This action will:</p>
          <ul>
            <li>Permanently remove their Principal account.</li>
            <li>
              They will lose access to the school management system.
            </li>
            <li>This action cannot be undone.</li>
          </ul>
        </>
      );
    }
    return null;
  };

  return (
    <div
      className="superadmin-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isDeleting) {
          onCancel();
        }
      }}
    >
      <section
        className="superadmin-modal superadmin-confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-record-title"
        aria-describedby="delete-record-description"
      >
        {/* Header */}
        <div className="superadmin-modal-heading">
          <h2 id="delete-record-title">
            Delete {getTitle()}?
          </h2>
          <button
            type="button"
            className="superadmin-icon-button"
            aria-label="Close confirmation"
            disabled={isDeleting}
            onClick={onCancel}
          >
            <X size={18} />
          </button>
        </div>

        {/* Warning Message */}
        <p id="delete-record-description">
          Are you sure you want to delete{" "}
          <strong>{itemName}</strong>?
        </p>

        {/* Consequences */}
        <div className="superadmin-delete-details">
          {getConsequences()}
        </div>

        {/* Action Buttons */}
        <div className="superadmin-confirm-actions">
          <button
            type="button"
            className="superadmin-cancel-button"
            disabled={isDeleting}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="superadmin-delete-confirm"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            {isDeleting
              ? "Deleting…"
              : `Delete ${getTitle()}`}
          </button>
        </div>
      </section>
    </div>
  );
}
