import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const ImageSlider = () => {
  return (
    <Swiper className="mySwiper" spaceBetween={0} slidesPerView={3}>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/200/300" />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
