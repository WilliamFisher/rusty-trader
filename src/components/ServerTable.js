import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ServerTable(props) {
  const servers = props.servers;

  const listItems = servers.slice(0, 10).map((server) => (
    <tr key={server.name}>
      <td>
        <Link to={`/server/${server.server_Id}?name=${server.name}`}>
          {server.name}
        </Link>
      </td>
      <td>{server.platform}</td>
      <td>{server.region}</td>
    </tr>
  ));

  return (
    <>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>Server Name</th>
            <th>Platform</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
    </>
  );
}

export default ServerTable;
