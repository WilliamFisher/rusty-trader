import "./App.css";
import React from "react";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Server from "./pages/Server";
import AddItem from "./pages/AddItem";
import MyNavbar from "./components/MyNavbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Container>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/server/:id" exact>
            <Server />
          </Route>

          <Route path="/server/:id/new" exact>
            <AddItem />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
