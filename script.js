/**
 * Extreme UI — Material Pixel Style UI Script
 * Powers the Google Pixel device simulator, Material You Monet dynamic theming,
 * Pixel "At a Glance" contextual cards, Themed Icons, and presets engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Clock & Pixel Date Engine
  const phoneClock = document.getElementById('phone-live-clock');
  const phoneStatusTime = document.getElementById('phone-status-time');
  const phoneDate = document.getElementById('phone-live-date');

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    if (phoneClock) phoneClock.textContent = timeString;
    if (phoneStatusTime) phoneStatusTime.textContent = timeString;

    if (phoneDate) {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      phoneDate.textContent = now.toLocaleDateString('en-US', options);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // 2. Wallpaper Collections (Google Pixel Nature & Material Abstract Gradients)
  const wallpapers = [
    'linear-gradient(135deg, #132438 0%, #1e3a5f 50%, #0e1726 100%)', // Pixel Bay Dunes
    'linear-gradient(135deg, #14281d 0%, #1f422e 50%, #0d1a13 100%)', // Pixel Sage Hazel
    'linear-gradient(135deg, #2b1218 0%, #4a1e28 50%, #14090c 100%)', // Pixel Coral Rose
    'linear-gradient(135deg, #26200f 0%, #453716 50%, #120e06 100%)', // Pixel Porcelain Amber
    'linear-gradient(135deg, #111318 0%, #1f232b 50%, #0c0e12 100%)'  // Pixel Obsidian Slate
  ];

  const phoneScreen = document.getElementById('phone-screen');
  const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');

  wallpaperThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      wallpaperThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const bgIndex = parseInt(thumb.getAttribute('data-bg'), 10);
      if (phoneScreen && wallpapers[bgIndex]) {
        phoneScreen.style.background = wallpapers[bgIndex];
      }
    });
  });

  // 3. Material You Palette Switcher
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const phoneWrapper = document.getElementById('phone-mockup-wrapper');

  swatchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.getAttribute('data-theme');
      
      // Update simulator wrapper and document element
      if (phoneWrapper) {
        phoneWrapper.setAttribute('data-theme', theme);
      }
      document.documentElement.setAttribute('data-theme', theme);
    });
  });

  // 4. Widget Switcher (At a Glance, Now Playing, Telemetry, Daily Task)
  const widgetTabs = document.querySelectorAll('.widget-tab-btn');
  const widgetSlots = {
    glance: document.getElementById('widget-glance-view'),
    music: document.getElementById('widget-music-view'),
    stats: document.getElementById('widget-stats-view'),
    bento: document.getElementById('widget-bento-view')
  };

  widgetTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      widgetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetWidget = tab.getAttribute('data-widget');

      Object.entries(widgetSlots).forEach(([name, el]) => {
        if (!el) return;
        if (name === targetWidget) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      });
    });
  });

  // 5. Icon Pack Switcher
  const iconTabs = document.querySelectorAll('.icon-tab-btn');
  const phoneIconsGrid = document.getElementById('phone-icons-grid');

  iconTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      iconTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const styleClass = tab.getAttribute('data-icon-style');

      if (phoneIconsGrid) {
        phoneIconsGrid.className = 'phone-icons-grid ' + styleClass;
      }
    });
  });

  // 6. Dynamic Capsule / Pixel Live Island Mode
  const island = document.getElementById('phone-camera-island');
  const islandTabs = document.querySelectorAll('.island-tab-btn');
  const islandContent = document.getElementById('island-content');

  const islandStates = {
    idle: {
      html: '<span class="island-camera-dot"></span>',
      expanded: false
    },
    music: {
      html: `
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:20px;height:20px;border-radius:50%;background:var(--accent-primary);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--md-on-primary);">♪</div>
          <div style="font-size:11px;font-weight:600;">Daylight • Harry Styles</div>
        </div>
        <div style="display:flex;align-items:center;gap:3px;">
          <span style="width:3px;height:12px;background:var(--accent-primary);border-radius:2px;animation:pulsePill 1s infinite;"></span>
          <span style="width:3px;height:8px;background:var(--accent-primary);border-radius:2px;animation:pulsePill 1s infinite 0.2s;"></span>
          <span style="width:3px;height:14px;background:var(--accent-primary);border-radius:2px;animation:pulsePill 1s infinite 0.4s;"></span>
        </div>
      `,
      expanded: true
    },
    charging: {
      html: `
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="color:#b4d1b8;font-size:12px;">⚡</span>
          <span style="font-size:11px;font-weight:700;">Pixel Rapid Charging</span>
        </div>
        <div style="font-size:11px;font-weight:700;color:var(--accent-primary);">88%</div>
      `,
      expanded: true
    },
    nav: {
      html: `
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="color:var(--accent-primary);font-size:12px;">↗</span>
          <span style="font-size:11px;font-weight:600;">Turn Right on Market St</span>
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.7);">150m</div>
      `,
      expanded: true
    }
  };

  function setCapsuleState(stateKey) {
    if (!island || !islandStates[stateKey]) return;
    const state = islandStates[stateKey];
    
    if (state.expanded) {
      island.classList.add('expanded');
    } else {
      island.classList.remove('expanded');
    }

    if (islandContent) {
      islandContent.innerHTML = state.html;
    }
  }

  islandTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      islandTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const stateKey = tab.getAttribute('data-island');
      setCapsuleState(stateKey);
    });
  });

  // Tap directly on island inside phone to cycle modes
  let currentIslandIdx = 0;
  const islandSequence = ['idle', 'music', 'charging', 'nav'];
  if (island) {
    island.addEventListener('click', () => {
      currentIslandIdx = (currentIslandIdx + 1) % islandSequence.length;
      const nextState = islandSequence[currentIslandIdx];
      setCapsuleState(nextState);
      
      islandTabs.forEach(t => {
        if (t.getAttribute('data-island') === nextState) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });
    });
  }

  // 7. Interactive Music Player Button inside widget
  const playBtn = document.getElementById('music-play-toggle');
  let isPlaying = true;
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.innerHTML = isPlaying ? '⏸' : '▶';
    });
  }

  // 8. Preset Showcase Filter & "Apply to Simulator"
  const filterBtns = document.querySelectorAll('.filter-btn');
  const presetCards = document.querySelectorAll('.preset-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      presetCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // "Apply Preset" Buttons
  const applyPresetBtns = document.querySelectorAll('.btn-apply-preset');
  applyPresetBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const theme = btn.getAttribute('data-preset-theme');
      const widget = btn.getAttribute('data-preset-widget');
      const iconStyle = btn.getAttribute('data-preset-icons');
      const bgIdx = parseInt(btn.getAttribute('data-preset-bg'), 10);

      // Trigger Theme
      const matchingSwatch = document.querySelector(`.swatch-btn[data-theme="${theme}"]`);
      if (matchingSwatch) matchingSwatch.click();

      // Trigger Widget
      const matchingWidgetTab = document.querySelector(`.widget-tab-btn[data-widget="${widget}"]`);
      if (matchingWidgetTab) matchingWidgetTab.click();

      // Trigger Icon style
      const matchingIconTab = document.querySelector(`.icon-tab-btn[data-icon-style="${iconStyle}"]`);
      if (matchingIconTab) matchingIconTab.click();

      // Trigger Wallpaper
      const matchingWallpaper = document.querySelector(`.wallpaper-thumb[data-bg="${bgIdx}"]`);
      if (matchingWallpaper) matchingWallpaper.click();

      // Scroll smoothly to simulator
      const simulatorEl = document.getElementById('live-simulator');
      if (simulatorEl) {
        simulatorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Quick visual feedback on button
      const originalText = btn.textContent;
      btn.textContent = '✓ Applied to Pixel!';
      btn.style.background = 'var(--accent-primary)';
      btn.style.color = 'var(--md-on-primary)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    });
  });

  // 9. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 10. Download Modal
  const downloadBtns = document.querySelectorAll('.open-download-modal');
  const modalBackdrop = document.getElementById('download-modal');
  const modalClose = document.getElementById('modal-close-btn');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalBackdrop) modalBackdrop.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modalBackdrop) modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // 11. Copy Checksum helper
  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text);
        const prev = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => { btn.innerText = prev; }, 1800);
      }
    });
  });

  // 12. Navbar Scroll Glass Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
