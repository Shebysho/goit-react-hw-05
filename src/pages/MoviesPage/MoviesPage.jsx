import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await searchMovies(query);
        setMovies(response.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const newQuery = event.target.elements.query.value;
    setSearchParams({ query: newQuery });
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </main>
  );
}