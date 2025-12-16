// validate a field, return error message if invalid
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "amount":
      if (!value) {
        return "Mortgage amount is required";
      }
      if (isNaN(value) || Number(value) <= 0) {
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
};

// validate form, set errors where necessary
export const validateForm = (amount, term, rate, type) => {
  const newErrors = {
    amount: validateField("amount", amount),
    term: validateField("term", term),
    rate: validateField("rate", rate),
    type: validateField("type", type),
  };
  // are there errors? true/false
  const isValid = !Object.values(newErrors).some(
    (error) => error !== "",
  );
  // return newErrors object, isValid boolean value
  return { newErrors, isValid };
};
