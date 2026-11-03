# Fields and Data Bindings in AL

## Introduction

In the previous topic, we learned that **Field controls** are used to display information on a page.

But how does a field control know which data to display?

For example, suppose we have a `Product` table containing the following fields:

- No.
- Name
- Unit Price
- Inventory

We want to display these fields on a Product Card page.

How do we connect the page controls to the corresponding table fields?

This is where **Data Binding** comes in.

Data binding is the process of connecting a page control to a data source so that the control can display, and potentially modify, the underlying data.

In Business Central, page fields commonly bind directly to fields in their source table.

## Understanding Field Controls

A field control is declared using the `field` keyword.

The general syntax is:

```al
field(ControlName; SourceExpression)
{
    // Properties
}
```

There are two important components:

| Component | Description |
|---|---|
| `ControlName` | Identifies the field control within the page. |
| `SourceExpression` | Specifies the data that the control displays or interacts with. |

For example:

```al
field(Name; Rec.Name)
{
    ApplicationArea = All;
}
```

Here:

- `Name` is the control name.
- `Rec.Name` specifies the data source.
- `ApplicationArea = All` makes the control available across all application areas.

Notice that the control name and the source expression do not necessarily have to be identical.

You could also write:

```al
field(ProductName; Rec.Name)
{
    Caption = 'Product Name';
    ApplicationArea = All;
}
```

The control is called `ProductName`, but it is still connected to the `Name` field in the source table.

## Understanding Rec

One of the most important concepts when working with page fields is `Rec`.

**`Rec` is a system-defined record variable that represents the current record being displayed or processed by the page.**

You don't need to declare it yourself. Business Central automatically provides it for page objects.

For example:

```al
field(Name; Rec.Name)
{
    ApplicationArea = All;
}
```

Let's break this down:

- `Rec` represents the current record.
- `Name` identifies a field belonging to that record.
- `Rec.Name` accesses the value stored in the `Name` field of the current record.

### Practical Example

Suppose our Product table contains these records:

| No. | Name | Unit Price |
|---|---|---:|
| P001 | Laptop | 75000 |
| P002 | Keyboard | 2500 |
| P003 | Mouse | 1200 |

If a user opens the Product Card for product `P001`, the `Rec` variable represents that particular product record.

Therefore:

```al
Rec."No."       // P001
Rec.Name        // Laptop
Rec."Unit Price" // 75000
```

If the user opens product `P002`, `Rec` represents that record instead.

**Important:** `Rec` is not a particular product or a particular table field. It represents the current record associated with the page's `SourceTable`.

Microsoft also provides `xRec`, which represents the original version of a record before modifications. We'll explore that when we cover table and page triggers.

## Binding Page Fields to Table Fields

Let's put what we've learned into practice.

Suppose we have a `Product` table and want to display its information on a Product Card page.

**Example:**

```al
page 50100 ProductCard
{
    PageType = Card;
    SourceTable = Product;
    Caption = 'Product Card';

    layout
    {
        area(Content)
        {
            group(General)
            {
                field("No."; Rec."No.")
                {
                    ApplicationArea = All;
                }

                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                }

                field("Unit Price"; Rec."Unit Price")
                {
                    ApplicationArea = All;
                }

                field(Inventory; Rec.Inventory)
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

Let's examine what happens:

1. `SourceTable = Product` establishes the Product table as the page's data source.
2. Business Central retrieves the current Product record.
3. `Rec` represents that record.
4. Each field control accesses its corresponding field through `Rec`.
5. Business Central displays the retrieved values on the page.

The important relationship is:

```text
Product Table
     |
     | SourceTable = Product
     |
Product Card Page
     |
     | Rec."No."
     | Rec.Name
     | Rec."Unit Price"
     | Rec.Inventory
     |
Page Field Controls
```

### What happens when a user edits a field?

When a user modifies an editable field that is bound to a table field, Business Central can update the underlying record.

For example, suppose a user changes the product name from `Laptop` to `Gaming Laptop`.

The change is applied to the corresponding field in the Product record and saved according to the page's normal record-saving behavior.

This is one of the major benefits of binding page controls directly to table fields: Business Central handles much of the interaction between the user interface and the database.

## Binding Page Fields to Variables

Not every page field has to be connected directly to a table field.

You can also bind a page field to an AL variable.

This is useful when displaying temporary values, calculated information, or values that aren't stored directly in the source table.

**Example:**

```al
page 50101 ProductInformation
{
    PageType = Card;
    SourceTable = Product;

    layout
    {
        area(Content)
        {
            group(General)
            {
                field(ProductName; ProductName)
                {
                    ApplicationArea = All;
                }
            }
        }
    }

    var
        ProductName: Text[100];
}
```

Notice the difference:

```al
field(Name; Rec.Name)
```

Here, the control is bound to a field in the current table record.

However:

```al
field(ProductName; ProductName)
```

Here, the control is bound to an AL variable.

**Important distinction:**

- A control bound to `Rec.Name` accesses data from the current table record.
- A control bound to `ProductName` accesses an AL variable.

Changing a variable-bound control does not automatically save its value to the source table. You must implement the necessary AL logic if you want to persist that value.

## Common Properties of Page Fields

Page field controls support several properties that determine their appearance and behavior.

Here are some important ones:

| Property | Description |
|---|---|
| `Caption` | Specifies the user-facing label of the field. |
| `ToolTip` | Provides additional information when users hover over the field. |
| `ApplicationArea` | Determines the application areas in which the field is available. |
| `Editable` | Determines whether users can modify the field through the control. |
| `Visible` | Determines whether the field is displayed. |
| `Enabled` | Determines whether users can interact with the field. |
| `Importance` | Specifies the importance of a field, influencing how it is presented in certain layouts. |
| `ShowMandatory` | Displays a visual indicator showing that the field should contain a value. |
| `Style` | Specifies the visual formatting of the field. |
| `MultiLine` | Determines whether a field supports multiple lines of text. |

**Example:**

```al
field(Name; Rec.Name)
{
    ApplicationArea = All;
    Caption = 'Product Name';
    ToolTip = 'Specifies the name of the product.';
    Editable = true;
    ShowMandatory = true;
}
```

In this example:

- The field is labelled `Product Name`.
- Users can hover over it to see additional information.
- Users can edit its value.
- A mandatory indicator is displayed.

**Important:** `ShowMandatory` only displays a visual indicator. It does not enforce data validation. For actual validation, you need appropriate table-field properties or validation logic.

## Key Takeaways

- Field controls are declared using the `field` keyword.
- The `SourceExpression` determines where a page field gets its data.
- `Rec` is a system-defined variable representing the current record.
- `SourceTable` establishes the table associated with a page.
- `Rec.FieldName` accesses a particular field in the current record.
- Page fields can bind to table fields or AL variables.
- Changes to table-bound fields can be saved to the underlying record.
- Changes to variable-bound fields are not automatically persisted to the database.

## Further Reading

1. [Microsoft Learn – System-Defined Variables](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-system-defined-variables)
2. [Microsoft Learn – Page Properties](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-properties)
3. [Microsoft Learn – Page Objects](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-object)
