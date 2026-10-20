// Editable, self-contained artwork. No remote fonts, scripts, or image services.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const assets = fileURLToPath(new URL('../assets/', import.meta.url));
await mkdir(assets, { recursive: true });
const pink = '#edb3cc';
const black = '#131316';
const white = '#faf8f9';
const font = 'Arial, Helvetica, sans-serif';
const text = (x, y, label, size, color, weight = 400, extra = '') => `<text x="${x}" y="${y}" fill="${color}" font-family="${font}" font-size="${size}" font-weight="${weight}" ${extra}>${label}</text>`;
const wrap = (width, height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
const save = (name, svg) => writeFile(`${assets}/${name}.svg`, svg.replace(/[ \t]+$/gm, ''));
const sparkle = (cx, cy, radius, color) => `<g transform="translate(${cx} ${cy})">${Array.from({length: 8}, (_, i) => `<rect x="-11" y="-${radius}" width="22" height="${radius * 2}" rx="11" fill="${color}" transform="rotate(${i * 22.5})"/>`).join('')}<circle r="18" fill="${black}"/></g>`;

for (const theme of ['dark', 'light']) {
  const dark = theme === 'dark';
  const bg = dark ? black : '#f5f1f3';
  const ink = dark ? white : black;
  const muted = dark ? '#bfb7bd' : '#665d64';
  const line = dark ? '#363037' : '#d8cdd3';
  await save(`profile-${theme}`, wrap(1280, 500, 'Ponchik — creative developer · Kyiv, Ukraine', `
    <rect width="1280" height="500" rx="28" fill="${bg}"/>
    <path d="M48 80H1232" stroke="${line}"/>
    ${text(48, 51, 'P / PERSONAL SPACE', 19, muted, 500, 'letter-spacing="2"')}
    ${text(1232, 51, 'KYIV, UKRAINE', 19, muted, 500, 'text-anchor="end" letter-spacing="2"')}
    ${text(44, 244, 'ponchik', 132, ink, 750, 'letter-spacing="-7"')}
    <circle cx="550" cy="229" r="12" fill="${pink}"/>
    ${text(50, 310, 'Web, tools &amp;', 36, ink, 500)}
    ${text(50, 358, 'thoughtful details.', 36, muted, 400)}
    <rect x="872" y="134" width="272" height="272" rx="136" fill="none" stroke="${line}"/>
    <ellipse cx="1008" cy="270" rx="181" ry="80" transform="rotate(-32 1008 270)" fill="none" stroke="${line}" stroke-width="1.5"/>
    ${sparkle(1008, 270, 103, pink)}
    <circle cx="1162" cy="174" r="9" fill="${ink}"/>
    <path d="M48 436H1232" stroke="${line}"/>
    ${text(48, 470, 'INTERFACES / AUTOMATION / WEB PRODUCTS', 17, muted, 500, 'letter-spacing="1.8"')}
    <g transform="translate(1199 461)" stroke="${pink}" stroke-width="2"><path d="M-14 0H14M0 -14V14M-10 -10L10 10M-10 10L10 -10"/></g>
  `));
  await save(`footer-${theme}`, wrap(1280, 180, 'Have an idea? Let’s make something good.', `
    <rect width="1280" height="180" rx="20" fill="${bg}"/>
    ${text(48, 73, 'HAVE AN IDEA?', 18, muted, 600, 'letter-spacing="2.5"')}
    ${text(48, 129, 'Let’s make something good.', 45, ink, 600, 'letter-spacing="-1"')}
    ${sparkle(1160, 90, 45, pink)}
  `));
}

for (const [name, label, primary] of [['portfolio', 'Portfolio', true], ['telegram', 'Telegram', false], ['email', 'Email', false]]) {
  const bg = primary ? pink : black;
  const ink = primary ? black : white;
  await save(`link-${name}`, wrap(146, 40, label, `<rect x=".5" y=".5" width="145" height="39" rx="8" fill="${bg}" stroke="${primary ? '#d09cb3' : '#494049'}"/>${text(19, 26, label, 15, ink, 600)}<path d="M118 25l9-9m-8 0h8v8" fill="none" stroke="${ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`));
}

console.log('Generated 7 SVG assets.');
