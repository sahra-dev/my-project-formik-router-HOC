import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '../common/input'
import InputRadio from '../common/InputRadio'
import CheckboxInput from '../common/InputCheckBox'
import Layout from '../components/Layout'
import { useHistory , useLocation } from 'react-router-dom'
import { useState , useEffect } from 'react'
import http from '../services/httpServices'

const initialValues = {
  numberOfFamilyMember: '',
  isTwins: '',
  siblings: [],
  isMarried: '',
}
const yesNoOptionTwins = [
  { label: 'بله', value: 'twins' },
  { label: 'خیر', value: 'noTwins' },
]
const siblingOptions = [
  { label: 'خواهر یزرگتر', value: 'olderSister' },
  { label: 'برادر بزرگتر', value: 'olderBrother' },
  { label: 'خواهر کوچکتر', value: 'youngerSister' },
  { label: 'برادر کوچکتر', value: 'youngerBrother' },
]
const yesNoOptionMarried = [
  { label: 'بله', value: 'married' },
  { label: 'خیر', value: 'notMarried' },
]
const customErrorStyle = {
  border: '1.5px solid #f06e6e',
}
const validationSchema = Yup.object({
  numberOfFamilyMember: Yup.string().required('*'),
  isTwins: Yup.string().required('*'),
  siblings: Yup.array().min(1, '*').required('*'),
  isMarried: Yup.string().required('*'),
})

const ThirdInfo = () => {
  const [ formValue , setFormValue] = useState(null)
  useEffect(()=>{
    http.get(`/usersData/${id}`)
    .then(res => {
      setFormValue(res.data)
    })
    .catch( err => console.log(err.name))
  },[])
  const location = useLocation()
  const { id } = location.state
  const history = useHistory()
  const onSubmit = async (e) => {
    try {
      history.push('/result' , { id })
      const { data } = await http.get(`/usersData/${id}`)
      await http.put(`/usersData/${id}`, { ...data,  ...e, })
    } catch (error) {
      console.log(error.name)
    }
  }
  const formik = useFormik({
    initialValues :  formValue || initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize : true,
    validateOnMount:true
  })
  const clickHandler = () => {
    history.push('/second-page', { id })
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="number"
        formik={formik}
        name="numberOfFamilyMember"
        label="تعداد اعضای خانواده"
        placeholder="تعداد را وارد کنید"
        min="1"
        errorStyle={customErrorStyle}
        className="number-input"
      />
      <InputRadio
        formik={formik}
        name="isTwins"
        options={yesNoOptionTwins}
        label="آیا دو قلو هستید"
      />
      <CheckboxInput
        formik={formik}
        name="siblings"
        options={siblingOptions}
        label="دارای کدام هستید؟"
      />
      <InputRadio
        formik={formik}
        name="isMarried"
        options={yesNoOptionMarried}
        label="آیا متاهل هستید؟"
      />
      <div className="btns">
        <button className="next-btn" type="submit"  >
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
  ThirdInfo,
  'لطفا اطلاعات خود را در آخرین صفحه وارد کنید',
  'قسمت سوم',
)
