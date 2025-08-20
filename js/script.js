document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger && navMenu && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));

    // --- 2. Sticky Header on Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. Dark/Light Theme Toggle ---
    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark-theme');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }

    // --- 4. Fade-in Animation on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- 5. Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    if (slides.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(parseInt(dot.dataset.slide));
                slideInterval = setInterval(nextSlide, 120000); // Restart interval
            });
        });

        slideInterval = setInterval(nextSlide, 120000); // Change slide every 2 minutes
    }
    

    // --- 6. Dynamic Year in Footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- 8. Chatbot ---
    const chatbot = document.querySelector('.chatbot');
    const chatbotToggleBtn = document.querySelector('.chatbot-toggle-btn');
    const closeBtn = document.querySelector('.close-btn');
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send');

    const toggleChatbot = () => chatbot.classList.toggle('active');

    if (chatbotToggleBtn) chatbotToggleBtn.addEventListener('click', toggleChatbot);
    if (closeBtn) closeBtn.addEventListener('click', toggleChatbot);

    const responses = {
        "hello": "Hi there! How can I assist you?",
        "hi": "Hi there! How can I assist you?",
        "what is drobotain": "Drobotain merges education and competition with cutting-edge robotics and drone technology to build a sustainable drone industry in Africa.",
        "programs": "We offer competitions like Drone Soccer and Robotics Arm Challenge, as well as STEAM education for students and educators. You can find more details on our Programs page.",
        "contact": "You can reach us at info@dronbotain.com or call +234 800 001 1111.",
        "agent": "To speak with a live agent, please click the link to connect via WhatsApp: <a href='https://wa.me/2348032899111?text=Coming%20from%20Drobotain%20Web%20page' target='_blank'>Connect to Live Agent</a>",
        "default": "I'm not sure how to answer that. Can you try asking another question? You can also type 'agent' to connect with a person."
    };

    const sendMessage = () => {
        const userInput = chatbotInput.value.trim().toLowerCase();
        if (userInput === '') return;

        appendMessage(userInput, 'user-message');
        chatbotInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            appendMessage(botResponse, 'bot-message');
        }, 500);
    };

    const getBotResponse = (userInput) => {
        for (const keyword in responses) {
            if (userInput.includes(keyword)) {
                return responses[keyword];
            }
        }
        return responses['default'];
    };

    const appendMessage = (text, className) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        const p = document.createElement('p');
        p.innerHTML = text;
        messageDiv.appendChild(p);
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    };

    if (chatbotSendBtn) chatbotSendBtn.addEventListener('click', sendMessage);
    if (chatbotInput) chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});