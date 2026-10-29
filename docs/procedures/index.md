# Procedures in AL

A **procedure** is a named, reusable block of code that performs a specific task. Procedures help us organize code, avoid repetition, and make programs easier to understand and maintain.

For example, instead of calculating a product's price directly inside `OnOpenPage()`, we can create a procedure called `CalculateTotalPrice()` and call it whenever we need the calculation.

## Declaring and Calling Procedures

Use the `procedure` keyword to declare a procedure.

```al
local procedure GreetUser()
begin
    Message('Welcome to Business Central!');
end;
```

To execute the procedure, call it by name:

```al
trigger OnOpenPage()
begin
    GreetUser();
end;
```

Here is a more complete example:
```al
namespace LearningAl;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    local procedure GreetUser()
    begin
        Message('Welcome to Business Central');
    end;

    trigger OnOpenPage();
    begin
        GreetUser();
    end;
}
```

**Key points:**
- A procedure declaration contains its name, optional parameters, and an optional return type.
- The `begin` and `end` keywords enclose the procedure's body.
- Calling a procedure executes its body.
- Parentheses are used when calling a procedure, even when it takes no parameters.
- Procedures can be declared inside AL objects, such as pages, page extensions, and codeunits.

## Parameters and Return Values

### Parameters

Parameters allow us to pass information into a procedure, making it reusable with different inputs.

```al
local procedure GreetUser(UserName: Text)
begin
    Message('Welcome, %1!', UserName);
end;
```

Call the procedure with an argument:

```al
GreetUser('Dennis');
GreetUser('Alice');
```

The procedure receives the supplied text through its `UserName` parameter.

When declaring multiple parameters, separate them with semicolons. When calling the procedure, separate the arguments with commas.

```al
local procedure AddNumbers(FirstNumber: Integer; SecondNumber: Integer)
begin
    Message('Sum: %1', FirstNumber + SecondNumber);
end;
```

Call it:

```al
AddNumbers(10, 20);
```

### Return Values

A procedure can return a value to the code that called it.

Declare the return type after the parameter list.

```al
local procedure AddNumbers(FirstNumber: Integer; SecondNumber: Integer): Integer
begin
    exit(FirstNumber + SecondNumber);
end;
```

Use the returned value:

```al
var
    Result: Integer;
begin
    Result := AddNumbers(10, 20);
    Message('Result: %1', Result);
end;
```

Here, `: Integer` declares the return type, and `exit()` returns the calculated result.

A procedure without a declared return type performs an operation without returning a value.

## Local Versus Global Procedures

AL procedures can have different levels of accessibility.

### Local Procedures

A local procedure is declared using the `local` keyword.

```al
local procedure CalculateDiscount(Price: Decimal): Decimal
begin
    exit(Price * 0.10);
end;
```

A local procedure can be called from other code within the same AL object, subject to the normal scope rules, but not directly from another AL object.

Use local procedures for implementation details that should remain inside their object.

### Global Procedures

A procedure declared without the `local` keyword is traditionally described as a global procedure.

```al
procedure CalculateDiscount(Price: Decimal): Decimal
begin
    exit(Price * 0.10);
end;
```

A global procedure is potentially accessible to code outside its object, subject to AL's accessibility rules and the object's context.

**Important:** Omitting `local` does not mean every other object can automatically call the procedure. Accessibility depends on factors such as the object type, procedure exposure, and applicable AL rules.

Use local procedures by default when the functionality does not need to be exposed externally.

## Passing Parameters by Value and by Reference

AL supports two ways of passing parameters: **by value** and **by reference**.

### Passing by Value

By default, parameters are passed by value. The procedure receives a copy of the supplied value.

```al
local procedure IncreaseNumber(Number: Integer)
begin
    Number := Number + 10;
end;
```

Example:

```al
var
    MyNumber: Integer;
begin
    MyNumber := 5;

    IncreaseNumber(MyNumber);

    Message('Number: %1', MyNumber);
end;
```

The result is `5`, not `15`, because changing the procedure's parameter does not change the caller's integer variable.

### Passing by Reference

Use the `var` keyword before a parameter's name to pass it by reference.

```al
local procedure IncreaseNumber(var Number: Integer)
begin
    Number := Number + 10;
end;
```

Example:

```al
var
    MyNumber: Integer;
begin
    MyNumber := 5;

    IncreaseNumber(MyNumber);

    Message('Number: %1', MyNumber);
end;
```

The result is `15` because the procedure modifies the original variable.

**When should you use `var`?**
- When the procedure must modify a caller's variable.
- When you want to return a result through an existing variable rather than through the procedure's return value.

Use `var` only when the procedure needs to modify the supplied variable. It makes the side effect explicit.

## Returning Values with `exit`

In AL, `exit` serves two important purposes:
- It immediately exits the current procedure or trigger.
- In a procedure that declares a return type, `exit(Value)` returns a value to the caller and stops execution of that procedure.

Example:

```al
local procedure GetDiscount(Price: Decimal): Decimal
begin
    if Price >= 1000 then
        exit(Price * 0.15);

    exit(Price * 0.05);
end;
```

The procedure returns a discount of 15% when the price is at least 1,000; otherwise, it returns 5%.

Once an `exit(Value)` statement executes, the procedure stops. Any statements after that executed branch are not reached.

**Important:** If a procedure returns a value, ensure every possible execution path returns an appropriate result. Do not rely on an implicit default value to represent a meaningful business result.


## Additional Resources

- [Microsoft Learn: Create custom procedures in AL](https://learn.microsoft.com/en-us/training/modules/create-custom-functions/)
- [Microsoft Learn: Working with AL methods](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-methods)
