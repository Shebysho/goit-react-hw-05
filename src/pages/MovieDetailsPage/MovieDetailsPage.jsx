import { useState, useEffect, Suspense, useRef } from 'react'; // Додано useRef
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  Link,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';


export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from).current ?? '/movies'; // Виправлено useRef

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <main className={styles.main}>
      <Link to={backLinkHref} className={styles.backLink}> 
        Go back
      </Link>

      {movie ? (
        <div className={styles.movie}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={styles.image}
          />
          <div className={styles.details}>
            <h2 className={styles.title}>{movie.title}</h2>
            <p className={styles.releaseDate}>
              Release date: {movie.release_date}
            </p>
            <p className={styles.voteAverage}>
              Vote average: {movie.vote_average}
            </p>
            <h3 className={styles.overviewTitle}>Overview</h3>
            <p className={styles.overview}>{movie.overview}</p>
            <h3 className={styles.genresTitle}>Genres</h3>
            {movie.genres && movie.genres.length > 0 ? (
              <ul className={styles.genresList}>
                {movie.genres.map((genre) => (
                  <li key={genre.id} className={styles.genreItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No genres available</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <ul className={styles.additionalInfo}>
        <li>
          <NavLink to="cast" className={styles.link}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={styles.link}>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}