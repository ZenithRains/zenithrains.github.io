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

  const isChinese = document.documentElement.lang.startsWith('zh');
  document.querySelectorAll('.update-card').forEach((card) => {
    const body = card.querySelector('.update-body');
    const expand = card.querySelector('.update-expand');
    let expanded = false;
    const measure = () => {
      body.classList.remove('is-collapsed');
      const long = body.scrollHeight > 161 || Boolean(body.querySelector('.katex-display'));
      const canCollapse = long && !card.closest('.update-detail');
      expand.hidden = !canCollapse;
      body.classList.toggle('is-collapsed', canCollapse && !expanded);
    };
    expand.addEventListener('click', () => {
      expanded = !expanded;
      expand.setAttribute('aria-expanded', String(expanded));
      expand.textContent = expanded ? (isChinese ? '收起' : 'Show less') : (isChinese ? '显示更多' : 'Show more');
      measure();
    });
    measure();
    document.fonts?.ready.then(measure);
    let lastWidth = card.clientWidth;
    new ResizeObserver(() => {
      if (card.clientWidth !== lastWidth) {
        lastWidth = card.clientWidth;
        measure();
      }
    }).observe(card);
    const copy = card.querySelector('.update-copy');
    if (navigator.share || navigator.clipboard?.writeText) {
      copy.hidden = false;
      copy.addEventListener('click', async () => {
        try {
          if (navigator.share) {
            await navigator.share({ url: copy.dataset.url });
          } else {
            await navigator.clipboard.writeText(copy.dataset.url);
            card.querySelector('.update-feedback').textContent = isChinese ? '已复制' : 'Copied';
          }
        } catch (error) {
          if (error.name !== 'AbortError') card.querySelector('.update-feedback').textContent = isChinese ? '可点击日期打开后分享' : 'Open the date link to share';
        } finally {
          window.setTimeout(() => { card.querySelector('.update-feedback').textContent = ''; }, 2400);
        }
      });
    }
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
