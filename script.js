// Menú Hamburguesa Responsive
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle del menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Cerrar menú al hacer clic fuera del menú
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Validación de Formulario en Tiempo Real
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar error
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

// Función para limpiar error
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Validación en tiempo real para nombre
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'El nombre es requerido');
    } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, 'El nombre debe tener al menos 2 caracteres');
    } else {
        clearError(nameInput, nameError);
    }
});

// Validación en tiempo real para email
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'El email es requerido');
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Ingresa un email válido');
    } else {
        clearError(emailInput, emailError);
    }
});

// Validación en tiempo real para mensaje
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError, 'El mensaje es requerido');
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, 'El mensaje debe tener al menos 10 caracteres');
    } else {
        clearError(messageInput, messageError);
    }
});

// Validación al enviar el formulario
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Validar nombre
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'El nombre es requerido');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }

    // Validar email
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'El email es requerido');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Ingresa un email válido');
        isValid = false;
    }

    // Validar mensaje
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError, 'El mensaje es requerido');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }

    if (isValid) {
        // Aquí podrías enviar el formulario a un servidor
        alert('¡Formulario enviado correctamente!');
        contactForm.reset();
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(messageInput, messageError);
    }
});

// Animación de barras de progreso al hacer scroll
const progressBars = document.querySelectorAll('.progress');
const skillsSection = document.getElementById('habilidades');
let hasAnimated = false;

function animateProgressBars() {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Observer para detectar cuando la sección de habilidades es visible
const observerOptions = {
    threshold: 0.5
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateProgressBars();
            hasAnimated = true;
        }
    });
}, observerOptions);

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Animación suave al hacer scroll a las secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de header al hacer scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.2)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 255, 136, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animación de entrada para las secciones
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});
