import { useState } from "react";
import MortgageForm from "./MortgageForm";
import ResultsPane from "./ResultsPane";

function MortgageCalculator() {
  
  const [formData, setFormData] = useState({
    amount: '',
    term: '',
    rate: '',
    type: 'repayment'
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalRepayment: 0
  });

  const [hasCalculated, setHasCalculated] = useState(true);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className="max-w-5xl grid overflow-hidden sm:rounded-3xl lg:grid-cols-2 bg-white">
      {/* form goes here */}
      <section>
        <MortgageForm formData={formData} onChange={handleInputChange} />
      </section>
      {/* results pane goes here */}
      <section className="flex items-center bg-cyan-950 text-slate-300 lg:rounded-bl-[80px]">
        <ResultsPane hasCalculated={hasCalculated} results={results} />
      </section>
    </div>
  );
}

export default MortgageCalculator;