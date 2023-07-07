const SelectInput = ({ formik, label, options, name, id, errorStyle , className}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}:</label>
      <select
        name={name}
        id={id}
        onChange={formik.handleChange}
        {...formik.getFieldProps({ name })}
        style={formik.errors[name] && formik.touched[name] ? errorStyle : null}
      >
        <option value="">...</option>
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <span className="error">{formik.errors[name]}</span>
      )}
    </div>
  )
}

export default SelectInput
