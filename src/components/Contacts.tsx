import { ExternalLink, Phone } from 'lucide-react';
import { business } from '../data/business';
import styles from './Landing.module.scss';

export function Contacts() {
  const mapUrl = `https://yandex.ru/maps/?ll=${business.coordinates.lng}%2C${business.coordinates.lat}&z=16&text=${encodeURIComponent(business.address)}`;
  const mapWidgetUrl = `https://yandex.ru/map-widget/v1/?ll=${business.coordinates.lng}%2C${business.coordinates.lat}&z=16&text=${encodeURIComponent(business.address)}`;

  return (
    <section id="contacts" className={styles.contacts} aria-labelledby="contacts-title">
      <div className={styles.contactInfo}>
        <span className={styles.kicker}>Контакты</span>
        <h2 id="contacts-title">Приезжайте на осмотр в Мытищах</h2>
        <address>{business.address}</address>
        <a className={styles.contactPhone} href={business.phoneHref}>
          <Phone size={20} aria-hidden="true" />
          {business.phone}
        </a>
        <p>{business.workingHours}</p>
        <div className={styles.contactActions}>
          <a className={styles.primaryButton} href={business.phoneHref}>Позвонить</a>
          <a className={styles.secondaryDarkButton} href={mapUrl} target="_blank" rel="noreferrer">
            Открыть маршрут
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className={styles.mapEmbed}>
        <iframe
          src={mapWidgetUrl}
          title="Яндекс Карта: Московская область, Мытищи, ул. Колпакова, 2, корп. 5"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </section>
  );
}
