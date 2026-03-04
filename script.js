document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const categorySections = document.querySelectorAll('.category-section');
  const linkButtons = document.querySelectorAll('.link-button');

  function performSearch(searchTerm) {
    const term = (searchTerm || '').toLowerCase().trim();

    if (term === '') {
      categorySections.forEach(section => {
        section.style.display = 'block';
        section.querySelectorAll('.link-button').forEach(link => (link.style.display = 'flex'));
      });
      return;
    }

    categorySections.forEach(section => (section.style.display = 'none'));

    linkButtons.forEach(link => {
      const linkText = link.textContent.toLowerCase();
      const parentSection = link.closest('.category-section');

      if (linkText.includes(term)) {
        link.style.display = 'flex';
        parentSection.style.display = 'block';
      } else {
        link.style.display = 'none';
      }
    });

    categorySections.forEach(section => {
      const titleText = section.querySelector('.category-title')?.textContent?.toLowerCase() || '';
      if (titleText.includes(term)) {
        section.style.display = 'block';
        section.querySelectorAll('.link-button').forEach(link => (link.style.display = 'flex'));
      }
    });
  }

  searchInput.addEventListener('input', e => performSearch(e.target.value));

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performSearch('');
      searchInput.blur();
    }
  });

  linkButtons.forEach(button => {
    button.addEventListener('click', function () {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => (this.style.transform = ''), 120);
    });
  });

  console.log('Ferramentas Administrativas carregado com sucesso!');
  console.log(`Total de links: ${linkButtons.length}`);
  console.log(`Total de categorias: ${categorySections.length}`);
});
