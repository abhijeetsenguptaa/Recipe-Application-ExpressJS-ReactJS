import React from 'react';
import './Navbar.css'

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-menu">
        <h2>CookBook</h2>
        <div className="menu-item">
          <h4>HOME</h4>
          <div className="dropdown-content">
            <h4>Home</h4>
            <h4>Get Started</h4>
          </div>
        </div>
        <div className="menu-item">
          <h4>FEATURE</h4>
          <div className="dropdown-content">
            <h4>Import Export</h4>
          </div>
        </div>
        <div className="menu-item">
          <h4>PRICING</h4>
          <div className="dropdown-content">
            <h4>Custom Pricing</h4>
          </div>
        </div>
        <h4>MORE</h4>
      </div>
      <div>
        <button id='startBtn'>Get Started</button>
      </div>
    </div>
  )
}
