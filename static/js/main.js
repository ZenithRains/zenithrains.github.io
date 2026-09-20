(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const navButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('color-theme', next);
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
