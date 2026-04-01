import { useState } from 'react';
import API from '../services/Api';
import Navbar from '../components/Navbar';

export default function Upload({ setAuth, setRole }) {
    const [data, setData] = useState({
        content: '',
        role: 'Manager',
        department: 'Finance',
        message: ''
    });

    const handleUpload = async () => {
        await API.post('/files/upload', data);
        alert("File Encrypted & Uploaded 🔐");
    };

    return (
        <div className="upload-root">
            {/* <Navbar setAuth={setAuth} setRole={setRole} /> */}

            <div className="upload-wrap">
                <div className="upload-card">

                    <div className="upload-icon-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>

                    <h2 className="auth-title" style={{ marginBottom: '4px' }}>Secure Upload</h2>
                    <p className="auth-subtitle">Content is encrypted before storage.</p>

                    <div className="auth-field">
                        <label className="auth-label">Secure Message</label>
                        <textarea
                            className="upload-textarea"
                            placeholder="Enter the content to encrypt and store..."
                            onChange={(e) => setData({ ...data, message: e.target.value })}
                        />
                    </div>

                    <div className="auth-row">
                        <div className="auth-field">
                            <label className="auth-label">Access Role</label>
                            <div className="auth-select-wrapper">
                                <select className="auth-select" onChange={(e) => setData({ ...data, role: e.target.value })}>
                                    <option>Manager</option>
                                    <option>Employee</option>
                                </select>
                            </div>
                        </div>
                        <div className="auth-field">
                            <label className="auth-label">Department</label>
                            <div className="auth-select-wrapper">
                                <select className="auth-select" onChange={(e) => setData({ ...data, department: e.target.value })}>
                                    <option>Finance</option>
                                    <option>HR</option>
                                    <option>IT</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleUpload} className="upload-btn">
                        Encrypt &amp; Upload
                    </button>

                </div>
            </div>
        </div>
    );
}