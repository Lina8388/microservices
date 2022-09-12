import store from '../redux/store'

import events from './localServerAPI/events.json'

export const GetEventsInCity = async (city: string): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:8080/public/event/city/${city}`)
    if (!res.ok) {
      throw new Error(`${res.status}`)
    }
    return await res.json()
  } catch (err) {
    return console.error(err)
  }
}

//работает
