const createSlider = ({
  images = [],
  duration = 500,
  autoplay = true,
  interval = 3000
}) => {

  const slider = document.getElementById('slider');
  const slides = slider.querySelector('.slides');
  const left = slider.querySelector('.left');
  const right = slider.querySelector('.right');
  const dotsWrap = slider.querySelector('.dots');

  let index = 0;
  let timer;

  slides.innerHTML = images
    .map(img => `<div class="slide"><img src="${img}"></div>`)
    .join('');

  slides.style.transition = `${duration}ms`;

  dotsWrap.innerHTML = images
    .map((_, i) => `<span class="dot" data-i="${i}"></span>`)
    .join('');

  const dots = slider.querySelectorAll('.dot');

  const update = () => {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index]?.classList.add('active');
  };

  const next = () => {
    index = (index + 1) % images.length;
    update();
  };

  const prev = () => {
    index = (index - 1 + images.length) % images.length;
    update();
  };

  right.onclick = next;
  left.onclick = prev;

  dots.forEach(dot => {
    dot.onclick = () => {
      index = +dot.dataset.i;
      update();
    };
  });

  document.onkeydown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  if (autoplay) {
    timer = setInterval(next, interval);

    slider.onmouseenter = () => clearInterval(timer);
    slider.onmouseleave = () => timer = setInterval(next, interval);
  }

  update();
};
createSlider({
  images: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1200"
  ]
});