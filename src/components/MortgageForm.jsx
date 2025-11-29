import FormInput from './FormInput';
import { Calculator } from 'lucide-react';

function MortgageForm() {
  return (
    <form
      noValidate
      className="py-8 px-6 space-y-6 bg-white text-slate-600">
      <header className="flex flex-col items-start">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Mortgage Calculator
        </h1>
        <button className="text-slate-600 cursor-pointer border-b border-slate-600 hover:text-slate-900 hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1  focus-visible:outline-slate-900 focus-visible:border-0">
          Clear All
        </button>
      </header>
      <div className="grid gap-6">
        {/* Input group */}
        <FormInput
          type="text"
          id="mortgageAmount"
          label="Mortgage Amount"
          accentContent="$"
          accentLabel="in dollars"
          order="order-1"
        />
        {/* Input group */}
        <FormInput
          type="text"
          id="mortgageTerm"
          label="Mortgage Term"
          accentContent="years"
          accentLabel="in years"
          order="order-0"
        />
        {/* Input group */}
        <FormInput
          type="text"
          id="interestRate"
          label="Interest Rate"
          accentContent="%"
          accentLabel="percent"
          order="order-0"
        />

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
      <button type="submit" className="w-full py-3.5 px-4 inline-flex items-center justify-center gap-2 text-lg font-bold text-slate-900 bg-lemon-lime rounded-full cursor-pointer hover:bg-lemon-lime/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition">
        <svg
          focusable="false"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <path
            fill="#133041"
            d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
          />
        </svg>
        Calculate Repayments
      </button>
    </form>
  );
}

export default MortgageForm;
