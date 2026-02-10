// Prefetch Visualization - Interactive Demo v7
console.log('[prefetch-viz] Script loaded v7');

(function() {
  const COLORS = {
    loaded: '#1ebca1',
    loading: '#f97316',
    prefetch: '#8b5cf6',
    unloaded: '#2a2a4a',
    border: '#3a3a5a',
    highlight: '#fbbf24',
    textDark: '#0a0a0a',
    textLight: '#6b7280',
    textPrefetch: '#ffffff'
  };

  // B-tree structure: parent -> children
  const btreeChildren = {
    1: [2, 3],
    2: [4, 5],
    3: [6, 7],
    4: [11, 12],
    7: [9, 10]
    // 5, 6, 8 are leaves
  };

  // Initial loaded pages (root + first level)
  const initialLoaded = new Set([1, 2, 3]);
  let selectedPage = 4;

  // Cell positions for state 1 (x, y for each page number)
  const cellPositions = {
    1: {x: 10, y: 22}, 2: {x: 44, y: 22}, 3: {x: 78, y: 22}, 4: {x: 112, y: 22},
    5: {x: 10, y: 56}, 6: {x: 44, y: 56}, 7: {x: 78, y: 56}, 8: {x: 112, y: 56},
    9: {x: 10, y: 90}, 10: {x: 44, y: 90}, 11: {x: 78, y: 90}, 12: {x: 112, y: 90}
  };

  function getChildren(page) {
    return btreeChildren[page] || [];
  }

  function isLoaded(page) {
    return initialLoaded.has(page);
  }

  function updateVisualization(clickedPage) {
    console.log('[prefetch-viz] Page clicked:', clickedPage);
    selectedPage = clickedPage;

    // Don't prefetch children for already loaded pages
    const alreadyLoaded = isLoaded(clickedPage);
    const children = alreadyLoaded ? [] : getChildren(clickedPage);

    // Update state 1 - highlight selected page and show children
    for (let p = 1; p <= 12; p++) {
      const rect = document.getElementById('p1-rect-' + p);
      const text = document.getElementById('p1-text-' + p);
      if (!rect || !text) continue;

      const loaded = isLoaded(p);
      const isSelected = p === clickedPage;
      const isChild = children.includes(p);

      if (loaded) {
        rect.setAttribute('fill', COLORS.loaded);
        rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loaded);
        rect.setAttribute('stroke-width', isSelected ? '3' : '2');
        text.setAttribute('fill', COLORS.textDark);
        text.setAttribute('font-weight', 'bold');
      } else if (isChild) {
        // Child pages shown with prefetch indicator
        rect.setAttribute('fill', COLORS.unloaded);
        rect.setAttribute('stroke', COLORS.prefetch);
        rect.setAttribute('stroke-width', '2');
        text.setAttribute('fill', COLORS.prefetch);
        text.setAttribute('font-weight', 'bold');
      } else {
        rect.setAttribute('fill', COLORS.unloaded);
        rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.border);
        rect.setAttribute('stroke-width', isSelected ? '3' : '1');
        text.setAttribute('fill', isSelected ? COLORS.highlight : COLORS.textLight);
        text.setAttribute('font-weight', isSelected ? 'bold' : 'normal');
      }
    }

    // Draw orthogonal arrows on state 1 from selected page to children
    const arrowsGroup = document.getElementById('pf-btree-arrows');
    if (arrowsGroup) {
      arrowsGroup.innerHTML = '';

      if (children.length > 0) {
        const sp = cellPositions[clickedPage];
        if (sp) {
          const sx = sp.x + 15; // center x of parent
          const sy = sp.y + 30; // bottom of parent

          // Sort children by x position
          const sortedChildren = [...children].sort((a, b) => cellPositions[a].x - cellPositions[b].x);

          if (clickedPage === 4) {
            // Special case: 4 -> 11, 12 (vertical trunk with left branch)
            // Draw main vertical trunk
            const trunk = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const branchY = sy + 20; // where the branch splits
            trunk.setAttribute('d', `M${sx} ${sy} L${sx} ${cellPositions[12].y}`);
            trunk.setAttribute('stroke', COLORS.prefetch);
            trunk.setAttribute('stroke-width', '1.5');
            trunk.setAttribute('stroke-dasharray', '4 2');
            trunk.setAttribute('fill', 'none');
            trunk.setAttribute('marker-end', 'url(#arrowPrefetch)');
            arrowsGroup.appendChild(trunk);

            // Draw branch to 11 (left)
            const ex11 = cellPositions[11].x + 15;
            const ey11 = cellPositions[11].y;
            const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            branch.setAttribute('d', `M${sx} ${branchY} L${ex11} ${branchY} L${ex11} ${ey11}`);
            branch.setAttribute('stroke', COLORS.prefetch);
            branch.setAttribute('stroke-width', '1.5');
            branch.setAttribute('stroke-dasharray', '4 2');
            branch.setAttribute('fill', 'none');
            branch.setAttribute('marker-end', 'url(#arrowPrefetch)');
            arrowsGroup.appendChild(branch);

          } else if (clickedPage === 7) {
            // Special case: 7 -> 9, 10 (horizontal left lines)
            const startX = sp.x; // left side of parent
            const startY = sp.y + 15; // middle of parent

            // Draw horizontal line going left, then split down to children
            const branchX = cellPositions[10].x + 30 + 5; // right of page 10
            const trunk = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            trunk.setAttribute('d', `M${startX} ${startY} L${branchX} ${startY}`);
            trunk.setAttribute('stroke', COLORS.prefetch);
            trunk.setAttribute('stroke-width', '1.5');
            trunk.setAttribute('stroke-dasharray', '4 2');
            trunk.setAttribute('fill', 'none');
            arrowsGroup.appendChild(trunk);

            // Branch down to 10
            const ex10 = cellPositions[10].x + 15;
            const ey10 = cellPositions[10].y;
            const branch10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            branch10.setAttribute('d', `M${branchX} ${startY} L${ex10} ${startY} L${ex10} ${ey10}`);
            branch10.setAttribute('stroke', COLORS.prefetch);
            branch10.setAttribute('stroke-width', '1.5');
            branch10.setAttribute('stroke-dasharray', '4 2');
            branch10.setAttribute('fill', 'none');
            branch10.setAttribute('marker-end', 'url(#arrowPrefetch)');
            arrowsGroup.appendChild(branch10);

            // Branch down to 9
            const ex9 = cellPositions[9].x + 15;
            const ey9 = cellPositions[9].y;
            const branch9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            branch9.setAttribute('d', `M${ex10} ${startY} L${ex9} ${startY} L${ex9} ${ey9}`);
            branch9.setAttribute('stroke', COLORS.prefetch);
            branch9.setAttribute('stroke-width', '1.5');
            branch9.setAttribute('stroke-dasharray', '4 2');
            branch9.setAttribute('fill', 'none');
            branch9.setAttribute('marker-end', 'url(#arrowPrefetch)');
            arrowsGroup.appendChild(branch9);

          } else {
            // Default: simple orthogonal paths for other cases (1->2,3 etc)
            children.forEach(child => {
              const cp = cellPositions[child];
              if (cp) {
                const ex = cp.x + 15;
                const ey = cp.y;
                const midY = sy + (ey - sy) / 2;

                const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                arrow.setAttribute('d', `M${sx} ${sy} L${sx} ${midY} L${ex} ${midY} L${ex} ${ey}`);
                arrow.setAttribute('stroke', COLORS.prefetch);
                arrow.setAttribute('stroke-width', '1.5');
                arrow.setAttribute('stroke-dasharray', '4 2');
                arrow.setAttribute('fill', 'none');
                arrow.setAttribute('marker-end', 'url(#arrowPrefetch)');
                arrowsGroup.appendChild(arrow);
              }
            });
          }
        }
      }
    }

    const arrowLabel = document.getElementById('pf-arrow-label');
    const status = document.getElementById('pf-status');

    // Update arrows label
    if (arrowLabel) arrowLabel.textContent = 'read(' + clickedPage + ')';

    // Update state 2 - show loading state (orange for children being fetched)
    for (let p = 1; p <= 12; p++) {
      const rect = document.getElementById('p2-rect-' + p);
      const text = document.getElementById('p2-text-' + p);
      if (!rect || !text) continue;

      const loaded = isLoaded(p);
      const isSelected = p === clickedPage;
      const isChild = children.includes(p);

      if (loaded) {
        rect.setAttribute('fill', COLORS.loaded);
        rect.setAttribute('stroke', COLORS.loaded);
        rect.setAttribute('stroke-width', '2');
        text.setAttribute('fill', COLORS.textDark);
        text.setAttribute('font-weight', 'bold');
      } else if (isSelected || isChild) {
        // Selected page and children shown as loading (orange)
        rect.setAttribute('fill', COLORS.loading);
        rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loading);
        rect.setAttribute('stroke-width', isSelected ? '3' : '2');
        text.setAttribute('fill', COLORS.textDark);
        text.setAttribute('font-weight', 'bold');
      } else {
        rect.setAttribute('fill', COLORS.unloaded);
        rect.setAttribute('stroke', COLORS.border);
        rect.setAttribute('stroke-width', '1');
        text.setAttribute('fill', COLORS.textLight);
        text.setAttribute('font-weight', 'normal');
      }
    }

    // Update state 3 - show prefetched children (purple for prefetched, green for loaded)
    for (let p = 1; p <= 12; p++) {
      const rect = document.getElementById('p3-rect-' + p);
      const text = document.getElementById('p3-text-' + p);
      if (!rect || !text) continue;

      const loaded = isLoaded(p);
      const isSelected = p === clickedPage;
      const isChild = children.includes(p);

      if (loaded || isSelected) {
        rect.setAttribute('fill', COLORS.loaded);
        rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loaded);
        rect.setAttribute('stroke-width', isSelected ? '3' : '2');
        text.setAttribute('fill', COLORS.textDark);
        text.setAttribute('font-weight', 'bold');
      } else if (isChild) {
        // Prefetched children now loaded (green)
        rect.setAttribute('fill', COLORS.loaded);
        rect.setAttribute('stroke', COLORS.loaded);
        rect.setAttribute('stroke-width', '2');
        text.setAttribute('fill', COLORS.textDark);
        text.setAttribute('font-weight', 'bold');
      } else {
        rect.setAttribute('fill', COLORS.unloaded);
        rect.setAttribute('stroke', COLORS.border);
        rect.setAttribute('stroke-width', '1');
        text.setAttribute('fill', COLORS.textLight);
        text.setAttribute('font-weight', 'normal');
      }
    }

    // Update status text
    if (status) {
      if (alreadyLoaded) {
        status.textContent = 'Read page ' + clickedPage + ' → already cached locally';
        status.style.color = COLORS.loaded;
      } else if (children.length > 0) {
        status.textContent = 'Read page ' + clickedPage + ' → prefetch ' + children.length + ' child page' + (children.length !== 1 ? 's' : '') + ' (' + children.join(', ') + ')';
        status.style.color = COLORS.loading;
      } else {
        status.textContent = 'Read page ' + clickedPage + ' → leaf node, no children to prefetch';
        status.style.color = COLORS.loading;
      }
    }
  }

  function init() {
    console.log('[prefetch-viz] Init called v3');
    const container = document.getElementById('prefetch-viz');
    if (!container) {
      console.log('[prefetch-viz] Container not found, retrying...');
      setTimeout(init, 500);
      return;
    }
    console.log('[prefetch-viz] Container found');

    // Add click handlers
    for (let p = 1; p <= 12; p++) {
      const cell = document.getElementById('p1-cell-' + p);
      if (cell) {
        console.log('[prefetch-viz] Adding handler for page', p);
        cell.style.cursor = 'pointer';
        cell.onclick = function() {
          updateVisualization(p);
        };
      } else {
        console.log('[prefetch-viz] Cell not found:', 'p1-cell-' + p);
      }
    }

    // Initial render
    updateVisualization(selectedPage);
    console.log('[prefetch-viz] Initialization complete');
  }

  // Try multiple init strategies
  if (document.readyState === 'complete') {
    setTimeout(init, 100);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 100);
    });
    window.addEventListener('load', function() {
      setTimeout(init, 100);
    });
  }
})();
