import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjE2ODFmOGI2MTRlNTQ4ODM4NDIwOWU1ZTI4ZDNlYiIsIm5iZiI6MTczNjUyNjkwMS42NzM5OTk4LCJzdWIiOiI2NzgxNGMzNTYwMWFjZmU3YmQ0ZWM4ZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PF4WoiiixaUsij-QQjhRuckSfQ6RARwaTK-w211MPsc'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data;
};