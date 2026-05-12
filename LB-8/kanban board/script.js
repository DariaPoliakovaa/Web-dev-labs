const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

let dragged;
const placeholder = document.createElement('div');
placeholder.className = 'placeholder';

cards.forEach(card => {
  card.ondragstart = () => {
    dragged = card;
    card.classList.add('dragging');
  };

  card.ondragend = () => {
    card.classList.remove('dragging');
    placeholder.remove();
  };
});

lists.forEach(list => {

  list.ondragover = (e) => {
    e.preventDefault();

    const after = getAfter(list, e.clientY);

    if (after) {
      list.insertBefore(placeholder, after);
    } else {
      list.appendChild(placeholder);
    }
  };

  list.ondrop = () => {
    list.insertBefore(dragged, placeholder);
    placeholder.remove();
  };
});

const getAfter = (container, y) => {
  return [...container.querySelectorAll('.card:not(.dragging)')]
    .find(el => {
      const box = el.getBoundingClientRect();
      return y < box.top + box.height / 2;
    });
};