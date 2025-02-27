import React, { useState } from 'react';
import '../../styles/MandalaChart.css';

const MandalaForm = ({ onGenerate, isLoading }) => {
  const [theme, setTheme] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!theme.trim()) {
      setError('メインテーマを入力してください。');
      return;
    }
    
    setError('');
    onGenerate(theme);
  };

  const handleInputChange = (e) => {
    setTheme(e.target.value);
    if (error) setError('');
  };

  // テーマの例
  const themeExamples = [
    "健康的な生活習慣を身につける",
    "プログラミングスキルを向上させる",
    "ワークライフバランスを改善する",
    "副業で収入を増やす",
    "人間関係を豊かにする"
  ];

  // ランダムなテーマ例を選択
  const selectRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * themeExamples.length);
    setTheme(themeExamples[randomIndex]);
  };

  return (
    <div className="mandala-form-container">
      <form className="mandala-form" onSubmit={handleSubmit}>
        <h2 className="form-title">曼荼羅チャートを作成</h2>
        <p className="form-description">
          あなたの目標や達成したいことをメインテーマとして入力してください。
          AIが自動的に8つのテーマと64のサブゴールを含む曼荼羅チャートを生成します。
        </p>
        
        <div className="form-group">
          <label htmlFor="theme">メインテーマ</label>
          <div className="input-group">
            <input
              type="text"
              id="theme"
              className="form-control"
              value={theme}
              onChange={handleInputChange}
              placeholder="例: 健康的な生活習慣を身につける"
              disabled={isLoading}
            />
            <button 
              type="button" 
              className="btn btn-outline-primary btn-example"
              onClick={selectRandomTheme}
              disabled={isLoading}
            >
              例を表示
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                生成中...
              </>
            ) : (
              '曼荼羅チャートを生成'
            )}
          </button>
        </div>
      </form>
      
      <div className="mandala-info">
        <h3>曼荼羅チャートとは？</h3>
        <p>
          曼荼羅チャートは、目標達成のための強力な視覚化ツールです。中央に主要な目標を置き、
          その周りに8つのテーマを配置します。さらに各テーマには8つのサブゴールがあり、
          合計で1つの中心目標、8つのテーマ、64のサブゴールからなる9×9のグリッドを形成します。
          <br /><br />
          このチャートを使うことで、大きな目標を小さな行動に分解し、体系的に取り組むことができます。
          AIが自動生成した内容をそのまま使用するか、自分の状況に合わせて編集することもできます。
        </p>
      </div>
    </div>
  );
};

export default MandalaForm;
