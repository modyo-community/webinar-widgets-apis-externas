import React, { useState, useEffect } from 'react';

function CurrencyValue() {
  const [selectedCurrency, setSelectedCurrency] = useState('bitcoin');
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin
   
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCurrency}`)
      .then(response => response.json())
      .then(data => setCurrencyData(data[0]));
  }, [selectedCurrency]);

  const handleCurrencyChange = event => {
    setSelectedCurrency(event.target.value);
  };


  if (!currencyData) {
    return <div>Loading...</div>;
  }

  const { name, image, current_price } = currencyData;

  return (
    <div id="component-api" className='col-md-12'>
      <h2>{name}</h2>
      <img src={image} alt={`${name} logo`} />
      <p>Current value: ${current_price}</p>
      <label htmlFor="currency-select">Select a currency:</label>
      <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="cardano">Cardano</option>
        <option value="dogecoin">Dogecoin</option>
      </select>

    </div>
  );
}

export default CurrencyValue;
