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
import ServerTable from "../components/ServerTable";

function Home() {
  const [query, setQuery] = useState("");
  const [filteredServers, setFilteredServers] = useState();
  const [servers, setServers] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [errorOnFetch, setErrorOnFetch] = useState(false);

  async function fetchServers() {
    const response = await fetch("http://localhost:5000/server");

    if (!response.ok) {
      const errorMessage = `An error occured trying to get a list of servers: ${response.status}`;
      throw new Error(errorMessage);
    }

    const servers = await response.json();
    setServers(servers);
  }

  useEffect(() => {
    fetchServers().catch((error) => setErrorOnFetch(true));
  }, []);

  function filterServers(e) {
    e.preventDefault();

    // Servers will be undefined if fetch fails to pull in server list
    if (servers === undefined) return;

    if (query.length < 1) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    const lowercaseQuery = query.toLowerCase();
    const filtered = servers.servers.filter((server) => {
      return server.name.toLowerCase().includes(lowercaseQuery);
    });

    setFilteredServers(filtered);
  }

  return (
    <div className="bg-light p-3 rounded">
      <h1>Welcome to Rusty Trader</h1>
      <Row className="justify-content-sm-center">
        <Col md={6}>
          {showAlert && (
            <Alert variant={"warning"}>
              You need to enter something to search for a server.
            </Alert>
          )}

          {errorOnFetch && (
            <Alert variant={"danger"}>
              There was an error trying to get a list of servers. Check your
              connection and refresh the page.
            </Alert>
          )}

          <Form onSubmit={filterServers}>
            <InputGroup className="m-3 p-2">
              <FormControl
                disabled={errorOnFetch}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your server"
              />
              <Button
                disabled={errorOnFetch}
                onClick={filterServers}
                variant="primary"
              >
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        {filteredServers !== undefined && (
          <ServerTable servers={filteredServers} />
        )}
      </Row>
    </div>
  );
}

export default Home;
