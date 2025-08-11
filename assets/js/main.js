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
        "hello": "Hello! How can I assist you today? I can help with questions about our programs, events, and contact information.",
        "programs": "We offer a range of programs including the Drone Racing League, a Robotics Design Challenge, and an AI & Automation Hackathon. You can find more details on our <a href='programs.html'>Programs page</a>.",
        "events": "Our next major event is the Drone Competition, the first of its kind in Nigeria! We are very excited about it. You can see the announcement on our homepage.",
        "contact": "You can contact us at info@dronbotain.com, call us at +234 904 144 4403, or visit us at Plot 1457, Jahi District, Cadastral Zone B8, Jahi, Abuja, Nigeria. For immediate assistance, you can also talk to a <a href='https://wa.me/2349041444403' target='_blank'>live agent</a>.",
        "live agent": "To speak with a live agent, please click this link: <a href='https://wa.me/2349041444403' target='_blank'>Connect on WhatsApp</a>. They are available 24/7.",
        "default": "I'm sorry, I didn't understand that. You can ask me about our 'programs', 'events', or 'contact' details. You can also ask to speak to a 'live agent'."
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
        const words = lowerCaseInput.split(/\s+/);
        let response = botResponses.default;

        // More specific keywords first
        if (lowerCaseInput.includes("live agent")) {
            response = botResponses["live agent"];
        } else if (words.some(word => ["program", "programs", "course", "courses"].includes(word))) {
            response = botResponses.programs;
        } else if (words.some(word => ["event", "events", "competition"].includes(word))) {
            response = botResponses.events;
        } else if (words.some(word => ["contact", "address", "phone", "email"].includes(word))) {
            response = botResponses.contact;
        } else if (words.some(word => ["hello", "hi", "hey"].includes(word))) {
            response = botResponses.hello;
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

    // --- 12. Scroll Down Indicator ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.classList.add('scroll-indicator');
        scrollIndicator.innerHTML = `<a href="#services"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/> </svg></a>`;
        heroSection.appendChild(scrollIndicator);
    }

    // --- 11. Contact Info Icons ---
    const phoneLink = document.querySelector('a[href^="tel:"]');
    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (phoneLink) {
        phoneLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16"> <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/> </svg> ` + phoneLink.innerHTML;
    }

    if (emailLink) {
        emailLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16"> <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/> </svg> ` + emailLink.innerHTML;
    }

    // --- 10. Dynamic Footer Year ---
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} Drobotain. All Rights Reserved.`;
    }

    // --- 9. Active Nav Link ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

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