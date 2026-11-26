import React, { useState, useEffect } from "react";
import { Wallet, Plus, Download, Edit, DollarSign, Calendar, Users, TrendingUp } from "lucide-react";
import { apiGet, apiPost, apiPatch } from "../../../api.js";

export default function SalaryManagement({ setError, setMessage }) {
  const [employees, setEmployees] = useState([]);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("employees"); // employees | records | payroll
  const [showPaySalaryModal, setShowPaySalaryModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "employees") {
        const response = await apiGet("/accountant/employees");
        setEmployees(response.data || []);
      } else if (activeTab === "records") {
        const response = await apiGet("/accountant/salary-records");
        setSalaryRecords(response.data || []);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handlePaySalary = (employee) => {
    setSelectedEmployee(employee);
    setShowPaySalaryModal(true);
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><Wallet size={19} /> Employee Salary Management</h2>
            <p>Manage employee salaries, payroll, and payment records</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="accountant-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <Users size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Employees</span>
              <span className="stat-value">{employees.length}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <DollarSign size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Monthly Payroll</span>
              <span className="stat-value">₹{employees.reduce((sum, emp) => sum + (emp.salary || 0), 0).toLocaleString()}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <Calendar size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Paid This Month</span>
              <span className="stat-value">{salaryRecords.filter(r => {
                const date = new Date(r.paymentDate);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <TrendingUp size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Pending Payments</span>
              <span className="stat-value">{employees.length - salaryRecords.filter(r => {
                const date = new Date(r.paymentDate);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="accountant-tabs" style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--rp-border)', marginBottom: '20px' }}>
          <button 
            className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
            style={{
              padding: '12px 20px',
              background: activeTab === "employees" ? 'var(--rp-primary)' : 'transparent',
              color: activeTab === "employees" ? 'white' : 'var(--rp-text)',
              border: 'none',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <Users size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Employees
          </button>
          <button 
            className={`tab-button ${activeTab === "records" ? "active" : ""}`}
            onClick={() => setActiveTab("records")}
            style={{
              padding: '12px 20px',
              background: activeTab === "records" ? 'var(--rp-primary)' : 'transparent',
              color: activeTab === "records" ? 'white' : 'var(--rp-text)',
              border: 'none',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <Calendar size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Payment Records
          </button>
          <button 
            className={`tab-button ${activeTab === "payroll" ? "active" : ""}`}
            onClick={() => setActiveTab("payroll")}
            style={{
              padding: '12px 20px',
              background: activeTab === "payroll" ? 'var(--rp-primary)' : 'transparent',
              color: activeTab === "payroll" ? 'white' : 'var(--rp-text)',
              border: 'none',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <Wallet size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Process Payroll
          </button>
        </div>

        {/* Employees Tab */}
        {activeTab === "employees" && (
          <div className="accountant-table-wrapper">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
                Loading employees...
              </div>
            ) : employees.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
                <Users size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p>No employees found</p>
              </div>
            ) : (
              <table className="accountant-data-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Monthly Salary</th>
                    <th>Bank Account</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee => (
                    <tr key={employee.id}>
                      <td><strong>{employee.employeeId}</strong></td>
                      <td>{employee.name}</td>
                      <td>{employee.role}</td>
                      <td>{employee.department}</td>
                      <td><strong>₹{employee.salary?.toLocaleString() || '0'}</strong></td>
                      <td>{employee.bankAccount || '-'}</td>
                      <td>
                        <span className={`status-badge status-${employee.status?.toLowerCase() || 'active'}`}>
                          {employee.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="icon-button"
                            title="Pay Salary"
                            onClick={() => handlePaySalary(employee)}
                          >
                            <DollarSign size={16} />
                          </button>
                          <button 
                            className="icon-button"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Payment Records Tab */}
        {activeTab === "records" && (
          <div className="accountant-table-wrapper">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
                Loading records...
              </div>
            ) : salaryRecords.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
                <Calendar size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p>No payment records found</p>
              </div>
            ) : (
              <table className="accountant-data-table">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Employee</th>
                    <th>Month/Year</th>
                    <th>Gross Salary</th>
                    <th>Deductions</th>
                    <th>Net Pay</th>
                    <th>Payment Date</th>
                    <th>Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryRecords.map(record => (
                    <tr key={record.id}>
                      <td><strong>{record.paymentId}</strong></td>
                      <td>{record.employeeName}</td>
                      <td>{record.month}/{record.year}</td>
                      <td>₹{record.grossSalary?.toLocaleString()}</td>
                      <td>₹{record.deductions?.toLocaleString() || '0'}</td>
                      <td><strong>₹{record.netPay?.toLocaleString()}</strong></td>
                      <td>{new Date(record.paymentDate).toLocaleDateString()}</td>
                      <td>{record.paymentMethod}</td>
                      <td>
                        <button 
                          className="icon-button"
                          title="Download Payslip"
                          onClick={() => window.location.href = `/api/accountant/salary/${record.id}/payslip`}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Process Payroll Tab */}
        {activeTab === "payroll" && (
          <div style={{ padding: '20px', background: 'var(--rp-surface)', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px' }}>Process Monthly Payroll</h3>
            <p style={{ color: 'var(--rp-muted)', marginBottom: '24px' }}>
              Select a month and year to process payroll for all employees
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', maxWidth: '600px' }}>
              <select>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
              <button className="director-submit">
                Process Payroll
              </button>
            </div>
          </div>
        )}
      </section>

      {showPaySalaryModal && selectedEmployee && (
        <PaySalaryModal 
          employee={selectedEmployee}
          onClose={() => {
            setShowPaySalaryModal(false);
            setSelectedEmployee(null);
          }}
          onSuccess={() => {
            setShowPaySalaryModal(false);
            setSelectedEmployee(null);
            fetchData();
            setMessage("Salary payment recorded successfully");
          }}
          setError={setError}
        />
      )}
    </>
  );
}

function PaySalaryModal({ employee, onClose, onSuccess, setError }) {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    employeeId: employee.id,
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    grossSalary: employee.salary || 0,
    deductions: 0,
    bonus: 0,
    paymentMethod: "bank_transfer",
    paymentDate: new Date().toISOString().split('T')[0],
    remarks: ""
  });

  const netPay = formData.grossSalary - formData.deductions + (formData.bonus || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      setError("Salary payment API not yet implemented");
      // await apiPost("/accountant/salary/pay", { ...formData, netPay });
      // onSuccess();
    } catch (err) {
      setError(err.message || "Failed to process salary payment");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h3><Wallet size={20} /> Pay Salary - {employee.name}</h3>
          <button onClick={onClose} className="modal-close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="director-create-grid">
          <label>
            Month *
            <select 
              value={formData.month} 
              onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
              required
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>

          <label>
            Year *
            <select 
              value={formData.year} 
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              required
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </label>

          <label>
            Gross Salary (₹) *
            <input
              type="number"
              value={formData.grossSalary}
              onChange={(e) => setFormData(prev => ({ ...prev, grossSalary: parseFloat(e.target.value) }))}
              required
              min="0"
              step="0.01"
            />
          </label>

          <label>
            Deductions (₹)
            <input
              type="number"
              value={formData.deductions}
              onChange={(e) => setFormData(prev => ({ ...prev, deductions: parseFloat(e.target.value) || 0 }))}
              min="0"
              step="0.01"
            />
          </label>

          <label>
            Bonus (₹)
            <input
              type="number"
              value={formData.bonus}
              onChange={(e) => setFormData(prev => ({ ...prev, bonus: parseFloat(e.target.value) || 0 }))}
              min="0"
              step="0.01"
            />
          </label>

          <label>
            Net Pay (₹)
            <input
              type="number"
              value={netPay}
              readOnly
              style={{ background: '#f0f0f0', fontWeight: 'bold' }}
            />
          </label>

          <label>
            Payment Method *
            <select 
              value={formData.paymentMethod} 
              onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
              required
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </label>

          <label>
            Payment Date *
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
              required
            />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            Remarks
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              rows={2}
              placeholder="Optional remarks..."
            />
          </label>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="director-submit" style={{ background: 'var(--rp-border)' }}>
              Cancel
            </button>
            <button type="submit" className="director-submit">
              Process Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
