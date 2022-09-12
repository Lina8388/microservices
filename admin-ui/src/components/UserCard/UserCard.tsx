import React from 'react'
import { Link } from 'react-router-dom'

import { UserDto } from '../../types'

import s from './UserCard.module.scss'

interface IUserCard extends UserDto {
  photo?: string
  age: number
}

const UserCard: React.FC<IUserCard> = ({
  photo,
  firstName,
  lastName,
  userInterests,
  age,
  id
}) => {
  const interests = userInterests?.map((el, i) => (
    <span key={i} className={s.interest}>
      {el.title}
    </span>
  ))

  return (
    <Link to={`/public/user/id/${id}`}>
      <div className={s.userCard}>
        <img
          className={s.userImage}
          src={
            photo ||
            'https://images.unsplash.com/photo-1527980965255-d3b416303d12'
          }
          alt=""
        />
        <span className={s.name}>{`${firstName} ${lastName}`}</span>
        <div className={s.interests}>{interests}</div>
        <span className={s.city}>Город: Москва</span>
        <p className={s.description}>
          Равным образом дальнейшее развитие различных форм деятельности
          представляет собой интересный эксперимент проверки системы обучения
          кадров, соответствует насущным потребностям.
        </p>
        <span className={s.age}>Возраст: {age}</span>
        <span className={s.followers}>Подписчики: 25</span>
        <span className={s.events}>Кол-во мероприятий: 12</span>
      </div>
    </Link>
  )
}

export default UserCard
