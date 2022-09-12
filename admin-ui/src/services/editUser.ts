import store from '../redux/store'

import user from './localServerAPI/user.json'

export const editUser = async (data: string) => {
  if (store().getState().servicesReducer.apiFlagLocal) return user //для использования локальных данных вместо сервера

  try {
    const res = await fetch('http://localhost:8080/private/account/user', {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })

    if (!res.ok) throw new Error(`${res.status}`)

    return res.json()
  } catch (err) {
    return err
  }
}

// не работает
