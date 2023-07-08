import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SelectInput from '../common/InputSelect'
import Input from '../common/input'
import CheckboxInput from '../common/InputRadio'
import Layout from '../components/Layout'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

const initialValues = {
  firstName: '',
  lastName: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  // birthDate: {
  //   day: '',
  //   month: '',
  //   year: '',
  // },
  gender: '',
}
// ? create day month year
const dayCreator = () => {
  const dayOption = []
  for (let x = 1; x <= 31; x++) {
    const num = `${x}`.padStart(2, '0')
    const op = { value: `d${num}`, label: num }
    dayOption.push(op)
  }
  return dayOption
}
const monthOption = [
  { label: 'فروردین', value: 'm01' },
  { label: 'اردیبهشت', value: 'm02' },
  { label: 'خرداد', value: 'm03' },
  { label: 'تیر', value: 'm04' },
  { label: 'مرداد', value: 'm05' },
  { label: 'شهریور', value: 'm06' },
  { label: 'مهر', value: 'm07' },
  { label: 'آبان', value: 'm08' },
  { label: 'آذر', value: 'm09' },
  { label: 'دی', value: 'm10' },
  { label: 'بهمن', value: 'm11' },
  { label: 'اسفند', value: 'm12' },
]
const yearCreator = () => {
  const yearOption = []
  for (let x = 1360; x <= 1400; x++) {
    const op = { value: `Y${x}`, label: x }
    yearOption.push(op)
  }
  return yearOption
}
const genderOption = [
  { label: 'مرد', value: '0' },
  { label: 'زن', value: '1' },
]

const customErrorStyle = {
  border: '1.5px solid #f06e6e',
}
const validationSchema = Yup.object({
  firstName: Yup.string().required('*'),
  lastName: Yup.string().required('*'),
  birthDay: Yup.string().required('*'),
  birthMonth: Yup.string().required('*'),
  birthYear: Yup.string().required('*'),
  gender: Yup.string().required('*'),
})

const FirstInfo = () => {
  const [ formValue , setFormValue] = useState(null)
  useEffect(()=>{
    axios.get(`http://localhost:3001/usersData/${id}`)
    .then(res => {
      setFormValue(res.data)
    })
    .catch( err => console.log(err.name))
  } , [])
  const location = useLocation()
  const { id } = location.state
  const history = useHistory()
  const onSubmit = async (e) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/usersData/${id}`)
      await axios.put(`http://localhost:3001/usersData/${id}`, {
        ...data,
        ...e,
      })
      history.push('/second-page', { id })
    } catch (error) {
      console.log(error.name)
    }
  }

  const formik = useFormik({
    initialValues : formValue || initialValues ,
    onSubmit,
    validationSchema,
    enableReinitialize :true,
    validateOnMount:true
  })
  const clickHandler = () => {
    history.push('/')
  }
 
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        formik={formik}
        name="firstName"
        placeholder="نام خود را وارد کنید ..."
        label="نام"
        errorStyle={customErrorStyle}
      />
      <Input
        formik={formik}
        name="lastName"
        placeholder="نام خانوادگی خود را وارد کنید ..."
        label="نام خانوادگی"
        errorStyle={customErrorStyle}
      />
      <div className="input-birthday">
        <label> تاریخ تولد :</label>
        <div className="input-birthday-counter">
          <SelectInput
            formik={formik}
            errorStyle={customErrorStyle}
            options={dayCreator()}
            name="birthDay"
            id="birthDay"
            label="روز"
          />
          <SelectInput
            formik={formik}
            errorStyle={customErrorStyle}
            options={monthOption}
            name="birthMonth"
            id="birthMonth"
            label="ماه"
          />
          <SelectInput
            formik={formik}
            errorStyle={customErrorStyle}
            options={yearCreator()}
            name="birthYear"
            id="birthYear"
            label="سال"
          />
        </div>
      </div>
      <CheckboxInput
        formik={formik}
        name="gender"
        options={genderOption}
        label="جنسیت"
      />
      <div className="btns">
        <button className="next-btn" type="submit" disabled={!formik.isValid}>
          <div className="btn-flash-top"></div>
          <div className="btn-flash-bottom"></div>
        </button>
        <button
          className="next-btn previous"
          type="button"
          onClick={clickHandler}
        >
          <div className="btn-flash-top"></div>
          <div className="btn-flash-bottom"></div>
        </button>
      </div>
    </form>
  )
}

export default Layout(
  FirstInfo,
  'لطفا اطلاعات خود را در صفحه اول وارد کنید',
  'قسمت اول',
)
