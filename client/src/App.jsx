import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import AISpotlight from './components/sections/AISpotlight.jsx';
import Projects from './components/sections/Projects.jsx';
import Research from './components/sections/Research.jsx';
import Education from './components/sections/Education.jsx';
import Contact from './components/sections/Contact.jsx';
import AdminLogin from './components/admin/AdminLogin.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import { usePortfolioData } from './hooks/usePortfolioData.js';
import { useDocumentMeta } from './hooks/useDocumentMeta.js';

function PortfolioSite() {
  const { data, loading, error } = usePortfolioData();

  const heroTitles = data?.hero?.titles || [];
  const roleTitle = heroTitles.length > 1 ? `${heroTitles[0]} & ${heroTitles[1]}` : heroTitles[0];
  useDocumentMeta({
    title: data?.hero?.name ? `${data.hero.name}${roleTitle ? ` | ${roleTitle}` : ''}` : undefined,
    description: data?.hero?.tagline || data?.about?.story?.slice(0, 160),
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="w-12 h-12 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary px-6 text-center">
        <p>
          Couldn't reach the server. Make sure the backend is running and try refreshing.
        </p>
      </div>
    );
  }

  const visibility = data.sectionsVisibility || {};
  const customSections = (data.customSections || []).filter((s) => s.visible !== false);

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen">
      <Navbar sectionsVisibility={visibility} name={data.hero?.name} />

      {visibility.hero !== false && <Hero hero={data.hero} />}
      {visibility.about !== false && <About about={data.about} />}
      {visibility.skills !== false && <Skills skills={data.skills} />}
      {visibility.experience !== false && <Experience experience={data.experience} />}
      {visibility.aiSpotlight !== false && <AISpotlight aiSpotlight={data.aiSpotlight} />}
      {visibility.projects !== false && <Projects projects={data.projects} />}
      {visibility.research !== false && <Research research={data.research} />}
      {visibility.education !== false && (
        <Education education={data.education} certifications={data.certifications} />
      )}

      {customSections.map((section) => (
        <section key={section._id} className="section-shell">
          <h2 className="section-heading text-center mb-8">{section.title}</h2>
          <div className="max-w-3xl mx-auto text-text-secondary leading-relaxed whitespace-pre-line">
            {section.content}
          </div>
        </section>
      ))}

      {visibility.contact !== false && <Contact contact={data.contact} />}

      <Footer text={data.contact?.footerText} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioSite />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
