import React, { FC, HTMLProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import s from './Form.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

type FormImageGuard = 'fontg' | 'new'

interface FormProps {
  dontHasAccount: string
  eyeCatching: string
  title: string
  submitText: string
  imageName: FormImageGuard
  extraHeight?: boolean
  redirectTo: '/sign-in' | '/sign-up'
}

const Form: FC<FormProps & HTMLProps<HTMLFormElement>> = ({
  dontHasAccount,
  eyeCatching,
  title,
  submitText,
  imageName,
  children,
  extraHeight = false,
  redirectTo,
  onSubmit
}) => {
  const navigate = useNavigate()

  const edit = useSelector((state: RootState) => state.userReducer.edit)
  return (
    <motion.form
      onSubmit={onSubmit}
      className={s.wrapper}
      initial={{ opacity: 0, translateX: '-10%' }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: '10%' }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${s.inner} ${extraHeight ? s.inner_height : ''}`}>
        <motion.div
          className={`${s.form}`}
          initial={{ opacity: 0, translateX: '-10%' }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: '10%' }}
          transition={{ duration: 0.5 }}
        >
          {/* HEADER */}
          <header className={`${s.header}`}>
            <div className={s.title}>
              {title}
              {/* Авторизация */}
            </div>
            <div className={s.dontHasAccount}>
              {/* Нет аккаунта? */}
              {dontHasAccount}
              <Link to={redirectTo} className={s.dontHasAccount_eyeCatching}>
                {/* Создай новый */}
                {eyeCatching}
              </Link>
            </div>
          </header>
          <main className={`${s.main}`}>
            {children}

            <button type="submit" className={s.auth}>
              {/* Авторизоваться */}
              {submitText}
            </button>
          </main>

          {edit ? null : (
            <footer className={`${s.footer}`}>
              <div className={s.googleAccess}>Или зайти с помощью</div>
              <div className={s.googleButton}></div>
            </footer>
          )}
        </motion.div>

        {edit ? null : (
          <>
            <div className={`${s.image} ${s[`image_${imageName}`]}`} />

            <button className={s.close} onClick={() => navigate('/')}></button>
          </>
        )}
      </div>
    </motion.form>
  )
}

export default Form
