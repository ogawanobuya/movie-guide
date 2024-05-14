import './App.css';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from "react-router-dom";

import Row from './component/Row';
import Front from './component/Front';
import AuthStateChecker from './component/AuthStateChecker';
import requests from './util/requests';
import { logOut } from './util/auth';
import { useAuthContext } from './context/AuthContext';


const App = () => {
  const { currentUser } = useAuthContext();

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

        <button className="link logout" onClick={() => logOut(currentUser)}>ログアウト</button>
        <Link className="link toList" to="/favorite">お気に入りリスト</Link>
      </div>
    </AuthStateChecker>
  );
}

export default App;
