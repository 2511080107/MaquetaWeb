// Archivo — JS vanilla modo oscuro. Datos guiados por FrontEnd/CSS3.html
const proyectos = [
  {
    id: "p01",
    num: "01",
    titulo: "Landing Corporativa",
    tipo: "interfaz",
    stack: "HTML · CSS · Grid",
    desc: "Maquetación fiel a tu contenedor .contenedor-proyectos con Grid de 3 columnas y cards con imagen 250×150.",
    meta: ["Grid", "Responsive", "Semántica"],
    img: "img/proyecto-preview.png",
    link: "../FrontEnd/CSS3.html#Proyectos"
  },
  {
    id: "p02",
    num: "02",
    titulo: "Galería de Proyectos",
    tipo: "interfaz",
    stack: "HTML · CSS · Flexbox",
    desc: "Reutiliza la estructura de 6 cajas de FrontEnd/CSS3.html. Preview con img/Sin título.png → img/proyecto-preview.png.",
    meta: ["Cards", "Hover", "Bordes 25px"],
    img: "img/proyecto-preview.png",
    link: "../FrontEnd/CSS3.html#Proyectos"
  },
  {
    id: "p03",
    num: "03",
    titulo: "Formulario de Contacto",
    tipo: "logica",
    stack: "HTML · CSS · JS",
    desc: "Adaptación de tu form #Contacto (Empresa/Correo/Número). Ahora con validación real y guardado en localStorage.",
    meta: ["Validación", "localStorage", "A11y"],
    img: "img/proyecto-preview.png",
    link: "../FrontEnd/CSS3.html#Contacto"
  },
  {
    id: "p04",
    num: "04",
    titulo: "Navegación Principal",
    tipo: "interfaz",
    stack: "HTML · CSS",
    desc: "Basado en tu nav con .nav-principal y .2do-nav. Versión oscura con bordes y sticky.",
    meta: ["Nav", "Sticky", "Responsive"],
    img: "img/proyecto-preview.png",
    link: "../FrontEnd/CSS3.html"
  },
  {
    id: "p05",
    num: "05",
    titulo: "Header con Foto",
    tipo: "producto",
    stack: "HTML · CSS · JS",
    desc: "Tu header con h1 + img circular 200×200. Aquí con espacio reservado para foto 92×92 y fallback.",
    meta: ["Foto", "Placeholder", "Bordes"],
    img: "img/proyecto-preview.png",
    link: "../FrontEnd/html5.html"
  },
  {
    id: "p06",
    num: "06",
    titulo: "Footer con Redes",
    tipo: "producto",
    stack: "HTML · CSS",
    desc: "Inspirado en tu footer con 3 columnas y .iconos (linkedin.svg / GitHub_dark.svg / instagram-icon.svg).",
    meta: ["Footer", "Iconos", "Grid 3col"],
    img: "img/proyecto-preview.png",
    link: "../FrontEnd/CSS3.html"
  }
];

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

const FAV_KEY = "archivo_favs_dark";
const MSG_KEY = "archivo_mensajes_dark";

function loadJSON(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

let filtro = "all";
let query = "";
let favs = loadJSON(FAV_KEY, []);
let mensajes = loadJSON(MSG_KEY, []);

const listEl = $("#project-list");
const emptyEl = $("#empty-msg");
const qEl = $("#q");

function isFav(id){ return favs.includes(id); }

function renderList(){
  const q = query.trim().toLowerCase();
  const filtered = proyectos.filter(p => {
    const byType = filtro === "all" || p.tipo === filtro;
    const byQ = !q || (p.titulo.toLowerCase().includes(q) || p.stack.toLowerCase().includes(q));
    return byType && byQ;
  });

  listEl.innerHTML = "";
  if(filtered.length === 0){
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.tabIndex = 0;
    card.setAttribute("role", "listitem");
    card.dataset.id = p.id;
    card.innerHTML = `
      <img class="card-img" src="${p.img}" alt="Preview ${p.titulo}" loading="lazy" onerror="this.style.background='var(--surface-2)'">
      <div class="card-body">
        <h3 class="card-title">${p.num} — ${p.titulo}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-foot">
          <span class="badge">${p.tipo}</span>
          <button class="fav-btn ${isFav(p.id) ? "is-fav" : ""}" data-fav="${p.id}" aria-label="Favorito">${isFav(p.id) ? "★" : "☆"}</button>
        </div>
        <span class="mono" style="color:var(--muted);font-size:10px">${p.stack}</span>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if(e.target.closest("[data-fav]")) return;
      openDialog(p.id);
    });
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter") openDialog(p.id);
    });
    listEl.appendChild(card);
  });

  $$("[data-fav]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFav(btn.dataset.fav);
    });
  });
}

function toggleFav(id){
  favs = isFav(id) ? favs.filter(f => f !== id) : [...favs, id];
  saveJSON(FAV_KEY, favs);
  renderList();
  // actualizar modal si está abierto
  if(dialogCurrent && dialogCurrent.id === id){
    dialogFav.textContent = isFav(id) ? "★ Guardado" : "☆ Guardar favorito";
    dialogFav.className = isFav(id) ? "btn btn-primary btn-small" : "btn btn-ghost btn-small";
  }
  toast(isFav(id) ? "Añadido a favoritos" : "Quitado de favoritos");
}

// Filtros
$$(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    filtro = btn.dataset.filter;
    renderList();
  });
});

// Búsqueda
qEl.addEventListener("input", () => {
  query = qEl.value;
  renderList();
});

// Modal
const dialog = $("#project-dialog");
const dialogTitle = $("#dialog-title");
const dialogDesc = $("#dialog-desc");
const dialogMeta = $("#dialog-meta");
const dialogLink = $("#dialog-link");
const dialogFav = $("#dialog-fav");
const dialogImg = $("#dialog-img");
let dialogCurrent = null;

function openDialog(id){
  const p = proyectos.find(x => x.id === id);
  if(!p) return;
  dialogCurrent = p;
  dialogTitle.textContent = `${p.num} — ${p.titulo}`;
  dialogDesc.textContent = p.desc;
  dialogImg.src = p.img;
  dialogImg.style.display = "block";
  dialogImg.alt = `Preview ${p.titulo}`;
  dialogMeta.innerHTML = p.meta.map(m => `<li class="badge">${m}</li>`).join("") + `<li class="badge" style="background:var(--oxide);color:#fff;border-color:var(--oxide)">${p.stack}</li>`;
  dialogLink.href = p.link;
  dialogFav.textContent = isFav(p.id) ? "★ Guardado" : "☆ Guardar favorito";
  dialogFav.className = isFav(p.id) ? "btn btn-primary btn-small" : "btn btn-ghost btn-small";
  dialog.showModal();
}
dialogFav.addEventListener("click", () => {
  if(!dialogCurrent) return;
  toggleFav(dialogCurrent.id);
});

// Form contacto
const form = $("#contact-form");
const statusEl = $("#form-status");
const inboxList = $("#inbox-list");
const inboxCount = $("#inbox-count");

function validate(){
  let ok = true;
  const nombre = $("#nombre");
  const email = $("#email");
  const mensaje = $("#mensaje");
  $$(".field").forEach(f => f.classList.remove("is-error"));
  $$(".field-error").forEach(e => e.textContent = "");
  if(nombre.value.trim().length < 3){
    setError("nombre", "Mínimo 3 caracteres");
    ok = false;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
    setError("email", "Correo no válido");
    ok = false;
  }
  if(mensaje.value.trim().length < 15){
    setError("mensaje", "Mínimo 15 caracteres");
    ok = false;
  }
  return ok;
}
function setError(name, msg){
  const field = $(`#${name}`).closest(".field");
  field.classList.add("is-error");
  $(`[data-error-for="${name}"]`).textContent = msg;
}
function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function renderInbox(){
  inboxList.innerHTML = "";
  if(mensajes.length === 0){
    inboxList.innerHTML = `<li class="mono" style="color:var(--muted)">Sin mensajes aún.</li>`;
  } else {
    mensajes.slice().reverse().forEach(m => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${escapeHtml(m.nombre)}</strong> — ${escapeHtml(m.email)}<br><span>${escapeHtml(m.mensaje)}</span><br><small>${m.fecha}</small>`;
      inboxList.appendChild(li);
    });
  }
  inboxCount.textContent = mensajes.length;
  const mc = $("#msg-count");
  if(mc) mc.textContent = mensajes.length;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!validate()){
    statusEl.textContent = "Corrige los errores.";
    statusEl.className = "mono form-status err";
    return;
  }
  const data = {
    nombre: $("#nombre").value.trim(),
    email: $("#email").value.trim(),
    mensaje: $("#mensaje").value.trim(),
    fecha: new Date().toLocaleString("es-PE")
  };
  mensajes.push(data);
  saveJSON(MSG_KEY, mensajes);
  renderInbox();
  form.reset();
  statusEl.textContent = "Mensaje guardado localmente ✓";
  statusEl.className = "mono form-status ok";
  toast("Mensaje guardado");
});
$("#clear-inbox").addEventListener("click", () => {
  if(!mensajes.length) return;
  if(confirm("¿Borrar todos los mensajes guardados?")){
    mensajes = [];
    saveJSON(MSG_KEY, mensajes);
    renderInbox();
    statusEl.textContent = "Bandeja vaciada.";
    statusEl.className = "mono form-status";
    toast("Bandeja vaciada");
  }
});

// Header responsive
const menuBtn = $("#menu-btn");
const mobileNav = $("#mobile-nav");
menuBtn.addEventListener("click", () => {
  const open = mobileNav.hidden === false;
  mobileNav.hidden = open;
  menuBtn.setAttribute("aria-expanded", String(!open));
  menuBtn.textContent = open ? "Menú" : "Cerrar";
});
$$("#mobile-nav a").forEach(a => a.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuBtn.textContent = "Menú";
}));

// Toast
const toastEl = $("#toast");
let toastTimer;
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

// Init
$("#year").textContent = new Date().getFullYear();
const lu = $("#last-update");
if(lu) lu.textContent = new Date().toLocaleDateString("es-PE", { day:"2-digit", month:"short", year:"numeric" });
renderList();
renderInbox();
