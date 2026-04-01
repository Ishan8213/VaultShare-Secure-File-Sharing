import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard({ setAuth, setRole }) {
  const [role, setRoleState] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setRoleState(payload.role);
    }
  }, []);

  return (
    <div className="page-root">
      {/* <Navbar setAuth={setAuth} setRole={setRole} /> */}

      <div className="dash-hero">
        <div className="dash-hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <h1 className="dash-hero-title">Your Dashboard</h1>
        <p className="dash-hero-sub">Access your files, upload documents, and manage your workspace.</p>

        <div className="dash-action-grid">

          <Link to="/upload" className="dash-action-card">
            <div className="dash-action-icon dash-action-icon--blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="dash-action-label">Upload File</span>
          </Link>

          <Link to="/my-files" className="dash-action-card">
            <div className="dash-action-icon dash-action-icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="dash-action-label">My Files</span>
          </Link>

          {role === 'admin' && (
            <Link to="/files" className="dash-action-card">
              <div className="dash-action-icon dash-action-icon--violet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <span className="dash-action-label">All Files</span>
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}