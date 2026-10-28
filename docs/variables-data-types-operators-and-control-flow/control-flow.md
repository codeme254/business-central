# Control Flow

**Control flow** determines the order in which statements execute in a program.

By default, AL executes statements sequentially, from top to bottom. Control-flow statements let us make decisions, repeat operations, and interrupt execution when necessary.

## `if`, `then`, and `else`

The `if` statement executes code conditionally, depending on whether a Boolean expression evaluates to `true` or `false`.

### Syntax

```al
if Condition then
    Statement;
```

When multiple statements need to execute, use a `begin ... end` block.

```al
if Condition then begin
    Statement1;
    Statement2;
end;
```

An `else` clause specifies what happens when the condition is false.

```al
if Condition then
    Statement1
else
    Statement2;
```

### Example

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
        Stock := 200;
        OrderAmount := 55;
        IsAvailable := true;

        if (Stock >= OrderAmount) and IsAvailable then begin
            Stock := Stock - OrderAmount;
            Message('Order placed');
            Message('%1 items remaining in stock', Stock);
        end
        else begin
            Message('Unable to place order');
            Message('This could be due to unavalability or low stock');
        end;
    end;
}
```

**Explanation:**
- If `(Stock >= OrderAmount) and IsAvailable` evaluates to `true`, the if part executes.
- Otherwise, the `else` branch executes.

:::info
Do not place a semicolon immediately before `else`. The semicolon would terminate the `if` statement prematurely.
:::

## `else if` Statements

Use `else if` to check additional conditions when the preceding `if` or `else if` condition is `false`.

**Syntax:**

```al
if Condition1 then begin
    // Runs if Condition1 is true
end else if Condition2 then begin
    // Runs if Condition1 is false and Condition2 is true
end else begin
    // Runs if all preceding conditions are false
end;
```

**Example:**

```al
trigger OnOpenPage()
var
    Stock: Integer;
begin
    Stock := 25;

    if Stock > 100 then begin
        Message('Stock is sufficient');
    end else if Stock > 0 then begin
        Message('Stock is running low');
    end else begin
        Message('Out of stock');
    end;
end;
```

**Key points:**
- You can chain multiple `else if` conditions.
- Conditions are evaluated from top to bottom. The first condition that evaluates to `true` determines which branch executes.
- The final `else` is optional and executes when all preceding conditions are `false`.
- **Do not place a semicolon before `else if` or `else`.** Write `end else if`, not `end; else if`.

## The `case` Statement

A `case` statement selects an action based on the value of an expression. It is useful when there are several possible alternatives.

### Syntax

```al
case Expression of
    Value1:
        Statement1;

    Value2:
        Statement2;

    else
        DefaultStatement;
end;
```

The `else` branch is optional. If no value matches and there is no `else`, nothing happens.

### Example

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        OrderStatus: Integer;
    begin
        OrderStatus := 2;

        case OrderStatus of
            1:
                begin
                    // Wrap multiple statements with begin and end
                    Message('Order is pending');
                    Message('Will start processing soon');
                end;
            2:
                // Single statements don't need a begin and end
                Message('Order is confirmed');
            3:
                Message('Order is shipping');
            4:
                Message('Order is delivered');
            else
                Message('Unknown order status');
        end;
    end;
}
```

**Explanation:**

AL evaluates `OrderStatus` and executes the statement associated with the matching value. Since its value is `2`, the confirmation message appears.

Multiple values can share the same action:

```al
case OrderStatus of
    1, 2:
        Message('Order is being processed.');

    3:
        Message('Order is shipped.');
end;
```

You can also specify ranges using `..`:

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        StockQuantity: Integer;
    begin
        StockQuantity := 77;

        case StockQuantity of
            1 .. 10:
                Message('Very Low Quantity');
            11 .. 20:
                Message('Low Quantity');
            21 .. 50:
                Message('Medium Quantity');
            50 .. 100:
                Message('High Quantity');
        // Notice we don't need else part
        end;
    end;
}
```

**When to use which?**
- Use `if` when evaluating conditions, especially comparisons and combinations of conditions.
- Use `case` when selecting between multiple possible values of one expression.

## The `for` Loop

A `for` loop repeats a statement for a specified range of values.

### Syntax

```al
for Counter := StartValue to EndValue do
    Statement;
```

The loop counter increases by one after each iteration.

### Example

```al
var
    Counter: Integer;
begin
    for Counter := 1 to 5 do
        Message('Iteration: %1', Counter);
end;
```

This displays five messages, with counter values from `1` through `5`.

Use `downto` to count backwards:

```al
for Counter := 5 downto 1 do
    Message('Countdown: %1', Counter);
```

This counts from `5` down to `1`.

Enclose multiple statement with `begin` and `end`

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        Counter: Integer;
    begin
        for Counter := 5 downto 1 do begin
            Message('Iteration %1', Counter);
            Message('Loops are awesome');
        end;
    end;
}
```

**Important points:**
- The starting and ending values are inclusive.
- If the starting value is already beyond the ending value for a `to` loop, the loop body does not execute.
- Avoid modifying the loop counter inside the loop; AL documentation warns that doing so can produce unpredictable behavior.
- The loop counter's value is undefined outside the `for` loop's scope.

**When to use it:** When you know the range of values you want to iterate over.

## The `while` Loop

A `while` loop repeats a statement as long as its condition evaluates to `true`.

### Syntax

```al
while Condition do
    Statement;
```

### Example

```al
var
    Counter: Integer;
begin
    Counter := 1;

    while Counter <= 5 do begin
        Message('Iteration: %1', Counter);
        Counter := Counter + 1;
    end;
end;
```

**Explanation:**

1. `Counter` starts at `1`.
2. AL checks whether `Counter <= 5`.
3. If true, the message is displayed and the counter increases.
4. The condition is checked again.
5. When the counter reaches `6`, the condition becomes false and the loop ends.

**Important:** The condition is checked before each iteration. If it is false initially, the loop body never executes.

Always ensure that something eventually makes the condition false; otherwise, you may create an infinite loop.

**When to use it:** When repetition depends on a condition rather than a predetermined number of iterations.

## 5. The `repeat ... until` Loop

A `repeat ... until` loop repeats its statements until its condition becomes `true`.

### Syntax

```al
repeat
    Statements;
until Condition;
```

### Example

```al
var
    Counter: Integer;
begin
    Counter := 1;

    repeat
        Message('Iteration: %1', Counter);
        Counter := Counter + 1;
    until Counter > 5;
end;
```

**Explanation:**

The loop displays values from `1` through `5`. Once the counter reaches `6`, the condition becomes true and the loop ends.


## `break` and `exit`

Both statements interrupt execution, but they do different things.

### `break`

The `break` statement immediately terminates the loop in which it appears. Execution then continues with the statement following that loop.

```al
var
    Counter: Integer;
begin
    for Counter := 1 to 10 do begin
        if Counter = 4 then
            break;

        Message('Counter: %1', Counter);
    end;

    Message('Loop finished.');
end;
```

**What happens?**

- Messages appear for `1`, `2`, and `3`.
- When the counter reaches `4`, `break` terminates the loop.
- The message `Loop finished.` then appears.

Notice that `Counter: 4` is never displayed because `break` executes before the message.

### `exit`

The `exit` statement terminates the current AL trigger or procedure immediately. If used inside a loop, it does not merely terminate the loop; it exits the surrounding trigger or procedure as well.

```al
var
    Quantity: Integer;
begin
    Quantity := 0;

    if Quantity <= 0 then begin
        Message('Quantity must be greater than zero.');
        exit;
    end;

    Message('Quantity accepted.');
end;
```

**What happens?**

The first message appears, and `exit` ends the trigger. The `Quantity accepted.` message is never displayed.

If you change `Quantity` to `5`, execution continues and the acceptance message appears.

### Key difference

| Statement | Effect |
|---|---|
| `break` | Exits the current loop. |
| `exit` | Exits the current trigger or procedure. |

**Additional detail:** AL also supports `exit(Value)` in procedures that return a value. It exits the procedure and returns the specified value. You cannot use a return value with `exit` in a system-defined trigger such as `OnOpenPage()`.

## Practical Example: Try Control Flow in Business Central


```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        Quantity: Integer;
        Counter: Integer;
        OrderStatus: Integer;
    begin
        // IF / ELSE
        Quantity := 15;

        if Quantity >= 10 then
            Message('Bulk order')
        else
            Message('Regular order');

        // CASE
        OrderStatus := 2;

        case OrderStatus of
            1:
                Message('Order is pending.');

            2:
                Message('Order is confirmed.');

            3:
                Message('Order is shipped.');

            else
                Message('Unknown order status.');
        end;

        // FOR
        for Counter := 1 to 3 do
            Message('For loop: %1', Counter);

        // WHILE
        Counter := 1;

        while Counter <= 3 do begin
            Message('While loop: %1', Counter);
            Counter := Counter + 1;
        end;

        // REPEAT ... UNTIL
        Counter := 1;

        repeat
            Message('Repeat loop: %1', Counter);
            Counter := Counter + 1;
        until Counter > 3;

        // BREAK
        for Counter := 1 to 5 do begin
            if Counter = 3 then
                break;

            Message('Break demonstration: %1', Counter);
        end;

        Message('Execution continues after break.');

        // EXIT
        if Quantity <= 0 then begin
            Message('Invalid quantity.');
            exit;
        end;

        Message('Execution continues after the exit check.');
    end;
}
```

### What to observe

When you open the Customer List page, the example demonstrates each control structure in sequence.

- `if` selects between two messages.
- `case` selects the message associated with the order status.
- `for`, `while`, and `repeat ... until` each display three iterations.
- `break` stops the loop when the counter reaches `3`.
- The statement after the `break` loop still executes.
- Because `Quantity` is `15`, the `exit` condition is false, so the final message appears.

To see `exit` terminate the trigger, change `Quantity := 15` to `Quantity := 0`. The trigger will display `Invalid quantity.` and stop before displaying the final message.

**Note:** The example assumes object ID `50100` is available in your configured ID range. Use a different available ID if you've already assigned it to another object in your extension.

## Further Reading

- [AL control statements — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-control-statements)
- [AL simple statements — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-simple-statements)
- [AL syntax and snippets — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-syntax)
