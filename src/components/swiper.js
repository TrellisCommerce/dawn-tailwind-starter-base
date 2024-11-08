import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default class SwiperSlider extends window.HTMLElement {
  constructor() {
    super();

    this.slider = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 4,
      autoplay: false,
      Scrollbar: true,
      spaceBetween: 10,
    });
  }
}
