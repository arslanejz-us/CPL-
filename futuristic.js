/* ════════════════════════════════════════════════════════════
   FUTURISTIC INTERACTIVE LAYER — Ticksol
   Theme toggle · AI assistant · Wishlist · Currency converter ·
   Live ticker · Package search/filter/voice · Toasts · Cursor glow
   ════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ---------- TOASTS ---------- */
  function toast(msg, icon){
    icon = icon || 'fa-circle-check';
    const stack = document.getElementById('toast-stack');
    if(!stack) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<i class="fa ' + icon + '"></i><span>' + msg + '</span>';
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 400);
    }, 3200);
  }
  window.ticksolToast = toast;

  /* ---------- THEME TOGGLE ---------- */
  const themeBtn = document.getElementById('theme-toggle-btn');
  function applyTheme(dark){
    document.body.classList.toggle('theme-dark', dark);
    if(themeBtn) themeBtn.querySelector('i').className = dark ? 'fa fa-sun' : 'fa fa-moon';
    try{ localStorage.setItem('ticksol-theme', dark ? 'dark' : 'light'); }catch(e){}
  }
  try{
    const saved = localStorage.getItem('ticksol-theme');
    if(saved === 'dark') applyTheme(true);
  }catch(e){}
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains('theme-dark'));
      toast(document.body.classList.contains('theme-dark') ? 'Futuristic dark mode on' : 'Light mode on', 'fa-moon');
    });
  }

  /* ---------- LIVE TICKER ---------- */
  const tickerItems = [
    {icon:'fa-plane-departure', text:'Ahmed from Lahore just booked Dubai Getaway'},
    {icon:'fa-passport', text:'Fatima from Karachi got her Schengen visa approved'},
    {icon:'fa-umbrella-beach', text:'12 travelers booked Maldives Paradise this week'},
    {icon:'fa-mosque', text:'Group of 6 confirmed Umrah package for next month'},
    {icon:'fa-star', text:'Rated 4.9/5 by 5,000+ happy travelers'},
    {icon:'fa-briefcase', text:'200+ corporate clients trust Ticksol for business travel'},
    {icon:'fa-mountain', text:'Hunza Valley tour fully booked for this weekend'},
    {icon:'fa-bolt', text:'Flash deal: up to 20% off select packages this week'}
  ];
  const track = document.getElementById('live-ticker-track');
  if(track){
    function renderTicker(){
      track.innerHTML = tickerItems.concat(tickerItems).map(t =>
        '<span><i class="fa ' + t.icon + '"></i>' + t.text + '</span>'
      ).join('');
    }
    renderTicker();
  }

  /* ---------- PACKAGE SEARCH / FILTER / VOICE ---------- */
  const pkgCards = Array.from(document.querySelectorAll('.pkg-card'));
  const searchInput = document.getElementById('pkg-search-input');
  const statusEl = document.getElementById('pkg-search-status');
  const chips = document.querySelectorAll('.pkg-filter-chips .chip');
  let activeFilter = 'all';

  function filterPackages(){
    const q = (searchInput && searchInput.value || '').trim().toLowerCase();
    let visible = 0;
    pkgCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matchesText = !q || text.includes(q);
      const matchesFilter = activeFilter === 'all' || text.includes(activeFilter.toLowerCase());
      const show = matchesText && matchesFilter;
      card.classList.toggle('pkg-hidden', !show);
      if(show) visible++;
    });
    if(statusEl){
      statusEl.textContent = (q || activeFilter !== 'all')
        ? (visible + ' package' + (visible === 1 ? '' : 's') + ' found')
        : '';
    }
  }
  if(searchInput) searchInput.addEventListener('input', filterPackages);
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      filterPackages();
    });
  });

  const voiceBtn = document.getElementById('pkg-voice-btn');
  if(voiceBtn){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){
      voiceBtn.addEventListener('click', () => toast('Voice search isn\'t supported in this browser', 'fa-circle-exclamation'));
    } else {
      const rec = new SR();
      rec.lang = 'en-US';
      rec.interimResults = false;
      voiceBtn.addEventListener('click', () => {
        voiceBtn.classList.add('listening');
        try{ rec.start(); }catch(e){}
      });
      rec.addEventListener('result', (e) => {
        const transcript = e.results[0][0].transcript;
        if(searchInput){ searchInput.value = transcript; filterPackages(); }
        toast('Searching for "' + transcript + '"', 'fa-microphone');
      });
      rec.addEventListener('end', () => voiceBtn.classList.remove('listening'));
      rec.addEventListener('error', () => voiceBtn.classList.remove('listening'));
    }
  }

  /* ---------- WISHLIST ---------- */
  let wishlist = [];
  try{ wishlist = JSON.parse(localStorage.getItem('ticksol-wishlist') || '[]'); }catch(e){ wishlist = []; }
  const wishCountEl = document.getElementById('wishlist-count');

  // Registry of every injected heart button so we can keep them in sync
  // with the wishlist no matter where an item gets removed from.
  const heartButtonRegistry = [];

  function syncHeartButtons(){
    heartButtonRegistry.forEach(entry => {
      const saved = wishlist.some(w => w.name === entry.name);
      entry.btn.classList.toggle('saved', saved);
    });
  }

  function saveWishlist(){
    try{ localStorage.setItem('ticksol-wishlist', JSON.stringify(wishlist)); }catch(e){}
    if(wishCountEl) wishCountEl.textContent = wishlist.length;
    const wbtn = document.getElementById('wishlist-btn');
    if(wbtn) wbtn.classList.toggle('active-heart', wishlist.length > 0);
    syncHeartButtons();
    renderWishlistDrawer();
  }

  function renderWishlistDrawer(){
    const body = document.getElementById('wishlist-body');
    const footer = document.getElementById('wishlist-footer');
    const bookAllCount = document.getElementById('wishlist-book-all-count');
    if(!body) return;
    if(wishlist.length === 0){
      body.innerHTML = '<div class="wishlist-empty"><i class="fa fa-heart-crack" style="font-size:28px;display:block;margin-bottom:10px;opacity:.4;"></i>No saved items yet.<br>Tap the ❤ on any destination, package, or visa card to save it here.</div>';
      if(footer) footer.classList.remove('show');
      return;
    }
    body.innerHTML = wishlist.map((w, i) =>
      '<div class="wishlist-item">' +
        '<div class="wishlist-item-row">' +
          (w.img ? '<img src="' + w.img + '" alt="" />' : '<div style="width:56px;height:56px;border-radius:10px;background:linear-gradient(135deg,#F5C518,#E6A800);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">' + (w.emoji || '📍') + '</div>') +
          '<div style="flex:1;min-width:0;">' +
            '<div class="wishlist-item-name">' + w.name + '</div>' +
            '<div class="wishlist-item-cat">' + w.cat + '</div>' +
            '<span class="wishlist-item-section">' + (w.section || 'Saved') + '</span>' +
          '</div>' +
          '<button class="wishlist-item-remove" data-idx="' + i + '" aria-label="Remove"><i class="fa fa-trash"></i></button>' +
        '</div>' +
        '<button class="wishlist-item-book" data-idx="' + i + '"><i class="fa fa-paper-plane"></i> Book Now</button>' +
      '</div>'
    ).join('');
    body.querySelectorAll('.wishlist-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const removed = wishlist.splice(idx, 1)[0];
        saveWishlist();
        if(removed) toast(removed.name + ' removed from favourites', 'fa-heart-crack');
      });
    });
    body.querySelectorAll('.wishlist-item-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.idx, 10);
        const item = wishlist[idx];
        if(!item) return;
        closeWishlist();
        if(typeof openTripPlanner === 'function') openTripPlanner(e, item.name);
      });
    });
    if(footer){
      footer.classList.toggle('show', wishlist.length > 1);
    }
    if(bookAllCount) bookAllCount.textContent = wishlist.length;
  }

  const wishlistBookAllBtn = document.getElementById('wishlist-book-all');
  if(wishlistBookAllBtn){
    wishlistBookAllBtn.addEventListener('click', (e) => {
      if(wishlist.length === 0) return;
      const names = wishlist.map(w => w.name).join(', ');
      closeWishlist();
      if(typeof openTripPlanner === 'function') openTripPlanner(e, names);
    });
  }

  // Universal heart injector
  function injectHearts(selector, imgWrapSelector, nameSelector, catFn, sectionLabel, emoji){
    document.querySelectorAll(selector).forEach(card => {
      const imgWrap = card.querySelector(imgWrapSelector);
      const nameEl = card.querySelector(nameSelector);
      const imgEl = card.querySelector('img');
      if(!imgWrap || !nameEl) return;
      const name = nameEl.textContent.trim();
      const cat = catFn(card);
      const img = imgEl ? imgEl.getAttribute('src') : '';
      const heartBtn = document.createElement('button');
      heartBtn.className = 'pkg-heart-btn';
      heartBtn.setAttribute('aria-label', 'Save ' + name + ' to favourites');
      heartBtn.innerHTML = '<i class="fa fa-heart"></i>';
      const isSaved = () => wishlist.some(w => w.name === name);
      if(isSaved()) heartBtn.classList.add('saved');
      heartButtonRegistry.push({ name, btn: heartBtn });
      heartBtn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const idx = wishlist.findIndex(w => w.name === name);
        if(idx > -1){
          wishlist.splice(idx, 1);
          heartBtn.classList.remove('saved');
          toast(name + ' removed from favourites', 'fa-heart-crack');
        } else {
          wishlist.push({name, cat, img, section: sectionLabel, emoji: emoji || ''});
          heartBtn.classList.add('saved');
          toast(name + ' added to favourites ❤', 'fa-heart');
        }
        saveWishlist();
      });
      imgWrap.appendChild(heartBtn);
    });
  }

  // Inject hearts — Tour Packages
  injectHearts('.pkg-card', '.pkg-img', 'h3',
    card => { const t = card.querySelector('.tag'); return t ? t.textContent.trim() : 'Tour Package'; },
    '✈ Tour Packages', '✈️');

  // Inject hearts — Popular Destinations
  injectHearts('.dest-card:not(.any-dest-card)', '.dest-img', '.dest-name',
    () => 'Destination',
    '📍 Popular Destinations', '📍');

  // Inject hearts — Spiritual / Religious Tours
  injectHearts('.spirit-card:not(.spirit-any-card)', '.spirit-img', 'h3',
    () => 'Spiritual Tour',
    '🕌 Spiritual Tours', '🕌');

  // Inject hearts — Visa Services
  injectHearts('.visa-card', '.visa-img', 'h3',
    () => 'Visa Service',
    '🛂 Visa Services', '🛂');

  saveWishlist();

  const wishlistBtn = document.getElementById('wishlist-btn');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistOverlay = document.getElementById('wishlist-overlay');
  const wishlistClose = document.getElementById('wishlist-close');
  function openWishlist(){ wishlistDrawer.classList.add('open'); wishlistOverlay.classList.add('open'); }
  function closeWishlist(){ wishlistDrawer.classList.remove('open'); wishlistOverlay.classList.remove('open'); }
  if(wishlistBtn) wishlistBtn.addEventListener('click', openWishlist);
  if(wishlistClose) wishlistClose.addEventListener('click', closeWishlist);
  if(wishlistOverlay) wishlistOverlay.addEventListener('click', closeWishlist);

  /* ---------- EXIT-INTENT OFFER ---------- */
  const exitModal = document.getElementById('exit-modal');
  let exitShown = false;
  try{ exitShown = sessionStorage.getItem('ticksol-exit-shown') === '1'; }catch(e){}
  function showExitModal(){
    if(exitShown || !exitModal) return;
    exitShown = true;
    try{ sessionStorage.setItem('ticksol-exit-shown', '1'); }catch(e){}
    exitModal.classList.add('open');
  }
  document.addEventListener('mouseout', (e) => {
    if(!e.relatedTarget && e.clientY < 10) showExitModal();
  });
  setTimeout(() => { /* mobile fallback: show once after a while if not shown */ }, 0);
  const exitClose = document.getElementById('exit-modal-close');
  const exitCta = document.getElementById('exit-modal-cta');
  if(exitClose) exitClose.addEventListener('click', () => exitModal.classList.remove('open'));
  if(exitModal) exitModal.addEventListener('click', (e) => { if(e.target === exitModal) exitModal.classList.remove('open'); });
  if(exitCta) exitCta.addEventListener('click', () => {
    exitModal.classList.remove('open');
  });

  /* ---------- CURSOR GLOW ---------- */
  const glow = document.getElementById('cursor-glow');
  if(glow && window.matchMedia('(hover:hover)').matches){
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('show');
    });
    document.addEventListener('mouseleave', () => glow.classList.remove('show'));
    document.querySelectorAll('a, button, .pkg-card, .chip').forEach(el => {
      el.addEventListener('mouseenter', () => glow.classList.add('grow'));
      el.addEventListener('mouseleave', () => glow.classList.remove('grow'));
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-card');
  if('IntersectionObserver' in window && revealEls.length){
    revealEls.forEach(el => el.classList.add('fx-init'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('fx-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- BACK-TO-TOP PROGRESS RING ---------- */
  const backTop = document.getElementById('back-top');
  if(backTop){
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0;
      backTop.style.setProperty('--scrollpct', pct.toFixed(1));
    });
  }

})();

/* ═══════════════════════════════════════════════════════════════
   HOW-TO-BOOK BANNER — realistic + futuristic toy globe (Three.js)
   Pure decoration: textured Earth sphere with a neon tech ring and
   orbiting satellite dot, smooth momentum drag-spin. No booking
   logic attached. Texture is embedded as base64 (see
   globe-texture-data.js) so it never depends on a file path or
   network request resolving correctly.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  let toyInitDone = false;
  let toyInitAttempts = 0;
  const MAX_INIT_ATTEMPTS = 20; // ~4s of retrying at 200ms if THREE.js is slow to load

  // Quick, safe feature check — never throws.
  function webglIsSupported() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  // Replace the globe with a calm, static fallback instead of a blank box or console error.
  function showGlobeFallback(container, needsRefreshHint) {
    if (!container) return;
    container.innerHTML =
      '<div class="htb-toy-globe-fallback" aria-hidden="true">🌍</div>';
    const label = container.parentElement
      ? container.parentElement.querySelector('.htb-toy-globe-label')
      : null;
    if (label) {
      label.textContent = needsRefreshHint ? 'Refresh the page to view' : 'Give it a spin!';
    }
  }

  function initToyGlobe3D() {
    const container = document.getElementById('htbToyGlobe');
    if (!container || toyInitDone) return;

    if (typeof THREE === 'undefined') {
      toyInitAttempts++;
      if (toyInitAttempts > MAX_INIT_ATTEMPTS) {
        // Three.js never loaded (blocked script, offline, slow CDN) — fail gracefully.
        toyInitDone = true;
        showGlobeFallback(container, true);
        return;
      }
      setTimeout(initToyGlobe3D, 200);
      return;
    }

    if (!webglIsSupported()) {
      toyInitDone = true;
      showGlobeFallback(container, false);
      return;
    }

    toyInitDone = true;

    try {
      buildToyGlobe(container);
    } catch (err) {
      console.warn('Toy globe failed to initialize, showing fallback instead:', err);
      showGlobeFallback(container, true);
    }
  }

  function buildToyGlobe(container) {
    const w = container.clientWidth || 150;
    const h = container.clientHeight || 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.z = 4.3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    // If the GPU/browser drops the WebGL context mid-session, stop cleanly
    // and show the fallback instead of leaving a frozen/black canvas.
    let contextLost = false;
    renderer.domElement.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      contextLost = true;
      showGlobeFallback(container, true);
    }, false);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xfff3d6, 1.3);
    key.position.set(3, 2, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x34e1e8, 0.4); // brand neon-cyan rim light
    rim.position.set(-3, -1, -2);
    scene.add(rim);

    // ── Earth sphere ──
    const geometry = new THREE.SphereGeometry(1, 48, 48);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1c3a5e, // ocean-blue fallback shown briefly while the texture decodes
      specular: new THREE.Color(0x556677),
      shininess: 16
    });
    const globe = new THREE.Mesh(geometry, material);
    globe.rotation.z = 0.41; // ~23.4° axial tilt, like the real Earth
    globe.rotation.y = 3.4;  // start roughly on an interesting continent
    scene.add(globe);

    // Texture is embedded as a base64 data URI (window.TICKSOL_TOY_GLOBE_TEXTURE)
    // so it renders correctly regardless of hosting path/subfolder setup.
    const textureData = window.TICKSOL_TOY_GLOBE_TEXTURE;
    if (textureData) {
      try {
        new THREE.TextureLoader().load(
          textureData,
          (tex) => {
            tex.anisotropy = 4;
            material.map = tex;
            material.color.set(0xffffff);
            material.needsUpdate = true;
          },
          undefined,
          (err) => { console.warn('Toy globe texture failed to decode:', err); }
        );
      } catch (err) {
        console.warn('Toy globe texture load threw, continuing with flat color:', err);
      }
    }

    // ── Atmosphere glow: soft cyan-to-gold fresnel-style rim ──
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x34e1e8, transparent: true, opacity: 0.12, side: THREE.BackSide })
    );
    scene.add(atmosphere);
    const atmosphereOuter = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0xF5C518, transparent: true, opacity: 0.05, side: THREE.BackSide })
    );
    scene.add(atmosphereOuter);

    // ── Futuristic tech ring, tilted like an orbital band ──
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0x34e1e8, transparent: true, opacity: 0.55 })
    );
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.y = 0.3;
    scene.add(ring);

    const ringInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.007, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xF5C518, transparent: true, opacity: 0.35 })
    );
    ringInner.rotation.x = Math.PI / 2.3;
    ringInner.rotation.y = 0.3;
    scene.add(ringInner);

    // ── Tiny orbiting satellite dot riding the outer ring ──
    const orbitPivot = new THREE.Object3D();
    orbitPivot.rotation.x = Math.PI / 2.3;
    orbitPivot.rotation.y = 0.3;
    scene.add(orbitPivot);

    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    satellite.position.set(1.55, 0, 0);
    orbitPivot.add(satellite);
    const satelliteGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x34e1e8, transparent: true, opacity: 0.35 })
    );
    satellite.add(satelliteGlow);

    // ── Smooth physics: idle auto-spin + momentum drag ──
    let velocityX = 0.0036;   // idle rotation speed (radians/frame) — 2x default speed
    let velocityY = 0;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let lastMoveTime = 0;
    let flickVX = 0, flickVY = 0;

    function pointerDown(e) {
      dragging = true;
      velocityX = 0;
      velocityY = 0;
      const p = ('touches' in e) ? e.touches[0] : e;
      lastX = p.clientX;
      lastY = p.clientY;
      lastMoveTime = performance.now();
      container.style.cursor = 'grabbing';
    }
    function pointerMove(e) {
      if (!dragging) return;
      const p = ('touches' in e) ? e.touches[0] : e;
      const now = performance.now();
      const dt = Math.max(now - lastMoveTime, 1);
      const dx = p.clientX - lastX;
      const dy = p.clientY - lastY;

      globe.rotation.y += dx * 0.008;
      globe.rotation.x += dy * 0.008;
      globe.rotation.x = Math.max(-1.1, Math.min(1.1, globe.rotation.x));
      atmosphere.rotation.copy(globe.rotation);
      atmosphereOuter.rotation.copy(globe.rotation);

      flickVX = (dx * 0.008) / (dt / 16.7);
      flickVY = (dy * 0.008) / (dt / 16.7);

      lastX = p.clientX;
      lastY = p.clientY;
      lastMoveTime = now;
      e.preventDefault();
    }
    function pointerUp() {
      if (!dragging) return;
      dragging = false;
      container.style.cursor = 'grab';
      // hand off momentum, gently clamp so it eventually settles into idle drift
      velocityX = Math.max(-0.09, Math.min(0.09, flickVX));
      velocityY = Math.max(-0.06, Math.min(0.06, flickVY));
    }

    container.addEventListener('mousedown', pointerDown);
    container.addEventListener('touchstart', pointerDown, { passive: true });
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('touchmove', pointerMove, { passive: false });
    window.addEventListener('mouseup', pointerUp);
    window.addEventListener('touchend', pointerUp);

    const IDLE_SPEED = 0.0036; // 2x default speed
    const FRICTION = 0.965;
    let animateFailed = false;

    function animate() {
      if (contextLost || animateFailed || !document.body.contains(container)) return;
      requestAnimationFrame(animate);

      try {
        // satellite orbits independently of drag/spin — always-on futuristic motion
        orbitPivot.rotation.z += 0.018;
        ring.rotation.z += 0.0009;
        ringInner.rotation.z -= 0.0006;

        if (!dragging) {
          globe.rotation.y += velocityX;
          globe.rotation.x += velocityY;
          atmosphere.rotation.copy(globe.rotation);
          atmosphereOuter.rotation.copy(globe.rotation);

          // decay momentum smoothly back toward gentle idle spin
          velocityX *= FRICTION;
          velocityY *= FRICTION;
          if (Math.abs(velocityY) < 0.0002) velocityY *= 0.9;

          if (Math.abs(velocityX) < IDLE_SPEED) {
            velocityX += (IDLE_SPEED - velocityX) * 0.01;
          }
        }

        renderer.render(scene, camera);
      } catch (err) {
        // Stop the loop instead of spamming errors every frame; show fallback once.
        animateFailed = true;
        console.warn('Toy globe render loop failed, showing fallback instead:', err);
        showGlobeFallback(container, true);
      }
    }
    animate();

    function onResize() {
      try {
        const nw = container.clientWidth, nh = container.clientHeight;
        if (!nw || !nh) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      } catch (err) {
        // Non-fatal — just skip this resize tick.
      }
    }
    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToyGlobe3D);
  } else {
    initToyGlobe3D();
  }
})();
