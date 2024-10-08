const ConversionResult = ({ amount, exchangeRate, handleConvert }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl my-6">Exchange Rate</p>
      <div className="text-6xl font-bold">
        {amount > 0 ? (exchangeRate * amount).toFixed(2) : "0.00"}
      </div>
      <button
        className="mt-6 p-4 bg-gray-200 rounded-md text-blue-900 hover:bg-gray-300"
        onClick={handleConvert}
      >
        Convert
      </button>
    </div>
  );
};

export default ConversionResult;
