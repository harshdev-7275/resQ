import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Hero from './component/Hero';
import Login from './component/Login';
import AdminDashboard from './component/AdminDashboard';
import AdminCRUD from './component/AdminCRUD';
import CreateAmbulance from './component/CreateAmbulance';
import CreateTraffic from './component/CreateTraffic';
import CreateHospital from './component/CreateHospital';

const App = () => {
  return (
    <Router>
    <Routes>
      {/* Route for the home page */}
      <Route path="/" element={<Layout><Hero /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/admin/dashboard/createAmbulance" element={<Layout><CreateAmbulance /></Layout>} />
        <Route path="/admin/dashboard/createTraffic" element={<Layout><CreateTraffic /></Layout>} />
        <Route path="/admin/dashboard/createHospital" element={<Layout><CreateHospital /></Layout>} />
        <Route path="/admin/dashboard/:id" element={<Layout><AdminCRUD /></Layout>} />

      
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  )
}

export default App