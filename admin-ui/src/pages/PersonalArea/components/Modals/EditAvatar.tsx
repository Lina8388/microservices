import { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { userDTO } from '../../../../redux/reducers/user'
import { RootState } from '../../../../redux/store'
import buttonStyle from '../../../../components/Header/ButtonPanel/ButtonPanel.module.scss'
import s from '../../../SignPage/Form.module.scss'

import classes from './Modal.module.scss'
import DropZone from './DropZone'

type FormData = {
  imgUrl: string
  inputFile: string
}

type fileState = {
  isSelected: boolean
  imgName: string
  imgUrl: string
}

type TProps = {
  active: boolean
  setActive: any
}

const EditAvatar: FC<TProps> = ({ active, setActive }) => {
  const [file, setFile] = useState<fileState>({
    isSelected: false,
    imgName: '',
    imgUrl: ''
  })
  const [isUrlSelected, setIsUrlSelected] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const currentUser = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    file.isSelected && isUrlSelected ? setIsError(true) : setIsError(false)
  }, [file, isUrlSelected])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({ mode: 'all' })

  const onSubmit = (data: any) => {
    if (isError) {
      alert('Выберите один из вариантов')
      return
    } else {
      dispatch(
        userDTO({
          ...currentUser,
          userDto: { ...currentUser.userDto, photo: data.imgUrl || file.imgUrl }
        })
      )
      setActive(false)
      setFile({ ...file, isSelected: false })
      reset()
    }
  }

  const onChange = (e: any) => {
    e.target.value ? setIsUrlSelected(true) : setIsUrlSelected(false)
  }

  return (
    <form
      className={
        active ? classnames(classes.modal, classes.modalActive) : classes.modal
      }
      onClick={() => setActive(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={classes.btn}
          onClick={() => setActive(false)}
        >
          X
        </button>
        <h1>Редактирование фото</h1>
        <p>Загрузить вашу фотографию</p>

        <div className={classes.fileContainer}>
          {file.isSelected ? (
            <div className={classes.selectedFileContainer}>
              <p>файл выбран: {file.imgName}</p>
              <button
                type="button"
                onClick={() => {
                  setFile({ ...file, isSelected: false })
                  console.log('file', file)
                }}
              >
                x
              </button>
            </div>
          ) : (
            <DropZone setFile={setFile} />
          )}
        </div>
        <label>
          <p>или укажите адресс где она хранится</p>
          <input
            className={s.input}
            placeholder="введите адрес"
            type="text"
            {...register('imgUrl', {
              required: false,
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                message: 'введите коректный адресс'
              }
            })}
            onChange={(e) => onChange(e)}
          />
          <div className={classes.errorBlock}>
            {errors?.imgUrl && <p>{errors?.imgUrl?.message}</p>}
            {isError ? (
              <p className={classes.errorBlock}>Выберите один из вариантов</p>
            ) : null}
          </div>
          <input
            type="submit"
            className={classnames(buttonStyle.btnFill, buttonStyle.btn)}
          />
        </label>
      </div>
    </form>
  )
}

export default EditAvatar
