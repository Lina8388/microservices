import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import Avatar from 'react-avatar'

import getUserProfile from '../../services/GetUserProfile'
import { UserDto } from '../../types'
import getUserEvents from '../../services/getUserEvents'
import CardEvent from '../../components/CardEvent/CardEvent'

import 'antd/dist/antd.css'
import s from './PersonalArea.module.scss'

const AboutUser: FC = () => {
  const { id: userID } = useParams()

  const initialState: UserDto = {
    id: 0,
    username: 'test',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    photo: 'https://images.unsplash.com/photo-1532318065232-2ba7c6676cd5?w=200',
    email: '',
    city: 'Москва',
    aboutUser: '',
    userInterests: [],
    age: 18,
    role: ''
  }

  const [getProfile, setProfile] = useState<UserDto>(initialState)
  const [events, setEvents] = useState([
    {
      'id': 3,
      'eventName': '',
      'descriptionEvent': '',
      'placeEvent': '',
      'city': 'Москва',
      'timeEvent': [2022, 3, 10, 11, 0],
      'timeEndEvent': [2022, 4, 9, 20, 0],
      'eventPrivacy': null,
      'participantsCount': 110,
      'countViewEvent': 14,
      'eventType': {
        'id': 2,
        'type': 'Выставка'
      },
      'authorId': 2,
      'eventInterests': [
        {
          'id': 2,
          'title': 'Искусство',
          'shortDescription': 'Картины, живопись, графика.'
        }
      ],
      'status': {
        'id': 2,
        'status': 'На проверке',
        'success': null,
        'failure': null
      },
      'minYear': null
    }
  ])

  useEffect(() => {
    if (userID) getUserProfile(+userID).then((user) => setProfile(user.userDto))
    if (userID)
      getUserEvents(+userID).then((events) => setEvents(events.eventDtoList))
    return setProfile(initialState)
  }, [])

  const {
    firstName,
    lastName,
    email,
    age,
    city,
    photo,
    username,
    userInterests,
    aboutUser
  } = getProfile
  const renderEvents = (): number => (window.window.innerWidth >= 1920 ? 3 : 2)

  const [slice, setSlace] = useState<number>(renderEvents())
  const eventList: any = events.map((event: any) => (
    <div key={event.id} className={`${s.card}`}>
      <CardEvent key={event.id} event={event} />
    </div>
  ))

  const interests: any = userInterests?.map((interest) => {
    const title = interest.title[0].toUpperCase() + interest.title.slice(1)
    return (
      <div key={interest.id} className={`${s.interest}`}>
        {title}
      </div>
    )
  })
  if (username === 'test') return <Spin size="large" />
  else
    return (
      <>
        <div className={`${s.personalArea}`}>
          <div className={`${s.basicData}`}>
            <div className={`${s.basicData_data}`}>
              <div className={`${s.basicData_avatar}`}>
                <Avatar
                  name={firstName + ' ' + lastName}
                  src={photo}
                  round={true}
                  size="300"
                />
              </div>
              <div className={`${s.basicData_information}`}>
                <h2 className={`${s.basicData_information__name}`}>
                  {firstName + ' ' + lastName}
                </h2>
                <span className="basicData_information__username">
                  {username}
                </span>
                <span className="basicData_information__email">{email}</span>
                <span className="basicData_information__age">{age}</span>
                <span className="basicData_information__city">{city}</span>
              </div>
            </div>
            <div className={`${s.basicData_subscribesAndEvents}`}>
              <div className={`${s.basicData_subscribes}`}>
                <div className={`${s.basicData_subscribes__images}`}>
                  <Avatar
                    className={`${s.three}`}
                    name="Дмитрий Волков"
                    src={photo}
                    round={true}
                    size="50"
                  />
                  <Avatar
                    className={`${s.two}`}
                    name="Вася Пупкин"
                    src={photo}
                    round={true}
                    size="50"
                  />
                  <Avatar
                    className={`${s.one}`}
                    name="Александр Пушкин"
                    src={photo}
                    round={true}
                    size="50"
                  />
                </div>
                <span className="basicData_subscribes__title">
                  {`${eventList.length + 17} подписчиков`}
                </span>
              </div>
              <span className="basicData_events">
                {`${eventList.length} мероприятий`}
              </span>
            </div>
          </div>
          <div className={`${s.aboutUs}`}>
            <h3 className={`${s.blockTitle}`}>Обо мне</h3>
            <div className={`${s.aboutUs_block}`}>
              <p className={`${s.aboutUs_text}`}>{aboutUser}</p>
            </div>
          </div>
          <div className={`${s.interests}`}>
            <h3 className={`${s.blockTitle}`}>Интересы</h3>
            <div className={`${s.interests_conteiner}`}>{interests}</div>
          </div>
          <div className={s.myActivities}>
            <h3 className={s.myActivities_blockTitle}>
              Актуальные мероприятия
            </h3>
            <div className={s.myActivities_conteiner}>
              {eventList.slice(0, slice)}
              {eventList.slice(0, slice)}
              {eventList.slice(0, slice)}
            </div>
            <div className={s.myActivities_btn}>
              <button
                onClick={() => setSlace(slice + renderEvents())}
                className={s.btnFill}
              >
                Больше мероприятий
              </button>
            </div>
          </div>
          <div className={s.myActivities}>
            <h3 className={s.myActivities_blockTitle}>
              Другие мероприятия этого пользователя
            </h3>
            <div className={s.myActivities_conteiner}>
              {eventList.slice(0, slice)}
              {eventList.slice(0, slice)}
              {eventList.slice(0, slice)}
            </div>
            <div className={s.myActivities_btn}>
              <button
                onClick={() => setSlace(slice + renderEvents())}
                className={s.btnFill}
              >
                Больше мероприятий
              </button>
            </div>
          </div>
        </div>
      </>
    )
}

export default AboutUser
