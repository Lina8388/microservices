import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import cls from 'classnames'

import s from './ButtonPanel.module.scss'

const ButtonPanel: FC = () => {
  return (
    <div className={cls(s.wrapper)}>
      <Link to="/sign-in">
        <button className={cls(s.btnFill, s.btn)}>Log in</button>
      </Link>

      <Link to="/sign-up">
        <button className={cls(s.btnFill, s.btn)}>Get started</button>
      </Link>
    </div>
  )
}

export default ButtonPanel
