import { useState } from 'react'

import placeholdermoderator from '../../assets/img/placeholdermoderator.png'

import s from './ModeratorPage.module.scss'
import { Event } from './components/event'

const initialState = {
  eventID: 0,
  eventName: 'INITIAL',
  eventAuthor: 'INITIAL',
  eventPlace: 'INITIAL',
  eventAuthorAge: 1,
  eventAuthorEventsCount: 0,
  eventAuthorSignDate: '00.00.0000',
  eventDescriptionShort: 'INITIAL',
  eventDescriptionLarge: 'INITIAL'
}

const events = [
  {
    eventID: 1,
    eventName: 'Размахивание грязными тряпками',
    eventAuthor: 'Бес',
    eventPlace: 'Москва',
    eventAuthorAge: 12,
    eventAuthorEventsCount: 10,
    eventAuthorSignDate: '22.10.2002',
    eventDescriptionShort:
      'Lorem ipsum dolor sit amet confhfghsdgsectetur adipisicing elit. Recusandae aliquam illum officia a tempora fugit illo, nesciunt, minus iste cupiditate explicabo accusamus, laboriosam ratione vel. Fugit ut delectus laborum blanditiis.',
    eventDescriptionLarge:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elsdgit. Facere impedit harum dekjadbgkjsbgkjbsdglectus aliquam, non dolores cumque est architecto ad, eius adipisci corrupti deleniti quos dolorum soluta eligendi at a placeat? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut sint culpa at sapiente modi expedita temporibus, dolores iure libero quas, suscipit possimus fugiat laudantium consequuntur explicabo dolorum nesciunt! Est.'
  },
  {
    eventID: 2,
    eventName: 'Отдирание наклеек с бананов',
    eventAuthor: 'Поставщик',
    eventPlace: 'Ижевск',
    eventAuthorAge: 11,
    eventAuthorEventsCount: 15,
    eventAuthorSignDate: '12.02.2001',
    eventDescriptionShort:
      'Lorem ipsum dolor sit amet consectetur adipisicing elqlqrhh32oi5it. Recusandae aliquam illum officia a tempora fugit illo, nesciunt, minus iste cupiditate explicabo accusamus, laboriosam ratione vel. Fugit ut delectus laborum blanditiis.',
    eventDescriptionLarge:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere impedit harum delectus klsdgnlksdnglksdnglnsdlgnsdklgnlsdnglksndglaliquam, non dolores cumque est architecto ad, eius adipisci corrupti deleniti quos dolorum soluta eligendi at a placeat? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut sint culpa at sapiente modi expedita temporibus, dolores iure libero quas, suscipit possimus fugiat laudantium consequuntur explicabo dolorum nesciunt! Est.'
  },
  {
    eventID: 3,
    eventName: 'Покупка макбуков для уничтожения',
    eventAuthor: 'РКН',
    eventPlace: 'Москва',
    eventAuthorAge: 42,
    eventAuthorEventsCount: 16,
    eventAuthorSignDate: '23.01.2022',
    eventDescriptionShort:
      'Lorem ipsum dolor saosifhjihfo323ing elit. Recusandae aliquam illum officisdgsdga a tempora fugit illo, nesciunt, minus iste cupiditate explicabo accusamus, laboriosam ratione vel. Fugit ut delectus laborum blanditiis.',
    eventDescriptionLarge:
      'asfasfg2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facsdgsdgdsgsdgere impedit harum delectus aliquam, non dolores cumque est architecto ad, eius adipisci corrupti deleniti quos dolorum soluta eligendi at a placeat? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut sint culpa at sapiente modi expedita temporibus, dolores iure libero quas, suscipit possimus fugiat laudantium consequuntur explicabo dolorum nesciunt! Est.'
  },
  {
    eventID: 4,
    eventName: 'Сливание общего бюджета проекта',
    eventAuthor: 'ТимЛид',
    eventPlace: 'Москва',
    eventAuthorAge: 5,
    eventAuthorEventsCount: 19,
    eventAuthorSignDate: '06.02.2021',
    eventDescriptionShort:
      'Lorem ipsum doloaskjfbkjasfbjkasbfkr sit amet consectetur adipisicing elit. Recusandae aliquam illum officia a tempora fugit illo, nesciunt, minus iste cupiditate explicabo accusamus, laboriosam ratione vel. Fugit ut delectus laborum blanditiis.',
    eventDescriptionLarge:
      'Loreaskjfbkjasfbkasbjfkbasjkfbjkasfbjkasbfbjkasfvasbvfkvaskfasfjkasbfbaksjfbjkasbfkjabsfkbaskfbaskjfasbjfkjasfbkjasbfasjkfbaksfbkasbfkjasbfkbaskjfbakjsnfkasklfnalksnflksdbgklbdsfgklndfkjgndflkbgkldfnbgkjdfngjkbdfkjgbdfkjgnkjerbglkewbgklsdngkbsdlkgbsdkjgbljsdbgjklsbgkewbgjkbwekjgbkjwebglbsdkjgbjksdbgkjsdbgljwebgbwekhgbwelgbkjsdbgkjsdbgkjsdbgbsdkjgbsdkgjbskdjgbm ipsum dsafnasfnlasolor sit amet, consectetur adipisicing elit. Facere impedit harum defdlgnlkdfglectus aliquam, non dolores cumque est architecto ad, eius adipisci corrupti deleniti quos dolorum soluta eligendi at a placeat? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem ut sint culpa at sapiente modi expedita temporibus, dolores iure libero quas, suscipit possimus fugiat laudantium consequuntur explicabo dolorum nesciunt! Est.'
  }
]

export const ModeratorPage = () => {
  const [selectedEvent, changeSelectedEvent] = useState(initialState)

  return (
    <>
      <header className={s.header}>
        <h6 className={s.header__logo}>TeamUp Group</h6>
        <button className={s.header__exit}>Выйти</button>
      </header>
      <section className={s.section}>
        <aside className={s.moderator__info}>
          <div className={s.moderator__meta}>
            <img
              src={placeholdermoderator}
              alt=""
              className={s.moderator__avatar}
            />
            <h6 className={s.moderator__name}>Валентина Краснова</h6>
          </div>
          <select className={s.moderator__status} name="moderator__status">
            <option value="ready">Готов</option>
            <option value="not-ready">Не готов</option>
          </select>
          <ul className={s.moderator__events}>
            {events.map((event) => (
              <Event
                event={event}
                selectedEvent={selectedEvent}
                changeSelectedEvent={changeSelectedEvent}
                key={event.eventID}
              />
            ))}
          </ul>
        </aside>
        <main className={s.event__section}>
          <div className={s.event__section_header}>
            <div className={s.event__author_meta}>
              <h4 className={s.event__author_name}>
                {selectedEvent.eventAuthor}
              </h4>
              <h6 className={s.event__author_age}>
                {selectedEvent.eventAuthorAge} лет
              </h6>
              <h6 className={s.event__author_events_count}>
                {selectedEvent.eventAuthorEventsCount} мероприятий
              </h6>
            </div>
            <h6 className={s.event__author_sign_date}>
              Дата регистрации: {selectedEvent.eventAuthorSignDate}
            </h6>
            <a href="" className={s.event__author_card}>
              Открыть карточку пользователя
            </a>
          </div>
          <div className={s.event__section_body}>
            <div className={s.event__section_meta}>
              <img
                src={placeholdermoderator}
                alt=""
                className={s.event__section_img}
              />
              <div className={s.event__section_info}>
                <h3 className={s.event__section_info_name}>
                  {selectedEvent.eventName}
                </h3>
                <h4 className={s.event__section_info_meta}>
                  Место проведения:
                </h4>
                <h4 className={s.event__section_info_meta}>Город:</h4>
                <h4 className={s.event__section_info_meta}>
                  Время проведения:
                </h4>
                <h4 className={s.event__section_info_meta}>
                  Маркер приватности:
                </h4>
                <h4 className={s.event__section_info_meta}>Тип мероприятия:</h4>
                <h4 className={s.event__section_info_meta}>
                  Минимальный возраст:
                </h4>
              </div>
            </div>
            <div className={s.event__section_description}>
              <div className={s.event__section_description_short}>
                <h3 className={s.event__section_description_title}>
                  Краткое описание
                </h3>
                <textarea
                  className={s.event__section_description_short_textarea}
                  readOnly
                  value={selectedEvent.eventDescriptionShort}
                />
              </div>
              <div className={s.event__section_description_large}>
                <h3 className={s.event__section_description_title}>
                  Описание мероприятия
                </h3>
                <textarea
                  className={s.event__section_description_large_textarea}
                  readOnly
                  value={selectedEvent.eventDescriptionLarge}
                />
              </div>
            </div>
            <div className={s.event__section_buttons}>
              <button className={s.event__section_buttons_deny}>
                Отклонить
              </button>
              <button className={s.event__section_buttons_approve}>
                Разрешить
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}
