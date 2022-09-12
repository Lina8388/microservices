import { FC } from 'react'
import DatePicker from 'react-date-picker'

import s from '../../../pages/SignPage/Form.module.scss'

import classes from './Calendar.module.scss'

type TProps = {
  value: Date
  onChange: any
}

const Calendar: FC<TProps> = ({ value, onChange }) => {
  return (
    <div>
      <p className={classes.title}>Дата раждения</p>
      <DatePicker className={s.input} value={value} onChange={onChange} />
    </div>
  )
}

export default Calendar
