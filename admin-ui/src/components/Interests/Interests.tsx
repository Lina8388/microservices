import { FC, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'

import Input from '../../pages/Home/sections/WhatDoWant/Input'
import { getInterest } from '../../services/GetInterest'
import { InterestDto } from '../../types'
import { userInterests } from '../../redux/reducers/userInterestReducer'
import { RootState } from '../../redux/store'

import s from './Interests.module.scss'

const Interests: FC = () => {
  const dispatch = useDispatch()
  const interests = useSelector((state: RootState) => state.userInterestReducer)
  const [interestsList, setInterestList] = useState<InterestDto[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getInterest().then((res: any) => {
      const setListArr = res.interestsDtoList
      setInterestList(
        setListArr.filter(
          (interest: any) =>
            !interests.find((interes) => interes.id === interest.id)
        )
      )
    })
  }, [])

  const handleClickChooseInterest = (item: InterestDto) => {
    dispatch(userInterests([...interests, item]))
    setInterestList(interestsList.filter((interes) => interes.id !== item.id))
    setShowModal(false)
    setSearchValue('')
  }

  const handleChangeSearchValue = (userSearchQuery: string) => {
    setSearchValue(userSearchQuery.toLowerCase())
  }

  const deleteUserInterestItem = (item: InterestDto) => {
    dispatch(
      userInterests(interests.filter((interes) => item.id !== interes.id))
    )
    setInterestList([item, ...interestsList])
  }

  return (
    <div className={s.container}>
      {interests.map((item) => (
        <div className={s.interest} key={v4()}>
          {item.title}
          <button
            className={s.delete}
            onClick={() => deleteUserInterestItem(item)}
          />
        </div>
      ))}
      <button
        className={s.add}
        onClick={() => setShowModal(() => (showModal ? false : true))}
        type="button"
      />

      {showModal && (
        <div className={s.modal}>
          <Input
            icon="search"
            value={searchValue}
            onChange={(userSearchQuery) =>
              handleChangeSearchValue(userSearchQuery)
            }
          />

          <div className={s.container}>
            {interestsList
              .filter(
                (item) =>
                  !interests.includes(item) &&
                  item.title.toLowerCase().indexOf(searchValue) !== -1
              )
              .map((item) => (
                <div
                  className={`${s.interest} ${s.interest_slim}`}
                  key={v4()}
                  onClick={() => handleClickChooseInterest(item)}
                >
                  {item.title}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Interests
