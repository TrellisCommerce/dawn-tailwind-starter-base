import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class MenuSwiper extends window.HTMLElement {
  constructor() {
    super();

    console.log('test');

    this.slider = new Swiper('.menu.swiper', {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 4,
      autoplay: false,
      scrollbar: { draggable: true },
      spaceBetween: 10,
    });

    // Bind handleResize to this instance
    this.handleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    window.addEventListener('resize', this.handleResize);

    if (window.innerWidth > 768) {
      this.destroySlider();
    } else {
      this.initSlider();
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.destroySlider();
    } else {
      this.initSlider();
    }
  }

  initSlider() {
    this.slider = new Swiper('.menu.swiper', {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 4,
      autoplay: false,
      scrollbar: { draggable: true },
      spaceBetween: 10,
    });
    console.log('slider init', this.slider);
  }

  destroySlider() {
    if (this.slider) {
      this.slider.destroy(true, true);
      console.log('this slider', this.slider);
    }
  }
}
