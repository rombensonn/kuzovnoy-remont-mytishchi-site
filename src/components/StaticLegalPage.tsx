import { useEffect } from 'react';

const legalPagePaths = new Map([
  ['/privacy-policy', 'privacy-policy'],
  ['/personal-data-consent', 'personal-data-consent'],
  ['/cookie-notice', 'cookie-notice']
]);

export function getStaticLegalPagePath(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return legalPagePaths.get(normalized) ?? null;
}

type Props = {
  pagePath: string;
};

export function StaticLegalPage({ pagePath }: Props) {
  useEffect(() => {
    const basePath = import.meta.env.BASE_URL;
    const documentPath = `${basePath}${pagePath}/index.html`;

    fetch(documentPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Legal page not found');
        }
        return response.text();
      })
      .then((html) => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch(() => {
        window.location.replace(`${basePath}${pagePath}/`);
      });
  }, [pagePath]);

  return null;
}
