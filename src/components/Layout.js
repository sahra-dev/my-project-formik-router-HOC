
const Layout = (WrappedComponent, header , title ) => {
  return (props) => {
    return (
    <div className="body">
      <header>{header}</header>
      <div className="counter">
        <h3 className="counter-header">{title}</h3>
        <div className="counter-main">
          <WrappedComponent />
        </div>
      </div>
    </div>
    )
  }
}

export default Layout
