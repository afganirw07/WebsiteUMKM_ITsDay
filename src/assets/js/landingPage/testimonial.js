// Testimonial data
const testimonials = [
  {
    text: "Website ini sangat membantu UMKM berkembang dan mengurus sertifikasi halal dengan mudah. Konsultannya ramah dan profesional!",
    name: 'Nur Vinna',
    role: 'Pemilik Usaha Bakso',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5
  },
  {
    text: "Layanan konsultasi di web ini sangat responsif dan informatif. Saya jadi lebih percaya diri menjalankan usaha makanan!",
    name: 'Ahmad Fauzi',
    role: 'Owner Roti Manis',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5
  },
  {
    text: "Proses sertifikasi halal jadi jauh lebih mudah dan cepat. Terima kasih atas bimbingan dan supportnya!",
    name: 'Sarah Putri',
    role: 'Pemilik Katering Sehat',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5
  },
  {
    text: "Alhamdulillah, dengan bantuan platform ini, usaha kecil saya berhasil mendapat sertifikat halal. Prosesnya mudah dipahami!",
    name: 'Budi Santoso',
    role: 'Pemilik Warung Tegal',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5
  },
  {
    text: "Tim konsultan sangat membantu dalam memberikan panduan lengkap untuk UMKM. Highly recommended!",
    name: 'Siti Aminah',
    role: 'Owner Kue Tradisional',
    img: 'https://randomuser.me/api/portraits/women/55.jpg',
    rating: 5
  }
];

let currentTestimonial = 0;
let lastDirection = 'right'; // 'right' (next) atau 'left' (prev)

function renderStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    const isFilled = i < rating;
    const starClass = isFilled ? 'text-yellow-400' : 'text-gray-300';
    stars += `<svg class="w-5 h-5 ${starClass}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  }
  return stars;
}

function renderDots(activeIdx) {
  let dots = '';
  for (let i = 0; i < testimonials.length; i++) {
    dots += `<button class=\"w-3 h-3 rounded-full focus:outline-none ${i === activeIdx ? 'bg-emerald-300' : 'bg-emerald-300/30'}\" data-dot=\"${i}\"></button>`;
  }
  return dots;
}

function animateTestimonialChange(direction, callback) {
  const card = document.getElementById('testimonial-card');
  if (!card) { callback && callback(); return; }
  // Remove all animasi class
  card.classList.remove('fade-in', 'fade-out', 'slide-in-right', 'slide-out-left', 'slide-in-left', 'slide-out-right');
  // Pilih animasi keluar
  if (direction === 'right') {
    card.classList.add('fade-out', 'slide-out-left');
  } else {
    card.classList.add('fade-out', 'slide-out-right');
  }
  // Setelah animasi keluar selesai, ganti data dan animasi masuk
  card.addEventListener('animationend', function handler(e) {
    if (e.animationName === 'fadeOut' || e.animationName === 'slideOutLeft' || e.animationName === 'slideOutRight') {
      card.removeEventListener('animationend', handler);
      card.classList.remove('fade-out', 'slide-out-left', 'slide-out-right');
      callback && callback();
      // Animasi masuk
      if (direction === 'right') {
        card.classList.add('fade-in', 'slide-in-right');
      } else {
        card.classList.add('fade-in', 'slide-in-left');
      }
      // Hapus class animasi masuk setelah selesai
      card.addEventListener('animationend', function handler2(e2) {
        if (e2.animationName === 'fadeIn' || e2.animationName === 'slideInRight' || e2.animationName === 'slideInLeft') {
          card.removeEventListener('animationend', handler2);
          card.classList.remove('fade-in', 'slide-in-right', 'slide-in-left');
        }
      });
    }
  });
}

function updateTestimonial(retry = 0, direction = lastDirection) {
  const t = testimonials[currentTestimonial];
  const textEl = document.getElementById('testimonial-text');
  const nameEl = document.getElementById('testimonial-name');
  const roleEl = document.getElementById('testimonial-role');
  const imgEl = document.getElementById('testimonial-image');
  const starsEl = document.getElementById('testimonial-stars');
  const dotsEl = document.getElementById('testimonial-dots');
  if (!textEl || !nameEl || !roleEl || !imgEl || !starsEl || !dotsEl) {
    if (retry < 10) setTimeout(() => updateTestimonial(retry + 1, direction), 150);
    return;
  }
  textEl.innerHTML = t.text || '<span style="color:#f87171">(Pesan tidak ditemukan)</span>';
  nameEl.innerHTML = t.name || '<span style="color:#f87171">(Nama tidak ditemukan)</span>';
  roleEl.innerHTML = t.role || '<span style="color:#f87171">(Role tidak ditemukan)</span>';
  imgEl.src = t.img || '';
  imgEl.alt = t.name || '';
  starsEl.innerHTML = renderStars(t.rating);
  dotsEl.innerHTML = renderDots(currentTestimonial);
  // Dots event
  document.querySelectorAll('#testimonial-dots button').forEach(btn => {
    btn.onclick = () => {
      lastDirection = (parseInt(btn.getAttribute('data-dot')) > currentTestimonial) ? 'right' : 'left';
      currentTestimonial = parseInt(btn.getAttribute('data-dot'));
      animateTestimonialChange(lastDirection, () => updateTestimonial(0, lastDirection));
    };
  });
  console.log(`Testimonial loaded: ${t.name} (${t.rating} stars)`, t);
}

function showPrevTestimonial() {
  lastDirection = 'left';
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  animateTestimonialChange('left', () => updateTestimonial(0, 'left'));
}

function showNextTestimonial() {
  lastDirection = 'right';
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  animateTestimonialChange('right', () => updateTestimonial(0, 'right'));
}

// Auto-rotate testimonial setiap 8 detik
let autoRotateInterval;

function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    showNextTestimonial();
  }, 8000);
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      showPrevTestimonial();
      stopAutoRotate(); // Stop auto-rotate ketika user interaksi manual
      setTimeout(startAutoRotate, 15000); // Restart setelah 15 detik
    }
    if (e.key === 'ArrowRight') {
      showNextTestimonial();
      stopAutoRotate();
      setTimeout(startAutoRotate, 15000);
    }
  });
  // Start auto-rotate
  setTimeout(startAutoRotate, 3000); // Mulai setelah 3 detik
  // Animasi pertama kali
  setTimeout(() => {
    const card = document.getElementById('testimonial-card');
    if (card) card.classList.add('fade-in', 'slide-in-right');
  }, 200);
  setupScrollToTopBtn();
});

window.updateTestimonial = updateTestimonial;
window.showPrevTestimonial = showPrevTestimonial;
window.showNextTestimonial = showNextTestimonial;
window.currentTestimonial = currentTestimonial;
window.startAutoRotate = startAutoRotate;
window.stopAutoRotate = stopAutoRotate;
