import React, { FC } from 'react'

import s from './Nav.module.scss'

const Nav: FC = () => {
  return (
    <nav className={s.wrapper}>
      <ul className={s.list}>
        <li className={`${s.listItem} ${s.listItem_active}`}>Solutions</li>
        <li className={`${s.listItem}`}>About</li>
        <li className={`${s.listItem}`}>Pricing</li>
      </ul>
    </nav>
  )
}

export default Nav
