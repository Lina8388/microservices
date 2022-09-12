import store from '../redux/store'

import cityes from './localServerAPI/cityes.json'

const GetCitiList = async () => {
  try {
    if (store().getState().servicesReducer.apiFlagLocal) return cityes //для использования локальных данных вместо сервера
    const res: any = await fetch('http://localhost:8080/api/public/check/city')
    if (!res.ok) {
      throw new Error(`${res.status}`)
    }
    const body = await res.json()
    return body
  } catch (err) {
    console.error(err)
  }
}
export default GetCitiList

//не нашел где используется
