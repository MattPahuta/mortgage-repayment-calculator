// Props: type, label text, accent/spacer content, accent/spacer orientation (start/end)
// FormInput with accent div for accent characters and years
function FormInput() {
  return (
    <div className="">
      <label htmlFor="mortgageAmount" className="">
        Mortgage Amount
        {/* Add prop to change flex property - row-reverse? */}
        <div className="group mt-2 flex items-center rounded-sm border border-slate-500 overflow-hidden hover:border-amber-500 transition">
          <div className="bg-sky-100 px-3.5 py-2 text-lg font-bold">$</div>
          <input
            type="text"
            id="mortgageAmount"
            className="w-full mx-2 text-slate-900 font-semibold outline-0"
          />
        </div>
      </label>
      {/* error notification */}
      <div></div>
    </div>
  );
}

export default FormInput;