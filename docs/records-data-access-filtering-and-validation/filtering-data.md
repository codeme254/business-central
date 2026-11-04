# Filtering Data

## 1. SetRange()

`SetRange()` applies a simple filter to a field. You can filter by a single value or a range of values.

### Syntax

```al
RecordVar.SetRange(Field, Value);
RecordVar.SetRange(Field, FromValue, ToValue);
```

### Examples

```al
// Retrieve active products.
ProductRec.SetRange(Status, ProductRec.Status::Active);

// Retrieve products with inventory between 10 and 100.
ProductRec.SetRange(Inventory, 10, 100);
```

**Use it for simple equality and range filters.**

## 2. SetFilter()

`SetFilter()` applies more flexible filters using filter expressions.

```al
// Inventory greater than 10.
ProductRec.SetFilter(Inventory, '>10');

// Inventory greater than or equal to 10.
ProductRec.SetFilter(Inventory, '>=%1', 10);

// Products whose names start with 'Lap'.
ProductRec.SetFilter(Name, 'Lap*');
```

**SetRange vs SetFilter:**

| SetRange() | SetFilter() |
|---|---|
| Simple equality and range filters. | Flexible filter expressions. |
| Accepts values directly. | Accepts filter expressions and placeholders. |
| `SetRange(Inventory, 10, 100)` | `SetFilter(Inventory, '10..100')` |

**Important:** `SetFilter(Field, '')` does not filter for blank values. Use `SetRange(Field, '')` for that.

## 3. FilterGroup()

`FilterGroup()` allows us to work with different groups of filters on a record variable.

Business Central uses filter groups to separate filters applied by different parts of the application.

For example:

```al
ProductRec.FilterGroup(0);
ProductRec.SetRange(Status, ProductRec.Status::Active);

ProductRec.FilterGroup(2);
ProductRec.SetRange(Inventory, 0, 100);

ProductRec.FilterGroup(0);
```

Here:

- Group `0` is the standard filter group.
- Group `2` is a separate filter group.
- Filters from different groups are combined when retrieving records.
- Changing the filter group does not remove filters from other groups.

Some important groups:

| Group | Purpose |
|---|---|
| `-1` | Cross-column search. |
| `0` | Standard filters, including user filters. |
| `1` | Global filters. |
| `2`–`7` | Reserved for special application purposes. |

You can also define your own filter groups within the supported range.

**Important:** Always be careful when changing filter groups. Some groups have special system behavior.

## 4. Reset()

`Reset()` clears the record variable's current filters and restores its default view.

```al
ProductRec.Reset();
```

It does more than remove filters:

- Removes all filters.
- Removes marks.
- Resets the current key to the primary key.
- Resets selected fields for loading.
- Restores the default read isolation level.
- Clears AL variables defined on the table.

**Use it when you want to start working with a clean record view.**

It does not delete or modify database records.

## 5. SetCurrentKey()

`SetCurrentKey()` specifies the key used to sort records.

```al
ProductRec.SetCurrentKey(Name);
```

You can also specify multiple fields:

```al
ProductRec.SetCurrentKey(Category, Name);
```

This selects a matching table key and requests sorting based on its field sequence.

**Important:** The specified fields must match the beginning of an existing key. The method returns a Boolean indicating whether a matching key was found.

Example:

```al
if ProductRec.SetCurrentKey(Name) then
    if ProductRec.FindFirst() then
        Message('%1', ProductRec.Name);
```

## 6. Filters and Record Views

A record view describes how records are filtered and sorted.

It consists primarily of:

- The current key.
- The sorting order.
- The applied filters.

AL provides two useful methods for working with record views:

### GetView()

Returns the current view as a text string.

```al
Message(ProductRec.GetView());
```

### SetView()

Applies a view specified as a text string.

```al
ProductRec.SetView('SORTING(Name) ORDER(Ascending) WHERE(Status=FILTER(Active))');
```

This sets the sorting and filtering for the record variable.

**Remember:** `GetView()` retrieves a view, while `SetView()` applies one.

## 7. Putting Everything Together

```al
var
    ProductRec: Record Product;
begin
    // Apply filters.
    ProductRec.SetRange(Status, ProductRec.Status::Active);
    ProductRec.SetFilter(Inventory, '>0');

    // Set sorting.
    ProductRec.SetCurrentKey(Name);

    // Retrieve matching products.
    if ProductRec.FindSet() then
        repeat
            Message('%1 - %2', ProductRec.Name, ProductRec.Inventory);
        until ProductRec.Next() = 0;

    // Clear filters and restore default view.
    ProductRec.Reset();
end;
```

## Quick Comparison

| Method | Purpose |
|---|---|
| `SetRange()` | Applies simple filters. |
| `SetFilter()` | Applies flexible filters. |
| `FilterGroup()` | Changes the active filter group. |
| `Reset()` | Clears filters and resets the record view and other record state. |
| `SetCurrentKey()` | Specifies the sorting key. |
| `GetView()` | Retrieves the current record view. |
| `SetView()` | Applies a record view. |

## Further Reading

- [Record.SetRange()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-setrange-method)
- [Record.SetFilter()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-setfilter-method)
- [Record.FilterGroup()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-filtergroup-method)
- [Record.Reset()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-reset-method)
- [Record.SetCurrentKey()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-setcurrentkey-method)
- [Record.GetView()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-getview-method)
- [Record.SetView()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-setview-method)