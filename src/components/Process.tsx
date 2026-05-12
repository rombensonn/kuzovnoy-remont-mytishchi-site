import { ClipboardCheck, FileText, SprayCan, Wrench } from 'lucide-react';
import styles from './Landing.module.scss';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Осмотр или фото',
    text: 'Смотрим повреждение, уточняем деталь, цвет, скрытые риски и возможность ремонта без замены.'
  },
  {
    icon: FileText,
    title: 'Смета и срок',
    text: 'Объясняем, что входит в стоимость: разбор, ремонт, материалы, окраска, сборка, полировка.'
  },
  {
    icon: Wrench,
    title: 'Кузовные работы',
    text: 'Восстанавливаем деталь, геометрию, крепления, пороги или силовые элементы по ситуации.'
  },
  {
    icon: SprayCan,
    title: 'Окраска и выдача',
    text: 'Подбираем цвет, красим, сушим, собираем и проверяем зазоры, фактуру лака и финиш.'
  }
];

export function Process() {
  return (
    <section id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.sectionHeader}>
        <span className={styles.kicker}>Процесс</span>
        <h2 id="process-title">Понятная последовательность для ремонта после ДТП</h2>
      </div>
      <div className={styles.processGrid}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className={styles.processStep} key={step.title}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={28} aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
