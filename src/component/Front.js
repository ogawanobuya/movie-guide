import '../App.css';

import { useState, useEffect, useRef } from 'react';

import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../util/firebase';

import api from '../util/movieApi';
import requests from '../util/requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const Front = (props) => {
  const moviesCollectionRef = collection(db, 'favorite_movies');
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

    const existFav = async (movie) => {
      if (movie) {
        try {
          // Firestoreにおけるクエリ検索の仕方
          const q = query(collection(db, "favorite_movies"), where("movie_id", "==", movie.id), where('user_id', '==', props.uid));
          const querySnapshot = await getDocs(q);
          // querySnapshot.exist()やquerySnapshot.docs.exist()は使えない
          if (querySnapshot.docs.length && favRemRef.current && favAddRef.current) {
            // 既にお気に入りに登録されている場合
            favRemRef.current.style.display = "inline-block";
            favAddRef.current.style.display = "none";
          } else if (favRemRef.current && favAddRef.current) {
            favRemRef.current.style.display = "none";
            favAddRef.current.style.display = "inline-block";
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchData().then(function(data) {
      existFav(data);
    });

  }, []);

  const handleView = (movie) => {
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

  const addFav = async (movieId) => {
    try{
      // addDocは自動生成されたDocIdを返し、setDocは任意のDocIdを指定できる
      const documentRef = await addDoc(moviesCollectionRef, {
        // movie_idはqueryを行うため、型に注目
        movie_id: movieId,
        user_id: props.uid,
      });
      alert("お気に入りに追加しました")
      favRemRef.current.style.display = "inline-block";
      favAddRef.current.style.display = "none";
    } catch (e) {
      alert("お気に入り追加に失敗しました")
    }
  }

  const remFav = async (movieId) => {
    try{
      const q = query(moviesCollectionRef, where('movie_id', '==', movieId), where('user_id', '==', props.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const favDocRef = doc(db, 'favorite_movies', document.id);
        await deleteDoc(favDocRef);
      });
      alert("お気に入りから削除しました")
      favRemRef.current.style.display = "none";
      favAddRef.current.style.display = "inline-block";
    } catch (e) {
      alert("お気に入り削除に失敗しました")
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
            onClick={() => handleView(movie)}
            ref={watchRef}>
            視聴
          </button>
          <button
            className="head_button add"
            onClick={() => addFav(movie?.id)}
            ref={favAddRef}>お気に入り登録</button>
          <button
            className="head_button rem"
            onClick={() => remFav(movie?.id)}
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
