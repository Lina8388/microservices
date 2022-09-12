import React, { FC } from 'react'
import cls from 'classnames'

import s from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={s.wrapper}>
      <div className={s.social}>
        <header className={s.socialHeader}>
          <div className={s.socialTitle}>TeamUp</div>
          <div className={s.socialText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </header>

        <div className={s.iconsRow}>
          <div className={cls(s.icon, s.icon_facebook)} />
          <div className={cls(s.icon, s.icon_twitter)} />
          <div className={cls(s.icon, s.icon_linkedin)} />
          <div className={cls(s.icon, s.icon_youtube)} />
          <div className={cls(s.icon, s.icon_phone)} />
        </div>
      </div>

      <nav className={s.nav}>
        <div className={s.navSection}>
          <div className={s.navTitle}>Products</div>
          <div className={s.navItem}>Product 1</div>
          <div className={s.navItem}>Product 2</div>
          <div className={s.navItem}>Product 3</div>
          <div className={s.navItem}>Product 4</div>
        </div>
        <div className={s.navSection}>
          <div className={s.navTitle}>Services</div>
          <div className={s.navItem}>Service 1</div>
          <div className={s.navItem}>Service 2</div>
          <div className={s.navItem}>Service 3</div>
          <div className={s.navItem}>Service 4</div>
        </div>
        <div className={s.navSection}>
          <div className={s.navTitle}>Resources</div>
          <div className={s.navItem}>Resource 1</div>
          <div className={s.navItem}>Resource 2</div>
          <div className={s.navItem}>Resource 3</div>
          <div className={s.navItem}>Resource 4</div>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
