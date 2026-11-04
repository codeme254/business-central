# Modifying Data in AL

AL provides methods for inserting, updating, and deleting records in Business Central tables.

## 1. Insert()

`Insert()` inserts a new record into a database table.

```al
var
    ProductRec: Record Product;
begin
    ProductRec.Init();

    ProductRec."No." := 'PROD001';
    ProductRec.Name := 'Laptop';
    ProductRec.Inventory := 20;

    ProductRec.Insert();
end;
```

Key points:
- `Init()` initializes the record's fields to their default values.
- Assign values to the required fields before inserting.
- `Insert()` saves the new record to the database.
- Returns `true` if successful, otherwise `false`.
- `Insert()` without arguments does not execute the table's `OnInsert` trigger.

To execute the trigger:

```al
ProductRec.Insert(true);
```

## 2. Validate()

`Validate()` assigns a value to a field and executes that field's `OnValidate` trigger.

```al
ProductRec.Validate(Name, 'Laptop');
```

You can also validate a value that has already been assigned:

```al
ProductRec.Name := 'Laptop';
ProductRec.Validate(Name);
```

**Why use Validate() instead of direct assignment?**

Consider a field whose `OnValidate` trigger performs additional calculations or checks business rules.

Direct assignment:

```al
ProductRec.Inventory := 20;
```

Does not execute the field's `OnValidate` trigger.

Using Validate:

```al
ProductRec.Validate(Inventory, 20);
```

Executes the field's validation logic.

**Important:** `Validate()` does not save the record to the database. You still need `Insert()` or `Modify()`.

## 3. Modify()

`Modify()` saves changes made to an existing record.

```al
if ProductRec.Get('PROD001') then begin
    ProductRec.Validate(Name, 'Gaming Laptop');
    ProductRec.Modify();
end;
```

Key points:
- Used to update existing records.
- Returns a Boolean indicating whether the operation succeeded.
- `Modify()` does not execute the table's `OnModify` trigger by default.
- Use `Modify(true)` to execute the trigger.

```al
ProductRec.Modify(true);
```

## 4. Delete()

`Delete()` removes the current record from the database.

```al
if ProductRec.Get('PROD001') then
    ProductRec.Delete();
```

Key points:
- Deletes the current record.
- Returns a Boolean indicating success.
- `Delete()` does not execute the table's `OnDelete` trigger by default.
- Use `Delete(true)` to execute the trigger.

## 5. DeleteAll()

`DeleteAll()` deletes all records matching the current filters.

```al
ProductRec.SetRange(Status, ProductRec.Status::Inactive);

ProductRec.DeleteAll();
```

This deletes all inactive products.

**Important:**
- If no filters are applied, `DeleteAll()` deletes every record in the table.
- By default, the table's `OnDelete` trigger is not executed.
- Use `DeleteAll(true)` to execute the `OnDelete` trigger.

Be extremely careful when using this method without filters!

## 6. ModifyAll()

`ModifyAll()` updates a particular field across all records matching the current filters.

### Syntax

```al
RecordVar.ModifyAll(Field, NewValue, RunTrigger);
```

### Example

```al
ProductRec.SetRange(Status, ProductRec.Status::Active);

ProductRec.ModifyAll(Status, ProductRec.Status::Inactive);
```

This changes the status of all active products to inactive.

Key points:
- Updates multiple records at once.
- Respects the current filters.
- If no filters are applied, it updates all records in the table.
- The optional `RunTrigger` parameter controls whether the table's `OnModify` trigger executes.
- The field's `OnValidate` trigger is NEVER executed by `ModifyAll()`, even when `RunTrigger` is true.

**Use it when you need to update the same field across multiple records without individually processing each record.**

## 7. Quick Comparison

| Method | Purpose |
|---|---|
| `Insert()` | Creates a new record. |
| `Validate()` | Assigns a value and executes field validation logic. |
| `Modify()` | Saves changes to an existing record. |
| `Delete()` | Deletes the current record. |
| `DeleteAll()` | Deletes all records matching the current filters. |
| `ModifyAll()` | Updates a field across all matching records. |

## Key Takeaways

- `Insert()` creates records; `Modify()` updates existing records.
- `Validate()` executes field-level validation logic but does not save records.
- `Modify()` and `Delete()` operate on the current record.
- `DeleteAll()` and `ModifyAll()` operate on sets of records.
- The optional `RunTrigger` parameter controls execution of the corresponding table trigger.
- `ModifyAll()` never executes field-level `OnValidate` triggers.
- Always be careful with `DeleteAll()` and `ModifyAll()` when no filters are applied.

## Further Reading

- [Record.Insert()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-insert--method)
- [Record.Validate()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-validate-method)
- [Record.Modify()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-modify-method)
- [Record.Delete()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-delete-method)
- [Record.DeleteAll()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-deleteall-method)
- [Record.ModifyAll()](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-modifyall-method)