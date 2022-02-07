export const AppHeader: React.FC<{
  account: string;
  isConnected: () => boolean;
  disconnect: () => void;
  connectToMetamask: any;
}> = ({ account, isConnected, disconnect, connectToMetamask }) => {
  return (
    <div className="flex p-4">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold">
          NextJS+Hardhat PullPayment Example
        </h1>
      </div>
      <div className="flex-shrink">
        {isConnected() && (
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">
              0x...{account?.substring(account.length - 4)}
            </h2>
            <button
              className="px-4 py-2 rounded-md bg-gray-500 text-white font-bold"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        )}
        {!isConnected() && (
          <button
            className="px-4 py-2 rounded-md bg-orange-500 text-white font-bold"
            onClick={() => connectToMetamask()}
          >
            Connect to metamask
          </button>
        )}
      </div>
    </div>
  );
};
