import '../App.css';

import { useState, useEffect, useRef } from 'react';
import api from '../util/movieApi';
import requests from '../util/requests';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../util/firebase';

import AuthStateChecker from '../component/AuthStateChecker';
import { useAuthContext } from '../context/AuthContext';


const posterBaseUrl = 'https://image.tmdb.org/t/p/original';

const Favorite = () => {
  const favoriteIds = [];
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const q = query(collection(db, "favorite_movies"), where("user_id", "==", currentUser.uid));
    const fetchData = async (fetchUrl) => {
      const request = await api.get(fetchUrl);
      return request.data;
    };

    getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        // React hooksのset関数を使う場合、set関数はmapなどによる連続的な呼び出しに耐えられないためfavoriteIds(Array)を使用
        favoriteIds.push(doc.data().movie_id);
      });
      // お気に入り映画のIDを取り出し、全てAPIのエンドポイントに変えて配列に格納(Setで重複も消す)
      const fetchUrls = Array.from(new Set(favoriteIds.map((favoriteId) => requests.fetchById.replace('movieId', favoriteId))));
      const fetchFunc = fetchUrls.map((fetchUrl) => fetchData(fetchUrl));
      // set関数は連続的な呼び出しに弱いため、fetchDataの中で呼び出すのではなく、Promise.allで一括実行したのち、その結果を一度のset呼び出しで格納する
      Promise.all(fetchFunc).then((res) => {
        setMovies(res);
      });
    });

  }, []);

  return (
    <AuthStateChecker>
      <div className="favorite">
        <Helmet>
          <title>Favorite List</title>
        </Helmet>
        <Link className="link" to="/">ホームに戻る</Link>

        <h1 className="favorite_description">あなたのお気に入りの映画をここに保存しています</h1>
        <div className="favorite_contents">
          {movies.map((movie) =>(
            <div className="favorite_content">
              <img 
                key={movie.id}
                className="favorite_poster"
                src={posterBaseUrl+movie.poster_path} 
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthStateChecker>
  );
}

export default Favorite;
