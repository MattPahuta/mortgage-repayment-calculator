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

  // state for handling display of calculated results
  const [hasCalculated, setHasCalculated] = useState(false);

  // refs to facilitate focus behavior on error
  const amountRef = useRef(null);
  const termRef = useRef(null);
  const rateRef = useRef(null);
  const typeRef = useRef(null);

  // const handleAmountChange = (value) => {
  //   setAmount(value);
  //   if (errors.amount) {
  //     const error = validateField("amount", value);
  //     if (!error) {
  //       setErrors((prev) => ({ ...prev, amount: "" }));
  //     }
  //   }
  // };

  // const handleTermChange = (value) => {
  //   setTerm(value);
  //   if (errors.term) {
  //     const error = validateField("term", value);
  //     if (!error) {
  //       setErrors((prev) => ({ ...prev, term: "" }));
  //     }
  //   }
  // };

  // const handleRateChange = (value) => {
  //   setRate(value);
  //   if (errors.rate) {
  //     const error = validateField("rate", value);
  //     if (!error) {
  //       setErrors((prev) => ({ ...prev, rate: "" }));
  //     }
  //   }
  // };

  // const handleTypeChange = (value) => {
  //   setType(value);
  //   if (errors.type) {
  //     const error = validateField("type", value);
  //     if (!error) {
  //       setErrors((prev) => ({ ...prev, type: "" }));
  //     }
  //   }
  // };

  /**
   * Creates a change handler for a specific field
   * Handles both state updates and error clearing
   */
  const createChangeHandler = (fieldName, setter) => (value) => {
    setter(value);

    // Clear error if the new value is valid
    if (errors[fieldName]) {
      const error = validateField(fieldName, value);
      if (!error) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    }
  };

  // Generate handlers
  const handleAmountChange = createChangeHandler("amount", setAmount);
  const handleTermChange = createChangeHandler("term", setTerm);
  const handleRateChange = createChangeHandler("rate", setRate);
  const handleTypeChange = createChangeHandler("type", setType);

  const handleSubmit = (event) => {
    event.preventDefault();
    // get errors object and validity boolean value
    const { newErrors, isValid } = validateForm(
      amount,
      term,
      rate,
      type,
    );
    setErrors(newErrors);

    if (isValid) {
      const calculatedResults = calculateMortgage(
        amount,
        term,
        rate,
        type,
      );
      setResults(calculatedResults);
      setHasCalculated(true);
    } else {
      // validation has failed
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
    <div className="max-w-5xl shadow-lg grid overflow-hidden sm:rounded-3xl lg:grid-cols-2 bg-white">
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
