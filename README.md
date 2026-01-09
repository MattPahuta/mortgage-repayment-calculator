# Mortgage Calculator

A responsive mortgage calculator built with React featuring advanced form validation, accessibility-focused error handling, and cross-browser compatibility. This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). 

## Table of contents

- [Overview](#overview)
  - [Project requirements](#project-requirements)
  - [Key project features](#key-project-features)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Technical highlights](#technical-highlights)
  - [Lessons learned](#what-i-learned)
  - [Future enhancements](#future-enhancements)
  - [Useful resources](#useful-resources)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Connect](#connect)


## Overview

### Project requirements

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Key project features

This project features and demonstrates proficiency in:

- Responsive and accessible design using Tailwind CSS and proper semantic HTML
- Modern React patterns (hooks, controlled components, custom hooks)
- Form validation and error handling UX
- Cross-browser compatibility problem-solving
- Accessibility implementation (ARIA, focus management)
- Pure functions for testable business logic
- Clean architecture to separate business logic and UI components

### Screenshots

![](./mortgage-calculator_empty.png)

![](./mortgage-calculator_completed.png)

![](./mortgage-calculator_error.png)

### Links

- [Frontend Mentor solution page](https://your-solution-url.com)
- [live demo site](https://amazing-parfait-1e4e44.netlify.app/)

## My process

### Built with

- HTML5
- [React](https://reactjs.org/)
- JavaScript (ES6+)
- [Tailwindcss](https://tailwindcss.com/)
- [Vite](https://vite.dev/)


### Technical highlights

**Intelligent Error Clearing**

Implemented wrapper functions around state setters to:
- Show errors only after form submission
- Clear errors immediately when user corrects the issue
- Avoid unnecessary validation during initial typing

```js
// receive value from input
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
```

**Focus Management**

Implemented `useRef` pattern to automatically focus the first invalid field:
- Created refs for each input field
- Leveraged React 19 enhancements to pass refs to custom components, eliminating need for `forwardRef` 
- Programmatically focused first error on validation failure

```js
const amountRef = useRef(null);
// ... additional input refs

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
```

**Modular Form Input Component Design**

Implemented resusable input components to follow a modular app design approach and help streamline future enhancements. 
- Included a `useFormattedInput` custom hook as well as a simple change handler to handle user input values
- Utilized conditional Tailwind CSS class rendering and custom messaging to improve error content and states
- Added additional ARIA attributes to improve overall accessibility and screen reader performance 
- Implemented a custom solution for [Firefox browser's known behavior](https://bugzilla.mozilla.org/show_bug.cgi?id=1398528) of allowing non-numeric characters within `<input type=number>` resulting in the conversion of the invalid text input to empty strings:
- Used `type="text"` with `inputMode="decimal"` and `inputMode="numeric"` to achieve greater control over inputs while preserving mobile keyboard support
- Added real-time regex filtering to prevent non-numeric input values

```js
function FormInput({
  label,
  name,
  title,
  value,
  onChange,
  ref,
  error,
  formatter,
  inputMode,
  accentContent,
  accentLabel,
  accentOrder = "",
}) {
  // use the formatted input hook if a formatter is provided
  const formattedInput = useFormattedInput(
    value,
    onChange,
    formatter,
  );

  // for inputs with no provided formatter, use this simple change handler
  const handleSimpleChange = (event) => {
    const inputValue = event.target.value;
    // allow only empty string, numbers, decimal point
    if (inputValue === "" || /^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  // Determine which values and handlers to use based on whether formatter exists
  const inputValue = formatter ? formattedInput.displayValue : value;
  const changeHandler = formatter
    ? formattedInput.handleChange
    : handleSimpleChange;
  const focusHandler = formatter
    ? formattedInput.handleFocus
    : undefined;
  const blurHandler = formatter
    ? formattedInput.handleBlur
    : undefined;

  return (
    <>
      <label htmlFor={name}>
        {label}
        <span className="sr-only">{accentLabel}</span>
        <div
          className={`
          group mt-2.5 flex items-center rounded-sm border overflow-hidden shadow-sm hover:border-slate-900 transition 
          ${error ? "border-red-600" : "border-slate-400 has-focus:border-lemon-lime"}
          `}>
          <input
            required
            type="text"
            id={name}
            name={name}
            title={title}
            value={inputValue}
            onChange={changeHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            pattern="[0-9]*\.?[0-9]*"
            inputMode={inputMode}
            className={`${accentOrder} peer w-full mx-4 appearance-none text-slate-900 font-semibold outline-0 group-hover:cursor-pointer`}
          />
          <div
            className={`px-3.5 py-2 text-lg font-bold  ${error ? "bg-red-600 text-white" : "bg-sky-100 peer-focus:bg-lemon-lime peer-focus:text-slate-900"}
            `}>
            {accentContent}
          </div>
        </div>
      </label>
      {/* error notification */}
      {error && (
        <div id={`${name}-error`} role="alert" aria-live="assertive">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </>
  );
}

```

### Lessons learned

I took a slightly more traditional approach to this project. Using pre-React 19 controlled form inputs and opting to pass props down a couple of levels rather than use Context (which I believe is the proper best practice for a project of this small scale). However, I did take advantage of the React 19 update, where we no longer need to use `forwardRef` to forward refs to child components, simplifying the process. In the future, I'll look forward to building out forms and calculators with the enhancements React 19 offers.

I also opted to mostly stick with the out-of-the-box Tailwind colors and fonts rather than add the various custom colors and fonts from the design comp. Besides the more distinct lemon lime color that I did add as a custom variable, there wasn't much difference from what the figma file called for and what Tailwind provided. The project was mainly undertaken to continue practicing with small-scale React development and as a means to focus on the calculator's core functionality and accessibility enhancements.

### Future Enhancements

- [ ] Add amortization schedule visualization
- [ ] Implement mortgage comparison tool
- [ ] Add calculations for PMI, Escrow, etc.
- [ ] Export results as PDF
- [ ] Add unit tests for utility functions

### Useful resources

- [Official Tailwind Docs](https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-nested-groups) - A love the Tailwind CSS docs. The hover and focus section has some great examples and use cases of dealing with nested and peer group styles. A lot of helpful guidance here to achieve a close match to the design comp.
- [A complete guide to the HTML number input](https://olliewilliams.xyz/blog/guide-to-html-number-input/) - Brilliant and comprehensive article for all things HTML number input. This was a big help in understanding the various attributes of the input and the differences between browsers, and how they handle the settings.
- [Remove spinners Tailwind CSS](https://dev.to/bobbyiliev/how-to-remove-arrow-on-input-type-number-with-tailwind-css-5b0f) - Another good, straightforward article on the necessary Tailwind classes and settings used for updating the default appearance of number inputs.

## Project Structure
```
src/
├── components/
│   ├── MortgageCalculator.jsx   # Main component with app state
│   ├── MortgageForm.jsx         # Form container
│   ├── FormInput.jsx            # Reusable input component
│   ├── MortgageTypeSelector.jsx # Radio button group
│   └── ResultsPane.jsx          # Results display section
└── utils/
    ├── calculations.js          # Mortgage formulas
    ├── validation.js            # Validation logic
    └── formatters.js            # Currency formatting 
└── hooks/    
    └── useFormattedInput.js     # Custom hook to handle formatting logic
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/MattPahuta/mortgage-repayment-calculator.git
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Connect

- Website - [Matt Pahuta](https://www.mattpahuta.com)
- Frontend Mentor - [@mattpahuta](https://www.frontendmentor.io/profile/MattPahuta)
- Bluesky - [@mattpahuta](https://bsky.app/profile/mattpahuta.bsky.social)
- LinkedIn - [Matt Pahuta](www.linkedin.com/in/mattpahuta)
