import React from 'react';
import './Navbar.css';

export default function Navbar() {
  const [logOut, setLogout] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogout(false);
    window.location = '/';
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogout(true);
    }
  }, []);

  const isMobile = window.innerWidth <= 600; // Check if mobile screen size

  return (
    <div>
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
          <h4 className="menu-item">MORE</h4>
        </div>
        <div>
          {logOut ? (
            <button className='logOutBtn' onClick={handleLogout}>Logout</button>
          ) : (
            <button id='startBtn' onClick={() => window.location = "/login"}>
              {isMobile ? 'Login' : 'Get Started'}
            </button>
          )}
        </div>
      </div>
      <div>
        {/* {logOut && <button className='logOutBtn' onClick={handleLogout}>Logout</button>} */}
      </div>
    </div>
  );
}
