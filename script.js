alert("¡Hola maimor, disfruta tu sitio web. Lo hice con mucho amor para ti! <3")

// Slideshow functionality - Global variables
let slideIndex = 1;

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = ["imagenes/Foto 1.jpeg", "imagenes/foto 2.jpeg"];
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    let slideshowElement = document.getElementById("slideshow");
    if (slideshowElement) {
        slideshowElement.src = slides[slideIndex-1];
    }
}

// Hide loader after page loads
window.addEventListener('load', function() {
    let loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2500);
    }
    // Initialize slideshow
    showSlides(slideIndex);
});

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.classList.add('active');
        }

        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            this.classList.toggle('active');
            
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Scroll-triggered fade animations
    const fadeSections = document.querySelectorAll('.fade-section');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('fade-out');
            } else {
                entry.target.classList.add('fade-out');
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });

    // Dynamic typing effect for .typing-text (CSS handles most, JS resets for loop)
    function initTypingEffect() {
        const typingTexts = document.querySelectorAll('.typing-text');
        typingTexts.forEach((text, index) => {
            text.style.animationDelay = `${index * 0.5}s`;
            // Restart animation every 10s for continuous effect
            setInterval(() => {
                text.style.animation = 'none';
                text.offsetHeight; // Trigger reflow
                text.style.animation = null;
            }, 10000);
        });
    }
    initTypingEffect();

    // Contact form - EmailJS setup (replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY)
    // 1. Go to https://dashboard.emailjs.com/signup (free)
    // 2. Add service, create template (to: Pantopmx@gmail.com)
    // 3. Replace the 3 values below, uncomment EmailJS CDN in index.html head
    /*
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    */
    // 4. Uncomment code below
    
    /*
    emailjs.init("YOUR_PUBLIC_KEY");
    
    let contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(() => {
                    document.getElementById('formMessage').textContent = `¡Gracias ${formData.from_name}! Mensaje enviado a Pantopmx@gmail.com 💕`;
                    document.getElementById('formMessage').style.color = 'hotpink';
                }, (error) => {
                    document.getElementById('formMessage').textContent = 'Error enviando. Intenta de nuevo.';
                    document.getElementById('formMessage').style.color = 'red';
                    console.error('EmailJS error:', error);
                });
            
            this.reset();
            
            setTimeout(() => {
                document.getElementById('formMessage').textContent = '';
            }, 5000);
        });
    }
    */
    
    // TEMP: Original fake handler
    let contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            document.getElementById('formMessage').textContent = `¡Gracias ${name}! Tu mensaje ha sido enviado a Pantopmx@gmail.com. Te amo 💕`;
            document.getElementById('formMessage').style.color = 'hotpink';
            
            this.reset();
            
            setTimeout(() => {
                document.getElementById('formMessage').textContent = '';
            }, 5000);
        });
    }

    // Love counter functionality
    let loveButton = document.getElementById('loveButton');
    let loveCountDisplay = document.getElementById('loveCount');
    
    if (loveButton && loveCountDisplay) {
        let loveCount = parseInt(localStorage.getItem('loveCount')) || 0;
        loveCountDisplay.textContent = loveCount;

        loveButton.addEventListener('click', function() {
            loveCount++;
            loveCountDisplay.textContent = loveCount;
            localStorage.setItem('loveCount', loveCount);
            
            this.innerHTML = '¡Te amo más! 💖';
            setTimeout(() => {
                this.innerHTML = '¡Te amo! ❤️';
            }, 1000);
        });
    }
});
