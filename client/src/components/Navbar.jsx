// import { useNavigate } from 'react-router-dom';

// export default function Navbar({ setAuth, setRole }) {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         if (setAuth) setAuth(false);
//         if (setRole) setRole('');
//         navigate('/');
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-brand">
//                 <div className="navbar-brand-icon">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                         <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                     </svg>
//                 </div>
//                 <span className="navbar-brand-name">VaultShare</span>
//             </div>

//             <div className="navbar-actions">
//                 <button onClick={() => navigate(-1)} className="navbar-btn navbar-btn--back">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="15 18 9 12 15 6" />
//                     </svg>
//                     Back
//                 </button>
//                 <button onClick={handleLogout} className="navbar-btn navbar-btn--logout">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                         <polyline points="16 17 21 12 16 7" />
//                         <line x1="21" y1="12" x2="9" y2="12" />
//                     </svg>
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );
// }
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setAuth, setRole }) {
    const navigate = useNavigate();
    const role = localStorage.getItem('role') || '';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        if (setAuth) setAuth(false);
        if (setRole) setRole('');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="navbar-brand-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>
                <span className="navbar-brand-name">VaultShare</span>
                {role && (
                    <span className={`topbar-badge ${role === 'admin' ? 'topbar-badge--admin' : 'topbar-badge--user'}`}>
                        {role.toUpperCase()}
                    </span>
                )}
            </div>

            <div className="navbar-actions">
                <div className="topbar-status">
                    <div className="auth-footer-dot" />
                    encrypted session
                </div>
                <button onClick={() => navigate(-1)} className="navbar-btn navbar-btn--back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back
                </button>
                <button onClick={handleLogout} className="navbar-btn navbar-btn--logout">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    );
}