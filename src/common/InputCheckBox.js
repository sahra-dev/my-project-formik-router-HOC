const CheckboxInput = ({ name, options, label, formik }) => {
  return (
    <div className="checkbox-input">
      <label> {label}</label>
      <div>
        {options.map((item) => (
          <div key={item.value}>
            <input
              type="checkbox"
              id={item.value}
              name={name}
              value={item.value}
              onChange={formik.handleChange}
              checked={formik.values[name].includes(item.value)}
            />
            <label htmlFor={item.value} >
              {item.label}
            </label>
          </div>
        ))}
      </div>
      {formik.errors[name] && formik.touched[name] &&(
        <span className="error" > {formik.errors[name]}</span>
      )}
    </div>
  )
}

export default CheckboxInput
