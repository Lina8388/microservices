import React, { useEffect, useState } from 'react'

import UserCard from '../../components/UserCard/UserCard'
import getUsers from '../../services/getUsers'
import { getCities } from '../../services/getCities'
import { getInterest } from '../../services/GetInterest'

import AutoComplete from './components/AutoComplete/AutoComplete'
import FilterBtn from './components/FilterBtn/FilterBtn'
import s from './People.module.scss'
import { getAutoCompleteArr } from './functions/getAutoCompleteArr'
import FilterInput from './components/FilterInput/FilterInput'
import MainInput from './components/MainInput/MainInput'
import { IState, ICity, InterestDto } from './types'
import { initialState } from './state'
import sortOptionsArr from './assets/sortOptionsArr'
import { sortUsersFunc } from './functions/sortUsers'

const PeoplePage = () => {
  const [state, setState] = useState<IState>({ ...initialState })

  const {
    users,
    cities,
    interests,
    autoCompleteArr,
    filterCityBtnText,
    filterInterestBtnText,
    filterSortText,
    usersForRender
  } = state

  useEffect(() => {
    getUsers().then((users) => {
      setState((state) => ({ ...state, users, usersForRender: users }))
    })

    getCities(0).then((cities) => {
      setState((state) => ({ ...state, cities }))
    })

    getInterest().then((interest) => {
      const interests = interest.interestsDtoList
      setState((state) => ({ ...state, interests }))
    })
  }, [])

  const sortUsers = (sortOption: string) => {
    setState((state) => ({
      ...state,
      usersForRender: sortUsersFunc(sortOption, users)
    }))
  }

  const changeTextOnFilterBtn = (
    filterBtnText: string,
    textContent: string
  ) => {
    setState((state) => ({
      ...state,
      [filterBtnText]: textContent
    }))
  }

  const showAutoCompleteCities = () => {
    setState((state) => ({
      ...state,
      filterCity: true,
      autoCompleteArr: getAutoCompleteArr(cities, '')
    }))
  }

  const showAutoCompleteInterests = () => {
    setState((state) => ({
      ...state,
      filterInterest: true,
      autoCompleteArr: getAutoCompleteArr(interests, '')
    }))
  }

  const showSortOptions = () => {
    setState((state) => ({
      ...state,
      filterSort: !state.filterSort
    }))
  }

  const hideFilterList = (filter: string) => {
    setState((state) => ({
      ...state,
      [filter]: false
    }))
  }

  const changeAutoComplete = (
    arr: ICity[] | InterestDto[],
    inputText: string
  ) => {
    setState((state) => ({
      ...state,
      autoCompleteArr: getAutoCompleteArr(arr, inputText)
    }))
  }

  const onClickResetBtn = () => {
    setState((state) => ({
      ...state,
      filterCityBtnText: 'По городам',
      filterInterestBtnText: 'По интересам',
      filterSortText: 'По популярности',
      usersForRender: state.users
    }))
  }

  const hideSortOptions = () => {
    setTimeout(() => hideFilterList('filterSort'), 500)
  }

  const getAutoComplete = (arr: string[], filterBtn: string) => {
    return (
      <AutoComplete
        arr={arr}
        changeTextOnFilterBtn={changeTextOnFilterBtn}
        sortUsers={sortUsers}
        filterBtn={filterBtn}
      />
    )
  }

  const cityAutoComplete = getAutoComplete(autoCompleteArr, 'filterCityBtnText')

  const interestAutoComplete = getAutoComplete(
    autoCompleteArr,
    'filterInterestBtnText'
  )

  const sortOptions = getAutoComplete(sortOptionsArr, 'filterSortText')

  const filterCityInput = (
    <FilterInput
      data={cities}
      onChange={changeAutoComplete}
      onBlur={hideFilterList}
      filter="filterCity"
    />
  )

  const filterInterestInput = (
    <FilterInput
      data={interests}
      onChange={changeAutoComplete}
      onBlur={hideFilterList}
      filter="filterInterest"
    />
  )

  const filterCityBtn = (
    <FilterBtn func={showAutoCompleteCities} textBtn={filterCityBtnText} />
  )

  const filterInterestBtn = (
    <FilterBtn
      func={showAutoCompleteInterests}
      textBtn={filterInterestBtnText}
    />
  )

  const sortBtn = (
    <FilterBtn func={showSortOptions} textBtn={filterSortText} color="green" />
  )

  const peopleList = usersForRender?.map((el) => (
    <UserCard key={el.id} {...el} />
  ))

  return (
    <div className={s.wrapper}>
      <h1 className={s.header}>Кого хотите найти?</h1>
      <MainInput />
      <div className={s.filterWrapper}>
        {state.filterCity ? filterCityInput : filterCityBtn}
        {state.filterCity && cityAutoComplete}
      </div>
      <div className={s.filterWrapper}>
        {state.filterInterest ? filterInterestInput : filterInterestBtn}
        {state.filterInterest && interestAutoComplete}
      </div>
      <button className={s.resetBtn} onClick={onClickResetBtn}>
        Сбросить
      </button>
      <div className={s.sort}>
        <span className={s.allUsers}>Всего участников: 1328</span>
        <div className={s.filterWrapper} onBlur={hideSortOptions}>
          {sortBtn}
          {state.filterSort && sortOptions}
        </div>
      </div>
      <div className={s.peopleList}>{peopleList}</div>
      <button className={s.moreBtn}>Больше участников</button>
    </div>
  )
}

export default PeoplePage
