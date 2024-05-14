import '../App.css';

import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import AuthStateChecker from '../component/AuthStateChecker';
import { fetchFav } from '../util/handleData';
import { useAuthContext } from '../context/AuthContext';


const posterBaseUrl = 'https://image.tmdb.org/t/p/original';

const Favorite = () => {
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    fetchFav(currentUser, setMovies);
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
