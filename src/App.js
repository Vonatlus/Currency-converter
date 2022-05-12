import { useEffect, useState } from 'react';
import './App.css';
import { CurrencyConverter } from './components/CurrencyConverter';

const BASE_URL = 'https://api.fastforex.io//fetch-multi?from=UAH&to=EUR,USD,UAH&api_key=8dca1ac5e5-86f2968c05-ra5mi2';

function App() {
  const [value1, setValue1] = useState();
  const [currency1, setCurrency1] = useState('UAH');

  const [value2, setValue2] = useState();
  const [currency2, setCurrency2] = useState('USD');

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => { setResults(data.results) })
      .catch(error => { console.log(error) });
  }, []);

  useEffect(() => {
    if (!!results) {
      toChangeValue1(1)
    }
  }, [results]);

  function toChangeValue1(value1) {
    setValue2(value1 * results[currency2] / results[currency1]);
    setValue1(value1);
  }

  function toChangeCurrency1(currency1) {
    setValue2(value1 * results[currency2] / results[currency1]);
    setCurrency1(currency1);
  }

  function toChangeValue2(value2) {
    setValue1(value2 * results[currency1] / results[currency2]);
    setValue2(value2);
  }

  function toChangeCurrency2(currency2) {
    setValue1(value2 * results[currency1] / results[currency2]);
    setCurrency2(currency2);
  }

  return (
    <div className="App box box-size">
      <h2 className="title is-2">Currency converter</h2>

      <CurrencyConverter
        curriencies={Object.keys(results)}
        value={value1}
        currency={currency1}
        onValueChange={toChangeValue1}
        onCurrnencyChange={toChangeCurrency1}
      />

      <CurrencyConverter
        curriencies={Object.keys(results)}
        value={value2}
        currency={currency2}
        onValueChange={toChangeValue2}
        onCurrnencyChange={toChangeCurrency2}
      />
    </div>
  );
}

export default App;
