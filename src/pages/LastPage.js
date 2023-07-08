import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation , useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LastPage = () => {
  const [formValue, setFormValue] = useState(null)
  const location = useLocation()
  const { id } = location.state
  const history = useHistory()
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/usersData/${id}`,
        )
        console.log(data)
        setFormValue(data)
      } catch (error) {
        console.log(error.name)
      }
    }
    getData()
  }, [])
  // console.log(formValue);
  const monthGenerator = () => {
    switch (formValue.birthMonth) {
      case 'm01':
        return 'فروردین'
      case 'm02':
        return 'اردیبهشت'
      case 'm03':
        return 'خرداد'
      case 'm04':
        return 'تیر'
      case 'm05':
        return 'مرداد'
      case 'm06':
        return 'شهریور'
      case 'm07':
        return 'مهر'
      case 'm08':
        return 'آبان'
      case 'm09':
        return 'آذر'
      case 'm10':
        return 'دی'
      case 'm11':
        return 'بهمن'
      case 'm12':
        return 'اسفند'
    }
  }
  const genderGenerator = () => {
    if (formValue.gender === '0') {
      return 'مرد'
    } else {
      return 'زن'
    }
  }
  const cityGenerator = () => {
    switch (formValue.city) {
      case 'tehran':
        return 'تهران'
      case 'alborz':
        return 'البرز'
      case 'tabriz':
        return 'تبریز'
      case 'esfahan':
        return 'اصفهان'
      case 'kish':
        return 'کیش'
      case 'abadan':
        return 'آبادان'
      case 'rasht':
        return 'رشت'
      case 'mazandaran':
        return 'مازندران'
      case 'asalooye':
        return 'عسلویه'
      case 'ghazvin':
        return 'قزوین'
      case 'khozestan':
        return 'خوزستان'
    }
  }
  const isMarriedGenerator = () => {
    if (formValue.isMarried === 'married') {
      return 'متاهل'
    } else {
      return 'مجرد'
    }
  }
  const isTwinsGenerator = () => {
    if (formValue.isTwins === 'twins') {
      return 'بله'
    } else {
      return 'خیر'
    }
  }
  const siblingsGenerator = () => {
    return formValue.siblings.map((item) => {
      if (item === 'olderSister') {
        return ' خواهر بزرگتر ،'
      } else if (item === 'olderBrother') {
        return ' برادر بزرگتر ،'
      } else if (item === 'youngerSister') {
        return ' خواهر کوچکتر ،'
      } else if (item === 'youngerBrother') {
        return ' برادر کوچکتر ،'
      }
    })
  }
  const editHandler =()=>{
    history.push('./first-page' , { id})
  }
  
  return (
    <div className="last-section">
      {formValue ? (
        <div className="a4">
          <p>
            - نام :
            <span>
              {formValue.firstName} {formValue.lastName}
            </span>
          </p>
          <p>
            - تاریخ تولد :
            <span>
              {formValue.birthDay.slice(1, 3)} , {monthGenerator()} ,
              {formValue.birthYear.slice(3, 5)}
            </span>
          </p>
          <p>
            - جنسیت : <span>{genderGenerator()} </span>
          </p>
          <p>
            - تلفن همراه :<span> {formValue.cellPhoneNumber} </span>
          </p>
          <p>
            - تلفن ثابت :<span>{formValue.phoneNumber}</span>
          </p>
          <p>
           - شهر محل زندگی : <span>{cityGenerator()}</span>
          </p>
          <p>
            - آدرس دقیق :<span> {formValue.address}</span>
          </p>
          <p>
            - تعداد اعضای خانواده : <span>{formValue.numberOfFamilyMember}</span>
          </p>
          <p>
            - وضعیت : <span>{isMarriedGenerator()}</span>
          </p>
          <p>
            - دو قلو : <span> {isTwinsGenerator()} </span>
          </p>
          <p> - خواهر و برادر شامل : {siblingsGenerator()}</p>
          <div className="a4-btns">
            <button className="a4-btn" onClick={() => toast(<div className='toast-style'>اطلاعات شما ثبت شد</div>)}>اطلاعات درست است</button>
            <ToastContainer/>
            <button className="a4-btn" onClick={editHandler}>ویرایش</button>
          </div>
        </div>
      ) : (
        <div> Loading ...</div>
      )}
    </div>
  )
}

export default LastPage
