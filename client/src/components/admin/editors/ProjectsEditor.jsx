import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { adminPost, adminPut, adminDelete } from '../../../api/portfolioApi.js';
import { inputCls, labelCls, textareaCls, cardCls, btnCls, btnOutlineCls, btnDangerCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const emptyProject = { name: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: '', order: 0 };

function toForm(p) {
  return { ...emptyProject, ...p, techStack: (p.techStack || []).join(', ') };
}

function ProjectCard({ project, refetch }) {
  const [form, setForm] = useState(toForm(project));
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        order: Number(form.order) || 0,
        techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (project._id) {
        await adminPut(`projects/${project._id}`, payload);
      } else {
        await adminPost('projects', payload);
      }
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!project._id || !confirm(`Delete project "${form.name}"?`)) return;
    await adminDelete(`projects/${project._id}`);
    await refetch();
  };

  return (
    <div className={`${cardCls} mb-4`}>
      <div className="mb-4">
        <label className={labelCls}>Name</label>
        <input className={inputCls} value={form.name} onChange={update('name')} />
      </div>
      <div className="mb-4">
        <label className={labelCls}>Description</label>
        <textarea className={textareaCls} rows={3} value={form.description} onChange={update('description')} />
      </div>
      <div className="mb-4">
        <label className={labelCls}>Tech Stack (comma separated)</label>
        <input className={inputCls} value={form.techStack} onChange={update('techStack')} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>GitHub URL</label>
          <input className={inputCls} value={form.githubUrl} onChange={update('githubUrl')} />
        </div>
        <div>
          <label className={labelCls}>Live Demo URL</label>
          <input className={inputCls} value={form.liveUrl} onChange={update('liveUrl')} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>Image URL</label>
          <input className={inputCls} value={form.image} onChange={update('image')} />
        </div>
        <div>
          <label className={labelCls}>Order</label>
          <input className={inputCls} type="number" value={form.order} onChange={update('order')} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className={btnCls} disabled={saving}>
          {saving ? 'Saving...' : project._id ? 'Save Project' : 'Create Project'}
        </button>
        {project._id && (
          <button type="button" onClick={remove} className={btnDangerCls}>
            <FiTrash2 className="inline" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProjectsEditor({ projects = [], refetch }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className={`${cardCls} mb-6 flex items-center justify-between`}>
        <div>
          <h2 className={panelHeadingCls}>Projects</h2>
          <p className={panelSubCls}>Project cards shown in the Projects section.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} className={btnOutlineCls}>
          <FiPlus className="inline mb-0.5" /> Add Project
        </button>
      </div>

      {adding && <ProjectCard project={{ ...emptyProject }} refetch={() => { setAdding(false); refetch(); }} />}

      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} refetch={refetch} />
      ))}
    </div>
  );
}
