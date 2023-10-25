import React, { useState } from "react";
import Container from "react-bootstrap/Container"

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
                {!expanded && <td className="more-text">
                    <div>Show..</div>
                </td>}
                {expanded && <td className="more-text">
                    <div>Less..</div>
                </td>}
            </tr>

            {expanded &&
                <tr>
                    <td colSpan={4}>
                        <div>

                            Email: {props.ticket.email}
                            <br />
                            Description: {props.ticket.description}
                            <br />
                            Response: {props.ticket.response ? props.ticket.response : 'Awaiting Response'}

                        </div>
                        { props.ticket.response === "Pending Customer Response" &&
                            <div>
                                
                            </div>
                        }
                    </td>
                </tr>
            }
        </>
    );
};






export default function Lookup() {

    const [email, setEmail] = useState();
    const [tickets, setTickets] = useState();

    async function onSubmit(e) {
        e.preventDefault();

        if (email) {
            const response = await fetch(`http://localhost:5050/ticket/lookup/${email}`);

            const ticketsFromEmail = await response.json();
            setTickets(ticketsFromEmail);
        }
        else {
            alert('No email written');
        }

    }

    function updateEmail(value) {
        return setEmail(value);
    }

    function ticketList() {
        return tickets.map((ticket) => {
            return (
                <Ticket
                    ticket={ticket}
                />
            )
        })
    }

    return (
        <Container className="lookup-component">
            <h3 style={{textAlign: 'center'}}>Ticket Lookup</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Lookup Email"
                        className="btn btn-primary"
                    />
                </div>
            </form>

            {tickets &&
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{ticketList()}</tbody>
                </table>
            }
        </Container>
    );

}