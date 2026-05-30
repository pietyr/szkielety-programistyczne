import { useState } from "react";
import "./App.css";
function App() {
  const [result, setResult] = useState(null);
  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [operation, setOperation] = useState("Wynik");

  const calculate = (e) => {
    const op = e.target.innerHTML.trim();
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult("Błędne dane");
      setOperation("Wynik");
      return;
    }

    let res;
    let opName;

    switch (op) {
      case "+":
        opName = "Suma";
        res = num1 + num2;
        break;
      case "-":
        opName = "Różnica";
        res = num1 - num2;
        break;
      case "*":
        opName = "Iloczyn";
        res = num1 * num2;
        break;
      case "/":
        opName = "Iloraz";
        if (num2 === 0) {
          setResult("Dzielenie przez 0");
          setOperation(opName);
          return;
        }
        res = num1 / num2;
        break;
      default:
        return;
    }

    setResult(res.toFixed(2));
    setOperation(opName);
  };
  const firstInput = (e) => {
    let value1 = e.target.value;
    setInput1(value1);
  };
  const secondInput = (e) => {
    let value2 = e.target.value;
    setInput2(value2);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Kalkulator czterodziałaniowy</h1>
        <div>
          <span>
            <input
              type="number"
              onChange={firstInput}
              style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
            />
          </span>
          <span>
            <input
              type="number"
              onChange={secondInput}
              style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
            />
          </span>
        </div>
        <div style={{ margin: "2rem" }}>
          <button
            onClick={calculate}
            style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}
          >
            +
          </button>
          <button
            onClick={calculate}
            style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}
          >
            -
          </button>
          <button
            onClick={calculate}
            style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}
          >
            *
          </button>
          <button
            onClick={calculate}
            style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}
          >
            /
          </button>
        </div>
        <h4>
          {operation}: {result}
        </h4>
      </div>
    </div>
  );
}
export default App;
