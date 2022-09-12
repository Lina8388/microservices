const formatTime = (hour: number, minute: number) => {
  let formatHour: any = hour
  let formatMinute: any = minute
  if (hour < 10) formatHour = `0${hour}`
  if (minute < 10) formatMinute = `0${minute}`
  return `${formatHour}:${formatMinute}`
}
export default formatTime
