import emptyResultsImg from '../assets/illustration-empty.svg';

function ResultsPane() {
  return (
    <div className="py-8 px-6 sm:p-10 text-center">
      <img src={emptyResultsImg} alt="" className="mx-auto mb-4" />
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Results shown here
      </h2>
      <p>
        Complete the form and click “calculate repayments” to see what
        your monthly repayments would be.
      </p>
    </div>
  );
}

export default ResultsPane;