
# Java JDK 7 をインストールする

# node.jsをインストールする

# プロジェクトを作る
 cordova create <App Name>  com.example.app “app”

# 対応OSを決める
 cd <App Name>
 cordova platform add android iOS
# GoogleMapを利用するための準備をする
 https://code.google.com/apis/console/?noredirect#project:867507542052:access
 
# プラグインをインストールする
 cordova plugin add plugin.google.maps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS=“YOUR_IOS_API_KEY_IS_HERE”

# ソースをダウンロードする
 git clone https://github.com/masa8/totsuka_meguri.git

# ソースをコピーする

# ビルド、実行する
 cordova build iOS
 cordova run ios

# コンテンツを修正する
　史跡を追加する
タイトル
名前
位置
画像
説明
行き方

# ビルド、実行する
cordova build iOS
cordova run ios
