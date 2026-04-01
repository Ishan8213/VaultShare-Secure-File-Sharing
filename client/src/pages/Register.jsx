import { useState } from 'react';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'Employee',
    department: 'Finance'
  });

  const handleRegister = async () => {
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      alert("Request sent for approval ⏳");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="auth-brand-name">VaultShare</span>
          <span className="auth-brand-tag auth-brand-tag--violet">NEW USER</span>
        </div>

        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Request access to the secure file sharing platform</p>

        <div className="auth-field">
          <label className="auth-label">Username</label>
          <input
            className="auth-input"
            placeholder="Choose a username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="auth-field">
          <label className="auth-label">Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Create a strong password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="auth-row">
          <div className="auth-field">
            <label className="auth-label">Role</label>
            <div className="auth-select-wrapper">
              <select className="auth-select" onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option>Employee</option>
                <option>Manager</option>
              </select>
            </div>
          </div>
          <div className="auth-field">
            <label className="auth-label">Department</label>
            <div className="auth-select-wrapper">
              <select className="auth-select" onChange={(e) => setForm({ ...form, department: e.target.value })}>
                <option>Finance</option>
                <option>HR</option>
                <option>IT</option>
              </select>
            </div>
          </div>
        </div>

        <div className="auth-notice">
          <span className="auth-notice-icon">⏳</span>
          <span className="auth-notice-text">Your account requires admin approval before access is granted.</span>
        </div>

        <button onClick={handleRegister} disabled={loading} className="auth-btn auth-btn--violet">
          {loading ? 'Submitting request...' : 'Submit Registration'}
        </button>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">already registered?</span>
          <div className="auth-divider-line" />
        </div>

        <button onClick={() => navigate('/')} className="auth-btn auth-btn--ghost">
          Back to Sign In
        </button>

        <div className="auth-footer">
          <div className="auth-footer-dot" />
          <span className="auth-footer-text">256-bit encrypted · Zero-knowledge storage</span>
        </div>

      </div>
    </div>
  );
}