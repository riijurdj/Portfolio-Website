import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiExternalLink, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import ThemeToggle from '../ThemeToggle.jsx';

import HeroEditor from './editors/HeroEditor.jsx';
import AboutEditor from './editors/AboutEditor.jsx';
import SkillsEditor from './editors/SkillsEditor.jsx';
import ExperienceEditor from './editors/ExperienceEditor.jsx';
import ProjectsEditor from './editors/ProjectsEditor.jsx';
import CertificationsEditor from './editors/CertificationsEditor.jsx';
import EducationEditor from './editors/EducationEditor.jsx';
import PublicationsEditor from './editors/PublicationsEditor.jsx';
import ContactEditor from './editors/ContactEditor.jsx';
import CustomSectionsEditor from './editors/CustomSectionsEditor.jsx';
import SectionsVisibilityEditor from './editors/SectionsVisibilityEditor.jsx';
import AccountEditor from './editors/AccountEditor.jsx';

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
  { id: 'custom', label: 'Custom Sections' },
  { id: 'visibility', label: 'Section Visibility' },
  { id: 'account', label: 'Account' },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data, loading, refetch } = usePortfolioData();
  const [tab, setTab] = useState('hero');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="w-10 h-10 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
      </div>
    );
  }

  const renderTab = () => {
    switch (tab) {
      case 'hero':
        return <HeroEditor hero={data.hero} refetch={refetch} />;
      case 'about':
        return <AboutEditor about={data.about} refetch={refetch} />;
      case 'skills':
        return <SkillsEditor skills={data.skills} refetch={refetch} />;
      case 'experience':
        return <ExperienceEditor experience={data.experience} refetch={refetch} />;
      case 'projects':
        return <ProjectsEditor projects={data.projects} refetch={refetch} />;
      case 'certifications':
        return <CertificationsEditor certifications={data.certifications} refetch={refetch} />;
      case 'education':
        return <EducationEditor education={data.education} refetch={refetch} />;
      case 'publications':
        return <PublicationsEditor research={data.research} refetch={refetch} />;
      case 'contact':
        return <ContactEditor contact={data.contact} refetch={refetch} />;
      case 'custom':
        return <CustomSectionsEditor customSections={data.customSections} refetch={refetch} />;
      case 'visibility':
        return (
          <SectionsVisibilityEditor sectionsVisibility={data.sectionsVisibility} refetch={refetch} />
        );
      case 'account':
        return <AccountEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex">
      <aside className="w-56 shrink-0 border-r border-border-subtle p-4 hidden md:flex md:flex-col">
        <div className="font-bold text-lg mb-6 px-2">Admin Panel</div>
        <nav className="flex flex-col gap-1 flex-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-text-secondary hover:text-accent-cyan'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value)}
            className="md:hidden px-2 py-1.5 rounded-lg bg-transparent border border-border-subtle text-sm"
          >
            {TABS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <span className="hidden md:block font-semibold">{TABS.find((t) => t.id === tab)?.label}</span>

          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1 text-text-secondary hover:text-accent-cyan">
              View Site <FiExternalLink size={14} />
            </a>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="text-sm flex items-center gap-1 text-text-secondary hover:text-red-400"
            >
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 max-w-3xl w-full">{renderTab()}</main>
      </div>
    </div>
  );
}
