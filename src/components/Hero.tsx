import { ArrowRight, Camera, Gauge, MapPin, ShieldCheck } from 'lucide-react';
import { business } from '../data/business';
import { assetPath } from '../utils/assetPath';
import styles from './Landing.module.scss';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroMedia} aria-hidden="true">
        <img src={assetPath('/images/hero-service-photo.webp')} alt="" />
      </div>
      <div className={styles.heroOverlay} />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <ShieldCheck size={18} aria-hidden="true" />
            {business.award} · рейтинг {business.rating}
          </p>
          <h1 id="hero-title">Вернем кузову ровные зазоры, цвет и геометрию</h1>
          <p className={styles.heroText}>
            Кузовной ремонт в Мытищах: от локальной царапины до восстановления после ДТП.
            Осмотрим автомобиль, покажем слабые места и соберем смету без лишних работ.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#estimate">
              Рассчитать ремонт
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className={styles.secondaryButton} href={business.phoneHref}>
              Позвонить мастеру
            </a>
          </div>
        </div>

        <aside className={styles.heroPanel} aria-label="Ключевые данные сервиса">
          <div className={styles.inspectionTicket}>
            <span>осмотр кузова</span>
            <strong>15-20 мин</strong>
            <p>Проверяем деталь, крепления, ЛКП, зазоры и скрытые повреждения.</p>
          </div>
          <dl className={styles.heroMetrics}>
            <div>
              <dt>{business.rating}</dt>
              <dd>рейтинг</dd>
            </div>
            <div>
              <dt>{business.ratingsCount}</dt>
              <dd>оценки</dd>
            </div>
            <div>
              <dt>{business.reviewsCount}</dt>
              <dd>отзывов</dd>
            </div>
          </dl>
          <div className={styles.heroBadges} aria-label="Условия обращения">
            <span>
              <Camera size={16} aria-hidden="true" />
              расчет по фото
            </span>
            <span>
              <Gauge size={16} aria-hidden="true" />
              стапель и окраска
            </span>
            <span>
              <MapPin size={16} aria-hidden="true" />
              Мытищи, Колпакова
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
