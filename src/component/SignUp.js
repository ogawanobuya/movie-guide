import '../App.css';

import { auth } from '../util/firebase';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSingUp = () => {
    if (email && password) {
      try {
        auth.createUserWithEmailAndPassword(email, password);
        alert("ユーザー登録完了しました");
      } catch (error) {
        alert("ユーザー登録に失敗しました");
        console.log(error);
      }
    }
  }

  return (
    <div className="sign_up">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="sign_up_description">ユーザー登録してMovie Guideにアクセス</h1>
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
          className="sign_up_button"
          onClick={() => handleSingUp()}
        >登録</button>
      </div>
    </div>
  );
};

export default SignUp;
