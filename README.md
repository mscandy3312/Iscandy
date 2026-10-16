# OlaViral — Web viral monetizable

Sitio estático (HTML/CSS/JS, sin dependencias) pensado para ganar con **Google AdSense + afiliados (Amazon/Shopee)**. Contenido viral para tráfico por redes sociales.

## Archivos
```
viral-ola/
├── index.html        Portada: hero, tendencias, listas, curiosidades, newsletter
├── article.html      Plantilla de artículo (con anuncios en el contenido)
├── css/styles.css    Estilos responsive
├── js/main.js        Datos de artículos, filtros, búsqueda, compartir, cookies
├── robots.txt        SEO
├── sitemap.xml       SEO
└── img/              Imágenes (añade og-cover.jpg 1200x630)
```

## Puesta en marcha (5 minutos)
1. Abre `index.html` en el navegador para verlo.
2. Sube la carpeta a hosting gratuito: **Netlify**, **Cloudflare Pages** o **GitHub Pages**.
3. Compra/usa un dominio propio (mejora la aprobación de AdSense). Actualiza las URLs `https://ejemplo.com` en los `<link rel="canonical">`, OG, `robots.txt` y `sitemap.xml`.

## 1) Activar Google AdSense
1. Solicita cuenta en https://adsense.google.com (necesitas dominio propio y contenido original).
2. Sustituye **en todos los archivos** `ca-pub-0000000000000000` por tu ID real.
3. Sustituye los `data-ad-slot="1111..."` por los bloques que crees en AdSense.
4. El banner de cookies ya está implementado (obligatorio legalmente en la UE). Los anuncios se cargan solo tras aceptar cookies.

> Reglas clave para que te aprueben: contenido original, páginas legales (Privacidad, Cookies, Aviso legal, Contacto) y tráfico real. Crea esas 4 páginas antes de solicitar.

## 2) Activar afiliados
- **Amazon Associates**: https://afiliados.amazon.es → sustituye `TU_TAG-20` en `index.html` y `article.html`.
- **Shopee / AliExpress / Awin**: reemplaza los enlaces `.btn--deal`.
- Los enlaces ya llevan `rel="nofollow sponsored"` (buena práctica y obligatorio).

## 3) Añadir contenido (lo más importante)
Edita el array `ARTICLES` dentro de `js/main.js`. Cada artículo nuevo = más páginas indexables = más impresiones de anuncios. Para máximo ingreso, crea también su `.html` real por artículo (copia `article.html`).

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
