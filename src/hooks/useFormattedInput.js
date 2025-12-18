import { useState } from "react";
/**
 * Custom hook for managing formatted inputs
 * Formats the value when not focused, shows raw value when focused
 * @param {string} value - Current input value
 * @param {function} onChange - Handler to update parent state
 * @param {object} formatter - Object with format and clean methods
 * @returns {object} - Display value and event handlers
 */
export const useFormattedInput = (value, onChange, formatter) => {
  const [isFocused, setIsFoused] = useState(false);

  // Derive value to avoid storing in state and potential cascading render issues
  const displayValue = isFocused
    ? (value || '') // focused: show raw value for editing
      // not focused AND has value And has formatter - formati it, or show raw/empty value
    : (value && formatter ? formatter.format(value) : (value || ''));

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Clean the input using the provided formatter
    const cleanValue = formatter ? formatter.clean(inputValue) : inputValue;
    // Allow only valid numeric value
    if (cleanValue === '' || /^[0-9]*\.?[0-9]*$/.test(cleanValue)) {
      onChange(cleanValue); // pass clean value to parent
    }
  };

  const handleFocus = () => {
    setIsFoused(true);
  };

  const handleBlur = () => {
    setIsFoused(false);
  };

  return {
    displayValue,
    isFocused,
    handleChange,
    handleFocus,
    handleBlur
  }

}