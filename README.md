# Site Constructor

Визуальный конструктор для создания простых сайтов. Позволяет настроить SEO-информацию и собрать страницу из типизированных блоков с поддержкой drag-and-drop сортировки.

## Стек

- **Vue 3** + TypeScript + Composition API
- **Nuxt UI v4** — UI-компоненты
- **Tailwind CSS v4** — стилизация
- **Vee-Validate** + **Zod** — валидация форм
- **vue-draggable-plus** — drag-and-drop сортировка блоков
- **Pinia** — state management
- **Vite** — сборка

## Запуск

```bash
pnpm install
pnpm dev
```

Другие команды:

```bash
pnpm build        # production-сборка
pnpm preview      # предпросмотр сборки
pnpm type-check   # проверка типов
pnpm lint         # линтинг (oxlint + eslint)
pnpm format       # форматирование (oxfmt)
pnpm test:unit    # юнит-тесты (vitest)
```

## Структура проекта

```
src/
├── views/
│   └── SiteConstructorForm/
│       ├── SiteConsctructorForm.vue   # Главная форма
│       ├── types.ts                   # Типы данных
│       ├── consts.ts                  # Константы и дефолтные значения
│       └── components/
│           ├── CarouselElement.vue    # Блок карусели
│           ├── ImageElement.vue       # Блок баннера/изображения
│           ├── ButtonsElement.vue     # Блок кнопок
│           ├── VideoElement.vue       # Блок видео
│           └── DescriptionElement.vue # Блок текстового описания
```

## Функциональность

### SEO-блок

Заполняется один раз для всей страницы:

| Поле | Ограничение |
|------|-------------|
| Заголовок сайта | макс. 60 символов, обязательное |
| Описание сайта | макс. 70 символов, обязательное |

Валидация через Zod-схему, ошибки отображаются инлайн под полями.

### Блоки страницы

Блоки добавляются кнопкой **+ Добавить элемент**, после чего выбирается тип из выпадающего списка. Поддерживается шесть типов:

| Тип | Поля |
|-----|------|
| `image` / `banner` | Название, ссылка по клику, загрузка файла |
| `description` | Текстовое поле |
| `video` | URL видео или загрузка файла |
| `button` | Цвет, режим отображения (список / горизонтально), список кнопок с текстом и ссылкой |
| `carousel` | Название карусели, слайды (URL или файл, каждый слайд добавляется отдельно) |

Каждый блок можно:
- **Удалить** — кнопка «Удалить» в заголовке блока
- **Перетащить** — drag за иконку `⠿` для изменения порядка

Слайды карусели также поддерживают drag-and-drop внутри блока.

### Структура данных формы

```ts
interface SiteForm {
  seo: {
    siteTitle: string
    siteDescription: string
  }
  elements: Array<{
    type: 'image' | 'description' | 'video' | 'button' | 'carousel' | 'banner'
    data: VideoData | DescriptionData | ImageData | CarouselData | ButtonData
  }>
}
```

## Требования

- Node.js `^20.19.0` или `>=22.12.0`
- pnpm
