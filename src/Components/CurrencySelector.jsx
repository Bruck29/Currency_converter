const CurrencySelector = ({
  currencies,
  setCurrencyFrom,
  setCurrencyTo,
  dateSelector,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <>
      <select
        className="w-full mb-4 p-3 rounded-md text-black"
        onChange={(e) => setCurrencyFrom(e.target.value)}
      >
        <option>From</option>
        {currencies.map((currency) => (
          <option key={currency[0]} value={currency[0]}>
            {currency[1]}
          </option>
        ))}
      </select>
      <select
        className="w-full mb-4 p-3 rounded-md text-black"
        onChange={(e) => setCurrencyTo(e.target.value)}
      >
        <option>To</option>
        {currencies.map((currency) => (
          <option key={currency[0]} value={currency[0]}>
            {currency[1]}
          </option>
        ))}
      </select>
      {dateSelector && (
        <input
          type="date"
          className="w-full mb-4 p-3 rounded-md text-black"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
        />
      )}
    </>
  );
};

export default CurrencySelector;
