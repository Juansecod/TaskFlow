# TaskFlow ✦
### Una Idea. Tres Estilos. Un Producto.
**Trabajo Final — Diseño de Experiencias de Usuario**

App de gestión de tareas implementada tres veces bajo corrientes de diseño distintas, compartiendo la misma arquitectura HTML semántica + BEM + CSS Custom Properties.

---

## Estructura del repositorio

```
taskflow/
├── base/                        # Rama base — HTML + JS compartidos
│   ├── index.html               # HTML semántico (sin estilos)
│   └── app.js                   # Lógica vanilla JS compartida
│
├── estilo-1-material/           # Rama: Material Design 3 (Clásico)
│   ├── index.html               # = base/index.html
│   ├── tokens.css               # Design tokens MD3
│   ├── base.css                 # Estilos implementando los tokens
│   └── app.js                   # = base/app.js
│
├── estilo-2-neumorfismo/        # Rama: Neumorfismo / Soft UI (Contemporáneo)
│   ├── index.html               # = base/index.html
│   ├── tokens.css               # Design tokens Soft UI
│   ├── base.css                 # Estilos neumórficos
│   └── app.js                   # = base/app.js
│
├── estilo-3-darkmode/           # Rama: Dark Mode Adaptativo (Experimental)
│   ├── index.html               # base + botón toggle tema
│   ├── tokens.css               # Tokens duales (claro/oscuro)
│   ├── base.css                 # Estilos con transición de tema
│   └── app.js                   # base + lógica de toggle/persistencia
│
└── docs/
    ├── research-brief.md        # Brief completo del proyecto
    └── informe-comparativo.md   # Análisis técnico y crítico
```

---

## Corrientes implementadas

| # | Corriente | Grupo | Fuente | Característica clave |
|---|---|---|---|---|
| 1 | Material Design 3 | Clásico | [m3.material.io](https://m3.material.io/) | Elevación semántica + paleta tonal |
| 2 | Neumorfismo / Soft UI | Contemporáneo | [css-tricks.com](https://css-tricks.com/neumorphism-and-css/) | Doble sombra extruida del fondo |
| 3 | Dark Mode Adaptativo | Experimental | [MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) | Tokens duales calibrados en HSL |

---

## Componentes implementados

Cada versión incluye los mismos cuatro componentes mínimos requeridos:

- **Navegación lateral** — sidebar con secciones, badges de conteo, lista de proyectos
- **Header / Top bar** — título de vista, fecha, buscador, avatar de usuario
- **Tarjetas de tarea** — checkbox personalizado, badge de prioridad, fecha límite, menú contextual
- **Formulario de creación** — input de título, selector de prioridad, selector de fecha, botón de acción
- **Footer** — contador de progreso con barra visual, navegación secundaria

---

## Arquitectura técnica

### Principio de separación

El mismo `index.html` y `app.js` funcionan en los tres estilos. La diferencia visual vive **exclusivamente** en `tokens.css` + `base.css`. Esto demuestra que el diseño es una capa de decisión separada de la estructura y la lógica.

```
HTML semántico + BEM          →  estructura invariante
app.js (vanilla JS)           →  lógica invariante
tokens.css (custom properties) →  valores visuales por variante
base.css                       →  estilos usando esos valores
```

### Metodología BEM — Ejemplos

```css
/* Bloque */
.task-card { }

/* Elemento */
.task-card__title { }
.task-card__badge { }
.task-card__checkbox-visual { }

/* Modificador */
.task-card--priority-alta { }
.task-card--completed { }
.task-filters__chip--active { }
```

### CSS Custom Properties — Estructura de tokens

```css
/* tokens.css — cada variante define sus propios valores */
:root {
  --color-bg:             /* fondo principal */
  --color-surface:        /* superficie de tarjetas */
  --color-primary:        /* color de acción principal */
  --color-text:           /* texto principal */
  --color-text-secondary: /* texto secundario */
  --shadow-card:          /* sombra de tarjetas en reposo */
  --shadow-raised:        /* sombra de tarjetas en hover */
  --radius-sm / md / lg:  /* radios de borde */
  --font-display:         /* fuente de títulos */
  --font-body:            /* fuente de cuerpo */
}
```

### Breakpoints responsive

```css
/* Mobile first — tres breakpoints */
@media (max-width: 768px) { /* tablet → sidebar colapsado */ }
@media (max-width: 480px) { /* móvil → búsqueda oculta, padding reducido */ }
```

---

## Accesibilidad

- HTML semántico: `nav`, `main`, `header`, `footer`, `article`, `section`, `time`
- Todos los inputs con `<label>` asociado (visible o `.sr-only`)
- `aria-label` en botones sin texto visible
- `aria-current="page"` en ítem activo del sidebar
- `role="progressbar"` con `aria-valuenow/min/max` en barra de progreso
- `role="list"` en listas dinámicas
- `aria-live="polite"` en anunciador de acciones para lectores de pantalla
- `:focus-visible` con outline de 2–3px en todos los elementos interactivos
- `prefers-reduced-motion` respetado en Estilo 3 (desactiva todas las transiciones)
- Contraste WCAG 2.2 AA verificado: Estilos 1 y 3 ✅ | Estilo 2 ⚠️ (documentado)

---

## Cómo ejecutar

### Opción 1 — Servidor local (recomendado para métricas reales)

```bash
# Con Python
cd taskflow/estilo-1-material
python3 -m http.server 3001

cd taskflow/estilo-2-neumorfismo
python3 -m http.server 3002

cd taskflow/estilo-3-darkmode
python3 -m http.server 3003
```

Luego abrir:
- `http://localhost:3001` → Material Design
- `http://localhost:3002` → Neumorfismo
- `http://localhost:3003` → Dark Mode

### Opción 2 — VS Code Live Server

Instalar la extensión **Live Server** y hacer click derecho → *Open with Live Server* en cada `index.html`.

### Opción 3 — Deploy en GitHub Pages / Vercel

```bash
# Subir el repositorio a GitHub
git init
git add .
git commit -m "feat: TaskFlow — three design systems"
git remote add origin https://github.com/usuario/taskflow.git
git push -u origin main
```

Para medición con Lighthouse: usar la URL de producción (no localhost), ya que las métricas de red son parte del score de Performance.

---

## Medir métricas con Lighthouse

1. Abrir Chrome → DevTools (`F12`)
2. Ir a la pestaña **Lighthouse**
3. Seleccionar: ☑ Performance, ☑ Accessibility, ☑ Best Practices
4. Device: Desktop
5. Click **Analyze page load**
6. Registrar: FCP, LCP, CLS, TTI, scores de Performance y Accessibility
7. Repetir para cada variante desplegada en producción

Para **peso de CSS**:
- DevTools → Network → filtrar por CSS
- Ver columna "Size" (transferido) y "Content" (sin comprimir)

Para **líneas de CSS**:
```bash
wc -l estilo-1-material/base.css estilo-1-material/tokens.css
wc -l estilo-2-neumorfismo/base.css estilo-2-neumorfismo/tokens.css
wc -l estilo-3-darkmode/base.css estilo-3-darkmode/tokens.css
```

Para **contraste**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Ingresar: color de primer plano (texto) y color de fondo del componente

---

## Estrategia de ramas Git

```
main (base)
├── estilo-1-material        # git checkout -b estilo-1-material
├── estilo-2-neumorfismo     # git checkout -b estilo-2-neumorfismo
└── estilo-3-darkmode        # git checkout -b estilo-3-darkmode
```

Cada rama parte de `main` con la misma arquitectura base. Las diferencias visuales son el único delta entre ramas.

---

## Referencias técnicas

| Estándar / Recurso | URL |
|---|---|
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ |
| CSS Custom Properties W3C | https://www.w3.org/TR/css-custom-properties-1/ |
| Material Design 3 | https://m3.material.io/ |
| prefers-color-scheme MDN | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme |
| prefers-reduced-motion MDN | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |
| Neumorphism — CSS-Tricks | https://css-tricks.com/neumorphism-and-css/ |
| BEM | https://getbem.com/ |
| Atomic Design | https://atomicdesign.bradfrost.com/ |
| Core Web Vitals | https://web.dev/articles/vitals |
| Lighthouse | https://developer.chrome.com/docs/lighthouse/ |
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Heurísticas Nielsen | https://www.nngroup.com/articles/ten-usability-heuristics/ |

---

*Trabajo Final — Diseño de Experiencias de Usuario*
*TaskFlow | Material Design · Neumorfismo · Dark Mode Adaptativo*
