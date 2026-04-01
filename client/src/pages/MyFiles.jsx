import { useEffect, useState } from 'react';
import API from '../services/Api';
import Navbar from '../components/Navbar';

export default function MyFiles({ setAuth, setRole }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchMyFiles();
    }, []);

    const fetchMyFiles = async () => {
        const res = await API.get('/files/my');
        setFiles(res.data);
    };

    return (
        <div className="files-root">
            {/* <Navbar setAuth={setAuth} setRole={setRole} /> */}

            <div className="page-content">
                <h1 className="page-heading">My Files</h1>
                <p className="page-subheading">Files you have uploaded and encrypted.</p>

                <div className="section">
                    <p className="section-title">Uploaded by you</p>

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
                        <p className="empty-state">You haven't uploaded any files yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}