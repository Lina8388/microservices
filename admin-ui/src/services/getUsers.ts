import store from '../redux/store'

import users from './localServerAPI/users.json'

const getUsers = async () => {
  try {
    if (store().getState().servicesReducer.apiFlagLocal) return users //для использования локальных данных вместо сервера
    const res = await fetch('http://localhost:8080/public/user/')
    if (!res.ok) throw new Error(`${res.status}`)
    return res.json()
  } catch (err) {
    return err
  }
}

export default getUsers

//работает
