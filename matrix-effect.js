// Matrix/Cyberpunk Text Scramble Effect & Global Background
const matrixLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hover Scramble Effect for Links and Buttons
  const interactElements = document.querySelectorAll('.nav-link, .nav-button, .btn-primary, .btn-secondary, .tag, .footer-link, .hero-title, .team-title');
  
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
});
