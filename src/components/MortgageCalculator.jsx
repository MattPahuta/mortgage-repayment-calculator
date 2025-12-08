import { useState } from "react";
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

  // validate a field, return error message if invalid
  // return empty string if valid
  function validateField(fieldName, value) {
    switch(fieldName) {
      case "amount":
        if (!value) {
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
    setAmount(value);
    if (errors.amount) {
      const error = validateField("amount", value);
      // clear error if the new value is valid
      if (!error) {
        setErrors(prev => ({...prev, amount: ""}));
      }
    }
  };
  const handleTermChange = (value) => {
    setTerm(value);
    if (errors.term) {
      const error = validateField("term", value);
      // clear error if the new value is valid
      if (!error) {
        setErrors(prev => ({...prev, term: ""}));
      }
    }
  };
  const handleRateChange = (value) => {
    setRate(value);
    if (errors.rate) {
      const error = validateField("rate", value);
      // clear error if the new value is valid
      if (!error) {
        setErrors(prev => ({...prev, rate: ""}));
      }
    }
  };
  const handleTypeChange = (value) => {
    setType(value);
    if (errors.type) {
      const error = validateField("type", value);
      // clear error if the new value is valid
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

  const [hasCalculated, setHasCalculated] = useState(false);

  function validateForm() {
    const newErrors = {
      amount: validateField("amount", amount),
      term: validateField("term", term),
      rate: validateField("rate", rate),
      type: validateField("type", type)
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
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

    if (validateForm()) {
      const calculatedResults = calculateMortgage();
      setResults(calculatedResults);
      setHasCalculated(true);
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
      {/* form goes here */}
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
          errors={errors}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </section>
      {/* results pane goes here */}
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
