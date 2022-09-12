import React, { HTMLProps } from 'react'
import classNames from 'classnames'

import s from '../../pages/SignPage/Form.module.scss'

import localStyle from './Input.module.scss'

interface InputProps extends HTMLProps<HTMLInputElement> {
  serverValidate?: boolean
  value: string
}

const Input = (props: InputProps) => {
  // флаг валидации поля сервером (не обязательно)
  const { serverValidate, ...restProps } = props
  const inputClass = classNames(s.input, {
    [localStyle.serverValidate]: serverValidate
  })
  return <input className={inputClass} {...restProps} />
}

export default Input
