import type { NextPage } from "next";
import { useContext } from "react";
import { AppHeader } from "../components/AppHeader";
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
    <div>
      <AppHeader
        account={account + ""}
        isConnected={isConnected}
        disconnect={disconnect}
        connectToMetamask={connectToMetamask}
      />
    </div>
  );
};

export default Home;
