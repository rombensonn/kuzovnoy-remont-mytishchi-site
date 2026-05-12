import { Calculator, Phone } from 'lucide-react';
import { business } from '../data/business';
import styles from './Landing.module.scss';

export function StickyMobileCTA() {
  return (
    <div className={styles.mobileCta} aria-label="Быстрые действия">
      <a href={business.phoneHref}>
        <Phone size={18} aria-hidden="true" />
        Позвонить
      </a>
      <a href="#estimate">
        <Calculator size={18} aria-hidden="true" />
        Расчет
      </a>
    </div>
  );
}
