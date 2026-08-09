import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPost, adminPut, adminDelete } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const emptyEdu = { institution: '', location: '', degree: '', duration: '', order: 0 };

function EduCard({ edu, refetch }) {
  const [form, setForm] = useState({ ...emptyEdu, ...edu });
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (edu._id) {
        await adminPut(`education/${edu._id}`, payload);
      } else {
        await adminPost('education', payload);
      }
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!edu._id || !confirm(`Delete "${form.institution}"?`)) return;
    await adminDelete(`education/${edu._id}`);
    await refetch();
  };

  return (
    <div className={`${cardCls} mb-4`}>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="sm:col-span-2">
          <label className={labelCls}>Institution</label>
          <input className={inputCls} value={form.institution} onChange={update('institution')} />
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input className={inputCls} value={form.location} onChange={update('location')} />
        </div>
        <div>
          <label className={labelCls}>Degree</label>
          <input className={inputCls} value={form.degree} onChange={update('degree')} />
        </div>
        <div>
          <label className={labelCls}>Duration</label>
          <input className={inputCls} value={form.duration} onChange={update('duration')} />
        </div>
        <div>
          <label className={labelCls}>Order</label>
          <input className={inputCls} type="number" value={form.order} onChange={update('order')} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className={btnCls} disabled={saving}>
          {saving ? 'Saving...' : edu._id ? 'Save' : 'Create'}
        </button>
        {edu._id && (
          <button type="button" onClick={remove} className={btnDangerCls}>
            <FiTrash2 className="inline" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function EducationEditor({ education = [], refetch }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className={`${cardCls} mb-6 flex items-center justify-between`}>
        <div>
          <h2 className={panelHeadingCls}>Education</h2>
          <p className={panelSubCls}>Degrees and institutions shown in the Education section.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Education
        </button>
      </div>

      {adding && <EduCard edu={{ ...emptyEdu }} refetch={() => { setAdding(false); refetch(); }} />}

      {education.map((e) => (
        <EduCard key={e._id} edu={e} refetch={refetch} />
      ))}
    </div>
  );
}
