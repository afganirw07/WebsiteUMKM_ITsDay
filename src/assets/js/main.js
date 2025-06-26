document.addEventListener('DOMContentLoaded', function () {
  const components = [
    'header', 'footer', 'banner', 'testimonial', 'totalServices', 'why',
    'reason', 'about', 'chat', 'contact', 'layanan', 'partner',
    'procces2', 'alurProses'
  ];

  let loadedCount = 0;

  components.forEach(component => {
    const element = document.getElementById(component);
    if (!element) return;

    fetch(`./src/components/${component}.html`)
      .then(response => response.text())
      .then(data => {
        element.innerHTML = data;

        // Optional: console log
        console.log(` Komponen ${component} dimuat`);

        // Inisialisasi komponen jika ada
        if (component === 'header' && typeof window.initNavbar === 'function') {
          window.initNavbar();
        }

        const initFn = window[`init_${component}`];
        if (typeof initFn === 'function') initFn();

        if (component === 'testimonial' && typeof window.updateTestimonial === 'function') {
          window.updateTestimonial();
          document.getElementById('testimonial-prev')?.addEventListener('click', window.showPrevTestimonial);
          document.getElementById('testimonial-next')?.addEventListener('click', window.showNextTestimonial);
          document.querySelectorAll('#testimonial-dots button').forEach(btn => {
            btn.onclick = () => {
              window.currentTestimonial = parseInt(btn.getAttribute('data-dot'));
              window.updateTestimonial();
            };
          });
        }

        //  Setelah semua komponen dimuat
        loadedCount++;
        if (loadedCount === components.length) {
          setTimeout(() => {
            if (window.AOS) {
              console.log(' AOS.refresh() dijalankan');
              AOS.refreshHard(); // atau AOS.init();
            } else {
              console.warn(' AOS tidak ditemukan');
            }
          }, 300); // delay kecil
        }
      })
      .catch(err => console.error(` Gagal memuat komponen ${component}:`, err));
  });
});
