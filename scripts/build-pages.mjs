// Génère index.html (français), en/index.html et es/index.html
// à partir du gabarit src/page.html et des textes de src/i18n.json.
// Lancer : node scripts/build-pages.mjs (les pages générées sont versionnées).
import fs from 'node:fs/promises';

const SITE = 'https://cosmoth.vercel.app';
const LANGS = {
  fr: { path: '/', locale: 'fr_FR', name: 'Français', og: 'og.jpg' },
  en: { path: '/en/', locale: 'en_US', name: 'English', og: 'og-en.jpg' },
  es: { path: '/es/', locale: 'es_ES', name: 'Español', og: 'og-es.jpg' },
};
const GAMES = [
  { name: 'Songe', url: 'https://songe-jeu.vercel.app/', image: 'https://songe-jeu.vercel.app/og.jpg', desc: 'songe_pitch', langs: ['fr', 'en', 'es'],
    genre: { fr: "Jeu d'ambiance", en: 'Party game', es: 'Juego de fiesta' } },
  { name: 'Veille Noire', nameKey: 'vn_name', urlKey: 'vn_url', url: 'https://veille-noire.vercel.app/', image: 'https://veille-noire.vercel.app/assets/og.jpg', desc: 'vn_pitch', langs: ['fr', 'en'],
    genre: { fr: 'Jeu de plateau coopératif', en: 'Cooperative board game', es: 'Juego de tablero cooperativo' } },
  { name: 'Royaume de Poche', url: 'https://royaume-de-poche.vercel.app/', image: 'https://royaume-de-poche.vercel.app/og.jpg', desc: 'rdp_pitch', langs: ['fr'],
    genre: { fr: "Jeu de rôle d'aventure", en: 'Adventure role-playing game', es: 'Juego de rol de aventura' } },
];
const page = await fs.readFile('src/page.html', 'utf8');
const texts = JSON.parse(await fs.readFile('src/i18n.json', 'utf8'));
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const alternates = [
  ...Object.entries(LANGS).map(([l, c]) => `<link rel="alternate" hreflang="${l}" href="${SITE}${c.path}">`),
  `<link rel="alternate" hreflang="x-default" href="${SITE}/">`,
].join('\n');

for (const [lang, conf] of Object.entries(LANGS)) {
  const t = texts[lang];
  const links = Object.entries(LANGS).map(([l, c]) => l === lang
    ? `<a href="${c.path}" lang="${l}" aria-current="page">${l.toUpperCase()}</a>`
    : `<a href="${c.path}" lang="${l}" hreflang="${l}" title="${c.name}">${l.toUpperCase()}</a>`).join('');
  const vars = {
    ...Object.fromEntries(Object.entries(t).map(([k, v]) => [k, escAttr(v)])),
    site: SITE, lang, url: SITE + conf.path, locale: conf.locale, og_image: conf.og,
    alternates, lang_links: links,
    jsonld: '<script type="application/ld+json">' + JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': SITE + '/#studio', name: 'Cosmoth', url: SITE + '/', logo: SITE + '/assets/favicon.svg' },
        ...GAMES.map((g) => ({ '@type': 'VideoGame', name: g.nameKey ? t[g.nameKey] : g.name, ...(g.nameKey && t[g.nameKey] !== g.name ? { alternateName: g.name } : {}), url: g.urlKey ? t[g.urlKey] : g.url, description: t[g.desc], image: g.image,
          genre: g.genre[lang], gamePlatform: 'Web browser', applicationCategory: 'Game', inLanguage: g.langs,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, publisher: { '@id': SITE + '/#studio' } })),
      ],
    }) + '</script>', astuce_touch_js: JSON.stringify(t.astuce_touch),
  };
  const html = page.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`Texte manquant : ${k} (${lang})`);
    return vars[k];
  });
  const out = conf.path === '/' ? 'index.html' : `${conf.path.slice(1)}index.html`;
  await fs.mkdir(out.includes('/') ? out.split('/')[0] : '.', { recursive: true });
  await fs.writeFile(out, html);
  console.log(`${lang} : ${out}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.values(LANGS).map((c) => `  <url><loc>${SITE}${c.path}</loc><lastmod>${today}</lastmod>
${Object.entries(LANGS).map(([l, x]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${x.path}"/>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`;
await fs.writeFile('sitemap.xml', sitemap);
await fs.writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('sitemap.xml, robots.txt');
