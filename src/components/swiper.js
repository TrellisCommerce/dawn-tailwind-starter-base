import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class SwiperSlider extends window.HTMLElement {
  constructor() {
    super();

    this.slider = new Swiper(this, {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 1.5,
      autoplay: false,
      spaceBetween: 10,
      breakpoints: {
        750: {
          slidesPerView: 2.5,
        },
        1000: {
          slidesPerView: 4,
        },
      },

      navigation: {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev'),
        hide: true,
      },

      scrollbar: {
        el: this.querySelector('.swiper-scrollbar'),
        draggable: true,
      },
    });
  }
}
