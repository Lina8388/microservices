import { FC } from 'react'

import s from './Typography.module.scss'

export const Text: FC = ({ children }) => {
  return <p className={s.text}>{children}</p>
}

export const Title: FC = ({ children }) => {
  return <h1 className={s.title}>{children}</h1>
}
