const getUserEvents = async (id: number | undefined) => {
  try {
    const res = await fetch(
      `http://localhost:8080/public/user/event/${id}/owner`
    )
    if (!res.ok) throw new Error(`${res.status}`)
    return res.json()
  } catch (err) {
    return err
  }
}

export default getUserEvents
