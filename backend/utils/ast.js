// backend/utils/ast.js
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // left child
        this.right = right; // right child
        this.value = value; // value for operand nodes
    }
}

// Function to create an AST from rule string
const createAST = (ruleString) => {
    // This is a simplified parser; you can enhance it to support more complex rules
    const tokens = ruleString.split(' ');
    const stack = [];

    tokens.forEach(token => {
        if (token === 'AND' || token === 'OR') {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(new Node('operator', left, right, token));
        } else if (token.includes('>') || token.includes('<') || token.includes('=')) {
            const [attribute, operator, value] = token.split(/(>|<|=)/);
            stack.push(new Node('operand', null, null, { attribute: attribute.trim(), operator, value: parseInt(value.trim(), 10) }));
        }
    });

    return stack[0]; // Return the root of the AST
};

// Function to evaluate AST against data
const evaluateAST = (node, data) => {
    if (node.type === 'operand') {
        switch (node.value.operator) {
            case '>':
                return data[node.value.attribute] > node.value.value;
            case '<':
                return data[node.value.attribute] < node.value.value;
            case '=':
                return data[node.value.attribute] === node.value.value;
            default:
                return false;
        }
    } else if (node.type === 'operator') {
        const leftEval = evaluateAST(node.left, data);
        const rightEval = evaluateAST(node.right, data);
        return node.value === 'AND' ? leftEval && rightEval : leftEval || rightEval;
    }
};

// Export functions
module.exports = { createAST, evaluateAST };
