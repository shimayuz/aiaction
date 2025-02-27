import React, { useState, useEffect } from 'react';
import '../../styles/MandalaGrid9x9Enhanced.css';

const MandalaGrid9x9Enhanced = ({ mandalaContent }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [normalizedContent, setNormalizedContent] = useState(null);

  // テーマとサブゴールの配置を計算
  const calculateGridLayout = () => {
    if (!normalizedContent || !normalizedContent.themes) {
      return Array(81).fill().map(() => ({ content: '', className: '', dataRow: -1, dataCol: -1 }));
    }

    const { centerGoal, themes } = normalizedContent;
    const grid = Array(81).fill().map(() => ({ content: '', className: '', dataRow: -1, dataCol: -1 }));

    // 中心セル (4,4) - 0-indexedで考えると
    const centerIndex = 40; // 9x9グリッドの中心
    grid[centerIndex] = { 
      content: centerGoal, 
      className: 'center-cell',
      dataRow: 4,
      dataCol: 4
    };

    // テーマの配置 (中心を囲む8つのセル)
    const themePositions = [
      { row: 3, col: 4 }, // 上
      { row: 3, col: 5 }, // 右上
      { row: 4, col: 5 }, // 右
      { row: 5, col: 5 }, // 右下
      { row: 5, col: 4 }, // 下
      { row: 5, col: 3 }, // 左下
      { row: 4, col: 3 }, // 左
      { row: 3, col: 3 }  // 左上
    ];

    // サブテーマエリアの中心位置
    const subthemeCenters = [
      { row: 1, col: 4 }, // 上エリアの中心
      { row: 1, col: 7 }, // 右上エリアの中心
      { row: 4, col: 7 }, // 右エリアの中心
      { row: 7, col: 7 }, // 右下エリアの中心
      { row: 7, col: 4 }, // 下エリアの中心
      { row: 7, col: 1 }, // 左下エリアの中心
      { row: 4, col: 1 }, // 左エリアの中心
      { row: 1, col: 1 }  // 左上エリアの中心
    ];

    // テーマを配置
    themes.forEach((theme, index) => {
      if (index >= 8) return; // 最大8テーマまで

      // メインの3x3グリッド内のテーマ配置
      const { row, col } = themePositions[index];
      const gridIndex = row * 9 + col;
      grid[gridIndex] = { 
        content: theme.name, 
        className: `theme-cell theme-${index + 1}`,
        themeIndex: index + 1,
        dataRow: row,
        dataCol: col
      };

      // サブゴールの配置 (各テーマの外側)
      const subgoalPositions = getSubgoalPositions(index);
      
      // サブテーマエリアの中心位置を取得
      const { row: subCenterRow, col: subCenterCol } = subthemeCenters[index];
      const subCenterIndex = subCenterRow * 9 + subCenterCol;
      
      // サブテーマの中心にテーマ名を配置
      grid[subCenterIndex] = { 
        content: theme.name, 
        className: `theme-cell theme-${index + 1} subtheme-center`,
        themeIndex: index + 1,
        dataRow: subCenterRow,
        dataCol: subCenterCol
      };
      
      // サブゴールを配置
      if (theme.subgoals && Array.isArray(theme.subgoals)) {
        theme.subgoals.forEach((subgoal, subIndex) => {
          if (subIndex < subgoalPositions.length) {
            const { subRow, subCol } = subgoalPositions[subIndex];
            const subgoalIndex = subRow * 9 + subCol;
            
            // 範囲内かつ既に配置されていないことを確認
            if (
              subRow >= 0 && subRow < 9 && 
              subCol >= 0 && subCol < 9 && 
              grid[subgoalIndex].content === ''
            ) {
              grid[subgoalIndex] = { 
                content: subgoal, 
                className: `theme-${index + 1}-subgoal`,
                themeIndex: index + 1,
                dataRow: subRow,
                dataCol: subCol
              };
            }
          }
        });
      }
    });

    // すべてのセルにdata属性を追加
    for (let index = 0; index < 81; index++) {
      if (grid[index].dataRow === -1) {
        const row = Math.floor(index / 9);
        const col = index % 9;
        grid[index].dataRow = row;
        grid[index].dataCol = col;
      }
    }

    return grid;
  };

  // データ構造を正規化
  useEffect(() => {
    if (mandalaContent) {
      // データ構造の正規化
      const normalized = {
        centerGoal: mandalaContent.centerGoal,
        themes: mandalaContent.themes.map(theme => ({
          name: theme.name || theme.themeName,
          subgoals: theme.subgoals || theme.subGoals || []
        }))
      };
      setNormalizedContent(normalized);
    }
  }, [mandalaContent]);

  // テーマのインデックスに基づいてサブゴールの位置を計算
  const getSubgoalPositions = (themeIndex) => {
    // テーマの位置に基づいてサブゴールの位置を決定
    switch (themeIndex) {
      // 上のテーマ (テーマ1)
      case 0:
        return [
          { subRow: 0, subCol: 3 },
          { subRow: 0, subCol: 4 },
          { subRow: 0, subCol: 5 },
          { subRow: 1, subCol: 3 },
          { subRow: 1, subCol: 5 },
          { subRow: 2, subCol: 3 },
          { subRow: 2, subCol: 4 },
          { subRow: 2, subCol: 5 }
        ];
      
      // 右上のテーマ (テーマ2)
      case 1:
        return [
          { subRow: 0, subCol: 6 },
          { subRow: 0, subCol: 7 },
          { subRow: 0, subCol: 8 },
          { subRow: 1, subCol: 6 },
          { subRow: 1, subCol: 8 },
          { subRow: 2, subCol: 6 },
          { subRow: 2, subCol: 7 },
          { subRow: 2, subCol: 8 }
        ];
      
      // 右のテーマ (テーマ3)
      case 2:
        return [
          { subRow: 3, subCol: 6 },
          { subRow: 3, subCol: 7 },
          { subRow: 3, subCol: 8 },
          { subRow: 4, subCol: 6 },
          { subRow: 4, subCol: 8 },
          { subRow: 5, subCol: 6 },
          { subRow: 5, subCol: 7 },
          { subRow: 5, subCol: 8 }
        ];
      
      // 右下のテーマ (テーマ4)
      case 3:
        return [
          { subRow: 6, subCol: 6 },
          { subRow: 6, subCol: 7 },
          { subRow: 6, subCol: 8 },
          { subRow: 7, subCol: 6 },
          { subRow: 7, subCol: 8 },
          { subRow: 8, subCol: 6 },
          { subRow: 8, subCol: 7 },
          { subRow: 8, subCol: 8 }
        ];
      
      // 下のテーマ (テーマ5)
      case 4:
        return [
          { subRow: 6, subCol: 3 },
          { subRow: 6, subCol: 4 },
          { subRow: 6, subCol: 5 },
          { subRow: 7, subCol: 3 },
          { subRow: 7, subCol: 5 },
          { subRow: 8, subCol: 3 },
          { subRow: 8, subCol: 4 },
          { subRow: 8, subCol: 5 }
        ];
      
      // 左下のテーマ (テーマ6)
      case 5:
        return [
          { subRow: 6, subCol: 0 },
          { subRow: 6, subCol: 1 },
          { subRow: 6, subCol: 2 },
          { subRow: 7, subCol: 0 },
          { subRow: 7, subCol: 2 },
          { subRow: 8, subCol: 0 },
          { subRow: 8, subCol: 1 },
          { subRow: 8, subCol: 2 }
        ];
      
      // 左のテーマ (テーマ7)
      case 6:
        return [
          { subRow: 3, subCol: 0 },
          { subRow: 3, subCol: 1 },
          { subRow: 3, subCol: 2 },
          { subRow: 4, subCol: 0 },
          { subRow: 4, subCol: 2 },
          { subRow: 5, subCol: 0 },
          { subRow: 5, subCol: 1 },
          { subRow: 5, subCol: 2 }
        ];
      
      // 左上のテーマ (テーマ8)
      case 7:
        return [
          { subRow: 0, subCol: 0 },
          { subRow: 0, subCol: 1 },
          { subRow: 0, subCol: 2 },
          { subRow: 1, subCol: 0 },
          { subRow: 1, subCol: 2 },
          { subRow: 2, subCol: 0 },
          { subRow: 2, subCol: 1 },
          { subRow: 2, subCol: 2 }
        ];
      
      default:
        return Array(8).fill().map(() => ({ subRow: -1, subCol: -1 }));
    }
  };

  // セルがクリックされたときの処理
  const handleCellClick = (cell, index) => {
    if (cell.content) {
      setSelectedCell({
        content: cell.content,
        themeIndex: cell.themeIndex,
        index
      });
      setModalActive(true);
    }
  };

  // モーダルを閉じる
  const closeModal = () => {
    setModalActive(false);
    setTimeout(() => setSelectedCell(null), 300);
  };

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // グリッドレイアウトを計算
  const gridLayout = normalizedContent ? calculateGridLayout() : [];

  if (!normalizedContent) {
    return <div className="mandala-loading">読み込み中...</div>;
  }

  return (
    <div className="mandala-9x9-enhanced">
      <div className="mandala-9x9-grid">
        {gridLayout.map((cell, index) => {
          return (
            <div 
              key={index}
              className={`mandala-9x9-cell ${cell.className}`}
              onClick={() => handleCellClick(cell, index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCellClick(cell, index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={cell.content ? cell.content : "空のセル"}
              data-row={cell.dataRow}
              data-col={cell.dataCol}
            >
              {cell.content}
            </div>
          );
        })}
      </div>

      {/* セル詳細モーダル */}
      {modalActive && (
        <div 
          className="mandala-cell-modal-overlay" 
          role="presentation"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
        >
          <div 
            className="mandala-cell-modal-content"
            role="dialog"
            aria-modal="true"
          >
            <button 
              className="mandala-cell-modal-close" 
              onClick={closeModal}
              aria-label="閉じる"
            >
              ×
            </button>
            {selectedCell && (
              <>
                <h3 className="mandala-cell-modal-title">
                  {selectedCell.themeIndex ? 
                    (selectedCell.className === 'theme-cell' ? 
                      `テーマ ${selectedCell.themeIndex}` : 
                      `サブゴール (テーマ ${selectedCell.themeIndex})`) : 
                    '中心目標'}
                </h3>
                <p>{selectedCell.content}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MandalaGrid9x9Enhanced;
