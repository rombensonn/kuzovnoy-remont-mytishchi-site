import styles from './Landing.module.scss';
import { assetPath } from '../utils/assetPath';

type Props = {
  personalData: boolean;
  privacy: boolean;
  onChange: (name: 'personalData' | 'privacy', value: boolean) => void;
  errors: {
    personalData?: string;
    privacy?: string;
  };
};

export function LegalCheckboxes({ personalData, privacy, onChange, errors }: Props) {
  return (
    <div className={styles.legalChecks}>
      <label>
        <input
          type="checkbox"
          checked={personalData}
          onChange={(event) => onChange('personalData', event.target.checked)}
        />
        <span>
          Даю согласие на <a href={assetPath('/personal-data-consent')} target="_blank">обработку персональных данных</a>.
        </span>
      </label>
      {errors.personalData && <small role="alert">{errors.personalData}</small>}

      <label>
        <input
          type="checkbox"
          checked={privacy}
          onChange={(event) => onChange('privacy', event.target.checked)}
        />
        <span>
          Согласен с <a href={assetPath('/privacy-policy')} target="_blank">политикой обработки персональных данных</a>.
        </span>
      </label>
      {errors.privacy && <small role="alert">{errors.privacy}</small>}
    </div>
  );
}
