import store from '../redux/store'

import user from './localServerAPI/user.json'

export const registerUser = async (data: any, edit: boolean) => {
  if (store().getState().servicesReducer.apiFlagLocal) return user //для использования локальных данных вместо сервера

  try {
    const res = await fetch(
      !edit
        ? 'http://localhost:8080/registration'
        : `http://localhost:8080/private/account/user/${data.userDto.id}`,
      {
        method: edit ? 'PUT' : 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': edit ? 'token' : '' //добавить токен с куков get cookie когда заработает регистрация с сервера
        },
        body: data
      }
    )

    if (!res.ok) throw new Error(`${res.status}`)

    return res.json()
  } catch (err) {
    return err
  }
}

//не работает, CORS не дает
