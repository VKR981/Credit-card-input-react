import React, { useState } from "react";

import "./App.css";
import CreditCardInput from "./components/CreditCardInput";

function App() {
  const [list, setList] = useState<string[]>([]);
  const handleSubmit = (item: string) => {
    console.log(item);

    setList((prevList) => [...prevList, item]);
  };

  const handleDelete  =  (item:  string)  =>  {
    setList((prevList) => prevList.filter((card)  =>  card  !==  item));
  };;
  return (
    <div className="App">
      <h6>Enter card number</h6>
      <CreditCardInput handleSubmit={handleSubmit} />
      <ul className="list">
        {list.map((item, idx) => (
          <li key={idx}>
            {item}
            <button onClick={() => handleDelete(item)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
