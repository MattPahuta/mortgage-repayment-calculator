import FormInput from './FormInput';

function MortgageForm() {
  return (
    <form noValidate className="py-8 px-6 space-y-6 bg-white text-slate-700">
      <header className="flex flex-col items-start">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Mortgage Calculator</h1>
        <button className="font-medium cursor-pointer border-b border-slate-700">Clear All</button>
      </header>
      <div className="grid gap-6">
        {/* Input group */}
        <FormInput />
        {/* <div className="">
          <label htmlFor="" className="">Label text
          <div className="flex">
            <span className=""></span>
            <input type="text" className="w-full rounded-sm px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-700" />
          </div>
          </label>
        </div> */}
        {/* Input group */}
        <div className="">
          <label htmlFor="" className="">Label text
          <div className="flex">
            <span className=""></span>
            <input type="text" className="bg-white" />
          </div>
          </label>
        </div>
        {/* Input group */}
        <div className="">
          <label htmlFor="" className="">Label text
          <div className="flex">
            <span className=""></span>
            <input type="text" className="bg-white" />
          </div>
          </label>
        </div>
        {/* Radio fieldset */}
        <fieldset>
          <legend>Mortgage Type</legend>
          <label htmlFor="">
            <input type="radio" />
            Repayment
          </label>
          <label htmlFor="">
            <input type="radio" />
            Interest Only
          </label>
        </fieldset>
      </div>
      <button className="">Calculate Repayments</button>
    </form>
  )
}

export default MortgageForm;