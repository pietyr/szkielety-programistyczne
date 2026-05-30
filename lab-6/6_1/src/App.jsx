import "./Card.css";
import Card from "./Card.jsx";

function App() {
  return (
    <div>
      <h1>Słynni informatycy</h1>
      <Card
        name="Alan Turing"
        imgSrc="https://mdz.cs.pollub.pl/ai/alan_turing.jpg"
        years="1912 - 1954"
        profession="Matematyk"
        country="Anglia"
      />
      <Card
        name="Niklaus Wirth"
        imgSrc="https://mdz.cs.pollub.pl/ai/nicolas_wirth.jpg"
        years="1934 - ?"
        profession="Elektronik i informatyk"
        country="Szwajcaria"
      />
      <Card
        name="Dennis Ritchie"
        imgSrc="https://mdz.cs.pollub.pl/ai/dennis_ritchie.jpg"
        years="1941 - 2011"
        profession="Matematyk, fizyk, informatyk"
        country="USA"
      />
      <Card
        name="Bjarne Stroustrup"
        imgSrc="https://mdz.cs.pollub.pl/ai/bjarne_stroustrup.jpg"
        years="1950 - ?"
        profession="Informatyk"
        country="Dania"
      />
    </div>
  );
}

export default App;
