import { ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { AppInput } from "../components/AppInput";
import { AppTransactions } from "../components/AppTransactions";
import { AppBalance } from "../components/AppBalance";
import useWalletConnect from "../hooks/useWalletConnect";

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

  if (network !== 4 && network !== null) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl font-bold text-center sm:text-left w-full">
          Please, select Rinkeby testnet to get started.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-4 h-full">
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
          <AppBalance balance={balance} contractBalance={contractBalance} />
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
          <AppTransactions transactions={transactions} />
        </div>
      </div>
      <div className="text-center" style={{ position: "sticky", top: "100vh" }}>
        Contract address:{" "}
        <a
          href={`https://rinkeby.etherscan.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 font-bold"
        >
          {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.substring(0, 5)}...
          {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.substring(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.length - 4
          )}
        </a>
      </div>
    </div>
  );
};

export default Home;
