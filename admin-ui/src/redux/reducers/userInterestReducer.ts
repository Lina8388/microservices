import { createSlice } from '@reduxjs/toolkit'

import { InterestDto } from '../../types'

const initialState: InterestDto[] = [
  {
    'id': 1,
    'title': 'горные лыжи',
    'shortDescription': 'короткое описание'
  },
  {
    'id': 2,
    'title': 'альпинизм',
    'shortDescription': 'короткое описание'
  },
  {
    'id': 3,
    'title': 'биткоин',
    'shortDescription': 'короткое описание'
  }
]

export const userInterestSlice = createSlice({
  name: 'userInterests',
  initialState,
  reducers: {
    userInterests(state, action) {
      return (state = action.payload)
    }
  }
})

export default userInterestSlice.reducer
export const { userInterests } = userInterestSlice.actions
