import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

import ItemList from "../components/ItemList";

function AddItem() {
  let { id } = useParams();
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState();
  const [items, setItems] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [errorOnFetch, setErrorOnFetch] = useState(false);

  const [buyAmount, setBuyAmount] = useState(1);
  const [sellAmount, setSellAmount] = useState(1);

  const [buyItem, setBuyItem] = useState();
  const [sellItem, setSellItem] = useState();

  async function fetchItemList() {
    const response = await fetch(
      "https://gist.githubusercontent.com/WilliamFisher/2bc0fda4b49f50e613f8b210c58153d2/raw/46a13b67194ec0ddb6526d77d2486928a8b36fd4/rust_itemsv2.json"
    );

    if (!response.ok) {
      const errorMessage = `An error occured trying to get a list of servers: ${response.status}`;
      throw new Error(errorMessage);
    }

    try {
      const items = await response.json();
      setItems(items);
    } catch (err) {
      console.error(err);
    }
  }

  async function postTrade() {
    const postBody = {
      serverId: parseInt(id),
      buyItem: { name: buyItem.name, quantity: buyAmount },
      sellItem: { name: sellItem.name, quantity: sellAmount },
      author: "DaytimePanther6",
      platform: 0,
    };

    const response = await fetch("http://localhost:5000/trade", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(postBody),
    });

    if (response.ok) {
      history.push(`/server/${id}`);
    }
  }

  useEffect(() => {
    fetchItemList().catch((error) => setErrorOnFetch(true));
  }, []);

  function filterItems(e) {
    e.preventDefault();

    if (items === undefined) return;

    if (query.length < 1) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    const lowercaseQuery = query.toLowerCase();
    const filtered = items.filter((item) => {
      return item.name.toLowerCase().includes(lowercaseQuery);
    });

    setFilteredItems(filtered);
  }

  function sellItemButton(item) {
    setSellItem(item);
  }

  function buyItemButton(item) {
    setBuyItem(item);
  }

  return (
    <div className="bg-light p-3 rounded">
      <h1>Add New Trade</h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
          {showAlert && (
            <Alert variant={"warning"}>
              You need to enter something to search for an item.
            </Alert>
          )}

          {errorOnFetch && (
            <Alert variant={"danger"}>
              There was an error trying to get a list of items. Check your
              connection and refresh the page.
            </Alert>
          )}

          <Form onSubmit={filterItems}>
            <InputGroup className="m-3 p-2">
              <FormControl
                disabled={errorOnFetch}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an item"
              />
              <Button
                disabled={errorOnFetch}
                onClick={filterItems}
                variant="primary"
              >
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={3} className="justify-content-center">
          <div className="item-trade-box">
            {sellItem ? (
              <img
                id="sell_img"
                alt="item to sell"
                height="80"
                src={sellItem.src}
              />
            ) : (
              <div className="placeholder"></div>
            )}
            {buyItem ? (
              <img
                id="buy_img"
                alt="item to buy"
                height="80"
                src={buyItem.src}
              />
            ) : (
              <div className="placeholder"></div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <input
              onChange={(e) => setBuyAmount(e.target.value)}
              type="number"
              value={buyAmount}
              min="1"
              max="999"
            />
            <input
              onChange={(e) => setSellAmount(e.target.value)}
              type="number"
              value={sellAmount}
              min="1"
              max="999"
            />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md={3}>
          <div className="d-flex justify-content-center m-2">
            <Button variant="primary" onClick={() => postTrade()}>
              Submit Trade
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col>
          <ItemList
            items={filteredItems}
            onBuyItem={buyItemButton}
            onSellItem={sellItemButton}
          />
        </Col>
      </Row>
    </div>
  );
}

export default AddItem;
