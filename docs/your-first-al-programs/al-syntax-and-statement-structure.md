# AL Syntax and Statement Structure

Like other programming languages, AL has rules for declaring variables, assigning values, calling methods, and grouping statements.

## Statements

A **statement** is an instruction that tells AL to perform an action.

For example:

```al
Message('Hello, Business Central!');
```

This displays a message to the user.

Another example:

```al
Total := 100 + 50;
```

This assigns the value `150` to the variable `Total`.

Notice the following syntax rules:

- **Semicolons (`;`)** separate statements.
- **Single quotes (`'`)** enclose text literals.
- **The assignment operator (`:=`)** assigns a value to a variable.
- **Parentheses (`()`)** enclose method arguments.

> **Important:** Unlike C#, AL uses `:=` for assignment rather than `=`.

## Blocks: `begin` and `end`

In AL, `begin` and `end` group multiple statements into a single block.

This is particularly useful when a condition or loop needs to execute multiple statements.

```al
begin
    Total := 100;
    Tax := 16;
    Message('Calculation completed.');
end;
```

The statements inside the block execute sequentially, from top to bottom.

For example, when an `if` statement needs to execute multiple instructions, use a block:

```al
if Total > 100 then begin
    Tax := Total * 0.16;
    Message('Tax calculated.');
end;
```

Without `begin` and `end`, only the first statement following `then` would belong to the `if` statement.

## Variables and the `var` Keyword

Variables temporarily hold values that your code can use and manipulate.

In AL, you declare variables using the `var` keyword.

```al
var
    Total: Decimal;
    CustomerName: Text[100];
    IsApproved: Boolean;
```

Here:
- `Total` stores a decimal number.
- `CustomerName` stores text of up to 100 characters.
- `IsApproved` stores a Boolean value (`true` or `false`).

The variable name comes before the colon (`:`), followed by its data type.

**Note:** Variable declarations typically appear in a `var` section within an object or procedure.

## 5. Comments

Comments explain code to developers and are ignored when the program executes.

AL supports single-line comments using `//`.

```al
// Calculate the total including tax
Total := Subtotal + Tax;
```

You can also use block comments in al:
```al
/* This is also a comment */
Total := Subtotal + Tax;
```

Use comments to explain *why* something is being done when the code alone doesn't make it obvious.

## Case Sensitivity

AL is case-insensitive, meaning identifiers and keywords can generally be written using different capitalization without changing their meaning.

For example, `Message` and `MESSAGE` refer to the same built-in method.

However, consistent capitalization improves readability. By convention, AL keywords are written in lowercase, while data types and method names commonly use PascalCase.

## Further Reading

- [AL Simple Statements](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-simple-statements)
- [AL Control Statements](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-control-statements)
- [Programming in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-programming-in-al)

## Key Takeaway

AL code consists of statements that perform actions. Semicolons separate statements, `:=` assigns values, and `begin` and `end` group multiple statements into a block. Understanding these basic rules makes it easier to read and write AL code.