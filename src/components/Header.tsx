import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { business } from '../data/business';
import styles from './Landing.module.scss';

const navItems = [
  { href: '#services', label: 'Услуги' },
  { href: '#prices', label: 'Цены' },
  { href: '#process', label: 'Как работаем' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' }
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.logo} href="#top" aria-label="К началу сайта">
          <span className={styles.logoMark}>КР</span>
          <span>
            <strong>{business.name}</strong>
            <small>Мытищи, Колпакова</small>
          </span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <a className={styles.phoneLink} href={business.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            {business.phone}
          </a>
          <a className={styles.primarySmall} href="#estimate">
            Рассчитать
          </a>
          <button
            className={styles.menuButton}
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
