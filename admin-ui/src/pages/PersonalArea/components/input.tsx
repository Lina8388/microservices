import { forwardRef } from 'react'

import s from '../PersonalArea.module.scss'

interface inputProps {
  name: string
  value: string
  errors: { [x: string]: any }
  placeholder: string
  type: string
  onInput: (e: any) => void
}

const Input = forwardRef<HTMLInputElement, inputProps>((props, ref) => {
  const { name, errors, ...other } = props
  return (
    <div className={s.form_input}>
      <input
        name={name}
        className={s.input}
        style={errors[name] && { borderColor: '#F5222D' }}
        ref={ref}
        {...other}
      />
      {errors && (
        <div className="form_input_error">
          {errors[name] && (
            <span>{errors[name]?.message || 'Это поле обязательно'}</span>
          )}
        </div>
      )}
    </div>
  )
})

export default Input
