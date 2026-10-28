# Operators and Expressions

An **operator** is a symbol or keyword that performs an operation on one or more values.

An **expression** is a combination of values, variables, and operators that produces a result.

For example:

```al
Total := Quantity * UnitPrice;
```

Here, `*` is an operator, while `Quantity * UnitPrice` is an expression. The result is assigned to `Total` using `:=`.

## Arithmetic Operators

Arithmetic operators perform mathematical calculations.

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 2` | `5` |
| `div` | Integer division | `10 div 3` | `3` |
| `mod` | Remainder after division | `10 mod 3` | `1` |

**Important distinctions:**

- `/` performs division and can produce a fractional result when used with `Decimal` values.
- `div` returns the integer quotient, discarding the fractional part.
- `mod` returns the remainder.

For example, `10 div 3` returns `3`, while `10 mod 3` returns `1`.

AL also supports unary `+` and `-` operators, which indicate a number's sign:

```al
Quantity := -5;
Quantity := +5;
```

## Comparison Operators

Comparison operators compare two values and produce a Boolean result: `true` or `false`.

| Operator | Meaning | Example |
|---|---|---|
| `=` | Equal to | `5 = 5` → `true` |
| `<>` | Not equal to | `5 <> 3` → `true` |
| `>` | Greater than | `8 > 5` → `true` |
| `<` | Less than | `3 < 5` → `true` |
| `>=` | Greater than or equal to | `5 >= 5` → `true` |
| `<=` | Less than or equal to | `4 <= 5` → `true` |

**Important:** In AL, `=` is used for equality comparisons, while `:=` is used for assignment.

```al
Quantity := 10;       // Assignment
IsAvailable := Quantity > 0; // Comparison produces a Boolean
```

## Logical Operators

Logical operators combine or reverse Boolean expressions.

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `and` | True when both conditions are true | `5 > 2 and 10 > 3` | `true` |
| `or` | True when at least one condition is true | `5 < 2 or 10 > 3` | `true` |
| `not` | Reverses a Boolean value | `not (5 > 2)` | `false` |
| `xor` | True when exactly one condition is true | `true xor false` | `true` |

### Truth table

| A | B | A and B | A or B | A xor B |
|---|---|---|---|---|
| `true` | `true` | `true` | `true` | `false` |
| `true` | `false` | `false` | `true` | `true` |
| `false` | `true` | `false` | `true` | `true` |
| `false` | `false` | `false` | `false` | `false` |

`not` operates on a single Boolean value:

| A | not A |
|---|---|
| `true` | `false` |
| `false` | `true` |

**Example:**

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        Stock: Integer;
        OrderAmount: Integer;
        IsAvailable: Boolean;
    begin
        Stock := 55;
        OrderAmount := 55;
        IsAvailable := true;

        if (Stock >= OrderAmount) and IsAvailable then
            Message('Order can be placed')
        else
            Message('Order cannot be placed');
    end;
}
```

The message appears only when both conditions are true.

## String Concatenation

**String concatenation** means joining text values together.

In AL, the `+` operator can concatenate `Text` and `Code` values.

```al
var
    FirstName: Text[30];
    LastName: Text[30];
    FullName: Text[60];
begin
    FirstName := 'John';
    LastName := 'Doe';

    FullName := FirstName + ' ' + LastName;

    Message(FullName);
end;
```

Output:

`John Doe`

The `+` operator behaves differently depending on the operand types:

```al
Total := 10 + 5;                    // Arithmetic addition: 15
FullName := 'John' + ' Doe';   // Text concatenation
```

The first expression adds numbers. The second joins text.

**Note:** Concatenating `Code` values produces a `Code` result when both operands are `Code`. Mixing `Code` and `Text` produces a `Text` result.

## Operator Precedence

**Operator precedence** determines which operations are evaluated first when an expression contains multiple operators.

Consider:

```al
Result := 2 + 3 * 4;
```

The multiplication is evaluated first, so:

`2 + (3 * 4) = 14`

However:

```al
Result := (2 + 3) * 4;
```

Parentheses force the addition to happen first:

`(2 + 3) * 4 = 20`

### AL operator precedence

The following groups are listed from higher to lower precedence:

| Priority | Operators |
|---|---|
| 1 — Highest | `.`, `[ ]`, `()`, `::`, `@` |
| 2 | `not`, unary `-`, unary `+` |
| 3 | `*`, `/`, `div`, `mod`, `and`, `xor` |
| 4 | `+`, `-`, `or` |
| 5 | `>`, `>=`, `<`, `<=`, `=`, `<>`, `in` |
| 6 — Lowest | `..` (range operator) |

For example:

```al
Result := 10 + 5 * 2;
```

The result is `20` because multiplication has higher precedence than addition.

**A particularly important AL detail:** `and` and `xor` have higher precedence than `or`.

```al
Result := ConditionA or ConditionB and ConditionC;
```

This is evaluated as:

```al
Result := ConditionA or (ConditionB and ConditionC);
```

Use parentheses to make complex expressions clear and avoid unintended results.

## Boolean Expressions

A **Boolean expression** is an expression that evaluates to either `true` or `false`.

Comparison and logical operators commonly produce Boolean expressions.

Examples:

```al
Quantity > 0
```

```al
UnitPrice <= 1000
```

```al
Quantity > 0 and IsAvailable
```

Boolean expressions are commonly used in `if` statements to control program flow.

### Example

```al
var
    Quantity: Integer;
    IsAvailable: Boolean;
begin
    Quantity := 10;
    IsAvailable := true;

    if Quantity > 0 and IsAvailable then
        Message('The product can be sold.')
    else
        Message('The product cannot be sold.');
end;
```

The condition `Quantity > 0 and IsAvailable` evaluates to `true` because the quantity is positive and the product is available.

### Boolean variables versus Boolean expressions

These concepts are related but different:

```al
IsAvailable := true;
```

This assigns a Boolean value to a variable.

```al
IsAvailable := Quantity > 0;
```

This evaluates a Boolean expression and assigns its result to the variable.

## Practical Example: Try Operators in Business Central

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        Quantity: Integer;
        UnitPrice: Decimal;
        Total: Decimal;
        IsAvailable: Boolean;
        IsBulkOrder: Boolean;
        ProductName: Text[50];
        DiscountedPrice: Decimal;
    begin
        Quantity := 10;
        UnitPrice := 250;
        IsAvailable := true;
        ProductName := 'Laptop';

        // Arithmetic operators
        Total := Quantity * UnitPrice;

        Message(
            'Product: %1\Quantity: %2\Unit price: %3\Total: %4',
            ProductName,
            Quantity,
            UnitPrice,
            Total
        );

        // Comparison and logical operators
        IsBulkOrder := Quantity >= 10 and IsAvailable;

        if IsBulkOrder then
            Message('The order qualifies as an available bulk order.')
        else
            Message('The order does not qualify as an available bulk order.');

        // Operator precedence
        DiscountedPrice := UnitPrice - 20 * 2;

        Message(
            'Price after discount: %1',
            DiscountedPrice
        );

        // String concatenation
        Message('Product summary: ' + ProductName + ' is available.');

        // Boolean negation
        if not IsAvailable then
            Message('The product is unavailable.')
        else
            Message('The product is available.');
    end;
}
```

### Expected results

- **Arithmetic:** The total is `2500`.
- **Boolean expression:** The bulk-order condition is true because the quantity is at least 10 and the product is available.
- **Operator precedence:** The discounted price is `210`, because `20 * 2` is evaluated before the subtraction.
- **String concatenation:** The message displays `Product summary: Laptop is available.`
- **Boolean negation:** Since `IsAvailable` is `true`, `not IsAvailable` is `false`, so the `else` branch runs.

This example demonstrates arithmetic, comparison, logical operators, string concatenation, precedence, and Boolean expressions in one place.

## Further Reading

- [AL operators — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-operators)
- [Arithmetic operators — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-arithmetic-operators)
- [Boolean operators — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-boolean-operators)
- [AL control statements — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-control-statements)
