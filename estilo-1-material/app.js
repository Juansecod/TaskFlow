/**
 * TaskFlow — app.js
 * Lógica compartida entre las tres variantes de estilo.
 * No contiene ninguna referencia a estilos visuales.
 * Rama: base (se copia sin modificar a cada estilo)
 */

'use strict';

// ─── Estado de la aplicación ─────────────────────────────────────────────────
const state = {
  tasks: [],
  filter: 'todas',
};

// ─── Selectores ───────────────────────────────────────────────────────────────
const taskList        = document.getElementById('task-list');
const addTaskBtn      = document.getElementById('add-task-btn');
const newTaskInput    = document.getElementById('new-task-input');
const prioritySelect  = document.getElementById('priority-select');
const dateInput       = document.getElementById('date-input');
const completedCount  = document.getElementById('completed-count');
const totalCount      = document.getElementById('total-count');
const progressBar     = document.querySelector('.app-footer__progress-bar');
const progressEl      = document.querySelector('.app-footer__progress');
const filterChips     = document.querySelectorAll('.task-filters__chip');
const announcer       = document.getElementById('sr-announcer');

// ─── Inicialización ───────────────────────────────────────────────────────────
function init() {
  // Recoger tareas del HTML estático inicial
  document.querySelectorAll('.task-card').forEach(el => {
    const checkbox = el.querySelector('.task-card__checkbox');
    state.tasks.push({
      id:        el.dataset.taskId,
      completed: checkbox.checked,
      el,
    });
    checkbox.addEventListener('change', () => onCheckboxChange(el.dataset.taskId, checkbox.checked));
  });

  addTaskBtn.addEventListener('click', onAddTask);
  newTaskInput.addEventListener('keydown', e => { if (e.key === 'Enter') onAddTask(); });

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => onFilterChange(chip));
  });

  updateFooter();
}

// ─── Añadir tarea ─────────────────────────────────────────────────────────────
function onAddTask() {
  const title = newTaskInput.value.trim();
  if (!title) {
    newTaskInput.focus();
    newTaskInput.classList.add('task-form__input--error');
    setTimeout(() => newTaskInput.classList.remove('task-form__input--error'), 1200);
    return;
  }

  const priority = prioritySelect.value;
  const date     = dateInput.value;
  const id       = `task-${Date.now()}`;

  const li = document.createElement('li');
  li.className = `task-card task-card--priority-${priority}`;
  li.dataset.taskId = id;
  li.innerHTML = buildTaskHTML(id, title, priority, date);

  // Añadir con animación
  li.style.opacity = '0';
  li.style.transform = 'translateY(-8px)';
  taskList.prepend(li);

  requestAnimationFrame(() => {
    li.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    li.style.opacity = '1';
    li.style.transform = 'translateY(0)';
  });

  const checkbox = li.querySelector('.task-card__checkbox');
  checkbox.addEventListener('change', () => onCheckboxChange(id, checkbox.checked));

  state.tasks.unshift({ id, completed: false, el: li });

  newTaskInput.value = '';
  dateInput.value    = '';
  prioritySelect.selectedIndex = 1;
  newTaskInput.focus();

  announce(`Tarea "${title}" añadida`);
  updateFooter();
  applyFilter();
}

// ─── Toggle completada ────────────────────────────────────────────────────────
function onCheckboxChange(taskId, checked) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = checked;
  task.el.classList.toggle('task-card--completed', checked);

  const title = task.el.querySelector('.task-card__title').textContent;
  announce(checked ? `Tarea "${title}" completada` : `Tarea "${title}" marcada como pendiente`);

  updateFooter();
  applyFilter();
}

// ─── Filtros ──────────────────────────────────────────────────────────────────
function onFilterChange(chip) {
  filterChips.forEach(c => {
    c.classList.remove('task-filters__chip--active');
    c.setAttribute('aria-pressed', 'false');
  });
  chip.classList.add('task-filters__chip--active');
  chip.setAttribute('aria-pressed', 'true');

  const map = { 'Todas': 'todas', 'Pendientes': 'pendientes', 'Completadas': 'completadas' };
  state.filter = map[chip.textContent] || 'todas';
  applyFilter();
}

function applyFilter() {
  state.tasks.forEach(task => {
    let visible = true;
    if (state.filter === 'pendientes')   visible = !task.completed;
    if (state.filter === 'completadas')  visible =  task.completed;
    task.el.style.display = visible ? '' : 'none';
  });
}

// ─── Footer / Progreso ────────────────────────────────────────────────────────
function updateFooter() {
  const total     = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (completedCount) completedCount.textContent = completed;
  if (totalCount)     totalCount.textContent     = total;
  if (progressBar)    progressBar.style.width    = `${pct}%`;
  if (progressEl) {
    progressEl.setAttribute('aria-valuenow', pct);
    progressEl.setAttribute('aria-valuemax', 100);
  }
}

// ─── Builder HTML de tarea ────────────────────────────────────────────────────
function buildTaskHTML(id, title, priority, date) {
  const labelMap = { alta: 'Alta', media: 'Media', baja: 'Baja' };
  const dateStr  = date ? formatDate(date) : '';
  const dateEl   = date ? `<time class="task-card__date" datetime="${date}">${dateStr}</time>` : '';

  return `
    <article>
      <div class="task-card__left">
        <label class="task-card__checkbox-label" aria-label="Marcar como completada: ${title}">
          <input class="task-card__checkbox" type="checkbox" />
          <span class="task-card__checkbox-visual" aria-hidden="true"></span>
        </label>
      </div>
      <div class="task-card__body">
        <h3 class="task-card__title">${escapeHTML(title)}</h3>
        <div class="task-card__meta">
          <span class="task-card__badge task-card__badge--${priority}" aria-label="Prioridad ${labelMap[priority]}">${labelMap[priority]}</span>
          ${dateEl}
        </div>
      </div>
      <div class="task-card__right">
        <button class="task-card__menu-btn" type="button" aria-label="Opciones de la tarea" aria-haspopup="true">⋯</button>
      </div>
    </article>
  `;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]);
}

function announce(msg) {
  if (!announcer) return;
  announcer.textContent = '';
  requestAnimationFrame(() => { announcer.textContent = msg; });
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
