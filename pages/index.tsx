import type { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Home: NextPage = () => {
  const {
    account,
    network,
    balance,
    isConnected,
    connectToMetamask,
    disconnect,
    updateBalance,
  } = useContext(AppContext);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {isConnected() && (
        <button
          className="px-4 py-2 rounded-md bg-gray-500 text-white font-bold"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      )}
      {!isConnected() && (
        <button
          className="px-4 py-2 rounded-md bg-orange-500 text-white font-bold"
          onClick={() => connectToMetamask()}
        >
          Connect to metamask
        </button>
      )}
      {isConnected() && (
        <div>
          <p>Account: {account ?? "null"}</p>
          <p>Network: {network}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
