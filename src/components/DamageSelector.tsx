import { useState } from 'react';
import { damageOptions } from '../data/services';
import { assetPath } from '../utils/assetPath';
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

const damagePhotos: Record<string, { src: string; alt: string }> = {
  Бампер: {
    src: '/images/damage-bumper-phone.webp',
    alt: 'Поврежденный бампер автомобиля до кузовного ремонта'
  },
  Крыло: {
    src: '/images/damage-fender-phone.webp',
    alt: 'Поврежденное крыло автомобиля до кузовного ремонта'
  },
  Дверь: {
    src: '/images/damage-door-phone.webp',
    alt: 'Вмятина и царапины на двери автомобиля до ремонта'
  },
  Капот: {
    src: '/images/damage-hood-phone.webp',
    alt: 'Поврежденный капот автомобиля со сколами и вмятинами'
  },
  Порог: {
    src: '/images/damage-rocker-phone.webp',
    alt: 'Поврежденный порог автомобиля до ремонта'
  },
  Крыша: {
    src: '/images/damage-roof-phone.webp',
    alt: 'Вмятины на крыше автомобиля до ремонта'
  },
  'Сколы и царапины': {
    src: '/images/damage-scratches-phone.webp',
    alt: 'Сколы и царапины на лакокрасочном покрытии автомобиля'
  },
  'Вмятина без покраски': {
    src: '/images/damage-pdr-dent-phone.webp',
    alt: 'Плавная вмятина на детали автомобиля без повреждения краски'
  },
  'Геометрия кузова': {
    src: '/images/damage-geometry-phone.webp',
    alt: 'Нарушенные зазоры кузова автомобиля после удара'
  },
  'Нужен осмотр': {
    src: '/images/damage-inspection-phone.webp',
    alt: 'Автомобиль с несколькими повреждениями перед осмотром мастера'
  }
};

export function DamageSelector() {
  const [selected, setSelected] = useState('Бампер');
  const damagePhoto = damagePhotos[selected] ?? damagePhotos['Нужен осмотр'];

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
        <figure className={styles.damageMap}>
          <img src={assetPath(damagePhoto.src)} alt={damagePhoto.alt} loading="lazy" />
        </figure>

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
