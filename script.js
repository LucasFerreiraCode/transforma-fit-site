document.querySelector('.nav-toggle').addEventListener('click', function() {
    const menu = document.querySelector('.nav-menu');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    menu.classList.toggle('active');
    this.setAttribute('aria-expanded', !isExpanded);
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        faqItem.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
    });
});

document.querySelectorAll('#btn-comprar-hero, #btn-comprar-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "https://pay.kiwify.com.br/kjVtxHj";
    });
});

document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    const stickyCta = document.getElementById('sticky-cta');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    if (stickyCta) {
        if (window.scrollY > 400) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    }

    // Scroll Progress Logic
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('horas').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* EXIT INTENT POPUP LOGIC */
document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 10 && !sessionStorage.getItem('exitPopupShown')) {
        const popup = document.getElementById('exit-popup');
        if (popup) {
            popup.classList.add('active');
            sessionStorage.setItem('exitPopupShown', 'true');
            startPopupTimer();
        }
    }
});

const closePopupBtn = document.getElementById('close-popup');
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', function() {
        document.getElementById('exit-popup').classList.remove('active');
    });
}

const denyPopupBtn = document.getElementById('deny-popup');
if (denyPopupBtn) {
    denyPopupBtn.addEventListener('click', function() {
        document.getElementById('exit-popup').classList.remove('active');
    });
}

function startPopupTimer() {
    let timeLeft = 300; // 5 minutes
    const timerElement = document.getElementById('popup-timer-countdown');
    
    const popupInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(popupInterval);
            timerElement.textContent = "00:00";
            return;
        }
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
    }, 1000);
}

/* DYNAMIC ROUNDED FAVICON LOGIC */
window.addEventListener('load', function() {
    const img = new Image();
    img.src = 'img/TransformaFit-logo.png';
    img.crossOrigin = "Anonymous";
    
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        
        // Criar um círculo perfeito (arredondar com código)
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Desenhar a imagem dentro do círculo
        const xOffset = (img.width - size) / 2;
        const yOffset = (img.height - size) / 2;
        ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);
        
        // Atualizar o favicon na aba do navegador com a nova imagem gerada pelo código
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = canvas.toDataURL('image/png');
        document.getElementsByTagName('head')[0].appendChild(link);
    };
});
