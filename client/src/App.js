import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./components/css/styles.css";

import { Route, Routes } from "react-router-dom";

import TopBar from "./components/topbar";
import Login from "./components/login";
import TicketList from "./components/ticketList";
import Dashboard from "./components/dashboard";
import Create from "./components/create";
import Respond from "./components/respond"
import { useState } from "react";
import Lookup from "./components/lookup";

const App = () => {

  //isAdmin state only for demo to verify whether admin is logged in or not.
  const [isAdmin, setAdmin] = useState(false);

  function logout(){
    setAdmin(false);
  }
  function login(){
    setAdmin(true);
  }

  return (
    <div className="fontStyle">
      <TopBar isAdmin={isAdmin} logout={logout} />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/respond/:id" element={<Respond />} />
        <Route path="/create" element={<Create />} />
        <Route path="/ticketList" element={<TicketList/>} />
        <Route path="/response" element={<TicketList/>} />
        <Route path="/lookup" element={<Lookup/>} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
