import React, { useState } from "react";
import { useNavigate } from "react-router";
import Container from 'react-bootstrap/Container';

export default function Create() {
  const navigate = useNavigate();
  //create new Date value for current date.
  const date = new Date();
  const defaultValue = new Date(date).toISOString().split('T')[0]

  //State for ticket form
  const [form, setForm] = useState({
    subject: '',
    email: '',
    date: defaultValue,
    description: '',
  });

  //These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    //create new ticket object spread form data
    const newTicket = {
      ...form,
    };

    await fetch("https://sample-helpdesk-nadanchos-projects.vercel.app/ticket/createTicket", { //async request to server
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({
      subject: '',
      email: '',
      date: defaultValue,
      description: '',
    });

    alert("Ticket created successfully!");
    navigate("/"); //navigates to home page
  }

  // This following section will display the form that takes the input from the user.
  return (
    <Container className="create-component">
      <h3 style={{textAlign: 'center'}}>Create a new ticket!</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={form.subject}
            onChange={(e) => updateForm({ subject: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>


        <div className="form-group">
          <input
            type="submit"
            value="Create ticket"
            className="btn btn-primary"
          />
        </div>
      </form>
    </Container>
  );
}
