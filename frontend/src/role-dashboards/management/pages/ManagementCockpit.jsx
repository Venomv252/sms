import React, { useEffect, useState } from 'react';
import { apiGet } from '../../../api';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Users, DollarSign, Bus, Shield, AlertTriangle, CheckCircle,
  TrendingUp, Bell, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Activity, BookOpen, Truck, Heart, Calendar, FileText, Loader
} from 'lucide-react';

export default function ManagementCockpit() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiGet('/management/dashboard/statistics');
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', flexDirection: 'column', gap: '12px' }}>
        <Loader size={32} className="spinner" />
        <div className="text-muted">Loading dashboard statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert-error" style={{ margin: '20px 0' }}>
        <AlertCircle size={18} />
        <span>{error}</span>
      </div>
    );
  }

  if (!data) return null;

  const {
    school,
    enrollment,
    staffing,
    academic,
    fees,
    attendance,
    recent,
  } = data;
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-green" style={{ fontSize: '11px', padding: '3px 10px' }}>
            🏛 GOVERNANCE TIER 1
          </span>
          <span className="badge badge-blue">AY {academic.academicYear}</span>
          <span className="badge badge-gray">{school.code}</span>
        </div>
        <h1 className="page-title">Institutional Executive Cockpit &<br />Administrative Oversight</h1>
        <p className="page-desc">
          District-level governance of {enrollment.total} students, {staffing.totalTeachers} faculty members, {staffing.totalSupportStaff} support staff, campus operations & statutory compliance for AY {academic.academicYear}.
        </p>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm">📣 Demand Notice</button>
          <button className="btn btn-secondary btn-sm">🚌 Issue TC / Bonafide</button>
          <button className="btn btn-danger btn-sm">🚨 Emergency Broadcast</button>
          <button className="btn btn-primary btn-sm">📊 Report Dossier</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid-5 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Enrollment / Capacity</div>
          <div className="stat-card-value">{enrollment.total.toLocaleString()}</div>
          <div className="stat-card-sub">
            of {enrollment.capacity.toLocaleString()} &nbsp;
            <span className="stat-card-change change-up">{enrollment.percentage}% Occ.</span>
          </div>
          <div className="stat-card-sub mt-2 text-xs text-muted">
            {enrollment.capacity - enrollment.total} Available Seats
          </div>
          <div className="mt-2">
            <div className="progress">
              <div className="progress-bar progress-green" style={{ width: `${enrollment.percentage}%` }} />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-label">Staffing Overview</div>
          <div className="stat-card-value">{staffing.totalStaff}</div>
          <div className="stat-card-sub">
            Total Staff &nbsp;
            <span className="stat-card-change change-up">Active</span>
          </div>
          <div className="stat-card-sub mt-2 text-xs text-muted">
            {staffing.totalTeachers} Teachers • {staffing.totalSupportStaff} Support
          </div>
          <div className="mt-2">
            <div className="progress">
              <div className="progress-bar progress-blue" style={{ width: '95%' }} />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-label">Fee Collection Status</div>
          <div className="stat-card-value text-green">₹{(fees.collected / 1000).toFixed(1)}k</div>
          <div className="stat-card-sub">
            of ₹{(fees.total / 1000).toFixed(1)}k &nbsp;
            <span className="stat-card-change change-up">{fees.collectionPercentage}%</span>
          </div>
          <div className="stat-card-sub mt-2 text-xs text-muted">
            Pending: ₹{(fees.pending / 1000).toFixed(1)}k
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-label">Academic Overview</div>
          <div className="stat-card-value">{academic.totalClasses}</div>
          <div className="stat-card-sub">
            Active Classes &nbsp;
            <span className="stat-card-change change-up">AY {academic.academicYear}</span>
          </div>
          <div className="stat-card-sub mt-2 text-xs text-muted">
            {academic.totalSubjects} Subjects Offered
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-label">Attendance Today</div>
          <div className="stat-card-value">
            {attendance.today.present}/{attendance.today.total}
          </div>
          <div className="stat-card-sub">
            Students Present &nbsp;
            <span className={`stat-card-change ${attendance.today.percentage >= 80 ? 'change-up' : 'change-down'}`}>
              {attendance.today.percentage}%
            </span>
          </div>
          <div className="stat-card-sub mt-2 text-xs text-muted">
            {attendance.today.total > 0 ? 'Attendance Recorded' : 'No records today'}
          </div>
          {attendance.today.total > 0 && (
            <div className="mt-2">
              <div className="progress">
                <div className="progress-bar progress-green" style={{ width: `${attendance.today.percentage}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid-2 mb-4">
        {/* Fee Collection */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Fee Collection & Defaulter Governance</span>
            <div className="flex gap-2">
              <span className="badge badge-blue">Collection {fees.collectionPercentage}%</span>
              <span className="badge badge-green">Total ₹{(fees.total / 1000).toFixed(1)}k</span>
            </div>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">
              Total receivable: ₹{fees.total.toLocaleString()} | Collected: ₹{fees.collected.toLocaleString()}
            </div>
            <div className="grid-2 mb-3">
              <div>
                <div className="text-xs text-muted">COLLECTED</div>
                <div className="font-bold text-green" style={{ fontSize: '20px' }}>
                  ₹{(fees.collected / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-muted">{fees.collectionPercentage}% of total</div>
              </div>
              <div>
                <div className="text-xs text-muted">PENDING</div>
                <div className="font-bold text-red" style={{ fontSize: '20px' }}>
                  ₹{(fees.pending / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-muted">Outstanding fees</div>
              </div>
            </div>
            
            {fees.byStatus.length > 0 ? (
              <>
                <div className="divider" />
                <div className="text-xs font-bold mb-2">Fee Status Breakdown</div>
                {fees.byStatus.map((status) => (
                  <div key={status.status} className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`badge ${
                        status.status === 'PAID' ? 'badge-green' :
                        status.status === 'OVERDUE' ? 'badge-red' : 'badge-yellow'
                      }`}>
                        {status.status}
                      </span>
                      <span className="text-xs text-muted">{status.count} records</span>
                    </div>
                    <span className="text-xs font-bold">₹{status.amount.toLocaleString()}</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-muted text-xs py-3">No fee records available</div>
            )}
          </div>
        </div>

        {/* Staff & Support Operations */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Staff & Support Operations</span>
            <button className="btn btn-secondary btn-sm">Resource Plan</button>
          </div>
          <div className="card-body">
            <div className="grid-2 mb-3">
              <div className="metric-box">
                <div className="text-xs text-muted">Faculty & Teachers</div>
                <div className="font-bold text-lg">{staffing.totalTeachers}</div>
                <span className="badge badge-green">Active</span>
              </div>
              <div className="metric-box">
                <div className="text-xs text-muted">Support Staff</div>
                <div className="font-bold text-lg">{staffing.totalSupportStaff}</div>
                <span className="badge badge-green">Active</span>
              </div>
              <div className="metric-box">
                <div className="text-xs text-muted">Total Staff</div>
                <div className="font-bold text-lg">{staffing.totalStaff}</div>
                <span className="badge badge-blue">All Roles</span>
              </div>
              <div className="metric-box">
                <div className="text-xs text-muted">Active Classes</div>
                <div className="font-bold text-lg">{academic.totalClasses}</div>
                <span className="badge badge-gray">Academic</span>
              </div>
            </div>
            <div className="divider" />
            <div className="grid-2">
              <div className="metric-box">
                <div className="text-xs text-muted">Academic Year</div>
                <div className="font-semibold">{academic.academicYear}</div>
                <div className="text-xs">Current session</div>
              </div>
              <div className="metric-box">
                <div className="text-xs text-muted">Total Subjects</div>
                <div className="font-semibold">{academic.totalSubjects}</div>
                <div className="text-xs">Subjects offered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2 mb-4">
        {/* Recent Student Registrations */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Student Registrations</span>
            <span className="badge badge-blue">{recent.students.length} New</span>
          </div>
          <div className="card-body">
            {recent.students.length > 0 ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll No.</th>
                      <th>Class</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.students.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <span className="font-semibold">{student.name}</span>
                        </td>
                        <td className="text-muted">{student.rollNumber}</td>
                        <td>
                          <span className="badge badge-gray">
                            {student.grade}-{student.section}
                          </span>
                        </td>
                        <td className="text-xs text-muted">
                          {new Date(student.registeredAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted text-xs py-4">
                No recent student registrations
              </div>
            )}
          </div>
        </div>

        {/* Recent Notices & Homework */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Notices & Updates</span>
            <span className="badge badge-green">{recent.notices.length} Active</span>
          </div>
          <div className="card-body">
            <div className="text-xs font-bold mb-2">📢 Latest Notices</div>
            {recent.notices.length > 0 ? (
              recent.notices.map((notice) => (
                <div key={notice.id} className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{notice.title}</div>
                    <div className="text-xs text-muted">
                      {new Date(notice.publishDate).toLocaleDateString()} • {notice.category}
                    </div>
                  </div>
                  <span className={`badge ${
                    notice.priority === 'HIGH' ? 'badge-red' :
                    notice.priority === 'MEDIUM' ? 'badge-yellow' : 'badge-gray'
                  }`}>
                    {notice.priority}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-muted text-xs py-2 mb-3">No active notices</div>
            )}

            <div className="divider" />
            
            <div className="text-xs font-bold mb-2">📚 Recent Homework</div>
            {recent.homework.length > 0 ? (
              recent.homework.map((hw) => (
                <div key={hw.id} className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-semibold text-xs">{hw.title}</div>
                    <div className="text-xs text-muted">
                      {hw.subject} • {hw.class}
                    </div>
                  </div>
                  <div className="text-xs text-muted">
                    Due: {new Date(hw.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted text-xs py-2">No recent homework</div>
            )}
          </div>
        </div>
      </div>

      {/* School Information Summary */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">🏫 School Information & Overview</span>
          <span className="badge badge-green">Active</span>
        </div>
        <div className="card-body">
          <div className="grid-4">
            <div className="metric-box">
              <div className="text-xs text-muted mb-1">School Name</div>
              <div className="font-semibold text-sm">{school.name}</div>
              <div className="text-xs text-muted">Code: {school.code}</div>
            </div>
            <div className="metric-box">
              <div className="text-xs text-muted mb-1">Total Students</div>
              <div className="font-bold" style={{ fontSize: '20px' }}>{enrollment.total}</div>
              <span className="badge badge-blue">Enrolled</span>
            </div>
            <div className="metric-box">
              <div className="text-xs text-muted mb-1">Total Staff</div>
              <div className="font-bold" style={{ fontSize: '20px' }}>{staffing.totalStaff}</div>
              <span className="badge badge-green">Active</span>
            </div>
            <div className="metric-box">
              <div className="text-xs text-muted mb-1">Academic Year</div>
              <div className="font-semibold text-sm">{academic.academicYear}</div>
              <div className="text-xs text-muted">{academic.totalClasses} Classes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
