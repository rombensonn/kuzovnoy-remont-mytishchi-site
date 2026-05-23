import { gsap } from 'gsap';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { coreServices, damageOptions } from '../data/services';
import { formatPhoneInput, normalizePhone } from '../utils/formatPhone';
import { saveLeadToLocalDatabase } from '../utils/localLeadStore';
import { LeadFormValues, validateLead } from '../utils/validation';
import { LegalCheckboxes } from './LegalCheckboxes';
import styles from './Landing.module.scss';

type SubmitState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
};

const initialValues: LeadFormValues = {
  name: '',
  phone: '',
  service: 'Кузовной ремонт после ДТП',
  damage: 'Бампер',
  message: '',
  personalData: false,
  privacy: false,
  company: ''
};

const confettiColors = ['#f3c14b', '#b98200', '#16703c', '#ffffff', '#dfe5ea'];
const confettiPieces = Array.from({ length: 56 }, (_, index) => ({
  id: index,
  color: confettiColors[index % confettiColors.length],
  delay: (index % 8) * 0.035,
  drift: (index % 2 === 0 ? 1 : -1) * (42 + (index % 9) * 12),
  height: 9 + (index % 3) * 4,
  left: 10 + ((index * 17) % 80),
  rotation: (index % 2 === 0 ? 1 : -1) * (160 + (index % 7) * 62),
  width: 5 + (index % 4) * 2
}));

function sanitizeNameInput(value: string): string {
  return value.replace(/\p{N}/gu, '');
}

export function EstimateForm() {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormValues, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const confettiLayerRef = useRef<HTMLDivElement>(null);
  const thankYouTimer = useRef<number>();

  const serviceOptions = useMemo(() => coreServices.map((service) => service.title), []);

  useEffect(() => {
    return () => {
      if (thankYouTimer.current) {
        window.clearTimeout(thankYouTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!thankYouVisible || !confettiLayerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const pieces = Array.from(confettiLayerRef.current.querySelectorAll<HTMLSpanElement>(`.${styles.confettiPiece}`));
    const viewportFall = Math.min(window.innerHeight * 0.82, 720);

    gsap.set(pieces, {
      opacity: 0,
      rotation: 0,
      scale: 0.92,
      x: 0,
      y: -36
    });

    const revealTween = gsap.to(pieces, {
      duration: 0.2,
      ease: 'power1.out',
      opacity: 1,
      stagger: {
        amount: 0.32,
        from: 'center'
      }
    });

    const fallTween = gsap.to(pieces, {
      delay: (index, target) => Number((target as HTMLElement).dataset.delay) || 0,
      duration: (index) => 2.25 + (index % 9) * 0.08,
      ease: 'power2.out',
      opacity: 0,
      rotation: (index, target) => Number((target as HTMLElement).dataset.rotation) || 240,
      stagger: {
        amount: 0.22,
        from: 'center'
      },
      x: (index, target) => Number((target as HTMLElement).dataset.drift) || 0,
      y: (index) => viewportFall + (index % 7) * 20
    });

    return () => {
      revealTween.kill();
      fallTween.kill();
      gsap.killTweensOf(pieces);
    };
  }, [thankYouVisible]);

  function updateField<K extends keyof LeadFormValues>(name: K, value: LeadFormValues[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function playThankYouAnimation() {
    if (thankYouTimer.current) {
      window.clearTimeout(thankYouTimer.current);
    }

    setThankYouVisible(false);

    window.requestAnimationFrame(() => {
      setThankYouVisible(true);
      thankYouTimer.current = window.setTimeout(() => setThankYouVisible(false), 4600);
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLead(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState({ status: 'error', message: 'Проверьте поля формы.' });
      return;
    }

    setSubmitState({ status: 'loading', message: 'Отправляем заявку...' });

    try {
      await saveLeadToLocalDatabase(
        {
          ...values,
          phone: normalizePhone(values.phone)
        },
        window.location.href
      );
      setValues(initialValues);
      setSubmitState({ status: 'success', message: 'Заявка сохранена локально.' });
      playThankYouAnimation();
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Не удалось сохранить заявку локально.'
      });
    }
  }

  return (
    <>
      <section id="estimate" className={styles.estimate} aria-labelledby="estimate-title">
        <div className={styles.estimateText}>
          <span className={styles.kicker}>Заявка</span>
          <h2 id="estimate-title">Запишитесь на осмотр или получите предварительный расчет</h2>
          <p>
            Опишите повреждение и оставьте телефон. Если нужна точность, мастер попросит фото
            или предложит удобное время для осмотра на Колпакова.
          </p>
          <ul className={styles.estimatePoints}>
            <li>Предварительный расчет по описанию или фото</li>
            <li>Смета после проверки скрытых повреждений</li>
            <li>Звонок для согласования времени осмотра</li>
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.honeypot} aria-hidden="true">
            <label>
              Компания
              <input
                tabIndex={-1}
                autoComplete="off"
                name="company"
                value={values.company}
                onChange={(event) => updateField('company', event.target.value)}
              />
            </label>
          </div>

          <label>
            <span>Ваше имя</span>
            <input
              value={values.name}
              onChange={(event) => updateField('name', sanitizeNameInput(event.target.value))}
              placeholder="Например, Алексей"
              autoComplete="name"
              inputMode="text"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <small role="alert">{errors.name}</small>}
          </label>

          <label>
            <span>Телефон</span>
            <input
              value={values.phone}
              onChange={(event) => updateField('phone', formatPhoneInput(event.target.value))}
              placeholder="+7 (___) ___-__-__"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <small role="alert">{errors.phone}</small>}
          </label>

          <label>
            <span>Что нужно сделать</span>
            <select value={values.service} onChange={(event) => updateField('service', event.target.value)}>
              {serviceOptions.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Повреждение</span>
            <select value={values.damage} onChange={(event) => updateField('damage', event.target.value)}>
              {damageOptions.map((damage) => (
                <option key={damage}>{damage}</option>
              ))}
            </select>
          </label>

          <label className={styles.formWide}>
            <span>Комментарий</span>
            <textarea
              value={values.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder="Например: заднее правое крыло, есть вмятина и царапина, нужен осмотр после ДТП"
              rows={5}
            />
          </label>

          <LegalCheckboxes
            personalData={values.personalData}
            privacy={values.privacy}
            errors={{ personalData: errors.personalData, privacy: errors.privacy }}
            onChange={updateField}
          />

          <button className={styles.submitButton} type="submit" disabled={submitState.status === 'loading'}>
            <Send size={18} aria-hidden="true" />
            {submitState.status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
          </button>

          {submitState.status === 'error' && submitState.message && (
            <p className={styles.formError} role="status">
              <AlertCircle size={18} aria-hidden="true" />
              {submitState.message}
            </p>
          )}
        </form>
      </section>

      {thankYouVisible && (
        <div className={styles.thankYouBackdrop} role="status" aria-live="polite">
          <div ref={confettiLayerRef} className={styles.confettiLayer} aria-hidden="true">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className={styles.confettiPiece}
                data-delay={piece.delay}
                data-drift={piece.drift}
                data-rotation={piece.rotation}
                style={
                  {
                    '--confetti-color': piece.color,
                    '--confetti-height': `${piece.height}px`,
                    '--confetti-left': `${piece.left}%`,
                    '--confetti-width': `${piece.width}px`
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div className={styles.thankYouCard}>
            <span className={styles.thankYouIcon}>
              <CheckCircle2 size={28} aria-hidden="true" />
            </span>
            <h3>Спасибо за заявку</h3>
            <p>Мы получили ваши данные. Скоро с вами свяжемся.</p>
          </div>
        </div>
      )}
    </>
  );
}
