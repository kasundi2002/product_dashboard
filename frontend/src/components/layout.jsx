import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
const layout = () => {
  return (
    <div>
      <Navbar/>
      <div className="content">
        <Outlet />  {/* This will render the page content based on the current route */}
      </div>
    </div>
  )
}

export default layout
