import React, { useState } from "react";
import { BarChart3, Download, Calendar, FileText } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Reports({ setError, setMessage }) {
  const [reportType, setReportType] = useState("attendance");
  const [generating, setGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    grade: "",
    section: "",
    academicYear: "",
    term: "",
    status: "",
  });

  const generateReport = async () => {
    setGenerating(true);
    setError("");
    setReportData(null);
    
    try {
      let endpoint = "";
      let params = new URLSearchParams();

      if (reportType === "attendance") {
        if (!filters.startDate || !filters.endDate) {
          setError("Start date and end date are required for attendance report");
          setGenerating(false);
          return;
        }
        endpoint = "/principal/reports/attendance";
        params.append("startDate", filters.startDate);
        params.append("endDate", filters.endDate);
        if (filters.grade) params.append("grade", filters.grade);
        if (filters.section) params.append("section", filters.section);
      } else if (reportType === "fee-collection") {
        endpoint = "/principal/reports/fee-collection";
        if (filters.academicYear) params.append("academicYear", filters.academicYear);
        if (filters.term) params.append("term", filters.term);
        if (filters.status) params.append("status", filters.status);
      }

      const data = await apiGet(`${endpoint}?${params}`);
      setReportData(data);
      setMessage("Report generated successfully");
    } catch (err) {
      setError(err.message || "Unable to generate report");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Reports & Analytics</h2>
          <p>Generate comprehensive reports for attendance, fees, and academic performance</p>
        </div>
      </section>

      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><BarChart3 size={19} /> Report Generator</h2>
            <p>Select report type and configure filters</p>
          </div>
        </div>

        <div className="principal-report-selector">
          <label>
            Report Type *
            <select value={reportType} onChange={(e) => { setReportType(e.target.value); setReportData(null); }}>
              <option value="attendance">Attendance Report</option>
              <option value="fee-collection">Fee Collection Report</option>
            </select>
          </label>
        </div>

        {reportType === "attendance" && (
          <div className="principal-form-grid" style={{ marginTop: "20px" }}>
            <label>
              Start Date *
              <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
            </label>
            <label>
              End Date *
              <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
            </label>
            <label>
              Grade (Optional)
              <select value={filters.grade} onChange={(e) => setFilters({ ...filters, grade: e.target.value })}>
                <option value="">All Grades</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                ))}
              </select>
            </label>
            <label>
              Section (Optional)
              <select value={filters.section} onChange={(e) => setFilters({ ...filters, section: e.target.value })}>
                <option value="">All Sections</option>
                {["A", "B", "C", "D", "E"].map(s => (
                  <option key={s} value={s}>Section {s}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {reportType === "fee-collection" && (
          <div className="principal-form-grid" style={{ marginTop: "20px" }}>
            <label>
              Academic Year
              <input type="text" placeholder="e.g., 2024-25" value={filters.academicYear} onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })} />
            </label>
            <label>
              Term
              <select value={filters.term} onChange={(e) => setFilters({ ...filters, term: e.target.value })}>
                <option value="">All Terms</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
                <option value="Annual">Annual</option>
              </select>
            </label>
            <label>
              Payment Status
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All Status</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </label>
          </div>
        )}

        <button className="director-submit" onClick={generateReport} disabled={generating} style={{ marginTop: "20px" }}>
          <FileText size={16} /> {generating ? "Generating..." : "Generate Report"}
        </button>

        {reportData && (
          <div className="principal-report-results">
            <div className="principal-report-header">
              <h3>
                <Calendar size={18} />
                {reportType === "attendance" ? "Attendance Report" : "Fee Collection Report"}
              </h3>
              <button className="principal-action-btn">
                <Download size={14} /> Export PDF
              </button>
            </div>

            {reportType === "attendance" && reportData.data && (
              <>
                <div className="principal-report-summary">
                  <div>
                    <span>Date Range:</span>
                    <strong>{reportData.data.dateRange.startDate} to {reportData.data.dateRange.endDate}</strong>
                  </div>
                  {reportData.data.filters.grade && (
                    <div>
                      <span>Grade:</span>
                      <strong>{reportData.data.filters.grade}</strong>
                    </div>
                  )}
                  {reportData.data.filters.section && (
                    <div>
                      <span>Section:</span>
                      <strong>{reportData.data.filters.section}</strong>
                    </div>
                  )}
                </div>

                <div className="platform-stat-table">
                  <div className="platform-stat-row heading">
                    <span>Student</span>
                    <span>Class</span>
                    <span>Present</span>
                    <span>Absent</span>
                    <span>Rate</span>
                  </div>
                  {reportData.data.report.map((item, index) => (
                    <div className="platform-stat-row" key={index}>
                      <span>
                        <strong>{item.studentName}</strong>
                        <small>{item.rollNumber}</small>
                      </span>
                      <b>{item.class}</b>
                      <b className="text-success">{item.present}</b>
                      <b className="text-danger">{item.absent}</b>
                      <b className={item.attendanceRate >= 75 ? "text-success" : "text-warning"}>{item.attendanceRate}%</b>
                    </div>
                  ))}
                </div>
              </>
            )}

            {reportType === "fee-collection" && reportData.data && (
              <>
                <div className="principal-report-summary">
                  <div>
                    <span>Total Amount:</span>
                    <strong>₹{reportData.data.summary.totalAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span>Paid Amount:</span>
                    <strong className="text-success">₹{reportData.data.summary.paidAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span>Pending Amount:</span>
                    <strong className="text-warning">₹{reportData.data.summary.pendingAmount.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="platform-stat-table">
                  <div className="platform-stat-row heading">
                    <span>Student</span>
                    <span>Class</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Due Date</span>
                  </div>
                  {reportData.data.details.slice(0, 50).map((item, index) => (
                    <div className="platform-stat-row" key={index}>
                      <span>
                        <strong>{item.studentName}</strong>
                        <small>{item.rollNumber}</small>
                      </span>
                      <b>{item.class}</b>
                      <b>₹{item.amount.toLocaleString("en-IN")}</b>
                      <b className={item.status === "PAID" ? "text-success" : item.status === "OVERDUE" ? "text-danger" : "text-warning"}>
                        {item.status}
                      </b>
                      <span><small>{new Date(item.dueDate).toLocaleDateString("en-IN")}</small></span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
}
