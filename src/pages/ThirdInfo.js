import React from 'react'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import Input from '../common/input'
import InputRadio from '../common/InputRadio'
import CheckboxInput from '../common/InputCheckBox'

const initialValues = {
  numberOfFamilyMember: '',
  isTwins: '',
  siblings: [],
  isMarried:''
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
  isMarried:Yup.string().required('*')
})

const ThirdInfo = () => {
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
    <div className="counter">
      <h3 className="counter-header">قسمت سوم</h3>
      <div className="counter-main">
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
          <button className="next-btn" type="submit">
            <div className="btn-flash-top"></div>
            <div className="btn-flash-bottom"></div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ThirdInfo
