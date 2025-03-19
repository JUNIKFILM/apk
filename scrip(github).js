// Función para el menú móvil
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
}

// Funcionalidad del slider principal
const sliderWrapper = document.getElementById('sliderWrapper');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.slider-indicator');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;
let slideInterval;

// Iniciar el slider automático
function startSlideInterval() {
  slideInterval = setInterval(() => {
      moveToSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

// Mover a un slide específico
function moveToSlide(index) {
  currentSlide = index;
  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Actualizar indicadores
  indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
  });
}

// Event listeners para los controles del slider
prevBtn.addEventListener('click', () => {
  clearInterval(slideInterval);
  moveToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  startSlideInterval();
});

nextBtn.addEventListener('click', () => {
  clearInterval(slideInterval);
  moveToSlide((currentSlide + 1) % slides.length);
  startSlideInterval();
});

// Event listeners para los indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
      clearInterval(slideInterval);
      moveToSlide(index);
      startSlideInterval();
  });
});

// Iniciar el slider
startSlideInterval();

// Funcionalidad para las filas de películas
const movieRows = document.querySelectorAll('.movie-row-container');
const prevBtns = document.querySelectorAll('.row-prev');
const nextBtns = document.querySelectorAll('.row-next');

// Configurar cada fila de películas
movieRows.forEach((row, index) => {
  const prevBtn = prevBtns[index];
  const nextBtn = nextBtns[index];
  
  // Función para manejar el desplazamiento
  function handleRowScroll() {
      const scrollPosition = row.scrollLeft;
      const maxScroll = row.scrollWidth - row.clientWidth;
      
      if (scrollPosition > 10) {
          prevBtn.style.opacity = '1';
      } else {
          prevBtn.style.opacity = '0';
      }
      
      if (maxScroll > 0 && scrollPosition < maxScroll - 10) {
          nextBtn.style.opacity = '1';
      } else {
          nextBtn.style.opacity = '0';
      }
  }
  
  // Inicializar estado de los botones
  handleRowScroll();
  
  // Event listener para controlar visibilidad de botones durante scroll
  row.addEventListener('scroll', handleRowScroll);
  
  // Event listeners para los botones de navegación
  prevBtn.addEventListener('click', () => {
      const scrollAmount = 240; // Aproximadamente 2 tarjetas
      row.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
      });
  });
  
  nextBtn.addEventListener('click', () => {
      const scrollAmount = 240; // Aproximadamente 2 tarjetas
      row.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
      });
  });
});

// Funcionalidad para el botón flotante
const toggleFloatingMenu = document.getElementById('toggle-floating-menu');
const floatingMenuItems = document.getElementById('floating-menu-items');

toggleFloatingMenu.addEventListener('click', () => {
  floatingMenuItems.classList.toggle('hidden');
  toggleFloatingMenu.classList.toggle('active');
});


     


      // Create the offline notification element
function createOfflineNotification() {
  const notification = document.createElement('div');
  notification.id = 'offline-notification';
  notification.className = 'notification offline-notification hidden';
  
  notification.innerHTML = `
    <div class="notification-icon offline-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    </div>
    <div class="notification-content">
      <h3>Sin conexión a Internet</h3>
    </div>
  `;
  
  document.body.appendChild(notification);
  return notification;
}

// Create the online notification element
function createOnlineNotification() {
  const notification = document.createElement('div');
  notification.id = 'online-notification';
  notification.className = 'notification online-notification hidden';
  
  notification.innerHTML = `
    <div class="notification-icon online-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    </div>
    <div class="notification-content">
      <h3>Conexión restablecida</h3>
    </div>
  `;
  
  document.body.appendChild(notification);
  return notification;
}

// Add CSS styles
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 400px;
      width: calc(100% - 40px);
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: flex-start;
      z-index: 9999;
      animation: slide-in 0.3s ease-out;
    }
    
    .offline-notification {
      background-color: #333333cb;
      color: white;
    }
    
    .online-notification {
      background-color: #333333cb;
      color: white;
    }
    
    .notification-icon {
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .notification-content h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
       color: rgb(255, 255, 255);
    }
    
    .notification-content p {
      margin: 0;
      font-size: 14px;
    }
    
    .hidden {
      display: none;
    }
    
    @keyframes slide-in {
      from {
        transform: translate(-50%, 100px);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    
    @keyframes slide-out {
      from {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      to {
        transform: translate(-50%, 100px);
        opacity: 0;
      }
    }
    
    .slide-out {
      animation: slide-out 0.3s ease-in forwards;
    }
  `;
  document.head.appendChild(style);
}

// Initialize the connection notification functionality
function initConnectionNotifications() {
  addStyles();
  const offlineNotification = createOfflineNotification();
  const onlineNotification = createOnlineNotification();
  let onlineNotificationTimeout;
  
  // Check initial connection status
  if (!navigator.onLine) {
    offlineNotification.classList.remove('hidden');
  }
  
  // Add event listeners for online/offline events
  window.addEventListener('online', () => {
    // Hide offline notification
    offlineNotification.classList.add('hidden');
    
    // Show online notification
    onlineNotification.classList.remove('hidden');
    onlineNotification.classList.remove('slide-out');
    
    // Hide online notification after 5 seconds
    clearTimeout(onlineNotificationTimeout);
    onlineNotificationTimeout = setTimeout(() => {
      onlineNotification.classList.add('slide-out');
      setTimeout(() => {
        onlineNotification.classList.add('hidden');
      }, 300); // Match the duration of the slide-out animation
    }, 5000);
  });
  
  window.addEventListener('offline', () => {
    // Show offline notification
    offlineNotification.classList.remove('hidden');
    
    // Hide online notification if it's visible
    onlineNotification.classList.add('hidden');
    clearTimeout(onlineNotificationTimeout);
  });
}

// Run the initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initConnectionNotifications);


document.addEventListener("DOMContentLoaded", () => {
  // Get all navigation buttons
  const navButtons = document.querySelectorAll(".header-nav .btn")

  // Add click event listener to each button
  navButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Prevent default action for demo purposes (remove this in production if you want the links to work)
      e.preventDefault()

      // Remove active class from all buttons
      navButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      // Optional: Store the active item in localStorage to persist across page loads
      localStorage.setItem("activeNavItem", this.getAttribute("data-name"))
    })
  })

  
})

//funcion para cntrol de tv
@Override
    public boolean onKeyDown(int keyCode, KeyEvent events) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_DPAD_CENTER:

                break;
            case KeyEvent.KEYCODE_DPAD_LEFT:

                break;
            case KeyEvent.KEYCODE_DPAD_RIGHT:

                break;
            case KeyEvent.KEYCODE_DPAD_DOWN:

                break;
            case KeyEvent.KEYCODE_DPAD_UP:

                break;
            case KeyEvent.FLAG_KEEP_TOUCH_MODE:

                break;
        }
        return super.onKeyDown(keyCode, events);
    }

