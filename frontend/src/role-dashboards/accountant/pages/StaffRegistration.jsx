import React, { useState } from "react";
import { Briefcase, Calendar, Phone, Mail, Hash, User, MapPin, Save } from "lucide-react";
import { apiPost } from "../../../api.js";
import CredentialDisplay from "../../../components/CredentialDisplay.jsx";

export default function StaffRegistration({ setError, setMessage }) {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    temporaryPassword: "",
    employeeId: "",
    role: "",
    department: "",
    designation: "",
    phoneNumber: "",
    address: "",
    joiningDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await apiPost("/accountant/staff", formData);
      
      setMessage("Staff account created successfully!");
      setCredentials({
        username: response.credentials.username,
        password: response.credentials.password,
        role: response.staff.role,
        name: response.staff.name,
        employeeId: response.staff.employeeId,
        department: response.staff.department
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        temporaryPassword: "",
        employeeId: "",
        role: "",
        department: "",
        designation: "",
        phoneNumber: "",
        address: "",
        joiningDate: ""
      });
    } catch (err) {
      setError(err.message || "Failed to create staff account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><Briefcase size={19} /> Staff Registration</h2>
            <p>Create a new staff/management account with login credentials</p>
          </div>
        </div>

        <form className="director-create-grid" onSubmit={handleSubmit}>
          <label>
            First Name *
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
          </label>

          <label>
            Last Name *
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter last name"
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="staff@example.com"
            />
          </label>

          <label>
            Phone Number *
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="+91 1234567890"
            />
          </label>

          <label>
            Username *
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              placeholder="staff_username"
            />
          </label>

          <label>
            Temporary Password *
            <input
              type="password"
              name="temporaryPassword"
              value={formData.temporaryPassword}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Min 8 characters"
            />
          </label>

          <label>
            Employee ID *
            <input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              placeholder="e.g., STAFF2024001"
            />
          </label>

          <label>
            Role/Position *
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="ADMIN">Administrator</option>
              <option value="LIBRARIAN">Librarian</option>
              <option value="LAB_ASSISTANT">Lab Assistant</option>
              <option value="OFFICE_STAFF">Office Staff</option>
              <option value="SECURITY">Security</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="TRANSPORT">Transport</option>
              <option value="MANAGEMENT">Management</option>
              <option value="OTHER">Other</option>
            </select>
          </label>

          <label>
            Department *
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="e.g., Administration, Finance"
            />
          </label>

          <label>
            Designation *
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              placeholder="e.g., Assistant Manager, Clerk"
            />
          </label>

          <label>
            Joining Date *
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </label>

          <label className="school-address-field">
            Address *
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              placeholder="Enter full address"
            />
          </label>

          <button className="director-submit" disabled={loading} style={{ gridColumn: '1 / -1' }}>
            <Save size={16} />
            {loading ? "Creating Staff Account..." : "Create Staff Account"}
          </button>
        </form>
      </section>

      {credentials && (
        <CredentialDisplay
          username={credentials.username}
          password={credentials.password}
          role={credentials.role}
          name={credentials.name}
          employeeId={credentials.employeeId}
          department={credentials.department}
          onClose={() => setCredentials(null)}
        />
      )}
    </>
  );
}
