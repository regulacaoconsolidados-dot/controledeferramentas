(function() {
    'use strict';

    // ============================================
    // 1. SISTEMA DE ABAS
    // ============================================
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        function switchTab(tabId) {
            contents.forEach(c => c.classList.remove('active'));
            tabBtns.forEach(b => b.classList.remove('active'));

            const target = document.getElementById(`tab-${tabId}`);
            const activeBtn = Array.from(tabBtns).find(b => b.dataset.tab === tabId);
            if (target) target.classList.add('active');
            if (activeBtn) activeBtn.classList.add('active');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                switchTab(tabId);
            });
        });
    }

    // ============================================
    // 2. BUSCA GLOBAL
    // ============================================
    function initGlobalSearch() {
        const globalSearchInput = document.querySelector('.global-search-input');
        if (!globalSearchInput) return;

        function performGlobalSearch() {
            const term = globalSearchInput.value.toLowerCase().trim();
            const allCards = document.querySelectorAll('.card');
            const allSections = document.querySelectorAll('.category-section');

            if (term === '') {
                allSections.forEach(s => s.style.display = '');
                allCards.forEach(c => c.style.display = '');
                return;
            }

            allSections.forEach(section => {
                const title = section.querySelector('.category-title')?.textContent.toLowerCase() || '';
                const cards = section.querySelectorAll('.card');
                let sectionHasVisible = false;

                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    const shouldShow = text.includes(term) || title.includes(term);
                    card.style.display = shouldShow ? '' : 'none';
                    if (shouldShow) sectionHasVisible = true;
                });

                section.style.display = sectionHasVisible || title.includes(term) ? '' : 'none';
            });
        }

        globalSearchInput.addEventListener('input', performGlobalSearch);
        globalSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                globalSearchInput.value = '';
                performGlobalSearch();
                globalSearchInput.blur();
            }
        });
    }

    // ============================================
    // 3. INICIALIZAÇÃO
    // ============================================
    function init() {
        initTabs();
        initGlobalSearch();
        console.log('✅ Portal Ferramentas Administrativas carregado com sucesso!');
    }

    document.addEventListener('DOMContentLoaded', init);
})();
