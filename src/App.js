import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import Flights from "./components/Flights";
import styled from "styled-components";
import { flights } from "./fares";

function App() {
  return <Form flights={flights} />;
}
const ProductWrapper = styled.div`
  margin: 20px;
  text-align: center;
`;
const SpanRight = styled.span`
  float: right;
`;

export default App;
