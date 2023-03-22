import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";

function Calculator() {
  const [value, setValue] = useState(null);
  const [newValue, setNewValue] = useState("0");
  const [opValue, setOpValue] = useState(null);

  useEffect(() => {}, [opValue, newValue, value]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[opValue](
      parseFloat(value),
      parseFloat(newValue)
    );
    setOp(null);
    setNewValue(String(temp));
    setValue(null);
  };

  const handleNum = (number) => {
    setNewValue(newValue === "0" ? String(number) : newValue + number);
  };

  // const insertDot = () => {
  //   if (!/\./.test(newValue)) {
  //     setNewValue(newValue + ".");
  //   }
  // };
  // const percentage = () => {
  //   setNewValue(parseFloat(newValue) / 100);
  //   if (value && newValue === "") {
  //     setValue(parseFloat(value) / 100);
  //   }
  // };
  // const changeSign = () => {
  //   setNewValue(parseFloat(newValue) * -1);
  // };
  const clearData = () => {
    setNewValue("0");
    setValue(0);
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value));
    } else if (value in CalculatorOperations) {
      if (opValue === null) {
        setOpValue(value);
        setValue(newValue);
        setNewValue("");
      }
      if (opValue) {
        setOpValue(value);
      }
      if (value && opValue && newValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } 
    // else if (value === "\xB1") {
    //   changeSign();
    // } else if (value === ".") {
    //   insertDot();
    // } else if (value === "%") {
    //   percentage();
    // }
  };

  return (
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">{newValue} </div>
      </div>
      <div className="calculator-keypad">
        {/* <div className="keys-function">
          <CalculatorKey keyValue={"c"} onClick={handleOperation} />
          <CalculatorKey keyValue={"\xB1"} onClick={handleOperation} />
          <CalculatorKey keyValue={"%"} onClick={handleOperation} />
        </div> */}
        <div className="keys-operators">
          <CalculatorKey keyValue={"+"} onClick={handleOperation} />
          <CalculatorKey keyValue={"-"} onClick={handleOperation} />
          <CalculatorKey keyValue={"*"} onClick={handleOperation} />
          <CalculatorKey keyValue={"/"} onClick={handleOperation} />
          <CalculatorKey keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numbers">
          <CalculatorKey keyValue={9} onClick={handleOperation} />
          <CalculatorKey keyValue={8} onClick={handleOperation} />
          <CalculatorKey keyValue={7} onClick={handleOperation} />
          <CalculatorKey keyValue={6} onClick={handleOperation} />
          <CalculatorKey keyValue={5} onClick={handleOperation} />
          <CalculatorKey keyValue={4} onClick={handleOperation} />
          <CalculatorKey keyValue={3} onClick={handleOperation} />
          <CalculatorKey keyValue={2} onClick={handleOperation} />
          <CalculatorKey keyValue={1} onClick={handleOperation} />
          {/* <CalculatorKey
            className="key-dot"
            keyValue={"."}
            onClick={handleOperation}
          /> */}
          <CalculatorKey
            className="key-zero"
            keyValue={0}
            onClick={handleOperation}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;