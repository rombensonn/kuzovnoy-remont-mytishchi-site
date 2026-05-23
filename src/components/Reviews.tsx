import { Star } from 'lucide-react';
import { business } from '../data/business';
import { reviews } from '../data/reviews';
import styles from './Landing.module.scss';

export function Reviews() {
  return (
    <section id="reviews" className={styles.reviews} aria-labelledby="reviews-title">
      <div className={styles.reviewsIntro}>
        <span className={styles.kicker}>Отзывы</span>
        <h2 id="reviews-title">Клиенты отмечают ремонт, скорость и аккуратную покраску</h2>
        <p>
          На Яндекс Картах у сервиса {business.rating}, {business.ratingsCount} оценки и {business.reviewsCount} отзывов.
          Ниже — короткие выдержки по кузовным работам.
        </p>
        <a href={business.reviewsUrl} target="_blank" rel="noreferrer">Смотреть карточку на Яндекс Картах</a>
      </div>
      <div className={styles.reviewGrid}>
        {reviews.map((review) => (
          <article className={styles.reviewCard} key={review.author}>
            <div className={styles.stars} aria-label="Оценка 5 из 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <p>{review.text}</p>
            <footer>
              <strong>{review.author}</strong>
              <span>{review.date}</span>
              <em>{review.tag}</em>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
