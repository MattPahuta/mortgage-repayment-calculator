/**
 * Calculates mortgage payments for repayment mortgages using amortization formula
 * M = P[r(1+r)^n]/[(1+r)^n-1]
 */
export const calculateRepaymentMortgage = (principal, years, annualRate) => {
  const monthlyRate = annualRate / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    // Edge case: 0% interest rate
    const monthlyPayment = principal / numberOfPayments;
    return {
      monthlyPayment,
      totalRepayment: principal
    };
  }

  const monthlyPayment = principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalRepayment = monthlyPayment * numberOfPayments;

  return {
    monthlyPayment,
    totalRepayment
  };
}

/**
 * Calculates mortgage payments for interest-only mortgages
 */
export const calculateInterestOnlyMortgage = (principal, years, annualRate) => {
  const monthlyPayment = (principal * annualRate) / 12;
  const totalInterest = monthlyPayment * years * 12;
  const totalRepayment = principal + totalInterest;

  return {
    monthlyPayment,
    totalRepayment
  };
};

/**
 * Main calculation function that routes to appropriate calculator
 */
export const calculateMortgage = (amount, term, rate, type) => {
  const principal = Number(amount);
  const years = Number(term);
  const annualRate = Number(rate) / 100;

  if (type === 'repayment') {
    return calculateRepaymentMortgage(principal, years, annualRate);
  } else {
    return calculateInterestOnlyMortgage(principal, years, annualRate);
  }
};