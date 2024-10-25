class Node:
    def __init__(self, type, left=None, right=None, value=None):
        self.type = type  # 'operator' or 'operand'
        self.left = left
        self.right = right
        self.value = value

VALID_ATTRIBUTES = {'age', 'department', 'salary', 'experience'}

def validate_rule(rule_string):
    """ Validate the rule string for basic syntax and attribute checks. """
    tokens = rule_string.replace('(', ' ( ').replace(')', ' ) ').split()
    if len(tokens) < 3:
        raise ValueError("Rule must have at least one condition and an operator.")
    
    for token in tokens:
        # Check if the token is a valid attribute or an operator
        if token not in VALID_ATTRIBUTES and not token.isidentifier() and token not in {'AND', 'OR', '>', '<', '=', '!='}:
            # Allow numeric values (integers and floats)
            if not token.isdigit() and not is_float(token):
                raise ValueError(f"Invalid token in rule: {token}")

def is_float(value):
    """ Check if the given value can be converted to a float. """
    try:
        float(value)
        return True
    except ValueError:
        return False

def create_rule(rule_string):
    """ Parse a rule string and return an AST Node. """
    validate_rule(rule_string)  # Validate the rule string
    tokens = rule_string.replace('(', ' ( ').replace(')', ' ) ').split()
    return parse_expression(tokens)

def parse_expression(tokens):
    """ Parse the tokens into an AST. """
    if not tokens:
        raise SyntaxError("Empty expression")
    
    token = tokens.pop(0)

    if token == '(':
        node = parse_expression(tokens)
        tokens.pop(0)  # Remove closing parenthesis
        return node

    if token in ('AND', 'OR'):
        left = parse_expression(tokens)
        right = parse_expression(tokens)
        return Node('operator', left, right, token)

    # Assume token is a condition (e.g., "age > 30")
    left = tokens.pop(0)  # e.g., "age"
    operator = tokens.pop(0)  # e.g., ">"
    right = tokens.pop(0)  # e.g., "30"

    # Validate if the left is a valid attribute
    if left not in VALID_ATTRIBUTES:
        raise ValueError(f"Attribute {left} is not valid.")

    return Node('operator', Node('operand', left), Node('operand', right, value=operator))

def combine_rules(rules):
    """ Combine multiple rules into a single AST. """
    combined_ast = None

    for rule in rules:
        ast = create_rule(rule)
        if combined_ast is None:
            combined_ast = ast
        else:
            combined_ast = Node('operator', combined_ast, ast, 'OR')  # Combine with OR for demonstration

    return combined_ast

def modify_rule(ast_node, new_value):
    """ Modify the existing AST node with new value. """
    if ast_node.type == 'operand':
        ast_node.value = new_value
    elif ast_node.type == 'operator':
        modify_rule(ast_node.left, new_value)
        modify_rule(ast_node.right, new_value)

def evaluate_rule(ast_node, user_data):
    """ Evaluate the AST against user_data. """
    if ast_node.type == 'operand':
        return user_data.get(ast_node.value)

    left_value = evaluate_rule(ast_node.left, user_data)
    right_value = evaluate_rule(ast_node.right, user_data)

    print(f"Evaluating: {left_value} {ast_node.value} {right_value}")  # Debug statement

    if ast_node.value == '>':
        return left_value > right_value
    elif ast_node.value == '<':
        return left_value < right_value
    elif ast_node.value == 'AND':
        return left_value and right_value
    elif ast_node.value == 'OR':
        return left_value or right_value
    return False
