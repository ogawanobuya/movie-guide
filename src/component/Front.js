import '../App.css';

import { useState, useEffect, useRef } from 'react';
import api from '../util/movieApi';
import requests from '../util/requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const Front = () => {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState('');
  const watchRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.get(requests.fetchTopRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
    };
    fetchData();
  }, []);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      watchRef.current.textContent = "視聴";
    } else {
      watchRef.current.textContent = "閉じる";
      movieTrailer(movie?.name || movie?.title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.error(error.message));
    }
  }

  return (
    <header 
      className="head" 
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${'https://image.tmdb.org/t/p/original/'+movie?.backdrop_path})`,
        backgroundPosition: "center",
      }}>
      <div className="head_contents">
        <h1>{movie?.name || movie?.title}</h1>
        <div className="head_buttons">
          <button 
            className="head_button" 
            onClick={() => handleClick(movie)}
            ref={watchRef}>
            視聴
          </button>
          <button className="head_button">お気に入り</button>
        </div>
        <p className="head_description">{movie?.overview}</p>
      </div>
      <div className="head_video">
        {trailerUrl && <YouTube videoId={trailerUrl} />}
      </div>
    </header>
  );
}

export default Front;
