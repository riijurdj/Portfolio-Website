import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPost, adminPut, adminDelete } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

function CategoryCard({ category, refetch }) {
  const [name, setName] = useState(category.category);
  const [skills, setSkills] = useState(category.skills || []);
  const [saving, setSaving] = useState(false);

  const updateSkill = (i, key, value) =>
    setSkills((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  const addSkill = () => setSkills((prev) => [...prev, { name: '', icon: '' }]);
  const removeSkill = (i) => setSkills((prev) => prev.filter((_, idx) => idx !== i));

  const save = async () => {
    setSaving(true);
    try {
      await adminPut(`skills/${category._id}`, { category: name, skills });
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete category "${category.category}"?`)) return;
    await adminDelete(`skills/${category._id}`);
    await refetch();
  };

  return (
    <div className={`${cardCls} mb-4`}>
      <div className="flex items-center gap-2 mb-4">
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
        <button type="button" onClick={remove} className={btnDangerCls}>
          <FiTrash2 />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        {skills.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              className={inputCls}
              placeholder="Skill name"
              value={s.name}
              onChange={(e) => updateSkill(i, 'name', e.target.value)}
            />
            <input
              className={inputCls}
              placeholder="Icon (e.g. SiReact)"
              value={s.icon}
              onChange={(e) => updateSkill(i, 'icon', e.target.value)}
            />
            <button type="button" onClick={() => removeSkill(i)} className={btnDangerCls}>
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={addSkill} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Skill
        </button>
        <button type="button" onClick={save} className={btnCls} disabled={saving}>
          {saving ? 'Saving...' : 'Save Category'}
        </button>
      </div>
    </div>
  );
}

export default function SkillsEditor({ skills = [], refetch }) {
  const [newCategory, setNewCategory] = useState('');

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    await adminPost('skills', { category: newCategory.trim(), skills: [] });
    setNewCategory('');
    await refetch();
  };

  return (
    <div>
      <div className={`${cardCls} mb-6`}>
        <h2 className={panelHeadingCls}>Skills</h2>
        <p className={panelSubCls}>Organize skills into tabbed categories shown on the site.</p>
        <form onSubmit={addCategory} className="flex gap-2">
          <input
            className={inputCls}
            placeholder="New category name (e.g. Backend)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className={btnCls}>
            <FiPlus className="inline mb-0.5" /> Add Category
          </button>
        </form>
      </div>

      {skills.map((cat) => (
        <CategoryCard key={cat._id} category={cat} refetch={refetch} />
      ))}
    </div>
  );
}
