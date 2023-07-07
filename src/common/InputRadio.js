const InputRadio = ({formik, name,  options, label }) => {
  return (
    <div className="input-radio">
      <label>{label} :</label>
      {options.map((item) => (
        <div className="radio-option" key={item.value}>
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
        ))}
        {formik.errors[name] && formik.touched[name] &&(
            <div className="error">{formik.errors[name]}</div>
        )}
    </div>
  )
}

export default InputRadio
