
const Layout = (WrappedComponent , title) => {
  return (props) => {
    return (<div className="body">
      <header>لطفا اطلاعات خود را وارد کنید</header>
      <div className="counter">
        <h3 className="counter-header">{title}</h3>
        <div className="counter-main">
          <WrappedComponent />
        </div>
      </div>
    </div>)
  }
}

export default Layout
