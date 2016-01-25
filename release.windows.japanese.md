##android リリースビルド手順
### アイコンを作成する
1. cd platforms/android/res
2. drawableフォルダ以下のすべてのPNGファイルを変更する

### リリースビルド用のパスワードを作成する
1. cd platforms/android/ant-build 
2. keytool -genkey -v -keystore app.keystore -alias app -keyalg RSA -keysize 2048 -validity 10000
3. 質問に答える
4. パスワードを入力する

###リリースビルドを作成する
1. cordova build android —-release
2. cd platforms/android/ant-build/
3. platforms/android/ant-build/MainActivity-release.unsigned.apkができていることを確認する
4. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore app.keystore MainActivity-release.unsigned.apk MainActivity.apk 
5. リリースビルド用のパスワードを入力する（何も表示されません）
6. C:¥¥user¥<your name>¥AppData¥Local¥Android¥sdk¥build-tools¥21.1.2¥zipalign -v 4 MainActivity-release-unsigned.apk MainActivity.apk 

###リリースビルドを再作成する
1. cd platforms/android/ant-build
2. ls -all
3. MainActivity.apkがあることを確認しあれば　rm MainActivity.apk　を実行しMainActivity.apkを削除する

4. cordova build android —-release
5. cd platforms/android/ant-build
6. ls -all
7. MainActivity-release-unsigned.apkができていて、今日の日付になっていることを確認する
8. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore app.keystore MainActivity-release.unsigned.apk MainActivity.apk 
9. リリースビルド用のパスワードを入力する（何も表示されません）
10. C:¥¥user¥<your name>¥AppData¥Local¥Android¥sdk¥build-tools¥21.1.2¥zipalign -v 4 MainActivity-release-unsigned.apk MainActivity.apk 