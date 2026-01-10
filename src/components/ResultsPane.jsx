import { formatCurrency } from "../utils/formatters";
import emptyResultsImg from "../assets/illustration-empty.svg";

function ResultsPane({ hasCalculated, results }) {
  
  return (
    <>
      {!hasCalculated ? (
        <div className="max-w-xl text-center place-self-center">
          <img
            src={emptyResultsImg}
            alt=""
            className="mx-auto mb-4"
          />
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Results shown here
          </h2>
          <p>
            Complete the form and click “calculate repayments” to see
            what your monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="max-w-xl">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Your results
          </h2>
          <p className="mb-6 md:mb-10">
            Your results are shown below based on the information you
            provided. To adjust the results, edit the form and click
            “calculate repayments” again.
          </p>
          <div className="w-full px-4 py-6 md:p-8 bg-slate-900 rounded-lg border-t-4 border-lemon-lime">
            <table className="w-full">
              <tbody className="border-b border-slate-400">
                <tr>
                  <th
                    scope="col"
                    className="text-left font-medium text-slate-400 pb-2">
                    Your monthly repayments
                  </th>
                </tr>
                <tr>
                  <td className="text-3xl text-lemon-lime font-bold pb-4 md:pb-8 md:text-5xl">
                    {formatCurrency(results.monthlyPayment)}
                  </td>
                </tr>
              </tbody>
              <tbody className="">
                <tr>
                  <th
                    scope="col"
                    className="text-left font-medium text-slate-400 pt-4 pb-2 md:pt-8">
                    Total you&apos;ll repay over the term
                  </th>
                </tr>
                <tr>
                  <td className="text-left text-2xl text-white font-semibold">
                    {formatCurrency(results.totalRepayment)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ResultsPane;
