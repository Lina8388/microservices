import store from '../redux/store'

import users from './localServerAPI/users.json'

export const getTopUsers = async (city: string) => {
  try {
    if (store().getState().servicesReducer.apiFlagLocal) return users //для использования локальных данных вместо сервера
    const res = await fetch(`http://localhost:8080/public/user/top/${city}`)
    if (!res.ok) throw new Error(`${res.status}`)
    return res.json()
  } catch (err) {
    return err
  }
}

// работает, но возвращает {"userDtoList":[]}
