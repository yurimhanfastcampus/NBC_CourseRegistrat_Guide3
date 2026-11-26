document.addEventListener('DOMContentLoaded', () => {
  // FAQ accordion toggle
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : '0px';
    });
  });

  // Highlight nav link matching the current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const current = path.replace('.html', '') || 'index';
  document.querySelectorAll('.step-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === current);
  });

  // Back to top button
  const toTop = document.querySelector('.to-top');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Image lightbox (click a screenshot to zoom)
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<div class="lightbox-close">✕</div><img src="" alt="">';
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector('img');

  const openLightbox = (src, alt) => {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('show');
  };
  const closeLightbox = () => overlay.classList.remove('show');

  overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
  document.querySelectorAll('.shots img, .faq-a-inner img').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
});
