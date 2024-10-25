// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ruleEngine', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Basic route
app.get('/', (req, res) => {
    res.send('Rule Engine API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// backend/server.js (continued)

// Import Rule model
const Rule = require('./models/Rule');

// Create Rule Endpoint
app.post('/create_rule', async (req, res) => {
    const ruleString = req.body.rule_string;
    const newRule = new Rule({ ruleString });
    await newRule.save();
    res.json(newRule);
});

// Combine Rules Endpoint (for demonstration)
app.post('/combine_rules', async (req, res) => {
    const rules = req.body.rules; // Assuming rules are passed as an array
    // Simplified example of combining rules (implement your AST logic)
    const combinedRule = rules.join(' OR '); // Example of combining with OR
    res.json({ combined: combinedRule });
});

// Evaluate Rule Endpoint
app.post('/evaluate_rule', (req, res) => {
    const data = req.body.data;
    // Simplified evaluation logic; implement your actual AST evaluation
    const eligible = data.age > 30; // Example condition
    res.json({ eligible });
});
// backend/server.js (continued)
const { createAST, evaluateAST } = require('./utils/ast');

// Evaluate Rule Endpoint
app.post('/evaluate_rule', (req, res) => {
    const { ruleString, data } = req.body;
    const ast = createAST(ruleString);
    const eligible = evaluateAST(ast, data);
    res.json({ eligible });
});
