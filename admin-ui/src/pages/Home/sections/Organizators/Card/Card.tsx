import React, { FC } from 'react'
import { v4 } from 'uuid'
import Avatar from 'react-avatar'

import { CardProps } from '../../../../../types'
import mocktwo from '../../../../../assets/img/mock-org2.png'

import s from './Card.module.scss'

const Card: FC<Partial<CardProps>> = ({ name, surname, age, photo, desc }) => {
  return (
    <div className={s.wrapper}>
      <Avatar
        className={s.avatar}
        name={name + ' ' + surname}
        src={photo}
        size="200"
      />
      <div className={s.info}>
        <div className={s.name}>
          {name} {surname}
        </div>
        <div className={s.years}>{age} years</div>
        <div className={s.desc}>{desc}</div>
      </div>
      <footer className={s.footer}>
        <div className={s.followers}>
          {Array(3)
            .fill(0)
            .map((_, index, { length }) => {
              return (
                <div
                  className={s.follower}
                  key={v4()}
                  style={{
                    left: `${(33 * index) / 2}px`,
                    zIndex: `${length - index}`,
                    backgroundImage: `url(${mocktwo})`
                  }}
                ></div>
              )
            })}
        </div>
        <a className={s.moreDetail} href="#">
          more
        </a>
      </footer>
    </div>
  )
}

export default Card
