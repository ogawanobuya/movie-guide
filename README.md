## React x Firebaseで作る映画紹介サービス

React(JavaScript)とFirebase(Hosting + Firestore + Authentication)とTMDB APIを組み合わせて簡単なWebアプリケーションを作りました。<br>
#### 技術的特徴
- Jestによるユニットテスト実装
- Github ActionsによるCI/CD実装
- FirestoreによるCRUD実装
- utilフォルダとcomponentフォルダを分けてコンポーネントとファンクションを分けたリーダブルコード
- ログイン確認をファンクションではなく<AuthStateChecker>タグで行う汎用的な設計
- React Routerによるページ遷移

当該サービスのURL<br>
https://movie-guide-5ece0.web.app/
