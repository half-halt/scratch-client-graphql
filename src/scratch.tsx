import React from 'react';
import { Link } from 'react-router-dom';
import './scratch.scss';
import { Routes } from './routes';

export const Scratch: React.FC = () => {
  return (
    <div className="scratch-layout">
        <nav className='scratch__navbar'>
          <Link className='scratch__brand' to='/'>Scratch</Link>
          <div className='scratch__navbuttons'>
            <Link to="/signup">
              Signup
            </Link>
            <Link to="/login">
              Login
            </Link>
          </div>
        </nav>
        <main>
          <Routes/>
        </main>
    </div>
  );
}
