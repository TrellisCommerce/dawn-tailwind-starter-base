import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class SwiperSlider extends window.HTMLElement {
  constructor() {
    super();

    this.slider = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 4,
      autoplay: false,
      spaceBetween: 10,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hide: true,
      },

      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });
  }
}
