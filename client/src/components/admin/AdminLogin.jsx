import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const credentialsUpdated = Boolean(location.state?.credentialsUpdated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-border-subtle rounded-2xl p-8 bg-bg-card"
      >
        <h1 className="text-xl font-bold mb-1">Admin Login</h1>
        <p className="text-text-muted text-sm mb-6">Sign in to manage portfolio content.</p>

        {credentialsUpdated && (
          <p className="text-emerald-400 text-sm mb-4 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2">
            Credentials updated. Please sign in again.
          </p>
        )}

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded-lg bg-transparent border border-border-subtle focus:border-accent-cyan outline-none"
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded-lg bg-transparent border border-border-subtle focus:border-accent-cyan outline-none"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-accent-cyan to-accent-blue text-[#04121e] disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
