import React, { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SignUpFields } from '../../types'
import userReducer, { editProfile, userDTO } from '../../redux/reducers/user'
import Form from '../../pages/SignPage/Form'
import Interests from '../Interests'
import Input from '../Input'
import { ValidateEmail } from '../../services/ValidateEmail'
import { ValidateUserName } from '../../services/ValidateUserName'
import s from '../../pages/SignPage/Form.module.scss'
import { registerUser } from '../../services/registerUser'
import { RootState } from '../../redux/store'

import Calendar from './components/Calendar'

const SignUp: FC = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  useEffect(() => () => dispatch(editProfile(false)), [dispatch])
  const edit = useSelector((state: RootState) => state.userReducer.edit)
  const {
    username,
    firstName,
    lastName,
    email,
    city,
    aboutUser,
    userInterests,
    age
  } = useSelector((state: RootState) => state.userReducer.userDto)
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/
  const date = age ? age.replace(pattern, '$3-$2-$1') : new Date()
  const [value, onChange] = useState(new Date(date))
  const interests = useSelector((state: RootState) => state.userInterestReducer)
  const { control, handleSubmit, register, setError, clearErrors } =
    useForm<SignUpFields>({
      mode: 'onBlur',
      defaultValues: {
        email,
        password: '',
        firstname: firstName,
        lastname: lastName,
        age,
        city,
        username,
        aboutUser
      }
    })
  const [serverValidate, setServerValidate] = useState(false)
  const [serverEmailValidate, setServerEmailValidate] = useState(false)

  const navigate = useNavigate()
  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    const user = {
      password: data.password,
      userDto: {
        id: 0,
        firstName: data.firstname,
        lastName: data.lastname,
        middleName: 'string',
        username: data.username,
        role: 'ROLE_USER',
        email: data.email,
        city: data.city,
        birthDate: value,
        aboutUser: data.aboutUser,
        userInterests: interests
      }
    }
    registerUser(user, edit).then((user) => dispatch(userDTO(user)))
    navigate('/')
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title={edit ? 'Редактирование пользователя' : 'Создание пользователя'}
      dontHasAccount={edit ? '' : 'Уже есть пользователь?'}
      eyeCatching={edit ? '' : 'Авторизуйся'}
      imageName="new"
      submitText={edit ? 'Сохранить' : 'Sign Up'}
      redirectTo="/sign-in"
    >
      <div className={s.rowHalf}>
        <Controller
          control={control}
          name="lastname"
          rules={{
            required: true,
            pattern: {
              value: /^[a-zа-яё]+$/i,
              message: 'Invalid lastname'
            }
          }}
          render={({
            field: { onBlur, ref, ...field },
            fieldState: { error }
          }) => {
            return (
              <div>
                <Input onBlur={onBlur} {...field} placeholder="Фамилия" />
                {error && error.message}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="firstname"
          rules={{
            required: true,
            pattern: {
              value: /^[a-zа-яё]+$/i,
              message: 'Invalid firstname'
            }
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => {
            return (
              <div>
                <Input {...field} placeholder="Имя" />
                {error && error.message}
              </div>
            )
          }}
        />
      </div>
      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
          pattern: {
            value: /\w+@\w+\.\w+/gi,
            message: 'Your email should be valid'
          },
          onChange: () => clearErrors('email'),
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            console.log(e.target.value)
            if (ValidateEmail(e.target.value)) {
              setServerEmailValidate(true)
            } else {
              setServerEmailValidate(false)
              setError('email', {
                message: 'Данный email уже занят'
              })
            }
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input
                {...field}
                placeholder="Почта"
                serverValidate={serverEmailValidate}
              />
              {error && error.message}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: true,
          pattern: {
            value:
              /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/,
            message:
              'Пароль должен состоять из не менее 6 символов, содержать строчные и прописные буквы, цифры и спец.символы'
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input {...field} placeholder="Пароль" />
              {error && error.message}
            </>
          )
        }}
      />
      <Controller
        control={control}
        name="username"
        rules={{
          required: true,
          pattern: {
            value: /[а-яa-z]/gi,
            message: 'Invalid username'
          },
          onChange: () => clearErrors('username'),
          onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            if (ValidateUserName(e.target.value)) {
              setServerValidate(true)
            } else {
              setServerValidate(false)
              setError('username', {
                message: 'Данное имя уже занято'
              })
            }
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input
                {...field}
                placeholder="Username"
                serverValidate={serverValidate}
              />
              {error && error.message}
            </>
          )
        }}
      />

      <Controller
        control={control}
        name="city"
        rules={{
          required: true,
          pattern: {
            value: /^[а-яё]+$/i,
            message: 'Введите корректный город'
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input {...field} placeholder="Город" />
              {error && error.message}
            </>
          )
        }}
      />

      <Controller
        control={control}
        name="age"
        rules={{
          required: true
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Calendar value={value} onChange={onChange} />
              {error && error.message}
            </>
          )
        }}
      />

      <Controller
        control={control}
        name="aboutUser"
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <label className={s.areaLabel}>
                <span className={s.dontHasAccount}>О себе</span>
                <textarea
                  className={s.area}
                  placeholder="Например: Увлекаюсь настольными играми и люблю активный отдых на природе"
                  {...register('aboutUser')}
                ></textarea>
              </label>
              {error && error.message}
            </>
          )
        }}
      />
      <Interests />
    </Form>
  )
}

export default SignUp
