document.addEventListener('DOMContentLoaded', () => {
  DarkMode.init();

  //window.addEventListener('scroll', () => {
  //const scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
  //document.getElementById('header')?.classList.toggle('stick', scrollDistance > SHRINK_DISTANCE);
  //});

  const lazyElements = document.querySelectorAll('.lazyYt, .zmImg');
  lazyElements.forEach(element => {
    if (element.classList.contains('lazyYt')) {
      YouTubeLoader.initElement(element);
    } else if (element.classList.contains('zmImg')) {
      ImageLightbox.bindEvent(element);
    }
  });
});

const YouTubeLoader = {
  initElement(container) {
    const videoId = container.dataset.embed;
    if (!videoId) return;

    const thumbnail = new Image();
    thumbnail.className = 'lazy';
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    thumbnail.alt = 'YouTube video thumbnail';

    container.appendChild(thumbnail);

    container.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`;
      container.innerHTML = '';
      container.appendChild(iframe);
    });
  }
};

const ImageLightbox = {
  bindEvent(container) {
    container.addEventListener('click', () => {
      container.classList.toggle('s');
    });
  }
};

const Defer = {
  dom(selector, loadedClass = 'loaded', callback) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (callback) callback(entry.target);
            entry.target.classList.add(loadedClass);
          }
        });
      });
      observer.observe(element);
    });
  }
};

 document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const indicatorsContainer = document.querySelector('.indicators');
            
            let currentIndex = 0;
            const slideCount = slides.length;
            let slideWidth = slider.clientWidth;
            let interval;
            
            // Crear indicadores
            for (let i = 0; i < slideCount; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (i === 0) {
                    indicator.classList.add('active');
                }
                indicator.dataset.index = i;
                indicatorsContainer.appendChild(indicator);
            }
            
            const indicators = document.querySelectorAll('.indicator');
            
            // Función para mostrar una diapositiva específica
            function goToSlide(index) {
                if (index < 0) {
                    index = slideCount - 1;
                } else if (index >= slideCount) {
                    index = 0;
                }
                
                currentIndex = index;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Actualizar indicadores
                indicators.forEach((ind, i) => {
                    if (i === currentIndex) {
                        ind.classList.add('active');
                    } else {
                        ind.classList.remove('active');
                    }
                });
            }
            
            // Event listeners para los botones
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetInterval();
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetInterval();
            });
            
            // Event listeners para los indicadores
            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    const index = parseInt(indicator.dataset.index);
                    goToSlide(index);
                    resetInterval();
                });
            });
            
            // Cambio automático de diapositivas
            function startInterval() {
                interval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 3000);
            }
            
            function resetInterval() {
                clearInterval(interval);
                startInterval();
            }
            
            // Ajustar el tamaño del slider cuando cambia el tamaño de la ventana
            window.addEventListener('resize', () => {
                slideWidth = slider.clientWidth;
                goToSlide(currentIndex);
            });
            
            // Iniciar el slider
            startInterval();
        });

         function selectItem(element) {
            // Remove selected class from all items
            const items = document.querySelectorAll('.menu-item');
            items.forEach(item => {
                item.classList.remove('selected');
            });
            
            // Add selected class to clicked item
            element.classList.add('selected');
        }          

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
      <p>No tienes conexión a Internet. Algunas funciones de la aplicación pueden no estar disponibles.</p>
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
      <p>Tu conexión a Internet ha sido restablecida. Todas las funciones están disponibles nuevamente.</p>
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
      background-color: #4CAF50;
      color: white;
    }
    
    .notification-icon {
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .notification-content h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
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
