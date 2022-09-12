import { createSlice } from '@reduxjs/toolkit'

import { UserDtoRedux } from '../../types'

const initialState: UserDtoRedux = {
  token: '',
  edit: false,
  userDto: {
    id: 0,
    username: 'ivan',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    photo: 'https://images.unsplash.com/photo-1532318065232-2ba7c6676cd5?w=200',
    email: '',
    city: 'Москва',
    aboutUser: '',
    userInterests: [],
    age: '01.01.2000',
    role: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDTO(state, action) {
      const newState = action.payload
      console.log('newSate', newState)
      return (state = action.payload)
    },
    editProfile(state, action) {
      state.edit = action.payload
    }
  }
})

export default userSlice.reducer
export const { userDTO, editProfile } = userSlice.actions
