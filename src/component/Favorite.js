import '../App.css';

import { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from '@firebase/firestore';

import { db } from '../util/firebase';
import api from '../util/movieApi';
import requests from '../util/requests';
import { Link } from "react-router-dom";


const posterBaseUrl = 'https://image.tmdb.org/t/p/original';
const Favorite = () => {
  const [movies, setMovies] = useState([]);
  const favoriteIds = [];

  useEffect(() => {
    const moviesCollectionRef = collection(db, 'favorite_movies');
    const fetchData = async (movieId) => {
      const fetchUrl = requests.fetchById.replace('movieId', movieId);
      const request = await api.get(fetchUrl);
      setMovies(Array.from(new Set([...movies, request.data])));
      console.log(movies);
    };

    getDocs(moviesCollectionRef)
    .then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        favoriteIds.push(doc.data().movie_id);
      });
      favoriteIds.forEach((favoriteId) => fetchData(favoriteId));
    });

  }, []);

  return (
    <div className="favorite">
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
  );
}

export default Favorite;
