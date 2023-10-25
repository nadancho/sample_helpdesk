const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    subject: { type: String, required: true},
    email: {type: String},
    date: { type: Date },
    description: { type: String},
    response: {type: String},
    status: {type: String},

  });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;