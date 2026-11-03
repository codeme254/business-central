# SourceTable and SourceTableView

## SourceTable

The `SourceTable` property specifies the database table from which a page retrieves and displays records.

It establishes the data source for the page.

### Syntax

```al
SourceTable = TableName;
```

### Example

```al
page 50100 ProductList
{
    PageType = List;
    SourceTable = Product;
    ApplicationArea = All;
    UsageCategory = Lists;

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
            }
        }
    }
}
```

In this example:

- `SourceTable = Product` tells Business Central to use the `Product` table as the page's data source.
- `Rec` represents the current record from the `Product` table.
- The fields displayed in the repeater are retrieved from that table.

**Important:** Not every page requires a `SourceTable`. Some page types, such as RoleCenter and API-related scenarios, have different requirements. Always check the requirements of the page type you're creating.

## SourceTableView

The `SourceTableView` property specifies the default view of the records displayed on a page.

It allows us to define:

1. **Sorting:** Which fields should determine the order of records.
2. **Sort order:** Whether records should appear in ascending or descending order.
3. **Filtering:** Which records should be included in the page's default view.

### Syntax

```al
SourceTableView = sorting(FieldName1, FieldName2)
                  order(ascending)
                  where(FieldName3 = filter(Value));
```

Let's look at each component.

### A. Sorting

The `sorting` keyword specifies the table key and fields used to sort records.

```al
SourceTableView = sorting(Name);
```

This sorts records using the `Name` field in ascending order by default.

You can also specify multiple fields:

```al
SourceTableView = sorting(Category, Name);
```

Here, records are sorted by `Category` first and then by `Name` within each category.

### B. Order

The `order` keyword specifies the direction of sorting.

```al
SourceTableView = sorting(Name) order(descending);
```

Available values:

| Value | Description |
|---|---|
| `ascending` | Sorts from lowest to highest, or A to Z. |
| `descending` | Sorts from highest to lowest, or Z to A. |

If you don't specify an order, ascending order is used.

### C. Filtering

The `where` keyword allows us to filter records based on specified conditions.

```al
SourceTableView = where(Status = filter(Active));
```

This displays records whose `Status` field is `Active`.

You can combine multiple filters:

```al
SourceTableView = where(
    Status = filter(Active),
    Inventory = filter(> 0)
);
```

This displays products that are active and have inventory greater than zero.

You can also use filter expressions such as:

```al
SourceTableView = where(Inventory = filter(10..100));
```

This includes products with inventory between 10 and 100, inclusive.

## Putting Everything Together

Let's create a page that displays only active products with available inventory, sorted alphabetically by name.

```al
page 50100 AvailableProducts
{
    PageType = List;
    SourceTable = Product;

    SourceTableView = sorting(Name)
                      order(ascending)
                      where(
                          Status = filter(Active),
                          Inventory = filter(> 0)
                      );

    ApplicationArea = All;
    UsageCategory = Lists;

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

                field(Status; Rec.Status)
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

When users open this page:

1. Business Central retrieves records from the `Product` table.
2. It applies the specified filters.
3. It sorts the resulting records by `Name` in ascending order.
4. It displays the records in the list.

## 4. Important Things to Remember

- `SourceTable` establishes the page's data source.
- `SourceTableView` defines the default sorting and filtering of that data source.
- `sorting()` uses fields belonging to a key defined on the source table. The fields must be specified in a valid key order.
- `order()` determines the sorting direction.
- `where()` applies filters to the source table.
- `SourceTableView` does not delete or modify records. It only controls which records appear in the page's default view.
- Users may be able to change the displayed view using filters and sorting, depending on the page and its configuration.

## Further Reading

- [SourceTable Property](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-sourcetable-property)
- [SourceTableView Property](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-sourcetableview-pages-property)
