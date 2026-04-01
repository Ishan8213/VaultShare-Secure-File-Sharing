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

    const downloadFile = async (id) => {
        try {
            const res = await API.get(`/files/download/${id}`, {
                responseType: 'blob'
            });

            const contentDisposition = res.headers['content-disposition'];
            let filename = 'downloaded-file';
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.*)"?/);
                if (match && match[1]) filename = match[1];
            }

            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert(err.response?.data?.message || 'Download failed');
        }
    };

    const previewFile = async (id) => {
        try {
            const res = await API.get(`/files/download/${id}`, {
                responseType: 'blob'
            });

            const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
            setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        } catch (err) {
            alert(err.response?.data?.message || 'Preview failed');
        }
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
                                {file.filePath && (
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => previewFile(file._id)}
                                            className="download-btn download-btn--blue"
                                        >
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => downloadFile(file._id)}
                                            className="download-btn download-btn--green"
                                        >
                                            Download
                                        </button>
                                    </div>
                                )}
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