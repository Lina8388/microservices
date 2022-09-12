import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from './Input/Input'
import Title from './Title'
import WidgetGrid from './WidgetGrid'
import s from './WhatDoWant.module.scss'
import { Place } from './Place/Place'

const WhatDoWant = () => {
  //TODO прокинуть значения из header-> YourCity
  const [cityName, setCityName] = useState('Москва')

  const navigate = useNavigate()
  const handleClickSearchButton = () => {
    navigate(`/events/${cityName}`)
  }
  const getCityName = (value: string) => {
    setCityName(value)
  }
  return (
    <>
      <Title />
      <section className={s.whatDoWant}>
        <div className={`${s.whatDoWantSearch}`}>
          <div className={s.whatDoWantSearch__top}>
            <Input placeholder={'Поищите "Игры"'} icon="search" />
            <Place getCityName={getCityName} value={cityName} />
          </div>

          <button
            className={s.whatDoWantSearch__btn}
            onClick={handleClickSearchButton}
          >
            Поиск
          </button>
        </div>

        <div className={`${s.whatDoWantSearch}`}>
          <WidgetGrid
            widgetList={[
              'Скоро начнутся',
              'Сегодня',
              'Завтра',
              'Сегодня',
              'Завтра',
              'Сегодня',
              'Завтра'
            ]}
          />
        </div>
      </section>
    </>
  )
}

export default WhatDoWant
