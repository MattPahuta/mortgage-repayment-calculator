function FormInput({
  label,
  name,
  value,
  onChange,
  ref,
  error,
  inputMode,
  accentContent,
  accentLabel,
  accentOrder = "",
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label htmlFor={name} className="">
        {label}
        <span className="sr-only">{accentLabel}</span>
        <div
          className={`
          group mt-2.5 flex items-center rounded-sm border overflow-hidden shadow-sm hover:border-slate-900 transition 
          ${error ? "border-red-600" : "border-slate-400 has-focus:border-lemon-lime"}
          `}>
          <input
            required
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            pattern="[0-9]*\.?[0-9]*"
            inputMode={inputMode}
            className={`${accentOrder} peer w-full mx-4 appearance-none text-slate-900 font-semibold outline-0 group-hover:cursor-pointer`}
          />
          <div
            className={`px-3.5 py-2 text-lg font-bold  ${error ? "bg-red-600 text-white" : "bg-sky-100 peer-focus:bg-lemon-lime peer-focus:text-slate-900"}
            `}>
            {accentContent}
          </div>
        </div>
      </label>
      {/* error notification */}
      {error && (
        <div id={`${name}-error`} role="alert" aria-live="assertive">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </>
  );
}

export default FormInput;
