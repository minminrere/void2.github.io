/**
 * TypewriterText Web Component
 * 
 * Core Idea:
 * This self-contained component implements a premium, highly accessible "Typewriter" effect in pure vanilla HTML, CSS, and JS.
 * It dynamically types out content one character at a time with a blinking terminal-style caret. 
 * By utilizing standard custom elements, it encapsulates behavior and style while fully adapting to parent text formatting.
 * Accessibility is prioritized: it provides screen readers with the full text instantly (using a visually hidden element)
 * and completely bypasses typing animations for users who prefer reduced motion. Additionally, an IntersectionObserver 
 * optimizes performance by automatically pausing heavy typing and blinking loops whenever the element is off-screen.
 */

class TypewriterText extends HTMLElement {
  static get observedAttributes() {
    return ['speed', 'pause', 'loop'];
  }

  constructor() {
    super();
    this.originalText = '';
    this.charIndex = 0;
    this.typingTimeout = null;
    this.isIntersecting = false;
    this.isDeleting = false;
    
    this.handleIntersection = this.handleIntersection.bind(this);
    this.tick = this.tick.bind(this);
  }

  connectedCallback() {
    this.initializeContent();
    
    // Inject component styles
    TypewriterText.injectStyles();
    
    // Setup IntersectionObserver to avoid rendering loops when offscreen
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.05
    });
    this.observer.observe(this);
    
    // Accessibility Listener for OS-level preferences
    this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleMotionPreference();
    this.reducedMotionQuery.addEventListener('change', () => this.handleMotionPreference());
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (this.originalText) {
      this.resetAnimation();
    }
  }

  initializeContent() {
    if (!this.originalText) {
      // Normalize internal text content by stripping extra whitespaces
      this.originalText = this.textContent.trim().replace(/\s+/g, ' ');
    }
    
    // Strict Accessibility: Use screen-reader visible layer that remains static and 
    // a secondary dynamic layer decorated with aria-hidden to prevent assistive spam
    this.innerHTML = `
      <span class="sr-only">${this.originalText}</span>
      <span class="typewriter-visible" aria-hidden="true">
        <span class="typewriter-content"></span><span class="typewriter-cursor"></span>
      </span>
    `;
    
    this.visibleSpan = this.querySelector('.typewriter-content');
    this.cursorSpan = this.querySelector('.typewriter-cursor');
  }

  get speed() {
    const val = parseInt(this.getAttribute('speed'));
    return isNaN(val) ? 90 : Math.max(30, Math.min(250, val));
  }

  get pause() {
    const val = parseInt(this.getAttribute('pause'));
    return isNaN(val) ? 1400 : Math.max(200, Math.min(4000, val));
  }

  get loop() {
    return this.getAttribute('loop') === 'true';
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      this.isIntersecting = entry.isIntersecting;
      if (this.isIntersecting) {
        this.resumeAnimation();
      } else {
        this.pauseAnimation();
      }
    });
  }

  handleMotionPreference() {
    if (this.reducedMotionQuery.matches) {
      this.pauseAnimation();
      if (this.visibleSpan) this.visibleSpan.textContent = this.originalText;
      if (this.cursorSpan) this.cursorSpan.style.display = 'none';
    } else {
      if (this.cursorSpan) this.cursorSpan.style.display = '';
      this.resetAnimation();
    }
  }

  resetAnimation() {
    this.pauseAnimation();
    this.charIndex = 0;
    this.isDeleting = false;
    if (this.visibleSpan) this.visibleSpan.textContent = '';
    if (this.isIntersecting && !this.reducedMotionQuery.matches) {
      this.tick();
    }
  }

  pauseAnimation() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = null;
    }
  }

  resumeAnimation() {
    if (this.reducedMotionQuery.matches) return;
    if (!this.typingTimeout && this.isIntersecting) {
      this.tick();
    }
  }

  // Update text data dynamically
  updateText(newText) {
    this.originalText = newText;
    this.resetAnimation();
    this.initializeContent();
    this.resetAnimation();
  }

  tick() {
    if (!this.isIntersecting || this.reducedMotionQuery.matches) return;
    
    const text = this.originalText;
    
    if (!this.isDeleting) {
      // Typing forwards
      if (this.charIndex < text.length) {
        this.charIndex++;
        this.visibleSpan.textContent = text.substring(0, this.charIndex);
        this.typingTimeout = setTimeout(this.tick, this.speed);
      } else {
        // Typing complete
        if (this.loop) {
          this.typingTimeout = setTimeout(() => {
            this.isDeleting = true;
            this.tick();
          }, this.pause);
        }
      }
    } else {
      // Deleting backwards (2x speed for satisfying UX)
      if (this.charIndex > 0) {
        this.charIndex--;
        this.visibleSpan.textContent = text.substring(0, this.charIndex);
        this.typingTimeout = setTimeout(this.tick, this.speed / 2);
      } else {
        // Deletion complete
        this.isDeleting = false;
        this.typingTimeout = setTimeout(this.tick, this.speed);
      }
    }
  }

  static injectStyles() {
    if (document.getElementById('typewriter-component-styles')) return;
    
    const styles = `
      typewriter-text {
        display: inline;
        position: relative;
      }
      
      .typewriter-content {
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .typewriter-cursor {
        display: inline-block;
        width: var(--typewriter-caret-width, 0.08em);
        height: 1.1em;
        background-color: var(--typewriter-caret-color, currentColor);
        margin-left: 2px;
        vertical-align: middle;
        animation: typewriter-blink 1s steps(2, start) infinite;
      }
      
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      @keyframes typewriter-blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      
      @media (prefers-reduced-motion: reduce) {
        .typewriter-cursor {
          display: none !important;
        }
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'typewriter-component-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
}

customElements.define('typewriter-text', TypewriterText);
