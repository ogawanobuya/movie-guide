import '../App.css';

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

import AuthStateChecker from '../component/AuthStateChecker';
import { handleSingIn } from '../util/auth';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            onClick={() => handleSingIn(email, password)}
          >ログイン</button>
        </div>

        <Link className="sign_up_link" to="/sign-up">アカウント作成はこちらから</Link>
      </div>
    </AuthStateChecker>
  );
};

export default SignIn;
