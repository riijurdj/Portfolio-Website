import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, verifyTokenRequest } from '../api/portfolioApi';

const TOKEN_KEY = 'admin-token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [checking, setChecking] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

  // Verify the stored token once per app load (not on every render/route change).
  // A token that was valid when saved but is rejected now — e.g. because the
  // server restarted and its signing key changed — is cleared, sending the
  // admin back to the login screen. Otherwise, staying logged in for as long
  // as the server keeps running, no repeated prompts on revisiting /admin.
  useEffect(() => {
    const existing = localStorage.getItem(TOKEN_KEY);
    if (!existing) {
      setChecking(false);
      return;
    }
    verifyTokenRequest(existing)
      .catch(() => {
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setChecking(false));
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    setToken(data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: Boolean(token), checking, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
