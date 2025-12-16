import { useState, useRef } from "react";
import { calculateMortgage } from "../utils/calculations";
import { validateField, validateForm } from "../utils/validation";
import MortgageForm from "./MortgageForm";
import ResultsPane from "./ResultsPane";

function MortgageCalculator() {
  // input elements state
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  // refs to facilitate focus behavior on error
  const amountRef = useRef(null);
  const termRef = useRef(null);
  const rateRef = useRef(null);
  const typeRef = useRef(null);
  // validation errors state
  const [errors, setErrors] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });

  // wrapped setter functions for real-time error management
  const handleAmountChange = (value) => {
    setAmount(value); // update the value
    if (errors.amount) {
      // check if there's currently an error
      const error = validateField("amount", value);
      if (!error) {
        // if error is resolved with a valid value
        setErrors((prev) => ({ ...prev, amount: "" })); // clear the error message
      }
    }
  };

  const handleTermChange = (value) => {
    setTerm(value);
    if (errors.term) {
      const error = validateField("term", value);
      if (!error) {
        setErrors((prev) => ({ ...prev, term: "" }));
      }
    }
  };

  const handleRateChange = (value) => {
    setRate(value);
    if (errors.rate) {
      const error = validateField("rate", value);
      if (!error) {
        setErrors((prev) => ({ ...prev, rate: "" }));
      }
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
    if (errors.type) {
      const error = validateField("type", value);
      if (!error) {
        setErrors((prev) => ({ ...prev, type: "" }));
      }
    }
  };

  // calculated results state
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalRepayment: 0,
  });

  // state for handling display of calculated results
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // get errors object and validity boolean value
    const { newErrors, isValid } = validateForm(amount, term, rate, type);
    setErrors(newErrors);

    if (isValid) {
      const calculatedResults = calculateMortgage(amount, term, rate, type);
      setResults(calculatedResults);
      setHasCalculated(true);
    } else { // validation has failed
      const fieldOrder = [
        { name: "amount", ref: amountRef, error: newErrors.amount },
        { name: "term", ref: termRef, error: newErrors.term },
        { name: "rate", ref: rateRef, error: newErrors.rate },
        { name: "type", ref: typeRef, error: newErrors.type },
      ];
      // find the first field with an error based on fieldOrder
      const firstErrorField = fieldOrder.find((field) => field.error);
      // focus the found field
      if (firstErrorField && firstErrorField.ref.current) {
        firstErrorField.ref.current.focus();
      }
    }
  };

  const handleClear = () => {
    console.log("Clearing form...");
    // reset all form input state variables
    setAmount("");
    setTerm("");
    setRate("");
    setType("");
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
      <section>
        <MortgageForm
          amount={amount}
          setAmount={handleAmountChange}
          term={term}
          setTerm={handleTermChange}
          rate={rate}
          setRate={handleRateChange}
          type={type}
          setType={handleTypeChange}
          amountRef={amountRef}
          termRef={termRef}
          rateRef={rateRef}
          typeRef={typeRef}
          errors={errors}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </section>
      <section
        role="region"
        aria-live="polite"
        className="py-8 px-6 sm:p-10 grid bg-cyan-950 text-slate-300 lg:rounded-bl-[80px]">
        <ResultsPane
          hasCalculated={hasCalculated}
          results={results}
        />
      </section>
    </div>
  );
}

export default MortgageCalculator;
