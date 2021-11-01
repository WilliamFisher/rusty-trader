import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function Server() {
  const { id } = useParams();
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  const [trades, setTrades] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const serverName = params.get("name");

  useEffect(() => {
    async function fetchTrades() {
      const response = await fetch(`http://localhost:5000/trade/server/${id}`);

      if (!response.ok) {
        setErrorMessage("An error occured fetching trades");
        const errorMessage = `An error occured trying to get a list of trades: ${response.status}`;
        throw new Error(errorMessage);
      }

      try {
        const trades = await response.json();
        setTrades(trades);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTrades().catch((error) =>
      setErrorMessage(`Error could not fetch trades: ${error}`)
    );
  }, [id]);

  const tradeList =
    trades.length > 0 ? (
      trades.map((trade) => (
        <li key={trade.id}>
          Selling {trade.sellItem.quanity} {trade.sellItem.name} for{" "}
          {trade.buyItem.quanity} {trade.buyItem.name}
        </li>
      ))
    ) : (
      <li>There are no trades yet for this server.</li>
    );

  return (
    <div className="bg-light p-3 rounded">
      <h1>{serverName}</h1>
      <p>{errorMessage}</p>
      <p>
        <Button
          onClick={() => {
            history.push(`/server/${id}/new`);
          }}
          variant="primary"
        >
          Create Trade
        </Button>
      </p>

      <div>
        <ul>{tradeList}</ul>
      </div>
    </div>
  );
}

export default Server;
