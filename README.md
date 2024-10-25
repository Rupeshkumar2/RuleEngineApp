# Rule Engine with Abstract Syntax Tree (AST)

This project is a sophisticated rule engine application designed to dynamically determine user eligibility based on attributes such as age, department, income, and spending. The system employs an Abstract Syntax Tree (AST) for representing conditional rules, allowing for the dynamic creation, combination, and evaluation of these rules.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Design](#api-design)
- [Data Structure](#data-structure)
- [Test Cases](#test-cases)
- [Future Enhancements](#future-enhancements)

## Features
- **Dynamic Rule Creation**: Allows users to create rules using a simple string format that are converted into an AST.
- **Rule Combination**: Combines multiple rules efficiently into a single AST for evaluation.
- **User Data Evaluation**: Evaluates user attributes against combined rules to determine eligibility.
- **MongoDB Storage**: Stores rules and metadata in a scalable database.
- **Responsive UI**: Built using React.js for a smooth user experience.
- **Error Handling**: Implements error handling for invalid rule strings or data formats, ensuring robust input validation.
- **Modification of Existing Rules**: Allows users to modify existing rules, providing flexibility in rule management.

## Technologies Used
- **MongoDB**: A NoSQL database chosen for its flexibility and scalability. It allows us to store complex data structures like rules efficiently.
- **React.js**: A JavaScript library for building user interfaces, enabling a dynamic and responsive front end for the application.
- **Express.js**: A minimal web framework for Node.js that simplifies the process of setting up server-side logic and API endpoints.
- **Node.js**: A JavaScript runtime that allows server-side execution of JavaScript code, providing a platform for building scalable network applications.
- **Python**: Used for implementing the API functions that handle rule creation, combination, and evaluation.
- **JSON**: A lightweight data format for exchanging data between the client and server, facilitating easy data transmission.

![image](https://github.com/user-attachments/assets/a6985046-634e-4a04-8b3c-90eb85fa1071)

## Setup & Installation
### Clone the Repository:
```bash
git clone https://github.com/Rupeshkumar2/RuleEngineApp
cd Rule-Engine-AST
```

### Backend Setup (Node.js & Express):
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm init -y
   npm install axios
   npm install express mongoose body-parser cors
   ```
3. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup (React):
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install axios
   ```
3. Start the React application:
   ```bash
   npm start
   ```

### MongoDB Setup:
- Ensure you have MongoDB installed and running.
- Create a database for the rule engine and update the database connection string in the backend configuration.

## Usage
### Creating Rules:
Use the `/create_rule` API endpoint to submit rule strings and generate AST nodes.

```python
import requests

rule_string = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
response = requests.post("http://localhost:5000/create_rule", json={"rule_string": rule_string})
print(response.json())
```

### Combining Rules:
Send a list of rule strings to the `/combine_rules` endpoint to create a single AST.

```python
rules = [
    "((age > 30 AND department = 'Sales')) AND (salary > 20000 OR experience > 5)",
    "((age < 25 AND department = 'Marketing'))"
]
response = requests.post("http://localhost:5000/combine_rules", json={"rules": rules})
print(response.json())
```

### Evaluating Rules:
Evaluate the combined rule against user data using the `/evaluate_rule` endpoint.

```python
user_data = {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}
response = requests.post("http://localhost:5000/evaluate_rule", json={"data": user_data})
print(response.json())
```

## API Design
### Create Rule:
```python
@app.route('/create_rule', methods=['POST'])
def create_rule():
    rule_string = request.json['rule_string']
    validate_rule(rule_string)  # Validate the rule string
    ast = generate_ast(rule_string)  # Function to generate AST
    return jsonify(ast.to_dict())
```

### Combine Rules:
```python
@app.route('/combine_rules', methods=['POST'])
def combine_rules():
    rules = request.json['rules']
    combined_ast = combine_rules(rules)  # Function to combine ASTs
    return jsonify(combined_ast.to_dict())
```

### Evaluate Rule:
```python
@app.route('/evaluate_rule', methods=['POST'])
def evaluate_rule():
    data = request.json['data']
    result = evaluate(ast, data)  # Function to evaluate AST
    return jsonify({"eligible": result})
```

## Data Structure
To represent the AST, we define the following Node structure:
```python
class Node:
    def __init__(self, node_type, left=None, right=None, value=None):
        self.type = node_type  # "operator" or "operand"
        self.left = left  # Reference to the left child
        self.right = right  # Reference to the right child
        self.value = value  # Optional value for operand nodes

    def to_dict(self):
        return {
            "type": self.type,
            "left": self.left.to_dict() if self.left else None,
            "right": self.right.to_dict() if self.right else None,
            "value": self.value
        }
```

## Test Cases
1. **Creating Individual Rules**: Validate that rules can be created and their AST representation is correct.
2. **Combining Rules**: Ensure that the combined AST reflects the logic of the individual rules correctly.
3. **Evaluating Rules**: Use various scenarios with sample JSON data to test the `evaluate_rule` functionality.
4. **Error Handling**: Validate error handling for invalid rule strings and ensure proper error messages are returned.
5. **Modification of Rules**: Test functionalities that allow modification of existing rules.

## Future Enhancements
- **User Interface Improvements**: Enhance the UI to allow users to input rules visually.
- **Support for More Complex Conditions**: Expand the rule syntax to handle more intricate logic.
- **Integration with Other Data Sources**: Allow the rule engine to evaluate conditions against external data sources.
