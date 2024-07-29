import React, { Fragment } from 'react'
import Main from '../main/main'
import Footer from '../footer/footer'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/autoplay"
import { Autoplay } from 'swiper/modules';

const Header = () => {
    return (
        <div> 
            <Fragment>
                <Swiper
                    slidesPerView={1}
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false
                    }}
                    className='w-[] mt-[56px] '
                >
                    <SwiperSlide><img  className='w-[100%] h-[630px] object-cover' src="https://www.wallpaperuse.com/wallp/12-124262_m.jpghttps://www.wallpaperuse.com/wallp/12-124262_m.jpg" alt="bu yerda fast food rasmi bor" /></SwiperSlide>
                    <SwiperSlide><img className='w-[100%] h-[630px] object-cover' src="https://imageproxy.wolt.com/menu/menu-images/64fb03e8266572789d9bed9b/00accee8-f05b-11ee-97b8-22ebc3c256c5_img_8869.jpeg" alt="bu yerda fast food rasmi bor" /></SwiperSlide>
                    <SwiperSlide><img className='w-[100%] h-[630px] object-cover' src="https://img.freepik.com/premium-photo/juicy-burger-beef-grilled-burger-burger-close-up-cheeseburger-fries-drink-copyspace_1135385-22317.jpg" alt="bu yerda fast food rasmi bor" /></SwiperSlide>
                    <SwiperSlide><img className='w-[100%] h-[630px] object-cover' src="https://www.mamamiapizzeriamb.com/wp-content/uploads/2016/08/image-9.jpg" alt="bu yerda fast food rasmi bor" /></SwiperSlide>
                </Swiper>
                <Main />
                <Footer />
            </Fragment>
        </div>
    )
}

export default Header
