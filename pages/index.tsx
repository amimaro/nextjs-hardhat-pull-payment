import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { AppInput } from "../components/AppInput";
import useWalletConnect from "../hooks/useWalletConnect";
import { formatEther } from "../utils/helpers";

const Home: NextPage = () => {
  const {
    account,
    network,
    balance,
    contractBalance,
    signer,
    contract,
    isConnected,
    connectToMetamask,
    disconnect,
  } = useWalletConnect();

  const [eth2Send, setEth2Send] = useState<number>(0);
  const [transactions, setTransactions] = useState<
    ethers.providers.TransactionResponse[]
  >([]);

  const withdraw = async () => {
    try {
      const tx = await contract?.withdrawPayments(account);
      transactions.push(tx as ethers.providers.TransactionResponse);
      setTransactions(transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const sendEthers = async () => {
    try {
      const tx = await signer?.sendTransaction({
        to: contract?.address,
        value: ethers.utils.parseEther(eth2Send + ""),
      });
      transactions.push(tx as ethers.providers.TransactionResponse);
      setTransactions(transactions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <AppHeader
        account={account + ""}
        isConnected={isConnected}
        disconnect={disconnect}
        connectToMetamask={connectToMetamask}
      />
      <div className="mt-10 w-full">
        <div className="flex flex-col items-center gap-4">
          <div>
            <button
              className="px-4 py-2 rounded-md bg-blue-500 active:bg-blue-600 text-white font-bold shadow-md"
              onClick={() => withdraw()}
            >
              Withdraw from Contract
            </button>
          </div>
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
          <div className="border-2 p-4 rounded-md w-96 flex flex-col justify-center gap-4">
            <AppInput
              value={eth2Send}
              onChange={(e) =>
                setEth2Send(
                  parseFloat(e.target.value === "" ? 0 : e.target.value)
                )
              }
              className="text-right"
              label="Send Ethers to Contract"
              type="number"
            />
            <button
              className="px-4 py-2 rounded-md bg-teal-500 active:bg-teal-600 text-white font-bold shadow-md"
              onClick={() => sendEthers()}
            >
              Send
            </button>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
