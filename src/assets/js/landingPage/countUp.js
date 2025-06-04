function init_totalServices() {
  const counters = [
    { id: 'count1', end: 199, duration: 8000 },
    { id: 'count2', end: 199, duration: 8000 },
    { id: 'count3', end: 98, duration: 8000, suffix: '%' },
    { id: 'count4', end: 30, duration: 8000 }
  ];

  counters.forEach(counter => {
    const el = document.getElementById(counter.id);
    if (!el) return;

    const startTime = performance.now();
    const start = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / counter.duration, 1); // max 1
      const value = Math.floor(start + progress * (counter.end - start));

      el.textContent = value + (counter.suffix || '');

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });
}
