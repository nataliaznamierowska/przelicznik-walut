import React, { useState } from "react";
import Result from "./Result";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [result, setResult] = useState(null);

  const convertCurrency = () => {
    if (isNaN(amount) || amount < 0.01) {
      setResult("Wprowadź poprawną kwotę (min. 0.01).");
      return;
    }

    const url =
      "https://api.nbp.pl/api/exchangerates/rates/A/" +
      currency +
      "/?format=json";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = data?.rates?.[0]?.mid;

        if (exchangeRate) {
          const resultValue = (amount * exchangeRate).toFixed(2);
          setResult(resultValue + " PLN");
        } else {
          setResult("Nie udało się pobrać kursu waluty.");
        }
      })
      .catch((error) => {
        console.log(error);
        setResult("Wystąpił błąd przy pobieraniu kursu waluty.");
      });
  };

  return (
    <main className="container">
      <input
        type="number"
        id="amount"
        placeholder="Amount"
        step="0.01"
        min="0"
        className="input-field"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        id="currency"
        className="select-field"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
      </select>
      <button
        id="convertBtn"
        className="convert-button"
        onClick={convertCurrency}
      >
        Convert
      </button>
      <Result resultValue={result} />
    </main>
  );
}

export default CurrencyConverter;
