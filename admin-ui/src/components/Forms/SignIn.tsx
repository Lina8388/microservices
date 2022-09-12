import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { userDTO } from '../../redux/reducers/user'
import { userAuth } from '../../redux/reducers/servicesReducer'
import s from '../../pages/SignPage/Form.module.scss'
import Form from '../../pages/SignPage/Form'
import { LoginUserModel } from '../../types'
import Input from '../../components/Input'
import { loginUser } from '../../services/loginUser'

const SignIn = () => {
  const { control, handleSubmit } = useForm<LoginUserModel>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login: SubmitHandler<LoginUserModel> = async (data) => {
    const user = {
      username: data.email,
      password: data.password
    }
    loginUser(JSON.stringify(user)).then((user) => dispatch(userDTO(user)))
    dispatch(userAuth(true))
    navigate('/')
  }
  return (
    <Form
      onSubmit={handleSubmit(login)}
      title="Авторизация"
      dontHasAccount="Нет аккаунта?"
      eyeCatching="Создай новый!"
      submitText="Авторизоваться"
      imageName="fontg"
      redirectTo="/sign-up"
    >
      <Controller
        control={control}
        name="email"
        rules={{
          required: true
          // pattern: {
          //   value: /\w+@\w+\.\w+/gi,
          //   message: 'Your email should be valid'
          // }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <>
              <Input {...field} placeholder="Почта" />
              {error && error.message}
            </>
          )
        }}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: true
          // pattern: {
          //   value: /(\w|\d){3, 20}/,
          //   message: 'Invalid password'
          // }
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
        name="rememberMe"
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <label className={`${s.rememberMe}`}>
              <input type="checkbox" className={s.check} />
              <div className={s.pseudo} />
              <span>Оставаться в сети</span>
            </label>
          )
        }}
      />
    </Form>
  )
}

export default SignIn
