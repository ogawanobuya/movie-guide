import '../App.css';

import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

import api from '../util/movieApi';
import { handleVideo } from '../util/handleVideo';

const posterBaseUrl = 'https://image.tmdb.org/t/p/original';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す
    const fetchData = async () => {
      const request = await api.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map(movie =>(
          <img 
            key={movie.id}
            onClick={() => handleVideo(movie, trailerUrl, setTrailerUrl)}
            className="row_poster"
            src={posterBaseUrl+movie.poster_path} 
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} />}
    </div>
  );
}

export default Row;
