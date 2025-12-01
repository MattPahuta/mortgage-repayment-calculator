
function MortgageTypeSelector() {

  return (
    <fieldset className="">
      <legend className="">Mortgage Type</legend>
      <div className="mt-3 space-y-3">
        <label className="px-4 py-2.5 grid grid-cols-[24px_1fr] gap-2.5 items-center text-lg font-semibold text-slate-900 rounded-sm border border-slate-400 shadow-sm has-checked:border-lemon-lime has-checked:bg-lemon-lime/20 hover:cursor-pointer hover:border-lemon-lime transition">
          <input
            type="radio"
            name="mortgage-type"
            id=""
            className="h-[18px] w-[18px] place-self-center  appearance-none rounded-full border-4 border-white bg-white bg-clip-padding outline-2 outline-slate-400 checked:bg-lemon-lime checked:outline-lemon-lime checked:border-3 checked:border-lemon-lime/20 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-3 transiton"
          />
          Repayment
        </label>
        <label className="px-4 py-2.5 grid grid-cols-[24px_1fr] gap-2.5 items-center text-lg font-semibold text-slate-900 rounded-sm border border-slate-400 shadow-sm has-checked:border-lemon-lime has-checked:bg-lemon-lime/20 hover:cursor-pointer hover:border-lemon-lime transition">
          <input
            type="radio"
            name="mortgage-type"
            id=""
            className="h-[18px] w-[18px] place-self-center  appearance-none rounded-full border-4 border-white bg-white bg-clip-padding outline-2 outline-slate-400 checked:bg-lemon-lime checked:outline-lemon-lime checked:border-3 checked:border-lemon-lime/20 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-3 transiton"
          />
          Interest Only
        </label>
      </div>
    </fieldset>
  );
}

export default MortgageTypeSelector;