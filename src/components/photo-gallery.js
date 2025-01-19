import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class PhotoGallery extends window.HTMLElement {
  constructor() {
    super();

    this.dialog = this.querySelector('dialog');
    this.body = document.querySelector('body');

    const slider = this.querySelector('.swiper');
    this.slider = new Swiper(slider, {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 1,
      autoplay: false,
      spaceBetween: 10,
      navigation: {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev'),
        hide: true,
      },
      zoom: {
        maxRatio: 5,
        // panOnMouseMove: true,
      },
    });

    const images = document.querySelectorAll('.gallery-object');
    images.forEach((image) => {
      image.addEventListener('click', (event) => {
        this.galleryShow(image);
      });
    });

    const slides = this.querySelectorAll('.swiper-slide');
    slides.forEach((slide) => {
      const zoomIcon = slide.querySelector('.zoom-icon');
      zoomIcon.addEventListener('click', (event) => {
        const zoomInstance = this.slider.zoom;
        if (zoomInstance.scale === 1) {
          zoomInstance.in(); // Zoom in
        } else {
          zoomInstance.out(); // Zoom out
        }
      });
    });
  }

  galleryShow(slide) {
    const swiperBound = this.querySelector('.swiper-bound');
    const iconClose = this.querySelector('.icon-close');
    this.dialog.showModal();
    this.slider.slideTo(slide.dataset.index);
    this.body.classList.add('overflow-clip');

    // Close the dialog only if clicking outside the content
    this.dialog.addEventListener('click', (event) => {
      if (!swiperBound.contains(event.target)) {
        this.galleryHide();
      }
    });

    iconClose.addEventListener('click', (event) => {
      this.galleryHide();
    });
  }

  galleryHide() {
    this.dialog.close();
    this.body.classList.remove('overflow-clip');
    const zoomInstance = this.slider.zoom;
    if (zoomInstance.scale !== 1) {
      zoomInstance.out(); // Zoom out
    }
  }
}
