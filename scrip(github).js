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
