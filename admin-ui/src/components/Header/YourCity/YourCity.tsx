import React, { useState } from 'react'

import { getCities } from '../../../services/getCities'

import s from './YourCity.module.scss'

const YourCity = () => {
  const [state, setState] = useState({
    edit: false,
    city: 'Москва',
    cities: []
  })

  const cityClick = () => {
    setState((state) => ({ ...state, edit: true }))
  }

  const autoCompleteClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    setState((s) => ({
      ...s,
      city: (e.target as any).textContent,
      edit: false
    }))
  }
  const onInputChange = () => {
    // /check/city/{name} GET
    getCities('cityInput').then((cities) =>
      setState((state) => ({ ...state, cities }))
    )
  }

  const cityText = !state.edit && (
    <a className={s.link} onClick={cityClick}>
      {state.city}
    </a>
  )

  const autocompleteArr = state.cities
    ?.slice(0, 5)
    .map((el: { region: string; city: string }) => (
      <span
        className={s.autocompleteItem}
        key={el.city}
        onClick={autoCompleteClick}
        onKeyDown={autoCompleteClick}
      >
        {el.city}
      </span>
    ))

  const autocompleteList = !!state.cities?.length && state.edit && (
    <div className={s.autocompleteList}>{autocompleteArr}</div>
  )

  const cityInput = state.edit && (
    <input
      placeholder={state.city}
      autoComplete="off"
      id="cityInput"
      type="text"
      autoFocus
      onBlur={() => {
        setTimeout(() => setState((state) => ({ ...state, edit: false })), 300)
      }}
      className={s.cityInput}
      onChange={onInputChange}
    />
  )

  return (
    <div className={s.cityWrapper}>
      <span>Ваш город: </span>
      {cityText}
      <div className={s.autocomplete}>
        {cityInput}
        {autocompleteList}
      </div>
    </div>
  )
}

export default YourCity
