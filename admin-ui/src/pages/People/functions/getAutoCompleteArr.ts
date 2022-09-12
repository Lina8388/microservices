import { ICity } from '../types'
import { InterestDto } from '../../../types'

const getArrWithStringsOnly = (arr: ICity[] | InterestDto[]) => {
  return arr.map((el: ICity | InterestDto) =>
    'city' in el ? el.city : el.title
  )
}

export const getAutoCompleteArr = (
  arr: ICity[] | InterestDto[],
  inputText: string
) => {
  return getArrWithStringsOnly(arr)
    .filter((el: string) =>
      el.toUpperCase().startsWith(inputText.toUpperCase())
    )
    .slice(0, 5)
}
