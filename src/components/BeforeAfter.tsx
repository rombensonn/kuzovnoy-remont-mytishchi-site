import styles from './Landing.module.scss';
import { assetPath } from '../utils/assetPath';

export function BeforeAfter() {
  return (
    <section className={styles.beforeAfter} aria-labelledby="before-after-title">
      <div className={styles.beforeAfterText}>
        <span className={styles.kicker}>До и после</span>
        <h2 id="before-after-title">Визуальная демонстрация ремонта без обещаний «за час и бесплатно»</h2>
        <p>
          Живой пример повреждения и результата после кузовного ремонта: без студийной съемки,
          как обычные фотографии на телефон в рабочем цехе.
        </p>
        <a className={styles.secondaryDarkButton} href="#estimate">Отправить фото повреждения</a>
      </div>
      <div className={styles.beforeAfterGrid}>
        <figure>
          <img src={assetPath('/images/repair-before-phone.webp')} alt="Поврежденная задняя часть автомобиля до кузовного ремонта" loading="lazy" />
          <figcaption>До ремонта</figcaption>
        </figure>
        <figure>
          <img src={assetPath('/images/repair-after-phone.webp')} alt="Задняя часть автомобиля после кузовного ремонта и покраски" loading="lazy" />
          <figcaption>После ремонта</figcaption>
        </figure>
      </div>
    </section>
  );
}
