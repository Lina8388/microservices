import React, { HTMLProps, useEffect, useState } from 'react'
import classNames from 'classnames'

import s from './FilterButton.module.scss'

interface FilterButtonProps extends HTMLProps<HTMLInputElement> {
  filterPlaceholder: string
  filterFields: string[]
  green?: boolean
  resetFilterValue?: boolean
  value?: string
  getFilterValue?: (value: string) => void
}
interface Interest {
  id: number
  title: string
}

const FilterButton = (props: FilterButtonProps) => {
  const {
    filterPlaceholder,
    filterFields,
    green,
    resetFilterValue,
    value,
    getFilterValue
  } = props

  const [inputValue, setInputValue] = useState(value || '')
  const [showList, setShowList] = useState(false)

  //сброс значения фильтра
  useEffect(() => {
    if (resetFilterValue) setInputValue('')
  }, [resetFilterValue])

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const showFilterList = () => {
    setShowList(true)
  }
  const handleClickListItem = (item: React.MouseEvent<HTMLLIElement>) => {
    // @ts-ignore
    setInputValue(item.target.innerHTML)
    setShowList(false)
    // @ts-ignore
    if (getFilterValue) getFilterValue(item.target.innerHTML)
  }
  const hideFilterList = () => {
    setShowList(false)
  }
  const inputClassName = classNames(s.filter__btn, {
    [s.filter__btn_green]: green
  })
  return (
    <div className={`${s.filter}`}>
      <input
        type="input"
        placeholder={filterPlaceholder}
        className={inputClassName}
        value={inputValue}
        onChange={(event) => handleChangeInput(event)}
        onFocus={showFilterList}
        onBlur={() => {
          setTimeout(hideFilterList, 300)
        }}
      />
      {showList && (
        <ul className={`${s.list}`}>
          {filterFields
            .sort()

            .map((item) => {
              if (typeof item != 'string') {
                const { id, title } = item as Interest
                return (
                  <li
                    key={id}
                    className={`${s.list__item}`}
                    onClick={(title: React.MouseEvent<HTMLLIElement>) =>
                      handleClickListItem(title)
                    }
                  >
                    {title}
                  </li>
                )
              }
              return (
                <li
                  key={item}
                  className={`${s.list__item}`}
                  onClick={(item: React.MouseEvent<HTMLLIElement>) =>
                    handleClickListItem(item)
                  }
                >
                  {item}
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}
export default FilterButton
