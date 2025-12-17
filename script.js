/* ========================================
   Y2K Personal Website - JavaScript
   Minimal vanilla JS for interactivity
   ======================================== */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initStarfield();
    initNavigation();
    initVisitorCounter();
    initScrollEffects();
    updateTimestamp();
});

// Update last updated timestamp
function updateTimestamp() {
    var timestampElement = document.getElementById('last-updated');
    if (timestampElement) {
        var now = new Date();
        var dateStr = now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear();
        timestampElement.textContent = dateStr;
    }
}

/* ========================================
   Starfield Background Animation
   ======================================== */
function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Star configuration
    const stars = [];
    const numStars = 150;
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            direction: Math.random() > 0.5 ? 1 : -1
        });
    }
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 102, 204, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Twinkling effect
            star.opacity += star.twinkleSpeed * star.direction;
            if (star.opacity >= 1 || star.opacity <= 0.2) {
                star.direction *= -1;
            }
            
            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ========================================
   Navigation & Page Switching
   ======================================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.classList.add('fade-in');
                
                // Scroll to top of content
                window.scrollTo(0, 0);
            }
        });
    });
    
    // Handle hash navigation (e.g., page load with #about)
    function handleHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`a[href="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }
    
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
}

/* ========================================
   Visitor Counter Animation
   ======================================== */
function initVisitorCounter() {
    const counter = document.getElementById('visitor-count');
    const targetNumber = 42; // You can make this dynamic
    let currentNumber = 0;
    
    // Animate counter on page load
    const interval = setInterval(() => {
        if (currentNumber < targetNumber) {
            currentNumber++;
            counter.textContent = String(currentNumber).padStart(6, '0');
        } else {
            clearInterval(interval);
        }
    }, 50);
    
    // Add random increment every 30 seconds (simulating new visitors)
    setInterval(() => {
        const current = parseInt(counter.textContent);
        const newCount = current + Math.floor(Math.random() * 3) + 1;
        counter.textContent = String(newCount).padStart(6, '0');
    }, 30000);
}

/* ========================================
   Scroll Effects
   ======================================== */
function initScrollEffects() {
    // Smooth fade-in for windows on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.window').forEach(window => {
        observer.observe(window);
    });
}

/* ========================================
   Contact Form Handler
   ======================================== */
function handleSubmit(event) {
    event.preventDefault();
    
    var form = event.target;
    var name = form.name.value;
    var email = form.email.value;
    var message = form.message.value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('ERROR: Please fill in all fields!');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('ERROR: Please enter a valid email address!');
        return false;
    }
    
    // Success message
    alert('Message sent successfully!\n\n(Not really, this is a demo site lol)');
    form.reset();
    
    return false;
}

function isValidEmail(email) {
    return email.indexOf('@') > 0 && email.indexOf('.') > 0;
}

/* ========================================
   Winamp Player Controls (Just for fun)
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const winampButtons = document.querySelectorAll('.winamp-btn');
    const winampDisplay = document.querySelector('.winamp-display marquee');
    
    if (winampButtons.length > 0) {
        const songs = [
            '♪ Coding Playlist - Lo-Fi Beats ♪',
            '♪ Darude - Sandstorm ♪',
            '♪ MIDI Music - Track 001 ♪',
            '♪ Dial-up Connection.mp3 ♪',
            '♪ Windows XP Startup.wav ♪'
        ];
        
        let currentSong = 0;
        let isPlaying = true;
        
        winampButtons.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                switch(index) {
                    case 0: // Previous
                        currentSong = (currentSong - 1 + songs.length) % songs.length;
                        updateDisplay();
                        break;
                    case 1: // Play
                        isPlaying = true;
                        winampDisplay.start();
                        break;
                    case 2: // Pause
                        isPlaying = false;
                        winampDisplay.stop();
                        break;
                    case 3: // Stop
                        isPlaying = false;
                        winampDisplay.stop();
                        currentSong = 0;
                        updateDisplay();
                        break;
                    case 4: // Next
                        currentSong = (currentSong + 1) % songs.length;
                        updateDisplay();
                        break;
                }
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
        
        function updateDisplay() {
            if (winampDisplay) {
                winampDisplay.textContent = songs[currentSong];
                if (isPlaying) {
                    winampDisplay.start();
                }
            }
        }
    }
});

/* ========================================
   Easter Eggs & Fun Stuff
   ======================================== */

// Konami Code Easter Egg
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Add rainbow animation to header
        const header = document.querySelector('.header-bar');
        header.style.animation = 'rainbow 2s linear infinite';
        
        // Add CSS for rainbow effect
        if (!document.getElementById('easter-egg-style')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        alert('*** KONAMI CODE ACTIVATED! ***\n\nYou found the secret easter egg!\n\nYou are now in RAINBOW MODE!');
        
        // Reset after 10 seconds
        setTimeout(() => {
            header.style.animation = '';
        }, 10000);
    }
})();

// Double-click on visitor counter for surprise
document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('visitor-count');
    if (counter) {
        counter.addEventListener('dblclick', function() {
            const randomNum = Math.floor(Math.random() * 999999);
            this.textContent = String(randomNum).padStart(6, '0');
            alert('Counter randomized! (Totally legit visitors, I swear)');
        });
    }
});

/* ========================================
   Console Message (for fellow developers)
   ======================================== */
console.log('%c*** WELCOME TO THE SOURCE CODE ***', 'font-size: 16px; font-weight: bold; color: #0000ff;');
console.log('%cIf you can read this, you are a TRUE HACKER', 'font-size: 12px; color: #00ff00;');
console.log('%cThis site was built with 100% pure HTML, CSS, and JavaScript!', 'font-size: 11px; color: #000;');
console.log('%cNo fancy frameworks. No build tools. Just raw code.', 'font-size: 11px; color: #000;');
console.log('%c\nPSSST... Try the Konami Code: UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A', 'font-size: 10px; color: #ff0000; font-style: italic;');
console.log('%c\nMade with <3 in 2025 but styled like 2008', 'font-size: 10px; color: #666;');
