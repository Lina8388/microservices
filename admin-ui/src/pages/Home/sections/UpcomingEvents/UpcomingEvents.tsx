import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'

import { GetAllEvents } from '../../../../services/GetAllEvents'

import s from './UpcomingEvents.module.scss'
import './swiper-user.scss'
// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/bundle'

const UpcomingEvents = () => {
  const [events, setEvents] = useState<any>([])

  useEffect(() => {
    GetAllEvents().then((events) => setEvents(events.eventDtoList))
  }, [])

  return (
    <section className={s.upcomingEvents}>
      <h1 className={s.title}>Ближайшие мероприятия возле вас</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        className="mySwiper"
        speed={2000}
      >
        {events.map((slide: any) => (
          <SwiperSlide key={v4()}>
            {' '}
            <div className={s.eventCard} key={v4()}>
              <div className={s.eventCard__tags}>
                {slide.eventInterests.map((item: any) => (
                  <div key={item.id} className={s.eventCard__tag}>
                    {item.title}
                  </div>
                ))}
              </div>
              <div className={s.eventCard__info}>
                <div className={s.eventCard__name}>{slide.eventName}</div>
                <div className={s.eventCard__desc}>
                  {slide.descriptionEvent}
                </div>
                <div className={s.eventCard__dateTime}>{slide.timeEvent}</div>
                <div className={s.eventCard__address}>город {slide.city}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to={'/events/moscow'}>
        <button className={s.upcomingEvents__otherEvents}>
          Другие мероприятия
        </button>
      </Link>

      {/* <div className={s.stats}>
        {[
          {
            title: "Всего мероприятий",
            count: "335 003",
          },
          {
            title: "Всего участников",
            count: "1 335 003",
          },
        ].map(({ title, count }) => (
          <div className={s.statsCard} key={title}>
            <div className={s.statsCard__title}>{title}</div>
            <div className={s.statsCard__count}>{count}</div>
          </div>
        ))}
      </div> */}
    </section>
  )
}

export default UpcomingEvents
