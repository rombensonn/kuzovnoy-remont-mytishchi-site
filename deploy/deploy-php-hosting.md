# Деплой на PHP-хостинг

1. Локально выполните `npm install` и `npm run build`.
2. Загрузите содержимое папки `dist/` в корневую директорию сайта на хостинге.
3. Загрузите папку `backend/` в ту же корневую директорию.
4. Скопируйте `backend/config/config.example.php` в `backend/config/config.php`.
5. Убедитесь, что PHP версии 8.2+ и расширение `json` включены.
6. Дайте PHP-процессу права на запись в `backend/storage/leads.jsonl` и `backend/storage/rate-limit.json`.
7. В `public/robots.txt` и `public/sitemap.xml` замените `https://example.ru` на реальный домен.
8. Проверьте отправку формы на продакшен-домене.

## Рекомендации

- Не храните `backend/storage/` в публичных резервных копиях.
- Включайте email или Telegram только после проверки `config.php`.
- Для HTTPS используйте сертификат хостинга или Let's Encrypt.
- Если хостинг поддерживает rewrite, оставьте `.htaccess` из папки `backend/`.
