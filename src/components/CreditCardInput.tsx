import React, { useState } from "react";

function CreditCardInput({
  handleSubmit,
}: {
  handleSubmit: (item: string) => void;
}) {
  const [cardNumber, setCardNumber] = useState({
    0: { value: "" },
    1: { value: "" },
    2: { value: "" },
    3: { value: "" },
  });

  const handleInput = (e: any) => {
    const { value, id } = e.target;

    if (!value.match(/^[0-9]+$/) && value !== "") {
      console.log("c");

      return;
    }

    if (!value) {
      const nextBoxId = (parseInt(id) - 1) % 4;
      if (nextBoxId >= 0) {
        const ele = document.querySelector(
          `.credCardInput${nextBoxId}`
        ) as HTMLElement;

        ele.focus();
      }
    }

    if (value.toString().length > 5) {
      value
        .toString()
        .match(/.{1,4}/g)
        ?.forEach((digits: string, idx: number) => {
          setCardNumber((prevState) => ({
            ...prevState,
            [idx]: { value: digits },
          }));
        });
      return;
    }

    if (value.toString().length > 4) {
      const nextBoxId = (1 + parseInt(id)) % 4;
      const ele = document.querySelector(
        `.credCardInput${nextBoxId}`
      ) as HTMLElement;

      ele.focus();
      setCardNumber((prevState) => ({
        ...prevState,
        [nextBoxId]: { value: value.slice(4) },
      }));
    } else {
      setCardNumber((prevState) => ({ ...prevState, [id]: { value: value } }));
    }
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const card = Object.values(cardNumber).reduce(
      (prevValue, item, idx) => item.value + prevValue,
      ""
    );
    if (card.length === 16) {
      handleSubmit(card);

      setCardNumber({
        0: { value: "" },
        1: { value: "" },
        2: { value: "" },
        3: { value: "" },
      });
    }
  };
  return (
    <div>
      
      <form className="credCardForm" action="">
        <div>
            <input
              onChange={handleInput}
              id="0"
              value={cardNumber["0"].value}
              className="credCardInput0"
            ></input>
            <input
              onChange={handleInput}
              id="1"
              value={cardNumber["1"].value}
              className="credCardInput1"
            ></input>
            <input
              onChange={handleInput}
              id="2"
              value={cardNumber["2"].value}
              className="credCardInput2"
            ></input>
            <input
              onChange={handleInput}
              id="3"
              value={cardNumber["3"].value}
              className="credCardInput3"
            ></input>
        </div>
        <button onClick={handleFormSubmit}>submit</button>
      </form>
    </div>
  );
}

export default CreditCardInput;
