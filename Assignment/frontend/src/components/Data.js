import React, { useState, useEffect } from "react";
import classes from "./data.module.css";

const Data = ({ symbol, interval}) => {
  const [marketData, setMarketData] = useState(null);
  const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to Binance WebSocket");
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Market data:", data);
      setMarketData(data);
      updateLocalStorage(symbol, data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  const updateLocalStorage = (symbol, newData) => {
    const key = `marketData_${symbol}`;
    let existingData = JSON.parse(localStorage.getItem(key)) || [];
    existingData.push(newData);
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  return (
    <div>
      <h2>
        Binance Market Data ({symbol.slice(0, -4).toUpperCase()}/
        {symbol.slice(-4).toUpperCase()} - {interval})
      </h2>
      {marketData ? (
        <div className={classes.order}>
          <p>Open: {marketData.k.o}</p>
          <p>Close: {marketData.k.c}</p>
          <p>High: {marketData.k.h}</p>
          <p>Low: {marketData.k.l}</p>
          <p>Volume: {marketData.k.v}</p>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default Data;
