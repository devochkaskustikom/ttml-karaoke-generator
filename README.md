# TTML Karaoke Generator

[![Deploy GitHub Pages](https://github.com/devochkaskustikom/ttml-karaoke-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/devochkaskustikom/ttml-karaoke-generator/actions/workflows/deploy.yml)

**Live:** [https://devochkaskustikom.github.io/ttml-karaoke-generator/](https://devochkaskustikom.github.io/ttml-karaoke-generator/)

A browser-based tool by **[overflow.name](https://overflow.name)** for creating karaoke-style **Time Synced Lyrics (TTML)** for upload to Apple Music.

Upload an MP3/WAV file and your lyrics, mark each line in time with the music using the spacebar, and download the finished `.ttml` file.

> An independent reimplementation of the original **NCA (2022)** TTML Generator workflow.  
> An unofficial open-source remake built with React 19 + HeroUI v3 + Vite.

---

## Features

- Upload **MP3** or **WAV** files (drag and drop or file selection)
- Track waveform visualization (wavesurfer.js) with scrubbing during the upload step
- Line synchronization: **Spacebar** (hold/release), **Backspace** to undo
- **TTML** export with `HH:mm:ss.SSS` timestamps (iTunes / TTML namespaces)
- **RU / EN** interface
- Tech stack: **React 19**, **HeroUI v3**, **Vite**, **Tailwind CSS v4**

## Quick Start

```bash
npm install
npm run dev
```

Build and run a local preview:

```bash
npm run build
npm run preview
```

Open [http://127.0.0.1:5173/ttml-karaoke-generator/](http://127.0.0.1:5173/ttml-karaoke-generator/) (development server; `base` is configured for GitHub Pages).

## How to Use

1. Add an MP3/WAV audio file.
2. Enter the artist and track title (as listed in your distributor's dashboard / Apple Music).
3. Paste the lyrics - **one line = one timed lyric line**.
4. Click **Continue** or **Play**.
5. During the recording step:
   - Hold the **spacebar** while the line is playing.
   - Release it when the line ends.
   - Press **Backspace** to undo the last timestamp.
6. Download the TTML file and attach it to your track in the **Synced Lyrics** field.

For detailed lyric formatting requirements, click **“How does it work?”** in the app header.

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 + HeroUI v3 |
| Styling | Tailwind CSS v4 + `@heroui/styles` |
| Bundler | Vite 8 |
| Audio | wavesurfer.js 7 |
| Language | TypeScript |

The original CRA/MUI bundle source is preserved in [`legacy/`](./legacy) for reference.

## Project Layout

```text
src/
  App.tsx          # Steps: upload → recording → result
  Player.tsx       # File upload + waveform
  ttml.ts          # TTML generation
  i18n.ts          # RU / EN strings
  AppHeader.tsx    # overflow.name wordmark, language, help
legacy/            # Original (minified), circa 2022
```

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds the project and deploys `dist` to **GitHub Pages**.

**First-time setup (required):**

1. Open [Settings → Pages](https://github.com/devochkaskustikom/ttml-karaoke-generator/settings/pages).
2. Under **Source**, select **GitHub Actions**.
3. Rerun the workflow: [Actions → Deploy GitHub Pages](https://github.com/devochkaskustikom/ttml-karaoke-generator/actions/workflows/deploy.yml) → *Re-run all jobs*.

Until the source is switched to GitHub Actions, the `build` job will succeed, but the `deploy` job will fail.

## License

[MIT](./LICENSE) © 2026 overflow.name / TTML Karaoke Generator contributors.

The product is **overflow.name**. The code is based on the **NCA (2022)** generator workflow; the original product and trademarks belong to their respective owners. This repository is not an official NCA release.
