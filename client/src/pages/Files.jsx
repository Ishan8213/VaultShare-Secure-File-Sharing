import { useEffect, useState } from 'react';
import API from '../services/Api';
import Navbar from '../components/Navbar';

export default function Files({ setAuth, setRole }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await API.get('/files/all');
    setFiles(res.data);
  };

  const downloadFile = async (id) => {
    try {
      const res = await API.get(`/files/download/${id}`);
      alert("Decrypted Data: " + res.data.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="files-root">
      {/* <Navbar setAuth={setAuth} setRole={setRole} /> */}

      <div className="page-content">
        <h1 className="page-heading">All Files</h1>
        <p className="page-subheading">Browse and decrypt files you have access to.</p>

        <div className="section">
          <p className="section-title">Vault Contents</p>

          {files.length > 0 ? (
            files.map((file) => (
              <div key={file._id} className="panel-card">
                <div className="panel-card-body">
                  <p className="panel-card-title">{file.filename}</p>
                  <div className="panel-card-meta">
                    <span className="meta-chip meta-chip--role">{file.requiredRole}</span>
                    <span className="meta-chip meta-chip--dept">{file.requiredDepartment}</span>
                  </div>
                </div>
                <button onClick={() => downloadFile(file._id)} className="download-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Decrypt
                </button>
              </div>
            ))
          ) : (
            <p className="empty-state">No files found in the vault.</p>
          )}
        </div>
      </div>
    </div>
  );
}