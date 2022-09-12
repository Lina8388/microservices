import store from '../redux/store'

import user from './localServerAPI/user.json'

export const loginUser = async (data: string) => {
  try {
    if (store().getState().servicesReducer.apiFlagLocal) return user //для использования локальных данных вместо сервера

    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })

    if (!res.ok) {
      throw new Error(`${res.status}`)
    }

    return res.json()
  } catch (err) {
    return err
  }
}

//не работает, CORS не дает
