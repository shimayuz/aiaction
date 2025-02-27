import React, { useState } from 'react';
import '../../styles/MandalaGrid9x9.css';

const MandalaGrid9x9 = ({ mandalaContent }) => {
  const [expandedTheme, setExpandedTheme] = useState(null);

  // テーマを展開/折りたたみするトグル関数
  const toggleTheme = (index) => {
    if (expandedTheme === index) {
      setExpandedTheme(null);
    } else {
      setExpandedTheme(index);
    }
  };

  if (!mandalaContent || !mandalaContent.themes) {
    return <div className="mandala-error">曼荼羅チャートデータがありません</div>;
  }

  return (
    <div className="mandala-grid-container">
      {/* 中心目標 */}
      <div className="mandala-center-goal">
        <h2>{mandalaContent.centerGoal}</h2>
        <p className="mandala-description">中心目標</p>
      </div>

      {/* 8つのテーマ */}
      <div className="mandala-themes-grid">
        {mandalaContent.themes.map((theme, index) => (
          <div 
            key={index} 
            className={`mandala-theme ${expandedTheme === index ? 'expanded' : ''}`}
            onClick={() => toggleTheme(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleTheme(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={expandedTheme === index}
          >
            <h3 className="theme-title">{theme.name}</h3>
            
            {expandedTheme === index && (
              <div className="theme-subgoals">
                <div className="subgoals-grid">
                  {theme.subgoals.map((subgoal, subIndex) => (
                    <div key={subIndex} className="subgoal-item">
                      <span className="subgoal-number">{subIndex + 1}</span>
                      <span className="subgoal-text">{subgoal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 詳細表示 */}
      <div className="mandala-details">
        <h3>曼荼羅チャート詳細</h3>
        
        <div className="mandala-details-content">
          <div className="center-goal-detail">
            <h4>中心目標</h4>
            <p>{mandalaContent.centerGoal}</p>
          </div>
          
          <div className="themes-details">
            {mandalaContent.themes.map((theme, index) => (
              <div key={index} className="theme-detail">
                <h4>{index + 1}. {theme.name}</h4>
                <ul className="subgoals-list">
                  {theme.subgoals.map((subgoal, subIndex) => (
                    <li key={subIndex}>{subgoal}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandalaGrid9x9;
