import React, { useState } from 'react';
import { Package, Plus, Download, AlertTriangle, Search } from 'lucide-react';

const inventory = [
  { sku: 'SKU-UNI-042', item: 'Summer Blazer (Dark Forest Green)', category: 'Uniform', grades: 'Grades 9–12', stock: 420, reorder: 100, unitCost: '$28.00', retail: '$42…', badge: 'badge-green', lowStock: false },
  { sku: 'SKU-UNI-018', item: 'Unisex Sports Polo Shirt Emerald/White trim • Moisture-wicking', category: 'Sports Uniform', grades: 'Grades 1–12', stock: 180, reorder: 250, unitCost: '$10.00', retail: '$16…', badge: 'badge-red', lowStock: true },
  { sku: 'SKU-TXT-1018', item: 'Grade 10 CBSE Textbook & Lab Manual Physics, Chem, Math, English Social Pack', category: 'Textbooks', grades: 'Grade 10', stock: 150, reorder: 90, unitCost: '$65.00', retail: '$85…', badge: 'badge-blue', lowStock: false },
  { sku: 'SKU-TXT-12A', item: 'Grade 12 Science Master Pack NCERT + Exemplar + Practical Journal', category: 'Textbooks', grades: 'Grade 12', stock: 45, reorder: 40, unitCost: '$78.00', retail: '$98…', badge: 'badge-yellow', lowStock: false },
  { sku: 'SKU-ACC-009', item: 'Team Badge & Green Tie Set School Team • Ruby Knights crest', category: 'Accessories', grades: 'All Grades', stock: 629, reorder: 150, unitCost: '$4.50', retail: '$7.5…', badge: 'badge-green', lowStock: false },
];

const categoryTabs = ['All Items', 'School Uniforms', 'Textbooks & Notebooks', 'Sports Kits & Accessories'];

const supplierOrders = [
  { id: 'PO #8894', desc: 'CleanGuard Fabrics & Apex Uniform Mfg', status: 'In Transit', amount: '$4,200', eta: 'ETA: March 02, 2025', waybill: 'Waybill: #APX-9941', badge: 'badge-blue' },
  { id: 'PO #8892', desc: 'Oxford University Press & Pearson Education', status: 'Received & Stocked', amount: '$6,800', eta: '', waybill: 'Bin Allocation: Shelf 9A Verified by J. Matthews', badge: 'badge-green' },
  { id: 'PO #8890', desc: 'Athletic Sports Jersey Batch & Team Printed', status: 'Approved by Bursar', amount: '$2,400', eta: '', waybill: 'Disbursement Scheduled • Vendor: Spartan Gear', badge: 'badge-yellow' },
];

export default function UniformsInventory() {
  const [activeTab, setActiveTab] = useState('All Items');
  const [search, setSearch] = useState('');

  const filtered = inventory.filter(item =>
    (activeTab === 'All Items' ||
      (activeTab === 'School Uniforms' && item.category === 'Uniform') ||
      (activeTab === 'Textbooks & Notebooks' && item.category === 'Textbooks') ||
      (activeTab === 'Sports Kits & Accessories' && (item.category === 'Sports Uniform' || item.category === 'Accessories'))) &&
    item.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="breadcrumb">
        <span>Finance & Operations</span> <span>›</span>
        <span>Uniforms & Books Inventory</span>
        <div className="flex gap-2 ml-auto">
          <span className="badge badge-green">CENTRAL LOGISTICAL VAULT • WING E</span>
          <span className="badge badge-gray">Auto-Synced 5 mins ago</span>
        </div>
      </div>

      <h1 className="page-title mb-2">Uniforms, Textbooks &<br />Academic Store<br />Inventory</h1>
      <p className="page-desc mb-3">Distribution logistics, vendor procurement orders, student bundle kits, stock level replenishment, and billing reconciliation for AY 2024-25.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Store Audit (CSV)</button>
        <button className="btn btn-primary btn-sm">Disburse Student Bundle Kit</button>
        <button className="btn btn-primary btn-sm"><Plus size={11} /> + New Purchase Order (PO)</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Uniform Distribution</div>
          <div className="stat-card-value">92.4%</div>
          <div className="stat-card-sub"><span className="badge badge-green">Fulfilled</span></div>
          <div className="stat-card-sub text-xs text-muted">2,264 / 2,450 student kits fulfilled; 186 kits left</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Textbook Kit Fulfilment</div>
          <div className="stat-card-value">96.8%</div>
          <div className="stat-card-sub"><span className="badge badge-blue">High Pace</span></div>
          <div className="stat-card-sub text-xs text-muted">2,372 / 2,450 Grade 1-12 NCERT packs; 78 packs remaining</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Wareteam Total Valuation</div>
          <div className="stat-card-value">$84,250</div>
          <div className="stat-card-sub">8,420 items in Wing E</div>
          <div className="stat-card-sub"><span className="badge badge-red">14 Low Stock</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Vendor Payables MTD</div>
          <div className="stat-card-value">$14,500</div>
          <div className="stat-card-sub"><span className="badge badge-green">Cleared</span></div>
          <div className="stat-card-sub text-xs text-muted">Apex Textile & Ox…&nbsp;<span className="text-red">$3,200 pending</span></div>
        </div>
      </div>

      {/* Main Catalog */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📦 Main Catalog & Stock Availability</span>
          <span className="text-xs text-muted">246 SKUs</span>
        </div>
        <div className="card-body" style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-2 flex-wrap">
            {categoryTabs.map(t => (
              <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input className="input" style={{ paddingLeft: 26, width: 200 }} placeholder="Filter by SKU or description…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU / Code</th>
                <th>Item Description</th>
                <th>Category</th>
                <th>Grade Cohort</th>
                <th>Stock on Hand</th>
                <th>Re-order Level</th>
                <th>Unit Cost</th>
                <th>Retail / Bundle</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.sku}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: item.lowStock ? '#ef4444' : '#16a34a', color: '#fff', borderRadius: 6 }}>
                        {item.category === 'Textbooks' ? '📚' : item.category === 'Uniform' ? '👔' : item.category === 'Sports Uniform' ? '⚽' : '🏷'}
                      </div>
                      <div className="text-xs font-semibold text-muted">{item.sku}</div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-sm">{item.item}</div>
                  </td>
                  <td><span className="badge badge-gray">{item.category}</span></td>
                  <td className="text-xs">{item.grades}</td>
                  <td>
                    <span className={`font-bold ${item.lowStock ? 'text-red' : ''}`}>{item.stock} units</span>
                    {item.lowStock && <div className="progress mt-1" style={{ width: 60 }}><div className="progress-bar progress-red" style={{ width: `${(item.stock / item.reorder) * 100}%` }} /></div>}
                  </td>
                  <td className="text-xs text-muted">{item.reorder} units</td>
                  <td className="text-sm">{item.unitCost}</td>
                  <td className="text-sm text-muted">{item.retail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 1 of 5 featured primary SKUs</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">‹ 1</button>
              {[2, 3].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid-2 mb-4">
        {/* Student Kit Counter Dispatch */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🏪 Student Kit Counter Dispatch</span>
            <span className="badge badge-green">Station Ready</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Rapid beginning-of-term full fitment desk & handheld scanner.</div>
            <div className="flex gap-2 mb-3">
              <input className="input flex-1" defaultValue="GW-2024-8841" />
              <button className="btn btn-primary btn-sm">Lookup Scholar</button>
            </div>
            <div className="metric-box mb-3">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold">Aarav Sharma</div>
                  <div className="text-xs text-muted">Class 10-B</div>
                  <div className="text-xs text-muted">Team: School Team • Roll #14</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted">Fee Status</div>
                  <span className="badge badge-green">Kit Cleared (Paid)</span>
                </div>
              </div>
              <div className="text-xs font-semibold mb-2">Bundle Verification Checklist</div>
              {[
                { item: 'Summer Blazer Barcode: ICW-BLZ-38-642*', status: 'Fitted & Verified', badge: 'badge-green' },
                { item: 'Tailored Grey Trousers (Set of 2) Waist Size 32 • Barcode:*B6–BL-38–610*', status: 'Fitted & Verified', badge: 'badge-green' },
                { item: 'Grade 10 Textbook & Lab Master Pack CBSE NCERT 5-Subject (All Incl.) + 12 Custom Notebooks', status: 'Inspected', badge: 'badge-blue' },
                { item: 'White Chemistry Apron / Lab Coat Barcode: 45• Flame-resistant standard cotton', status: 'Included', badge: 'badge-gray' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <span className="text-green">✓</span>
                  <div className="flex-1">
                    <div className="text-xs">{c.item}</div>
                  </div>
                  <span className={`badge ${c.badge}`}>{c.status}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div>
                <div className="text-xs text-muted">Guardian Sign-Off:</div>
                <div className="text-xs">Rajesh Sharma (Father) • Digital Stylus Verified</div>
              </div>
              <button className="btn btn-primary btn-sm ml-auto">
                Print Slip & Confirm & Issue Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Active Supplier Purchase Orders */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🛒 Active Supplier Purchase Orders</span>
            <button className="btn btn-secondary btn-sm" style={{ fontSize: 16 }}>⟳</button>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Procurement stream & intake tracking.</div>
            {supplierOrders.map((o, i) => (
              <div key={i} className="metric-box mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${o.badge}`}>{o.status}</span>
                    </div>
                    <div className="font-semibold text-sm">{o.id}</div>
                    <div className="text-xs text-muted">{o.desc}</div>
                    {o.eta && <div className="text-xs text-muted">{o.eta}</div>}
                    <div className="text-xs text-muted">{o.waybill}</div>
                  </div>
                  <div className="font-bold text-green">{o.amount}</div>
                </div>
              </div>
            ))}
            <div className="divider" />
            <div className="flex justify-between text-xs text-muted">
              <span>Audit Compliance: 99.4% Matching</span>
              <button className="btn btn-secondary btn-sm">View All 18 Orders →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
