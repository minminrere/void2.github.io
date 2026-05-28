// Matrix/Cyberpunk Text Scramble Effect & Global Background
const matrixLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hover Scramble Effect for Links and Buttons
  const interactElements = document.querySelectorAll('.nav-link, .nav-button, .btn-primary, .btn-secondary, .footer-link, .hero-title, .team-title');
  
  interactElements.forEach(el => {
    el.addEventListener('mouseover', event => {
      let iterations = 0;
      const target = event.target;
      const originalText = target.dataset.original || target.innerText;
      
      if (!target.dataset.original) {
        target.dataset.original = originalText;
      }
      
      clearInterval(target.matrixInterval);
      
      target.matrixInterval = setInterval(() => {
        target.innerText = originalText.split("")
          .map((letter, index) => {
            if (letter === ' ' || letter === '\n') return letter;
            if(index < iterations) {
              return originalText[index];
            }
            return matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
          })
          .join("");
        
        if(iterations >= originalText.length){ 
          clearInterval(target.matrixInterval);
          target.innerText = originalText; 
        }
        
        iterations += 1 / 2; 
      }, 30);
    });
  });

  // 2. Global Interactive Matrix Rain Background
  if (document.body.classList.contains('relics-body')) {
    return;
  }
  const globalCanvas = document.createElement('canvas');
  globalCanvas.id = 'global-matrix-bg';
  Object.assign(globalCanvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '1', /* High enough to overlay, but pointer-events none ignores clicks */
    pointerEvents: 'none',
    opacity: '0.2', /* Subtle overlay */
    mixBlendMode: 'screen' /* Black pixels become transparent, red pixels glow over content */
  });
  document.body.prepend(globalCanvas);

  const gCtx = globalCanvas.getContext('2d');
  let gColumns, gDrops = [];
  const gFontSize = 14;

  const resizeGlobal = () => {
    globalCanvas.width = window.innerWidth;
    globalCanvas.height = window.innerHeight;
    gColumns = Math.floor(globalCanvas.width / gFontSize);
    gDrops = [];
    for (let x = 0; x < gColumns; x++) {
      gDrops[x] = Math.random() * (globalCanvas.height / gFontSize); // Start at random heights
    }
  };
  resizeGlobal();
  window.addEventListener('resize', resizeGlobal);

  // Mouse interaction tracker
  let mouseX = -100;
  let mouseY = -100;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawGlobalMatrix() {
    // Fade the canvas to black. In "screen" blend mode, black is perfectly transparent.
    gCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);
    
    gCtx.font = gFontSize + 'px "JetBrains Mono", monospace';
    
    for (let i = 0; i < gDrops.length; i++) {
      const text = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
      
      const dropX = i * gFontSize;
      const dropY = gDrops[i] * gFontSize;
      
      // Calculate distance from mouse to the falling character
      const dist = Math.sqrt(Math.pow(mouseX - dropX, 2) + Math.pow(mouseY - dropY, 2));
      
      // If mouse is near, make it bright red (Interactive effect)
      if (dist < 150) {
        gCtx.fillStyle = '#ff4d4d'; 
      } else {
        gCtx.fillStyle = '#960703'; // VOID Red Accent
      }
      
      gCtx.fillText(text, dropX, dropY);
      
      // Reset drop to top randomly
      if (dropY > globalCanvas.height && Math.random() > 0.975) {
        gDrops[i] = 0;
      }
      gDrops[i]++;
    }
  }
  
  setInterval(drawGlobalMatrix, 50);

  // 3. Custom Glowing Cursor Trail (Lerping Node Chain)
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    body, a, button, [role="button"], .platform-btn, .tag, .submit-btn, .play-icon-box {
      cursor: none !important; /* Hide native cursor for premium feeling */
    }
    .custom-cursor-node {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 999999;
      transform: translate3d(0, 0, 0) translate(-50%, -50%);
      mix-blend-mode: screen;
      backface-visibility: hidden;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-weight: 800;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      width: 32px;
      height: 32px;
    }
    /* The leading cursor tip ring */
    .custom-cursor-node:first-child {
      width: 16px;
      height: 16px;
      background-color: transparent;
      border: 1.5px solid #ff4d4d;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(255, 77, 77, 0.6);
      transition: width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s;
    }
    /* Interactive expansion on hover */
    body.cursor-hovering .custom-cursor-node:first-child {
      width: 28px;
      height: 28px;
      background-color: rgba(255, 77, 77, 0.15);
      border-color: #ff3333;
      box-shadow: 0 0 12px rgba(255, 51, 51, 0.8);
    }
    /* Hide custom cursor on touchscreens */
    @media (hover: none) and (pointer: coarse) {
      .custom-cursor-node {
        display: none !important;
      }
      body, a, button, [role="button"], .platform-btn, .tag, .submit-btn, .play-icon-box {
        cursor: auto !important;
      }
    }
  `;
  document.head.appendChild(styleEl);

  const cursorContainer = document.createElement('div');
  cursorContainer.id = 'custom-cursor-container';
  document.body.appendChild(cursorContainer);

  const numNodes = 12;
  const nodes = [];
  const ease = 0.15;
  const cursorMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // Create DOM elements for the trailing nodes
  for (let i = 0; i < numNodes; i++) {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'custom-cursor-node';
    
    // Setup the Matrix characters for the trailing nodes
    if (i > 0) {
      // Pick a random letter to start
      nodeEl.innerText = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
      // Taper the font size
      const fontSize = Math.max(7, 16 - (i * 1.0));
      nodeEl.style.fontSize = `${fontSize}px`;
      nodeEl.style.opacity = (1.0 - (i / numNodes) * 0.8).toString();
      
      // Cyberpunk deep red fading effect for the tail nodes
      const redIntensity = Math.floor(255 - (i * 12));
      const greenIntensity = Math.floor(77 - (i * 6));
      const nodeColor = `rgb(${redIntensity}, ${Math.max(0, greenIntensity)}, ${Math.max(0, greenIntensity)})`;
      nodeEl.style.color = nodeColor;
      nodeEl.style.textShadow = `0 0 5px ${nodeColor}`;
    }
    
    cursorContainer.appendChild(nodeEl);
    
    nodes.push({
      el: nodeEl,
      x: cursorMouse.x,
      y: cursorMouse.y
    });
  }

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    cursorMouse.x = e.clientX;
    cursorMouse.y = e.clientY;
  });

  // Hover states to scale the cursor tip
  const updateHoverState = (isHovering) => {
    if (isHovering) {
      document.body.classList.add('cursor-hovering');
    } else {
      document.body.classList.remove('cursor-hovering');
    }
  };

  const addHoverListeners = () => {
    const interactive = document.querySelectorAll('a, button, [role="button"], .platform-btn, .tag, .submit-btn, .play-icon-box');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => updateHoverState(true));
      el.addEventListener('mouseleave', () => updateHoverState(false));
    });
  };
  addHoverListeners();
  
  // Re-run hover listener attachments periodically to cover dynamic elements
  setInterval(addHoverListeners, 2000);

  // The custom animation tick loop using the exact user-specified formula
  function tick() {
    let prev = cursorMouse;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      // exact user logic:
      n.x += (prev.x - n.x) * ease;
      n.y += (prev.y - n.y) * ease;
      
      // Update element position using hardware accelerated transform and 50% shift to center
      n.el.style.transform = `translate3d(${n.x}px, ${n.y}px, 0) translate(-50%, -50%)`;
      
      // Matrix rain effect: randomly scramble the trailing characters to make them flicker
      if (i > 0 && Math.random() > 0.45) {
        n.el.innerText = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
      }
      
      prev = n;
    }
    requestAnimationFrame(tick);
  }
  
  // Start the tick loop
  tick();
});
