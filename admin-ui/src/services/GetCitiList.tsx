const GetCitiList = async () => {
  {
    try {
      const res: any = await fetch(
        'https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia'
      )
      if (!res.ok) {
        throw new Error(`${res.status}`)
      }
      const body = await res.json()
      return body
    } catch (err) {
      console.log(err)
    }
  }
}
export default GetCitiList
