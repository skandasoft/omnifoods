const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// make mobile navigation work
const header = document.querySelector('.header');

const btnNavEl = document.querySelector('.nav-btn');
btnNavEl.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});

// smooth scrolling

const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href === '#') {
      this.window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (href.startsWith('#')) {
      const sectionEle = document.querySelector(href);
      sectionEle.scrollIntoView({ behavior: 'smooth' });
    }
    // close mobile navigation
    if (link.classList.contains('main-nav-link')) {
      header.classList.remove('nav-open');
    }
  });
});

// Sticky navigation
const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting) {
      document.body.classList.remove('sticky');
      document
        .querySelectorAll('.main-nav-link')
        .forEach((link) => link.classList.remove('active'));
    } else {
      document.body.classList.add('sticky');
      document
        .querySelector('.main-nav-link[href*=how]')
        .classList.add('active');
    }
  },
  {
    root: null,
    threshold: 0.1,
  }
);
obs.observe(sectionHeroEl);
const highlightMenu = function (entries) {
  const ent = entries[0];
  if (ent.isIntersecting) {
    const hrefId = ent.target.getAttribute('id');
    console.log(hrefId);
    document.querySelectorAll('.main-nav-link').forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + hrefId) {
        link.classList.add('active');
      }
    });
  }
};

const sectionMealsEl = document.querySelector('.section-meals');
const sectionHowEl = document.querySelector('.section-how');
const sectionCtaEl = document.querySelector('.section-cta');
const sectionPriceEl = document.querySelector('.section-pricing');
const sectionTestimonialsEl = document.querySelector('.section-testimonials');
const watchViewPort = {
  root: null,
  threshold: 0.55,
};
const obs1 = new IntersectionObserver(highlightMenu, watchViewPort);

obs1.observe(sectionMealsEl);
obs1.observe(sectionHowEl);
obs1.observe(sectionCtaEl);
obs1.observe(sectionPriceEl);
obs1.observe(sectionTestimonialsEl);
