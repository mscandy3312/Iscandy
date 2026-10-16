/* ============ OlaViral - main.js ============ */
(function () {
  "use strict";

  /* ---------- 1. Base de datos de artículos ----------
     Añade aquí tus artículos. Cuantos más, más tráfico orgánico y anuncios. */
  const ARTICLES = [
    { title:"El reto que rompió internet esta semana y nadie sabe por qué", cat:"tendencia", tag:"Tendencia", hot:true, time:"Hace 2 h", read:"5 min", desc:"Más de 40 millones de reproducciones en 48 h.", color:"linear-gradient(135deg,#ff2d75,#ff9f1c)" },
    { title:"15 curiosidades que parecen falsas pero son ciertas", cat:"curiosidad", tag:"Curiosidades", time:"Hace 5 h", read:"6 min", desc:"Datos que te van a volar la cabeza.", color:"linear-gradient(135deg,#5b5bff,#00d4ff)" },
    { title:"Las 10 ciudades más baratas para vivir en 2026", cat:"lista", tag:"Listas", time:"Hace 8 h", read:"8 min", desc:"Con precios reales de alquiler y comida.", color:"linear-gradient(135deg,#11998e,#38ef7d)" },
    { title:"Por qué todo el mundo está dejando de dormir 8 horas", cat:"tendencia", tag:"Tendencia", hot:true, time:"Hace 12 h", read:"7 min", desc:"La ciencia tiene algo que decir al respecto.", color:"linear-gradient(135deg,#f7971e,#ffd200)" },
    { title:"Los 7 errores que casi todos cometen al usar el móvil", cat:"curiosidad", tag:"Curiosidades", time:"Hace 1 d", read:"5 min", desc:"El 90 % los comete a diario.", color:"linear-gradient(135deg,#8e2de2,#4a00e0)" },
    { title:"20 frases que todos entendemos y nadie sabe de dónde vienen", cat:"lista", tag:"Listas", time:"Hace 1 d", read:"9 min", desc:"Orígenes sorprendentes de dichos populares.", color:"linear-gradient(135deg,#00b09b,#96c93d)" },
    { title:"El animal que casi nadie ve y está por todas partes", cat:"curiosidad", tag:"Curiosidades", time:"Hace 2 d", read:"4 min", desc:"Vive a menos de 3 metros de ti.", color:"linear-gradient(135deg,#eb3349,#f45c43)" },
    { title:"Las 12 películas más esperadas de 2026 (y dónde verlas)", cat:"lista", tag:"Listas", time:"Hace 2 d", read:"10 min", desc:"Fechas, tráilers y dónde verlas online.", color:"linear-gradient(135deg,#2193b0,#6dd5ed)" },
    { title:"La historia viral de la abuela que aprendió a programar", cat:"tendencia", tag:"Tendencia", hot:true, time:"Hace 3 d", read:"6 min", desc:"Empezó a los 78 y hoy tiene su propia app.", color:"linear-gradient(135deg,#c31432,#240b36)" },
    { title:"7 trucos de ahorro que los ricos no quieren que sepas", cat:"lista", tag:"Listas", time:"Hace 3 d", read:"7 min", desc:"Sencillos, legales y funciona.", color:"linear-gradient(135deg,#134e5e,#71b280)" },
    { title:"Por qué el pan de antes sabía mejor (la razón real)", cat:"curiosidad", tag:"Curiosidades", time:"Hace 4 d", read:"5 min", desc:"No es nostalgia: es química.", color:"linear-gradient(135deg,#d38312,#a83279)" },
    { title:"El vídeo que hace llorar a medio TikTok esta semana", cat:"tendencia", tag:"Tendencia", hot:true, time:"Hace 4 d", read:"3 min", desc:"Y la reacción que nadie esperaba.", color:"linear-gradient(135deg,#fc4a1a,#f7b733)" },
    { title:"12 inventos que ya existen y parecen ciencia ficción", cat:"curiosidad", tag:"Curiosidades", time:"Hace 5 d", read:"7 min", desc:"Uno de ellos ya está en tu bolsillo.", color:"linear-gradient(135deg,#0f2027,#2c5364)" },
    { title:"Las 15 series que todo el mundo está viendo este mes", cat:"lista", tag:"Listas", time:"Hace 5 d", read:"9 min", desc:"Con dónde verlas y por qué engancha cada una.", color:"linear-gradient(135deg,#ee0979,#ff6a00)" },
    { title:"Por qué los gatos se quedan mirando a la nada (resuelto)", cat:"curiosidad", tag:"Curiosidades", time:"Hace 6 d", read:"4 min", desc:"La respuesta sorprendió a los propios veterinarios.", color:"linear-gradient(135deg,#355c7d,#c06c84)" },
    { title:"El truco de 30 segundos que se hizo viral en las cocinas", cat:"tendencia", tag:"Tendencia", hot:true, time:"Hace 6 d", read:"3 min", desc:"Funciona y casi nadie lo conocía.", color:"linear-gradient(135deg,#f12711,#f5af19)" },
    { title:"10 datos sobre el espacio que te dejarán sin palabras", cat:"lista", tag:"Listas", time:"Hace 1 sem", read:"8 min", desc:"Números que la mente no puede imaginar.", color:"linear-gradient(135deg,#141e30,#243b55)" },
    { title:"La razón real por la que olvidamos los nombres", cat:"curiosidad", tag:"Curiosidades", time:"Hace 1 sem", read:"5 min", desc:"No es falta de memoria.", color:"linear-gradient(135deg,#6a3093,#a044ff)" },
    { title:"El antes y después de las ciudades más famosas del mundo", cat:"lista", tag:"Listas", time:"Hace 1 sem", read:"6 min", desc:"Cómo cambiaron en solo 50 años.", color:"linear-gradient(135deg,#2c3e50,#4ca1af)" },
    { title:"El gesto viral que están copiando los famosos esta semana", cat:"tendencia", tag:"Tendencia", time:"Hace 1 sem", read:"3 min", desc:"Y por qué se está volviendo un movimiento.", color:"linear-gradient(135deg,#b92b27,#1565c0)" },
    { title:"8 mitos sobre el cerebro que la ciencia ya ha desmontado", cat:"curiosidad", tag:"Curiosidades", time:"Hace 2 sem", read:"7 min", desc:"Deja de creer en el 10% del cerebro.", color:"linear-gradient(135deg,#603813,#b29f94)" }
  ];

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
        <span class="tag">${esc(a.tag)}</span>
      </div>
      <div class="card__body">
        <h3><a href="article.html">${esc(a.title)}</a></h3>
        <p>${esc(a.desc)}</p>
        <div class="card__foot">
          <span>${esc(a.time)} · ${esc(a.read)}</span>
          <div class="share">
            <button data-share="wa" data-t="${esc(a.title)}" title="WhatsApp">W</button>
            <button data-share="x"  data-t="${esc(a.title)}" title="X">X</button>
            <button data-share="fb" data-t="${esc(a.title)}" title="Facebook">f</button>
            <button data-share="cp" data-t="${esc(a.title)}" title="Copiar enlace">⧉</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function rankHTML(a, i) {
    return `<article class="rank">
      <div class="rank__n">${i + 1}</div>
      <h3><a href="article.html">${esc(a.title)}</a></h3>
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
    const url = location.href.split("#")[0];
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
        ? hits.map(a => `<a href="article.html">${esc(a.title)}</a>`).join("")
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
