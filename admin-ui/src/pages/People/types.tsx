import { InterestDto, UserDto } from '../../types'
export type { InterestDto }

export interface IState {
  filterCityBtnText: string | null
  filterInterestBtnText: string | null
  filterSortText: string | null
  filterCity: boolean
  filterInterest: boolean
  filterSort: boolean
  cities: ICity[]
  interests: InterestDto[]
  users: IUser[]
  autoCompleteArr: string[]
  usersForRender: IUser[]
}

export interface IUser extends UserDto {
  photo?: string
  age: number
}

export interface ICity {
  region: string
  city: string
}

export interface IAutoCompleteProps {
  arr: string[]
  changeTextOnFilterBtn: (filterBtnText: string, targetText: string) => void
  sortUsers: (sortOption: string) => void
  filterBtn: string
}

export interface IFilterBtn {
  func: () => void
  textBtn: string | null
  color?: string
}

export interface IFilterInputProps {
  onBlur: (filter: string) => void
  onChange?: any
  data: any
  filter: string
}
