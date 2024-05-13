import '../App.css';

import { auth } from '../util/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthStateChecker from '../component/AuthStateChecker';

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from "react-router-dom";


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // リダイレクトに使う
  const navigate = useNavigate();

  const handleSingIn = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // ログインしたユーザーを返す
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        alert("ログインに失敗しました\n"+error.message);
      });
    }
  }

  return (
    <AuthStateChecker isOutside>
      <div className="sign_up">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="sign_up_description">ログインしてMovie Guideにアクセス</h1>
        <div className="sign_up_form">
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="hoge@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="sign_up_form">
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="******"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="sign_up_form">
          <button
            className="sign_up_button login"
            onClick={() => handleSingIn()}
          >ログイン</button>
        </div>

        <Link className="sign_up_link" to="/sign-up">アカウント作成はこちらから</Link>
      </div>
    </AuthStateChecker>
  );
};

export default SignIn;
