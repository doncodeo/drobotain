// Drobotain Website Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navigation ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Scroll-triggered Fade-in Animations ---
    const animatedElements = document.querySelectorAll('.fade-in-section, .card, .event-card-new');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('card') || entry.target.classList.contains('event-card-new')) {
                    const elements = Array.from(entry.target.parentElement.children);
                    elements.forEach((el, index) => {
                        if (el.classList.contains('card') || el.classList.contains('event-card-new')) {
                            el.style.animationDelay = `${index * 0.1}s`;
                            el.classList.add('fade-in-up');
                        }
                    });
                } else {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
    

    // --- 4. Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.classList.add('show');
                lightboxImg.src = item.src;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('show');
        });

        // Close lightbox on click outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('show');
            }
        });
    }
    
    // --- 5. Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            // Simple validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }

            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // --- 8. Chatbot ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    const botResponses = {
        "hello": "Hello! How can I assist you today?",
        "programs": "We offer a variety of programs in drone technology and robotics. You can find more details on our Programs page.",
        "events": "Our next major event is the Drone Competition, the first of its kind in Nigeria! We also have workshops and a STEM fair planned. Check the 'Upcoming Events' section on the homepage for more details.",
        "contact": "You can contact us at info@dronbotain.com or visit us at Plot 1457, Jahi District, Cadastral Zone B8, Jahi, Abuja, Nigeria. For immediate assistance, you can also talk to a <a href='https://wa.me/2349041444403' target='_blank'>live agent</a>.",
        "live agent": "To speak with a live agent, please click this link: <a href='https://wa.me/2349041444403' target='_blank'>Connect on WhatsApp</a>.",
        "default": "I'm sorry, I didn't understand that. You can ask me about 'programs', 'events', or 'contact'. You can also connect with a <a href='https://wa.me/2349041444403' target='_blank'>live agent</a>."
    };

    const toggleChatWindow = () => {
        chatWindow.classList.toggle('open');
    };

    const sendMessage = () => {
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        appendMessage(userInput, 'sent');
        chatInput.value = '';

        setTimeout(() => {
            generateBotResponse(userInput);
        }, 500);
    };

    const appendMessage = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        const p = document.createElement('p');
        p.innerHTML = text; // Use innerHTML to render the link
        messageDiv.appendChild(p);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const generateBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        let response = botResponses.default;

        for (const key in botResponses) {
            if (lowerCaseInput.includes(key)) {
                response = botResponses[key];
                break;
            }
        }
        appendMessage(response, 'received');
    };

    if (chatbotToggle) chatbotToggle.addEventListener('click', toggleChatWindow);
    if (closeChat) closeChat.addEventListener('click', toggleChatWindow);
    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // --- 7. Mobile Nav Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = navLinks.getAttribute('data-visible');
            if (isVisible === 'true') {
                navLinks.setAttribute('data-visible', 'false');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            } else {
                navLinks.setAttribute('data-visible', 'true');
                mobileNavToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // --- 6. Theme Toggler ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the saved theme
    const applyTheme = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Apply theme on initial load
    applyTheme();

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save the new theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

});