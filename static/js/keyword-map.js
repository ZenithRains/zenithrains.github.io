(() => {
  const container = document.getElementById('keyword-map');
  const source = document.getElementById('keyword-data');
  if (!container || !source) return;

  const initialize = () => {
  if (container.querySelector('svg')) return;
  let data;
  try {
    data = JSON.parse(source.textContent);
  } catch {
    return;
  }

  if (!data.nodes?.length) return;

  const namespace = 'http://www.w3.org/2000/svg';
  const width = Math.max(container.clientWidth, 240);
  const height = container.clientHeight || 560;
  const svg = document.createElementNS(namespace, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  container.setAttribute('role', 'group');
  svg.setAttribute('role', 'group');
  container.append(svg);

  const nodeByName = new Map();
  const maxCount = Math.max(...data.nodes.map((node) => node.count));
  const radius = Math.min(width, height) * 0.34;
  const centerX = width / 2;
  const centerY = height / 2;

  data.nodes.forEach((node, index) => {
    const angle = (index / data.nodes.length) * Math.PI * 2 - Math.PI / 2;
    const ring = 0.68 + (index % 3) * 0.16;
    node.x = centerX + Math.cos(angle) * radius * ring;
    node.y = centerY + Math.sin(angle) * radius * ring;
    node.r = 22 + (node.count / maxCount) * 18;
    nodeByName.set(node.name.toLowerCase(), node);
  });

  const links = new Map();
  (data.groups || []).forEach((group) => {
    const nodes = group.map((name) => nodeByName.get(String(name).toLowerCase())).filter(Boolean);
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const names = [nodes[i].name, nodes[j].name].sort();
        const key = names.join('::');
        if (!links.has(key)) links.set(key, { source: nodes[i], target: nodes[j] });
      }
    }
  });

  const linkLayer = document.createElementNS(namespace, 'g');
  linkLayer.setAttribute('aria-hidden', 'true');
  const nodeLayer = document.createElementNS(namespace, 'g');
  svg.append(linkLayer, nodeLayer);

  const lineElements = [...links.values()].map((link) => {
    const line = document.createElementNS(namespace, 'line');
    line.setAttribute('class', 'map-link');
    line.dataset.source = link.source.name;
    line.dataset.target = link.target.name;
    linkLayer.append(line);
    return { line, ...link };
  });

  const nodeElements = data.nodes.map((node) => {
    const anchor = document.createElementNS(namespace, 'a');
    anchor.setAttribute('href', node.url);
    anchor.setAttribute('class', 'map-node');
    anchor.setAttribute('aria-label', `${node.name}: ${node.count}`);

    const circle = document.createElementNS(namespace, 'circle');
    circle.setAttribute('r', String(node.r));
    const text = document.createElementNS(namespace, 'text');
    text.textContent = node.name.length > 16 ? `${node.name.slice(0, 14)}…` : node.name;
    anchor.append(circle, text);
    nodeLayer.append(anchor);
    return { anchor, node };
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const render = () => {
    lineElements.forEach(({ line, source, target }) => {
      line.setAttribute('x1', String(source.x));
      line.setAttribute('y1', String(source.y));
      line.setAttribute('x2', String(target.x));
      line.setAttribute('y2', String(target.y));
    });
    nodeElements.forEach(({ anchor, node }) => {
      anchor.setAttribute('transform', `translate(${node.x} ${node.y})`);
    });
  };

  let dragging = null;
  let suppressClick = false;
  nodeElements.forEach(({ anchor, node }) => {
    anchor.addEventListener('pointerdown', (event) => {
      dragging = { node, startX: event.clientX, startY: event.clientY, moved: false };
      anchor.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    anchor.addEventListener('pointermove', (event) => {
      if (!dragging || dragging.node !== node) return;
      const rect = svg.getBoundingClientRect();
      const dx = (event.clientX - dragging.startX) * (width / rect.width);
      const dy = (event.clientY - dragging.startY) * (height / rect.height);
      if (Math.abs(dx) + Math.abs(dy) > 3) dragging.moved = true;
      node.x = clamp(node.x + dx, node.r, width - node.r);
      node.y = clamp(node.y + dy, node.r, height - node.r);
      dragging.startX = event.clientX;
      dragging.startY = event.clientY;
      render();
    });
    anchor.addEventListener('pointerup', (event) => {
      suppressClick = Boolean(dragging?.moved);
      if (suppressClick) event.preventDefault();
      dragging = null;
    });
    anchor.addEventListener('pointercancel', () => { dragging = null; suppressClick = false; });
    anchor.addEventListener('click', (event) => {
      if (suppressClick) event.preventDefault();
      suppressClick = false;
    });
  });

  render();
  };
  const explorer = container.closest('[data-keyword-explorer]');
  if (explorer && !explorer.open) {
    explorer.addEventListener('toggle', () => { if (explorer.open) initialize(); });
  } else {
    initialize();
  }
})();
