import { ReactElement } from 'react'
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface Dto {
  // Первичный ключ
  id: number
}

export interface InterestDto extends Dto {
  // Название
  title: string

  // Краткое описание
  shortDescription: string
}

export interface InterestDtoApi {
  interestsDtoList: InterestDto
}

export interface UserDto extends Dto {
  // Username
  username: string
  //было name, для стандартизации с сервером сделал username. если в итоге что-то сломается вернуть обратно

  // Имя
  firstName: string

  // Фамилия
  lastName: string

  // Отчество
  middleName: string

  // Почта
  email: string

  // Город проживания
  city: string

  // Доп.Инфо
  aboutUser: string

  // Интересы, заполняется не всегда
  userInterests?: InterestDto[]

  //Возраст
  age?: string

  //Роль пользователя
  role?: string

  //Фото
  photo?: string
}

export interface EventTypeDto extends Dto {
  // Название
  type: string
}

export interface EventReviewDto extends Dto {
  // Кто оставил отзыв
  reviewer: UserDto

  // сообщение
  message: string

  // Для какого мероприятия
  eventId: number

  // Время
  time: string

  // оценка
  EventGrade: number
}

export interface EventDto extends Dto {
  // Название
  eventName: string
  // Краткое описание
  descriptionEvent: string
  // Место провидения
  placeEvent: string
  // Город
  city: string
  // Время проведения
  timeEvent: number[]
  // Приватность
  eventPrivacy: boolean
  // Кол-во участников
  eventNumberOfParticipant: number
  // Тип мероприятия
  eventType: EventTypeDto
  // Id автора
  authorId: number
  // Интересы
  eventInterests: InterestDto[]
  // Status	StatusDto	Статус мероприятия. Строка-временный тип данных
  status: string
  // Минимальный возраст
  minYear: number
}

export interface UserDtoRedux {
  //Токен
  token: string
  edit: boolean
  //Данные юсера
  userDto: UserDto
}

export interface servicesReducer {
  //Флаг переключения локальный API/сетевой API
  apiFlagLocal: boolean
  userAuth: boolean
}

export interface LoginUserModel {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignUpFields {
  email: string
  password: string
  username: string
  firstname: string

  lastname: string
  aboutUser: string
  city: string
  age: string
}

export interface InputProps<T> {
  label: Path<T>
  register: UseFormRegister<T>
  config: RegisterOptions
  area?: boolean
}

export interface CardProps {
  name: string
  surname: string
  desc: string
  age: number
  photo?: string
}
export interface BoxGeometry {
  width: number
  height: number
}

export interface LoopItemProps extends BoxGeometry {
  left: number
}

export interface LoopProps<T> extends BoxGeometry {
  data: T[]

  renderItem(el: T, index?: number, arr?: T[]): ReactElement

  gap: number
  run?: boolean
}

export type SliderStartGuard = 'start' | 'middle' | 'end'

export interface SliderProps<T> {
  data: T[]

  renderItem(dataElement: T): ReactElement

  width: number
  height: number
  gap: number
  startFrom?: SliderStartGuard
}

export interface City {
  id: number
  name: string
  subject: string
  lat: string
  lot: string
}
