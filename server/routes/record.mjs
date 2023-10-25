import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the tickets.
router.get("/filter/:filter", async (req, res) => {
  let collection = await db.collection("Tickets");
  let results;
  if (req.params.filter == "All") {
    results = await collection.find({}).sort({ "date": -1 }).toArray();
  } else{
    let query = { status: req.params.filter };
    results = await collection.find(query).sort( {"date": -1} ).toArray();
  }

  res.send(results).status(200);
});

//This section is for getting a list of tickets with a specific email
router.get("/lookup/:email", async (req, res) => {
  let collection = await db.collection("Tickets");
  let query = { email: req.params.email };
  let result = await collection.find(query).sort({ "date": -1 }).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you get a single ticket by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Tickets");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// This code is for creation of Tickets.
router.post("/createTicket", async (req, res) => {
  let newDocument = {
    subject: req.body.subject,
    email: req.body.email,
    date: req.body.date,
    description: req.body.description,
    response: req.body.response,
    status: 'New',
  };
  let collection = await db.collection("Tickets");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a ticket by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      subject: req.body.subject,
      email: req.body.email,
      date: req.body.date,
      description: req.body.description,
      response: req.body.response,
      status: req.body.status,
    }
  };

  let collection = await db.collection("Tickets");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a ticket
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Tickets");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router; 