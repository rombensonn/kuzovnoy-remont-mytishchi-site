import { extraCapabilities, coreServices } from '../data/services';
import styles from './Landing.module.scss';

export function Services() {
  return (
    <section id="services" className={styles.services} aria-labelledby="services-title">
      <div className={styles.sectionHeader}>
        <span className={styles.kicker}>Кузовные работы</span>
        <h2 id="services-title">Фокус на кузове, окраске и восстановлении геометрии</h2>
        <p>Основной экран и услуги не смешаны с ремонтом агрегатов: посетитель сразу понимает, что попал в кузовной цех.</p>
      </div>
      <div className={styles.serviceGrid}>
        {coreServices.map((service) => {
          const Icon = service.icon;
          return (
            <article className={styles.serviceCard} key={service.title}>
              <Icon size={26} aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className={styles.extraLine}>
        <strong>Дополнительные возможности сервиса</strong>
        <div>
          {extraCapabilities.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
