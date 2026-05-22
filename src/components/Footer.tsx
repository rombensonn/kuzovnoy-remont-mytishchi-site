import { business } from '../data/business';
import { assetPath } from '../utils/assetPath';
import styles from './Landing.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <strong>{business.name}</strong>
        <span>Кузовной ремонт, покраска, стапельные работы в Мытищах</span>
        <span>© {currentYear}. Все права защищены.</span>
      </div>

      <dl className={styles.footerLegal}>
        <div>
          <dt>Оператор персональных данных</dt>
          <dd>{business.legalName}</dd>
        </div>
        <div>
          <dt>Реквизиты</dt>
          <dd>ИНН {business.inn}, ОГРНИП {business.ogrn}</dd>
        </div>
        <div>
          <dt>Адрес оператора</dt>
          <dd>{business.legalAddress}</dd>
        </div>
        <div>
          <dt>Почтовый адрес</dt>
          <dd>{business.postalAddress}</dd>
        </div>
        <div>
          <dt>Обращения по персональным данным</dt>
          <dd>{business.personalDataEmail}; {business.legalPhone}</dd>
        </div>
      </dl>

      <nav className={styles.footerDocs} aria-label="Документы по персональным данным">
        <a href={assetPath('/privacy-policy.html')}>Политика обработки персональных данных</a>
        <a href={assetPath('/personal-data-consent.html')}>Согласие на обработку персональных данных</a>
        <a href={assetPath('/cookie-notice.html')}>Уведомление о cookie</a>
      </nav>

      <p className={styles.footerNote}>
        Информация на сайте не является публичной офертой. Данные из формы используются для
        обратной связи, предварительного расчета и записи на осмотр.
      </p>
    </footer>
  );
}
