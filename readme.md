旧東海道戸塚宿めぐり(Totsuka Meguri)
=======================================

まさかりを滝壺に落としたら、偶然魔物に当たって退治したことになってお姫様が現れ、という日本昔話的伝説の残る「まさかりが淵」など戸塚宿と旧東海道周辺の史跡の場所が分かるアプリです。

Snapshot
========
![](snapshots.png?raw=true)
Support Platform
================
 * iOS/iPhone
 * Android

License 
==================================
ソースコードと画像はMIT Licenseです。

Copyright (c) 2014 Masaya Shimomatsu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Notice
======
アプリ内の説明文は戸塚見知楽会の著作物が含まれており非公開です。

HowToBuild
==========
 
 Step1: Install [cordova](http://cordova.apache.org)  
 Step2: Create your app  
> $ cordova create "directory name" "reverse domain-style identifier" "app title" 

Step2: Install following platforms to cordova  
> $ cordova platform add ios  
> $ cordova platform add android  

Step3: Install following plugins to cordova   
  * org.apache.cordova.console 0.2.11 "Console"
  * org.apache.cordova.device 0.2.12 "Device"
  * org.apache.cordova.dialogs 0.2.10 "Notification"
  * org.apache.cordova.file 1.3.1 "File"
  * org.apache.cordova.file-transfer 0.4.6 "File Transfer"
  * org.apache.cordova.splashscreen 0.3.3 "Splashscreen"
  * org.apache.cordova.statusbar 0.1.8 "StatusBar"
  * plugin.google.maps 1.2.2 "phonegap-googlemaps-plugin"
 
Step4: Put all the files in this repository into your app directory  
Step5: Rename spot.json.default to spot.json  
Step6: Edit spot.json (pls, use spot.json.default as reference )  
Step7: Edit config.xml ( please use config.xml.default as reference )  

