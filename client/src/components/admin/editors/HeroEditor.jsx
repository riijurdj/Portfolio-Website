import { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { adminPut, adminUploadPhoto, adminUploadResume } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, cardCls, btnCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

export default function HeroEditor({ hero, refetch }) {
  const [form, setForm] = useState({
    name: hero?.name || '',
    titles: (hero?.titles || []).join(', '),
    tagline: hero?.tagline || '',
    resumeUrl: hero?.resumeUrl || '',
    github: hero?.socialLinks?.github || '',
    linkedin: hero?.socialLinks?.linkedin || '',
    email: hero?.socialLinks?.email || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [removingResume, setRemovingResume] = useState(false);
  const [message, setMessage] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await adminPut('hero', {
        name: form.name,
        titles: form.titles.split(',').map((t) => t.trim()).filter(Boolean),
        tagline: form.tagline,
        resumeUrl: form.resumeUrl,
        socialLinks: { github: form.github, linkedin: form.linkedin, email: form.email },
      });
      await refetch();
      setMessage('Saved.');
    } catch {
      setMessage('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await adminUploadPhoto(file, 'hero');
      await refetch();
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = async () => {
    setRemoving(true);
    try {
      await adminPut('hero', { profilePhoto: '' });
      await refetch();
    } finally {
      setRemoving(false);
    }
  };

  const handleResumeFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      await adminUploadResume(file);
      await refetch();
    } finally {
      setUploadingResume(false);
      e.target.value = '';
    }
  };

  const handleRemoveResumeFile = async () => {
    setRemovingResume(true);
    try {
      await adminPut('hero', { resumeFile: '' });
      await refetch();
    } finally {
      setRemovingResume(false);
    }
  };

  return (
    <form onSubmit={handleSave} className={cardCls}>
      <h2 className={panelHeadingCls}>Hero Section</h2>
      <p className={panelSubCls}>Name, taglines, resume link, and social links shown at the top of the site.</p>

      <div className="mb-4">
        <label className={labelCls}>Profile Photo</label>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-bg-secondary border border-border-subtle flex items-center justify-center">
            {hero?.profilePhoto ? (
              <img src={hero.profilePhoto} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-text-muted">RJ</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handlePhoto} disabled={uploading} className="text-sm" />
          {hero?.profilePhoto && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              disabled={removing}
              className={btnDangerCls}
            >
              {removing ? 'Removing...' : 'Remove'}
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>Name</label>
        <input className={inputCls} value={form.name} onChange={update('name')} required />
      </div>

      <div className="mb-4">
        <label className={labelCls}>Typewriter Titles (comma separated)</label>
        <input className={inputCls} value={form.titles} onChange={update('titles')} />
      </div>

      <div className="mb-4">
        <label className={labelCls}>Tagline</label>
        <input className={inputCls} value={form.tagline} onChange={update('tagline')} />
      </div>

      <div className="mb-4">
        <label className={labelCls}>Resume PDF</label>
        <div className="flex items-center gap-3 mb-2">
          {hero?.resumeFile ? (
            <a
              href={hero.resumeFile}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-accent-cyan hover:underline"
            >
              <FiFileText size={16} /> Current uploaded resume
            </a>
          ) : (
            <span className="text-sm text-text-muted">No PDF uploaded — using Resume URL below.</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeFile}
            disabled={uploadingResume}
            className="text-sm"
          />
          {hero?.resumeFile && (
            <button
              type="button"
              onClick={handleRemoveResumeFile}
              disabled={removingResume}
              className={btnDangerCls}
            >
              {removingResume ? 'Removing...' : 'Remove'}
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className={labelCls}>Resume URL (fallback)</label>
        <input className={inputCls} value={form.resumeUrl} onChange={update('resumeUrl')} />
        <p className="text-xs text-text-muted mt-1">
          Used only when no PDF is uploaded above — e.g. a link to a Google Drive or Dropbox copy.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input className={inputCls} value={form.github} onChange={update('github')} />
        </div>
        <div>
          <label className={labelCls}>LinkedIn URL</label>
          <input className={inputCls} value={form.linkedin} onChange={update('linkedin')} />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input className={inputCls} value={form.email} onChange={update('email')} />
        </div>
      </div>

      <button type="submit" className={btnCls} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {message && <span className="ml-3 text-sm text-text-muted">{message}</span>}
    </form>
  );
}
