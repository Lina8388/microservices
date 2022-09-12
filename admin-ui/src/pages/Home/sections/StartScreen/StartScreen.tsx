import React from 'react'

import s from './StartScreen.module.scss'

const StartScreen = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.offer}></div>
      <div className={s.inner}>
        <h1 className={s.title}>ABOUT US</h1>
        <p className={s.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  )
}

export default StartScreen
