import React, { useEffect, useState } from "react";
import { Table, Collapse } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Respond from "./respond"

const Ticket = (props) => {

  const [expanded, setExpand] = useState(false);

  const expandCol = () => {
    setExpand(!expanded);
  }

  return (
    <>
      <tr onClick={expandCol}>
        <td>{props.ticket.subject}</td>
        <td>{props.ticket.date}</td>
        <td>{props.ticket.status}</td>
      </tr>
      {expanded &&
        <tr>
          <td colSpan={3}>
            <Respond
              id={props.ticket._id}
              responded={props.responded}
              changeResponded={props.changeResponded}>
            </Respond>
          </td>
        </tr>
      }
    </>
  );



};

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [responded, changeResponded] = useState(false);
  const [filter, setFilter] = useState('All');

  const updateFilter = (value) => {
    setFilter(value);
  }

  // This method fetches the tickets from the database.
  useEffect(() => {
    async function getTickets() {
      const response = await fetch(`http://localhost:5050/ticket/filter/${filter}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const tickets = await response.json();
      setTickets(tickets);
    }

    getTickets();

    return;
    //Executes whenever ticket length changes
  }, [tickets.length, responded, filter]);

  // This method will map out the tickets on the table
  function ticketList() {
    return tickets.map((ticket) => {
      return (
        <Ticket
          ticket={ticket}
          key={ticket._id}
          responded={responded}
          changeResponded={changeResponded}
        />
      );
    });
  }

  // This following section will display the table with the tickets of individuals.
  return (
    <Container className="ticketList-component">
      <h3 style={{ textAlign: 'center' }}>Ticket List</h3>
      Show:
      <select
        style={{margin: 4}}
        onChange={(e) => updateFilter(e.target.value)}>
        <option
          value="All"
          id="selectAll"
        >All</option>

        <option
          value="New"
          id="selectNew"
        >New</option>

        <option
          value="In-Progress"
          id="selectInProgress"
        >In-Progress</option>

        <option
          value="Resolved"
          id="selectResolved"
        >Resolved</option>
      </select>

      <Table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{ticketList()}</tbody>
      </Table>
    </Container>
  );
}
