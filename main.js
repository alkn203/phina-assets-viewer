// グローバルに展開
phina.globalize();
//
var UNIT_SIZE = 64;
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;
// アセット
var ASSETS = {
  // 画像
  image: {
    'tomapiko': 'assets/images/tomapiko_ss.png',
    'tiles': 'assets/images/tiles.png',
  },
  // フレームアニメーション情報
  spritesheet: {
    'tomapiko_ss': 'https://cdn.jsdelivr.net/gh/phinajs/phina.js@develop/assets/tmss/tomapiko.tmss',
  },
};
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    // 背景色
    this.backgroundColor = 'black';
    // アセットマネージャー
    var manager = phina.asset.AssetManager;
    // グループ
    var thumbnailGroup = DisplayElement().addChildTo(this);
    var imageGroup = DisplayElement().addChildTo(this);
    // 画像アセット名の配列からキーだけ抽出した
    var imageKeys = Object.keys(manager.assets.image);
    
    // console.log(imageKeys);
    
    var tn = Thumbnail(imageKeys[0]).addChildTo(thumbnailGroup);
    tn.setPosition(this.gridX.center(), this.gridY.center());
    
    var self = this;
    
    tn.on('selected', function() {
      self.app.pushScene(ImageScene(tn.imageKey));
      
    });
  },
});
/*
 * イメージシーン
 */
phina.define("ImageScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function(imageKey) {
    // 親クラス初期化
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    // 背景を半透明化
    this.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    //
    var sp = Sprite(imageKey).addChildTo(this);
    sp.setPosition(this.gridX.center(), this.gridY.center());
  },
});
/*
 * サムネイルクラス
 */
phina.define("Thumbnail", {
  // 継承
  superClass: 'Sprite',
  // 初期化
  init: function(imageKey) {
    // 親クラス初期化
    this.superInit(imageKey);
    // サイズ変更
    this.setSize(UNIT_SIZE, UNIT_SIZE);
    //
    this.setInteractive(true);
    //
    this.imageKey = imageKey;
  },
  // 選択された時の処理
  onpointend: function() {
    this.flare('selected');
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // MainScene から開始
    startLabel: 'main',
    // アセット読み込み
    assets: ASSETS,
    //
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  // 実行
  app.run();
});