const AmountInput = ({ amount, setAmount }) => {
  return (
    <input
      type="number"
      placeholder="Enter Amount"
      className="w-full mb-4 p-3 rounded-md text-black"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  );
};

export default AmountInput;
