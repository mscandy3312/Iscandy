# OlaViral — Web viral monetizable

Sitio estático (HTML/CSS/JS, sin dependencias) pensado para ganar con **Google AdSense + afiliados (Amazon/Shopee)**. Contenido viral para tráfico por redes sociales.

## Archivos
```
viral-ola/
├── index.html          Portada: hero, tendencias, listas, curiosidades, newsletter
├── linkinbio.html      Página "link in bio" para TikTok/Instagram
├── <slug>.html         Un archivo por artículo (generados; SEO con URL propia)
├── article.html        Redirección (compatibilidad con enlaces antiguos)
├── privacidad.html · cookies.html · aviso-legal.html · contacto.html
├── css/styles.css      Estilos responsive
├── data/articles.js    ☑ FUENTE ÚNICA de los artículos
├── js/main.js          Filtros, búsqueda, compartir, cookies, formularios
├── tools/build.js      Genera las páginas de artículo + sitemap.xml
├── guiones-video.md    Plantillas de guiones para TikTok/Reels/Shorts
├── robots.txt · sitemap.xml
└── img/                Imágenes
```

## Añadir artículos (flujo)
1. Edita el array `ARTICLES` en **`data/articles.js`** (añade un objeto nuevo).
2. Añade su imagen como `img/artN.jpg` (N = posición del artículo empezando en 1).
3. Ejecuta `node tools/build.js` → genera el `.html` de cada artículo y actualiza `sitemap.xml`.
4. Revisa cambios y publica: `git add . && git commit -m "nuevo articulo" && git push`.

> El artículo aparece **automáticamente** en la portada (main.js lee `data/articles.js`).

## Puesta en marcha
1. Abre `index.html` en el navegador para verlo.
2. La web ya está en Vercel: **https://iscandy.vercel.app**

## 1) Activar Google AdSense (ya configurado)
- ID de editor: `ca-pub-5991751155826241` (en todas las páginas).
- Unidades: auto `4573000864`, in-article `1793785124`, matome `3128802116`.
- El banner de cookies carga los anuncios solo tras aceptar (requisito legal UE).
- Falta únicamente la **aprobación** del sitio por parte de Google.

## 2) Activar afiliados
- **Amazon Associates**: https://afiliados.amazon.es → sustituye `TU_TAG-20` en `index.html` y `article.html`.
- **Shopee / AliExpress / Awin**: reemplaza los enlaces `.btn--deal`.
- Los enlaces ya llevan `rel="nofollow sponsored"` (buena práctica y obligatorio).

## 3) Añadir contenido (lo más importante)
Ver la sección "Añadir artículos (flujo)" arriba: edita `data/articles.js` y ejecuta `node tools/build.js`.

## 4) Captar tráfico (donde está el dinero)
- Publica cada artículo en **TikTok, Reels, Shorts y X** con enlace a la web.
- Usa los botones de compartir (WhatsApp/X/Facebook) ya incluidos: el tráfico de WhatsApp es el más rentable para este formato.
- Conecta la newsletter a Mailchimp/Brevo/Formspree (mira el comentario en `main.js`, sección 8).

## Ingresos estimados (referencia)
| Tráfico mensual | Ingreso AdSense aprox.* |
|---|---|
| 10.000 visitas | 5 – 20 € |
| 100.000 visitas | 100 – 400 € |
| 500.000 visitas | 800 – 2.500 € |
+ comisiones de afiliados (5–10 % por venta).

\* Depende del país del público (CPC) y del nicho. El público de España/México rinde más que el de tráfico genérico.

## Legal mínimo antes de monetizar
- Página de **Política de Privacidad** (incluye Google/AdSense y cookies).
- **Política de Cookies** + consentimiento (ya implementado).
- **Aviso legal** y **Contacto**.
