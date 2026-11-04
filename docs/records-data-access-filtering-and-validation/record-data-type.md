# The Record Data Type

## Introduction

The `Record` data type is used to interact with data stored in Business Central tables.

It allows us to retrieve, read, insert, modify, and delete records in database tables.

Think of a record variable as an object through which AL code can interact with a particular table.

For example, if we want to work with customer records, we declare a variable of type `Record Customer`.

## Declaring Record Variables

We declare record variables using the `Record` keyword, followed by the name of the table we want to interact with.

### Syntax

```al
VariableName: Record TableName;
```

### Example

```al
var
    CustomerRec: Record Customer;
    ProductRec: Record Product;
    EmployeeRec: Record Employee;
```

In this example:

- `CustomerRec` represents a record from the Customer table.
- `ProductRec` represents a record from the Product table.
- `EmployeeRec` represents a record from the Employee table.

Notice that we don't need to create a separate variable for every field in the table. The record variable gives us access to the table's fields.

For example:

```al
var
    ProductRec: Record Product;
begin
    ProductRec.Name := 'Laptop';
    ProductRec.Inventory := 20;
end;
```

Here, we are assigning values to fields through the `ProductRec` variable.

**Important:** Assigning values to a record variable does not automatically insert or update a database record. The changes are initially held in the record variable and must be explicitly saved when necessary.

## Accessing Record Fields

We access fields through the record variable using dot notation.

```al
var
    ProductRec: Record Product;
begin
    ProductRec.Name := 'Laptop';
    ProductRec.Inventory := 20;
    ProductRec."Unit Price" := 1500;
end;
```

We can also read field values:

```al
Message('Product: %1', ProductRec.Name);
```

This is similar to accessing properties of an object in languages such as C# or JavaScript.

Notice that fields containing spaces must be enclosed in double quotes.

## Record Variables and Database Operations

A record variable provides methods for interacting with the underlying table.

Some important operations include:

| Method | Description |
|---|---|
| `Get()` | Retrieves a record using its primary key. |
| `FindFirst()` | Retrieves the first record matching the current filters and sorting. |
| `FindLast()` | Retrieves the last matching record. |
| `FindSet()` | Retrieves a set of records for processing. |
| `Insert()` | Inserts a new record into the table. |
| `Modify()` | Saves changes to an existing record. |
| `Delete()` | Deletes the current record. |
| `Count()` | Counts the records matching the current filters. |
| `IsEmpty()` | Checks whether the current filtered set contains records. |

We'll explore these methods individually in the upcoming topics.

## Working with Records: A Simple Example

Let's create a codeunit that retrieves a product record and displays its information.

```al
codeunit 50100 ProductManager
{
    trigger OnRun()
    var
        ProductRec: Record Product;
    begin
        if ProductRec.Get('PROD001') then
            Message(
                'Product: %1, Inventory: %2',
                ProductRec.Name,
                ProductRec.Inventory
            )
        else
            Message('Product not found.');
    end;
}
```

Here:

1. We declare a record variable for the Product table.
2. We call `Get()` to retrieve the product with primary key `PROD001`.
3. If the record exists, we access its fields and display their values.
4. Otherwise, we display a message indicating that the product was not found.

**Note:** The example assumes `Product` has a primary key that accepts `PROD001` as its value. The arguments passed to `Get()` must correspond to the table's primary key fields.

## System-Defined Record Variables

You have already encountered a record variable called `Rec` when working with pages.

For example:

```al
field(Name; Rec.Name)
{
    ApplicationArea = All;
}
```

`Rec` is a system-defined record variable representing the current record being displayed or processed by the page.

You don't need to declare it yourself.

You can also encounter `xRec`, which represents the previous version of a record in relevant table and page triggers.

These are system-provided variables, unlike the record variables we explicitly declare.

## Important Things to Remember

- The `Record` data type allows us to interact with Business Central tables.
- Declare record variables using `VariableName: Record TableName;`.
- Use dot notation to access table fields.
- Assigning values to a record variable does not automatically save them to the database.
- Use record methods such as `Get()`, `FindSet()`, `Insert()`, `Modify()`, and `Delete()` to perform database operations.
- `Rec` and `xRec` are examples of system-defined record variables.

## Further Reading

- [Record Data Type – Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-data-type)
- [Record.Get() Method](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-get-method)
- [Record.FindSet() Method](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-findset-method)
- [Record.Insert() Method](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-insert-method)