import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AIアクションプランナー・ハビットコーチ</h3>
            <p>あなたの目標達成と習慣形成をサポートする曼荼羅チャートベースのAIアシスタント</p>
          </div>
          <div className="footer-section">
            <h3>リンク</h3>
            <ul>
              <li><a href="/">ホーム</a></li>
              <li><a href="/mandala">曼荼羅チャート</a></li>
              <li><a href="/dashboard">ダッシュボード</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} AIアクションプランナー・ハビットコーチ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
