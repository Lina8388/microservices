// import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useForm } from 'react-hook-form'

// import Interests from '../../components/Interests'
// import { RootState } from '../../redux/store'

// import { userDTO } from '../../../redux/reducers/user'
// import { editUser } from '../../../services/editUser'

// import Input from './input'
// import CityField from './CityField'
// import s from './PersonalArea.module.scss'

// interface PersonalAreaProps {
//   modalActivate: boolean
//   setModalActivate(value: boolean): void
// }

// const Modal = ({ modalActivate, setModalActivate }: PersonalAreaProps) => {
//   const { firstName, lastName, email, age, city, username, aboutUser } =
//     useSelector((state: RootState) => state.userReducer.userDto)

//   const interests = useSelector((state: RootState) => state.userInterestReducer)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm()

//   const [formState, setFormState] = useState({
//     lastNameValue: lastName,
//     firstNameValue: firstName,
//     emailValue: email,
//     ageValue: age,
//     usernameValue: username,
//     aboutUserValue: aboutUser
//   })
//   const dispatch = useDispatch()

//   const {
//     lastNameValue,
//     firstNameValue,
//     emailValue,
//     ageValue,
//     usernameValue,
//     aboutUserValue
//   } = formState

//   const onSubmit = async (data: any) => {
//     console.log(data)
//   }
//     //отправка на данный момент сделана только для наглядности. Когда будет работать измененние юзера нужно переделать в соответствии с Request сервера
//     console.log(data)
//     const user = {
//       id: 0,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       middleName: 'string',
//       username: data.username,
//       role: 'ROLE_USER',
//       email: data.email,
//       city: data.city,
//       aboutUser: data.AboutUs,
//       userInterests: interests //данное поле обязательно брать из редакс. Это массив интересов пользователя
//     }
//     editUser(JSON.stringify(user)).then((user) => dispatch(userDTO(user)))
//   }

//   return (
//     <div
//       className={modalActivate ? `${s.modal} ${s.active}` : s.modal}
//       onClick={() => setModalActivate(false)}
//     >
//       <div
//         className={
//           modalActivate ? `${s.modal_content} ${s.active}` : s.modal_content
//         }
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div onClick={() => setModalActivate(false)} className={s.close}></div>
//         <h2>Редактирование пользователя</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className={s.inputsWrapper}>
//             <div className={s.modal_content__name}>
//               <Input
//                 value={lastNameValue}
//                 errors={errors}
//                 placeholder="Фамилия"
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     lastNameValue: e.target.value
//                   }))
//                 }
//                 type="text"
//                 {...register('lastName', {
//                   required: true,
//                   pattern: {
//                     value: /[а-яa-z]/gi,
//                     message: 'Некорректная фамилия'
//                   }
//                 })}
//               />
//               <Input
//                 value={firstNameValue}
//                 errors={errors}
//                 placeholder="Имя"
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     firstNameValue: e.target.value
//                   }))
//                 }
//                 type="text"
//                 {...register('firstName', {
//                   required: true,
//                   pattern: {
//                     value: /[а-яa-z]/gi,
//                     message: 'Некорректное имя'
//                   }
//                 })}
//               />
//             </div>
//             <Input
//               value={emailValue}
//               errors={errors}
//               placeholder="Email Address"
//               onInput={(e: any) =>
//                 setFormState((state) => ({
//                   ...state,
//                   emailValue: e.target.value
//                 }))
//               }
//               type="email"
//               {...register('email', {
//                 required: true,
//                 pattern: {
//                   value: /\w+@\w+\.\w+/gi,
//                   message: 'Некорректный email'
//                 }
//               })}
//             />
//             <Input
//               value={usernameValue}
//               errors={errors}
//               placeholder="Username"
//               onInput={(e: any) =>
//                 setFormState((state) => ({
//                   ...state,
//                   usernameValue: e.target.value
//                 }))
//               }
//               type="text"
//               {...register('username', {
//                 required: true,
//                 pattern: {
//                   value: /[а-яa-z]/gi,
//                   message: 'Некорректный username'
//                 }
//               })}
//             />
//             <div className={s.modal_content__cityAndAge}>
//               <CityField
//                 city={city}
//                 {...register('Возраст', {
//                   required: true
//                 })}
//               />
//               <Input
//                 min="1"
//                 max="150"
//                 value={`${ageValue}`}
//                 errors={errors}
//                 placeholder="Возраст"
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     ageValue: e.target.value
//                   }))
//                 }
//                 type="number"
//                 {...register('Возраст', {
//                   required: true
//                 })}
//               />
//             </div>
//           </div>
//           <div className={s.modal_content__aboutUs}>
//             <div className={s.modal_content__title}>О себе</div>
//             <div className={s.modal_content__aboutUs__field}>
//               <textarea
//                 value={aboutUserValue}
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     aboutUserValue: e.target.value
//                   }))
//                 }
//                 placeholder="Например: Увлекаюсь настольными играми и люблю активный отдых на природе"
//                 {...register('aboutUs')}
//               />
//             </div>
//           </div>
//           <div className={s.modal_content__interests}>
//             <div className={s.modal_content__title}>Интересы</div>
//             <Interests />
//           </div>
//           <div className={s.modal_content__btn}>
//             <button type="submit" className={s.btnFill}>
//               Редактировать
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

//   return (
//     <div
//       className={modalActivate ? `${s.modal} ${s.active}` : s.modal}
//       onClick={() => setModalActivate(false)}
//     >
//       <div
//         className={
//           modalActivate ? `${s.modal_content} ${s.active}` : s.modal_content
//         }
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div onClick={() => setModalActivate(false)} className={s.close}></div>
//         <h2>Редактирование пользователя</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className={s.inputsWrapper}>
//             <div className={s.modal_content__name}>
//               <Input
//                 value={lastNameValue}
//                 errors={errors}
//                 placeholder="Фамилия"
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     lastNameValue: e.target.value
//                   }))
//                 }
//                 type="text"
//                 {...register('lastName', {
//                   required: true,
//                   pattern: {
//                     value: /[а-яa-z]/gi,
//                     message: 'Некорректная фамилия'
//                   }
//                 })}
//               />
//               <Input
//                 value={firstNameValue}
//                 errors={errors}
//                 placeholder="Имя"
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     firstNameValue: e.target.value
//                   }))
//                 }
//                 type="text"
//                 {...register('firstName', {
//                   required: true,
//                   pattern: {
//                     value: /[а-яa-z]/gi,
//                     message: 'Некорректное имя'
//                   }
//                 })}
//               />
//             </div>
//             <Input
//               value={emailValue}
//               errors={errors}
//               placeholder="Email Address"
//               onInput={(e: any) =>
//                 setFormState((state) => ({
//                   ...state,
//                   emailValue: e.target.value
//                 }))
//               }
//               type="email"
//               {...register('email', {
//                 required: true,
//                 pattern: {
//                   value: /\w+@\w+\.\w+/gi,
//                   message: 'Некорректный email'
//                 }
//               })}
//             />
//             <Input
//               value={usernameValue}
//               errors={errors}
//               placeholder="Username"
//               onInput={(e: any) =>
//                 setFormState((state) => ({
//                   ...state,
//                   usernameValue: e.target.value
//                 }))
//               }
//               type="text"
//               {...register('username', {
//                 required: true,
//                 pattern: {
//                   value: /[а-яa-z]/gi,
//                   message: 'Некорректный username'
//                 }
//               })}
//             />
//             <div className={s.modal_content__cityAndAge}>
//               <CityField
//                 city={city}
//                 {...register('Возраст', {
//                   required: true
//                 })}
//               />
//               <Input
//                 min="1"
//                 max="150"
//                 value={`${ageValue}`}
//                 errors={errors}
//                 placeholder="Возраст"
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     ageValue: e.target.value
//                   }))
//                 }
//                 type="number"
//                 {...register('Возраст', {
//                   required: true
//                 })}
//               />
//             </div>
//           </div>
//           <div className={s.modal_content__aboutUs}>
//             <div className={s.modal_content__title}>О себе</div>
//             <div className={s.modal_content__aboutUs__field}>
//               <textarea
//                 value={aboutUserValue}
//                 onInput={(e: any) =>
//                   setFormState((state) => ({
//                     ...state,
//                     aboutUserValue: e.target.value
//                   }))
//                 }
//                 placeholder="Например: Увлекаюсь настольными играми и люблю активный отдых на природе"
//                 {...register('aboutUs')}
//               />
//             </div>
//           </div>
//           <div className={s.modal_content__interests}>
//             <div className={s.modal_content__title}>Интересы</div>
//             <Interests />
//           </div>
//           <div className={s.modal_content__btn}>
//             <button type="submit" className={s.btnFill}>
//               Редактировать
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
// export default Modal

export default {}
