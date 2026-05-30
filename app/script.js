// ── MENU ──
function openMenu() {
  document.getElementById('menuOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  document.getElementById('menuOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SEARCH ──
function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
  document.body.style.overflow = 'hidden';
}
function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── CAROUSEL ──
function initCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  if (!items.length) return;

  let current = 1;

  function update() {
    const total = items.length;
    items.forEach((item, i) => {
      item.classList.remove('center', 'left', 'right');
      const rel = ((i - current) % total + total) % total;

      if (rel === 0) {
        item.classList.add('center');
        item.style.display = '';
        // swap to TXT image
        const img = item.querySelector('img');
        const txt = item.dataset.imgTxt;
        if (img && txt) img.src = txt;
        // change header theme
        const theme = item.dataset.theme;
        if (theme) {
          const [from, to] = theme.split(',');
          document.querySelector('header').style.background =
            `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
        }
      } else if (rel === 1 || rel === total - 1) {
        item.classList.add(rel === 1 ? 'right' : 'left');
        item.style.display = '';
        // swap back to plain image
        const img = item.querySelector('img');
        const plain = item.dataset.img;
        if (img && plain) img.src = plain;
      } else {
        item.style.display = 'none';
      }
    });
  }

  document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    update();
  });
  document.querySelector('.carousel-btn.next')?.addEventListener('click', () => {
    current = (current + 1) % items.length;
    update();
  });

  update();
}

// ── CART QTY ──
function initCart() {
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const minus = ctrl.querySelector('.qty-minus');
    const plus  = ctrl.querySelector('.qty-plus');
    const span  = ctrl.querySelector('span');
    const priceEl   = ctrl.closest('.cart-item')?.querySelector('.cart-item-price');
    const unitPrice = parseInt(ctrl.dataset.price || 25);

    minus?.addEventListener('click', () => {
      let v = parseInt(span.textContent);
      if (v > 1) { v--; span.textContent = v; updatePrice(priceEl, v, unitPrice); }
    });
    plus?.addEventListener('click', () => {
      let v = parseInt(span.textContent);
      v++; span.textContent = v; updatePrice(priceEl, v, unitPrice);
    });
  });
}

function updatePrice(el, qty, unit) {
  if (el) el.textContent = (qty * unit) + '$';
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initCart();
});