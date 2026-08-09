import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPut, adminUploadPhoto } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, textareaCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const emptyStat = { label: '', value: 0, prefix: '', suffix: '' };

export default function AboutEditor({ about, refetch }) {
  const [story, setStory] = useState(about?.story || '');
  const [stats, setStats] = useState(about?.stats?.length ? about.stats : [emptyStat]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [message, setMessage] = useState('');

  const updateStat = (i, key, value) => {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  };

  const addStat = () => setStats((prev) => [...prev, { ...emptyStat }]);
  const removeStat = (i) => setStats((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await adminPut('about', {
        story,
        stats: stats.map((s) => ({ ...s, value: Number(s.value) || 0 })),
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
      await adminUploadPhoto(file, 'about');
      await refetch();
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = async () => {
    setRemoving(true);
    try {
      await adminPut('about', { photo: '' });
      await refetch();
    } finally {
      setRemoving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className={cardCls}>
      <h2 className={panelHeadingCls}>About Section</h2>
      <p className={panelSubCls}>Your story and the achievement stats shown with animated counters.</p>

      <div className="mb-4">
        <label className={labelCls}>About Photo</label>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-bg-secondary border border-border-subtle flex items-center justify-center">
            {about?.photo ? (
              <img src={about.photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-text-muted">RJ</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handlePhoto} disabled={uploading} className="text-sm" />
          {about?.photo && (
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

      <div className="mb-6">
        <label className={labelCls}>Story</label>
        <textarea className={textareaCls} rows={6} value={story} onChange={(e) => setStory(e.target.value)} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <label className={labelCls}>Achievement Stats</label>
        <button type="button" onClick={addStat} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Stat
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-center">
            <input
              className={inputCls}
              placeholder="Label"
              value={s.label}
              onChange={(e) => updateStat(i, 'label', e.target.value)}
            />
            <input
              className={`${inputCls} w-16`}
              placeholder="Prefix"
              value={s.prefix}
              onChange={(e) => updateStat(i, 'prefix', e.target.value)}
            />
            <input
              className={`${inputCls} w-20`}
              type="number"
              placeholder="Value"
              value={s.value}
              onChange={(e) => updateStat(i, 'value', e.target.value)}
            />
            <input
              className={`${inputCls} w-16`}
              placeholder="Suffix"
              value={s.suffix}
              onChange={(e) => updateStat(i, 'suffix', e.target.value)}
            />
            <button type="button" onClick={() => removeStat(i)} className={btnDangerCls}>
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className={btnCls} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {message && <span className="ml-3 text-sm text-text-muted">{message}</span>}
    </form>
  );
}
