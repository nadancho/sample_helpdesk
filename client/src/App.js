import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./components/css/styles.css";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import TopBar from "./components/topbar";
import Login from "./components/login";
import TicketList from "./components/ticketList";
import Dashboard from "./components/dashboard";
import Edit from "./components/edit";
import Create from "./components/create";
import Respond from "./components/respond"
import { useState } from "react";
import { useNavigate } from "react-router";
import Lookup from "./components/lookup";

const App = () => {

  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();

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
        <Route path="/edit/:id" element={<Edit />} />
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
