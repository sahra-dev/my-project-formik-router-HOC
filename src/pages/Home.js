import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'

const Home = () => {
  const history = useHistory()
  const object = {
    id: Math.random(),
    siblings: [],
  }
  const clickHandler = async () => {
    try {
      await axios.post('http://localhost:3001/usersData', { ...object })
      history.push('/first-page', { ...object })
    } catch (error) {
      console.log('error')
    }
  }
  return (
    <div className="home-section">
      <p>سلام</p>
      <p>خوش آمدید</p>
      <p>لطفا پس از زدن دکمه شروع اطلاعات خود را به درستی وارد کنید </p>
      <p>متشکرم</p>
      <button type="button" onClick={clickHandler}>
        برای شروع کلیک کنید
      </button>
    </div>
  )
}

export default Layout(Home, '-', 'فرم ثبت نام')
