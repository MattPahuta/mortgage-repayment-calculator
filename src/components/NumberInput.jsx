function NumberInput({id, label, accentContent, accentLabel, step, order = ''}) {
  return (
    <>
      <label htmlFor={id} className="">
        {label} 
        <span className="sr-only">{accentLabel}</span>
        <div className="group mt-2.5 flex items-center rounded-sm border border-slate-400 overflow-hidden shadow-sm hover:border-slate-900 transition has-focus:border-lemon-lime has-invalid:border-red-600">
          <input
            inputMode="numeric"
            type="number"
            id={id}
            aria-describedby={`${id}-error`}
            step={step}
            className={`${order} peer w-full mx-4 appearance-none text-slate-900 font-semibold outline-0 group-hover:cursor-pointer`}
          />
          <div className="bg-sky-100 px-3.5 py-2 text-lg font-bold peer-focus:bg-lemon-lime peer-focus:text-slate-900 peer-invalid:bg-red-600 peer-invalid:text-white">
            {accentContent}
          </div>
        </div>
      </label>
      {/* error notification */}
      <div id={`${id}-error`} className="hidden" aria-live="assertive">
        <p className="text-red-600">This field is required</p>
      </div>
    </>
  );
}

export default NumberInput;