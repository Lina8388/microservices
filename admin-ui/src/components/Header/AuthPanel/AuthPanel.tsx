import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../../redux/store'

import s from './AuthPanel.module.scss'

const AuthPanel: FC = () => {
  const { photo, username } = useSelector(
    (state: RootState) => state.userReducer.userDto
  )
  return (
    <div className={s.authPanel}>
      <div className={s.avatar}>
        <img src={photo} alt="" />
      </div>
      <div className={s.login}>{username || 'Anonymous'}</div>
      <Link to="/personal-area">
        <button className={s.btnFill}>Подробнее</button>
      </Link>
    </div>
  )
}

export default AuthPanel
