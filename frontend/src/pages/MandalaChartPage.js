import React, { useState, useRef } from 'react';
import MandalaChart from '../components/mandala/MandalaChart';
import MandalaGrid9x9Enhanced from '../components/mandala/MandalaGrid9x9Enhanced';
import MandalaForm from '../components/mandala/MandalaForm';
import mandalaService from '../services/mandalaService';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import '../styles/MandalaGrid9x9Enhanced.css';
import '../styles/MandalaChartPage.css';

const MandalaChartPage = () => {
  const [mainTheme, setMainTheme] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mandalaContent, setMandalaContent] = useState(null);
  const [displayMode, setDisplayMode] = useState('grid9x9'); // 'grid9x9' または 'grid3x3'
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' または 'single'
  const mandalaRef = useRef(null);
  const mandala9x9Ref = useRef(null);

  // AIによる曼荼羅チャート生成処理
  const handleGenerate = async (theme) => {
    try {
      setIsLoading(true);
      setMainTheme(theme);
      
      // 実際のAPIを呼び出す
      console.log('曼荼羅チャート生成リクエスト:', theme);
      const response = await mandalaService.generateMandalaChart(theme);
      console.log('曼荼羅チャート生成レスポンス:', response);
      
      if (response && response.mandala && response.mandala.mandalaContent) {
        console.log('曼荼羅コンテンツ:', response.mandala.mandalaContent);
        setMandalaContent(response.mandala.mandalaContent);
        
        // 旧形式との互換性のために、cellsも設定
        if (response.mandala.cells) {
          setChartData(response.mandala.cells);
        } else if (response.mandala.mandalaContent.themes) {
          // 9×9から3×3への変換（簡易版）
          const simplifiedCells = [
            response.mandala.mandalaContent.themes[0].name,
            response.mandala.mandalaContent.themes[1].name,
            response.mandala.mandalaContent.themes[2].name,
            response.mandala.mandalaContent.themes[3].name,
            response.mandala.mandalaContent.centerGoal,
            response.mandala.mandalaContent.themes[4].name,
            response.mandala.mandalaContent.themes[5].name,
            response.mandala.mandalaContent.themes[6].name,
            response.mandala.mandalaContent.themes[7].name
          ];
          setChartData(simplifiedCells);
        }
      }
      
      setIsGenerated(true);
      setIsSaved(false);
    } catch (error) {
      console.error('曼荼羅チャート生成エラー:', error);
      toast.error('曼荼羅チャートの生成中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  // 曼荼羅チャートを保存する処理
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // 保存するデータを準備
      const mandalaData = {
        mainTheme,
        mandalaContent
      };
      
      // 実際のAPIを呼び出す
      await mandalaService.saveMandalaChart(mandalaData);
      
      setIsSaved(true);
      toast.success('曼荼羅チャートが保存されました！');
    } catch (error) {
      console.error('曼荼羅チャート保存エラー:', error);
      toast.error('曼荼羅チャートの保存中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  // 新しい曼荼羅チャートを作成するためのリセット処理
  const handleReset = () => {
    setMainTheme('');
    setChartData(Array(9).fill(""));
    setMandalaContent(null);
    setIsGenerated(false);
    setIsSaved(false);
  };

  // 旧形式との互換性のために残す
  const [chartData, setChartData] = useState(Array(9).fill(""));
  
  // セルの内容が変更された時の処理
  const handleCellChange = (index, value) => {
    const newChartData = [...chartData];
    newChartData[index] = value;
    setChartData(newChartData);
  };

  // マンダラチャートをPNGとしてダウンロードする関数
  const downloadAsPNG = async (gridType) => {
    try {
      setIsDownloading(true);
      let element;
      let filename;

      if (gridType === '3x3') {
        element = mandalaRef.current;
        filename = 'mandala-chart-3x3.png';
      } else {
        element = mandala9x9Ref.current;
        filename = 'mandala-chart-9x9.png';
      }

      if (!element) {
        toast.error('ダウンロード対象の要素が見つかりません');
        setIsDownloading(false);
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2, // 高解像度
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      // canvasをPNG形式に変換
      const image = canvas.toDataURL('image/png');
      
      // ダウンロードリンクを作成
      const link = document.createElement('a');
      link.href = image;
      link.download = filename;
      link.click();
      
      toast.success(`マンダラチャートを${filename}としてダウンロードしました`);
    } catch (err) {
      console.error('ダウンロード中にエラーが発生しました:', err);
      toast.error('ダウンロード中にエラーが発生しました');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mandala-container">
      <h1 className="mandala-title">曼荼羅チャート作成</h1>
      
      {!isGenerated ? (
        <MandalaForm onGenerate={handleGenerate} isLoading={isLoading} />
      ) : (
        <>
          <div className="card">
            <h2 className="card-title">
              {mainTheme} の曼荼羅チャート
              {isSaved && <span className="text-success"> (保存済み)</span>}
            </h2>
            
            {/* 表示モード切り替えボタン */}
            <div className="display-mode-toggle">
              <button 
                className={`btn ${viewMode === 'side-by-side' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('side-by-side')}
              >
                3×3と9×9を並べて表示
              </button>
              <button 
                className={`btn ${viewMode === 'single' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('single')}
              >
                単一表示
              </button>
            </div>
            
            {viewMode === 'single' && (
              <div className="display-mode-toggle">
                <button 
                  className={`btn ${displayMode === 'grid9x9' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDisplayMode('grid9x9')}
                >
                  9×9グリッド表示
                </button>
                <button 
                  className={`btn ${displayMode === 'grid3x3' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDisplayMode('grid3x3')}
                >
                  3×3グリッド表示
                </button>
              </div>
            )}
            
            {/* 表示モードに応じたコンポーネントを表示 */}
            {viewMode === 'side-by-side' ? (
              <div className="mandala-view-container">
                <div className="mandala-3x3-view">
                  <h3>3×3 概要</h3>
                  <div ref={mandalaRef}>
                    <MandalaChart 
                      mainTheme={mainTheme} 
                      isGenerated={isGenerated} 
                      chartData={chartData}
                      onCellChange={handleCellChange}
                    />
                  </div>
                </div>
                <div className="mandala-9x9-view">
                  <h3>9×9 詳細</h3>
                  {mandalaContent && <div ref={mandala9x9Ref}><MandalaGrid9x9Enhanced mandalaContent={mandalaContent} /></div>}
                </div>
              </div>
            ) : (
              displayMode === 'grid9x9' && mandalaContent ? (
                <div ref={mandala9x9Ref}><MandalaGrid9x9Enhanced mandalaContent={mandalaContent} /></div>
              ) : (
                <div ref={mandalaRef}><MandalaChart 
                  mainTheme={mainTheme} 
                  isGenerated={isGenerated} 
                  chartData={chartData}
                  onCellChange={handleCellChange}
                /></div>
              )
            )}
            
            <div className="mandala-actions">
              <button 
                className="btn btn-secondary" 
                onClick={handleReset}
                disabled={isLoading}
              >
                新しいチャートを作成
              </button>
              
              <button 
                className="btn btn-primary" 
                onClick={handleSave}
                disabled={isSaved || isLoading}
              >
                {isLoading ? '処理中...' : isSaved ? '保存済み' : 'チャートを保存'}
              </button>
              <button 
                className="btn btn-download" 
                onClick={() => downloadAsPNG('3x3')}
                disabled={isLoading || isDownloading}
              >
                {isDownloading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    ダウンロード中...
                  </>
                ) : (
                  <>
                    <i className="fas fa-download download-icon"></i>
                    3×3グリッドをPNGでダウンロード
                  </>
                )}
              </button>
              <button 
                className="btn btn-download" 
                onClick={() => downloadAsPNG('9x9')}
                disabled={isLoading || isDownloading}
              >
                {isDownloading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    ダウンロード中...
                  </>
                ) : (
                  <>
                    <i className="fas fa-download download-icon"></i>
                    9×9グリッドをPNGでダウンロード
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mandala-info">
            <h3>曼荼羅チャートの使い方</h3>
            <p>
              1. 中央のセルにはメインテーマが配置されています。<br />
              2. 周囲の8つのテーマには、メインテーマを達成するための要素が配置されています。<br />
              3. 各テーマには8つのサブゴールがあり、具体的な行動項目として活用できます。<br />
              4. テーマをクリックすると、そのテーマに関連するサブゴールが表示されます。<br />
              5. 満足したら「チャートを保存」ボタンをクリックして保存しましょう。<br />
              6. このチャートを基に、タスクの優先順位付けや時間配分の提案を受け取ることができます。
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MandalaChartPage;
