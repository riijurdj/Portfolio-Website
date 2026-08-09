import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPost, adminPut, adminDelete } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, textareaCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const emptySection = { title: '', content: '', order: 0, visible: true };

function SectionCard({ section, refetch }) {
  const [form, setForm] = useState({ ...emptySection, ...section });
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (section._id) {
        await adminPut(`custom-sections/${section._id}`, payload);
      } else {
        await adminPost('custom-sections', payload);
      }
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!section._id || !confirm(`Delete section "${form.title}"?`)) return;
    await adminDelete(`custom-sections/${section._id}`);
    await refetch();
  };

  return (
    <div className={`${cardCls} mb-4`}>
      <div className="mb-4">
        <label className={labelCls}>Title</label>
        <input className={inputCls} value={form.title} onChange={update('title')} />
      </div>
      <div className="mb-4">
        <label className={labelCls}>Content</label>
        <textarea className={textareaCls} rows={4} value={form.content} onChange={update('content')} />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
          />
          Visible on site
        </label>
        <div className="flex items-center gap-2">
          <label className={labelCls}>Order</label>
          <input className={`${inputCls} w-20`} type="number" value={form.order} onChange={update('order')} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className={btnCls} disabled={saving}>
          {saving ? 'Saving...' : section._id ? 'Save' : 'Create'}
        </button>
        {section._id && (
          <button type="button" onClick={remove} className={btnDangerCls}>
            <FiTrash2 className="inline" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function CustomSectionsEditor({ customSections = [], refetch }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className={`${cardCls} mb-6 flex items-center justify-between`}>
        <div>
          <h2 className={panelHeadingCls}>Custom Sections</h2>
          <p className={panelSubCls}>Add entirely new sections with a title and free-form content.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Section
        </button>
      </div>

      {adding && <SectionCard section={{ ...emptySection }} refetch={() => { setAdding(false); refetch(); }} />}

      {customSections.map((s) => (
        <SectionCard key={s._id} section={s} refetch={refetch} />
      ))}
    </div>
  );
}
