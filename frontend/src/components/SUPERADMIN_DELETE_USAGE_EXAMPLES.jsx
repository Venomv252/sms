/**
 * SuperAdminDeleteConfirmation - Usage Examples
 * 
 * This file demonstrates how to use SuperAdminDeleteConfirmation
 * for different types: school, director, and principal.
 */

import React, { useState } from 'react';
import SuperAdminDeleteConfirmation from './SuperAdminDeleteConfirmation.jsx';
import { apiDelete } from '../api.js';

// ============================================================
// EXAMPLE 1: Delete School
// ============================================================
export function DeleteSchoolExample() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      await apiDelete(`/platform/superadmin/schools/${deleteConfirmation.item.id}`);
      setDeleteConfirmation(null);
      // Refresh schools list
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingRecord(false);
    }
  };

  const school = { id: '123', name: 'ABC High School' };

  return (
    <>
      <button onClick={() => setDeleteConfirmation({ type: 'school', item: school })}>
        Delete School
      </button>

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

// ============================================================
// EXAMPLE 2: Delete Director
// ============================================================
export function DeleteDirectorExample() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      await apiDelete(`/platform/superadmin/directors/${deleteConfirmation.item.id}`);
      setDeleteConfirmation(null);
      // Refresh directors list
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingRecord(false);
    }
  };

  const director = {
    id: '456',
    firstName: 'John',
    lastName: 'Doe'
  };

  return (
    <>
      <button onClick={() => setDeleteConfirmation({ type: 'director', item: director })}>
        Delete Director
      </button>

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

// ============================================================
// EXAMPLE 3: Delete Principal (NEW!)
// ============================================================
export function DeletePrincipalExample() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      await apiDelete(`/platform/director/schools/${schoolId}/principals/${deleteConfirmation.item.id}`);
      setDeleteConfirmation(null);
      // Refresh principals list
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingRecord(false);
    }
  };

  // Principal with name property
  const principal1 = {
    id: '789',
    name: 'Jane Smith',
    email: 'jane@school.com',
    username: 'janesmith'
  };

  // Principal with firstName and lastName
  const principal2 = {
    id: '790',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert@school.com',
    username: 'robertj'
  };

  return (
    <>
      {/* Works with 'name' property */}
      <button onClick={() => setDeleteConfirmation({ type: 'principal', item: principal1 })}>
        Delete Principal 1
      </button>

      {/* Works with 'firstName' + 'lastName' */}
      <button onClick={() => setDeleteConfirmation({ type: 'principal', item: principal2 })}>
        Delete Principal 2
      </button>

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

// ============================================================
// EXAMPLE 4: Combined - Multiple Types in One Component
// ============================================================
export function CombinedDeleteExample() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      let endpoint = '';
      
      if (deleteConfirmation.type === 'school') {
        endpoint = `/platform/superadmin/schools/${deleteConfirmation.item.id}`;
      } else if (deleteConfirmation.type === 'director') {
        endpoint = `/platform/superadmin/directors/${deleteConfirmation.item.id}`;
      } else if (deleteConfirmation.type === 'principal') {
        endpoint = `/platform/director/schools/${schoolId}/principals/${deleteConfirmation.item.id}`;
      }
      
      await apiDelete(endpoint);
      setDeleteConfirmation(null);
      
      // Refresh appropriate list based on type
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingRecord(false);
    }
  };

  const school = { id: '1', name: 'ABC School' };
  const director = { id: '2', firstName: 'John', lastName: 'Doe' };
  const principal = { id: '3', name: 'Jane Smith' };

  return (
    <>
      <button onClick={() => setDeleteConfirmation({ type: 'school', item: school })}>
        Delete School
      </button>
      
      <button onClick={() => setDeleteConfirmation({ type: 'director', item: director })}>
        Delete Director
      </button>
      
      <button onClick={() => setDeleteConfirmation({ type: 'principal', item: principal })}>
        Delete Principal
      </button>

      {/* Single modal handles all three types */}
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

// ============================================================
// EXAMPLE 5: Using in DirectorDashboard for Principal
// ============================================================
export function DirectorPrincipalDeleteExample({ schoolId, principals, onPrincipalDeleted }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);

  const confirmDelete = async () => {
    setDeletingRecord(true);
    try {
      await apiDelete(
        `/platform/director/schools/${schoolId}/principals/${deleteConfirmation.item.id}`
      );
      
      setDeleteConfirmation(null);
      
      // Callback to refresh principals list
      if (onPrincipalDeleted) {
        onPrincipalDeleted(deleteConfirmation.item.id);
      }
    } catch (err) {
      console.error('Failed to delete principal:', err);
      // Show error to user
    } finally {
      setDeletingRecord(false);
    }
  };

  return (
    <>
      <div className="principals-list">
        {principals.map(principal => (
          <div key={principal.id} className="principal-card">
            <h3>{principal.name}</h3>
            <p>{principal.email}</p>
            <button
              onClick={() => setDeleteConfirmation({ type: 'principal', item: principal })}
              className="delete-button"
            >
              Delete Principal
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
