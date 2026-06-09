document.addEventListener('DOMContentLoaded', () => {
  // Force scroll to top on reload
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // 1. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // 2. Active Header Navigation Link
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    navLinks.forEach(link => {
      const text = link.textContent.trim().toUpperCase();
      if (text === 'PRODUCT') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // 3. Dynamic CCTV Timestamps & Blinking Effects
  const feedItems = document.querySelectorAll('.feed-item');
  feedItems.forEach((item, index) => {
    // Add dynamic time element
    const overlay = item.querySelector('.feed-overlay');
    const timeDisplay = document.createElement('div');
    timeDisplay.style.fontFamily = 'var(--font-mono)';
    timeDisplay.style.fontSize = '9px';
    timeDisplay.style.color = 'rgba(255, 255, 255, 0.4)';
    timeDisplay.style.marginTop = '4px';
    timeDisplay.classList.add('feed-timestamp');
    overlay.appendChild(timeDisplay);

    // Update time counter
    setInterval(() => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const ms = String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);
      timeDisplay.textContent = `${dateStr} ${timeStr}.${ms} | FPS: ${index === 1 ? '14' : '29.9'}`;
    }, 66);
  });

  // 4. Glitch Effect on Text Headers (Periodically & On Hover)
  const glitchTargets = document.querySelectorAll('.hero-title, .about-quote, .cta-title, .pending-label, .char-name');
  
  const glitchText = (el) => {
    const originalText = el.getAttribute('data-original') || el.innerText;
    if (!el.getAttribute('data-original')) {
      el.setAttribute('data-original', originalText);
    }

    if (el.glitchInterval) {
      clearInterval(el.glitchInterval);
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$*()[]<>+=%';
    let iterations = 0;
    let ticks = 0;
    const scrambleDurationTicks = 5;  // Scramble fully for 5 ticks (~250ms)
    const resolveDurationTicks = 3;   // Smoothly resolve over 3 ticks (~150ms)
    const resolveStep = originalText.length / resolveDurationTicks;
    
    el.glitchInterval = setInterval(() => {
      el.innerText = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '\n') return char;
          if (index < iterations) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (ticks >= scrambleDurationTicks) {
        iterations += resolveStep;
      }
      
      if (iterations >= originalText.length) {
        clearInterval(el.glitchInterval);
        el.glitchInterval = null;
        el.innerText = originalText;
      }
      ticks++;
    }, 50);
  };

  // Add mouse cursor hover scramble effect on Hero VOID Title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.cursor = 'pointer'; // Make it look interactive
    heroTitle.addEventListener('mouseenter', () => {
      glitchText(heroTitle);
      heroTitle.classList.add('glitch-active');
      setTimeout(() => heroTitle.classList.remove('glitch-active'), 500);
    });
  }

  // Add mouse cursor hover scramble effect on Character Names
  const charNames = document.querySelectorAll('.char-name');
  charNames.forEach(name => {
    name.style.cursor = 'pointer';
    name.addEventListener('mouseenter', () => {
      glitchText(name);
    });
  });

  // Trigger random glitches every 6-10 seconds
  setInterval(() => {
    const target = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
    if (target) {
      glitchText(target);
      target.classList.add('glitch-active');
      setTimeout(() => target.classList.remove('glitch-active'), 500);
    }
  }, 7000);

  // 5. Interactive Protocol Console Modal
  const protocolBtn = document.querySelector('.protocol-btn');
  
  // Create Console Modal Elements
  const modal = document.createElement('div');
  modal.classList.add('console-modal');
  modal.innerHTML = `
    <div class="console-screen">
      <div class="console-header">
        <span>VOID SYSTEM PROTOCOLS VER_2.4.9</span>
        <button class="console-close-btn">&times; CLOSE</button>
      </div>
      <div class="console-body">
        <div class="console-log"></div>
        <div class="console-input-line">
          <span class="console-prompt">VOID_SYS_ARCHIVE:\\></span>
          <span class="console-cursor">_</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const logContainer = modal.querySelector('.console-log');
  const closeBtn = modal.querySelector('.console-close-btn');

  const logLines = [
    'CONNECTING TO VOID DATABASE...',
    'AUTHORIZING SESSION: ADMIN_DEGRADED',
    'ACCESS GRANTED (LEVEL 3)',
    '--------------------------------------------------',
    'DUMPING CORE SYSTEM STATUS...',
    'SYSTEM_STATUS: CORRUPTED',
    'PROTOCOL_01: PARADISE_INIT [OK]',
    'PROTOCOL_02: COMPLIANCE_MONITOR [DEGRADED]',
    'PROTOCOL_03: MEMORY_INTEGRITY [CRITICAL_ERR]',
    'PROTOCOL_04: SOCIAL_DISTORTION [ACTIVE_THREAT]',
    'PROTOCOL_05: OBSERVATORY_COLLAPSE [RUNNING]',
    'PROTOCOL_06: ESCAPE_DIRECTIVE [LOCKED]',
    '--------------------------------------------------',
    'WARNING: HUMAN OBJECT DETECTION DETECTED IN SECTOR 4.',
    'WARNING: PLAYER ATTEMPTING EXTERNAL ESCAPE.',
    'SECURITY_LOCKDOWN: INITIATED',
    '--------------------------------------------------',
    'THERE IS NO ESCAPE GRANTED.',
    'SYSTEM ABORTING...',
    'VOID IS WAITING.'
  ];

  const typeLogs = () => {
    logContainer.innerHTML = '';
    let i = 0;
    
    const printNextLine = () => {
      if (i < logLines.length) {
        const line = document.createElement('p');
        line.classList.add('log-line');
        if (logLines[i].includes('WARNING') || logLines[i].includes('CRITICAL_ERR') || logLines[i].includes('NO ESCAPE')) {
          line.classList.add('error');
        } else if (logLines[i].includes('[OK]')) {
          line.classList.add('success');
        }
        logContainer.appendChild(line);
        
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex < logLines[i].length) {
            line.textContent += logLines[i][charIndex];
            charIndex++;
            setTimeout(typeChar, 10);
          } else {
            i++;
            logContainer.scrollTop = logContainer.scrollHeight;
            setTimeout(printNextLine, 150);
          }
        };
        typeChar();
      }
    };
    printNextLine();
  };

  protocolBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('open');
    typeLogs();
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });

  // Wishlist and Demo buttons feedback
  const wishlistBtn = document.getElementById('btn-wishlist');
  const demoBtn = document.getElementById('btn-demo');

  const triggerGlow = (btn) => {
    btn.style.borderColor = 'var(--color-accent)';
    btn.style.boxShadow = '0 0 25px rgba(150, 7, 3, 0.6)';
    setTimeout(() => {
      btn.style.borderColor = '';
      btn.style.boxShadow = '';
    }, 1500);
  };

  wishlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerGlow(wishlistBtn);
    const span = wishlistBtn.querySelector('span');
    const originalText = span.textContent;
    span.textContent = 'WISHLISTED_';
    setTimeout(() => {
      span.textContent = originalText;
    }, 2000);
  });

  demoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerGlow(demoBtn);
    const span = demoBtn.querySelector('span');
    const originalText = span.textContent;
    span.textContent = 'DOWNLOADING DEMO...';
    setTimeout(() => {
      span.textContent = originalText;
    }, 2500);
  });

  // 6. Protocols Scroll-jacking Deck Slider (Desktop only)
  let currentProtocolIndex = 0;
  let isProtocolLocked = false;
  let isTransitioning = false;
  let lockCooldown = false;

  const protocolsSection = document.getElementById('protocols');
  const protocolRows = protocolsSection.querySelectorAll('.protocol-row');

  // Permanently initialize deck-mode on load for desktop widths
  const initDeckMode = () => {
    if (window.innerWidth >= 1025) {
      protocolsSection.classList.add('deck-mode');
      updateActiveRow(currentProtocolIndex);
    } else {
      protocolsSection.classList.remove('deck-mode');
      isProtocolLocked = false;
      // Clean classes on mobile
      protocolRows.forEach(row => row.classList.remove('active-row'));
    }
  };

  function updateActiveRow(index) {
    protocolsSection.setAttribute('data-active-index', index);
    protocolRows.forEach((row, idx) => {
      if (idx === index - 1) {
        row.classList.add('active-row');
        const textElements = row.querySelectorAll('.protocol-num, .protocol-name, .protocol-desc');
        textElements.forEach(el => glitchText(el));
      } else {
        row.classList.remove('active-row');
      }
    });
  }

  initDeckMode();
  window.addEventListener('resize', initDeckMode);

  // 6.5 Characters Scroll-jacking Deck Slider variables
  let currentCharacterIndex = 0;
  let isCharacterLocked = false;
  let isCharTransitioning = false;
  let charLockCooldown = false;

  const charactersSection = document.getElementById('characters');
  const charDots = document.querySelectorAll('.char-dot');
  const charSlides = document.querySelectorAll('.character-slide');

  const updateActiveCharacter = (index) => {
    charDots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    charSlides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
        const nameEl = slide.querySelector('.char-name');
        if (nameEl) glitchText(nameEl);
      } else {
        slide.classList.remove('active');
      }
    });
  };

  const lockCharScrollAt = (index) => {
    isCharacterLocked = true;
    currentCharacterIndex = index;
    updateActiveCharacter(currentCharacterIndex);
    
    window.scrollTo({
      top: charactersSection.offsetTop,
      behavior: 'smooth'
    });

    isCharTransitioning = true;
    setTimeout(() => {
      isCharTransitioning = false;
    }, 1000);
  };

  const changeCharacter = (newIndex) => {
    isCharTransitioning = true;
    charactersSection.classList.add('glitching');
    setTimeout(() => {
      currentCharacterIndex = newIndex;
      updateActiveCharacter(currentCharacterIndex);
    }, 200);

    setTimeout(() => {
      charactersSection.classList.remove('glitching');
      isCharTransitioning = false;
    }, 800);
  };

  const unlockCharScroll = () => {
    isCharacterLocked = false;
    charLockCooldown = true;
    setTimeout(() => {
      charLockCooldown = false;
    }, 1200);
  };

  // Wheel interceptor on window (Handles both Protocols and Characters sections)
  window.addEventListener('wheel', (e) => {
    if (window.innerWidth < 1025) return;

    // --- PROTOCOLS SECTION LOCK ---
    const rect = protocolsSection.getBoundingClientRect();
    if (!isProtocolLocked && !lockCooldown && !isCharacterLocked) {
      if (e.deltaY > 0 && rect.top < window.innerHeight - 50 && rect.bottom > window.innerHeight) {
        lockScrollAt(0);
        e.preventDefault();
        return;
      }
      else if (e.deltaY < 0 && rect.bottom > 50 && rect.top < 0) {
        lockScrollAt(6);
        e.preventDefault();
        return;
      }
    }

    if (isProtocolLocked) {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        if (currentProtocolIndex < 6) {
          e.preventDefault();
          changeProtocol(currentProtocolIndex + 1);
        } else {
          unlockScroll('down');
        }
      } else if (e.deltaY < 0) {
        if (currentProtocolIndex > 0) {
          e.preventDefault();
          changeProtocol(currentProtocolIndex - 1);
        } else {
          unlockScroll('up');
        }
      }
      return;
    }

    // --- CHARACTERS SECTION LOCK ---
    const charRect = charactersSection.getBoundingClientRect();
    if (!isCharacterLocked && !charLockCooldown && !isProtocolLocked) {
      if (e.deltaY > 0 && charRect.top < window.innerHeight - 50 && charRect.bottom > window.innerHeight) {
        lockCharScrollAt(0);
        e.preventDefault();
        return;
      }
      else if (e.deltaY < 0 && charRect.bottom > 50 && charRect.top < 0) {
        lockCharScrollAt(2);
        e.preventDefault();
        return;
      }
    }

    if (isCharacterLocked) {
      if (isCharTransitioning) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        if (currentCharacterIndex < 2) {
          e.preventDefault();
          changeCharacter(currentCharacterIndex + 1);
        } else {
          unlockCharScroll();
        }
      } else if (e.deltaY < 0) {
        if (currentCharacterIndex > 0) {
          e.preventDefault();
          changeCharacter(currentCharacterIndex - 1);
        } else {
          unlockCharScroll();
        }
      }
    }
  }, { passive: false });

  // Touch event locking for laptop trackpads
  window.addEventListener('touchmove', (e) => {
    if (isProtocolLocked || isCharacterLocked) {
      e.preventDefault();
    }
  }, { passive: false });

  // Reset lock when clicking navigation links in the header
  const navClickables = document.querySelectorAll('.nav-links a, .logo, .protocol-btn');
  navClickables.forEach(link => {
    link.addEventListener('click', () => {
      isProtocolLocked = false;
      lockCooldown = true;
      protocolsSection.classList.remove('glitching');

      isCharacterLocked = false;
      charLockCooldown = true;
      if (charactersSection) charactersSection.classList.remove('glitching');
      
      // Temporary cooldown to allow smooth navigation scrolling
      setTimeout(() => {
        lockCooldown = false;
        charLockCooldown = false;
      }, 1500);
    });
  });

  function lockScrollAt(index) {
    isProtocolLocked = true;
    currentProtocolIndex = index;
    updateActiveRow(currentProtocolIndex);
    
    // Smoothly snap section to top
    window.scrollTo({
      top: protocolsSection.offsetTop,
      behavior: 'smooth'
    });

    // Pause scrolling to let the user see the section header/current card
    isTransitioning = true;
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
  }

  function changeProtocol(newIndex) {
    isTransitioning = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      currentProtocolIndex = newIndex;
      updateActiveRow(currentProtocolIndex);
      isTransitioning = false;
      return;
    }

    protocolsSection.classList.add('glitching');

    setTimeout(() => {
      // Switch active protocol index mid-way
      currentProtocolIndex = newIndex;
      updateActiveRow(currentProtocolIndex);
    }, 200);

    setTimeout(() => {
      protocolsSection.classList.remove('glitching');
      isTransitioning = false;
    }, 800);
  }

  function unlockScroll(direction) {
    isProtocolLocked = false;
    lockCooldown = true;

    // Cooldown prevents immediate re-locking while scrolling past
    setTimeout(() => {
      lockCooldown = false;
    }, 1200);
  }

  // 7. Interactive Surveillance Feed Lightbox
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox-overlay');
  lightbox.innerHTML = `
    <div class="lightbox-scanline"></div>
    <div class="lightbox-header">
      <div class="lightbox-cam-info">
        <div class="lightbox-status-dot"></div>
        <span class="lightbox-cam-id">CAM_00_UNKNOWN</span>
      </div>
      <span class="lightbox-cam-time">YYYY-MM-DD HH:MM:SS.MS</span>
      <button class="lightbox-close-btn">&times; [ ESC ] CLOSE</button>
    </div>
    
    <div class="lightbox-main">
      <button class="lightbox-nav-btn prev-btn">&lt; PREV</button>
      
      <div class="lightbox-content-wrap">
        <div class="lightbox-img-container">
          <img class="lightbox-img" src="" alt="">
        </div>
        <div class="lightbox-caption">Loading...</div>
      </div>
      
      <button class="lightbox-nav-btn next-btn">NEXT &gt;</button>
    </div>
    
    <div class="lightbox-footer">
      <span class="lightbox-sys-msg">SYSTEM STATUS: LINKING DECRYPTED SOURCE FEED...</span>
      <span class="lightbox-counter">FEED [0/0]</span>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxCamId = lightbox.querySelector('.lightbox-cam-id');
  const lightboxCamTime = lightbox.querySelector('.lightbox-cam-time');
  const lightboxCloseBtn = lightbox.querySelector('.lightbox-close-btn');
  const lightboxPrevBtn = lightbox.querySelector('.prev-btn');
  const lightboxNextBtn = lightbox.querySelector('.next-btn');
  const lightboxSysMsg = lightbox.querySelector('.lightbox-sys-msg');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');

  let currentFeedIndex = 0;
  let lightboxInterval = null;

  const updateLightboxContent = (index) => {
    const item = feedItems[index];
    if (!item) return;

    // Glitch effect on image update
    lightboxImg.classList.add('glitching');
    
    const imgSrc = item.querySelector('.feed-img-wrap img').getAttribute('src');
    const imgAlt = item.querySelector('.feed-img-wrap img').getAttribute('alt');
    const label = item.querySelector('.feed-label').textContent.trim();
    const statusTxt = item.querySelector('.feed-status-txt').textContent.trim();

    lightboxImg.setAttribute('src', imgSrc);
    lightboxImg.setAttribute('alt', imgAlt);
    lightboxCaption.textContent = label;
    lightboxCamId.textContent = statusTxt;
    lightboxCounter.textContent = `FEED [${index + 1}/${feedItems.length}]`;
    
    // Simulate system code name change
    lightboxSysMsg.textContent = `SYSTEM STATUS: MONITORING ${statusTxt} // DECRYPTING DATA...`;

    setTimeout(() => {
      lightboxImg.classList.remove('glitching');
    }, 250);
  };

  const startLightboxTime = (index) => {
    if (lightboxInterval) clearInterval(lightboxInterval);
    lightboxInterval = setInterval(() => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const ms = String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);
      const fpsStr = index === 1 ? '14' : '29.9';
      lightboxCamTime.textContent = `${dateStr} ${timeStr}.${ms} | FPS: ${fpsStr}`;
    }, 66);
  };

  const openLightbox = (index) => {
    currentFeedIndex = index;
    updateLightboxContent(currentFeedIndex);
    startLightboxTime(currentFeedIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent scrolling behind
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lightboxInterval) {
      clearInterval(lightboxInterval);
      lightboxInterval = null;
    }
  };

  // Click handler for each surveillance item
  feedItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // Controls inside lightbox
  lightboxCloseBtn.addEventListener('click', closeLightbox);
  
  lightboxPrevBtn.addEventListener('click', () => {
    currentFeedIndex = (currentFeedIndex - 1 + feedItems.length) % feedItems.length;
    updateLightboxContent(currentFeedIndex);
    startLightboxTime(currentFeedIndex);
  });

  lightboxNextBtn.addEventListener('click', () => {
    currentFeedIndex = (currentFeedIndex + 1) % feedItems.length;
    updateLightboxContent(currentFeedIndex);
    startLightboxTime(currentFeedIndex);
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      lightboxPrevBtn.click();
    } else if (e.key === 'ArrowRight') {
      lightboxNextBtn.click();
    }
  });

  // Click on background to close (excluding controls and image wrapper)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-main') || e.target === lightbox.querySelector('.lightbox-content-wrap')) {
      closeLightbox();
    }
  });

  // 8. Character Selection Pagination (Zelda Style Layout)
  charDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-char-index'));
      currentCharacterIndex = index;
      updateActiveCharacter(index);
    });
  });
});
