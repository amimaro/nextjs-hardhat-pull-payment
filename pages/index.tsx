import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { AppContext } from "../contexts/AppContext";
import { formatEther } from "../utils/helpers";

const Home: NextPage = () => {
  const {
    account,
    network,
    balance,
    signer,
    contract,
    isConnected,
    connectToMetamask,
    disconnect,
    updateBalance,
  } = useContext(AppContext);
  const [contractBalance, setContractBalance] = useState<BigNumber | null>(
    null
  );

  useEffect(() => {
    getMyContractBalance();
  }, []);

  const getMyContractBalance = async () => {
    const balanceBN = await contract?.payments(account);
    setContractBalance(balanceBN);
  };

  return (
    <div className="p-4">
      <AppHeader
        account={account + ""}
        isConnected={isConnected}
        disconnect={disconnect}
        connectToMetamask={connectToMetamask}
      />
      <div className="mt-20">
        <div>
          {balance && (
            <table className="text-xl font-bold">
              <tbody>
                {balance && (
                  <tr>
                    <td>
                      <h2>Your Balance: </h2>
                    </td>
                    <td></td>
                    <td>
                      <h2>{formatEther(balance)} ETH</h2>
                    </td>
                  </tr>
                )}
                {contractBalance && (
                  <tr>
                    <td>
                      <h2> Your Contract Balance: </h2>
                    </td>
                    <td></td>
                    <td>
                      <h2>{formatEther(contractBalance as BigNumber)} ETH</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
