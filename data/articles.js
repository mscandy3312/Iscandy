/* ============ OlaViral - datos de artículos (fuente única) ============ */
(function () {
  "use strict";

  /* Añade aquí tus artículos: cuanto más contenido, más tráfico y anuncios. */
  var ARTICLES = [
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

  function slug(title) {
    return String(title)
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  if (typeof window !== "undefined") {
    window.OLAVIRAL_ARTICLES = ARTICLES;
    window.olaviralSlug = slug;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ARTICLES: ARTICLES, slug: slug };
  }
})();
