document.addEventListener('DOMContentLoaded', () => {
  const mainCont = document.querySelector("#mainCont");

  if (mainCont) {
    mainCont.classList.add("drK");
    localStorage.setItem("mode", "darkmode");
  }
});

const DarkMode = {
  updateIcon(isDark) {
    const darkModeContainer = document.querySelector('.isDrk');
    if (darkModeContainer) {
      darkModeContainer.classList.toggle('active', isDark);
    }
  },

  init() {
    const isDarkMode = localStorage.getItem('mode') === 'darkmode';
    const mainContainer = document.querySelector('#mainCont');

    if (isDarkMode) {
      mainContainer?.classList.add('drK');
      this.updateIcon(true);
    }
  }
};

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

document.addEventListener('DOMContentLoaded', () => {
  Defer.dom('.lazy', 'loaded');
});

$(document).ready(function() {
  $('.center').slick({
    prevArrow: '.slick-prev',
    nextArrow: '.slick-next',
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive:
      [

        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
  });
});

