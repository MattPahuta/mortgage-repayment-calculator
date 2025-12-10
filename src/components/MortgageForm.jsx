import FormInput from "./FormInput";
import MortgageTypeSelector from "./MortgageTypeSelector";

function MortgageForm({
  amount,
  setAmount,
  term,
  setTerm,
  rate,
  setRate,
  type,
  setType,
  amountRef,
  termRef,
  rateRef,
  typeRef,
  errors,
  onSubmit,
  onClear,
}) {
  return (
    <>
      <form
        noValidate
        onSubmit={onSubmit}
        className="py-8 px-6 sm:p-10 space-y-6 sm:space-y-10 text-slate-600">
        <header className="flex flex-col gap-2 items-start sm:flex-row sm:justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Mortgage Calculator
          </h1>
          <button
            type="button"
            onClick={onClear}
            className="text-slate-600 cursor-pointer border-b border-slate-600 hover:text-slate-900 hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1  focus-visible:outline-slate-900 focus-visible:border-0">
            Clear All
          </button>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Input grid group */}
          <div className="grid gap-2.5 sm:col-span-2">
            <FormInput
              type="number"
              label="Mortgage Amount"
              name="amount"
              value={amount}
              onChange={setAmount}
              ref={amountRef}
              error={errors.amount}
              step="0.01"
              min="0"
              inputMode="numeric"
              accentContent="$"
              accentLabel="in dollars"
              accentOrder="order-1"
            />
          </div>
          {/* Input grid group */}
          <div className="grid gap-2.5">
            <FormInput
              type="number"
              label="Mortgage Term"
              name="term"
              value={term}
              onChange={setTerm}
              ref={termRef}
              error={errors.term}
              step="1"
              min="1"
              inputMode="numeric"
              accentContent="years"
              accentLabel="in years"
              accentOrder="order-0"
            />
          </div>
          {/* Input grid group */}
          <div className="grid gap-2.5">
            <FormInput
              type="number"
              label="Interest Rate"
              name="rate"
              value={rate}
              onChange={setRate}
              ref={rateRef}
              error={errors.rate}
              step="0.01"
              min="0"
              inputMode="numeric"
              accentContent="%"
              accentLabel="percentage"
              accentOrder="order-0"
            />
          </div>
          {/* Radio fieldset grid group */}
          <div className="grid sm:col-span-2">
            <MortgageTypeSelector
              value={type}
              onChange={setType}
              ref={typeRef}
              error={errors.type}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full sm:w-[315px] py-3.5 px-4 inline-flex items-center justify-center gap-2 text-lg font-bold text-slate-900 bg-lemon-lime rounded-full cursor-pointer hover:bg-lemon-lime/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition">
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
    </>
  );
}

export default MortgageForm;
