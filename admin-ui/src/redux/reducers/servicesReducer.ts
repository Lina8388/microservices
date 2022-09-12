import { createSlice } from '@reduxjs/toolkit'

import { servicesReducer } from '../../types'

const initialState: servicesReducer = {
  apiFlagLocal: true,
  userAuth: false
}

export const serviceSlice = createSlice({
  name: 'APIFlag',
  initialState,
  reducers: {
    userAuth(state, action) {
      state.userAuth = action.payload
    }
  }
})

export default serviceSlice.reducer
export const { userAuth } = serviceSlice.actions
