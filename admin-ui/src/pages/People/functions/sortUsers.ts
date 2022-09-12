import { IUser } from '../types'

const sortUsersByAge = (): ((users: IUser[]) => IUser[]) => {
  let order = true
  return (users: IUser[]) => {
    order = !order
    return [...users].sort((user1, user2) =>
      order ? user2.age - user1.age : user1.age - user2.age
    )
  }
}

const sortUsersByAgeFunc = sortUsersByAge()

export const sortUsersFunc = (sortOption: string, users: IUser[]): any => {
  if (sortOption === 'По возрасту') {
    return sortUsersByAgeFunc(users)
  }

  if (sortOption === 'Сейчас онлайн') {
    return sortUsersByAgeFunc(users)
  }

  if (sortOption === 'По популярности') {
    return sortUsersByAgeFunc(users)
  }
}
