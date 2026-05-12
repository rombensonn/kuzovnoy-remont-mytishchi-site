import { useState } from 'react';
import { damageOptions } from '../data/services';
import styles from './Landing.module.scss';

const damageHints: Record<string, string> = {
  Бампер: 'Проверим крепления, трещины пластика, зазоры и необходимость окраски.',
  Крыло: 'Оценим вытяжку металла, кромки, переход цвета и риск скрытых заломов.',
  Дверь: 'Смотрим плоскость, ребра жесткости, петли, замки и совпадение оттенка.',
  Капот: 'Проверяем сколы, вмятины, ребра, подгонку по фарам и крыльям.',
  Порог: 'Оцениваем коррозию, сварку, усилитель и антикор после ремонта.',
  Крыша: 'Проверяем растяжение металла, лак и возможность ремонта без окраски.',
  'Сколы и царапины': 'Определим, хватит ли локального ремонта или нужна окраска детали.',
  'Вмятина без покраски': 'Проверим доступ к обратной стороне и состояние заводского лака.',
  'Геометрия кузова': 'Смотрим диагонали, проемы, лонжероны и необходимость стапеля.',
  'Нужен осмотр': 'Подойдет, если повреждений несколько или неясно, с чего начать.'
};

export function DamageSelector() {
  const [selected, setSelected] = useState('Бампер');

  return (
    <section className={styles.damage} aria-labelledby="damage-title">
      <div className={styles.damageIntro}>
        <span className={styles.kicker}>Быстрый маршрут к смете</span>
        <h2 id="damage-title">Отметьте поврежденную зону, чтобы мастер сразу понял объем осмотра</h2>
        <p>
          Не нужно описывать кузов «на глаз». Выберите деталь, а в заявке добавьте пару слов:
          где удар, есть ли царапина, трещина, вмятина или нарушение зазоров.
        </p>
      </div>

      <div className={styles.damageWorkbench}>
        <div className={styles.damageMap} aria-hidden="true">
          <span className={styles.damagePulse} />
          <span className={styles.carRoof} />
          <span className={styles.carBody} />
          <span className={styles.carBumper} />
          <span className={styles.carWheelLeft} />
          <span className={styles.carWheelRight} />
        </div>

        <div className={styles.damageControls}>
          <div className={styles.damageGrid} role="list" aria-label="Типы повреждений">
            {damageOptions.map((option) => (
              <button
                key={option}
                className={option === selected ? styles.damageActive : styles.damageButton}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={option === selected}
              >
                {option}
              </button>
            ))}
          </div>

          <div className={styles.damageResult}>
            <span>выбрано</span>
            <strong>{selected}</strong>
            <p>{damageHints[selected]}</p>
            <a href="#estimate">Записаться на осмотр</a>
          </div>
        </div>
      </div>
    </section>
  );
}
