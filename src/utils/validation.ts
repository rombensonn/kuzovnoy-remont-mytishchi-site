import { normalizePhone } from './formatPhone';

export type LeadFormValues = {
  name: string;
  phone: string;
  service: string;
  damage: string;
  message: string;
  personalData: boolean;
  privacy: boolean;
  company: string;
};

export type ValidationErrors = Partial<Record<keyof LeadFormValues, string>>;

export function validateLead(values: LeadFormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  if (values.company.trim()) {
    errors.company = 'Проверка не пройдена.';
  }

  if (values.name.trim().length < 2) {
    errors.name = 'Укажите имя.';
  }

  const phone = normalizePhone(values.phone);
  if (!/^\+7\d{10}$/.test(phone)) {
    errors.phone = 'Укажите телефон в формате +7.';
  }

  if (!values.personalData) {
    errors.personalData = 'Нужно согласие на обработку данных.';
  }

  if (!values.privacy) {
    errors.privacy = 'Нужно согласие с политикой конфиденциальности.';
  }

  return errors;
}
