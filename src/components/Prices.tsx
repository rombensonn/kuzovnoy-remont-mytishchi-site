import { prices } from '../data/prices';
import styles from './Landing.module.scss';

export function Prices() {
  return (
    <section id="prices" className={styles.prices} aria-labelledby="prices-title">
      <div className={styles.pricesHeader}>
        <span className={styles.kicker}>Стоимость</span>
        <h2 id="prices-title">Стартовые ориентиры без растянутого «прайс-листа на всё»</h2>
        <p>
          Итоговая цена зависит от скрытых повреждений, площади ремонта, материалов и окраски.
          После осмотра фиксируем понятный состав работ.
        </p>
      </div>
      <div className={styles.priceList}>
        {prices.map((item, index) => (
          <article className={styles.priceItem} key={item.name}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </div>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
      <div className={styles.priceNotice}>
        <p>Ориентиры основаны на данных карточки Яндекс Карт и уточняются после осмотра автомобиля.</p>
      </div>
    </section>
  );
}
