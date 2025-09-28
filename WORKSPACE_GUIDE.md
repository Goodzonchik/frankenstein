# Руководство по работе с npm workspaces

## Что было сделано

Настроен npm workspace для объединения всех зависимостей в одну папку `node_modules` в корне проекта.

## Структура проекта

```
frankenstein/
├── node_modules/          # Единая папка с зависимостями
├── package.json           # Корневой package.json с workspaces
├── package-lock.json      # Единый lock файл
├── frontend/              # Angular приложение
├── file-storage-service/  # NestJS сервис
├── graph-db-service/      # NestJS сервис
└── postgres-db-service/   # NestJS сервис
```

## Команды для работы

### Установка зависимостей
```bash
npm install --legacy-peer-deps
```

### Сборка всех проектов
```bash
npm run build:all
```

### Запуск всех проектов
```bash
npm run start:all
```

### Тестирование всех проектов
```bash
npm run test:all
```

### Работа с отдельными проектами

#### Frontend (Angular)
```bash
npm run frontend              # Запуск в dev режиме
npm run frontend:build        # Сборка
npm run frontend:test         # Тестирование
```

#### File Storage Service
```bash
npm run file-storage          # Запуск в dev режиме
npm run file-storage:build    # Сборка
npm run file-storage:test     # Тестирование
```

#### Graph DB Service
```bash
npm run graph-db              # Запуск в dev режиме
npm run graph-db:build        # Сборка
npm run graph-db:test         # Тестирование
```

#### Postgres DB Service
```bash
npm run postgres-db           # Запуск в dev режиме
npm run postgres-db:build     # Сборка
npm run postgres-db:test      # Тестирование
```

### Docker команды

#### Запуск всех сервисов в Docker
```bash
npm run docker:up             # Запуск всех контейнеров
npm run docker:down           # Остановка всех контейнеров
npm run docker:logs           # Просмотр логов
npm run docker:build          # Пересборка образов
npm run docker:restart        # Перезапуск контейнеров
```

#### Прямые docker-compose команды
```bash
docker-compose up -d          # Запуск в фоновом режиме
docker-compose down           # Остановка
docker-compose logs -f        # Просмотр логов
docker-compose ps             # Статус контейнеров
```

## Преимущества

1. **Единая папка node_modules** - экономия места на диске
2. **Общие зависимости** - дублирующиеся пакеты устанавливаются один раз
3. **Упрощенное управление** - все команды выполняются из корня проекта
4. **Быстрая установка** - npm работает быстрее с workspaces

## Важные замечания

- Всегда используйте `--legacy-peer-deps` при установке зависимостей
- Не создавайте отдельные папки `node_modules` в подпроектах
- Все команды выполняйте из корня проекта
- При добавлении новых зависимостей используйте команды типа `npm install package-name --workspace=frontend`
