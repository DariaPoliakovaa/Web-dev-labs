const grid = document.getElementById('grid');
const btn = document.getElementById('editBtn');

let edit = false;
let dragged;

const placeholder = document.createElement('div');
placeholder.className = 'placeholder';

btn.onclick = () => {
  edit = !edit;

  document.body.classList.toggle('edit');
  btn.textContent = edit ? "Готово" : "Редагувати";

  document.querySelectorAll('.card')
    .forEach(c => c.draggable = edit);
};

grid.onclick = (e) => {
  if (edit && e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
};

grid.ondragstart = (e) => {
  if (!edit) return;

  dragged = e.target.closest('.card');
  dragged.classList.add('dragging');
};

grid.ondragend = () => {
  dragged.classList.remove('dragging');
  placeholder.remove();
};

grid.ondragover = (e) => {
  if (!edit) return;
  e.preventDefault();

  const after = getAfter(e.clientY);

  after
    ? grid.insertBefore(placeholder, after)
    : grid.appendChild(placeholder);
};

grid.ondrop = () => {
  grid.insertBefore(dragged, placeholder);
  placeholder.remove();
};

const getAfter = (y) => {
  return [...grid.querySelectorAll('.card:not(.dragging)')]
    .find(el => {
      const box = el.getBoundingClientRect();
      return y < box.top + box.height / 2;
    });
};