/* ==========================================================================
   AURA Pro — animations.js
   Scroll reveal (IntersectionObserver), mouse parallax, button ripple
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Scroll Reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // Re-observe dynamically injected cards (features/specs) after a tick
  setTimeout(() => {
    document.querySelectorAll('.reveal-up:not(.in-view), .reveal-scale:not(.in-view)').forEach(el => {
      if (!el.classList.contains('in-view')) revealObserver.observe(el);
    });
  }, 50);

  /* ---------------- Mouse Parallax on Hero Image ---------------- */
  const parallaxImg = document.getElementById('parallaxImg');
  const heroVisual = document.querySelector('.hero-visual');
  if (parallaxImg && heroVisual && window.matchMedia('(min-width: 992px)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      parallaxImg.style.transform = `translate(${relX * 18}px, ${relY * 18}px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      parallaxImg.style.transform = 'translate(0, 0)';
    });
  }

  /* ---------------- Button Ripple Effect ---------------- */
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-el';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

});
