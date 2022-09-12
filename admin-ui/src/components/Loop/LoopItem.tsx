import { FC } from 'react'

import { LoopItemProps } from '../../types'

import s from './style.module.scss'

const LoopItem: FC<LoopItemProps> = ({ children, ...geometry }) => {
  return (
    <div className={s.loopItem} style={geometry}>
      {children}
    </div>
  )
}

export default LoopItem
