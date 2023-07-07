import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'

const Home = () => {
  const history = useHistory()
  const clickHandler = () => {
    history.push('/first-page')
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
