/**
 * Happy Diwali 3-Screen Greeting Website
 * Pure Vanilla JavaScript (No external libraries)
 * Author: Kaushik
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. STATE & CONSTANTS
  // =========================================================================
  const BLESSINGS_LIST = [
    "May prosperity find you in every step 🪔",
    "May your home be filled with joy and laughter ✨",
    "May good health be your greatest wealth 🌿",
    "May success follow every dream you chase 🚀",
    "May love and peace light up your family 💛",
    "May every worry fade like smoke from a diya 🕯️",
    "May new opportunities knock on your door 🌟",
    "May this year be brighter than the last 🎆"
  ];

  // Lantern layout configurations (8 distinct celestial floating positions)
  const LANTERN_CONFIGS = [
    { left: '10%', top: '16%', width: 38, height: 48, theme: 'theme-gold', delay: '0s', duration: '3.8s', rotMin: '-3deg', rotMax: '3deg' },
    { left: '26%', top: '48%', width: 34, height: 44, theme: 'theme-orange', delay: '1.2s', duration: '4.2s', rotMin: '-2deg', rotMax: '4deg' },
    { left: '44%', top: '12%', width: 44, height: 56, theme: 'theme-pink', delay: '0.6s', duration: '3.5s', rotMin: '-4deg', rotMax: '2deg' },
    { left: '62%', top: '42%', width: 36, height: 46, theme: 'theme-gold', delay: '2.0s', duration: '4.5s', rotMin: '-2deg', rotMax: '3deg' },
    { left: '80%', top: '14%', width: 42, height: 52, theme: 'theme-orange', delay: '0.4s', duration: '3.9s', rotMin: '-3deg', rotMax: '4deg' },
    { left: '14%', top: '64%', width: 30, height: 40, theme: 'theme-pink', delay: '1.8s', duration: '4.0s', rotMin: '-4deg', rotMax: '3deg' },
    { left: '46%', top: '64%', width: 32, height: 42, theme: 'theme-amber', delay: '2.5s', duration: '4.4s', rotMin: '-2deg', rotMax: '2deg' },
    { left: '82%', top: '60%', width: 32, height: 42, theme: 'theme-gold', delay: '1.4s', duration: '3.7s', rotMin: '-3deg', rotMax: '3deg' }
  ];

  let userName = '';
  let openedBlessingsCount = 0;
  let remainingBlessingsDeck = [];
  let toastTimer = null;

  // DOM Elements
  const screens = {
    screen1: document.getElementById('screen1'),
    screen2: document.getElementById('screen2'),
    screen3: document.getElementById('screen3')
  };

  const nameInput = document.getElementById('nameInput');
  const inputWrapper = document.getElementById('inputWrapper');
  const continueBtn = document.getElementById('continueBtn');
  const userNameWish = document.getElementById('userNameWish');
  const receiveBlessingsBtn = document.getElementById('receiveBlessingsBtn');
  const changeNameBtn = document.getElementById('changeNameBtn');

  const lanternSky = document.getElementById('lanternSky');
  const blessingMessage = document.getElementById('blessingMessage');
  const blessingBadgeText = document.getElementById('blessingBadgeText');
  const blessingsCounterText = document.getElementById('blessingsCounterText');
  const counterHint = document.getElementById('counterHint');
  const completionBanner = document.getElementById('completionBanner');
  const replayBtn = document.getElementById('replayBtn');
  const shareBtn = document.getElementById('shareBtn');
  const copyWishBtn = document.getElementById('copyWishBtn');

  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  const starsLayer = document.getElementById('starsLayer');
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  // =========================================================================
  // 2. STAR GENERATOR (60 Twinkling Dots across Night Sky)
  // =========================================================================
  function initNightSkyStars() {
    starsLayer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star-dot';
      
      const size = Math.random() < 0.2 ? 3 : (Math.random() < 0.6 ? 2 : 1.2);
      const posX = (Math.random() * 100).toFixed(2);
      const posY = (Math.random() * 100).toFixed(2);
      const duration = (2 + Math.random() * 3.5).toFixed(2);
      const delay = (Math.random() * 4).toFixed(2);
      const opacity = (0.3 + Math.random() * 0.7).toFixed(2);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      star.style.opacity = opacity;

      // Color variation between gold, warm cream, and diamond white
      if (i % 3 === 0) {
        star.style.background = '#ffc94d';
      } else if (i % 3 === 1) {
        star.style.background = '#fff4d6';
      } else {
        star.style.background = '#ffffff';
      }

      fragment.appendChild(star);
    }
    starsLayer.appendChild(fragment);
  }

  // =========================================================================
  // 3. SYNTHESIZED CRACKER SOUND EFFECT (Pure Web Audio API, Zero Assets)
  // =========================================================================
  let audioContext = null;

  function playCrackerSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const now = audioContext.currentTime;

      // 1. Noise Burst for Firecracker "Pop"
      const bufferLength = Math.floor(audioContext.sampleRate * 0.08); // 80ms
      const buffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferLength * 0.25));
      }

      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = buffer;

      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1200 + Math.random() * 400, now);
      bandpass.Q.setValueAtTime(3.5, now);

      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noiseSource.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      noiseSource.start(now);

      // 2. Gentle Festive Bell Chime harmonic
      const chime = audioContext.createOscillator();
      const chimeGain = audioContext.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(784 + Math.random() * 200, now); // G5 / A5
      chimeGain.gain.setValueAtTime(0.08, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      chime.connect(chimeGain);
      chimeGain.connect(audioContext.destination);
      chime.start(now);
      chime.stop(now + 0.25);
    } catch (e) {
      // Audio playback fails gracefully if blocked by browser policy
    }
  }

  // =========================================================================
  // 4. CANVAS PARTICLE CRACKER BURST SYSTEM (~25 sparks per lantern tap)
  // =========================================================================
  let particles = [];
  let isAnimationRunning = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class CrackerSpark {
    constructor(x, y, baseColor) {
      this.x = x;
      this.y = y;
      
      // Radial explosion velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 6.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      // Particle physics & visuals
      this.gravity = 0.12;
      this.drag = 0.96;
      this.size = 2 + Math.random() * 3;
      this.alpha = 1;
      this.decay = 0.02 + Math.random() * 0.025;

      // Spark color selection
      const sparkPalette = [
        '#ffc94d', '#ffea79', '#ff8c1a', '#ffffff', '#ffd166', '#f43f5e', '#e040fb'
      ];
      this.color = baseColor || sparkPalette[Math.floor(Math.random() * sparkPalette.length)];
      this.trail = [];
      this.maxTrail = 3;
    }

    update() {
      this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
      if (this.trail.length > this.maxTrail) {
        this.trail.shift();
      }

      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw(context) {
      if (this.alpha <= 0) return;

      // Draw faint spark trail
      for (let i = 0; i < this.trail.length; i++) {
        const point = this.trail[i];
        context.save();
        context.globalAlpha = point.alpha * 0.4;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(point.x, point.y, this.size * 0.6, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      // Draw active bright spark
      context.save();
      context.globalAlpha = Math.max(0, this.alpha);
      context.fillStyle = this.color;
      context.shadowColor = this.color;
      context.shadowBlur = 8;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }

  function spawnCrackerBurst(originX, originY, baseColor) {
    const sparkCount = 26; // Spawns ~25-26 particles
    for (let i = 0; i < sparkCount; i++) {
      particles.push(new CrackerSpark(originX, originY, baseColor));
    }
    if (!isAnimationRunning) {
      isAnimationRunning = true;
      requestAnimationFrame(renderParticles);
    }
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(renderParticles);
    } else {
      isAnimationRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // =========================================================================
  // 4. SCREEN NAVIGATION & TRANSITIONS
  // =========================================================================
  function showScreen(targetScreenId) {
    Object.keys(screens).forEach((key) => {
      const screenEl = screens[key];
      if (key === targetScreenId) {
        screenEl.classList.add('active');
        screenEl.setAttribute('aria-hidden', 'false');
      } else {
        screenEl.classList.remove('active');
        screenEl.setAttribute('aria-hidden', 'true');
      }
    });

    // Trigger celebration fireworks when Screen 2 is opened
    if (targetScreenId === 'screen2') {
      setTimeout(triggerScreen2Fireworks, 220);
    }

    // Scroll to top of app shell smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function triggerScreen2Fireworks() {
    const wrapper = document.querySelector('.wish-celebration-wrapper');
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const leftX = Math.max(20, rect.left);
    const rightX = Math.min(window.innerWidth - 20, rect.right);
    const midY = rect.top + rect.height / 2;

    // Sidewise bursts flanking the greeting
    spawnCrackerBurst(leftX, midY, '#ffc94d');
    spawnCrackerBurst(rightX, midY, '#ff8c1a');
    playCrackerSound();

    setTimeout(() => {
      spawnCrackerBurst(leftX - 10, midY - 25, '#ffd166');
      spawnCrackerBurst(rightX + 10, midY - 25, '#f43f5e');
    }, 320);

    setTimeout(() => {
      spawnCrackerBurst(leftX + 15, midY + 30, '#ff8c1a');
      spawnCrackerBurst(rightX - 15, midY + 30, '#ffea79');
      playCrackerSound();
    }, 650);
  }

  // =========================================================================
  // 5. SCREEN 1 LOGIC (NAME INPUT & PREFILL)
  // =========================================================================
  // Check URL parameters for ?name=
  function checkUrlForName() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlName = urlParams.get('name');
      if (urlName && urlName.trim()) {
        const sanitized = urlName.trim().slice(0, 32);
        nameInput.value = sanitized;
      }
    } catch (e) {
      console.warn('URL parsing error:', e);
    }
  }

  // Handle continuing from Screen 1 to Screen 2
  function handleNameSubmit() {
    const rawVal = nameInput.value.trim();

    if (!rawVal) {
      // Don't continue on empty name; shake input instead
      triggerShakeAnimation();
      nameInput.focus();
      return;
    }

    userName = rawVal;

    // ESCAPE AND SET NAME: CRITICAL REQUIREMENT
    // Escape the name with textContent, never innerHTML
    userNameWish.textContent = userName;

    // Transition smoothly to Screen 2
    showScreen('screen2');
  }

  function triggerShakeAnimation() {
    inputWrapper.classList.remove('shake-error');
    // Force DOM reflow to allow consecutive shakes
    void inputWrapper.offsetWidth;
    inputWrapper.classList.add('shake-error');

    setTimeout(() => {
      inputWrapper.classList.remove('shake-error');
    }, 500);
  }

  // Event Listeners for Screen 1
  continueBtn.addEventListener('click', handleNameSubmit);

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameSubmit();
    }
  });

  // =========================================================================
  // 6. SCREEN 2 LOGIC (WISH & SACRED GREETING)
  // =========================================================================
  receiveBlessingsBtn.addEventListener('click', () => {
    showScreen('screen3');
  });

  changeNameBtn.addEventListener('click', () => {
    showScreen('screen1');
    nameInput.focus();
  });

  // =========================================================================
  // 7. SCREEN 3 LOGIC (FLOATING LANTERNS & BLESSINGS)
  // =========================================================================
  // Shuffle helper to randomize blessings without repeating
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Build/Reset the 8 paper lanterns
  function setupLanterns() {
    lanternSky.innerHTML = '';
    openedBlessingsCount = 0;
    remainingBlessingsDeck = shuffleArray(BLESSINGS_LIST);

    // Reset Counter UI
    updateCounterDisplay();
    completionBanner.style.display = 'none';
    counterHint.style.display = 'block';

    blessingBadgeText.textContent = 'REVEALED BLESSING';
    blessingMessage.textContent = '“Tap any glowing lantern above to burst it and reveal your Diwali blessing!”';

    // Create 8 Paper Lanterns
    LANTERN_CONFIGS.forEach((config, index) => {
      const lantern = document.createElement('div');
      lantern.className = `lantern-item ${config.theme}`;
      lantern.setAttribute('role', 'button');
      lantern.setAttribute('tabindex', '0');
      lantern.setAttribute('aria-label', `Paper lantern ${index + 1} of 8. Tap to open blessing.`);

      lantern.style.left = config.left;
      lantern.style.top = config.top;
      lantern.style.width = `${config.width}px`;
      lantern.style.setProperty('--float-duration', config.duration);
      lantern.style.setProperty('--float-delay', config.delay);
      lantern.style.setProperty('--rot-min', config.rotMin);
      lantern.style.setProperty('--rot-max', config.rotMax);

      lantern.innerHTML = `
        <div class="lantern-glow"></div>
        <div class="lantern-cap-top"></div>
        <div class="lantern-body" style="height: ${config.height}px; width: 100%;">
          <div class="lantern-core-light"></div>
        </div>
        <div class="lantern-cap-bottom"></div>
        <div class="lantern-tassel"></div>
      `;

      // Tap / Click Handler
      const onPop = (e) => {
        e.stopPropagation();
        popLantern(lantern, config);
      };

      lantern.addEventListener('click', onPop);
      lantern.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPop(e);
        }
      });

      lanternSky.appendChild(lantern);
    });
  }

  function popLantern(lanternEl, config) {
    if (lanternEl.dataset.popped === 'true') return;
    lanternEl.dataset.popped = 'true';

    // Get position of lantern for canvas burst coordinates
    const rect = lanternEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Pick spark base color based on theme
    let sparkColor = '#ffc94d';
    if (config.theme === 'theme-orange') sparkColor = '#ff8c1a';
    if (config.theme === 'theme-pink') sparkColor = '#f43f5e';
    if (config.theme === 'theme-amber') sparkColor = '#ffd166';

    // 1. Burst like a cracker: spawn 25-26 particles & play audio
    spawnCrackerBurst(centerX, centerY, sparkColor);
    playCrackerSound();

    // 2. Animate lantern burst and remove
    lanternEl.classList.add('lantern-bursting');
    setTimeout(() => {
      lanternEl.remove();
    }, 240);

    // 3. Pick ONE blessing without repeating
    const revealedBlessing = remainingBlessingsDeck.pop();
    openedBlessingsCount++;

    // 4. Update blessing card with fade-in
    revealBlessing(revealedBlessing, openedBlessingsCount);

    // 5. Update counter
    updateCounterDisplay();

    // 6. Check if all 8 opened
    if (openedBlessingsCount >= 8) {
      handleAllBlessingsOpened();
    }
  }

  function revealBlessing(text, index) {
    blessingMessage.style.opacity = '0';

    setTimeout(() => {
      blessingBadgeText.textContent = `REVEALED BLESSING #${index}`;
      blessingMessage.textContent = `“${text}”`;
      blessingMessage.style.opacity = '1';
    }, 180);
  }

  function updateCounterDisplay() {
    blessingsCounterText.innerHTML = `<strong>${openedBlessingsCount} of 8</strong> blessings opened`;
  }

  function handleAllBlessingsOpened() {
    counterHint.style.display = 'none';

    setTimeout(() => {
      completionBanner.style.display = 'block';
      // Grand celebratory finale burst
      const rect = lanternSky.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      spawnCrackerBurst(centerX - 60, centerY - 20, '#ffc94d');
      spawnCrackerBurst(centerX + 60, centerY + 20, '#ff8c1a');
      spawnCrackerBurst(centerX, centerY - 40, '#f43f5e');
    }, 400);
  }

  // Replay Button resets lanterns
  replayBtn.addEventListener('click', () => {
    setupLanterns();
  });

  // =========================================================================
  // 8. SHARE & COPY BLESSING FUNCTIONALITY
  // =========================================================================
  function getShareableUrl() {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const cleanName = userName || nameInput.value.trim() || 'Friend';
    return `${origin}${pathname}?name=${encodeURIComponent(cleanName)}`;
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareUrl = getShareableUrl();
      const shareData = {
        title: 'Happy Diwali Greeting ✨',
        text: `Wishing you a radiant Diwali filled with light, joy and blessings! Open this celestial greeting:`,
        url: shareUrl
      };

      // Use navigator.share on mobile when available
      if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(shareUrl, 'Link copied! 🎉');
          }
        }
      } else {
        // Fallback: Copy link to clipboard
        copyToClipboard(shareUrl, 'Link copied to clipboard! 🎉');
      }
    });
  }

  copyWishBtn.addEventListener('click', () => {
    const textToCopy = blessingMessage.textContent.replace(/^“|”$/g, '').trim();
    if (textToCopy && !textToCopy.startsWith('Tap any')) {
      copyToClipboard(textToCopy, 'Blessing copied! ✨');
    } else {
      showToast('Tap a lantern first! 🪔');
    }
  });

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMsg))
        .catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    try {
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = text;
      tempTextArea.style.position = 'fixed';
      tempTextArea.style.left = '-9999px';
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      showToast(successMsg);
    } catch (err) {
      showToast('Could not copy link');
    }
  }

  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastText.textContent = message;
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 9. INITIALIZATION
  // =========================================================================
  initNightSkyStars();
  checkUrlForName();
  setupLanterns();
});

