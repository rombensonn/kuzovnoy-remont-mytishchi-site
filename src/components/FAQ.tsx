import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../data/faq';
import styles from './Landing.module.scss';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.sectionHeader}>
        <span className={styles.kicker}>FAQ</span>
        <h2 id="faq-title">Частые вопросы перед кузовным ремонтом</h2>
      </div>
      <div className={styles.faqList}>
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;

          return (
            <article className={isOpen ? styles.faqItemOpen : styles.faqItem} key={item.question}>
              <h3>
                <button
                  className={styles.faqQuestion}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
              </h3>
              <div className={styles.faqAnswer} id={panelId} aria-hidden={!isOpen}>
                <div className={styles.faqAnswerInner}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
