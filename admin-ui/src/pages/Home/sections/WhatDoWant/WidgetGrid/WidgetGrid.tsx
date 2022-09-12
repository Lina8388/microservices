import React, { FC } from 'react'
import { v4 } from 'uuid'

import s from './WidgetGrid.module.scss'

interface WidgetGrid {
  widgetList: string[]
}

const WidgetGrid: FC<WidgetGrid> = ({ widgetList }) => {
  return (
    <ul className={s.widgetGrid}>
      {widgetList.map((widgetName) => (
        <li className={s.widgetGrid__widget} key={v4()}>
          {widgetName}
        </li>
      ))}
    </ul>
  )
}

export default WidgetGrid
