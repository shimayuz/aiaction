import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>AI Action Habit</h1>
          </Link>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">ホーム</Link>
            </li>
            <li>
              <Link to="/mandala">曼荼羅チャート</Link>
            </li>
            <li>
              <Link to="/dashboard">ダッシュボード</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
