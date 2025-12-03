import MortgageForm from "./MortgageForm";
import ResultsPane from "./ResultsPane";

function MortgageCalculator() {
  return (
    <div className="max-w-5xl grid overflow-hidden sm:rounded-3xl lg:grid-cols-2 bg-white">
      {/* form goes here */}
      <section>
        <MortgageForm />
      </section>
      {/* results pane goes here */}
      <section className="flex items-center bg-cyan-950 text-slate-300 lg:rounded-bl-[80px]">
        <ResultsPane />
      </section>
    </div>
  );
}

export default MortgageCalculator;