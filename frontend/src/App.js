import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout';
import HomePage from './pages/HomePage';
import ManageProductsPage from './pages/ManageProductsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} /> {/* Default route */}
              <Route path="/home" element={<HomePage/>} />
              <Route path="/manage" element={<ManageProductsPage/>} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;

