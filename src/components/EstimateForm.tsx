import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { coreServices, damageOptions } from '../data/services';
import { formatPhoneInput, normalizePhone } from '../utils/formatPhone';
import { LeadFormValues, validateLead } from '../utils/validation';
import { LegalCheckboxes } from './LegalCheckboxes';
import styles from './Landing.module.scss';

const apiBase = import.meta.env.VITE_API_BASE || '/backend/api';

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

export function EstimateForm() {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [csrf, setCsrf] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormValues, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });

  const serviceOptions = useMemo(() => coreServices.map((service) => service.title), []);

  useEffect(() => {
    fetch(`${apiBase}/csrf.php`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setCsrf(data.csrfToken || ''))
      .catch(() => setCsrf(''));
  }, []);

  function updateField<K extends keyof LeadFormValues>(name: K, value: LeadFormValues[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
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
      const response = await fetch(`${apiBase}/lead.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        body: JSON.stringify({
          ...values,
          phone: normalizePhone(values.phone),
          page: window.location.href
        })
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Не удалось отправить заявку.');
      }

      setValues(initialValues);
      setSubmitState({ status: 'success', message: 'Заявка отправлена. Мастер свяжется с вами для уточнения повреждения.' });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Не удалось отправить заявку.'
      });
    }
  }

  return (
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
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Например, Алексей"
            autoComplete="name"
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

        {submitState.message && (
          <p className={submitState.status === 'success' ? styles.formSuccess : styles.formError} role="status">
            {submitState.status === 'success' ? <CheckCircle2 size={18} aria-hidden="true" /> : <AlertCircle size={18} aria-hidden="true" />}
            {submitState.message}
          </p>
        )}
      </form>
    </section>
  );
}
