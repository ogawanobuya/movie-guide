import './App.css';
import Row from './component/Row';
import Front from './component/Front';
import AuthStateChecker from './component/AuthStateChecker';
import { useAuthContext } from './context/AuthContext';

import requests from './util/requests';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from "react-router-dom";

import { auth } from './util/firebase';
import { signOut } from 'firebase/auth';


const App = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const logOut = () => {
    const result = window.confirm('あなたは今「'+currentUser.email+'」のメアドでログインしています。ログアウトしますか？');
    if( result ) {
      auth.signOut()
      // signOutが非同期関数であり、なぜかthenやawaitが効かないので、AuthStateCheckerにサインアウト判別のパラメタを送る
      navigate('/sign-in', { state: { isSignOut: true, } });
    }
    else {
      return null;
    }
  }

  return (
    <AuthStateChecker>
      <div className="app">
        <Helmet>
          <title>Movie Guide</title>
        </Helmet>
        <Front uid={currentUser.uid} />

        <h1 className="app_description">Movie Guideへようこそ、あなたの次に見てみたい映画を探して行ってくださいな</h1>

        <Row title='Netflixオリジナル' fetchUrl={requests.fetchNetflixOriginals}/>
        <Row title='今話題' fetchUrl={requests.fetchTrending} />
        <Row title='大人気' fetchUrl={requests.fetchTopRated} />
        <Row title='アクション映画' fetchUrl={requests.fetchActionMovies} />
        <Row title='コメディ映画' fetchUrl={requests.fetchComedyMovies} />

        <button className="link logout" onClick={() => logOut()}>ログアウト</button>
        <Link className="link toList" to="/favorite">お気に入りリスト</Link>
      </div>
    </AuthStateChecker>
  );
}

export default App;
