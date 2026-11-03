# Repeating Sections (Repeater Controls) in AL

## Introduction

In Business Central, a **Repeater** is a layout control used to display multiple records in a tabular format, with each record appearing as a separate row.

For example, imagine we have a `Product` table containing the following records:

| No. | Name | Unit Price | Inventory |
|---|---|---:|---:|
| P001 | Laptop | 75000 | 15 |
| P002 | Keyboard | 2500 | 40 |
| P003 | Mouse | 1200 | 65 |

We can use a Repeater control to display these records on a Product List page.

Instead of manually creating a row for every product, Business Central automatically generates rows based on the records retrieved from the source table.

**Key idea:** A Repeater defines a collection of columns that Business Central uses to display multiple records.

## Declaring a Repeater Control

A Repeater is declared using the `repeater` keyword inside the `layout` section of a page object.

**Syntax:**

```al
repeater(ControlName)
{
    // Field controls
}
```

- `repeater` declares the control.
- `ControlName` identifies the repeater.
- The body contains the fields that should appear as columns.

### Practical Example

Let's create a Product List page using our existing `Product` table.

```al
page 50100 ProductList
{
    PageType = List;
    SourceTable = Product;
    Caption = 'Products';

    layout
    {
        area(Content)
        {
            repeater(General)
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

Let's understand what happens:

1. `PageType = List` defines the page as a List page.
2. `SourceTable = Product` specifies where the records come from.
3. `repeater(General)` defines the repeating section.
4. Each `field` declaration defines a column in the list.
5. Business Central generates a row for each product record.

The resulting page displays the products in a tabular format.

## Understanding How Repeaters Work

The important thing to understand is that **the Repeater does not retrieve records itself**.

Instead:

- `SourceTable` establishes the page's data source.
- Business Central retrieves the records according to the page's filters and view.
- The Repeater defines how those records are presented.
- Each field control determines which value appears in its corresponding column.

For example:

```text
Product Table
     |
     | SourceTable = Product
     |
Product List Page
     |
     | Repeater
     |
     |-- No.
     |-- Name
     |-- Unit Price
     |-- Inventory
     |
Business Central displays each record as a row.
```

This is why you don't need to write a loop to generate the rows manually.

## Where Are Repeaters Used?

Repeaters are particularly important when developing collection-oriented pages.

Common examples include:

| Page Type | Example |
|---|---|
| `List` | Customer List, Vendor List, Item List |
| `Worksheet` | Item Journal, General Journal |
| `ListPart` | Sales Order Lines, embedded lists in FactBoxes |

**Important considerations:**

- A List page must contain a single Repeater group.
- Repeaters are supported on collection-oriented pages such as List, Worksheet, and ListPart.
- Repeaters are not intended for entity-oriented pages such as Card and Document.
- If you want to display a list inside a Card or Document page, create a ListPart containing a Repeater and embed that ListPart in the parent page.

For example, a Sales Order Document page can contain a ListPart displaying its sales order lines. This is an important distinction when designing Business Central interfaces. 

## Repeater-Specific Properties

Repeater controls support additional properties that influence how records are displayed.

Some worth recognizing include:

| Property | Description |
|---|---|
| `ShowCaption` | Determines whether the repeater displays its caption. |
| `ShowAsTree` | Displays the repeater records in a hierarchical tree structure. |
| `IndentationColumn` | Specifies the source-table field that determines the indentation level of records. |
| `IndentationControls` | Specifies which columns should be indented in a hierarchical list. |

These properties are useful when designing more specialized list interfaces.

For now, focus on understanding the basic Repeater structure. We can explore hierarchical lists and their properties when needed.

## Key Takeaways

- A Repeater is a layout control used to display multiple records in rows and columns.
- It is declared using the `repeater` keyword.
- Fields declared inside a Repeater become columns in the resulting list.
- Business Central automatically generates rows based on the records retrieved from the page's source table.
- You don't need to manually loop through records to generate the rows.
- Repeaters are primarily used on List, Worksheet, and ListPart pages.
- To display a repeating section inside a Card or Document page, use an embedded ListPart.

## Further Reading

[Microsoft Learn – Working with Repeater Controls](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-repeater-controls)
