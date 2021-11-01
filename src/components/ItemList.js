import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";

function ItemList(props) {
  const items = props.items;

  const listItems = items ? (
    items.map((item) => (
      <tr key={item.name} className="item-icon">
        <td>
          <img alt={item.name} src={item.src} height={50} />
        </td>
        <td>{item.name}</td>
        <td>
          <ButtonGroup>
            <Button
              onClick={() => {
                props.onBuyItem({ name: item.name, src: item.src });
              }}
              variant="primary"
              size="sm"
            >
              Buy
            </Button>
            <Button
              onClick={() => {
                props.onSellItem({ name: item.name, src: item.src });
              }}
              variant="success"
              size="sm"
            >
              Sell
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td>No Items Found</td>
    </tr>
  );

  return (
    <Table>
      <tbody>{listItems}</tbody>
    </Table>
  );
}

export default ItemList;
