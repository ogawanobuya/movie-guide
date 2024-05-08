const apiKey = '79179b15957fb3ee0d928154505750ab'

const requests = {
  fetchById: `/movie/movieId?api_key=${apiKey}&language=ja-JP`,
  fetchTrending: `/trending/all/week?api_key=${apiKey}&language=ja-JP`,
  fetchNetflixOriginals: `/discover/tv?api_key=${apiKey}&witg_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${apiKey}&language=ja-JP`,
  fetchActionMovies: `/discover/movie?api_key=${apiKey}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${apiKey}&with_genres=35`,
}

export default requests
