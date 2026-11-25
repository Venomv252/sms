import React, { useState, useEffect } from "react";
import { Users, Phone, Mail, MapPin, Briefcase, Save, Search } from "lucide-react";
import { apiPost, apiGet } from "../../../api.js";
import CredentialDisplay from "../../../components/CredentialDisplay.jsx";

export default function ParentRegistration({ setError, setMessage }) {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    temporaryPassword: "",
    phoneNumber: "",
    address: "",
    occupation: "",
    studentId: ""
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoadingStudents(true);
    try {
      const data = await apiGet("/accountant/students");
      setStudents(data || []);
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const filteredStudents = students.filter(student =>
    studentSearch.trim() === "" ||
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === formData.studentId);

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
      const response = await apiPost("/accountant/parents", formData);
      
      setMessage("Parent account created and linked to student successfully!");
      setCredentials({
        username: response.credentials.username,
        password: response.credentials.password,
        role: "Parent",
        name: response.parent.name,
        phoneNumber: response.parent.phoneNumber,
        linkedStudent: response.linkedStudent
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        temporaryPassword: "",
        phoneNumber: "",
        address: "",
        occupation: "",
        studentId: ""
      });
      setStudentSearch("");
    } catch (err) {
      setError(err.message || "Failed to create parent account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><Users size={19} /> Parent/Guardian Registration</h2>
            <p>Create a parent account and link to a student</p>
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
              placeholder="parent@example.com"
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
              placeholder="parent_username"
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

          <label>
            Occupation (optional)
            <input
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g., Engineer, Doctor"
            />
          </label>

          <fieldset className="director-school-assignment" style={{ gridColumn: '1 / -1' }}>
            <legend>Link to Student *</legend>
            <p>Select the student this parent/guardian is associated with</p>

            {loadingStudents ? (
              <p style={{ textAlign: 'center', color: 'var(--rp-muted)', padding: '20px' }}>
                Loading students...
              </p>
            ) : (
              <>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rp-muted)' }} />
                  <input
                    className="school-assignment-search"
                    type="search"
                    placeholder="Search by student name or roll number..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    style={{ paddingLeft: '38px' }}
                  />
                </div>

                <div className="director-school-options" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.slice(0, 20).map((student) => (
                      <label key={student.id}>
                        <input
                          type="radio"
                          name="studentId"
                          value={student.id}
                          checked={formData.studentId === student.id}
                          onChange={handleChange}
                          required
                        />
                        <span>
                          <strong>{student.name}</strong>
                          <small>Roll: {student.rollNumber} | Class: {student.class}</small>
                        </span>
                      </label>
                    ))
                  ) : (
                    <small className="school-assignment-empty">
                      {studentSearch ? "No students match your search" : "No students available"}
                    </small>
                  )}
                </div>

                {selectedStudent && (
                  <div style={{ marginTop: '12px', padding: '12px', background: 'var(--rp-green-soft)', borderRadius: '8px' }}>
                    <small style={{ color: 'var(--rp-green)', fontWeight: 600 }}>
                      Selected: {selectedStudent.name} (Roll: {selectedStudent.rollNumber})
                    </small>
                  </div>
                )}
              </>
            )}
          </fieldset>

          <button className="director-submit" disabled={loading || !formData.studentId} style={{ gridColumn: '1 / -1' }}>
            <Save size={16} />
            {loading ? "Creating Parent Account..." : "Create Parent Account"}
          </button>
        </form>
      </section>

      {credentials && (
        <CredentialDisplay
          username={credentials.username}
          password={credentials.password}
          role={credentials.role}
          name={credentials.name}
          phoneNumber={credentials.phoneNumber}
          linkedStudent={credentials.linkedStudent}
          onClose={() => setCredentials(null)}
        />
      )}
    </>
  );
}
