import React, { useState } from "react";
import { GraduationCap, Calendar, Phone, Mail, Hash, User, MapPin, Briefcase, Save } from "lucide-react";
import { apiPost } from "../../../api.js";
import CredentialDisplay from "../../../components/CredentialDisplay.jsx";

export default function TeacherRegistration({ setError, setMessage }) {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    temporaryPassword: "",
    employeeId: "",
    department: "",
    designation: "",
    qualification: "",
    experience: "",
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
      const response = await apiPost("/accountant/teachers", formData);
      
      setMessage("Teacher account created successfully!");
      setCredentials({
        username: response.credentials.username,
        password: response.credentials.password,
        role: "Teacher",
        name: response.teacher.name,
        employeeId: response.teacher.employeeId,
        department: response.teacher.department
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        temporaryPassword: "",
        employeeId: "",
        department: "",
        designation: "",
        qualification: "",
        experience: "",
        phoneNumber: "",
        address: "",
        joiningDate: ""
      });
    } catch (err) {
      setError(err.message || "Failed to create teacher account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><GraduationCap size={19} /> Teacher Registration</h2>
            <p>Create a new teacher account with login credentials</p>
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
              placeholder="teacher@example.com"
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
              placeholder="teacher_username"
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
              placeholder="e.g., EMP2024001"
            />
          </label>

          <label>
            Department *
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="e.g., Mathematics, Science"
            />
          </label>

          <label>
            Designation *
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              placeholder="e.g., Senior Teacher, Subject Head"
            />
          </label>

          <label>
            Qualification *
            <input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              placeholder="e.g., M.Sc, B.Ed"
            />
          </label>

          <label>
            Experience (Years) *
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              placeholder="e.g., 5"
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
            {loading ? "Creating Teacher Account..." : "Create Teacher Account"}
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
