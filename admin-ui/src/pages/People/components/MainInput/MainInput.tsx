import React from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/img/search.svg'

import s from './MainInput.module.scss'

const MainInput = () => {
  return (
    <div className={s.inputWrapper}>
      <input
        type="text"
        className={s.input}
        defaultValue="Москва"
        placeholder="Я хочу найти товарища"
      />
      <button type="submit" className={s.searchButton}>
        <SearchIcon className={s.searchIcon} />
      </button>
    </div>
  )
}

export default MainInput
