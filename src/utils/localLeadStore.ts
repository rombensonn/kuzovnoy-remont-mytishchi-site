import type { LeadFormValues } from './validation';

const DB_NAME = 'kuzovnoy-remont-local-leads';
const STORE_NAME = 'leads';
const DB_VERSION = 1;
const FALLBACK_KEY = 'kuzovnoy-remont-local-leads:fallback';

export type StoredLead = Omit<LeadFormValues, 'company'> & {
  id: string;
  createdAt: string;
  page: string;
  userAgent: string;
};

function createId(): string {
  if ('crypto' in window && 'randomUUID' in window.crypto) {
    return window.crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function openLeadDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('phone', 'phone', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Не удалось открыть локальную базу заявок.'));
  });
}

function saveToFallbackStorage(lead: StoredLead): StoredLead {
  const current = window.localStorage.getItem(FALLBACK_KEY);
  const leads = current ? (JSON.parse(current) as StoredLead[]) : [];
  leads.push(lead);
  window.localStorage.setItem(FALLBACK_KEY, JSON.stringify(leads));
  return lead;
}

export async function saveLeadToLocalDatabase(values: LeadFormValues, page: string): Promise<StoredLead> {
  const { company: _company, ...leadValues } = values;
  const lead: StoredLead = {
    ...leadValues,
    id: createId(),
    createdAt: new Date().toISOString(),
    page,
    userAgent: window.navigator.userAgent
  };

  if (!('indexedDB' in window)) {
    return saveToFallbackStorage(lead);
  }

  try {
    const db = await openLeadDatabase();

    return await new Promise<StoredLead>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      store.add(lead);

      transaction.oncomplete = () => {
        db.close();
        resolve(lead);
      };

      transaction.onerror = () => {
        db.close();
        reject(transaction.error ?? new Error('Не удалось сохранить заявку локально.'));
      };
    });
  } catch (_error) {
    return saveToFallbackStorage(lead);
  }
}
