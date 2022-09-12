import React from 'react'

import { ReactComponent as ArrowDown } from '../../../../assets/img/down-arrow.svg'
import { IFilterBtn } from '../../types'

import s from './FilterBtn.module.scss'

const FilterBtn: React.FC<IFilterBtn> = ({ func, textBtn, color }) => {
  const classes = color ? `${s.filter} ${s.green}` : s.filter
  return (
    <button className={classes} onClick={func}>
      {textBtn} <ArrowDown className={s.downArrow} />
    </button>
  )
}

export default FilterBtn
