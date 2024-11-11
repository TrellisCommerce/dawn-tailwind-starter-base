import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class MenuSwiper extends window.HTMLElement {
  constructor() {
    super();

    // Bind handleResize to this instance
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    window.addEventListener('resize', this.handleResize);

    if (window.innerWidth > 989) {
      if (this.slider) {
        this.destroySlider();
      }
    } else {
      this.initSlider();
    }
  }

  handleResize() {
    if (window.innerWidth > 989) {
      this.destroySlider();
    } else {
      this.initSlider();
    }
  }

  initSlider() {
    if (!this.slider) {
      this.slider = new Swiper(this, {
        modules: [Navigation, Pagination, Scrollbar],
        slidesPerView: 4.5,
        autoplay: false,
        loop: true,
        scrollbar: { draggable: true },
        spaceBetween: 10,
        breakpoints: {
          750: {
            slidesPerView: 4.5,
          },
          500: {
            slidesPerView: 5.5,
          },
        },
      });
    }
  }

  destroySlider() {
    this?.slider?.destroy(true, true);
    this.slider = null;
  }
}
