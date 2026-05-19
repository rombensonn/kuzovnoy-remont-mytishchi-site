import { BadgeCheck, CreditCard, MapPinned, ParkingCircle, Wifi } from 'lucide-react';
import { business } from '../data/business';
import styles from './Landing.module.scss';

const items = [
  { icon: BadgeCheck, title: '4,9 на Яндекс Картах', text: `${business.ratingsCount} оценки и ${business.reviewsCount} отзывов` },
  { icon: ParkingCircle, title: 'Парковка у сервиса', text: 'удобно оставить авто на осмотр' },
  { icon: CreditCard, title: 'Оплата картой', text: 'для ремонта и дополнительных работ' },
  { icon: Wifi, title: 'Wi-Fi', text: 'в зоне ожидания' },
  { icon: MapPinned, title: 'Мытищи', text: 'ул. Колпакова, 2; заезд с Новомытищинского пр-та' }
];

export function TrustBar() {
  return (
    <section className={styles.trust} aria-label="Доверие и удобства сервиса">
      <div className={styles.trustGrid}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className={styles.trustItem}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
