import { useState } from 'react';
import { adminPut } from '../../../api/portfolioApi.js';
import { cardCls, btnCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const LABELS = {
  hero: 'Hero',
  about: 'About Me',
  skills: 'Skills',
  experience: 'Experience',
  aiSpotlight: 'AI Integration Spotlight',
  projects: 'Projects',
  research: 'Research Publication',
  education: 'Education & Certifications',
  contact: 'Contact',
};

export default function SectionsVisibilityEditor({ sectionsVisibility = {}, refetch }) {
  const [form, setForm] = useState(sectionsVisibility);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const toggle = (key) => setForm((f) => ({ ...f, [key]: !f[key] }));

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await adminPut('sections-visibility', form);
      await refetch();
      setMessage('Saved.');
    } catch {
      setMessage('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={cardCls}>
      <h2 className={panelHeadingCls}>Section Visibility</h2>
      <p className={panelSubCls}>Show or hide entire sections on the live site.</p>

      <div className="space-y-1 mb-6">
        {Object.keys(LABELS).map((key) => (
          <label
            key={key}
            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent-cyan/5 cursor-pointer"
          >
            <span className="text-sm font-medium">{LABELS[key]}</span>
            <input
              type="checkbox"
              checked={form[key] !== false}
              onChange={() => toggle(key)}
              className="w-4 h-4 accent-accent-cyan"
            />
          </label>
        ))}
      </div>

      <button type="button" onClick={handleSave} className={btnCls} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
      {message && <span className="ml-3 text-sm text-text-muted">{message}</span>}
    </div>
  );
}
