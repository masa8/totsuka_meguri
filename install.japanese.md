## 1: 開発環境を作る
### 1.1: Javaをインストールする
 http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html  
 JDKのバージョン７をインストールする  
　OSが32ビットならjdk-7u79-windows-i586.exeをダウンロードし手順に従ってインストール  
  OSが64ビットならjdk-7u79-windows-x64.exeをダウンロードし手順に従ってインストール  

### 1.2: Antをインストールする
 http://ant.apache.org/bindownload.cgi  
  apache-ant-1.9.5-bin.zipを任意のフォルダに解凍する  
　　詳細はこちら：http://www.javadrive.jp/ant/install/index1.html  
　ANT_HOMEとPATHを設定する  
　　詳細はこちら：http://www.javadrive.jp/ant/install/index2.html  


### 1.3: Androidをインストールする
 https://developer.android.com/sdk/index.html  
 DOWNLOAD ANDROID STUDIO FOR windowsをクリックし手順に従ってインストール  

### 1.4 必要なライブラリをインストールする
 Androidstudioを起動  
 Configureを選択  
 SDKマネージャを選択  
 Tools以下の下記をインストール  
　 Android SDK Tools 24.1.2  
   Android SDK Platform-tools 22  
   Android SDK Build-tools 21.1.2  
   Android SDK Build-tools 19.1  
   Android SDK Build-tools 19   
 Android 5.1.1(API22)以下の下記をインストール  
   Documentation for Android SDK 22  
   SDK Platform 22  
   Samples for SDK 22  
   Android TV ARM EABI v7a System Image 22  
   Android TV Intel x86 Atom Sytem Image 22  
   ARM EABI v7a System Image  
   Intel x86 Atom_64 System Image  
   Intel x86 Atom System Image  
   Google APIs  
   Google APIs ARM EABI v7a System Image  
   Google APIs Intel x86 Atom_64 System Image  
   Google APIs Intel x86 Atom System Image  
 Android 5.0.1(API21)以下の下記をインストール  
　　SDK Platform 21  
   ARM EABI v7a System Image 21  
   Google APIs 21   
   Google APIs Intel x86 Atom System Image 21  
   Sources for Android SDK 21  
 Android 4.4.2(API19)以下の下記をインストール  
　 　SDK Platform 19  
    Samples for SDK 19  
    ARM EABI v7a System Image 19  
    Intel x86 Atom System Image 19  
    Google APIs(x86 System Image) 19  
    Google APIs (ARM System Image) 19  
    Sources for Android SDK 19  
 Extra以下の下記をインストール  
　　Android Support Registory 12  
Android Support Library 12  
   Google Repository 16  
　　Google USB Driver  
    Intel x86 Emulator  Accelerator(HAXM installer)  
  
### 1.4 git/gitBASHをインストールする
https://msysgit.github.io  
　Welcomeページでネクストボタンをクリック  
　ライセンスを確認しネクストボタンをクリック  
　インストールフォルダを確認しネクストボタンをクリック  
　Gitbash Here を選択しネクストボタンをクリック  
　後は全てネクストボタンをクリックしインストールする  

### 1.4: Node.jsをインストールする
 https://nodejs.org/download/  
 Windows installerをクリックし手順に従ってインストール  

### 1.5: Cordovaをインストールする  
 コマンドプロンプトを開く  
　次のコマンドを実行  
　C:\>npm install -g cordova  

### 1.6: サンプルアプリで確認する  
 $ cordova create hello com.example.hello HelloWorld  
 $ cd hello  
 $ cordova platform add android  
 $ cordova build  
 $ cordova emulate android  

###　1.7サンプルアプリを実機で確認する  
  アンドロイド実機の「端末情報」を選択  
　　ビルド番号を７回連続でタップ  
　　開発者オプションが表示される  
　　USBデバッグにチェックを入れる  
   端末のVIDとPIDを確認する  
　　詳細はこちら：http://note.chiebukuro.yahoo.co.jp/detail/n128056  
　　android_winusb.infを編集する  
　　詳細はこちら：http://note.chiebukuro.yahoo.co.jp/detail/n128056  
　　ドライバのインストール  
   署名なしのドライバをインストールする方法詳細はこちら：http://www.teradas.net/archives/9922/  


## 2: GoogleMapを利用するための準備をする
  SHA-1を確認する  
　　コマンドプロンプトを開く  
　　Android SDK Platform-toolsとAndroid SDK Build-toolsフォルダにパスが通っていることを確認する  
　　次のコマンドを実行する  
　　keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android  
　　SHA-1と表示されている部分をコピーする  

　googleのアカウントを作成する  
　下記URLにアクセスする  
　https://code.google.com/apis/console/?noredirect#project:867507542052:access  
　画面左のAPI　Access をクリック  
　画面下のCreate New Android Key をクリック  
　SHA-1を入力する  
　":"を入力する  
  任意のAPIキー(com.sample.myapp)を入力する  

## 3:戸塚アプリを作る
### 3.1: プロジェクトを作る
　次のコマンドを実行する   
　cordova create <App Name>  com.example.app “app”  
### 3.2: android対応にする  
 cd <App Name>  
 cordova platform add android  

### 3.3: googlemapプラグインをインストールする
 cordova plugin add plugin.google.maps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE"   

### 3.4: ソースをダウンロードする
 git clone https://github.com/masa8/totsuka_meguri.git  

### 3.5: ソースをコピーする
　index.htmlとspot.jsをwww以下にコピーする  

### 3.6: ビルド、実行する
 cordova build android  
 cordova run android  

## 4:戸塚アプリを修正する
### 4.1:コンテンツを修正する
　spot.jsonを修正する  
　　史跡を追加する  
　　カテゴリ  
　　タイトル  
　　名前  
　　位置  
　　画像  
　　説明  
　　行き方  

### 4.2: ビルド、実行する
次のコマンドを実行する  
cordova build android  
cordova run android  
