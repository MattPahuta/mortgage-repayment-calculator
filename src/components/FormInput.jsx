// Props: type, id, label text, accent label content, input order (1 or 0), supplemental (hidden) label content
// handle order more gracefully - 1 on the Form component, translate to 
// ** ToDo: Rename to NumberInput, remove 'type' prop

function FormInput({type, id, label, accentContent, accentLabel, step, order = ''}) {
  return (
    <>
      <label htmlFor={id} className="">
        {label} 
        <span className="sr-only">{accentLabel}</span>
        <div className="group mt-2.5 flex items-center rounded-sm border border-slate-400 overflow-hidden shadow-sm hover:border-slate-900 transition has-focus:border-lemon-lime">
          <input
            inputMode="numeric"
            type={type}
            id={id}
            aria-describedby={`${id}-error`}
            step={step}
            className={`${order} peer w-full mx-4 appearance-none text-slate-900 font-semibold outline-0 group-hover:cursor-pointer`}
          />
          <div className="bg-sky-100 px-3.5 py-2 text-lg font-bold peer-focus:bg-lemon-lime peer-focus:text-slate-900">
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

export default FormInput;