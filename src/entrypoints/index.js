import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import './base.css';

import SwiperSlider from '../components/swiper';
import MenuSwiper from '../components/menu-swiper';
import PhotoGallery from '../components/photo-gallery';

window.customElements.define('swiper-slider', SwiperSlider);
window.customElements.define('menu-swiper', MenuSwiper);
window.customElements.define('photo-gallery', PhotoGallery);
