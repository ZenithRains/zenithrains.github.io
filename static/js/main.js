(() => {
  const root = document.documentElement;
  const chinese = root.lang.startsWith('zh');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeOptions = [...document.querySelectorAll('button[data-theme-preference]')];
  const themeMenu = document.querySelector('.theme-menu');
  const syncTheme = () => {
    const preference = root.dataset.themePreference || 'auto';
    const theme = preference === 'auto' ? (systemTheme.matches ? 'dark' : 'light') : preference;
    root.dataset.theme = theme;
    themeOptions.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themePreference === preference));
    });
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.removeAttribute('media');
      meta.content = getComputedStyle(root).getPropertyValue('--color-bg').trim();
    });
  };
  themeOptions.forEach((button) => {
    button.addEventListener('click', () => {
      const preference = button.dataset.themePreference;
      if (!['auto', 'light', 'dark'].includes(preference)) return;
      root.dataset.themePreference = preference;
      try { localStorage.setItem('color-theme', preference); } catch {}
      syncTheme();
      if (themeMenu) {
        themeMenu.open = false;
        themeMenu.querySelector('summary')?.focus();
      }
    });
  });
  systemTheme.addEventListener('change', syncTheme);
  syncTheme();
  document.addEventListener('click', (event) => {
    if (themeMenu?.open && !themeMenu.contains(event.target)) themeMenu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && themeMenu?.open) {
      themeMenu.open = false;
      themeMenu.querySelector('summary')?.focus();
    }
  });
  if (window.renderMathInElement) {
    window.renderMathInElement(document.querySelector('main') || document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$', right: '$', display: false }
      ],
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      throwOnError: false
    });
  }
  document.querySelectorAll('.prose table').forEach((table) => {
    if (table.parentElement.classList.contains('table-scroll')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    table.before(wrapper);
    wrapper.append(table);
  });
  const refreshScrollRegions = () => {
    document.querySelectorAll('.table-scroll, .prose pre, .katex-display').forEach((region) => {
      const overflows = region.scrollWidth > region.clientWidth + 1;
      if (overflows) {
        region.tabIndex = 0;
        region.setAttribute('role', 'region');
        const kind = region.matches('.table-scroll') ? (chinese ? '表格' : 'Table')
          : region.matches('pre') ? (chinese ? '代码' : 'Code') : (chinese ? '公式' : 'Equation');
        region.setAttribute('aria-label', kind + (chinese ? '，可横向滚动' : ', horizontally scrollable'));
      } else {
        region.removeAttribute('tabindex');
        region.removeAttribute('role');
        region.removeAttribute('aria-label');
      }
    });
  };
  document.fonts.ready.then(refreshScrollRegions);
  let resizeFrame;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(refreshScrollRegions);
  });
  document.querySelectorAll('[data-pdf-load]').forEach((button) => {
    const panel = button.closest('[data-pdf-src]');
    const target = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel || !target) return;
    button.hidden = false;
    const loadLabel = button.dataset.pdfLoadLabel || button.textContent;
    const closeLabel = button.dataset.pdfCloseLabel || (chinese ? '收起在线阅读' : 'Close preview');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      if (open) {
        target.replaceChildren();
        target.hidden = true;
        button.textContent = loadLabel;
        button.setAttribute('aria-expanded', 'false');
        return;
      }
      const viewer = document.createElement('iframe');
      viewer.className = 'pdf-viewer';
      viewer.title = panel.dataset.pdfTitle || (chinese ? 'PDF 在线阅读' : 'PDF preview');
      viewer.src = panel.dataset.pdfSrc + '#view=FitH';
      viewer.loading = 'lazy';
      target.replaceChildren(viewer);
      target.hidden = false;
      button.textContent = closeLabel;
      button.setAttribute('aria-expanded', 'true');
    });
  });
  const writingFilters = [...document.querySelectorAll('[data-writing-filter]')];
  const writingEntries = [...document.querySelectorAll('[data-writing-kind]')]
    .filter((entry) => !entry.querySelector('[data-writing-kind]'));
  const writingGroups = [...document.querySelectorAll('[data-writing-kind]')]
    .filter((entry) => entry.querySelector('[data-writing-kind]'));
  const filterStatus = document.querySelector('[data-writing-status]');
  const filterEmpty = document.querySelector('[data-writing-empty]');
  document.querySelectorAll('[data-writing-filters]').forEach((nav) => { nav.hidden = false; });
  writingFilters.forEach((button) => {
    button.addEventListener('click', () => {
      const kind = button.dataset.writingFilter;
      let count = 0;
      writingFilters.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
      writingEntries.forEach((entry) => {
        entry.hidden = kind !== 'all' && entry.dataset.writingKind !== kind;
        if (!entry.hidden) count += 1;
      });
      writingGroups.forEach((group) => {
        group.hidden = ![...group.querySelectorAll('[data-writing-kind]')].some((entry) => !entry.hidden);
      });
      if (filterEmpty) filterEmpty.hidden = count > 0;
      if (filterStatus) filterStatus.textContent = chinese ? '显示 ' + count + ' 篇内容' : count + ' items shown';
    });
  });
  document.querySelectorAll('.copy-bibtex').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = button.closest('.bibtex-box')?.querySelector('code')?.textContent || '';
      if (!code) return;
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = chinese ? '已复制' : 'Copied';
      } catch {
        button.textContent = chinese ? '请选择文本复制' : 'Select text to copy';
      }
      window.setTimeout(() => { button.textContent = original; }, 1800);
    });
  });
})();
