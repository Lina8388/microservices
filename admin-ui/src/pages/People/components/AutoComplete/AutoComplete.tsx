import React from 'react'

import { IAutoCompleteProps } from '../../types'

import s from './AutoComplete.module.scss'

const AutoComplete: React.FC<IAutoCompleteProps> = ({
  arr,
  changeTextOnFilterBtn,
  filterBtn,
  sortUsers
}) => {
  if (!arr.length) {
    return null
  }

  const onClickAutoComplete = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { textContent } = e.target as HTMLSpanElement

    if (textContent?.trim()) {
      changeTextOnFilterBtn(filterBtn, textContent)
    }

    if (textContent && filterBtn === 'filterSortText') {
      sortUsers(textContent)
    }
  }
  const autoCompleteList = arr.map((el: string, i: number) => (
    <span key={i} className={s.autoCompleteItem} onClick={onClickAutoComplete}>
      {el}
    </span>
  ))

  return <div className={s.autoCompleteList}>{autoCompleteList}</div>
}

export default AutoComplete
