import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/Api';

export default function Login({ setAuth, setRole }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      const normalizedRole = String(res.data.role || '').toLowerCase();
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', normalizedRole);
      setAuth(true);
      setRole(normalizedRole);
      navigate(normalizedRole === 'admin' ? '/admin' : '/');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-root">

      {/* ── LEFT PANEL: Marketing / Info ── */}
      <div className="auth-split-left">

        <div className="auth-brand">
          <div className="auth-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="auth-brand-name">VaultShare</span>
          <span className="auth-brand-tag auth-brand-tag--blue">SECURE</span>
        </div>

        <h1 className="auth-split-headline">
          Your files.<br />
          <span className="auth-split-headline-gradient">Locked. Shared.<br />In control.</span>
        </h1>

        <p className="auth-split-sub">
          VaultShare gives teams a zero-knowledge workspace to store, approve,
          and share sensitive files without compromising on privacy or speed.
        </p>

        <div className="auth-split-features">

          <div className="auth-split-feat">
            <div className="auth-split-feat-icon auth-split-feat-icon--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="auth-split-feat-title">End-to-end encryption</p>
              <p className="auth-split-feat-desc">Files are encrypted before they leave your device. Only you hold the keys.</p>
            </div>
          </div>

          <div className="auth-split-feat">
            <div className="auth-split-feat-icon auth-split-feat-icon--violet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="auth-split-feat-title">Role-based access control</p>
              <p className="auth-split-feat-desc">Admins approve, users upload. Every action is logged and auditable.</p>
            </div>
          </div>

          <div className="auth-split-feat">
            <div className="auth-split-feat-icon auth-split-feat-icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 17 12 21 16 17" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
              </svg>
            </div>
            <div>
              <p className="auth-split-feat-title">Instant secure sharing</p>
              <p className="auth-split-feat-desc">Generate expiring links or share directly with verified team members.</p>
            </div>
          </div>

          <div className="auth-split-feat">
            <div className="auth-split-feat-icon auth-split-feat-icon--amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="auth-split-feat-title">Auto session timeout</p>
              <p className="auth-split-feat-desc">Idle sessions are automatically terminated to prevent unauthorised access.</p>
            </div>
          </div>

        </div>

        <div className="auth-split-stats">
          <div className="auth-split-stat">
            <span className="auth-split-stat-num">256-bit</span>
            <span className="auth-split-stat-label">AES ENCRYPTION</span>
          </div>
          <div className="auth-split-stat">
            <span className="auth-split-stat-num">0</span>
            <span className="auth-split-stat-label">PLAINTEXT STORED</span>
          </div>
          <div className="auth-split-stat">
            <span className="auth-split-stat-num">100%</span>
            <span className="auth-split-stat-label">AUDIT LOGGED</span>
          </div>
        </div>

      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div className="auth-split-right">
        <div className="auth-card">

          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to your secure workspace</p>

          {/* Trust pills */}
          <div className="auth-trust-row">
            <span className="auth-trust-pill auth-trust-pill--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              E2E Encrypted
            </span>
            <span className="auth-trust-pill auth-trust-pill--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Zero-Knowledge
            </span>
            <span className="auth-trust-pill auth-trust-pill--violet">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Auto Timeout
            </span>
          </div>

          {error && <div className="auth-error">⚠ {error}</div>}

          {/* Username */}
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                className="auth-input auth-input--icon"
                placeholder="Enter your username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input auth-input--icon auth-input--padded-right"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="auth-input-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="auth-field-meta">
            <span className="auth-forgot">Forgot password?</span>
          </div>

          <button onClick={handleLogin} disabled={loading} className="auth-btn auth-btn--blue">
            {loading ? (
              'Authenticating...'
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Sign In
              </>
            )}
          </button>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <button onClick={() => navigate('/register')} className="auth-btn auth-btn--ghost">
            Create a new account
          </button>

          <div className="auth-footer">
            <div className="auth-footer-dot" />
            <span className="auth-footer-text">256-bit encrypted · Zero-knowledge storage</span>
          </div>

        </div>
      </div>

    </div>
  );
}