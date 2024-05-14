import movieTrailer from 'movie-trailer';


export const handleVideo = (movie, trailerUrl, setTrailerUrl) => {
  if (trailerUrl) {
    setTrailerUrl('');
  } else {
    movieTrailer(movie?.name || movie?.title)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        // YouTube URLはこのような形になっている「https://www.youtube.com/watch?v=4dTzktjYIx4」
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.error(error.message));
  }
}
