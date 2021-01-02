// グローバルに展開
phina.globalize();
// アセット
/*var ASSETS = {
  // 画像
  image: {
    'tomapiko': 'assets/images/tomapiko_ss.png',
    'tiles': 'assets/images/tiles.png',
  },
  // フレームアニメーション情報
  spritesheet: {
    'tomapiko_ss': 'https://cdn.jsdelivr.net/gh/phinajs/phina.js@develop/assets/tmss/tomapiko.tmss',
  },
};*/
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    // アセットマネージャー
    //var manager = phina.asset.AssetManager;
    // グループ
    var imageGroup = DisplayElement().addChildTo(this);
    // 画像アセット名の配列
    //var images = Object.keys(manager.assets.image);
    // ドロップダウンリストを取得
    var selector = document.querySelector('#image_selector');
    // 選択肢を作成
    //images.each(function(name) {
    //  var op = document.createElement('option');
    //  op.text = name;
    //  selector.appendChild(op);
    //});
    // 一番目の画像を表示
    //var sp = Sprite(images.first).addChildTo(imageGroup);
    //sp.setPosition(this.gridX.center(), this.gridY.center());
    var self = this;
    // 選択肢変更イベント
    selector.addEventListener('change', function(event) {
      imageGroup.children.clear();
      var sp = Sprite(event.target.value).addChildTo(imageGroup);
      sp.setPosition(self.gridX.center(), self.gridY.center());
    });
    // ファイル選択を取得
    var fileImage = document.querySelector('#file_image');
    // ファイル選択イベント
    fileImage.addEventListener('change', function(event) {
      var manager = phina.asset.AssetManager;
      var file = event.target.files[0];
      var name = file.name;
      //
      //manager.set('image', name, 'assets/images/' + name);
      var n = '"' + name.split('.')[0] + '"'
      var v = 'assets/images/' + name;
      var ASSETS = {
        // 画像
        image: {
          [n] : v,
        },
      };
      
      console.log(ASSETS)
      
      // アセットローダー
      var loader = phina.asset.AssetLoader();
      loader.load(ASSETS);
      loader.on('load', function() {
        var sp = Sprite(n).addChildTo(imageGroup);
        sp.setPosition(self.gridX.center(), self.gridY.center());
      });
      console.log('assets/images/' + file.name);
    });
  },
});
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // 表示先のcanvasを指定
    query: '#mycanvas',
    // MainScene から開始
    startLabel: 'main',
    // 画面にフィットさせない
    fit: false,
    // アセット読み込み
//    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});