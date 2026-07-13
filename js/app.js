/* ==========================================================================
   AURA Pro — app.js
   General site interactions: navbar, data injection, gallery, swatches,
   quantity selectors, counters, countdown, newsletter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader ---------------- */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => preloader.classList.add('hide'), 350);
  });

  /* ---------------- Sticky Navbar ---------------- */
  const navbar = document.getElementById('mainNavbar');
  const onScrollNav = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav);

  // Close mobile menu after clicking a link
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------------- Scroll To Top ---------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- Feature Cards Data ---------------- */
  const features = [
    { icon: 'bi-soundwave', title: 'Active Noise Cancellation', desc: 'Adaptive ANC blocks ambient noise so you stay immersed in your sound.' },
    { icon: 'bi-bluetooth', title: 'Bluetooth 5.4', desc: 'Fast, stable pairing with lower latency across all your devices.' },
    { icon: 'bi-battery-charging', title: '50 Hours Battery', desc: 'A full week of daily listening on a single charge.' },
    { icon: 'bi-lightning-charge', title: 'Fast Charging', desc: '10 minutes of charging gives you up to 5 hours of playback.' },
    { icon: 'bi-vinyl', title: 'Deep Bass', desc: '40mm dynamic drivers tuned for rich, punchy low-end response.' },
    { icon: 'bi-badge-hd', title: 'Hi-Res Audio', desc: 'Studio-grade clarity certified for high-resolution playback.' },
    { icon: 'bi-hand-index-thumb', title: 'Touch Controls', desc: 'Intuitive gestures for calls, tracks, and volume — no app needed.' },
    { icon: 'bi-mic', title: 'Voice Assistant', desc: 'Built-in mic array for hands-free access to your assistant.' },
    { icon: 'bi-droplet-half', title: 'Water Resistant', desc: 'IPX4-rated to handle sweat, drizzle, and everyday spills.' },
    { icon: 'bi-arrows-angle-contract', title: 'Foldable Design', desc: 'Collapses flat into the included case for easy travel.' },
  ];
  const featuresGrid = document.getElementById('featuresGrid');
  features.forEach((f, i) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="feature-card reveal-up" style="--d:${(i % 3) * 0.08}s">
        <div class="feature-icon"><i class="bi ${f.icon}"></i></div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>`;
    featuresGrid.appendChild(col);
  });

  /* ---------------- Specifications Data ---------------- */
  const specs = [
    { label: 'Brand', value: 'AURA' },
    { label: 'Model', value: 'Pro 2nd Gen' },
    { label: 'Bluetooth Version', value: '5.4' },
    { label: 'Battery Life', value: '50 Hours' },
    { label: 'Charging Time', value: '1.5 Hours' },
    { label: 'Driver Size', value: '40mm' },
    { label: 'Frequency Response', value: '20Hz – 20kHz' },
    { label: 'Weight', value: '254g' },
    { label: 'Microphone', value: 'Dual Beamforming' },
    { label: 'Warranty', value: '1 Year' },
  ];
  const specsGrid = document.getElementById('specsGrid');
  specs.forEach((s, i) => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="spec-card reveal-up" style="--d:${(i % 4) * 0.06}s">
        <span class="spec-label">${s.label}</span>
        <span class="spec-value">${s.value}</span>
      </div>`;
    specsGrid.appendChild(col);
  });

  /* ---------------- Reviews Data ---------------- */
  const reviews = [
    { name: 'Ayesha Khan', initials: 'AK', rating: 5, text: 'The noise cancellation is unreal for daily commuting. Battery genuinely lasts the whole week.' },
    { name: 'Bilal Ahmed', initials: 'BA', rating: 5, text: 'Bass is deep without drowning the vocals. Comfortable even after 4+ hour sessions.' },
    { name: 'Sara Malik', initials: 'SM', rating: 4, text: 'Great sound and build quality. Wish the case was a bit slimmer, but no complaints on audio.' },
    { name: 'Hamza Tariq', initials: 'HT', rating: 5, text: 'Ordered through WhatsApp checkout, super smooth process and delivery was quick.' },
    { name: 'Fatima Noor', initials: 'FN', rating: 5, text: 'Touch controls are responsive and the foldable design fits perfectly in my bag.' },
    { name: 'Usman Raza', initials: 'UR', rating: 4, text: 'Excellent value for the price. Voice assistant integration works flawlessly.' },
  ];
  const reviewTrack = document.getElementById('reviewTrack');
  const renderReviews = (list) => list.map(r => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${r.initials}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-stars">${'<i class="bi bi-star-fill"></i>'.repeat(r.rating)}${'<i class="bi bi-star"></i>'.repeat(5 - r.rating)}</div>
        </div>
      </div>
      <p class="review-text">"${r.text}"</p>
    </div>`).join('');
  // duplicate list for seamless infinite scroll
  reviewTrack.innerHTML = renderReviews(reviews) + renderReviews(reviews);

  /* ---------------- Color Swatches (Hero) ---------------- */
  const swatches = document.querySelectorAll('#colorSwatches .swatch');
  const selectedColorLabel = document.querySelector('.selected-color-label');
  const checkoutColorSelect = document.getElementById('checkoutColor');
  swatches.forEach(sw => {
    sw.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      const color = sw.dataset.color;
      selectedColorLabel.textContent = color;
      if (checkoutColorSelect) checkoutColorSelect.value = color;
      document.dispatchEvent(new CustomEvent('aura:colorChange', { detail: color }));
    });
  });
  if (checkoutColorSelect) {
    checkoutColorSelect.addEventListener('change', () => {
      document.dispatchEvent(new CustomEvent('aura:colorChange', { detail: checkoutColorSelect.value }));
    });
  }

  /* ---------------- Quantity Selectors ---------------- */
  document.querySelectorAll('.qty-selector').forEach(group => {
    const valueEl = group.querySelector('[data-qty-value]');
    let qty = parseInt(valueEl.textContent, 10) || 1;
    group.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.action === 'inc') qty = Math.min(qty + 1, 10);
        else qty = Math.max(qty - 1, 1);
        valueEl.textContent = qty;
        document.dispatchEvent(new CustomEvent('aura:qtyChange', { detail: { group: group.dataset.qtyGroup, qty } }));
      });
    });
  });

  /* ---------------- Add to Cart feedback ---------------- */
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const original = addToCartBtn.innerHTML;
      addToCartBtn.innerHTML = '<i class="bi bi-check2"></i> Added!';
      addToCartBtn.disabled = true;
      setTimeout(() => {
        addToCartBtn.innerHTML = original;
        addToCartBtn.disabled = false;
      }, 1600);
    });
  }

  /* ---------------- Gallery ---------------- */
  const galleryMainImg = document.getElementById('galleryMainImg');
  const galleryCaption = document.getElementById('galleryCaption');
  const captions = {
    'Front View': 'Front View — plush memory-foam cushions with a matte-finish headband.',
    'Side Profile': 'Side Profile — precision-milled hinge for a secure, adjustable fit.',
    'Folded Design': 'Folded Design — collapses flat to slide into the included travel case.',
    'Ear Cushion Detail': 'Ear Cushion Detail — protein-leather pads sealed for passive noise isolation.'
  };
  document.querySelectorAll('.gallery-thumbs .thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumbs .thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      galleryMainImg.style.opacity = 0;
      setTimeout(() => {
        galleryCaption.textContent = captions[thumb.dataset.label];
        galleryMainImg.style.opacity = 1;
      }, 220);
    });
  });
  galleryMainImg.style.transition = 'opacity .22s ease';

  /* ---------------- Counter Animation ---------------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- Countdown Timer ---------------- */
  const cdH = document.getElementById('cd-h');
  const cdM = document.getElementById('cd-m');
  const cdS = document.getElementById('cd-s');
  if (cdH) {
    let endTime = localStorage && false ? null : Date.now() + (6 * 3600 + 24 * 60 + 12) * 1000; // ~6h24m from load
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
      let diff = Math.max(0, endTime - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      cdH.textContent = pad(h);
      cdM.textContent = pad(m);
      cdS.textContent = pad(s);
      if (diff <= 0) endTime = Date.now() + (6 * 3600 + 24 * 60 + 12) * 1000; // loop offer
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- Newsletter (front-end only) ---------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      newsletterForm.reset();
      setTimeout(() => btn.textContent = original, 2200);
    });
  }

});
