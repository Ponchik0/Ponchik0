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

const cover = (title, subtitle, art, inverse = false) => wrap(720, 340, `${title} — ${subtitle}`, `
  <rect width="720" height="340" rx="16" fill="${inverse ? '#f0e8ed' : black}"/>
  <path d="M32 65H688" stroke="${inverse ? '#c7b8c0' : '#383137'}"/>
  ${text(32, 43, subtitle.toUpperCase(), 15, inverse ? '#66515e' : '#bbaeb6', 500, 'letter-spacing="2"')}
  ${art}
  ${text(32, 300, title, 48, inverse ? black : white, 650, 'letter-spacing="-1.5"')}
  <path d="M659 295l20-20m-17 0h17v17" fill="none" stroke="${inverse ? black : pink}" stroke-width="2"/>
`);
await save('project-zoovix', cover('Zoovix', '01 / cinema catalog', `
  <rect x="190" y="96" width="340" height="135" rx="10" fill="#272127" stroke="#54424d"/>
  <circle cx="214" cy="112" r="3" fill="${pink}"/><path d="M230 112H306" stroke="#796370" stroke-width="3" stroke-linecap="round"/>
  <rect x="205" y="129" width="310" height="55" rx="5" fill="#51404c"/>
  <circle cx="360" cy="156" r="15" fill="${pink}"/><path d="M357 150l9 6-9 6z" fill="${black}"/>
  ${[0,1,2,3,4].map(i=>`<rect x="${205+i*63}" y="194" width="56" height="24" rx="3" fill="${i===1?pink:'#3d313a'}"/>`).join('')}
`));
await save('project-portfolio', cover('Personal portfolio', '02 / selected work', `
  <rect x="190" y="96" width="340" height="135" rx="10" fill="#faf8f9" stroke="#c7b8c0"/>
  <path d="M205 114H241M461 114H515" stroke="#aca0a7" stroke-width="3" stroke-linecap="round"/>
  <rect x="211" y="137" width="141" height="8" rx="4" fill="${black}"/><rect x="211" y="154" width="103" height="8" rx="4" fill="${black}"/>
  <path d="M211 179H340M211 188H310" stroke="#b9aab2" stroke-width="3"/>
  <rect x="211" y="202" width="61" height="14" rx="4" fill="${pink}"/>
  <circle cx="450" cy="168" r="34" fill="${pink}"/><circle cx="450" cy="168" r="16" fill="#faf8f9"/>
`, true));
await save('project-cafe', cover('Maksym Café', '03 / pilot concept', `
  <rect x="175" y="96" width="370" height="135" rx="10" fill="#faf8f9" stroke="#c7b8c0"/>
  ${[0,1,2].map(i=>`<g transform="translate(${194+i*116} 111)"><rect width="100" height="78" rx="5" fill="${i===1?'#dcc6d1':'#e8dce3'}"/><ellipse cx="50" cy="40" rx="27" ry="21" fill="#faf8f9"/><ellipse cx="50" cy="40" rx="19" ry="14" fill="#ae7f97"/><path d="M3 93H64M3 104H40" stroke="#b39ba9" stroke-width="4" stroke-linecap="round"/></g>`).join('')}
`, true));
await save('project-poezdato', cover('Poezdato', '04 / redesign concept', `
  <rect x="175" y="96" width="370" height="135" rx="10" fill="#272127" stroke="#54424d"/>
  <rect x="191" y="111" width="276" height="27" rx="4" fill="#3d313a"/><rect x="475" y="111" width="54" height="27" rx="4" fill="${pink}"/>
  ${[0,1,2].map(i=>`<g transform="translate(193 ${153+i*25})"><circle cx="4" cy="4" r="3" fill="${pink}"/><path d="M21 4H67M91 4H202M249 4H325" stroke="${i===0?pink:'#796370'}" stroke-width="4" stroke-linecap="round"/></g>`).join('')}
`));
console.log('Generated 11 SVG assets.');
