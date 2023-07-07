import React from 'react'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import SelectInput from '../common/InputSelect'
import Input from '../common/input'
import Layout from '../components/Layout'

const initialValues = {
  phoneNumber: '',
  cellPhoneNumber: '',
  city: '',
  address :''
}
const cityOptions = [
  { label: 'تهران', value: 'tehran' },
  { label: 'البرز', value: 'alborz' },
  { label: 'تبریز', value: 'tabriz' },
  { label: 'اصفهان', value: 'esfahan' },
  { label: 'کیش', value: 'kish' },
  { label: 'آبادان', value: 'abadan' },
  { label: 'رشت', value: 'rasht' },
  { label: 'مازندران', value: 'mazandaran' },
  { label: 'عسلویه', value: 'asalooye' },
  { label: 'قزوین', value: 'ghazvin' },
]
const customErrorStyle = {
  border: '1.5px solid #f06e6e',
}
const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('*')
    .matches(/^[0-9]{11}$/, 'غیرقابل قبول'),
  cellPhoneNumber: Yup.string()
    .required('*')
    .matches(/^[0-9]{11}$/, 'غیرقابل قبول'),
  city: Yup.string().required('*'),
  address: Yup.string().required('*'),
})

const SecondInfo = () => {
  const [formValue, setFormValue] = useState(null)
  const onSubmit = (e) => {
    console.log(e)
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
        <form onSubmit={formik.handleSubmit}>
          <Input
            formik={formik}
            name="phoneNumber"
            placeholder="021xxxxxxxx"
            label="تلفن ثابت"
            errorStyle={customErrorStyle}
          />
          <Input
            formik={formik}
            name="cellPhoneNumber"
            placeholder="0912xxxxxxx"
            label="تلفن همراه"
            errorStyle={customErrorStyle}
          />
          <SelectInput
            name="city"
            id="city"
            formik={formik}
            label="شهر محل زندگی"
            options={cityOptions}
            errorStyle={customErrorStyle}
            className="city-select"
          />
          <div className='address-cmp'>
          <label>آدرس محل زندگی :</label>
          {formik.touched.address && formik.errors.address &&(
            <span className='error'>{formik.errors.address}</span>
          )}
          <textarea
            name="address"
            placeholder="آدرس دقیق خود را وارد کنید .."
            {...formik.getFieldProps("address")}
            style={
                (formik.touched.address && formik.errors.address)?
                customErrorStyle : null
            }
          ></textarea>
          
            </div>
          <button className="next-btn" type="submit">
            <div className="btn-flash-top"></div>
            <div className="btn-flash-bottom"></div>
          </button>
        </form>
  )
}

export default Layout(SecondInfo , 'قسمت دوم')
