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

  const formattedInput = useFormattedInput(
    value,
    onChange,
    formatter,
  );

  const handleSimpleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || /^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

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
      </label>
      <div
        className={`
        group flex items-center rounded-sm border overflow-hidden shadow-sm hover:border-slate-900 transition 
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
          pattern="^\d+(\.\d+)?$"
          inputMode={inputMode}
          className={`${accentOrder} peer w-full mx-4 appearance-none text-slate-900 font-semibold outline-0 group-hover:cursor-pointer`}
        />
        <div
          className={`px-3.5 py-2 text-lg font-bold  ${error ? "bg-red-600 text-white" : "bg-sky-100 peer-focus:bg-lemon-lime peer-focus:text-slate-900"}
          `}>
          {accentContent}
        </div>
      </div>
      {error && (
        <div id={`${name}-error`} role="alert" aria-live="assertive">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </>
  );
}

export default FormInput;
