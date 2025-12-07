function FormInput({
  type,
  label,
  name,
  value,
  onChange,
  error,
  step,
  min,
  inputMode,
  accentContent,
  accentLabel,
  accentOrder = "",
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  /* 
  group mt-2.5 flex items-center rounded-sm border border-slate-400 overflow-hidden shadow-sm hover:border-slate-900 transition has-focus:border-lemon-lime

  bg-sky-100 px-3.5 py-2 text-lg font-bold peer-focus:bg-lemon-lime peer-focus:text-slate-900 peer-invalid:bg-red-600 peer-invalid:text-white
  */

  return (
    <>
      <label htmlFor={name} className="">
        {label}
        <span className="sr-only">{accentLabel}</span>
        <div
          className={`
          group mt-2.5 flex items-center rounded-sm border overflow-hidden shadow-sm hover:border-slate-900 transition has-focus:border-lemon-lime
          ${error ? "border-red-600" : "border-slate-400"}
          `}>
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            step={step}
            min={min}
            inputMode={inputMode}
            className={`${accentOrder} peer w-full mx-4 appearance-none text-slate-900 font-semibold outline-0 group-hover:cursor-pointer`}
          />
          <div
            className={`px-3.5 py-2 text-lg font-bold peer-focus:bg-lemon-lime peer-focus:text-slate-900 peer-invalid:text-white ${error ? "bg-red-600 text-white" : "bg-sky-100"}
            `}>
            {accentContent}
          </div>
        </div>
      </label>
      {/* error notification */}
      {error && (
        <div id={`${name}-error`} role="alert" aria-live="assertive">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </>
  );
}

export default FormInput;
