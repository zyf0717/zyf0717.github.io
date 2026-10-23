(() => {
  const gallery = document.querySelector('.photography-grid');
  if (!gallery || !window.ResizeObserver) return;

  // One grid row is one pixel. Include the card's bottom margin in its span.
  const resizeCard = (card) => {
    const spacing = parseFloat(getComputedStyle(card).marginBottom);
    card.style.gridRowEnd = `span ${Math.ceil(card.getBoundingClientRect().height + spacing)}`;
  };

  const observer = new ResizeObserver((entries) => {
    for (const { target } of entries) resizeCard(target);
  });

  for (const card of gallery.children) {
    resizeCard(card);
    observer.observe(card);
  }
  gallery.classList.add('photography-grid--masonry');
})();
