import { EventDto } from '../types'

import getNumberOfWeek from './getNumberOfWeek'

const filterEventsList = (
  item: EventDto,
  interest?: string,
  searchValue?: string,
  filterValueTime?: string
) => {
  const today = new Date().setHours(0, 0, 0, 0)
  const tomorrow = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000
  ).setHours(0, 0, 0, 0)
  const eventDate = new Date(item.timeEvent.slice(0, 3).join('-')).setHours(
    0,
    0,
    0,
    0
  )

  if (interest) {
    return item.eventInterests.find((val) => val.title === interest)
  }
  if (searchValue) {
    return item.eventName.includes(searchValue)
  }
  switch (filterValueTime) {
    case 'Сегодня':
      return today === eventDate
    case 'Завтра':
      return tomorrow === eventDate
    case 'На текущей неделе':
      return getNumberOfWeek(today) === getNumberOfWeek(eventDate)
    case 'В текущем месяце':
      return new Date(today).getMonth() === new Date(eventDate).getMonth()
  }
  return true
}

export default filterEventsList
