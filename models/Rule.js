// backend/models/Rule.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleString: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rule', ruleSchema);
