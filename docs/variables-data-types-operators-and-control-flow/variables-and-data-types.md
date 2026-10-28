# Variables and Data Types

Variables are named storage locations used to hold values while AL code executes. Every variable has a **data type**, which determines what kind of value it can store and which operations can be performed on it.

## Declaring Variables

In AL, variables are declared in a `var` section.

```al
var
    CustomerName: Text[100];
    Quantity: Integer;
    UnitPrice: Decimal;
    IsAvailable: Boolean;
```

**Syntax:** `VariableName: DataType;`

- `var` begins the variable declaration section.
- `CustomerName` is the variable's name.
- `Text[100]` is its data type and maximum text length.
- The semicolon terminates the declaration.

You can declare multiple variables of the same type in one statement:

```al
var
    Quantity, TotalItems: Integer;
```

## Common Data Types

| Data Type | Purpose | Example |
|---|---|---|
| `Integer` | Stores whole numbers. | `Quantity := 25;` |
| `Decimal` | Stores numbers with fractional parts. | `UnitPrice := 99.50;` |
| `Boolean` | Stores `true` or `false`. | `IsAvailable := true;` |
| `Text` | Stores text, such as names and descriptions. | `CustomerName := 'Contoso Ltd.';` |
| `Code` | Stores code-like text, commonly used for identifiers such as customer numbers. | `CustomerNumber := 'CUST001';` |
| `Date` | Stores a calendar date without a time. | `OrderDate := Today;` |
| `Time` | Stores a time of day without a date. | `CurrentTime := Time;` |
| `DateTime` | Stores both a date and a time. | `CurrentDateTimeValue := CurrentDateTime;` |
| `Record` | Represents records from a Business Central table. | `CustomerRec: Record Customer;` |

### Text vs. Code

Both `Text` and `Code` store textual values, but they serve different purposes.

- `Text` is suitable for names, descriptions, messages, and other ordinary text.
- `Code` is commonly used for identifiers such as customer numbers and item numbers.

For example:

```al
var
    CustomerName: Text[100];
    CustomerNumber: Code[20];
```

`Text[100]` allows up to 100 characters, while `Code[20]` allows up to 20 characters. A `Code` value is normalized to uppercase, making it useful for identifiers that should not depend on letter casing.

## Constants and Assignments

An **assignment** stores a value in a variable. AL uses the `:=` operator for assignment.

```al
var
    Quantity: Integer;
    UnitPrice: Decimal;
begin
    Quantity := 5;
    UnitPrice := 250.50;
end;
```

Here, `5` and `250.50` are literal values assigned to variables.

Add this small section under **Declaring Variables** in your notes:


### Local vs. Global Variables

AL supports two kinds of variables based on where they are declared:

- **Local variables:** Declared in the `var` section of a procedure or trigger. They are accessible only within that procedure or trigger.
- **Global variables:** Declared in the object's global `var` section, outside individual procedures and triggers. They can be accessed by the procedures and triggers within that object.

**Example:**

```al
pageextension 50100 CustomerListExt extends "Customer List"
{
    var
        GlobalMessage: Text[50]; 
        // Global variable - declared in the object's global 
        //      var section outside any procedure or trigger

    trigger OnOpenPage()
    var
        LocalQuantity: Integer;
        // Local variable: declared in the var section of the OnOpenPage trigger
    begin
        GlobalMessage := 'Welcome to Business Central';
        LocalQuantity := 10;

        Message('%1. Quantity: %2', GlobalMessage, LocalQuantity);
    end;
}
```

Here, `GlobalMessage` is a global variable, while `LocalQuantity` is a local variable.

**Remember:** Declare local variables in the `var` section before `begin`. Global variables are declared in the object's `var` section, outside individual triggers and procedures.


### Labels for reusable text

AL supports labels for text that may need translation.

```al
var
    GreetingLbl: Label 'Welcome to Business Central';
begin
    Message(GreetingLbl);
end;
```

`GreetingLbl` is a label containing reusable text. Labels are especially useful for user-facing messages in Business Central extensions.

## Working with Date and Time

AL provides built-in methods for retrieving the current date, time, and date-time.

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        CurrentDate: Date;
        CurrentTime: Time;
        CurrentDateTimeVal: DateTime;
    begin
        CurrentDate := Today;
        CurrentTime := Time;
        CurrentDateTimeVal := CurrentDateTime;
        Message('Date: %1, Time: %2, Datetime: %3', CurrentDate, CurrentTime, CurrentDateTimeVal);
    end;
}

```

- `Today` returns the current date according to the Business Central user's regional and time-zone settings.
- `Time` returns the current time.
- `CurrentDateTime` returns the current date and time.

These values can be displayed using `Message()` and `Format()`.

## Record and Other Complex Types

A `Record` variable allows AL code to work with records stored in Business Central tables.

For example:

```al
var
    CustomerRec: Record Customer;
begin
    if CustomerRec.FindFirst() then
        Message('Customer: %1', CustomerRec.Name)
    else
        Message('No customers were found.');
end;
```

- `Record Customer` declares a variable that represents records from the Customer table.
- `FindFirst()` attempts to retrieve the first record that matches the record's current filters.
- `CustomerRec.Name` accesses the Name field of the retrieved customer.
- The `if` statement checks whether a record was found before accessing its fields.

A `Record` variable does not automatically contain a customer. You must retrieve a record or initialize and populate one as appropriate.

Other complex AL types include `RecordRef`, `FieldRef`, `Guid`, and `Blob`. These provide additional ways to work with table records, fields, identifiers, and binary data.

## Type Conversion

Type conversion changes a value from one data type to another.

### Automatic conversion

AL can automatically convert certain compatible types during assignment.

```al
var
    Quantity: Integer;
    Amount: Decimal;
begin
    Quantity := 5;
    Amount := Quantity;
end;
```

The integer `5` is converted to the decimal value `5`.

However, not every conversion is automatic or safe.

### Explicit conversion with Format()

`Format()` converts a value into its textual representation.

```al
var
    Quantity: Integer;
    QuantityText: Text;
begin
    Quantity := 25;
    QuantityText := Format(Quantity);

    Message(QuantityText);
end;
```

The integer `25` becomes the text `'25'`.

### Explicit conversion with Evaluate()

`Evaluate()` attempts to convert text into the data type of a destination variable.

```al
var
    Quantity: Integer;
    InputText: Text;
    ConversionSucceeded: Boolean;
begin
    InputText := '25';

    ConversionSucceeded := Evaluate(Quantity, InputText);

    if ConversionSucceeded then
        Message('Quantity: %1', Quantity)
    else
        Message('The input is not a valid integer.');
end;
```

- `Evaluate()` attempts to interpret the text as an integer.
- It returns `true` when conversion succeeds and `false` when it fails.
- Checking the return value lets you handle invalid input without immediately raising a conversion error.

## Practical Example: See Variables in Business Central

**File:** `CustomerVariablesDemo.PageExt.al`

This example extends the Customer List page and displays values of different data types when the page opens.

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    var
        Quantity: Integer;
        UnitPrice: Decimal;
        IsAvailable: Boolean;
        ProductName: Text[50];
        ProductCode: Code[20];
        CurrentDate: Date;
        CurrentTime: Time;
        CurrentDateTimeValue: DateTime;
        CustomerRec: Record Customer;
        QuantityText: Text;
    begin
        // Assign values to variables.
        Quantity := 5;
        UnitPrice := 250.50;
        IsAvailable := true;
        ProductName := 'Laptop';
        ProductCode := 'laptop001';

        CurrentDate := Today;
        CurrentTime := Time;
        CurrentDateTimeValue := CurrentDateTime;

        // Convert an integer to text.
        QuantityText := Format(Quantity);

        // Display simple data types.
        Message(
            'Product: %1\Code: %2\Quantity: %3\Unit Price: %4\Available: %5',
            ProductName,
            ProductCode,
            Quantity,
            UnitPrice,
            IsAvailable
        );

        // Display date and time values.
        Message(
            'Date: %1\Time: %2\DateTime: %3',
            CurrentDate,
            CurrentTime,
            CurrentDateTimeValue
        );

        // Display the result of type conversion.
        Message('Quantity as text: %1', QuantityText);

        // Retrieve and display an existing customer.
        if CustomerRec.FindFirst() then
            Message('First customer: %1', CustomerRec.Name)
        else
            Message('No customers were found.');
    end;
}
```

### What to observe

1. The first message displays the product details. Notice that `ProductCode` is normalized to uppercase.
2. The second message displays the current date, time, and date-time.
3. The third message displays the quantity after converting it to text.
4. The final message displays the first customer found, or a message indicating that no customers were found.

**Note:** This example assumes object ID `50100` is available in your configured ID range. If you've already used that ID in another object in your extension, choose an available ID.

## Further Reading

- [AL variables — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-variables)
- [Data types and methods — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/library)
- [Date data type — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/date/date-data-type)
- [System.Today() method — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/system/system-today-method)
- [System.Evaluate() method — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/system/system-evaluate-method)
- [AL type conversion in expressions — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-type-conversion-expressions)
