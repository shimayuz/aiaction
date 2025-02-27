import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  // ダミーデータ
  const userStats = {
    completedTasks: 12,
    pendingTasks: 5,
    streak: 7,
    points: 325,
    level: 3
  };
  
  // ダミーの曼荼羅チャートリスト
  const mandalaCharts = [
    { id: 1, title: 'プログラミングスキル向上', createdAt: '2025-02-15', progress: 65 },
    { id: 2, title: '健康的な生活習慣', createdAt: '2025-02-20', progress: 30 }
  ];
  
  // ダミーのタスクリスト
  const tasks = [
    { id: 1, title: 'Reactの基礎を学ぶ', priority: 'high', status: 'completed', dueDate: '2025-02-25' },
    { id: 2, title: 'Node.jsのチュートリアルを完了する', priority: 'medium', status: 'in-progress', dueDate: '2025-02-28' },
    { id: 3, title: 'モンゴDBの使い方を学ぶ', priority: 'low', status: 'pending', dueDate: '2025-03-05' },
    { id: 4, title: '朝のジョギング', priority: 'high', status: 'in-progress', dueDate: '2025-02-27' }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">マイダッシュボード</h1>
      
      <div className="dashboard-grid">
        {/* 左サイドバー: ユーザー情報と統計 */}
        <div className="dashboard-sidebar">
          <div className="user-profile card">
            <div className="user-avatar">
              <span>🧑</span>
            </div>
            <h2>ユーザー様</h2>
            <p className="user-level">レベル {userStats.level}</p>
            <div className="level-progress">
              <div className="progress-bar" style={{ width: `${(userStats.points % 100) / 100 * 100}%` }}></div>
            </div>
            <p className="user-points">{userStats.points} ポイント</p>
          </div>
          
          <div className="user-stats card">
            <h3>統計情報</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{userStats.completedTasks}</span>
                <span className="stat-label">完了タスク</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{userStats.pendingTasks}</span>
                <span className="stat-label">保留中</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{userStats.streak}</span>
                <span className="stat-label">連続日数</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* メインコンテンツエリア */}
        <div className="dashboard-main">
          {/* タスク一覧 */}
          <div className="tasks-section card">
            <div className="section-header">
              <h2>最近のタスク</h2>
              <span className="task-count">{tasks.length}</span>
            </div>
            
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`task-item priority-${task.priority} status-${task.status}`}>
                  <div className="task-status"></div>
                  <div className="task-content">
                    <h4>{task.title}</h4>
                    <div className="task-meta">
                      <span className="task-due">期限: {task.dueDate}</span>
                      <span className={`task-priority priority-${task.priority}`}>
                        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="btn-icon">✏️</button>
                    <button className="btn-icon">✓</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="section-footer">
              <button className="btn btn-primary">タスク管理へ</button>
            </div>
          </div>
          
          {/* 曼荼羅チャート一覧 */}
          <div className="mandala-section card">
            <div className="section-header">
              <h2>マイ曼荼羅チャート</h2>
            </div>
            
            <div className="mandala-list">
              {mandalaCharts.map(chart => (
                <div key={chart.id} className="mandala-item">
                  <div className="mandala-info">
                    <h4>{chart.title}</h4>
                    <p>作成日: {chart.createdAt}</p>
                  </div>
                  <div className="mandala-progress">
                    <div className="progress-circular">
                      <svg width="60" height="60">
                        <circle cx="30" cy="30" r="25" fill="none" stroke="#eee" strokeWidth="5" />
                        <circle 
                          cx="30" 
                          cy="30" 
                          r="25" 
                          fill="none" 
                          stroke="#4361ee" 
                          strokeWidth="5" 
                          strokeDasharray={`${chart.progress * 1.57} 157`} 
                          transform="rotate(-90 30 30)" 
                        />
                      </svg>
                      <span className="progress-text">{chart.progress}%</span>
                    </div>
                  </div>
                  <div className="mandala-actions">
                    <button className="btn btn-secondary btn-sm">詳細</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="section-footer">
              <Link to="/mandala" className="btn btn-primary">新しい曼荼羅チャートを作成</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
