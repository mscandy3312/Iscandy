/* ============================================================
   OlaViral - generador de páginas de artículo (SEO)
   Uso:  node tools/build.js
   Genera un .html por artículo a partir de data/articles.js
   y actualiza sitemap.xml
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "https://iscandy.vercel.app";
const ADS_CLIENT = "ca-pub-5991751155826241";
const SLOT_AUTO = "4573000864";
const SLOT_INARTICLE = "1793785124";
const SLOT_MATOME = "3128802116";

const { ARTICLES, slug } = require(path.join(ROOT, "data/articles.js"));

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function related(currentIdx) {
  const picks = [];
  for (let k = 1; k <= 3; k++) picks.push(ARTICLES[(currentIdx + k) % ARTICLES.length]);
  return picks;
}

function relatedCard(a) {
  const i = ARTICLES.indexOf(a);
  return `      <article class="card">
        <div class="card__img" style="background:${a.color}">
          <img src="img/art${i + 1}.jpg" alt="${esc(a.title)}" loading="lazy" width="800" height="500">
          <span class="tag">${esc(a.tag)}</span>
        </div>
        <div class="card__body">
          <h3><a href="${slug(a.title)}.html">${esc(a.title)}</a></h3>
          <p>${esc(a.desc)}</p>
          <div class="card__foot"><span>${esc(a.time)} · ${esc(a.read)}</span>
            <div class="share">
              <button data-share="wa" data-url="${slug(a.title)}.html" data-t="${esc(a.title)}">W</button>
              <button data-share="x" data-url="${slug(a.title)}.html" data-t="${esc(a.title)}">X</button>
              <button data-share="cp" data-url="${slug(a.title)}.html" data-t="${esc(a.title)}">⧉</button>
            </div>
          </div>
        </div>
      </article>`;
}

function body(a) {
  const t = esc(a.title);
  const d = esc(a.desc);
  return `    <p class="lead">${d} En este artículo de <strong>OlaViral</strong> repasamos todo lo que necesitas saber sobre ${t.charAt(0).toLowerCase() + t.slice(1)}.</p>

    <p>Se ha convertido en uno de los temas más comentados de las últimas semanas. Y no es casualidad: reúne justo las características que hacen que algo se comparta sin parar, desde lo sorprendente hasta lo fácil de contar a otras personas.</p>

    <h2>Por qué llama tanto la atención</h2>
    <p>Cuando algo conecta con tanta gente, normalmente es porque cumple varias de estas condiciones:</p>
    <ul>
      <li>Es fácil de entender en pocos segundos.</li>
      <li>Genera emoción: sorpresa, risa o curiosidad.</li>
      <li>Invita a compartirlo con amigos.</li>
      <li>Cuenta algo que casi nadie sabía.</li>
    </ul>

    <div class="affiliate affiliate--inline">
      <a class="btn btn--deal" href="https://www.amazon.com/s?tag=TU_TAG-20" target="_blank" rel="nofollow sponsored noopener">Ver productos relacionados en Amazon →</a>
      <small class="affiliate__disc">Enlace de afiliado. Ganamos una comisión sin coste extra para ti.</small>
    </div>

    <h2>Lo que dice la gente</h2>
    <p>Miles de personas ya han reaccionado a este tema en redes sociales. Muchos comparten su propia versión, y otros simplemente lo reenvían porque les ha parecido demasiado bueno como para guardárselo.</p>

    <blockquote>“No lo podía creer, tuve que compartirlo con todo el grupo.”</blockquote>

    <h2>Conclusión</h2>
    <p>${d} Si te ha parecido interesante, compártelo con quien creas que le va a gustar. Y no te pierdas el resto de contenido de OlaViral: publicamos cosas nuevas cada día.</p>

    <div class="affiliate affiliate--inline">
      <a class="btn" href="linkinbio.html">Síguenos en redes y no te pierdas nada →</a>
    </div>`;
}

function page(a, idx) {
  const s = slug(a.title);
  const img = `${BASE}/img/art${idx + 1}.jpg`;
  const url = `${BASE}/${s}.html`;
  const ld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.desc,
    image: [img],
    datePublished: "2026-01-01",
    author: { "@type": "Organization", name: "OlaViral" },
    publisher: { "@type": "Organization", name: "OlaViral" },
    mainEntityOfPage: url,
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(a.title)} | OlaViral</title>
<meta name="description" content="${esc(a.desc)}">
<meta name="keywords" content="${esc(a.tag)}, viral, tendencias, curiosidades, ${esc(a.title)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">

<meta property="og:type" content="article">
<meta property="og:title" content="${esc(a.title)}">
<meta property="og:description" content="${esc(a.desc)}">
<meta property="og:image" content="${img}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(a.title)}">
<meta name="twitter:description" content="${esc(a.desc)}">
<meta name="twitter:image" content="${img}">

<link rel="stylesheet" href="css/styles.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}" crossorigin="anonymous"></script>
<script type="application/ld+json">${ld}</script>
</head>
<body>

<header class="header">
  <div class="container header__inner">
    <a href="index.html" class="logo">Ola<span>Viral</span></a>
    <nav class="nav" id="nav">
      <a href="index.html" class="nav__link">Inicio</a>
      <a href="index.html#tendencias" class="nav__link">Tendencias</a>
      <a href="index.html#listas" class="nav__link">Listas</a>
      <a href="index.html#curiosidades" class="nav__link">Curiosidades</a>
    </nav>
    <div class="header__actions"><button class="burger" id="burger" aria-label="Menú"><span></span><span></span><span></span></button></div>
  </div>
</header>

<main class="container article">

  <div class="ad-slot ad-slot--top">
    <span class="ad-label">PUBLICIDAD</span>
    <ins class="adsbygoogle" style="display:block"
         data-ad-client="${ADS_CLIENT}" data-ad-slot="${SLOT_AUTO}"
         data-ad-format="auto" data-full-width-responsive="true"></ins>
  </div>

  <nav class="breadcrumb"><a href="index.html">Inicio</a> › ${esc(a.tag)} › <span>${esc(a.title)}</span></nav>

  <article>
    <span class="tag${a.hot ? " tag--hot" : ""}">${esc(a.tag)}</span>
    <h1>${esc(a.title)}</h1>
    <div class="meta">${esc(a.time)} · ${esc(a.read)} de lectura · Por OlaViral</div>

    <img class="article__hero" src="img/art${idx + 1}.jpg" alt="${esc(a.title)}" width="800" height="500">

    <div class="article__share">
      <span>Comparte:</span>
      <button class="btn btn--ghost" data-share="wa" data-t="${esc(a.title)}">WhatsApp</button>
      <button class="btn btn--ghost" data-share="x" data-t="${esc(a.title)}">X</button>
      <button class="btn btn--ghost" data-share="fb" data-t="${esc(a.title)}">Facebook</button>
      <button class="btn btn--ghost" data-share="cp" data-t="${esc(a.title)}">Copiar enlace</button>
    </div>

${body(a)}

    <div class="ad-slot">
      <span class="ad-label">PUBLICIDAD</span>
      <ins class="adsbygoogle"
           style="display:block; text-align:center;"
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="${ADS_CLIENT}"
           data-ad-slot="${SLOT_INARTICLE}"></ins>
    </div>
  </article>

  <section class="section">
    <div class="section__head"><h2>También te puede interesar</h2></div>
    <div class="grid">
${related(idx).map(relatedCard).join("\n")}
    </div>
  </section>

  <div class="ad-slot">
    <span class="ad-label">PUBLICIDAD</span>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-format="autorelaxed"
         data-ad-client="${ADS_CLIENT}"
         data-ad-slot="${SLOT_MATOME}"></ins>
  </div>

</main>

<footer class="footer">
  <div class="container footer__bottom">
    <span>© 2026 OlaViral. Todos los derechos reservados.</span>
  </div>
</footer>

<script src="data/articles.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;
}

let count = 0;
const urls = [];
ARTICLES.forEach((a, idx) => {
  const file = path.join(ROOT, slug(a.title) + ".html");
  fs.writeFileSync(file, page(a, idx), "utf8");
  urls.push({ loc: `${BASE}/${slug(a.title)}.html`, prio: "0.7", freq: "weekly" });
  count++;
});

/* sitemap.xml */
const staticPages = [
  { loc: `${BASE}/`, prio: "1.0", freq: "daily" },
  { loc: `${BASE}/linkinbio.html`, prio: "0.5", freq: "monthly" },
  { loc: `${BASE}/contacto.html`, prio: "0.6", freq: "monthly" },
  { loc: `${BASE}/aviso-legal.html`, prio: "0.3", freq: "yearly" },
  { loc: `${BASE}/privacidad.html`, prio: "0.3", freq: "yearly" },
  { loc: `${BASE}/cookies.html`, prio: "0.3", freq: "yearly" },
];
const all = staticPages.concat(urls);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  all.map((u) => `  <url><loc>${u.loc}</loc><changefreq>${u.freq}</changefreq><priority>${u.prio}</priority></url>`).join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");

console.log(`OK: ${count} paginas de articulo generadas + sitemap.xml (${all.length} URLs).`);
