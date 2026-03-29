document.addEventListener("DOMContentLoaded", () => {

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 120);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Slider state
const sliderState = {};

function initSlider(id) {
    const wrap = document.getElementById(id);
    if (!wrap) return;

    const slides = wrap.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    const dotsEl = wrap.querySelector('.slide-dots');

    if (!slides || imgs.length === 0 || !dotsEl) return;

    sliderState[id] = { current: 0, total: imgs.length };

    // Clear dots (important if re-init)
    dotsEl.innerHTML = "";

    // Create dots
    imgs.forEach((_, i) => {
        const d = document.createElement('span');
        d.className = 'slide-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(id, i));
        dotsEl.appendChild(d);
    });

    // Auto-play (safe)
    setInterval(() => slide(id, 1), 3500);
}

function goTo(id, idx) {
    const wrap = document.getElementById(id);
    const state = sliderState[id];
    if (!wrap || !state) return;

    state.current = (idx + state.total) % state.total;

    wrap.querySelector('.slides').style.transform =
        `translateX(-${state.current * 100}%)`;

    wrap.querySelectorAll('.slide-dot').forEach((d, i) =>
        d.classList.toggle('active', i === state.current)
    );
}

function slide(id, dir) {
    const state = sliderState[id];
    if (!state) return;
    goTo(id, state.current + dir);
}

// Init sliders
initSlider('slider1');
initSlider('slider2');

// Expose for buttons
window.slide = slide;
});
