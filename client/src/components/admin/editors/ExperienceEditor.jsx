import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPost, adminPut, adminDelete } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, textareaCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const emptyEntry = { company: '', location: '', role: '', duration: '', order: 0, achievements: [] };

function ExperienceCard({ entry, refetch }) {
  const [form, setForm] = useState({ ...emptyEntry, ...entry });
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const updateAchievement = (i, value) =>
    setForm((f) => ({ ...f, achievements: f.achievements.map((a, idx) => (idx === i ? value : a)) }));
  const addAchievement = () => setForm((f) => ({ ...f, achievements: [...f.achievements, ''] }));
  const removeAchievement = (i) =>
    setForm((f) => ({ ...f, achievements: f.achievements.filter((_, idx) => idx !== i) }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0, achievements: form.achievements.filter(Boolean) };
      if (entry._id) {
        await adminPut(`experience/${entry._id}`, payload);
      } else {
        await adminPost('experience', payload);
      }
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!entry._id || !confirm(`Delete "${form.company}" entry?`)) return;
    await adminDelete(`experience/${entry._id}`);
    await refetch();
  };

  return (
    <div className={`${cardCls} mb-4`}>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Company</label>
          <input className={inputCls} value={form.company} onChange={update('company')} />
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input className={inputCls} value={form.location} onChange={update('location')} />
        </div>
        <div>
          <label className={labelCls}>Role</label>
          <input className={inputCls} value={form.role} onChange={update('role')} />
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

      <label className={labelCls}>Achievements</label>
      <div className="space-y-2 mb-3">
        {form.achievements.map((a, i) => (
          <div key={i} className="flex gap-2">
            <textarea className={textareaCls} rows={2} value={a} onChange={(e) => updateAchievement(i, e.target.value)} />
            <button type="button" onClick={() => removeAchievement(i)} className={btnDangerCls}>
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={addAchievement} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Achievement
        </button>
        <button type="button" onClick={save} className={btnCls} disabled={saving}>
          {saving ? 'Saving...' : entry._id ? 'Save Entry' : 'Create Entry'}
        </button>
        {entry._id && (
          <button type="button" onClick={remove} className={btnDangerCls}>
            <FiTrash2 className="inline" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function ExperienceEditor({ experience = [], refetch }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className={`${cardCls} mb-6 flex items-center justify-between`}>
        <div>
          <h2 className={panelHeadingCls}>Experience</h2>
          <p className={panelSubCls}>Timeline entries shown in the Experience section.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Entry
        </button>
      </div>

      {adding && <ExperienceCard entry={{ ...emptyEntry }} refetch={() => { setAdding(false); refetch(); }} />}

      {experience.map((entry) => (
        <ExperienceCard key={entry._id} entry={entry} refetch={refetch} />
      ))}
    </div>
  );
}
