import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>AIアクションプランナー・ハビットコーチ</h1>
          <p className="hero-description">
            大谷翔平選手も活用した曼荼羅チャートと最新のAI技術を組み合わせ、<br />
            あなたの目標達成と習慣形成をサポートします。
          </p>
          <div className="hero-buttons">
            <Link to="/mandala" className="btn btn-primary btn-lg">曼荼羅チャートを作成する</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">主な機能</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>AIによる曼荼羅チャート生成</h3>
            <p>あなたのメインテーマから、AIが最適な曼荼羅チャートを自動生成します。</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>タスク優先順位付け</h3>
            <p>曼荼羅チャートから抽出されたタスクの優先順位と実行順序を自動で提案します。</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AIメンターチャットボット</h3>
            <p>進捗確認やアドバイスを提供するインタラクティブなAIメンターがサポートします。</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>ゲーミフィケーション</h3>
            <p>タスク達成に応じたポイントやバッジ獲得で、モチベーションを維持します。</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">利用の流れ</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>メインテーマを入力</h3>
            <p>あなたの達成したい目標や課題をメインテーマとして入力します。</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>曼荼羅チャートを生成</h3>
            <p>AIが最適なサブテーマを持つ曼荼羅チャートを自動生成します。</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>タスクの優先順位確認</h3>
            <p>生成されたタスクの優先順位と時間配分の提案を確認します。</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>習慣化をサポート</h3>
            <p>AIメンターとゲーミフィケーション機能であなたの習慣形成を支援します。</p>
          </div>
        </div>
        
        <div className="cta-container">
          <Link to="/mandala" className="btn btn-primary">今すぐ始める</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
