import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";

function Calculator() {
  const [value, setValue] = useState('0');
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
    setOpValue(null);
    setNewValue(String(temp));
    setValue(null);
  };

  const handleNum = (number) => {
    setNewValue(newValue === "0" ? String(number) : newValue + number);
  };

  const percentage = () => {
    setNewValue(parseFloat(newValue) / 100);
    if (value && newValue === "") {
      setValue(parseFloat(value) / 100);
    }
  };
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
      else if (value === "%") {
      percentage();
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">{newValue} </div>
      </div>
      <div className="calculator-keypad">
       
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
          <CalculatorKey keyValue={7} onClick={handleOperation} /> <br></br>
          <CalculatorKey keyValue={6} onClick={handleOperation} />
          <CalculatorKey keyValue={5} onClick={handleOperation} />
          <CalculatorKey keyValue={4} onClick={handleOperation} /> <br></br>
          <CalculatorKey keyValue={3} onClick={handleOperation} />
          <CalculatorKey keyValue={2} onClick={handleOperation} />
          <CalculatorKey keyValue={1} onClick={handleOperation} /> <br></br>
          </div>
         
        <div className="keys-function">
          <CalculatorKey keyValue={0} onClick={handleOperation} />
          <CalculatorKey keyValue={"c"} onClick={handleOperation} />
          <CalculatorKey keyValue={"%"} onClick={handleOperation} />
       </div>
      </div>
    </div>
  );
}

export default Calculator;