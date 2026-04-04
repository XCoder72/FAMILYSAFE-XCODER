import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Role from './pages/Role';
import AdminSetup from './pages/AdminSetup';
import Dashboard from './pages/Dashboard';
import MemberSetup from './pages/MemberSetup';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/role" element={<Role />} />
      <Route path="/admin-setup" element={<AdminSetup />} />
      <Route path="/member-setup" element={<MemberSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}