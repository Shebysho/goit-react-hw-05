import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await getMovieReviews(movieId);
        setReviews(response.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id} className={styles.item}>
            <h3 className={styles.author}>Author: {review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))
      ) : (
        <p className={styles.message}>We don't have any reviews for this movie.</p>
      )}
    </ul>
  );
}