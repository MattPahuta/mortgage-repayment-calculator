import { useFormattedInput } from "../hooks/useFormattedInput";

function FormInput({
  label,
  name,
  title,
  value,
  onChange,
  ref,
  error,
  formatter,
  inputMode,
  accentContent,
  accentLabel,
  accentOrder = "",
}) {
  // use the formatted input hook if a formatter is provided
  const formattedInput = useFormattedInput(
    value,
    onChange,
    formatter,
  );

  // for inputs with no provided formatter, use this simple change handler
  const handleSimpleChange = (event) => {
    const inputValue = event.target.value;
    // allow only empty string, numbers, decimal point
    if (inputValue === "" || /^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  // Determine which values and handlers to use based on whether formatter exists
  const inputValue = formatter ? formattedInput.displayValue : value;
  const changeHandler = formatter
    ? formattedInput.handleChange
    : handleSimpleChange;
  const focusHandler = formatter
    ? formattedInput.handleFocus
    : undefined;
  const blurHandler = formatter
    ? formattedInput.handleBlur
    : undefined;

  return (
    <>
      <label htmlFor={name}>
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
            title={title}
            value={inputValue}
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
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
