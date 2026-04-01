import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Files from './pages/Files';
import Admin from './pages/admin';
import MyFiles from './pages/MyFiles';
import Register from './pages/Register';

import Navbar from './components/Navbar';

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(String(localStorage.getItem('role') || '').toLowerCase());

  return (
    <BrowserRouter>
      {/* 🔒 Show Navbar ONLY when logged in */}
      {auth && <Navbar setAuth={setAuth} setRole={setRole} />}

      <Routes>
        {!auth ? (
          <>
            <Route path="/" element={<Login setAuth={setAuth} setRole={setRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login setAuth={setAuth} setRole={setRole} />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={role === 'admin' ? <Navigate replace to="/admin" /> : <Dashboard />}
            />
            <Route path="/upload" element={<Upload />} />
            <Route path="/files" element={<Files />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/my-files" element={<MyFiles />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}