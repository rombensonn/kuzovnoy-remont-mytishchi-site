# Кузовной ремонт в Мытищах

Одностраничный лендинг для кузовного ремонта с React/Vite frontend и PHP 8.2 backend для заявок. Проект рассчитан на локальную разработку и размещение на обычном PHP-хостинге без Node.js на сервере.

## Локальный запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите PHP backend из корня проекта:

```bash
php -S 127.0.0.1:8080 -t .
```

3. Создайте `.env` по примеру:

```bash
cp .env.example .env
```

Для локальной разработки можно указать:

```env
VITE_API_BASE=http://127.0.0.1:8080/backend/api
```

4. Запустите frontend:

```bash
npm run dev
```

Сайт откроется на `http://127.0.0.1:5173`.

## Сборка

```bash
npm run build
```

Готовые статические файлы будут в `dist/`. Для PHP-хостинга загрузите содержимое `dist/` в корень сайта, а папку `backend/` рядом с ним. По умолчанию frontend отправляет заявки в `/backend/api`.

## Backend

`backend/api/lead.php` принимает JSON-заявки, проверяет CSRF-токен, honeypot, согласия, телефон, rate limit и сохраняет данные в `backend/storage/leads.jsonl`.

Настройки находятся в `backend/config/config.php`. Безопасный шаблон лежит в `backend/config/config.example.php`.

Email и Telegram выключены по умолчанию. Включайте их только вручную в config.

## SEO и юридические страницы

В `public/` добавлены `robots.txt`, `sitemap.xml`, favicon и базовые юридические страницы. Перед продакшеном замените `https://example.ru` на реальный домен и проверьте тексты с юристом.
