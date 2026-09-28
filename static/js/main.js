(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const navButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const syncTheme = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton?.setAttribute('aria-pressed', String(dark));
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.removeAttribute('media');
      meta.content = dark ? '#121212' : '#ffffff';
    });
  };
  syncTheme();

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('color-theme', next);
    syncTheme();
  });

  navButton?.addEventListener('click', () => {
    const open = navButton.getAttribute('aria-expanded') !== 'true';
    navButton.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  systemTheme.addEventListener('change', (event) => {
    if (!localStorage.getItem('color-theme')) {
      root.dataset.theme = event.matches ? 'dark' : 'light';
      syncTheme();
    }
  });

  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
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
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    table.before(wrapper);
    wrapper.append(table);
  });
  const refreshScrollRegions = () => {
    const chinese = root.lang.startsWith('zh');
    const regions = [...document.querySelectorAll('.table-scroll, .prose pre, .katex-display')]
      .map((region) => ({ region, overflows: region.scrollWidth > region.clientWidth + 1 }));
    regions.forEach(({ region, overflows }) => {
      if (overflows) {
        region.tabIndex = 0;
        region.setAttribute('role', 'region');
        const kind = region.matches('.table-scroll') ? (chinese ? '表格' : 'Table')
          : region.matches('pre') ? (chinese ? '代码' : 'Code') : (chinese ? '公式' : 'Equation');
        region.setAttribute('aria-label', chinese ? `${kind}，可横向滚动` : `${kind}, horizontally scrollable`);
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

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const publications = [...document.querySelectorAll('.publication')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const topic = button.dataset.topic;
      filterButtons.forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
      publications.forEach((publication) => {
        const topics = publication.dataset.topics?.split(' ') || [];
        publication.hidden = topic !== 'all' && !topics.includes(topic);
      });
    });
  });

  document.querySelectorAll('.copy-bibtex').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = button.closest('.bibtex-box')?.querySelector('code')?.textContent || '';
      if (!code) return;
      await navigator.clipboard.writeText(code);
      const original = button.textContent;
      button.textContent = document.documentElement.lang.startsWith('zh') ? '已复制' : 'Copied';
      window.setTimeout(() => { button.textContent = original; }, 1600);
    });
  });

  const cloudItems = [...document.querySelectorAll('.word-cloud [data-count]')];
  if (cloudItems.length) {
    const counts = cloudItems.map((item) => Number(item.dataset.count) || 1);
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    cloudItems.forEach((item) => {
      const count = Number(item.dataset.count) || 1;
      const ratio = max === min ? 0.5 : (count - min) / (max - min);
      item.style.setProperty('--word-size', `${16 + ratio * 26}px`);
    });
  }
})();
