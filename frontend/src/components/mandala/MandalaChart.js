import React from 'react';
import MandalaCell from './MandalaCell';
import '../../styles/MandalaChart.css';

const MandalaChart = ({ mainTheme, chartData, isGenerated, onCellChange }) => {
  // セルの配置順序（3x3グリッド）
  const cellOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  
  return (
    <div className="mandala-grid">
      {cellOrder.map((index) => (
        <MandalaCell
          key={index}
          index={index}
          content={index === 4 ? mainTheme : chartData[index]}
          isCenter={index === 4}
          isGenerated={isGenerated}
          onCellChange={onCellChange}
        />
      ))}
    </div>
  );
};

export default MandalaChart;
