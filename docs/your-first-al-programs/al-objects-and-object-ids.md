# AL Objects and Object IDs

## What Are AL Objects?

In AL, an **object** is a building block used to define a particular part of Business Central's functionality.

For example, a table defines how data is structured, while a page defines how users interact with that data.

Common AL objects include:

| Object | Purpose |
|---|---|
| `table` | Defines the structure of stored data. |
| `page` | Defines the user interface. |
| `codeunit` | Contains reusable business logic. |
| `report` | Generates reports and documents. |
| `tableextension` | Extends an existing table with additional fields or functionality. |
| `pageextension` | Extends an existing page with additional functionality. |
| `enum` | Defines a set of named values. |

For example, a simple table object might look like this:

```al
table 50100 Employee
{
    fields
    {
        field(1; "Employee Name"; Text[100])
        {
        }
    }

    keys
    {
        key(PK; "Employee Name")
        {
            Clustered = true;
        }
    }
}
```

Here, we define a table named `Employee` that contains an `Employee Name` field.

## What Are Object IDs?

Every AL object that requires an ID has a numeric identifier that distinguishes it from other objects of the same object type.

Consider this declaration:

```al
table 50100 Employee
{
    // Table definition
}
```

It contains three important parts:

- `table` — specifies the object type.
- `50100` — specifies the object ID.
- `Employee` — specifies the object name.

Object IDs help Business Central identify objects internally. The object name makes them easier for developers to recognize.

### Are Object IDs Unique?

Object IDs must be unique within their respective object types in a given application context.

For example, you cannot define two different tables with ID `50100` in the same application context.

However, a table and a page can both use ID `50100` because they are different object types.

## Understanding Object ID Ranges

Business Central uses different object ID ranges for different purposes.

When developing custom extensions, you should use an ID range allocated to your extension rather than choosing IDs that conflict with other objects.

For example:

```al
table 50100 Employee
{
    // Employee data
}

page 50101 EmployeeList
{
    // Employee list interface
}
```

Here, we use IDs `50100` and `50101` for our custom objects.

**Important:** The IDs available to you depend on your application's configuration and licensing or development arrangements. Check the permitted ID ranges before creating custom objects.

### Table Extensions and Page Extensions?

Extension objects work differently from regular objects.

For example:

```al
tableextension 50100 CustomerExtension extends Customer
{
    fields
    {
        field(50100; "Customer Rating"; Integer)
        {
            DataClassification = CustomerContent;
        }
    }
}
```

Here:

- `tableextension` specifies the object type.
- `50100` is the table extension's object ID.
- `CustomerExtension` is its name.
- `extends Customer` specifies the existing table being extended.
- `field(50100; ...)` defines a new field with its own field ID.

Notice that the table extension's ID and its field's ID are separate identifiers. They belong to different ID contexts.

## Key Takeaway

**AL objects are the building blocks of Business Central, while object IDs identify individual objects within their respective types.** When creating custom objects, choose IDs from an appropriate range and ensure they do not conflict with existing objects.
