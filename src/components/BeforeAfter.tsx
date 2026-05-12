import styles from './Landing.module.scss';
import { assetPath } from '../utils/assetPath';

export function BeforeAfter() {
  return (
    <section className={styles.beforeAfter} aria-labelledby="before-after-title">
      <div className={styles.beforeAfterText}>
        <span className={styles.kicker}>До и после</span>
        <h2 id="before-after-title">Визуальная демонстрация ремонта без обещаний «за час и бесплатно»</h2>
        <p>
          Блок создан как место для реальных фото цеха и работ. Сейчас стоят локальные placeholder-изображения,
          чтобы проект не зависел от CDN и внешних фотостоков.
        </p>
        <a className={styles.secondaryDarkButton} href="#estimate">Отправить фото повреждения</a>
      </div>
      <div className={styles.beforeAfterGrid}>
        <figure>
          <img src={assetPath('/images/repair-before-placeholder.webp')} alt="Поврежденная деталь автомобиля до кузовного ремонта" loading="lazy" />
          <figcaption>До ремонта</figcaption>
        </figure>
        <figure>
          <img src={assetPath('/images/repair-after-placeholder.webp')} alt="Деталь автомобиля после ремонта и покраски" loading="lazy" />
          <figcaption>После ремонта</figcaption>
        </figure>
      </div>
    </section>
  );
}
