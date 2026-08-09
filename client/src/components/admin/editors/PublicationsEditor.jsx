import { useState } from 'react';
import { adminPut } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, textareaCls, cardCls, btnCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

function toForm(r = {}) {
  return {
    title: r.title || '',
    journal: r.journal || '',
    volume: r.volume || '',
    publishedDate: r.publishedDate || '',
    publisher: r.publisher || '',
    doi: r.doi || '',
    authors: (r.authors || []).join(', '),
    abstractSnippet: r.abstractSnippet || '',
    tags: (r.tags || []).join(', '),
    paperUrl: r.paperUrl || '',
    badge: r.badge || 'Published',
  };
}

export default function PublicationsEditor({ research, refetch }) {
  const [form, setForm] = useState(toForm(research));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await adminPut('research', {
        ...form,
        authors: form.authors.split(',').map((a) => a.trim()).filter(Boolean),
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
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
      <h2 className={panelHeadingCls}>Publications</h2>
      <p className={panelSubCls}>Research paper details shown in the Research section.</p>

      <div className="mb-4">
        <label className={labelCls}>Title</label>
        <textarea className={textareaCls} rows={2} value={form.title} onChange={update('title')} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Journal</label>
          <input className={inputCls} value={form.journal} onChange={update('journal')} />
        </div>
        <div>
          <label className={labelCls}>Volume</label>
          <input className={inputCls} value={form.volume} onChange={update('volume')} />
        </div>
        <div>
          <label className={labelCls}>Published Date</label>
          <input className={inputCls} value={form.publishedDate} onChange={update('publishedDate')} />
        </div>
        <div>
          <label className={labelCls}>Publisher</label>
          <input className={inputCls} value={form.publisher} onChange={update('publisher')} />
        </div>
        <div>
          <label className={labelCls}>DOI</label>
          <input className={inputCls} value={form.doi} onChange={update('doi')} />
        </div>
        <div>
          <label className={labelCls}>Badge</label>
          <input className={inputCls} value={form.badge} onChange={update('badge')} />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>Authors (comma separated)</label>
        <input className={inputCls} value={form.authors} onChange={update('authors')} />
      </div>

      <div className="mb-4">
        <label className={labelCls}>Abstract Snippet</label>
        <textarea className={textareaCls} rows={3} value={form.abstractSnippet} onChange={update('abstractSnippet')} />
      </div>

      <div className="mb-4">
        <label className={labelCls}>Tags (comma separated)</label>
        <input className={inputCls} value={form.tags} onChange={update('tags')} />
      </div>

      <div className="mb-6">
        <label className={labelCls}>Paper URL</label>
        <input className={inputCls} value={form.paperUrl} onChange={update('paperUrl')} />
      </div>

      <button type="submit" className={btnCls} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {message && <span className="ml-3 text-sm text-text-muted">{message}</span>}
    </form>
  );
}
