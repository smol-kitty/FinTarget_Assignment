import React, { useState } from "react";
import classes from "./mainPage.module.css";
import Data from "./Data";
import MarketChart from "./MarketChart";

export default function MainPage() {
  const curr = ["ethusdt", "bnbusdt", "dotusdt"];
  const minutes = ["1m", "3m", "5m"];
  const [symbol, setSymbol] = useState("ethusdt");
  const [min, setMin] = useState("1m");
  return (
    <>
      <div className={classes.buttons}>
        {curr.map((currency) => (
          <div
            key={currency}
            className={classes.button}
            onClick={() => setSymbol(currency)}
          >
            {currency.slice(0, -4).toUpperCase()}/
            {currency.slice(-4).toUpperCase()}
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        {minutes.map((interval) => (
          <div
            key={interval}
            className={classes.button}
            onClick={() => setMin(interval)}
          >
            {interval}
          </div>
        ))}
      </div>
      <Data symbol={symbol} interval={min} />
      <MarketChart symbol={symbol} />
    </>
  );
}
