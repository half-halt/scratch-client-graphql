import React from 'react';
import { Link } from 'react-router-dom';
import './scratch.scss';
import { Routes } from './pages/routes';
import { ManageTheme } from './components';
import { useIsAuthenticated } from './hooks';

export const Scratch: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  console.log("isAuthenticated", isAuthenticated);

  return (
    <div className="scratch-layout">
        <nav className='scratch__navbar'>
          <Link className='scratch__brand' to='/'>Scratch</Link>
          <div className='scratch__navbuttons'>
            {isAuthenticated && 
              <Link to="/logout">Logout</Link>
            }
            {!isAuthenticated &&
              <>
                <Link to="/signup">
                  Signup
                </Link>
                <Link to="/login">
                  Login
                </Link>
              </>
            }
            <ManageTheme/>
          </div>
        </nav>
        <main>
          <Routes/>
        </main>
    </div>
  );
}
