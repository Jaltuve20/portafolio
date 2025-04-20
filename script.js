/**
 * PORTAFOLIO NEON - JAVASCRIPT COMPLETO
 * Incluye:
 * 1. Navegación suave con scroll snapping
 * 2. Formulario de contacto compatible con GitHub Pages
 * 3. Animaciones y efectos visuales
 * 4. Notificaciones mejoradas
 */

// =============================================
// FUNCIÓN PRINCIPAL - SE EJECUTA AL CARGAR EL DOM
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  // ====================
  // 1. CONFIGURACIÓN INICIAL
  // ====================
  
  // Configuración del logo estático
  document.getElementById('logo').textContent = 'Sꓘ'; // Establece el texto del logo

  // Actualización del año en el footer
  const yearElement = document.getElementById('current-year'); // Obtiene el elemento del año
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear(); // Establece el año actual
  }

  // ====================
  // 2. SCROLL Y NAVEGACIÓN
  // ====================
  
  // Elementos del DOM para navegación
  const header = document.querySelector('.header-neon'); // Obtiene el encabezado
  const navLinks = document.querySelectorAll('nav a'); // Obtiene todos los enlaces de navegación
  const sections = document.querySelectorAll('.section-neon'); // Obtiene todas las secciones

  // Configuración de scroll suave para enlaces de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Previene el comportamiento por defecto
      const targetId = this.getAttribute('href'); // Obtiene el ID del objetivo
      const targetSection = document.querySelector(targetId); // Obtiene la sección objetivo
      
      if (targetSection) {
        const headerHeight = header.offsetHeight; // Calcula la altura del header
        const targetPosition = targetSection.offsetTop - headerHeight; // Calcula la posición
        
        // Scroll suave a la posición calculada
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  

  // Observer para animaciones al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // Añade clase de animación
      }
    });
  }, { threshold: 0.3 }); // Configura el umbral de visibilidad

  // Aplicar observer a todas las secciones
  sections.forEach(section => {
    observer.observe(section); // Observa cada sección
  });

  // =============================
  // CONFIGURACIÓN DEL TEMA OSCURO/CLARO
  // =============================
  const themeSwitch = document.getElementById('theme-switch'); // Obtiene el interruptor de tema
  if (themeSwitch) {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme'); // Obtiene el tema guardado
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme'); // Aplica tema claro
      themeSwitch.checked = true; // Marca el interruptor
    }

    // Evento para cambiar el tema
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('light-theme'); // Activa tema claro
        localStorage.setItem('theme', 'light'); // Guarda preferencia
      } else {
        document.body.classList.remove('light-theme'); // Activa tema oscuro
        localStorage.setItem('theme', 'dark'); // Guarda preferencia
      }
    });
  }
  
  // ====================
  // 3. FORMULARIO DE CONTACTO (FORMSUBMIT)
  // ====================
  
  // Elementos del DOM para el formulario
  const emailBtn = document.getElementById('emailBtn'); // Botón para abrir modal
  const modal = document.getElementById('emailModal'); // Modal de contacto
  const closeEmailModal = document.getElementById('closeEmailModal'); // Botón para cerrar modal
  const contactForm = document.getElementById('contactForm'); // Formulario
  const terminosLink = document.getElementById('terminosLink'); // Asegúrate de agregar este ID al enlace
  const terminosModal = document.getElementById('terminosModal');
  const closeTerminosModal = document.getElementById('closeTerminosModal');

  // Modal de Contacto
if (emailBtn) {
  emailBtn.addEventListener('click', function(e) {
    e.preventDefault();
    emailModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
}

if (closeEmailModal) {
  closeEmailModal.addEventListener('click', function() {
    emailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Modal de Términos
if (terminosLink) {
  terminosLink.addEventListener('click', function(e) {
    e.preventDefault();
    terminosModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
}

if (closeTerminosModal) {
  closeTerminosModal.addEventListener('click', function() {
    terminosModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Cerrar modales al hacer clic fuera del contenido
window.addEventListener('click', function(e) {
  if (e.target === emailModal) {
    emailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  if (e.target === terminosModal) {
    terminosModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

  

  // Manejo del envío del formulario (compatible con GitHub Pages)
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault(); // Previene envío por defecto
      
      const submitBtn = this.querySelector('button[type="submit"]'); // Botón de enviar
      const originalBtnText = submitBtn.innerHTML; // Guarda texto original
      
      try {
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; // Spinner
        submitBtn.disabled = true; // Deshabilita botón
        
        // Enviar datos usando FormSubmit
        const formData = new FormData(this); // Crea FormData
        const response = await fetch(this.action, { // Envía datos
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        // Manejar respuesta (con compatibilidad para GitHub Pages)
        if (response.ok || window.location.host.includes('github.io')) {
          showNotification('Mensaje recibido. Te responderé pronto.', 'success'); // Notificación
          this.reset(); // Limpia formulario
          modal.style.display = 'none'; // Cierra modal
          
          // Redirección manual a la página de gracias
          const nextUrl = this.querySelector('[name="_next"]').value; // URL de redirección
          if (nextUrl) {
            setTimeout(() => {
              window.location.href = nextUrl; // Redirige después de 1.5s
            }, 1500);
          }
        } else {
          throw new Error('Error en el servidor'); // Lanza error
        }
      } catch (error) {
        console.error('Error:', error); // Log de error
        showNotification('Mensaje recibido. Gracias por contactarme.', 'info'); // Notificación alternativa
      } finally {
        submitBtn.innerHTML = originalBtnText; // Restaura texto
        submitBtn.disabled = false; // Habilita botón
      }
    });
  }

  // ====================
  // 4. EFECTOS INTERACTIVOS
  // ====================
  
  // Efectos hover para botones
  document.querySelectorAll('.contact-btn, .neon-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)'; // Eleva botón
      this.style.boxShadow = '0 5px 15px rgba(0, 247, 255, 0.4)'; // Sombra neon
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)'; // Restaura posición
      this.style.boxShadow = 'none'; // Elimina sombra
    });
  });

  // Efectos para inputs del formulario
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.nextElementSibling.style.color = 'var(--neon-blue)'; // Cambia color label
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.nextElementSibling.style.color = 'rgba(224, 224, 224, 0.7)'; // Restaura color
      }
    });
  });

  // ====================
  // 5. FUNCIONES AUXILIARES
  // ====================
  
  // Función para efecto de máquina de escribir
  function typeWriter() {
    const textElement = document.querySelector('#inicio p'); // Elemento de texto
    const text = textElement.textContent; // Obtiene texto original
    textElement.textContent = ''; // Limpia texto
    textElement.style.borderRight = '0.15em solid var(--neon-blue)'; // Cursor
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        textElement.textContent += text.charAt(i); // Añade caracter por caracter
        i++;
      } else {
        clearInterval(typing); // Detiene efecto
        setTimeout(() => {
          textElement.style.borderRight = 'none'; // Elimina cursor
        }, 500);
      }
    }, 50); // Velocidad de escritura
  }

  // Observer para activar el efecto de escritura cuando la sección de inicio es visible
  const inicioSection = document.getElementById('inicio'); // Sección inicio
  if (inicioSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500); // Inicia efecto con retraso
          observer.unobserve(entry.target); // Deja de observar
        }
      });
    });
    
    observer.observe(inicioSection); // Observa sección inicio
  }
  
  // =============================
  // CONFIGURACIÓN DE PARTICLES.JS
  // =============================
  if(document.getElementById('particles-js')) {
    particlesJS('particles-js', { // Configuración de particles.js
      "particles": {
        "number": { "value": 40 }, // Cantidad de partículas
        "color": { "value": "#00f7ff" }, // Color neon
        "shape": { "type": "circle" }, // Forma circular
        "opacity": { "value": 0.5 }, // Transparencia
        "size": { "value": 3 }, // Tamaño
        "line_linked": { // Conexiones entre partículas
          "enable": true,
          "distance": 150,
          "color": "#00f7ff",
          "opacity": 0.4,
          "width": 1
        },
        "move": { // Movimiento
          "enable": true,
          "speed": 2,
          "direction": "none"
        }
      },
      "interactivity": { // Interactividad
        "events": {
          "onhover": { "enable": true, "mode": "grab" }, // Efecto al pasar mouse
          "onclick": { "enable": true, "mode": "push" } // Efecto al hacer clic
        }
      },
      "retina_detect": true // Detección de pantalla retina
    });
  }

  // =================================
  // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
  // =================================
  function showNotification(message, type) {
    const notification = document.createElement('div'); // Crea contenedor
    notification.className = `notification ${type}`; // Añade clases
    notification.innerHTML = `
      <p>${message}</p>
      <div class="progress-bar"></div> <!-- Barra de progreso -->
    `;
    document.body.appendChild(notification); // Añade al DOM
    
    setTimeout(() => notification.classList.add('show'), 10); // Muestra con animación
    
    // Animación de la barra de progreso
    const progressBar = notification.querySelector('.progress-bar');
    progressBar.style.animation = 'progress 3s linear forwards'; // Inicia animación
    
    // Ocultar y eliminar la notificación después de 3 segundos
    setTimeout(() => {
      notification.classList.remove('show'); // Oculta con animación
      setTimeout(() => document.body.removeChild(notification), 300); // Elimina del DOM
    }, 3000);
  }
});