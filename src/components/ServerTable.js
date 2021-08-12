import React from "react";
import { Table } from "react-bootstrap";

function ServerTable(props) {
  const servers = props.servers;

  console.log(`ServerList Servers: ${JSON.stringify(servers)}`);

  const listItems = servers.slice(0, 10).map((server) => (
    <tr>
      <td>
        <a href="/home">{server.name}</a>
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
