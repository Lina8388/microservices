import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import cls from 'classnames'
import './Input.scss'

interface InputProps {
  id?: string
  icon: 'place' | 'search'
  placeholder?: string
  value?: string
  onChange?: (inputValue: string) => void
}

const Input: FC<InputProps> = ({
  placeholder = 'enter something',
  id,
  icon,
  value,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState(value || '')

  useEffect(() => {
    if (value) setInputValue(value)
  }, [value])

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <div
      className={cls('input', {
        input_focus: focused
      })}
    >
      <div
        className={cls('input__icon', `input__icon--${icon}`)}
        onClick={() => inputRef.current?.focus()}
      />
      <input
        type="text"
        id={id}
        value={inputValue}
        className="input__field"
        placeholder={placeholder}
        onChange={(event) => handleOnChangeInput(event)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={inputRef}
      />
    </div>
  )
}

export default Input
