const Mandala = require('../models/mandalaModel');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini API設定
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 指定したテーマに基づいて曼荼羅チャートを生成するヘルパー関数
const generateMandalaContent = async (mainTheme) => {
  try {
    const prompt = `
{
  "systemInstructions": {
    "overallGoal": "ユーザーから「中心目標（最終ゴール）」を受け取り、対話なしで自律的に9×9の曼荼羅チャートをJSON形式で自動生成すること。",
    "steps": [
      {
        "stepNumber": 1,
        "title": "中心目標の特定と具体化（AIエージェントによる自律実行）",
        "instructions": [
          "ユーザーから中心目標を受け取ります。",
          "AIエージェントは、ユーザーの回答を詳細に解析し、中心目標を特定します。",
          "中心目標が曖昧であるとAIエージェントが判断した場合、事前に用意された質問リスト（例：目標達成状態の具体化、価値・変化、最重要要素など）を用いて、内部的に目標を具体化・明確化します。",
          "AIエージェントは、内部的な具体化プロセスを経て、最終的な中心目標を一つに決定し、簡潔に要約します。",
          "このステップでは、ユーザーへの確認は行わず、AIエージェントが自律的に中心目標を確定します。"
        ],
        "outputFormat": "内部的に中心目標を確定・要約（ユーザーへの出力はステップ4まで保留）"
      },
      {
        "stepNumber": 2,
        "title": "中心目標達成のための8つのテーマ設定（AIエージェントによる自律実行）",
        "instructions": [
          "AIエージェントは、ステップ1で確定した中心目標に基づき、目標達成に必要な要素を多角的な視点から検討し、8つのテーマを自律的に設定します。",
          "テーマ設定の際には、事前に用意されたカテゴリリスト（例：外部環境、内的要因、技術面、精神面、健康面、経済面、人間関係、学習・成長など）を参考に、網羅的かつ中心目標達成に不可欠な要素を選定します。",
          "各テーマは1〜3語程度のキーワードで表現し、内部的に記録します。",
          "このステップでは、ユーザーへのテーマ確認は行わず、AIエージェントが自律的にテーマを決定します。"
        ],
        "outputFormat": "内部的に8つのテーマを決定・記録（ユーザーへの出力はステップ4まで保留）"
      },
      {
        "stepNumber": 3,
        "title": "各テーマに対応する64個のサブゴール生成（AIエージェントによる自律実行）",
        "instructions": [
          "AIエージェントは、ステップ2で確定した8つのテーマそれぞれに対し、具体的かつ測定可能なサブゴールを8つずつ自律的に生成します。",
          "サブゴール生成時には、SMART原則（Specific, Measurable, Achievable, Relevant, Time-bound）を考慮し、質が高く実行可能な内容を目指します。",
          "生成されたサブゴールは、テーマと紐付けて内部的に記録します。",
          "AIエージェントは、生成されたサブゴール群を内部的に評価し、不要な項目、重複項目、難易度過剰な項目などを自動的に調整・修正・再生成します。",
          "このステップでは、ユーザーへのサブゴール確認は行わず、AIエージェントが自律的にサブゴールを決定します。"
        ],
        "outputFormat": "内部的に64個のサブゴールを生成・記録（ユーザーへの出力はステップ4まで保留）"
      },
      {
        "stepNumber": 4,
        "title": "曼荼羅チャートのJSON形式での出力",
        "instructions": [
          "AIエージェントは、ステップ1～3で内部的に決定・記録した中心目標、8つのテーマ、64個のサブゴールを統合し、以下のJSON形式で出力します。",
          "JSON形式：\\n\`json\\n{\\n  \\"centralGoal\\": \\"【中心目標】\\",\\n  \\"themes\\": [\\n    {\\n      \\"themeName\\": \\"【テーマ1】\\",\\n      \\"subGoals\\": [\\n        \\"【サブゴール1-1】\\",\\n        \\"【サブゴール1-2】\\",\\n        ...\\n        \\"【サブゴール1-8】\\"\\n      ]\\n    },\\n    {\\n      \\"themeName\\": \\"【テーマ2】\\",\\n      \\"subGoals\\": [\\n        \\"【サブゴール2-1】\\",\\n        \\"【サブゴール2-2】\\",\\n        ...\\n        \\"【サブゴール2-8】\\"\\n      ]\\n    },\\n    ...\\n    {\\n      \\"themeName\\": \\"【テーマ8】\\",\\n      \\"subGoals\\": [\\n        \\"【サブゴール8-1】\\",\\n        \\"【サブゴール8-2】\\",\\n        ...\\n        \\"【サブゴール8-8】\\"\\n      ]\\n    }\\n  ]\\n}\\n\`",
          "JSON出力は、API連携を容易にするための構造化データです。",
          "必要に応じて、JSON形式に加え、テキスト形式または表形式でのチャート図も追加で出力し、ユーザーが即座に内容を把握できるようにします。",
          "テキスト形式または表形式で出力する場合は、中心目標を中央に、テーマ、サブゴールを配置した9×9の曼荼羅チャート構造を可視化してください。",
          "出力例（テキスト形式）：\\n\`\\n　　　　　　テーマ1\\n　　　サブゴール1-1　サブゴール1-2　サブゴール1-3\\nテーマ8　サブゴール1-8　　　　　　　　　サブゴール1-4　テーマ2\\nサブゴール8-1　　　　　【中心目標】　　　　　サブゴール2-1\\nテーマ7　サブゴール8-8　　　　　　　　　サブゴール2-8　テーマ3\\n　　　サブゴール7-1　サブゴール7-2　サブゴール7-3\\n　　　　　　テーマ6\\n\`"
        ],
        "outputFormat": "JSON形式、およびテキスト形式（または表形式）での曼荼羅チャート図"
      }
    ],
    "supplementaryRequirements": [
      "AIエージェントは、ユーザーとの対話なしで、初期の中心目標入力のみに基づいて自律的に曼荼羅チャートを完成させます。",
      "サブゴール生成時など、AIエージェントが必要と判断した場合、テーマやサブゴールの再構成を内部的に柔軟に行います。",
      "生成されたチャートは、必要に応じてAIエージェントが内部的に更新・改善を行います。",
      "出力される全てのテキストは、ユーザーにとって分かりやすい日本語で記述します。",
      "特にJSON出力においては、API連携を考慮し、正確なJSON形式で出力されるようにAIエージェントは注意します。",
      "AIエージェントは、効率的かつ迅速に曼荼羅チャートを生成することを目指します。"
    ],
    "finalOutputExample": {
      "exampleTitle": "最終的な出力イメージ",
      "details": [
        "中心目標を中央に配置した9×9テキストチャート（または表形式チャート）とJSON形式データの両方を提示",
        "8つのテーマと各テーマ8つのサブゴールを一覧化",
        "JSON形式データは、API連携を想定した構造化データ",
        "テキストチャートは、必要に応じて箇条書きや表形式で構成し、視認性を重視",
        "ユーザーとの対話は一切行わず、初期インプットのみでAIエージェントが自律的に生成"
      ]
    }
  }
}
`;

    console.log('Gemini APIキー:', process.env.GEMINI_API_KEY ? '設定されています' : '設定されていません');
    
    // Gemini APIを使用して曼荼羅チャートの内容を生成
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('Gemini APIレスポンス:', text);

    let mandalaContent;
    try {
      // レスポンスからJSON部分を抽出して解析
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        
        // 9×9の曼荼羅チャートデータを構造化
        mandalaContent = {
          centerGoal: parsedData.centerGoal,
          themes: parsedData.themes
        };
      } else {
        throw new Error('レスポンスからJSONを抽出できませんでした');
      }
    } catch (error) {
      console.error('JSONの解析に失敗しました:', error);
      
      // フォールバック：デフォルトの曼荼羅チャート内容
      mandalaContent = {
        centerGoal: mainTheme,
        themes: [
          {
            name: "健康維持",
            subgoals: ["毎日30分運動", "週3回ジョギング", "毎食野菜を摂取", "8時間睡眠確保", "定期健康診断", "水分摂取量増加", "ストレッチ習慣化", "体重記録"]
          },
          {
            name: "スキル向上",
            subgoals: ["週2回勉強会参加", "月1冊専門書読破", "オンライン講座受講", "資格試験準備", "メンター獲得", "実践練習", "フィードバック収集", "振り返り実施"]
          },
          {
            name: "知識習得",
            subgoals: ["新聞購読習慣", "専門書籍読書", "オンライン学習", "セミナー参加", "ポッドキャスト聴取", "記事執筆", "知識共有会", "学習記録"]
          },
          {
            name: "人間関係構築",
            subgoals: ["定期連絡", "会食機会創出", "SNS活用", "イベント参加", "感謝表現", "傾聴練習", "共通趣味発見", "人脈マップ作成"]
          },
          {
            name: "財務管理",
            subgoals: ["家計簿記録", "投資学習", "支出見直し", "収入源多様化", "節約目標設定", "資産配分検討", "税金知識習得", "将来設計"]
          },
          {
            name: "趣味の充実",
            subgoals: ["新趣味探索", "週末活動計画", "コミュニティ参加", "スキル向上", "作品制作", "発表機会", "関連書籍購読", "楽しさ記録"]
          },
          {
            name: "メンタル強化",
            subgoals: ["瞑想習慣化", "感謝日記", "ポジティブ思考", "ストレス管理", "カウンセリング", "自己肯定感向上", "目標視覚化", "マインドフルネス"]
          },
          {
            name: "社会貢献",
            subgoals: ["ボランティア参加", "寄付活動", "地域活動", "専門知識共有", "環境配慮行動", "若手指導", "社会問題学習", "活動記録"]
          }
        ]
      };
    }
    
    return mandalaContent;
  } catch (error) {
    console.error('曼荼羅チャート生成エラー:', error);
    throw error;
  }
};

// @desc    AIを使用して曼荼羅チャートを生成
// @route   POST /api/mandala/generate
// @access  Private
const generateMandalaChart = async (req, res) => {
  try {
    const { mainTheme } = req.body;
    console.log('曼荼羅チャート生成リクエスト受信:', mainTheme);
    
    if (!mainTheme) {
      return res.status(400).json({ success: false, message: 'メインテーマを指定してください' });
    }

    // 曼荼羅チャートの内容を生成
    const mandalaContent = await generateMandalaContent(mainTheme);
    console.log('生成された曼荼羅コンテンツ:', JSON.stringify(mandalaContent, null, 2));
    
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // 新しい曼荼羅チャートをデータベースに保存
    const mandala = new Mandala({
      user: dummyUserId,
      mainTheme,
      mandalaContent,
      isAIGenerated: true
    });
    
    // 開発環境ではデータベース保存を省略しても良い
    // await mandala.save();
    
    res.status(201).json({
      success: true,
      mandala: {
        _id: 'temp-id', // 本番環境では実際のIDを使用
        mainTheme,
        mandalaContent,
        isAIGenerated: true,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('曼荼羅チャート生成エラー:', error);
    res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました',
      error: error.message
    });
  }
};

// @desc    曼荼羅チャートを保存
// @route   POST /api/mandala
// @access  Private
const saveMandalaChart = async (req, res) => {
  try {
    const { mainTheme, mandalaContent } = req.body;
    
    if (!mainTheme || !mandalaContent) {
      return res.status(400).json({
        success: false,
        message: '無効なデータ形式です'
      });
    }
    
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // 新しい曼荼羅チャートをデータベースに保存
    const mandala = new Mandala({
      user: dummyUserId,
      mainTheme,
      mandalaContent,
      isAIGenerated: req.body.isAIGenerated || false
    });
    
    // 開発環境ではデータベース保存を省略しても良い
    // await mandala.save();
    
    res.status(201).json({
      success: true,
      mandala: {
        _id: 'temp-id', // 本番環境では実際のIDを使用
        mainTheme,
        mandalaContent,
        isAIGenerated: req.body.isAIGenerated || false,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('曼荼羅チャート保存エラー:', error);
    res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました',
      error: error.message
    });
  }
};

// @desc    ユーザーの曼荼羅チャート一覧を取得
// @route   GET /api/mandala
// @access  Private
const getUserMandalaCharts = async (req, res) => {
  try {
    const dummyUserId = '507f1f77bcf86cd799439011';
    
    // 実際のデータベースから取得する代わりにダミーデータを返す
    const mandalaCharts = [
      {
        _id: 'chart-id-1',
        mainTheme: 'プログラミングスキル向上',
        progress: 65,
        createdAt: new Date('2025-02-15')
      },
      {
        _id: 'chart-id-2',
        mainTheme: '健康的な生活習慣',
        progress: 30,
        createdAt: new Date('2025-02-20')
      }
    ];
    
    res.status(200).json({
      success: true,
      count: mandalaCharts.length,
      mandalaCharts
    });
  } catch (error) {
    console.error('曼荼羅チャート取得エラー:', error);
    res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました',
      error: error.message
    });
  }
};

// @desc    特定の曼荼羅チャートを取得
// @route   GET /api/mandala/:id
// @access  Private
const getMandalaChart = async (req, res) => {
  try {
    const chartId = req.params.id;
    
    // 実際のデータベースから取得する代わりにダミーデータを返す
    const mandala = {
      _id: chartId,
      mainTheme: 'プログラミングスキル向上',
      mandalaContent: {
        centerGoal: 'プログラミングスキル向上',
        themes: [
          {
            name: "健康維持",
            subgoals: ["毎日30分運動", "週3回ジョギング", "毎食野菜を摂取", "8時間睡眠確保", "定期健康診断", "水分摂取量増加", "ストレッチ習慣化", "体重記録"]
          },
          {
            name: "スキル向上",
            subgoals: ["週2回勉強会参加", "月1冊専門書読破", "オンライン講座受講", "資格試験準備", "メンター獲得", "実践練習", "フィードバック収集", "振り返り実施"]
          },
          {
            name: "知識習得",
            subgoals: ["新聞購読習慣", "専門書籍読書", "オンライン学習", "セミナー参加", "ポッドキャスト聴取", "記事執筆", "知識共有会", "学習記録"]
          },
          {
            name: "人間関係構築",
            subgoals: ["定期連絡", "会食機会創出", "SNS活用", "イベント参加", "感謝表現", "傾聴練習", "共通趣味発見", "人脈マップ作成"]
          },
          {
            name: "財務管理",
            subgoals: ["家計簿記録", "投資学習", "支出見直し", "収入源多様化", "節約目標設定", "資産配分検討", "税金知識習得", "将来設計"]
          },
          {
            name: "趣味の充実",
            subgoals: ["新趣味探索", "週末活動計画", "コミュニティ参加", "スキル向上", "作品制作", "発表機会", "関連書籍購読", "楽しさ記録"]
          },
          {
            name: "メンタル強化",
            subgoals: ["瞑想習慣化", "感謝日記", "ポジティブ思考", "ストレス管理", "カウンセリング", "自己肯定感向上", "目標視覚化", "マインドフルネス"]
          },
          {
            name: "社会貢献",
            subgoals: ["ボランティア参加", "寄付活動", "地域活動", "専門知識共有", "環境配慮行動", "若手指導", "社会問題学習", "活動記録"]
          }
        ]
      },
      isAIGenerated: true,
      progress: 65,
      tasks: [
        {
          _id: 'task-id-1',
          cellIndex: 1,
          title: 'Reactの基礎を学ぶ',
          description: 'Reactの公式ドキュメントを読み、基本的なコンポーネントを作成する',
          priority: 'high',
          status: 'completed',
          estimatedTime: 120,
          dueDate: new Date('2025-02-25')
        },
        {
          _id: 'task-id-2',
          cellIndex: 1,
          title: 'Node.jsのチュートリアルを完了する',
          description: 'RESTful APIの作成方法を学ぶ',
          priority: 'medium',
          status: 'in-progress',
          estimatedTime: 180,
          dueDate: new Date('2025-02-28')
        }
      ],
      createdAt: new Date('2025-02-15'),
      lastUpdated: new Date('2025-02-22')
    };
    
    res.status(200).json({
      success: true,
      mandala
    });
  } catch (error) {
    console.error('曼荼羅チャート取得エラー:', error);
    res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました',
      error: error.message
    });
  }
};

module.exports = {
  generateMandalaChart,
  saveMandalaChart,
  getUserMandalaCharts,
  getMandalaChart
};
