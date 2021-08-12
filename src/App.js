import "./App.css";
import React from "react";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <>
      <MyNavbar />
      <Container>
        <Home />
      </Container>
    </>
  );
}

export default App;
