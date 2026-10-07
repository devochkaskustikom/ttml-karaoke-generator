# TTML Karaoke Generator

[![Deploy GitHub Pages](https://github.com/devochkaskustikom/ttml-karaoke-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/devochkaskustikom/ttml-karaoke-generator/actions/workflows/deploy.yml)

**Live:** [https://devochkaskustikom.github.io/ttml-karaoke-generator/](https://devochkaskustikom.github.io/ttml-karaoke-generator/)

Браузерный инструмент от **[overflow.name](https://overflow.name)** для создания **Time Synced Lyrics (TTML)** в стиле караоке — для загрузки в Apple Music.

Загрузите MP3/WAV и текст песни, отмечайте строки пробелом в такт музыке и скачайте готовый `.ttml`.

> Независимая переделка workflow оригинального TTML-генератора **НЦА (2022)**.  
> Неофициальный open-source remake на React 19 + HeroUI v3 + Vite.

---

## Features

- Загрузка **MP3** или **WAV** (drag & drop или выбор файла)
- Волновая форма трека (wavesurfer.js), scrub на шаге загрузки
- Синхронизация строк: **Space** (зажать / отпустить), **Backspace** — отмена
- Экспорт **TTML** с таймкодами `HH:mm:ss.SSS` (itunes / ttml namespaces)
- Интерфейс **RU / EN**
- Стек: **React 19**, **HeroUI v3**, **Vite**, **Tailwind CSS v4**

## Quick start

```bash
npm install
npm run dev
```

Сборка и локальный превью:

```bash
npm run build
npm run preview
```

Откройте [http://127.0.0.1:5173/ttml-karaoke-generator/](http://127.0.0.1:5173/ttml-karaoke-generator/) (dev; `base` под GitHub Pages).

## How to use

1. Добавьте аудиофайл MP3/WAV.
2. Укажите исполнителя и название трека (как в кабинете дистрибьютора / Apple Music).
3. Вставьте текст песни — **одна строка = одна timed lyric line**.
4. Нажмите «продолжить» или Play.
5. На шаге записи:
   - держите **пробел**, пока звучит строка;
   - отпустите в конце строки;
   - **Backspace** — откатить последнюю отметку.
6. Скачайте TTML и прикрепите к треку в поле Synced Lyrics.

Подробные требования к тексту — в кнопке «Как это работает?» в шапке приложения.

## Tech stack

| Layer        | Choice                             |
|--------------|------------------------------------|
| UI           | React 19 + HeroUI v3               |
| Styling      | Tailwind CSS v4 + `@heroui/styles` |
| Bundler      | Vite 8                             |
| Audio        | wavesurfer.js 7                    |
| Language     | TypeScript                         |

Исходники оригинального CRA/MUI-бандла сохранены в [`legacy/`](./legacy) для справки.

## Project layout

```
src/
  App.tsx          # шаги: загрузка → запись → результат
  Player.tsx       # загрузка файла + waveform
  ttml.ts          # сборка TTML
  i18n.ts          # RU / EN строки
  AppHeader.tsx    # overflow.name wordmark, язык, справка
legacy/            # оригинал (minified) ~2022
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) собирает проект и публикует `dist` на **GitHub Pages**.

**Первый раз (обязательно):**  
1. Откройте [Settings → Pages](https://github.com/devochkaskustikom/ttml-karaoke-generator/settings/pages)  
2. **Source** → **GitHub Actions**  
3. Перезапустите workflow: [Actions → Deploy GitHub Pages](https://github.com/devochkaskustikom/ttml-karaoke-generator/actions/workflows/deploy.yml) → *Re-run all jobs*

Пока Source не переключён на Actions, job `build` проходит, а `deploy` падает.

## License

[MIT](./LICENSE) © 2026 overflow.name / TTML Karaoke Generator contributors.

Продукт — **overflow.name**. Код основан на workflow генератора **НЦА (2022)**; оригинальный продукт и товарные знаки принадлежат своим владельцам. Этот репозиторий не является официальным релизом НЦА.
