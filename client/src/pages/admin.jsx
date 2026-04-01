import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/Api';
import Navbar from '../components/Navbar';

export default function Admin({ setAuth, setRole }) {
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchFiles();
        fetchPending();
    }, []);

    // 📁 Get all files
    const fetchFiles = async () => {
        try {
            const res = await API.get('/files/all');
            setFiles(res.data);
        } catch (err) {
            alert("Access Denied - Admin Only ❌");
        }
    };

    // 👤 Get pending users
    const fetchPending = async () => {
        try {
            const res = await API.get('/auth/pending');
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ Approve user
    const approveUser = async (id) => {
        try {
            await API.put(`/auth/approve/${id}`);
            fetchPending();
        } catch (err) {
            alert("Error approving user ❌");
            console.log(err);
        }
    };

    return (
        <div className="page-root">
            {/* <Navbar setAuth={setAuth} setRole={setRole} /> */}

            <div className="page-content">

                <h1 className="page-heading">Admin Panel</h1>
                <p className="page-subheading">Manage users, approvals, and all vault files.</p>

                {/* Quick nav */}
                <div className="nav-actions">
                    <Link to="/upload">
                        <button className="nav-btn nav-btn--blue">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Upload File
                        </button>
                    </Link>
                    <Link to="/my-files">
                        <button className="nav-btn nav-btn--green">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            </svg>
                            My Files
                        </button>
                    </Link>
                    <Link to="/files">
                        <button className="nav-btn nav-btn--violet">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <ellipse cx="12" cy="5" rx="9" ry="3" />
                                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                            </svg>
                            View All Files
                        </button>
                    </Link>
                </div>

                {/* Pending Users */}
                <div className="section">
                    <p className="section-title">Pending Approvals</p>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className="panel-card">
                                <div className="panel-card-body">
                                    <p className="panel-card-title">{user.username}</p>
                                    <div className="panel-card-meta">
                                        <span className="meta-chip meta-chip--role">{user.role}</span>
                                        <span className="meta-chip meta-chip--dept">{user.department}</span>
                                    </div>
                                </div>
                                <button onClick={() => approveUser(user._id)} className="approve-btn">
                                    Approve ✓
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-state">No pending users — all clear.</p>
                    )}
                </div>

                {/* All Files */}
                <div className="section">
                    <p className="section-title">All Files</p>
                    {files.length > 0 ? (
                        files.map((file) => (
                            <div key={file._id} className="panel-card">
                                <div className="panel-card-body">
                                    <p className="panel-card-title">{file.filename}</p>
                                    <div className="panel-card-meta">
                                        <span className="meta-chip meta-chip--role">{file.requiredRole}</span>
                                        <span className="meta-chip meta-chip--dept">{file.requiredDepartment}</span>
                                        {file.message && (
                                            <span className="meta-chip meta-chip--msg">{file.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-state">No files uploaded yet.</p>
                    )}
                </div>

            </div>
        </div>
    );
}