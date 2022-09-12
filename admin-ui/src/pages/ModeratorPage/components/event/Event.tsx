import { useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'

import s from '../../ModeratorPage.module.scss'

export const Event = ({ event, selectedEvent, changeSelectedEvent }: any) => {
  const allEventsTimer = useStopwatch({ autoStart: true })
  const selectedEventTimer = useStopwatch({ autoStart: false })

  useEffect(
    () =>
      event.eventID === selectedEvent.eventID
        ? selectedEventTimer.start()
        : selectedEventTimer.pause(),
    [selectedEvent]
  )

  const formatTime = (number: number) => {
    if (number < 10) {
      return `0${number}`
    }
    return `${number}`
  }

  return (
    <li
      className={
        event.eventID === selectedEvent.eventID
          ? `${s.event} ${s.event_active}`
          : s.event
      }
      onClick={() => {
        changeSelectedEvent(event)
      }}
    >
      <div className={s.event__info}>
        <h4 className={s.event__name}>{event.eventName}</h4>
        <h6 className={s.event__author}>Автор: {event.eventAuthor}</h6>
        <h6 className={s.event__place}>Город: {event.eventPlace}</h6>
      </div>
      <div className={s.event__timer}>
        {/* Как только событие подгрузилось (было получено) */}
        <h4 className={s.event__timer_left}>
          {formatTime(allEventsTimer.minutes) +
            ':' +
            formatTime(allEventsTimer.seconds)}
        </h4>
        {/* Время обслуживания (пока находишься на этом мероприятии) */}
        <h4 className={s.event__timer_right}>
          {formatTime(selectedEventTimer.minutes) +
            ':' +
            formatTime(selectedEventTimer.seconds)}
        </h4>
      </div>
    </li>
  )
}
