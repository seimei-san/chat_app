# 課題 - LINE風アプリ -

## ①課題の内容（どんな作品）
- オレ様シリーズ第４弾　「早打ちチャット」です。
  - LINE風に、左右に別れてチャットが出来ます。　　

## ②工夫した点・こだわった点
- 「Firebaseを使って！」という課題縛りに挑戦。
- フロントは、Vueを使って、FirebaseのRealtimeDatabaseへの書き込み、読み取り、削除ができるようにした。
- バックエンドは、Node.jsとExpressでサーバーをローカルに立てた。
- FirebaseのAuthでユーザーを登録したかったが、よくわからなかったので、localStorageでユーザーを保持。

## ③難しかった点・次回トライしたいこと(又は機能)
- Firebase、サーバーレスが腹落ちできず、かなり遠回りしてしまった。
  - realtimeDatabaseをサーバーサイドで動作させるようにしたが、これが間違っていることに気づくのにかなりの時間を溶かしてしまった。
  - サーバー側のプロセスでFirebaseを使って、クライアントにデータを渡そうとしたが出来なかった。　そもそも間違った使い方のようだが、まだ、よく原理が分かっていない。
  - クライアントのスクリプトで、なぜ、requireがエラーになるのかを理解できなかった。　弄くり回しているうちに、importで逃げられたのでそこで気力が尽きた。


## ④質問・疑問・感想、シェアしたいtips等なんでも
[質問]
なし

[疑問]　
- 未だに、realtimeDatabaseが完全に理解できいない。　どうやら、これは、クライアントから直接DBを使うものであり、サーバーを経由して使うものではなさそうだが、この理解であっているのだろうか？

[感想]　
  - Firebaseを使って「サーバーレス」なるものを作ってみたいと思ったが、時間がない。　
  - 一方、自分が作りたいものは、Firebaseは適していないと思った。

[tips]　
  

[参考記事]