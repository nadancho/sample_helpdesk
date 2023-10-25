import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";

export default function Respond(props) {
  /**
   * This component handles the response interaction with the server.
   */
  const [form, setForm] = useState({
    subject: '',
    email: '',
    date: '',
    description: '',
    response: '',
    status: '',
    history: [],

  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://sample-helpdesk-nadanchos-projects.vercel.app/ticket/${props.id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${props.id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [props.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const updatedTicket = {
      subject: form.subject,
      email: form.email,
      date: form.date,
      description: form.description,
      response: form.response,
      status: form.status,
    };

    // This will send a post request to update the data in the database.
    const response = await fetch(`https://sample-helpdesk-nadanchos-projects.vercel.app/ticket/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTicket),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      alert('The response was successfully submitted!'); //System alert success

      console.log( //Demo: outputs console log of email information that would send.
        `
      Drafting Email in Console for DEMO purposes:

          Email: ${updatedTicket.email}
          Subject: HelpDesk - Re:${updatedTicket.subject}
          Email Body:

          Hello, we are contacting you regarding a
           helpdesk ticket you submitted.

            Submission Date: ${updatedTicket.date}
            Here is the information regarding your ticket:
            ${updatedTicket.description}

            HelpDesk response:
            ${updatedTicket.response}

            Your ticket status has been set to: ${updatedTicket.status}

            Please create a new ticket if you 
             require further assistance.

            Best regards,
            HelpDesk Team


        `

      );

      props.changeResponded(!props.responded); //Triggering state change to re-render changed status

    }
    //When response is not okay
    else {
      alert('There was an error with updating the response'); //System alert error
    }


  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <Container>
      <h4>Respond to Ticket</h4>
      <div>
        Ticket Information:
        <br />
        Subject: {form.subject}
        <br />
        email: {form.email}
        <br />
        Description: {form.description}
        <br />
        Current Response: {form.response}

      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="description">Enter response here:</label>
          <textarea
            type="text"
            className="form-control"
            id="response"
            value={form.response}
            onChange={(e) => updateForm({ response: e.target.value })}
          ></textarea>
        </div>

        <select onChange={(e) => updateForm({ status: e.target.value })}>
          <option>Set Status:</option>

          <option
            value="In-Progress"
            id="selectInProgress"
          >In-Progress</option>

          <option
            value="Resolved"
            id="selectResolved"
          >Resolved</option>
        </select>

        <p></p>

        <div className="form-group">
          <input
            type="submit"
            value="Submit Response"
            className="btn btn-primary"
          />
        </div>

      </form>
    </Container>
  );
}
