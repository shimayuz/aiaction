import api from './api';

// 曼荼羅チャートに関するAPIサービス
const mandalaService = {
  // AIで曼荼羅チャートを生成
  generateMandalaChart: async (mainTheme) => {
    try {
      const response = await api.post('/mandala/generate', { mainTheme });
      return response.data;
    } catch (error) {
      console.error('曼荼羅チャート生成エラー:', error);
      throw error;
    }
  },
  
  // 曼荼羅チャートを保存
  saveMandalaChart: async (mandalaData) => {
    try {
      const response = await api.post('/mandala', mandalaData);
      return response.data;
    } catch (error) {
      console.error('曼荼羅チャート保存エラー:', error);
      throw error;
    }
  },
  
  // ユーザーの曼荼羅チャート一覧を取得
  getUserMandalaCharts: async () => {
    try {
      const response = await api.get('/mandala');
      return response.data;
    } catch (error) {
      console.error('曼荼羅チャート一覧取得エラー:', error);
      throw error;
    }
  },
  
  // 特定の曼荼羅チャートを取得
  getMandalaChart: async (id) => {
    try {
      const response = await api.get(`/mandala/${id}`);
      return response.data;
    } catch (error) {
      console.error('曼荼羅チャート取得エラー:', error);
      throw error;
    }
  },
  
  // 曼荼羅チャートを更新
  updateMandalaChart: async (id, mandalaData) => {
    try {
      const response = await api.put(`/mandala/${id}`, mandalaData);
      return response.data;
    } catch (error) {
      console.error('曼荼羅チャート更新エラー:', error);
      throw error;
    }
  },
  
  // 曼荼羅チャートのタスクを追加
  addTask: async (mandalaId, taskData) => {
    try {
      const response = await api.post(`/mandala/${mandalaId}/task`, taskData);
      return response.data;
    } catch (error) {
      console.error('タスク追加エラー:', error);
      throw error;
    }
  },
  
  // タスクのステータスを更新
  updateTaskStatus: async (mandalaId, taskId, status) => {
    try {
      const response = await api.patch(`/mandala/${mandalaId}/task/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('タスクステータス更新エラー:', error);
      throw error;
    }
  }
};

export default mandalaService;
