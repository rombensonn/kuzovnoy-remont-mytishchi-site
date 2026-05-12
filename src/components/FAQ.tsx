import { faq } from '../data/faq';
import styles from './Landing.module.scss';

export function FAQ() {
  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.sectionHeader}>
        <span className={styles.kicker}>FAQ</span>
        <h2 id="faq-title">Частые вопросы перед кузовным ремонтом</h2>
      </div>
      <div className={styles.faqList}>
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
