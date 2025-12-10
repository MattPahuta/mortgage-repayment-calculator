import { useState, useRef } from "react";
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

  // validate a field, return error message if invalid
  // return empty string if valid
  function validateField(fieldName, value) {
    switch(fieldName) {
      case "amount":
        if (!value.trim()) {
          console.log(value)
          return "Mortgage amount is required";
        } else if (isNaN(value) || Number(value) <= 0) {
          return "Please enter a valid positive number";
        }
        return "";
      
      case "term":
        if (!value) {
          return "Mortgage term is required";
        } else if (
          isNaN(value) ||
          Number(value) <= 0 ||
          !Number.isInteger(Number(value))
        ) {
          return "Please enter a valid number of years";
        }
        return "";

      case "rate":
        if (!value) {
          return "Interest rate is required";
        } else if (isNaN(value) || Number(value) < 0) {
          return "Please enter a valid interest rate";
        }
        return "";

      case "type":
        if (!value) {
          return "Mortgage type is required";
        }
        return "";

      default:
        return "";
    }
  }

  // wrapped setter functions for real-time error management
  const handleAmountChange = (value) => {
    setAmount(value); // update the value
    if (errors.amount) { // check if there's currently an error
      const error = validateField("amount", value);
      if (!error) { // if error is resolved with a valid value
        setErrors(prev => ({...prev, amount: ""})); // clear the error message
      }
    }
  };

  const handleTermChange = (value) => {
    setTerm(value);
    if (errors.term) {
      const error = validateField("term", value);
      if (!error) {
        setErrors(prev => ({...prev, term: ""}));
      }
    }
  };

  const handleRateChange = (value) => {
    setRate(value);
    if (errors.rate) {
      const error = validateField("rate", value);
      if (!error) {
        setErrors(prev => ({...prev, rate: ""}));
      }
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
    if (errors.type) {
      const error = validateField("type", value);
      if (!error) {
        setErrors(prev => ({...prev, type: ""}));
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

  // validate form, set errors where necessary
  function validateForm() {
    const newErrors = {
      amount: validateField("amount", amount),
      term: validateField("term", term),
      rate: validateField("rate", rate),
      type: validateField("type", type)
    };
    // are there errors? true/false
    const isValid = !Object.values(newErrors).some(
      (error) => error !== "",
    );
    // return newErrors object, isValid boolean value
    return { newErrors, isValid } ;
  }

  // calculate mortgage payments and totals
  // return object with calculated values
  function calculateMortgage() {
    const principal = Number(amount);
    const years = Number(term);
    const annualRate = Number(rate) / 100;
    // if "repayment" option selected
    if (type === "repayment") {
      const monthlyRate = annualRate / 12;
      const numberOfPayments = years * 12;

      // if 0% interest rate
      if (monthlyRate === 0) {
        const monthlyPayment = principal / numberOfPayments;
        return {
          monthlyPayment,
          totalRepayment: principal,
        };
      }
      // formula for calculating monthly payment
      const monthlyPayment =
        (principal *
          (monthlyRate *
            Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalRepayment = monthlyPayment * numberOfPayments;

      return {
        monthlyPayment,
        totalRepayment,
      };
      // if "interest-only" option selected
    } else {
      const monthlyPayment = (principal * annualRate) / 12;
      const totalInterest = monthlyPayment * years * 12;
      const totalRepayment = principal + totalInterest;

      return {
        monthlyPayment,
        totalRepayment,
      };
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // get errors object and validity boolean value
    const { newErrors, isValid } = validateForm();
    setErrors(newErrors);
     // if (validateForm()) {
    if (isValid) {
      const calculatedResults = calculateMortgage();
      setResults(calculatedResults);
      setHasCalculated(true);
    } else {
      // validation has failed
      // define order of fields for error checks
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
  };;;

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
      {/* form section goes here */}
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
      {/* results section goes here */}
      <section className="py-8 px-6 sm:p-10 grid bg-cyan-950 text-slate-300 lg:rounded-bl-[80px]">
        <ResultsPane
          hasCalculated={hasCalculated}
          results={results}
        />
      </section>
    </div>
  );
}

export default MortgageCalculator;
