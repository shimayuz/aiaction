const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'ユーザー名を入力してください'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'メールアドレスを入力してください'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'メールアドレスの形式が正しくありません'],
  },
  password: {
    type: String,
    required: [true, 'パスワードを入力してください'],
    minlength: [8, 'パスワードは8文字以上である必要があります'],
    select: false,
  },
  level: {
    type: Number,
    default: 1,
  },
  points: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: 'default.png',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// パスワードハッシュ化のミドルウェア
userSchema.pre('save', async function(next) {
  // パスワードが変更されていない場合は処理をスキップ
  if (!this.isModified('password')) return next();
  
  try {
    // パスワードのハッシュ化
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// パスワード検証メソッド
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
