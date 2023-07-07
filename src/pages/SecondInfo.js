import { useFormik } from 'formik'
import * as Yup from 'yup'
import SelectInput from '../common/InputSelect'
import Input from '../common/input'
import Layout from '../components/Layout'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState , useEffect } from 'react'

const initialValues = {
  phoneNumber: '',
  cellPhoneNumber: '',
  city: '',
  address: '',
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
  const [ formValue , setFormValue] = useState(null)
  useEffect(()=>{
    axios.get(`http://localhost:3001/usersData/${id}`)
    .then(res => {
      setFormValue(res.data)
    })
    .catch( err => console.log(err.name))
  }, [])
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
      history.push('/third-page', { id })
    } catch (error) {
      console.log(error.name)
    }
  }
  const formik = useFormik({
    initialValues :  formValue || initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize : true
  })
  const clickHandler = () => {
    history.push('first-page', { id })
  }
  
console.log(formValue);
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
      <div className="address-cmp">
        <label>آدرس محل زندگی :</label>
        {formik.touched.address && formik.errors.address && (
          <span className="error">{formik.errors.address}</span>
        )}
        <textarea
          name="address"
          placeholder="آدرس دقیق خود را وارد کنید .."
          {...formik.getFieldProps('address')}
          style={
            formik.touched.address && formik.errors.address
              ? customErrorStyle
              : null
          }
        ></textarea>
      </div>
      <div className="btns">
        <button className="next-btn" type="submit">
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
  SecondInfo,
  'لطفا اطلاعات خود را در صفحه دوم وارد کنید',
  'قسمت دوم',
)
