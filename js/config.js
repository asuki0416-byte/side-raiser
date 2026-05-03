// =====================================================
// ゲーム定数・グローバル設定
// =====================================================

// キャンバスサイズ
const W = 400, H = 600;

// 物理定数
const GRAVITY   = 0.55;
const JUMP_PWR  = -9.5;
const PX        = 88;   // プレイヤーX座標（固定）
const HIT_R     = 16;   // 当たり判定半径

// パイプ定数
const PIPE_W    = 68;
const PIPE_GAP  = 168;
const PIPE_SPD  = 2.3;
const SPAWN_MS  = 1700;

// パーティクル
const MAX_PARTICLES = 220;
const MAX_SHARDS    = 64;

// パーティクル（破片）
const SHARD_GRAVITY = 0.4;
const SHARD_LIFE    = 36;

// 時刻システム
const TOD_CYCLE = 16;
const TOD_OFFSET = 4;   // スタートを夜明けに合わせる

// 天候シーケンス（8日周期）
const WEATHER_SEQ = ['clear','clear','cloudy','rain','clear','snow','wind','clear','storm','clear','cloudy','clear'];

// 空の色キーフレーム（時刻0〜1に対応）
const SKY_KEYS = [
    { t:0.00, top:'#000510', bot:'#010a30' },  // 深夜
    { t:0.14, top:'#0a0028', bot:'#2a0e50' },  // 夜明け前
    { t:0.22, top:'#6b1f30', bot:'#d4603a' },  // 夜明け（赤）
    { t:0.28, top:'#ff5500', bot:'#ffc880' },  // 日の出
    { t:0.38, top:'#3da0d8', bot:'#b8e0f7' },  // 朝
    { t:0.50, top:'#0d47a1', bot:'#42a5f5' },  // 昼
    { t:0.62, top:'#1060b0', bot:'#80bce8' },  // 午後
    { t:0.68, top:'#d04800', bot:'#ff9900' },  // 夕焼け開始
    { t:0.73, top:'#7b0000', bot:'#d94010' },  // 夕焼けピーク
    { t:0.78, top:'#350055', bot:'#6e0040' },  // 黄昏
    { t:0.86, top:'#0d1b4b', bot:'#182070' },  // 夜
    { t:1.00, top:'#000510', bot:'#010a30' },  // 深夜へ戻る
];

// キャラクター描画
const CHAR_ASPECT = { idle: 817 / 1231, peak: 1238 / 1238 };
const CHAR_H    = 70;   // 表示高さ（px）固定
const CHAR_ANCH = 0.55; // 上端からの腹部位置（55%）

// ゲーム状態
const S = { START:0, PLAY:1, OVER:2, CLEAR:3 };
