import React, { useEffect, useState } from "react";
import { PackageCheck, AlertTriangle, Wrench } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Inventory({ setError, setMessage }) {
  const [items, setItems] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("items");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(categoryFilter && { category: categoryFilter }),
      });

      const data = await apiGet(`/principal/inventory?${params}`);
      setItems(data.items || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const loadMaintenanceRequests = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });

      const data = await apiGet(`/principal/maintenance-requests?${params}`);
      setMaintenanceRequests(data.requests || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load maintenance requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "items") {
      loadItems();
    } else {
      loadMaintenanceRequests();
    }
  }, [view, page, categoryFilter, statusFilter]);

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <PackageCheck size={19} /> {view === "items" ? "Inventory Management" : "Maintenance Requests"}
            </h2>
            <p>
              {view === "items"
                ? "Track school assets, equipment, and infrastructure"
                : "Monitor and manage maintenance requests"}
            </p>
          </div>
          {pagination && <span className="superadmin-count">{pagination.total} {view === "items" ? "items" : "requests"}</span>}
        </div>

        <div className="principal-leave-filters">
          <button className={view === "items" ? "active" : ""} onClick={() => { setView("items"); setPage(1); }}>
            <PackageCheck size={14} /> Inventory
          </button>
          <button className={view === "maintenance" ? "active" : ""} onClick={() => { setView("maintenance"); setPage(1); }}>
            <Wrench size={14} /> Maintenance
          </button>
        </div>

        {view === "items" && (
          <div className="principal-search-filters" style={{ marginTop: "16px" }}>
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
              <option value="">All Categories</option>
              <option value="CLASSROOM">Classroom</option>
              <option value="LABORATORY">Laboratory</option>
              <option value="LIBRARY">Library</option>
              <option value="FURNITURE">Furniture</option>
              <option value="EQUIPMENT">Equipment</option>
              <option value="VEHICLE">Vehicle</option>
            </select>
          </div>
        )}

        {view === "maintenance" && (
          <div className="principal-search-filters" style={{ marginTop: "16px" }}>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        )}

        {loading && <div className="superadmin-loading">Loading...</div>}

        {!loading && view === "items" && items.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Item</span>
              <span>Category</span>
              <span>Location</span>
              <span>Quantity</span>
              <span>Condition</span>
            </div>

            {items.map((item) => (
              <div className="platform-stat-row" key={item.id}>
                <span>
                  <strong>{item.name}</strong>
                  {item.pendingMaintenance && (
                    <small className="text-warning">
                      <AlertTriangle size={12} /> Maintenance pending
                    </small>
                  )}
                </span>
                <b>{item.category}</b>
                <span><small>{item.location || "—"}</small></span>
                <b>{item.quantity}</b>
                <b className={item.condition === "EXCELLENT" || item.condition === "GOOD" ? "text-success" : item.condition === "DAMAGED" || item.condition === "POOR" ? "text-danger" : ""}>
                  {item.condition || "—"}
                </b>
              </div>
            ))}
          </div>
        )}

        {!loading && view === "maintenance" && maintenanceRequests.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Item</span>
              <span>Description</span>
              <span>Priority</span>
              <span>Status</span>
              <span>Cost</span>
            </div>

            {maintenanceRequests.map((req) => (
              <div className="platform-stat-row" key={req.id}>
                <span>
                  <strong>{req.itemName}</strong>
                  <small>{req.itemCategory} · {req.location}</small>
                </span>
                <span><small>{req.description}</small></span>
                <b className={req.priority === "URGENT" || req.priority === "HIGH" ? "text-danger" : req.priority === "NORMAL" ? "text-warning" : ""}>
                  {req.priority}
                </b>
                <b className={req.status === "COMPLETED" ? "text-success" : req.status === "IN_PROGRESS" ? "text-warning" : ""}>
                  {req.status}
                </b>
                <b>{req.cost ? `₹${Number(req.cost).toLocaleString("en-IN")}` : "—"}</b>
              </div>
            ))}
          </div>
        )}

        {!loading && items.length === 0 && view === "items" && (
          <div className="superadmin-empty">No inventory items found</div>
        )}

        {!loading && maintenanceRequests.length === 0 && view === "maintenance" && (
          <div className="superadmin-empty">No maintenance requests found</div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="principal-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} of {pagination.totalPages}</span>
            <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </section>
    </>
  );
}
