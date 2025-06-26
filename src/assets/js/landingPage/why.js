window.init_why = function () {
  const cards = [
    { card: document.getElementById('card1'), triangle: document.getElementById('triangle1'), content: document.getElementById('content1') },
    { card: document.getElementById('card2'), triangle: document.getElementById('triangle2'), content: document.getElementById('content2') },
    { card: document.getElementById('card3'), triangle: document.getElementById('triangle3'), content: document.getElementById('content3') },
  ];

  function hideOthers(exceptCard, exceptTriangle, exceptContent) {
    for (let { card, triangle, content } of cards) {
      if (triangle !== exceptTriangle) triangle.classList.add('-translate-y-full', 'opacity-0');
      if (content !== exceptContent) {
        content.classList.add('hidden', 'opacity-0');
        content.classList.remove('opacity-100');
      }
      if (card !== exceptCard) {
        card.classList.remove('bg-secondary');
        card.classList.add('bg-darkGray');
      }
    }
  }

  function showContent(selectedCard, selectedTriangle, selectedContent) {
    hideOthers(selectedCard, selectedTriangle, selectedContent);

    selectedTriangle.classList.remove('-translate-y-full', 'opacity-0');
    selectedContent.classList.remove('hidden');
    setTimeout(() => {
      selectedContent.classList.remove('opacity-0');
      selectedContent.classList.add('opacity-100');
    }, 10);

    selectedCard.classList.remove('bg-darkGray');
    selectedCard.classList.add('bg-secondary');
  }

  cards.forEach(({ card, triangle, content }) => {
    card.addEventListener('click', () => {
      showContent(card, triangle, content);
    });
  });

  showContent(cards[0].card, cards[0].triangle, cards[0].content);

function readMore() {
  const readMoreBtns = document.querySelectorAll('.read-more');

  readMoreBtns.forEach((btn) => {
    const paragraph = btn.previousElementSibling;
    if (!paragraph) return;

    btn.addEventListener('click', () => {
      const isExpanded = !paragraph.classList.contains('line-clamp-3');

      if (isExpanded) {
        // Kalau sudah terbuka, tutup kembali
        paragraph.classList.add('line-clamp-3');
        paragraph.classList.remove('line-clamp-none');
        btn.textContent = 'Baca Selengkapnya';
      } else {
        // Kalau masih tertutup, buka
        paragraph.classList.remove('line-clamp-3');
        paragraph.classList.add('line-clamp-none');
        btn.textContent = 'Lihat Lebih Sedikit';
      }
    });
  });
}


  readMore();

};

