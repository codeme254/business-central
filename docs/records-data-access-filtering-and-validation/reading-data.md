# Reading Data in AL

AL provides several methods for retrieving records from Business Central tables. The most commonly used are `Get()`, `FindFirst()`, `FindLast()`, `FindSet()`, and `Next()`.

## 1. Get()

`Get()` retrieves a **specific record using its primary key**.

```al
var
    ProductRec: Record Product;
begin
    if ProductRec.Get('PROD001') then
        Message('Product: %1', ProductRec.Name)
    else
        Message('Product not found.');
end;
```

Key points:
- Retrieves a record using its primary key.
- Returns `true` if the record exists and `false` otherwise.
- Can accept multiple arguments when the table has a composite primary key.
- Does not use ordinary filters applied through `SetRange()` or `SetFilter()` to locate the record.

**Use it when you know the primary key of the record you want.**

## 2. FindFirst()

`FindFirst()` retrieves the first record matching the current filters and sorting order.

```al
var
    ProductRec: Record Product;
begin
    if ProductRec.FindFirst() then
        Message('First product: %1', ProductRec.Name)
    else
        Message('No products found.');
end;
```

Key points:
- Respects filters applied to the record variable.
- Uses the current key and sort order.
- Returns `true` if a matching record is found.

**Use it when you need the first record in a filtered result set.**

## 3. FindLast()

`FindLast()` retrieves the last record matching the current filters and sorting order.

```al
var
    ProductRec: Record Product;
begin
    if ProductRec.FindLast() then
        Message('Last product: %1', ProductRec.Name)
    else
        Message('No products found.');
end;
```

Key points:
- Respects current filters and sorting.
- Returns `true` if a matching record is found.

**Use it when you need the last record in a filtered result set.**

## 4. FindSet()

`FindSet()` retrieves a set of records matching the current filters.

It is particularly useful when you want to iterate through multiple records.

```al
var
    ProductRec: Record Product;
begin
    if ProductRec.FindSet() then
        repeat
            Message('Product: %1', ProductRec.Name);
        until ProductRec.Next() = 0;
end;
```

Key points:
- Retrieves the complete filtered set of records.
- Returns `true` if records are found.
- Commonly used with `Next()` to iterate through records.
- Can accept a Boolean parameter, `ForUpdate`, when you intend to modify or delete records in the result set.

Example:

```al
if ProductRec.FindSet(true) then
    repeat
        ProductRec.Inventory += 1;
        ProductRec.Modify();
    until ProductRec.Next() = 0;
```

**Use it when you intend to process all records matching your filters.**

## 5. Next()

`Next()` moves the record variable to the next or previous record in the current result set.

```al
ProductRec.Next();
```

By default, it moves forward by one record.

It returns:
- `1` when it successfully moves one record forward.
- `0` when it cannot move any further.
- A negative number when moving backwards.

You can also specify how many records to move:

```al
ProductRec.Next(3);
```

This attempts to move three records forward.

`Next()` is commonly used with `FindSet()` when iterating through records.

## 6. Iterating Through Records

Iteration means going through a collection of records one at a time and performing an operation on each record.

In AL, the common pattern is:

```al
if ProductRec.FindSet() then
    repeat
        // Process current record.
    until ProductRec.Next() = 0;
```

Let's look at a practical example.

### Example: Display all products

```al
codeunit 50100 ProductManager
{
    trigger OnRun()
    var
        ProductRec: Record Product;
    begin
        if ProductRec.FindSet() then
            repeat
                Message(
                    'Product: %1 | Inventory: %2',
                    ProductRec.Name,
                    ProductRec.Inventory
                );
            until ProductRec.Next() = 0;
    end;
}
```

What happens?

1. `FindSet()` retrieves the matching products.
2. AL processes the current product.
3. `Next()` moves to the next product.
4. The loop continues until `Next()` returns `0`.

## 7. Quick Comparison

| Method | Purpose | Typical use |
|---|---|---|
| `Get()` | Retrieves a specific record using its primary key. | Finding a customer by customer number. |
| `FindFirst()` | Retrieves the first matching record. | Getting the first product. |
| `FindLast()` | Retrieves the last matching record. | Getting the last product. |
| `FindSet()` | Retrieves a complete matching set. | Processing multiple products. |
| `Next()` | Moves through records. | Iterating through a result set. |

## Key Takeaways

- `Get()` is for retrieving a specific record using its primary key.
- `FindFirst()` and `FindLast()` retrieve the first and last matching records.
- `FindSet()` is commonly used when processing multiple records.
- `Next()` moves through the result set.
- Always check the Boolean result of `Get()`, `FindFirst()`, `FindLast()`, or `FindSet()` before accessing the retrieved record.
- The common iteration pattern is `FindSet()` followed by `repeat ... until Next() = 0`.

## Further Reading

- [Record.Get()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-get-method)
- [Record.FindFirst()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-findfirst-method)
- [Record.FindLast()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-findlast-method)
- [Record.FindSet()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-findset-method)
- [Record.Next()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-next-method)