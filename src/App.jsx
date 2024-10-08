import React, { useState, useEffect } from "react";
import ConversionResult from "./components/ConversionResult";
import CurrencySelector from "./components/CurrencySelector";
import AmountInput from "./components/AmountInput";
import { Line } from "react-chartjs-2"; // Import Line chart from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MainBG from "./assets/bg.png";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [dates, setDates] = useState([]);

  const [historyCurrencyFrom, setHistoryCurrencyFrom] = useState("");
  const [historyCurrencyTo, setHistoryCurrencyTo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const apiKey = "a379fcf46c439bcfb8c351ff";

  // Fetch available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.result === "success") {
          setCurrencies(data.supported_codes);
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, [apiKey]);

  // Fetch historical data
  const fetchHistoricalData = async (baseCurrency, year, month, day) => {
    console.log("FETCH HISTORICAL DATA");

    // Construct the URL as per the documentation
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${baseCurrency}/${year}/${month}/${day}`;
    console.log("URL: ", url);

    try {
      const response = await fetch(url);

      console.log("RESPONSE : ", response);

      const data = await response.json();
      console.log("fetchHistoricalData: ", data);

      if (data.result === "success") {
        console.log(
          `Historical rates for ${baseCurrency} on ${year}-${month}-${day}:`,
          data.conversion_rates
        );
      } else {
        console.error("Error in response: ", data);
      }
    } catch (error) {
      console.log("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    if ((selectedDate, historyCurrencyFrom, historyCurrencyTo)) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      fetchHistoricalData(historyCurrencyFrom, year, month, day);
    }
  }, [selectedDate, historyCurrencyFrom, historyCurrencyTo]);

  // Handle conversion logic
  const handleConvert = async () => {
    console.log("CONVERT");
    if (!currencyFrom || !currencyTo || amount <= 0) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currencyFrom}/${currencyTo}`;
      const apiResponse = await fetch(url);
      const data = await apiResponse.json();

      console.log("handleConvert : ", data);
      if (data.result === "success") {
        setExchangeRate(data.conversion_rate);
      } else {
        console.error("Error fetching exchange rate:", data.error);
      }
    } catch (e) {
      console.error("Error converting:", e);
    }

    await fetchHistoricalData();
  };

  // Chart data
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${currencyFrom} to ${currencyTo} (Last 30 Days)`,
        data: historicalData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left side: Currency Converter */}
      <div className="w-1/2 bg-blue-900 text-white flex flex-col items-center justify-center p-8">
        <img src={MainBG} className="absolute w-1/2 z-0" />
        <div className="z-10  flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8">Currency</h1>
          <div className="w-3/4">
            <AmountInput amount={amount} setAmount={setAmount} />
            <CurrencySelector
              currencies={currencies}
              setCurrencyFrom={setCurrencyFrom}
              setCurrencyTo={setCurrencyTo}
            />
            <ConversionResult
              amount={amount}
              exchangeRate={exchangeRate}
              handleConvert={handleConvert}
            />
          </div>
        </div>
      </div>

      {/* Right side: Exchange Information */}
      <div className="w-1/2 bg-pink-100 p-8">
        <h2 className="text-3xl font-bold mb-4">Historical Data</h2>
        <CurrencySelector
          currencies={currencies}
          setCurrencyFrom={setHistoryCurrencyFrom}
          setCurrencyTo={setHistoryCurrencyTo}
          dateSelector
        />
      </div>
    </div>
  );
};

export default App;
