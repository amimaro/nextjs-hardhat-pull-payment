import { ethers } from "ethers";
import { formatEther } from "../utils/helpers";

export const AppTransactions: React.FC<{
  transactions: ethers.providers.TransactionResponse[];
}> = ({ transactions }) => {
  return (
    <>
      {transactions.length > 0 && (
        <div className="border-2 p-4 rounded-md w-96 flex flex-col justify-center gap-4">
          <h3 className="text-md font-bold">Transactions:</h3>
          <div className="flex flex-col gap-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.hash}
                className="flex justify-between border-b-2"
              >
                <div>{transaction.nonce}</div>
                <div>
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800"
                  >
                    View transaction
                  </a>
                </div>
                <div>Value: {formatEther(transaction.value)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
