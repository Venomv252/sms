import React, { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  X,
  Save,
  Edit2,
  Trash2,
} from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../../api.js";

export default function AcademicCalendar({ setError, setMessage }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "HOLIDAY",
    startDate: "",
    endDate: "",
    notifyStaff: false,
    notifyStudents: false,
    notifyParents: false,
  });

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        ...(typeFilter && { eventType: typeFilter }),
      });

      const data = await apiGet(`/principal/academic-calendar?${params}`);
      setEvents(data || []);
    } catch (err) {
      setError(err.message || "Unable to load academic calendar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [typeFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      if (editingEvent) {
        await apiPut(`/principal/academic-calendar/${editingEvent.id}`, form);
        setMessage("Event updated successfully");
      } else {
        await apiPost("/principal/academic-calendar", form);
        setMessage("Event created successfully");
      }
      
      setForm({
        title: "",
        description: "",
        eventType: "HOLIDAY",
        startDate: "",
        endDate: "",
        notifyStaff: false,
        notifyStudents: false,
        notifyParents: false,
      });
      setShowForm(false);
      setEditingEvent(null);
      await loadEvents();
    } catch (err) {
      setError(err.message || "Unable to save event");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description || "",
      eventType: event.eventType,
      startDate: event.startDate.split("T")[0],
      endDate: event.endDate ? event.endDate.split("T")[0] : "",
      notifyStaff: event.notifyStaff,
      notifyStudents: event.notifyStudents,
      notifyParents: event.notifyParents,
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await apiDelete(`/principal/academic-calendar/${eventId}`);
      setMessage("Event deleted successfully");
      await loadEvents();
    } catch (err) {
      setError(err.message || "Unable to delete event");
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "HOLIDAY":
        return "event-holiday";
      case "EXAM":
        return "event-exam";
      case "SCHOOL_EVENT":
        return "event-school";
      case "EMERGENCY_CLOSURE":
        return "event-emergency";
      default:
        return "event-working";
    }
  };

  const groupEventsByMonth = (events) => {
    const grouped = {};
    events.forEach(event => {
      const month = new Date(event.startDate).toLocaleString("en-IN", { month: "long", year: "numeric" });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByMonth(events);

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <Calendar size={19} /> Academic Calendar
            </h2>
            <p>Manage holidays, examinations, events, and school closures</p>
          </div>
          <button onClick={() => { setShowForm(true); setEditingEvent(null); setForm({
            title: "", description: "", eventType: "HOLIDAY", startDate: "", endDate: "",
            notifyStaff: false, notifyStudents: false, notifyParents: false,
          }); }}>
            <Plus size={16} /> Add Event
          </button>
        </div>

        <div className="principal-search-filters">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Event Types</option>
            <option value="HOLIDAY">Holiday</option>
            <option value="WORKING_DAY">Working Day</option>
            <option value="EXAM">Examination</option>
            <option value="SCHOOL_EVENT">School Event</option>
            <option value="EMERGENCY_CLOSURE">Emergency Closure</option>
          </select>

          {typeFilter && (
            <button className="principal-filter-clear" onClick={() => setTypeFilter("")}>
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {loading && <div className="superadmin-loading">Loading calendar...</div>}

        {!loading && events.length > 0 && (
          <div className="principal-calendar-timeline">
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <div className="principal-calendar-month" key={month}>
                <h3 className="principal-month-header">{month}</h3>
                <div className="principal-events-list">
                  {monthEvents.map((event) => (
                    <div className={`principal-calendar-event ${getEventTypeColor(event.eventType)}`} key={event.id}>
                      <div className="principal-event-date">
                        <strong>{new Date(event.startDate).getDate()}</strong>
                        <span>{new Date(event.startDate).toLocaleString("en-IN", { month: "short" })}</span>
                      </div>
                      
                      <div className="principal-event-content">
                        <div className="principal-event-header">
                          <div>
                            <h4>{event.title}</h4>
                            <span className="principal-event-type">{event.eventType.replace("_", " ")}</span>
                          </div>
                          <div className="principal-event-actions">
                            <button
                              className="superadmin-icon-button"
                              onClick={() => handleEdit(event)}
                              title="Edit event"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              className="superadmin-icon-button danger"
                              onClick={() => handleDelete(event.id)}
                              title="Delete event"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {event.description && <p>{event.description}</p>}
                        
                        {event.endDate && event.endDate !== event.startDate && (
                          <small>Until: {new Date(event.endDate).toLocaleDateString("en-IN")}</small>
                        )}
                        
                        {(event.notifyStaff || event.notifyStudents || event.notifyParents) && (
                          <div className="principal-event-notifications">
                            {event.notifyStaff && <span className="principal-notify-badge">Staff</span>}
                            {event.notifyStudents && <span className="principal-notify-badge">Students</span>}
                            {event.notifyParents && <span className="principal-notify-badge">Parents</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="superadmin-empty">
            No calendar events found. Add your first event to start building the academic calendar.
          </div>
        )}
      </section>

      {showForm && (
        <div
          className="superadmin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false);
              setEditingEvent(null);
            }
          }}
        >
          <form className="superadmin-modal" onSubmit={handleSubmit}>
            <div className="superadmin-modal-heading">
              <h2>{editingEvent ? "Edit Event" : "Add Calendar Event"}</h2>
              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => { setShowForm(false); setEditingEvent(null); }}
              >
                <X size={18} />
              </button>
            </div>

            <label>
              Event Title *
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Summer Vacation"
              />
            </label>

            <label>
              Description
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Optional event details"
              />
            </label>

            <div className="principal-form-grid">
              <label>
                Event Type *
                <select
                  required
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                >
                  <option value="HOLIDAY">Holiday</option>
                  <option value="WORKING_DAY">Working Day</option>
                  <option value="EXAM">Examination</option>
                  <option value="SCHOOL_EVENT">School Event</option>
                  <option value="EMERGENCY_CLOSURE">Emergency Closure</option>
                </select>
              </label>

              <label>
                Start Date *
                <input
                  required
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </label>

              <label>
                End Date (Optional)
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </label>
            </div>

            <fieldset className="principal-notification-fieldset">
              <legend>Send Notifications</legend>
              <label className="principal-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.notifyStaff}
                  onChange={(e) => setForm({ ...form, notifyStaff: e.target.checked })}
                />
                <span>Notify All Staff</span>
              </label>
              <label className="principal-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.notifyStudents}
                  onChange={(e) => setForm({ ...form, notifyStudents: e.target.checked })}
                />
                <span>Notify All Students</span>
              </label>
              <label className="principal-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.notifyParents}
                  onChange={(e) => setForm({ ...form, notifyParents: e.target.checked })}
                />
                <span>Notify All Parents</span>
              </label>
            </fieldset>

            <button className="director-submit" disabled={saving}>
              <Save size={16} /> {saving ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
