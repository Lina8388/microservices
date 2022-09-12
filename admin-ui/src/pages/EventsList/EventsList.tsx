import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CardEvent from '../../components/CardEvent'
import FilterButton from '../../components/FilterButton'
import GetCitiList from '../../services/GetCitiList'
import { GetEventsInCity } from '../../services/GetEventsInCity'
import { getInterest } from '../../services/GetInterest'
//import GetSingleCityEvents from '../../services/GetSingleCityEvents'
import filterEventsList from '../../utilites/filterEventsList'
import { City, EventDto } from '../../types'

import s from './EventsList.module.scss'

const EventsList = () => {
  const { city } = useParams()
  const [eventsList, setEventsList] = useState<EventDto[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [numShowEvents, setNumShowEvents] = useState(5)
  // значения для выпадающих списков в фильтрах
  const [listCity, setListCity] = useState<Array<string>>([])
  const [listRegion, setListRegion] = useState<Array<string>>([])
  const [listInterest, setListInterest] = useState<Array<string>>([])
  const [timeFilterList, setTimeFilterList] = useState<Array<string>>([
    'Сегодня',
    'Завтра',
    'На текущей неделе',
    'В текущем месяце'
  ])
  // текущие значения фильтров
  const [filterValueCity, setFilterValueCity] = useState(city || '')
  const [filterValueRegion, setFilterValueRegion] = useState('')
  const [filterValueInterest, setFilterValueInterest] = useState('')
  const [filterValueTime, setFilterValueTime] = useState('')
  //сброс значения фильтров
  const [resetFilterValue, setResetFilterValue] = useState(false)
  // получаем список городов и областей для фильтра
  useEffect(() => {
    GetCitiList().then((res: City[]) => {
      setListCity([...Array.from(new Set(res.map((item) => item.name)))])
      setListRegion([...Array.from(new Set(res.map((item) => item.subject)))])
    })
  }, [])
  //получаем список интересов/увлечений для фильтра
  useEffect(() => {
    getInterest().then((res: any) =>
      setListInterest([...listInterest, ...res.interestsDtoList])
    )
  }, [])
  //получение событий по определенному городу
  useEffect(() => {
    // TODO переписать setEventsList([...res]) когда бэк исправит возвращаемые данные
    // eventDtoList - лишний объект в ответе с бэка
    GetEventsInCity(`${filterValueCity}`).then((res: any) =>
      setEventsList([...res.eventDtoList])
    )
  }, [filterValueCity])

  //сброс значений фильтра
  const resetValueFilter = () => {
    setResetFilterValue(true)
    setFilterValueCity(`${city}`)
    setFilterValueRegion('')
    setFilterValueInterest('')
    setFilterValueTime('')
    setTimeout(() => setResetFilterValue(false), 300)
  }
  // изменение значений фильтров
  const getFilterValueCity = (value: string) => {
    setFilterValueCity(value)
  }
  const getFilterValueInterest = (value: string) => {
    setFilterValueInterest(value)
  }
  const getFilterValueTime = (value: string) => {
    setFilterValueTime(value)
  }
  const getFilterValueRegion = (value: string) => {
    setFilterValueRegion(value)
  }
  const showMoreEvents = () => {
    setNumShowEvents(numShowEvents + 5)
  }

  return (
    <div className={`${s.eventsList}`}>
      <div className={`${s.eventsList__container}`}>
        <h1 className={`${s.eventsList__title}`}>Чем хотите заняться?</h1>
        <div className={`${s.eventsList__search}, ${s.searchForm}`}>
          <input
            className={`${s.searchForm__input}`}
            type="text"
            placeholder="Я хочу найти мероприятие"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            className={`${s.searchForm__button}`}
            onClick={() => setSearchValue(inputValue)}
          />
        </div>
        <div className={`${s.eventsList__filter}`}>
          <FilterButton
            filterPlaceholder={'По Областям'}
            filterFields={listRegion}
            resetFilterValue={resetFilterValue}
            getFilterValue={getFilterValueRegion}
            value={filterValueRegion}
          />
          <FilterButton
            filterPlaceholder={'По городам'}
            filterFields={listCity}
            resetFilterValue={resetFilterValue}
            getFilterValue={getFilterValueCity}
            value={filterValueCity}
          />
          <FilterButton
            filterPlaceholder={'По времени'}
            filterFields={timeFilterList}
            resetFilterValue={resetFilterValue}
            getFilterValue={getFilterValueTime}
            value={filterValueTime}
          />
          <FilterButton
            filterPlaceholder={'По интересам'}
            filterFields={listInterest}
            resetFilterValue={resetFilterValue}
            getFilterValue={getFilterValueInterest}
            value={filterValueInterest}
          />
          <button
            className={`${s.filter__btn} ${s.btnUnset}`}
            onClick={resetValueFilter}
          >
            Сбросить
          </button>
        </div>

        <p className={`${s.eventsList__totalCount}`}>Всего мероприятий: 548</p>

        <div className={`${s.eventList__cardContainer}`}>
          {eventsList
            .slice(0, numShowEvents)
            // сортировка по дате/времени проведения мероприятия
            .sort((a, b) =>
              new Date(a.timeEvent.join('-')) > new Date(b.timeEvent.join('-'))
                ? 1
                : -1
            )
            // фильтрация массива по разным условиям
            .filter((item) =>
              filterEventsList(
                item,
                filterValueInterest,
                searchValue,
                filterValueTime
              )
            )
            .map((event: EventDto) => {
              return <CardEvent event={event} key={event.id} />
            })}
        </div>
        <button className={`${s.eventList__button}`} onClick={showMoreEvents}>
          Больше мероприятий
        </button>
      </div>
    </div>
  )
}

export default EventsList
