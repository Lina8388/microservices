import React, { useState, forwardRef } from 'react'

import { getCities } from '../../services/getCities'

import s from '../../components/Header/YourCity/YourCity.module.scss'
import sPA from './PersonalArea.module.scss'

interface inputProps {
  city: string
  name: string
}

const CityField = forwardRef<HTMLInputElement, inputProps>((props, ref) => {
  const [state, setState] = useState({
    edit: false,
    city: props.city,
    cities: [],
    value: props.city
  })

  const autoCompleteClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    setState((s) => ({
      ...s,
      city: (e.target as any).textContent,
      edit: false,
      value: (e.target as any).textContent
    }))
  }
  const onInputChange = () => {
    getCities('cityInput').then((cities) =>
      setState((state) => ({ ...state, cities }))
    )
  }

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

  return (
    <>
      <div className={`${s.autocomplete} ${sPA.form_input}`}>
        <input
          ref={ref}
          name={props.name}
          placeholder="Город"
          autoComplete="off"
          id="cityInput"
          type="text"
          autoFocus
          onBlur={() => {
            setTimeout(
              () => setState((state) => ({ ...state, edit: false })),
              300
            )
          }}
          className={sPA.input}
          onChange={onInputChange}
          onClick={() => setState((state) => ({ ...state, edit: true }))}
          onInput={(e) =>
            setState((state) => ({
              ...state,
              value: (e.target as HTMLInputElement).value
            }))
          }
          value={state.value}
        />
        {autocompleteList}
      </div>
    </>
  )
})

export default CityField
