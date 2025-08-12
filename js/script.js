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
    
    // --- 5. Contact Form Validation (for contact.html) ---
    const contactForm = document.querySelector('#contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission
            
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            let isValid = true;
            
            if (name === '') {
                alert('Please enter your name.');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            } else if (message.length < 10) {
                alert('Message must be at least 10 characters long.');
                isValid = false;
            }
            
            if(isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // --- 6. Dynamic Year in Footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- 7. Countdown Timer ---
    const countdown = () => {
        const countDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
        document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
        document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
    };

    if (document.getElementById('days')) {
        setInterval(countdown, 1000);
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
        "agent": "To speak with a live agent, please choose one of the following WhatsApp numbers: <br><a href='https://wa.me/2349041444403' target='_blank'>Agent 1 (+234 904 144 4403)</a><br><a href='https://wa.me/2348032899111' target='_blank'>Agent 2 (+234 803 289 9111)</a>",
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