const mongoose = require('mongoose');

const mandalaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mainTheme: {
    type: String,
    required: [true, 'メインテーマを入力してください'],
    trim: true
  },
  // 9×9の曼荼羅チャートデータ構造
  mandalaContent: {
    centerGoal: {
      type: String,
      required: true,
      trim: true
    },
    themes: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      subgoals: [{
        type: String,
        trim: true
      }]
    }]
  },
  // 旧データ構造との互換性のために残す（非推奨）
  cells: [{
    type: String,
    default: '',
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isAIGenerated: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  // 各セルのタスクやアクションに関連する情報
  tasks: [{
    cellIndex: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    estimatedTime: {
      type: Number, // 分単位
      default: 0
    },
    dueDate: {
      type: Date
    },
    completedAt: {
      type: Date
    }
  }]
}, {
  timestamps: true
});

// インデックスを追加して検索パフォーマンスを向上
mandalaSchema.index({ user: 1, createdAt: -1 });
mandalaSchema.index({ mainTheme: 'text' });

// 曼荼羅チャートの進捗を計算する静的メソッド
mandalaSchema.methods.calculateProgress = function() {
  if (!this.tasks || this.tasks.length === 0) return 0;
  
  const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
  return Math.round((completedTasks / this.tasks.length) * 100);
};

// 保存前に進捗を更新
mandalaSchema.pre('save', function(next) {
  if (this.isModified('tasks')) {
    this.progress = this.calculateProgress();
    this.lastUpdated = Date.now();
  }
  next();
});

const Mandala = mongoose.model('Mandala', mandalaSchema);

module.exports = Mandala;
