from rule_engine import create_rule, combine_rules, evaluate_rule, modify_rule

def test_create_rule():
    try:
        rule = "age > 30 AND department = 'Sales'"
        ast = create_rule(rule)
        assert ast is not None, "AST should not be None."
        print("Create rule test passed!")
    except ValueError as e:
        print(f"Create rule test failed: {e}")
def test_combine_rules():
    rules = [
        "age > 30 AND department = 'Sales'",
        "salary > 50000 OR experience > 5"
    ]
    combined_ast = combine_rules(rules)
    assert combined_ast is not None, "Combined AST should not be None."
    print("Combine rules test passed!")

def test_invalid_rule():
    try:
        rule = "age & 30 AND department = 'Sales'"  # Invalid operator
        create_rule(rule)
        print("Invalid rule test failed: No exception raised.")
    except ValueError as e:
        print(f"Invalid rule test passed: {e}")

def test_evaluate_rule():
    rule = "age > 30 AND department = 'Sales'"
    ast = create_rule(rule)
    user_data = {"age": 35, "department": "Sales"}
    result = evaluate_rule(ast, user_data)
    assert result is True, "User should be eligible based on rule."
    print("Evaluate rule test passed!")

def test_modify_rule():
    rule = "age > 30 AND department = 'Sales'"
    ast = create_rule(rule)
    modify_rule(ast.left, 'age < 40')  # Modify to a new value
    user_data = {"age": 35, "department": "Sales"}
    result = evaluate_rule(ast, user_data)
    assert result is True, "User should still be eligible after modification."
    print("Modify rule test passed!")

# Running tests
if __name__ == "__main__":
    test_create_rule()
    test_invalid_rule()
    test_evaluate_rule()
    test_modify_rule()
