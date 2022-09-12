import React from 'react'

import citiImg from '../../assets/img/admin.png'
import { EventDto } from '../../types'
import formatTime from '../../utilites/formatTime'
import formatDate from '../../utilites/formatDate'

import s from './CardEvent.module.scss'

interface CardEventProps {
  event: EventDto
}

const CardEvent = (props: CardEventProps) => {
  const { event } = props
  const beginEventTime = formatTime(event.timeEvent[3], event.timeEvent[4])
  const endEventTime = formatTime(event.timeEvent[3] + 1, event.timeEvent[4])
  const yearEvent = event.timeEvent[0]
  const monthEvent = event.timeEvent[1]
  const dayEvent = event.timeEvent[2]
  return (
    <div className={`${s.card__container}`} key={event.id}>
      <div className={`${s.card}`}>
        <img className={`${s.card__img}`} src={citiImg} alt="Фото города" />
        <div className={`${s.card__widgetContainer}`}>
          <div className={`${s.card__widget}`}>Досуг</div>
          <div className={`${s.card__widget}`}>Гитара</div>
        </div>
        <section className={`${s.card__textSection}`}>
          <p className={`${s.eventDescription__title}`}>{event.eventName}</p>
          <p className={`${s.eventDescription__description}`}>
            {event.descriptionEvent}
          </p>
          <div className={`${s.card__eventPlace}`}>
            <div className={`${s.eventPlace__textField}`}>
              <div className={`${s.eventPlace__day}`}>
                {formatDate(yearEvent, monthEvent, dayEvent)}
              </div>
              <div
                className={`${s.eventPlace__time}`}
              >{`с ${beginEventTime}  до ${endEventTime}`}</div>
              <div className={`${s.eventPlace__sharer}`}>
                <span>Участники:</span> {event.eventNumberOfParticipant}
              </div>
              <div className={`${s.eventPlace__place}`}>
                <span>Место проведения:</span> {event.placeEvent}
              </div>
            </div>
            <div className={`${s.eventPlace__ageLimit}`}>12+</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CardEvent
