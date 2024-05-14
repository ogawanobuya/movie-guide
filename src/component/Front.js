import '../App.css';

import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

import api from '../util/movieApi';
import requests from '../util/requests';
import { existFav, addFav, remFav } from '../util/handleData';
import { handleVideo } from '../util/handleVideo';


const Front = (props) => {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState('');

  const watchRef = useRef(null);
  const favAddRef = useRef(null);
  const favRemRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.get(requests.fetchTopRated);
      const frontMovie = request.data.results[Math.floor(Math.random() * request.data.results.length - 1)];
      setMovie(frontMovie);

      return frontMovie;
    };

    fetchData().then((data) => {
      existFav(data, props.uid, favRemRef, favAddRef);
    });

  }, []);

  // トレイラー表示ボタンタップに伴う文言切り替え
  useEffect(() => {
    if (trailerUrl) {
      watchRef.current.textContent = "閉じる";
    } else {
      watchRef.current.textContent = "視聴";
    }
  }, [trailerUrl]);

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
            onClick={() => handleVideo(movie, trailerUrl, setTrailerUrl)}
            ref={watchRef}>
            視聴
          </button>
          <button
            className="head_button add"
            onClick={() => addFav(movie?.id, props.uid, favRemRef, favAddRef)}
            ref={favAddRef}>お気に入り登録</button>
          <button
            className="head_button rem"
            onClick={() => remFav(movie?.id, props.uid, favRemRef, favAddRef)}
            ref={favRemRef}>お気に入り解除</button>
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
