import React, { ChangeEvent } from 'react'

import { IFilterInputProps } from '../../types'

import s from './FilterInput.module.scss'

const FilterInput: React.FC<IFilterInputProps> = ({
  onBlur,
  onChange,
  data,
  filter
}) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputText } = e.target
    onChange(data, inputText)
  }

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => onBlur(filter), 500)
  }

  return (
    <input
      type="text"
      className={s.filterInput}
      autoFocus
      onChange={onChangeInput}
      onBlur={onBlurInput}
    />
  )
}

export default FilterInput
