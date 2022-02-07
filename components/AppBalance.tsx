import { BigNumber } from "ethers";
import { formatEther } from "../utils/helpers";

export const AppBalance: React.FC<{
  balance: BigNumber | null;
  contractBalance: BigNumber | null;
}> = ({ balance, contractBalance }) => {
  return (
    <>
      {balance && (
        <table className="text-xl font-bold">
          <thead>
            <tr>
              <th></th>
              <th>ETH</th>
            </tr>
          </thead>
          <tbody>
            {balance && (
              <tr>
                <td className="pr-4">
                  <h2>Your Wallet Balance: </h2>
                </td>
                <td>
                  <h2>{formatEther(balance)}</h2>
                </td>
              </tr>
            )}
            {contractBalance && (
              <tr>
                <td className="pr-4">
                  <h2> Your Contract Balance: </h2>
                </td>
                <td>
                  <h2>{formatEther(contractBalance as BigNumber)}</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
