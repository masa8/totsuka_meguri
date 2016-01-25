##android リリースビルド手順
### アイコンを作成する
1. cd platforms/android/res
2. drawableフォルダ以下のすべてのPNGファイルを変更する

### リリースビルド用のパスワードを作成する
1. cd platforms/android 
2. keytool -genkey -v -keystore app.keystore -alias app -keyalg RSA -keysize 2048 -validity 10000
3. 質問に答える
4. パスワードを入力する


###リリースビルドを作成する
1. release-signing.propertiesファイルを作成する
2. storeFile=app.keystoreと入力
3. storeType=jksと入力
4. keyAlias=appと入力
5. cordova build android —-release
6. platforms/android/build/outputs/apk/android-relase.apkができていることを確認する


###リリースビルドを再作成する
1. cordova build android —-release
2. platforms/android/build/outputs/apk/android-relase.apkができていることを確認する
