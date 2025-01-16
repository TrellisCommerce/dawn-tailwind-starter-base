import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class PhotoGallery extends window.HTMLElement {
  constructor() {
    super();

    let swiper;
    window.globals = {};
    const body = document.getElementsByTagName('main')[0];
    const lightboxImages = document.querySelectorAll('[lightbox-toggle]');
    const initLightbox = lightboxImages.length > 0;
    const destroySwiper = (swiper, timeout) => {
      setTimeout(() => {
        swiper.destroy();
      }, timeout);
    };

    const createLightboxSkeleton = () => {
      // Create skeleton for lightbox
      const lightbox = document.createElement('div');
      const lightboxContainer = document.createElement('div');
      const lightboxClose = document.createElement('div');
      const swiperContainer = document.createElement('div');
      const swiperWrapper = document.createElement('div');
      const swiperBtnNext = document.createElement('div');
      const swiperBtnPrev = document.createElement('div');
      const swiperPagination = document.createElement('div');

      // Add classes
      lightbox.classList.add('c-lightbox');
      lightboxContainer.classList.add('c-lightbox__container');
      lightboxClose.classList.add('c-lightbox__close');
      lightboxClose.setAttribute('tabindex', '0');
      lightboxClose.innerHTML = `
        <svg
            aria-hidden="true"
            focusable="false"
            width="40"
            height="40"
            class="icon icon-close-small relative"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M8.48627 9.32917L2.82849 3.67098" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.88539 9.38504L8.42932 3.61524" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
      swiperContainer.classList.add('swiper-container');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperBtnNext.classList.add('swiper-button-next');
      swiperBtnPrev.classList.add('swiper-button-prev');
      swiperPagination.classList.add('swiper-pagination');

      // Append created divs
      lightboxContainer.appendChild(lightboxClose);
      swiperContainer.appendChild(swiperWrapper);
      swiperContainer.appendChild(swiperBtnNext);
      swiperContainer.appendChild(swiperBtnPrev);
      swiperContainer.appendChild(swiperPagination);
      lightboxContainer.appendChild(swiperContainer);
      lightbox.appendChild(lightboxContainer);
      body.appendChild(lightbox);

      // Set variables to reference the lightbox
      globals.lightboxRef = document.querySelector('.c-lightbox');
      globals.swiperWrapperRef = document.querySelector(
        '.c-lightbox .swiper-wrapper',
      );
    };

    if (initLightbox) {
      createLightboxSkeleton();

      // The rest of the code will go here
      lightboxImages.forEach(function (el, index) {
        // Add click function to lightbox images
        el.addEventListener('click', imageClick, false);

        function imageClick() {
          // Clear swiper before trying to add to it
          globals.swiperWrapperRef.innerHTML = '';

          // Loop through images with lightbox data attr
          // Create html for lightbox carousel
          lightboxImages.forEach(function (img) {
            console.log(index);
            // Create clone of current image in loop
            const image = img.cloneNode(true);
            // Create divs
            const slide = document.createElement('div');
            const imageContainer = document.createElement('div');
            // Add classes
            slide.classList.add('swiper-slide');
            imageContainer.classList.add('c-lightbox__image');
            // Append images to the slides, then slides to swiper wrapper
            imageContainer.appendChild(image);
            slide.appendChild(imageContainer);
            globals.swiperWrapperRef.appendChild(slide);
          });

          // Init Swiper
          swiper = new Swiper('.c-lightbox .swiper-container', {
            initialSlide: index,
            loop: true,
            slidesPerView: 1,
            speed: 750,
            spaceBetween: 16,
            watchOverflow: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
            },
            zoom: true,
            fadeEffect: {
              crossFade: false,
            },
            keyboard: {
              enabled: true,
              onlyInViewport: true,
            },
            mousewheel: {
              sensitivity: 1,
              forceToAxis: true,
              invert: true,
            },
          });

          // Add the class to open the lightbox
          // Add overflow hidden to the body to prevent scrolling
          globals.lightboxRef.classList.add('open');
          body.classList.add('overflowHidden');
        }
      });

      // Close lightbox on click
      document.addEventListener(
        'click',
        ({ target }) => {
          if (
            target.matches('.c-lightbox__close') ||
            target.matches('.c-lightbox__close svg') ||
            !target.matches('.lightbox-object')
          ) {
            console.log('close');
            destroySwiper(swiper, 250);
            globals.lightboxRef.classList.remove('open');
            body.classList.remove('overflowHidden');
          }
        },
        false,
      );

      // Close lightbox on escape key press
      document.addEventListener('keydown', ({ key }) => {
        if (key === 'Escape') {
          destroySwiper(swiper, 250);
          globals.lightboxRef.classList.remove('open');
          body.classList.remove('overflowHidden');
        }
      });
    }
  }
}
