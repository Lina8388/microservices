import React, { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 } from 'uuid'

import { getTopUsers } from '../../../../services/getTopUsers'
import { CardProps, UserDto } from '../../../../types'

import Card from './Card'
import s from './Organizators.module.scss'

const Organizators: FC = () => {
  const [data, setData] = useState<Partial<CardProps>[]>([
    {
      name: 'Danil',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Anton',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Olga',
      surname: 'Belova',
      age: 24
    },

    {
      name: 'Lena',
      surname: 'Zotova',
      age: 24
    },

    {
      name: 'Sergey',
      surname: 'Zotov',
      age: 24
    },
    {
      name: 'Danil',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Anton',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Olga',
      surname: 'Belova',
      age: 24
    },

    {
      name: 'Lena',
      surname: 'Zotova',
      age: 24
    },

    {
      name: 'Sergey',
      surname: 'Zotov',
      age: 24
    },

    {
      name: 'Sergey',
      surname: 'Zotov',
      age: 24
    }
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getTopUsers('Москва').then((users) => {
      const topUsers: Partial<CardProps>[] = users.map((user: UserDto) => {
        return {
          name: user.firstName,
          surname: user.lastName,
          age: user.age,
          photo: user.photo,
          desc: user.aboutUser
        }
      })
      setData(topUsers)
    })
  }, [])

  return (
    <section ref={wrapperRef}>
      <header className={s.header}>
        <h1 className={s.title}>Популярные организаторы</h1>
        <p className={s.subTitle}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </header>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={true}
        modules={[Autoplay]}
        autoplay={{ delay: 0.01, disableOnInteraction: false }}
        className="mySwiper1"
        speed={6000}
      >
        {data.map((slide: any) => (
          <SwiperSlide key={v4()}>
            <Card {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to="/people">
        <button className={s.more}>Больше организаторов</button>
      </Link>
    </section>
  )
}

export default Organizators
