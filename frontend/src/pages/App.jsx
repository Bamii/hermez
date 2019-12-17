import React, { Component, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import Host from "./Host.jsx";
import Settings from './Settings.jsx';
import Client from "./Client.jsx";
import Help from "./Help.jsx";
import Header from "../containers/Header.jsx";

const App = () => {
  const [path, setPath] = useState("");

  return (
    <BrowserRouter>
      {path !== "/" && <Header />}
      <Switch>
        <Route
          path="/client"
          render={props => {
            setPath("/client");
            return <Client />;
          }}
        />
        <Route
          path="/host"
          render={props => {
            setPath("/server");
            return <Host />
          }}
        />
        <Route
          path="/about"
          render={props => {
            setPath("/help");
            return <Help />;
          }}
        />
        <Route
          path="/settings"
          render={props => {
            setPath("/settings");
            return <Settings />;
          }}
        />
        <Route
          path="/"
          render={props => {
            setPath("/");
            return <Home />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
