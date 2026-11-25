import React, { useState } from "react";
import { UserPlus, Calendar, Phone, Mail, Hash, User, MapPin, Droplet, Save } from "lucide-react";
import { apiPost } from "../../../api.js";
import CredentialDisplay from "../../../components/CredentialDisplay.jsx";

export default function StudentRegistration({ setError, setMessage }) {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    temporaryPassword: "",
    rollNumber: "",
    grade: "",
    section: "",
    admissionNumber: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    bloodGroup: ""
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
      const response = await apiPost("/accountant/students", formData);
      
      setMessage("Student account created successfully!");
      setCredentials({
        username: response.credentials.username,
        password: response.credentials.password,
        role: "Student",
        name: response.student.name,
        rollNumber: response.student.rollNumber,
        admissionNumber: response.student.admissionNumber
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        temporaryPassword: "",
        rollNumber: "",
        grade: "",
        section: "",
        admissionNumber: "",
        dateOfBirth: "",
        address: "",
        phoneNumber: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        bloodGroup: ""
      });
    } catch (err) {
      setError(err.message || "Failed to create student account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><UserPlus size={19} /> Student Registration</h2>
            <p>Create a new student account with login credentials</p>
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
            Email (optional)
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
            />
          </label>

          <label>
            Phone Number (optional)
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
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
              placeholder="student_username"
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
            Roll Number *
            <input
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              placeholder="e.g., 2024001"
            />
          </label>

          <label>
            Admission Number *
            <input
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              required
              placeholder="e.g., ADM2024001"
            />
          </label>

          <label>
            Grade/Class *
            <input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              placeholder="e.g., 10"
            />
          </label>

          <label>
            Section *
            <input
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              maxLength={2}
              placeholder="e.g., A"
            />
          </label>

          <label>
            Date of Birth *
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Blood Group (optional)
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>

          <label className="school-address-field">
            Address (optional)
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="Enter full address"
            />
          </label>

          <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--rp-border)', paddingTop: '20px', marginTop: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--rp-text)' }}>Parent/Guardian Information (optional)</h3>
          </div>

          <label>
            Parent/Guardian Name
            <input
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Full name"
            />
          </label>

          <label>
            Parent Email
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="parent@example.com"
            />
          </label>

          <label>
            Parent Phone
            <input
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              placeholder="+91 1234567890"
            />
          </label>

          <button className="director-submit" disabled={loading} style={{ gridColumn: '1 / -1' }}>
            <Save size={16} />
            {loading ? "Creating Student Account..." : "Create Student Account"}
          </button>
        </form>
      </section>

      {credentials && (
        <CredentialDisplay
          username={credentials.username}
          password={credentials.password}
          role={credentials.role}
          name={credentials.name}
          rollNumber={credentials.rollNumber}
          admissionNumber={credentials.admissionNumber}
          onClose={() => setCredentials(null)}
        />
      )}
    </>
  );
}
