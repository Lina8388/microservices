import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const formatDate = (year: number, month: number, day: number) => {
  return format(new Date(year, month, day), 'd MMMM yyyy', { locale: ru })
}
export default formatDate
