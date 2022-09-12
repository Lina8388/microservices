export const GetAllEvents = async (): Promise<any> => {
  try {
    const res = await fetch('http://localhost:8080/public/event')
    if (!res.ok) {
      throw new Error(`${res.status}`)
    }

    return await res.json()
  } catch (err) {
    return err
  }
}

//не используется
