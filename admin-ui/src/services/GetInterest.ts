import store from '../redux/store'

import interests from './localServerAPI/interests.json'

export const getInterest = async () => {
  try {
    if (store().getState().servicesReducer.apiFlagLocal) return interests //для использования локальных данных вместо сервера

    const res = await fetch('http://localhost:8080/public/interest')
    if (!res.ok) {
      throw new Error(`${res.status}`)
    }

    const body = await res.json()
    return body
  } catch (err) {
    return err
  }
}

//работает
