import { format } from 'date-fns'

const getNumberOfWeek = (date: any) => {
  console.log(format(new Date(date), 'w'))
  return format(new Date(date), 'w')
}

export default getNumberOfWeek
