import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import s from './HowWorks.module.scss'

const HowWorks: FC = () => {
  return (
    <section className={`${s.howWorks}`}>
      <h1 className={`${s.howWorks__title}`}>Как работает TeamUp</h1>
      <div className={`${s.howWorks__cardList}`}>
        {['anchor', 'flag', 'achieve'].map((iconName) => (
          <div className={s.howWorksCard} key={iconName}>
            <div
              className={`${s.howWorksCard__icon} ${
                s[`howWorksCard__icon_${iconName}`]
              }`}
            />
            <h1 className={s.howWorksCard__title}>Solution</h1>
            <p className={s.howWorksCard__text}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
        ))}
      </div>
      <Link to="/sign-up">
        <button className={s.howWorks__joinToUs}>Присоединиться к нам</button>
      </Link>
    </section>
  )
}

export default HowWorks
