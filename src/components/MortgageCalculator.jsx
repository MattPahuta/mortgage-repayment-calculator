import MortgageForm from "./MortgageForm";

function MortgageCalculator() {
  return (
    <div className="grid">
      {/* form goes here */}
      <section className="">
        <MortgageForm />
      </section>
      {/* results pane goes here */}
      <section className=""></section>
    </div>
  )
}

export default MortgageCalculator;