// Segment Size Visualization - Interactive Demo
// Version: 6 - updated captions
console.log('[segment-viz] Script loaded v6');

(function() {
  const COLORS = {
    loaded: '#1ebca1',
    loading: '#f97316',
    unloaded: '#2a2a4a',
    border: '#3a3a5a',
    highlight: '#fbbf24',
    textDark: '#0a0a0a',
    textLight: '#6b7280'
  };

  const initialLoaded = new Set([1, 2, 3, 6]);
  let selectedPage = 7;

  function getSegment(page) {
    const segStart = Math.floor((page - 1) / 4) * 4 + 1;
    return [segStart, segStart + 1, segStart + 2, segStart + 3];
  }

  function isLoaded(page) {
    return initialLoaded.has(page);
  }

  function updateVisualization(clickedPage) {
    console.log('[segment-viz] Page clicked:', clickedPage);
    selectedPage = clickedPage;
    const isAlreadyLoaded = isLoaded(clickedPage);
    const segment = getSegment(clickedPage);

    // Update state 1 - highlight selected page
    for (let p = 1; p <= 12; p++) {
      const rect = document.getElementById('s1-rect-' + p);
      const text = document.getElementById('s1-text-' + p);
      if (!rect || !text) continue;

      const loaded = isLoaded(p);
      const isSelected = p === clickedPage;

      if (loaded) {
        rect.setAttribute('fill', COLORS.loaded);
        rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loaded);
        rect.setAttribute('stroke-width', isSelected ? '3' : '2');
        text.setAttribute('fill', COLORS.textDark);
        text.setAttribute('font-weight', 'bold');
      } else {
        rect.setAttribute('fill', COLORS.unloaded);
        rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.border);
        rect.setAttribute('stroke-width', isSelected ? '3' : '1');
        text.setAttribute('fill', isSelected ? COLORS.highlight : COLORS.textLight);
        text.setAttribute('font-weight', isSelected ? 'bold' : 'normal');
      }
    }

    const state2 = document.getElementById('seg-state-2');
    const state3 = document.getElementById('seg-state-3');
    const arrow1 = document.getElementById('seg-arrow-1');
    const arrow2 = document.getElementById('seg-arrow-2');
    const alreadyLoadedMsg = document.getElementById('seg-already-loaded');
    const status = document.getElementById('seg-status');

    if (isAlreadyLoaded) {
      if (arrow1) arrow1.style.opacity = '0.3';
      if (arrow2) arrow2.style.opacity = '0.3';
      if (alreadyLoadedMsg) alreadyLoadedMsg.style.display = 'none';
      if (status) {
        status.textContent = 'Read page ' + clickedPage + ' → already cached locally';
        status.style.color = COLORS.loaded;
      }

      const arrowLabel = document.getElementById('seg-arrow-label');
      if (arrowLabel) arrowLabel.textContent = '';

      const segLabel = document.getElementById('seg-segment-label');
      if (segLabel) segLabel.textContent = '';

      // Update state 2 and 3 to show current state (no loading)
      for (let p = 1; p <= 12; p++) {
        const rect2 = document.getElementById('s2-rect-' + p);
        const text2 = document.getElementById('s2-text-' + p);
        const rect3 = document.getElementById('s3-rect-' + p);
        const text3 = document.getElementById('s3-text-' + p);
        const loaded = isLoaded(p);
        const isSelected = p === clickedPage;

        // State 2: show current loaded state
        if (rect2) {
          if (loaded) {
            rect2.setAttribute('fill', COLORS.loaded);
            rect2.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loaded);
            rect2.setAttribute('stroke-width', isSelected ? '3' : '2');
          } else {
            rect2.setAttribute('fill', COLORS.unloaded);
            rect2.setAttribute('stroke', COLORS.border);
            rect2.setAttribute('stroke-width', '1');
          }
        }
        if (text2) {
          text2.setAttribute('fill', loaded ? COLORS.textDark : COLORS.textLight);
          text2.setAttribute('font-weight', loaded ? 'bold' : 'normal');
        }

        // State 3: same as state 2 (no change from current)
        if (rect3) {
          if (loaded) {
            rect3.setAttribute('fill', COLORS.loaded);
            rect3.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loaded);
            rect3.setAttribute('stroke-width', isSelected ? '3' : '2');
          } else {
            rect3.setAttribute('fill', COLORS.unloaded);
            rect3.setAttribute('stroke', COLORS.border);
            rect3.setAttribute('stroke-width', '1');
          }
        }
        if (text3) {
          text3.setAttribute('fill', loaded ? COLORS.textDark : COLORS.textLight);
          text3.setAttribute('font-weight', loaded ? 'bold' : 'normal');
        }
      }

      // Hide brackets
      for (let i = 1; i <= 3; i++) {
        const bracket = document.getElementById('s2-bracket-' + i);
        if (bracket) bracket.style.opacity = '0';
      }
    } else {
      if (state2) state2.style.opacity = '1';
      if (state3) state3.style.opacity = '1';
      if (arrow1) arrow1.style.opacity = '1';
      if (arrow2) arrow2.style.opacity = '1';
      if (alreadyLoadedMsg) alreadyLoadedMsg.style.display = 'none';

      const arrowLabel = document.getElementById('seg-arrow-label');
      if (arrowLabel) arrowLabel.textContent = 'read(' + clickedPage + ')';

      // Update state 2
      console.log('[segment-viz] Updating state 2 for segment:', segment);
      for (let p = 1; p <= 12; p++) {
        const rect = document.getElementById('s2-rect-' + p);
        const text = document.getElementById('s2-text-' + p);
        if (!rect) {
          console.log('[segment-viz] s2-rect-' + p + ' not found');
          continue;
        }
        if (!text) {
          console.log('[segment-viz] s2-text-' + p + ' not found');
        }

        const loaded = isLoaded(p);
        const inSegment = segment.includes(p);
        const isSelected = p === clickedPage;

        if (loaded) {
          // Already loaded pages stay green (even if in segment)
          rect.setAttribute('fill', COLORS.loaded);
          rect.setAttribute('stroke', COLORS.loaded);
          rect.setAttribute('stroke-width', '2');
          if (text) {
            text.setAttribute('fill', COLORS.textDark);
            text.setAttribute('font-weight', 'bold');
          }
        } else if (inSegment) {
          // Pages in segment that need to be fetched - orange
          rect.setAttribute('fill', COLORS.loading);
          rect.setAttribute('stroke', isSelected ? COLORS.highlight : COLORS.loading);
          rect.setAttribute('stroke-width', isSelected ? '3' : '2');
          if (text) {
            text.setAttribute('fill', COLORS.textDark);
            text.setAttribute('font-weight', 'bold');
          }
        } else {
          // Unloaded pages (not in current segment) - dark
          rect.setAttribute('fill', COLORS.unloaded);
          rect.setAttribute('stroke', COLORS.border);
          rect.setAttribute('stroke-width', '1');
          if (text) {
            text.setAttribute('fill', COLORS.textLight);
            text.setAttribute('font-weight', 'normal');
          }
        }
      }

      // Update brackets
      for (let i = 1; i <= 3; i++) {
        const bracket = document.getElementById('s2-bracket-' + i);
        if (bracket) {
          bracket.style.opacity = i === Math.ceil(clickedPage / 4) ? '1' : '0';
        }
      }

      // Update state 3
      console.log('[segment-viz] Updating state 3 for segment:', segment);
      for (let p = 1; p <= 12; p++) {
        const rect = document.getElementById('s3-rect-' + p);
        const text = document.getElementById('s3-text-' + p);
        if (!rect) {
          console.log('[segment-viz] s3-rect-' + p + ' not found');
          continue;
        }

        const loaded = isLoaded(p);
        const inSegment = segment.includes(p);
        const isSelected = p === clickedPage;
        const wasJustLoaded = inSegment && !loaded;

        if (loaded || inSegment) {
          // All loaded pages (initial + newly fetched) - green
          rect.setAttribute('fill', COLORS.loaded);
          if (isSelected) {
            rect.setAttribute('stroke', COLORS.highlight);
            rect.setAttribute('stroke-width', '3');
          } else if (wasJustLoaded) {
            rect.setAttribute('stroke', '#2ed9b8');
            rect.setAttribute('stroke-width', '2');
          } else {
            rect.setAttribute('stroke', COLORS.loaded);
            rect.setAttribute('stroke-width', '2');
          }
          if (text) {
            text.setAttribute('fill', COLORS.textDark);
            text.setAttribute('font-weight', 'bold');
          }
        } else {
          // Still unloaded pages - dark
          rect.setAttribute('fill', COLORS.unloaded);
          rect.setAttribute('stroke', COLORS.border);
          rect.setAttribute('stroke-width', '1');
          if (text) {
            text.setAttribute('fill', COLORS.textLight);
            text.setAttribute('font-weight', 'normal');
          }
        }
      }

      const segLabel = document.getElementById('seg-segment-label');
      if (segLabel) segLabel.textContent = 'segment ' + segment[0] + '-' + segment[3];

      // Count how many pages actually need to be fetched
      const pagesToFetch = segment.filter(p => !isLoaded(p)).length;

      if (status) {
        status.textContent = 'Read page ' + clickedPage + ' → fetch segment ' + segment[0] + '-' + segment[3] + ' (' + pagesToFetch + ' new page' + (pagesToFetch !== 1 ? 's' : '') + ')';
        status.style.color = COLORS.loading;
      }
    }
  }

  function init() {
    console.log('[segment-viz] Init called');
    const container = document.getElementById('seg-viz');
    if (!container) {
      console.log('[segment-viz] Container not found, retrying...');
      setTimeout(init, 500);
      return;
    }
    console.log('[segment-viz] Container found');

    // Add click handlers
    for (let p = 1; p <= 12; p++) {
      const cell = document.getElementById('s1-cell-' + p);
      if (cell) {
        console.log('[segment-viz] Adding handler for page', p);
        cell.style.cursor = 'pointer';
        cell.onclick = function() {
          updateVisualization(p);
        };
      }
    }

    // Initial render
    updateVisualization(selectedPage);
    console.log('[segment-viz] Initialization complete');
  }

  // Try multiple init strategies
  if (document.readyState === 'complete') {
    console.log('[segment-viz] DOM already complete');
    setTimeout(init, 100);
  } else {
    console.log('[segment-viz] Waiting for DOM');
    document.addEventListener('DOMContentLoaded', function() {
      console.log('[segment-viz] DOMContentLoaded fired');
      setTimeout(init, 100);
    });
    window.addEventListener('load', function() {
      console.log('[segment-viz] Window load fired');
      setTimeout(init, 100);
    });
  }
})();
