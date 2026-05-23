// Matrix/Cyberpunk Text Scramble Effect
const matrixLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

document.addEventListener('DOMContentLoaded', () => {
  // Select elements to apply the interaction
  const interactElements = document.querySelectorAll('.nav-link, .nav-button, .btn-primary, .btn-secondary, .tag, .footer-link, .hero-title, .team-title');
  
  interactElements.forEach(el => {
    el.addEventListener('mouseover', event => {
      let iterations = 0;
      
      // Store original text if not already stored
      const target = event.target;
      const originalText = target.dataset.original || target.innerText;
      
      if (!target.dataset.original) {
        target.dataset.original = originalText;
      }
      
      // Clear any running intervals to prevent glitch overlap
      clearInterval(target.matrixInterval);
      
      target.matrixInterval = setInterval(() => {
        target.innerText = originalText.split("")
          .map((letter, index) => {
            // Preserve spaces and specific formatting
            if (letter === ' ' || letter === '\n') return letter;
            
            if(index < iterations) {
              return originalText[index];
            }
            return matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
          })
          .join("");
        
        if(iterations >= originalText.length){ 
          clearInterval(target.matrixInterval);
          target.innerText = originalText; // Ensure exact original string is restored
        }
        
        iterations += 1 / 2; // Controls the speed of the unscramble
      }, 30);
    });
  });
});
