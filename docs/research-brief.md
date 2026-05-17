# Research Brief — TaskFlow
## Una Idea. Tres Estilos. Un Producto.
### Trabajo Final — Diseño de Experiencias de Usuario

---

## 1. Nombre del producto

**TaskFlow** — Aplicación web de gestión de tareas personales y colaborativas.

---

## 2. Problema que resuelve

Los trabajadores del conocimiento (estudiantes universitarios, desarrolladores, diseñadores, freelancers) gestionan múltiples responsabilidades simultáneas en distintos contextos: académico, profesional y personal. La fragmentación de herramientas y la falta de un sistema visual claro generan carga cognitiva, pérdida de prioridades y bajo rendimiento. **TaskFlow** centraliza la gestión de tareas con una interfaz que reduce la fricción y maximiza el enfoque.

---

## 3. Audiencia objetivo

**Perfil primario:**
- Estudiantes universitarios de último semestre y profesionales jóvenes (22–32 años)
- Familiarizados con herramientas digitales (Notion, Trello, Linear, Jira)
- Usuarios de múltiples dispositivos: portátil, tablet y móvil
- Entornos de uso mixtos: oficinas abiertas, bibliotecas, espacios de trabajo remoto

**Características del usuario:**
- Alta alfabetización digital
- Busca eficiencia y claridad antes que novedad
- Sensible a la estética: valora interfaces que "se sienten bien"
- Frecuentemente trabaja en condiciones de baja iluminación (noche, oficinas sin ventanas)

---

## 4. Justificación de la aplicación

Una app de gestión de tareas es el candidato ideal para este ejercicio comparativo porque:

1. **Densidad de componentes**: requiere navegación lateral, tarjetas de tarea, formularios de creación, indicadores de estado y footer — los cuatro componentes mínimos exigidos.
2. **Interacciones ricas**: checkboxes, drag states, badges de prioridad, filtros — cada corriente los expresa de manera radicalmente diferente.
3. **Contexto de uso real**: los usuarios la abren decenas de veces al día, por lo que el rendimiento (FCP, TTI) y la accesibilidad tienen impacto directo y medible.
4. **Tensión estética vs. funcional**: permite demostrar cómo el estilo visual puede reforzar o sabotear la usabilidad según la corriente elegida.

---

## 5. Las tres corrientes elegidas y su justificación

### Corriente 1 — Material Design (Grupo Clásico)
**Justificación:** Material Design ofrece el sistema más maduro y documentado para aplicaciones de productividad. Su sistema de elevación (sombras z-index semánticas), componentes FAB, chips de filtro y paleta basada en roles (primary, secondary, surface) están diseñados específicamente para aplicaciones de gestión de información densa. Es la corriente de referencia del sector: Linear, Google Tasks y Asana la usan como base. Para la audiencia objetivo, Material Design es el lenguaje visual más reconocible y de menor curva de aprendizaje.

**Hipótesis de rendimiento:** Puntuación de accesibilidad más alta del grupo. CSS más ligero por apoyarse en convenciones establecidas. TTI potencialmente mayor si se cargan fuentes Material Symbols.

### Corriente 2 — Neumorfismo / Soft UI (Grupo Contemporáneo)
**Justificación:** El neumorfismo es la corriente más polarizante del diseño contemporáneo. Su mecanismo central (sombra doble extruida del fondo) crea una profundidad hipnótica que ninguna otra corriente replica. Para una app de tareas, la metáfora física de "botones que se pueden presionar" tiene una coherencia conceptual poderosa. Sin embargo, es también la corriente con mayores riesgos de accesibilidad (contraste bajo, estados difíciles de distinguir). Incluirla permite documentar con datos reales la brecha entre atractivo visual y usabilidad, uno de los aprendizajes más valiosos del curso.

**Hipótesis de rendimiento:** Puntuación de accesibilidad más baja. CSS más pesado (múltiples box-shadows en cada componente). Contraste mínimo por debajo del umbral WCAG AA en zonas decorativas.

### Corriente 3 — Dark Mode Adaptativo (Grupo Experimental)
**Justificación:** Más que un estilo visual, el Dark Mode Adaptativo es un sistema de diseño dual. La corriente obliga a pensar en dos paletas coherentes simultáneamente, calibrar contraste para fondos oscuros (donde el estándar WCAG es más exigente) y usar `prefers-color-scheme` como señal de contexto del usuario. Para la audiencia objetivo — desarrolladores y estudiantes que trabajan frecuentemente de noche — esta corriente no es experimental en términos de uso: es la preferencia mayoritaria. Lo experimental está en el nivel de sofisticación del sistema: tokens duales, transiciones entre modos, paletas HSL calibradas y respeto a `prefers-reduced-motion`.

**Hipótesis de rendimiento:** Rendimiento técnico más alto del grupo (sin texturas, sin sombras complejas, solo tokens). Accesibilidad competitiva con Material. CSS moderado.

---

## 6. Componentes que se implementan en cada versión

| Componente | Descripción |
|---|---|
| **Navegación lateral** | Sidebar con secciones (Hoy, Esta semana, Proyectos, Etiquetas) |
| **Header / Top bar** | Título de vista activa + buscador + avatar de usuario |
| **Tarjetas de tarea** | Estado (checkbox), título, prioridad (badge), fecha límite, etiqueta |
| **Formulario de creación** | Input de título, selector de prioridad, selector de fecha, botón de acción |
| **Footer** | Contador de tareas completadas + enlace a configuración |

---

## 7. Arquitectura técnica compartida

- **HTML semántico** (nav, main, section, article, form, footer) según MDN Semantics
- **Metodología BEM** para nomenclatura de clases
- **CSS Custom Properties** como sistema de tokens (nivel W3C)
- **Responsive** con breakpoints: 320px / 768px / 1200px
- **Una rama Git por estilo** (`base`, `estilo-1-material`, `estilo-2-neumorfismo`, `estilo-3-darkmode`)
- **Sin frameworks JavaScript**: vanilla JS para interacciones básicas (toggle completed, add task)

---

## 8. Métricas a medir (Lighthouse + WebPageTest)

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)
- Performance Score / Accessibility Score / Best Practices Score
- Líneas de CSS por variante
- Peso del CSS en KB
- Peso total de la página en KB
- Contraste mínimo (ratio WCAG)

---

## 9. Referencias clave del brief

| Recurso | URL |
|---|---|
| Material Design 3 | https://m3.material.io/ |
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ |
| prefers-color-scheme MDN | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme |
| CSS-Tricks Neumorphism | https://css-tricks.com/neumorphism-and-css/ |
| Atomic Design | https://atomicdesign.bradfrost.com/ |
| BEM | https://getbem.com/ |
| Core Web Vitals | https://web.dev/articles/vitals |

---

*Trabajo Final — Diseño de Experiencias de Usuario*
*Aplicación: TaskFlow | Corrientes: Material Design · Neumorfismo · Dark Mode Adaptativo*
