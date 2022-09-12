import React, { FC, useState } from 'react'

import Input from '../Input/Input'
import { getCities } from '../../../../../services/getCities'

import s from './Place.module.scss'

interface PlaceProps {
  value?: string
  getCityName: (value: string) => void
}

export const Place: FC<PlaceProps> = ({ value, getCityName }) => {
  const [state, setState] = useState({
    city: value || '',
    cities: [],
    edit: false
  })

  const input = () => document.getElementById('place')

  const autocomplete = () => document.getElementById('list')

  const closeAutoComplete = (e: any) =>
    !e.path.some((el: React.ReactNode) =>
      el === autocomplete() || el === input()
        ? setState((state) => ({ ...state, edit: false }))
        : null
    )

  document.addEventListener('click', closeAutoComplete)

  const autoCompleteClick = (e: any) => {
    setState((state) => ({ ...state, city: e.target.innerText, edit: false }))
    getCityName(e.target.innerText)
  }

  const autocompleteArr = state.cities.slice(0, 5).map((el: any, i) => (
    <span
      className={s.autocompleteItem}
      key={i}
      onClick={autoCompleteClick}
      onKeyDown={autoCompleteClick}
    >
      {el.city}
    </span>
  ))

  const autocompleteList = !!state.cities.length && state.edit && (
    <div className={s.autocompleteList} id="list">
      {autocompleteArr}
    </div>
  )

  const handleChangeInputValue = (inputValue: string) => {
    setState((state) => ({ ...state, edit: true, city: inputValue }))
    // /check/city/{name} GET
    getCities('place').then((result) =>
      result ? setState((state) => ({ ...state, cities: result })) : null
    )
  }

  return (
    <div className={s.autocomplete}>
      <Input
        id="place"
        value={state.city}
        placeholder="Местоположение"
        icon="place"
        onChange={(inputValue: string) => handleChangeInputValue(inputValue)}
      />
      {autocompleteList}
    </div>
  )
}
