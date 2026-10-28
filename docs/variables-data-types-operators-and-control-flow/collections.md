# Collections in AL

Collections allow us to store multiple values in a single variable. AL provides three main collection types:

- **Arrays** — store a fixed number of elements of the same data type.
- **Lists** — store an ordered, dynamically sized collection of elements of the same data type.
- **Dictionaries** — store key-value pairs, allowing us to retrieve values using their keys.

## Arrays

An array stores a fixed number of elements of the same data type. Each element is accessed using its index, starting at **1**.

### Declaration and Initialization

```al
var
    Scores: array[5] of Integer;
begin
    Scores[1] := 85;
    Scores[2] := 90;
    Scores[3] := 78;

    Message('First score: %1', Scores[1]);
end;
```

Here, `Scores` can hold five integers. The remaining elements are still available even though we haven't assigned values to them.

```al
namespace LearningAl;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        Scores: array[5] of Integer;
        Count: Integer;
    begin
        Scores[1] := 10;
        Scores[2] := 20;
        Scores[3] := 30;
        Scores[4] := 40;
        Scores[5] := 50;

        // Get the length of an array using ArrayLen method
        Message('The array has %1 elements', ArrayLen(Scores));
        for Count := 1 to 5 do
            Message('Scores[%1] = %2', Count, Scores[Count]);
    end;
}
```

### Multidimensional Arrays

Arrays can have multiple dimensions, useful for representing data arranged in rows and columns.

```al
var
    Grid: array[3, 3] of Integer;
begin
    Grid[1, 1] := 10;
    Grid[1, 2] := 20;
    Grid[2, 1] := 30;
end;
```

### Looping Through an Array

Use a `for` loop to iterate through its elements.

```al
var
    Scores: array[3] of Integer;
    Index: Integer;
begin
    Scores[1] := 80;
    Scores[2] := 90;
    Scores[3] := 70;

    for Index := 1 to 3 do
        Message('Score: %1', Scores[Index]);
end;
```

### Array Considerations

- The dimensions are specified at declaration and cannot be dynamically resized.
- Array indexes start at `1`, not `0`.
- Arrays do not have the same built-in collection methods as lists and dictionaries.
- You can read or modify an element using its index.

**Useful resource:** [Microsoft Learn — Array methods](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods/devenv-array-methods)

---

## Lists

A `List` stores an ordered collection of elements of the same type. Unlike an array, its size can grow or shrink dynamically.

### Declaration and Adding Elements

```al
var
    CustomerNames: List of [Text];
begin
    CustomerNames.Add('Alice');
    CustomerNames.Add('Bob');
    CustomerNames.Add('Charlie');

    Message('Number of customers: %1', CustomerNames.Count());
end;
```

`List of [Text]` means the list stores text values. You can also declare lists of other supported types, such as `Integer` or `Decimal`.

### Accessing Elements

Use `Get()` to retrieve an element by its one-based index.

```al
var
    CustomerNames: List of [Text];
    CustomerName: Text;
begin
    CustomerNames.Add('Alice');
    CustomerNames.Add('Bob');

    CustomerName := CustomerNames.Get(2);

    Message('Customer: %1', CustomerName);
end;
```

This displays `Bob`.

### Looping Through a List

Use `foreach` to process every element without manually managing an index.

```al
var
    CustomerNames: List of [Text];
    CustomerName: Text;
begin
    CustomerNames.Add('Alice');
    CustomerNames.Add('Bob');
    CustomerNames.Add('Charlie');

    foreach CustomerName in CustomerNames do
        Message('Customer: %1', CustomerName);
end;
```

### Common List Methods

| Method | Purpose |
|---|---|
| `Add(Value)` | Adds an element to the end of the list. |
| `AddRange(...)` | Adds multiple elements or another list's elements. |
| `Count()` | Returns the number of elements. |
| `Contains(Value)` | Checks whether an element exists. |
| `Get(Index)` | Retrieves an element by its index. |
| `Set(Index, Value)` | Replaces an element at a specified index. |
| `IndexOf(Value)` | Returns the one-based index of the first matching element. |
| `LastIndexOf(Value)` | Returns the one-based index of the last matching element. |
| `Insert(Index, Value)` | Inserts an element at a specified index. |
| `Remove(Value)` | Removes the first occurrence of a value. |
| `RemoveAt(Index)` | Removes an element at a specified index. |
| `RemoveRange(Index, Count)` | Removes a range of elements. |
| `Reverse()` | Reverses the order of the elements. |
| `GetRange(Index, Count)` | Retrieves a range of elements as a new list. |

```al
namespace LearningAl;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        Scores: List of [Integer];
        Count: Integer;
        Score: Integer;
    begin
        for Count := 1 to 5 do
            // Use the Add method to add elements to a list
            Scores.Add(Count * 10);

        for Count := 1 to Scores.Count() do
            // Use Get() to retrieve by index
            Message('Score is %1', Scores.Get(Count));

        // Use foreach to loop a list if you don't want to manage indexes manually
        foreach Score in Scores do
            Message('Score is %1', Score);
    end;
}
```

### Finding and Removing Elements

```al
var
    Products: List of [Text];
    Removed: Boolean;
begin
    Products.Add('Laptop');
    Products.Add('Keyboard');
    Products.Add('Mouse');

    if Products.Contains('Keyboard') then
        Message('Keyboard found');

    Removed := Products.Remove('Keyboard');

    if Removed then
        Message('Keyboard removed');
end;
```

**Important:** `Remove(Value)` removes the first occurrence of a matching value. If you need to remove an element by position, use `RemoveAt(Index)`.

Methods such as `Remove()` and `RemoveAt()` can return a Boolean indicating whether the operation succeeded.

**Useful resource:** [Microsoft Learn — List data type and methods](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/list/list-data-type)

---

## Dictionaries

A `Dictionary` stores values as key-value pairs.

Each entry consists of:
- **Key:** Uniquely identifies an entry.
- **Value:** The data associated with that key.

Unlike a list, a dictionary is designed to retrieve values using keys rather than numeric positions.

### Declaration and Adding Elements

```al
var
    ProductPrices: Dictionary of [Text, Decimal];
begin
    ProductPrices.Add('Laptop', 75000);
    ProductPrices.Add('Keyboard', 2500);
    ProductPrices.Add('Mouse', 1200);

    Message('Laptop price: %1', ProductPrices.Get('Laptop'));
end;
```

In this example:
- The key type is `Text`.
- The value type is `Decimal`.
- Each product name is a unique key associated with a price.

### Retrieving Values

Use `Get(Key)` to retrieve a value associated with a key.

```al
var
    ProductPrices: Dictionary of [Text, Decimal];
    Price: Decimal;
begin
    ProductPrices.Add('Laptop', 75000);

    Price := ProductPrices.Get('Laptop');

    Message('Price: %1', Price);
end;
```

**Caution:** Calling `Get(Key)` when the key does not exist can cause a runtime error. Use `ContainsKey()` when you need to check first.

```al
if ProductPrices.ContainsKey('Laptop') then
    Message('Price: %1', ProductPrices.Get('Laptop'))
else
    Message('Product not found');
```

### Updating Values

Use `Set(Key, Value)` to associate a key with a new value.

```al
ProductPrices.Set('Laptop', 80000);
```

This updates the laptop's price to `80000`. The key must already exist for `Set()` to succeed.

### Removing Entries

```al
var
    Removed: Boolean;
begin
    Removed := ProductPrices.Remove('Mouse');

    if Removed then
        Message('Mouse removed');
end;
```

`Remove(Key)` removes the entry associated with the specified key and returns a Boolean indicating whether the removal succeeded.

### Common Dictionary Methods

| Method | Purpose |
|---|---|
| `Add(Key, Value)` | Adds a new key-value pair. |
| `ContainsKey(Key)` | Checks whether a key exists. |
| `Count()` | Returns the number of entries. |
| `Get(Key)` | Retrieves the value associated with a key. |
| `Set(Key, Value)` | Updates the value associated with an existing key. |
| `Remove(Key)` | Removes an entry by its key. |
| `Keys()` | Returns a list containing the dictionary's keys. |
| `Values()` | Returns a list containing its values. |

**Important:** Dictionary keys must be unique. Attempting to add a key that already exists can fail. Check `ContainsKey()` when appropriate.

### Looping Through Dictionary Entries

Use `Keys()` to obtain the keys, then retrieve each corresponding value.

```al
var
    ProductPrices: Dictionary of [Text, Decimal];
    ProductNames: List of [Text];
    ProductName: Text;
begin
    ProductPrices.Add('Laptop', 75000);
    ProductPrices.Add('Keyboard', 2500);
    ProductPrices.Add('Mouse', 1200);

    ProductNames := ProductPrices.Keys();

    foreach ProductName in ProductNames do
        Message('%1 costs %2', ProductName, ProductPrices.Get(ProductName));
end;
```

This lets us process each product and its associated price.

**Note:** A dictionary is an unordered collection. Do not rely on its keys or values being returned in a particular order.

**Useful resource:** [Microsoft Learn — Dictionary data type and methods](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/dictionary/dictionary-data-type)

---

## Choosing the Right Collection

| Feature | Array | List | Dictionary |
|---|---|---|---|
| Stores multiple values | Yes | Yes | Yes |
| Dynamic size | No | Yes | Yes |
| Access by numeric index | Yes | Yes | No |
| Access by key | No | No | Yes |
| Duplicate values allowed | Yes | Yes | Values can repeat; keys must be unique |
| Built-in search methods | Limited | Yes | Yes |
| Typical use | Fixed-size data | Ordered collections | Key-value lookups |

### Which Should You Use?

- **Array:** When the number of elements is fixed and known in advance.
- **List:** When you need an ordered collection that can grow or shrink.
- **Dictionary:** When you need to associate keys with values and retrieve values by key.

### Important AL Considerations

1. **Indexing:** Arrays and lists use one-based indexes, so their first element is at index `1`.
2. **Bounds:** Accessing an invalid array or list index can cause a runtime error. Check the valid range when necessary.
3. **Type safety:** A list's elements share one declared type, and a dictionary has declared key and value types.
4. **Lists and dictionaries are reference types:** Assigning one collection variable to another does not create an independent copy. Both variables can refer to the same underlying collection.
5. **Collection versus database:** These collections hold data in memory. If you need to store and manage persistent Business Central business records, use tables and AL record operations instead.
