import { useState } from "react";
import MortgageForm from "./MortgageForm";
import ResultsPane from "./ResultsPane";

function MortgageCalculator() {
  // input elements state
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("repayment");

  // validation errors state
  const [errors, setErrors] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });
  // calculated results state
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalRepayment: 0,
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  // validate all form inputs
  function validateForm() {
    const newErrors = {};
    // validate amount
    if (!amount) {
      newErrors.amount = "Mortgage amount is required";
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid positive number";
    }
    // validate term
    if (!term) {
      newErrors.term = "Mortgage term is required";
    } else if (
      isNaN(term) ||
      Number(term) <= 0 ||
      !Number.isInteger(Number(term))
    ) {
      newErrors.term = "Please enter a valid number of years";
    }
    // validate rate
    if (!rate) {
      newErrors.rate = "Interest rate is required";
    } else if (isNaN(rate) || Number(rate) < 0) {
      newErrors.rate = "Please enter a valid interest rate";
    }
    // validate type
    if (!type) {
      newErrors.type = "Mortgage type is required";
    }

    setErrors(newErrors);
    // early return - test and move up
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Calculating results...");
      setHasCalculated(true);
    }
  };

  const handleClear = () => {
    console.log("Clearing form...");
    // reset all form input state variables
    setAmount("");
    setTerm("");
    setRate("");
    setType("repayment");
    // reset errors
    setErrors({
      amount: "",
      term: "",
      rate: "",
      type: "",
    });

    setResults({
      monthlyPayment: 0,
      totalRepayment: 0,
    });

    setHasCalculated(false);
  };

  return (
    <div className="max-w-5xl grid overflow-hidden sm:rounded-3xl lg:grid-cols-2 bg-white">
      {/* form goes here */}
      <section>
        <MortgageForm
          amount={amount}
          setAmount={setAmount}
          term={term}
          setTerm={setTerm}
          rate={rate}
          setRate={setRate}
          type={type}
          setType={setType}
          errors={errors}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </section>
      {/* results pane goes here */}
      <section className="flex items-center lg:items-start bg-cyan-950 text-slate-300 lg:rounded-bl-[80px]">
        <ResultsPane
          hasCalculated={hasCalculated}
          results={results}
        />
      </section>
    </div>
  );
}

export default MortgageCalculator;
