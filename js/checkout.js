/* ==========================================================================
   AURA Pro — checkout.js
   Live order summary, geolocation, validation, WhatsApp order message
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '+92 310 3696838'; // Replace with your business WhatsApp number

  const PRODUCT = {
    name: 'AURA Pro Wireless Headphones',
    unitPrice: 9999,
    delivery: 250,
    discount: 7000,
  };

  const state = {
    color: 'Midnight Black',
    qty: 1,
    mapsLink: '',
    coords: null,
  };

  const fmt = (n) => 'Rs. ' + n.toLocaleString('en-PK');

  /* ---------------- Elements ---------------- */
  const summaryColor = document.getElementById('summaryColor');
  const summaryUnitPrice = document.getElementById('summaryUnitPrice');
  const summaryQty = document.getElementById('summaryQty');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDelivery = document.getElementById('summaryDelivery');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryTotal = document.getElementById('summaryTotal');

  function updateSummary() {
    const subtotal = PRODUCT.unitPrice * state.qty;
    const total = subtotal + PRODUCT.delivery - PRODUCT.discount;
    summaryColor.textContent = state.color;
    summaryUnitPrice.textContent = fmt(PRODUCT.unitPrice);
    summaryQty.textContent = state.qty;
    summarySubtotal.textContent = fmt(subtotal);
    summaryDelivery.textContent = fmt(PRODUCT.delivery);
    summaryDiscount.textContent = '− ' + fmt(PRODUCT.discount);
    summaryTotal.textContent = fmt(Math.max(total, PRODUCT.delivery));
  }
  updateSummary();

  /* Listen for color changes from hero swatches / checkout select */
  document.addEventListener('aura:colorChange', (e) => {
    state.color = e.detail;
    updateSummary();
  });

  /* Listen for quantity changes from either qty selector (hero or checkout),
     keep both in sync */
  document.addEventListener('aura:qtyChange', (e) => {
    state.qty = e.detail.qty;
    updateSummary();
    // sync the other quantity selector
    document.querySelectorAll('.qty-selector').forEach(group => {
      if (group.dataset.qtyGroup !== e.detail.group) {
        group.querySelector('[data-qty-value]').textContent = e.detail.qty;
      }
    });
  });

  /* ---------------- Geolocation ---------------- */
  const shareLocationBtn = document.getElementById('shareLocationBtn');
  const locationStatus = document.getElementById('locationStatus');
  const mapsLinkInput = document.getElementById('mapsLink');

  shareLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      locationStatus.textContent = 'Geolocation not supported on this device.';
      locationStatus.style.color = '#dc2626';
      return;
    }
    locationStatus.textContent = 'Fetching your location…';
    locationStatus.style.color = '';
    shareLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        state.coords = { latitude, longitude };
        const link = `https://maps.google.com/?q=${latitude},${longitude}`;
        mapsLinkInput.value = link;
        state.mapsLink = link;
        locationStatus.innerHTML = '<i class="bi bi-check-circle-fill"></i> Location captured';
        locationStatus.style.color = '#18C7B8';
        shareLocationBtn.disabled = false;
      },
      (err) => {
        locationStatus.textContent = 'Could not get location — please paste a Maps link instead.';
        locationStatus.style.color = '#dc2626';
        shareLocationBtn.disabled = false;
      }
    );
  });

  mapsLinkInput.addEventListener('input', () => {
    state.mapsLink = mapsLinkInput.value.trim();
  });

  /* ---------------- Form Validation + WhatsApp Order ---------------- */
  const form = document.getElementById('checkoutForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    form.classList.add('was-validated');

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const house = document.getElementById('addrHouse').value.trim();
    const street = document.getElementById('addrStreet').value.trim();
    const area = document.getElementById('addrArea').value.trim();
    const city = document.getElementById('addrCity').value.trim();
    const province = document.getElementById('addrProvince').value;
    const color = document.getElementById('checkoutColor').value;
    const qty = state.qty;
    const mapsLink = state.mapsLink || mapsLinkInput.value.trim();

    const subtotal = PRODUCT.unitPrice * qty;
    const total = Math.max(subtotal + PRODUCT.delivery - PRODUCT.discount, PRODUCT.delivery);

    let message = '';
    message += `🛒 NEW ORDER\n\n`;
    message += `Customer Name:\n${name}\n\n`;
    message += `Phone:\n${phone}\n\n`;
    message += `Delivery Address:\n${house}, ${street}\n${area}, ${city}\n${province}\n\n`;
    if (mapsLink) {
      message += `Google Maps Location:\n${mapsLink}\n\n`;
    }
    message += `Product:\n${PRODUCT.name}\n\n`;
    message += `Color:\n${color}\n\n`;
    message += `Quantity:\n${qty}\n\n`;
    message += `Unit Price:\n${fmt(PRODUCT.unitPrice)}\n\n`;
    message += `Delivery:\n${fmt(PRODUCT.delivery)}\n\n`;
    message += `Grand Total:\n${fmt(total)}\n\n`;
    message += `Thank you for your order ❤️`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    const btn = document.getElementById('placeOrderBtn');
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check2-circle"></i> Opening WhatsApp…';
    btn.disabled = true;

    setTimeout(() => {
      window.open(url, '_blank', 'noopener');
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }, 500);
  });

});
