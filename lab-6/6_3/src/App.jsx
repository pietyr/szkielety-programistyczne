import { useState } from "react";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(0);

  const handleChange = (event) => {
    setTemperature(event.target.value);
  };

  const tempNum = parseFloat(temperature);
  let stateMatter = "";

  if (!isNaN(tempNum)) {
    if (tempNum <= 0) {
      stateMatter = "stały";
    } else if (tempNum >= 100) {
      stateMatter = "gazowy";
    } else {
      stateMatter = "ciekły";
    }
  }

  return (
    <div className="temperature">
      <label>
        Temperatura:&nbsp;
        <input
          type="text"
          onChange={handleChange}
          value={temperature}
          placeholder="Wprowadź temperaturę wody"
        />
        &nbsp;°C
      </label>
      <div className={stateMatter}>
        <p>
          W temperaturze {temperature} °C woda jest w stanie
          <span> {stateMatter}m.</span>
        </p>
      </div>
    </div>
  );
}

export default App;
