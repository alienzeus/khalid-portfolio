const nav = document.querySelector('.nav');
const bar = document.querySelector('.progress');
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  nav.classList.toggle('scrolled', scrollY > 10);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

document.querySelectorAll('.grid, .timeline, .edu').forEach(group => {
  [...group.children].forEach((el, i) => el.style.setProperty('--delay', `${i * 0.08}s`));
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
