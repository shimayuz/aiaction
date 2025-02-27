import axios from 'axios';

// APIのベースURL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// axiosのインスタンスを作成
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
api.interceptors.request.use(
  (config) => {
    // ローカルストレージからトークンを取得
    const token = localStorage.getItem('token');
    
    // トークンが存在する場合、ヘッダーに追加
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 認証エラー（401）の場合
    if (error.response && error.response.status === 401) {
      // トークンをクリア
      localStorage.removeItem('token');
      // ログインページにリダイレクト
      // window.location = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
