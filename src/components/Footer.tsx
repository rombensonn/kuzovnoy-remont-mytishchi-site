import { business } from '../data/business';
import { assetPath } from '../utils/assetPath';
import styles from './Landing.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>{business.name}</strong>
        <span>Кузовной ремонт, покраска, стапельные работы в Мытищах</span>
      </div>
      <nav aria-label="Юридические ссылки">
        <a href={assetPath('/privacy-policy.html')}>Политика конфиденциальности</a>
        <a href={assetPath('/personal-data-consent.html')}>Согласие на обработку данных</a>
        <a href={assetPath('/cookie-notice.html')}>Cookie</a>
      </nav>
    </footer>
  );
}
