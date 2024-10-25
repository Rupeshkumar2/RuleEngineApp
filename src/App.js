// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [ruleString, setRuleString] = useState('');
    const [data, setData] = useState({ age: 0, department: '', salary: 0, experience: 0 });
    const [result, setResult] = useState(null);

    const handleRuleSubmit = async () => {
        await axios.post('http://localhost:5000/create_rule', { rule_string: ruleString });
        setRuleString('');
    };

    const handleEvaluate = async () => {
        const res = await axios.post('http://localhost:5000/evaluate_rule', { ruleString, data });
        setResult(res.data.eligible);
    };

    return (
        <div className="container">
            <h1>Rule Engine</h1>
            <input 
                type="text" 
                value={ruleString} 
                onChange={(e) => setRuleString(e.target.value)} 
                placeholder="Enter rule string (e.g., age > 30 AND department = 'Sales')" 
            />
            <button onClick={handleRuleSubmit}>Submit Rule</button>

            <h2>Evaluate Rule</h2>
            <input 
                type="number" 
                onChange={(e) => setData({ ...data, age: e.target.value })} 
                placeholder="Enter age" 
            />
            <input 
                type="text" 
                onChange={(e) => setData({ ...data, department: e.target.value })} 
                placeholder="Enter department" 
            />
            <input 
                type="number" 
                onChange={(e) => setData({ ...data, salary: e.target.value })} 
                placeholder="Enter salary" 
            />
            <input 
                type="number" 
                onChange={(e) => setData({ ...data, experience: e.target.value })} 
                placeholder="Enter experience" 
            />
            <button onClick={handleEvaluate}>Evaluate</button>
            {result !== null && <h3 className="result">{result ? 'Eligible' : 'Not Eligible'}</h3>}
        </div>
    );
}

export default App;
