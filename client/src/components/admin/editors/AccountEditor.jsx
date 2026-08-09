import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCredentialsRequest } from '../../../api/portfolioApi.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { inputCls, labelCls, cardCls, btnCls, panelHeadingCls, panelSubCls } from '../adminStyles.js';

const EMPTY_FORM = { currentPassword: '', newEmail: '', newPassword: '', confirmPassword: '' };

export default function AccountEditor() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.newEmail.trim() && !form.newPassword) {
      setError('Enter a new email and/or a new password.');
      return;
    }
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (form.newPassword && form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    setSaving(true);
    try {
      await updateCredentialsRequest({
        currentPassword: form.currentPassword,
        newEmail: form.newEmail.trim() || undefined,
        newPassword: form.newPassword || undefined,
      });
      logout();
      navigate('/admin/login', { state: { credentialsUpdated: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update credentials.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cardCls}>
      <h2 className={panelHeadingCls}>Account</h2>
      <p className={panelSubCls}>
        Change the email and/or password used to sign in to this admin panel. No server access or
        redeploy needed — this updates immediately.
      </p>

      <div className="mb-4">
        <label className={labelCls}>Current Password</label>
        <input
          type="password"
          className={inputCls}
          value={form.currentPassword}
          onChange={update('currentPassword')}
          required
          autoComplete="current-password"
        />
      </div>

      <div className="mb-4">
        <label className={labelCls}>New Email (optional)</label>
        <input
          type="email"
          className={inputCls}
          value={form.newEmail}
          onChange={update('newEmail')}
          autoComplete="username"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-2">
        <div>
          <label className={labelCls}>New Password (optional)</label>
          <input
            type="password"
            className={inputCls}
            value={form.newPassword}
            onChange={update('newPassword')}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className={labelCls}>Confirm New Password</label>
          <input
            type="password"
            className={inputCls}
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            autoComplete="new-password"
          />
        </div>
      </div>
      <p className="text-xs text-text-muted mb-6">Leave the password fields blank to only change the email.</p>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button type="submit" className={btnCls} disabled={saving}>
        {saving ? 'Saving...' : 'Update Credentials'}
      </button>
      <p className="text-xs text-text-muted mt-3">
        You'll be signed out and asked to log in again with your new credentials after saving.
      </p>
    </form>
  );
}
