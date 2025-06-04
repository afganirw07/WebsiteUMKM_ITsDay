function init_totalServices() {
  const counters = [
    { id: 'count1', end: 199, duration: 12000 },
    { id: 'count2', end: 199, duration: 12000 },
    { id: 'count3', end: 98, duration: 12000, suffix: '%' },
    { id: 'count4', end: 30, duration: 12000 }
  ];

  counters.forEach(counter => {
    const element = document.getElementById(counter.id);
    if (!element) return;

    const start = 0;
    const increment = counter.end / (counter.durjation / 16);
    let current = start;

    const updateCount = () => {
      current += increment;
      if (current < counter.end) {
        element.textContent = Math.floor(current) + (counter.suffix || '');
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = counter.end + (counter.suffix || '');
      }
    };

    updateCount();
  });
}
