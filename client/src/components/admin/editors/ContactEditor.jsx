import { useState } from 'react';
import { adminPut } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, cardCls, btnCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

export default function ContactEditor({ contact, refetch }) {
  const [form, setForm] = useState({
    email: contact?.email || '',
    phone: contact?.phone || '',
    location: contact?.location || '',
    github: contact?.github || '',
    linkedin: contact?.linkedin || '',
    footerText: contact?.footerText || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await adminPut('contact', form);
      await refetch();
      setMessage('Saved.');
    } catch {
      setMessage('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className={cardCls}>
      <h2 className={panelHeadingCls}>Contact Section</h2>
      <p className={panelSubCls}>Contact details, social links, and footer text.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelCls}>Email</label>
          <input className={inputCls} value={form.email} onChange={update('email')} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input className={inputCls} value={form.phone} onChange={update('phone')} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Location</label>
          <input className={inputCls} value={form.location} onChange={update('location')} />
        </div>
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input className={inputCls} value={form.github} onChange={update('github')} />
        </div>
        <div>
          <label className={labelCls}>LinkedIn URL</label>
          <input className={inputCls} value={form.linkedin} onChange={update('linkedin')} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Footer Text</label>
          <input className={inputCls} value={form.footerText} onChange={update('footerText')} />
        </div>
      </div>

      <button type="submit" className={btnCls} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {message && <span className="ml-3 text-sm text-text-muted">{message}</span>}
    </form>
  );
}
