const Input = ({formik ,name ,placeholder,label , type = 'text' ,errorStyle , min ='null' , className ="input-text-container"}) => {
    return ( <div className={className}>
    <label> {label}:</label>
    <input
      type={type}
      name={name}
      min={min}
      {...formik.getFieldProps(name)}
      placeholder={placeholder}
      style= {
        formik.touched[name] && formik.errors[name]
          ? errorStyle
          : null }
    />
    {formik.touched[name] && formik.errors[name] && (
      <span className="error">{formik.errors[name]}</span>
    )}
  </div> );
}
 
export default Input;