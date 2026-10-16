/* ============ OlaViral - main.js ============ */
(function () {
  "use strict";

  /* ---------- 1. Base de datos de artículos ----------
     Los artículos viven en data/articles.js (fuente única). */
  const ARTICLES = window.OLAVIRAL_ARTICLES || [];
  const slug = window.olaviralSlug || (t => String(t).toLowerCase().replace(/\s+/g, "-"));

  const GRID_INITIAL = 6;
  const GRID_STEP = 3;
  let shown = GRID_INITIAL;

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

  /* ---------- 2. Render de tarjetas ---------- */
  function cardHTML(a, i) {
    return `<article class="card" data-cat="${a.cat}" data-i="${i}">
      <div class="card__img" style="background:${a.color}">
        <img src="img/art${i + 1}.jpg" alt="${esc(a.title)}" loading="lazy" width="800" height="500">
        <span class="tag">${esc(a.tag)}</span>
      </div>
      <div class="card__body">
        <h3><a href="${slug(a.title)}.html">${esc(a.title)}</a></h3>
        <p>${esc(a.desc)}</p>
        <div class="card__foot">
          <span>${esc(a.time)} · ${esc(a.read)}</span>
          <div class="share">
            <button data-share="wa" data-url="${slug(a.title)}.html" data-t="${esc(a.title)}" title="WhatsApp">W</button>
            <button data-share="x"  data-url="${slug(a.title)}.html" data-t="${esc(a.title)}" title="X">X</button>
            <button data-share="fb" data-url="${slug(a.title)}.html" data-t="${esc(a.title)}" title="Facebook">f</button>
            <button data-share="cp" data-url="${slug(a.title)}.html" data-t="${esc(a.title)}" title="Copiar enlace">⧉</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function rankHTML(a, i) {
    return `<article class="rank">
      <div class="rank__n">${i + 1}</div>
      <h3><a href="${slug(a.title)}.html">${esc(a.title)}</a></h3>
    </article>`;
  }

  function render() {
    const cats = { tendencia: [], curiosidad: [], lista: [] };
    ARTICLES.forEach((a, i) => cats[a.cat] && cats[a.cat].push({ a, i }));

    const t = $("#gridTrend");
    if (t) {
      const list = curFilter === "all" ? ARTICLES.map((a, i) => ({ a, i })) : categories();
      t.innerHTML = list.slice(0, shown).map((x, k) => cardHTML(x.a, x.i)).join("");
      const more = $("#loadMore");
      if (more) more.style.display = shown < list.length ? "" : "none";
    }

    const l = $("#gridList");
    if (l) l.innerHTML = cats.lista.slice(0, 6).map((x, k) => rankHTML(x.a, k)).join("");

    const c = $("#gridCurio");
    if (c) c.innerHTML = cats.curiosidad.map(x => cardHTML(x.a, x.i)).join("");
  }

  function categories() {
    return ARTICLES.map((a, i) => ({ a, i })).filter(x => x.a.cat === curFilter);
  }

  /* ---------- 3. Filtros ---------- */
  let curFilter = "all";
  $$(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      curFilter = btn.dataset.filter;
      shown = GRID_INITIAL;
      render();
    });
  });

  /* ---------- 4. Cargar más ---------- */
  const loadMore = $("#loadMore");
  if (loadMore) loadMore.addEventListener("click", () => { shown += GRID_STEP; render(); });

  /* ---------- 5. Compartir (clave para tráfico viral) ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-share]");
    if (!b) return;
    const url = b.dataset.url
      ? new URL(b.dataset.url, location.href).href
      : location.href.split("#")[0];
    const text = b.dataset.t || document.title;
    const links = {
      wa: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      x:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    if (b.dataset.share === "cp") {
      navigator.clipboard.writeText(url).then(() => toast("Enlace copiado ✅"));
      return;
    }
    window.open(links[b.dataset.share], "_blank", "noopener,width=600,height=500");
  });

  /* ---------- 6. Buscador ---------- */
  const searchBtn = $("#searchBtn"), searchbar = $("#searchbar"),
        searchInput = $("#searchInput"), searchResults = $("#searchResults");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      searchbar.classList.toggle("open");
      if (searchbar.classList.contains("open")) setTimeout(() => searchInput.focus(), 200);
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) { searchResults.innerHTML = ""; return; }
      const hits = ARTICLES.filter(a =>
        (a.title + " " + a.desc + " " + a.tag).toLowerCase().includes(q)
      ).slice(0, 6);
      searchResults.innerHTML = hits.length
        ? hits.map(a => `<a href="${slug(a.title)}.html">${esc(a.title)}</a>`).join("")
        : `<span class="empty">Sin resultados para "${esc(q)}"</span>`;
    });
  }

  /* ---------- 7. Menú móvil ---------- */
  const burger = $("#burger"), nav = $("#nav");
  if (burger) burger.addEventListener("click", () => nav.classList.toggle("open"));
  $$(".nav__link").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  /* ---------- 8. Newsletter (captura de leads) ---------- */
  const nlForm = $("#nlForm");
  if (nlForm) {
    nlForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#nlEmail").value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      $("#nlMsg").textContent = ok
        ? "¡Listo! Revisa tu correo para confirmar."
        : "Introduce un correo válido.";
      $("#nlMsg").style.color = ok ? "#38ef7d" : "#ff2d75";
      if (ok) {
        /* Aquí conecta Mailchimp / Brevo / Formspree:
           fetch("https://tu-endpoint", {method:"POST",body:JSON.stringify({email})}) */
        nlForm.reset();
      }
    });
  }

  /* ---------- 8b. Formulario de contacto ---------- */
  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const email = String(fd.get("email") || "").trim();
      const msg = $("#ctMsg");
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && fd.get("mensaje");
      msg.textContent = ok
        ? "¡Gracias! Te responderemos en 24–48 h."
        : "Revisa tu correo y el mensaje antes de enviar.";
      msg.style.color = ok ? "#38ef7d" : "#ff2d75";
      if (ok) {
        /* Conecta aquí Formspree / Getform / tu backend:
           fetch("https://formspree.io/f/TU_ID", {method:"POST",body:fd}) */
        contactForm.reset();
      }
    });
  }

  /* ---------- 9. Cookies (requerido por AdSense en la UE) ---------- */
  const cookie = $("#cookieBanner");
  if (cookie && !localStorage.getItem("cookies-ok")) {
    cookie.hidden = false;
    $("#cookieAccept").addEventListener("click", () => {
      localStorage.setItem("cookies-ok", "1");
      cookie.hidden = true;
      loadAdsense();
    });
    $("#cookieReject").addEventListener("click", () => {
      localStorage.setItem("cookies-ok", "0");
      cookie.hidden = true;
    });
  } else if (cookie) {
    if (localStorage.getItem("cookies-ok") === "1") loadAdsense();
  }

  /* ---------- 10. AdSense: inicializar bloques ---------- */
  function loadAdsense() {
    if (window.__adsLoaded) return;
    window.__adsLoaded = true;
    try {
      $$("ins.adsbygoogle").forEach(() => (window.adsbygoogle = window.adsbygoogle || []).push({}));
    } catch (e) { /* sin conexión / bloqueado */ }
  }
  loadAdsense();

  /* ---------- 11. Anuncio sticky ---------- */
  const sticky = $("#adSticky");
  if (sticky) {
    if (sessionStorage.getItem("sticky-closed")) sticky.classList.add("hidden");
    $("#closeSticky").addEventListener("click", () => {
      sticky.classList.add("hidden");
      sessionStorage.setItem("sticky-closed", "1");
    });
  }

  /* ---------- 12. Toast ---------- */
  let toastT;
  function toast(msg) {
    let el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    clearTimeout(toastT);
    toastT = setTimeout(() => el.remove(), 2200);
  }

  /* ---------- 13. Init ---------- */
  render();
})();
