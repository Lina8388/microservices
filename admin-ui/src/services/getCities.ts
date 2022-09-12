export const getCities = async (inputId: any): Promise<any> => {
  // /check/city/{name} GET
  return fetch(
    'https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/'
  )
    .then((resp) => resp.json())
    .then((result) => {
      if (!inputId) {
        return result
      }
      const input: any = document.getElementById(inputId)
      if (input?.value.trim() === '') {
        return
      }
      return result.filter(
        (el: any) =>
          el.city.substring(0, input?.value.length).toUpperCase() ===
          input?.value.toUpperCase()
      )
    })
}
