import React from 'react';
import '../../styles/MandalaChart.css';

const MandalaCell = ({ content, index, isCenter, onCellChange }) => {
  const handleChange = (e) => {
    if (onCellChange) {
      onCellChange(index, e.target.value);
    }
  };

  // セルのインデックスに基づいてアニメーション遅延を設定
  const cellStyle = {
    '--index': index
  };

  return (
    <div 
      className={`mandala-cell ${isCenter ? 'center' : ''}`} 
      style={cellStyle}
    >
      <textarea
        value={content || ''}
        onChange={handleChange}
        placeholder={isCenter ? 'メインテーマ' : 'サブテーマを入力'}
        readOnly={isCenter || !onCellChange}
      />
    </div>
  );
};

export default MandalaCell;
