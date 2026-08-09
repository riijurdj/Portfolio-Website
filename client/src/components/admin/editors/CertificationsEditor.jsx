import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPost, adminPut, adminDelete } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const emptyCert = { name: '', issuer: '', duration: '', status: 'Completed', order: 0 };

function CertCard({ cert, refetch }) {
  const [form, setForm] = useState({ ...emptyCert, ...cert });
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (cert._id) {
        await adminPut(`certifications/${cert._id}`, payload);
      } else {
        await adminPost('certifications', payload);
      }
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!cert._id || !confirm(`Delete "${form.name}"?`)) return;
    await adminDelete(`certifications/${cert._id}`);
    await refetch();
  };

  return (
    <div className={`${cardCls} mb-4`}>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Name</label>
          <input className={inputCls} value={form.name} onChange={update('name')} />
        </div>
        <div>
          <label className={labelCls}>Issuer</label>
          <input className={inputCls} value={form.issuer} onChange={update('issuer')} />
        </div>
        <div>
          <label className={labelCls}>Duration</label>
          <input className={inputCls} value={form.duration} onChange={update('duration')} />
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select className={inputCls} value={form.status} onChange={update('status')}>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Order</label>
          <input className={inputCls} type="number" value={form.order} onChange={update('order')} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className={btnCls} disabled={saving}>
          {saving ? 'Saving...' : cert._id ? 'Save' : 'Create'}
        </button>
        {cert._id && (
          <button type="button" onClick={remove} className={btnDangerCls}>
            <FiTrash2 className="inline" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function CertificationsEditor({ certifications = [], refetch }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className={`${cardCls} mb-6 flex items-center justify-between`}>
        <div>
          <h2 className={panelHeadingCls}>Certifications</h2>
          <p className={panelSubCls}>Shown alongside Education on the site.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Certification
        </button>
      </div>

      {adding && <CertCard cert={{ ...emptyCert }} refetch={() => { setAdding(false); refetch(); }} />}

      {certifications.map((c) => (
        <CertCard key={c._id} cert={c} refetch={refetch} />
      ))}
    </div>
  );
}
