/**
 * TTML building blocks ported 1:1 from the legacy bundle:
 *  - timestamps in HH:mm:ss.SSS
 *  - Apple Music namespaces (tts / itunes / ttm), ttm:agent voice1
 *  - <body><div><p begin end>text</p>...</div></body>
 */

export interface LyricLine {
    begin: string;
    end: string;
    text: string;
}

/**
 * Legacy quirk note: the old app added `60 * getTimezoneOffset() * 1000` to the
 * timestamp and then formatted it with moment in *local* time — the two shifts
 * cancelled out, so the effective output is the plain track time as HH:mm:ss.SSS.
 */
export function toTimestamp(ms: number): string {
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor(ms / 60_000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    const mss = Math.floor(ms % 1000);
    const pad = (n: number, w = 2) => String(n).padStart(w, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(mss, 3)}`;
}

function escapeXml(text: string): string {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

export function buildTtml({title, name, items}: {title: string; name: string; items: LyricLine[]}): string {
    const esc = escapeXml;
    const lines = items
        .map((it) => `        <p begin="${esc(it.begin)}" end="${esc(it.end)}">${esc(it.text)}</p>`)
        .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<tt xmlns="http://www.w3.org/ns/ttml" xmlns:tts="http://www.w3.org/ns/ttml#styling" xmlns:itunes="http://itunes.apple.com/lyric-ttml-extensions" xmlns:ttm="http://www.w3.org/ns/ttml#metadata" xml:lang="en-US">
  <head>
    <metadata>
      <ttm:title>${esc(title)}</ttm:title>
    </metadata>
    <ttm:agent xml:id="voice1" type="person">
      <ttm:name type="full">${esc(name)}</ttm:name>
    </ttm:agent>
  </head>
  <body>
    <div>
${lines}
    </div>
  </body>
</tt>
`;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/[\s_]+/g, "_");
}

export function makeFileName(artist: string, title: string, withDate: boolean): string {
    let base = "karaoke";
    if (artist.trim() && title.trim()) base = `${title.trim()}_${artist.trim()}`;
    else if (artist.trim()) base = artist.trim();
    else if (title.trim()) base = title.trim();
    const slug = slugify(base) || "karaoke";
    if (!withDate) return slug;
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${slug}_${pad(d.getHours())}.${pad(d.getMinutes())}_${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}
