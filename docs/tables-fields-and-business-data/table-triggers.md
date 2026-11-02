# Table Triggers in AL

Table triggers let you execute AL code automatically when certain events happen to a record in a table.

Think of them as **hooks into the record's lifecycle**. For example, when someone inserts a new Course, you might want to validate its price or automatically populate a field.

In AL, table triggers are defined inside the table object, not inside the page.

## The main table triggers

Here are the triggers worth learning first:

| Trigger | When it runs | Common use |
|---|---|---|
| `OnInsert` | When a new record is inserted | Set default values or perform additional checks. |
| `OnModify` | When an existing record is modified | React to changes to a record. |
| `OnDelete` | When a record is deleted | Check whether deletion should be allowed. |
| `OnRename` | When a record's primary key is renamed | Handle logic related to a key change. |
| `OnValidate` | When a field is validated | Check a field's value or update related fields. |
| `OnInit` | When a new record is initialized | Set initial values for a record. |
| `OnInsert` and `OnModify` | These are not interchangeable with `OnValidate` | They handle record operations, while `OnValidate` responds to field validation. |

**Important distinction:** `OnValidate` is a field trigger, whereas `OnInsert`, `OnModify`, `OnDelete`, and `OnRename` are table triggers. We'll see both kinds in practice.

## Let's practise using our Course table

We'll implement a simple business rule:

**A course cannot have a negative price.**

If someone enters a price below zero, Business Central should display an error and reject the value.

Open your existing `Course.Table.al` file and modify the `Price` field as follows:

```al
field(4; Price; Decimal)
{
    Caption = 'Price';
    DataClassification = CustomerContent;

    trigger OnValidate()
    begin
        if Price < 0 then
            Error('Course price cannot be negative.');
    end;
}
```

Keep the rest of your table unchanged.

### Understanding the code

**`trigger OnValidate()`**

Runs when the field's value is validated. This can happen when a user enters a value through a page or when AL code explicitly validates the field.

**`if Price < 0 then`**

Checks whether the price is negative.

**`Error('Course price cannot be negative.');`**

Displays an error and stops the operation. The invalid value won't be accepted through this validation.

Notice that we didn't need to modify our Course List page. Because the rule is defined on the **table field**, it applies wherever that field is validated, rather than being limited to one particular page. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/field/devenv-onvalidate-field-trigger)

### Test it

1. Save your AL file.
2. Press **F5** to publish the extension.
3. Open **Course List** in Business Central.
4. Create a course or edit an existing course.
5. Enter `-100` as its price and validate the field, for example, by pressing Tab or moving to another field.

You should see the error message.

Try entering `100` afterward. That value should pass our custom validation.

**Important:** This rule runs when the field is validated. Simply assigning a value to a field in AL code doesn't necessarily execute its `OnValidate` trigger. When setting a field programmatically and wanting its validation logic to run, use `Record.Validate()`. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-validate-method)

## What about the other triggers?

Now that you've implemented one, here's how to think about the others.

### `OnInsert()`

Runs when a new record is inserted, provided the operation invokes the trigger.

For example, automatically assign a default status to a new course.

```al
trigger OnInsert()
begin
    // Logic to run when a course is inserted.
end;
```

### `OnModify()`

Runs when an existing record is modified, provided the operation invokes the trigger.

```al
trigger OnModify()
begin
    // Logic to run when a course is modified.
end;
```

Be careful about using this trigger to reject changes. Microsoft recommends avoiding logic that can prevent users from saving modifications in `OnModify`. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/tableextension/devenv-onmodify-tableextension-trigger)

### `OnDelete()`

Runs when a record is about to be deleted, provided the operation invokes the trigger.

```al
trigger OnDelete()
begin
    // Logic to run before a course is deleted.
end;
```

For example, you might check whether a course is referenced by other business records before allowing its deletion. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/table/devenv-ondelete-table-trigger)

### `OnRename()`

Runs when a record's primary key is renamed, provided the operation invokes the trigger.

```al
trigger OnRename()
begin
    // Logic related to renaming a course.
end;
```

Our Course table uses `"Course Code"` as its primary key, so this trigger could run when that code is changed through a rename operation. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/tableextension/devenv-onrename-tableextension-trigger)

## Complete Sample

```al
namespace LearningAl;

table 50102 Course
{
    Caption = 'Course';
    DataClassification = CustomerContent;

    fields
    {
        field(1; "Course Code"; Code[20])
        {
            Caption = 'Course Code';
            DataClassification = CustomerContent;
        }

        field(2; CourseName; Text[100])
        {
            Caption = 'Course Name';
            DataClassification = CustomerContent;

            trigger OnValidate()
            begin
                if CourseName = '' then
                    Error('Course name cannot be empty');
            end;
        }

        field(3; CourseDescription; Text[300])
        {
            Caption = 'Course Description';
            DataClassification = CustomerContent;

            trigger OnValidate()
            begin
                if CourseDescription = '' then
                    Error('Course description cannot be empty');
            end;
        }

        field(4; Price; Decimal)
        {
            Caption = 'Price';
            DataClassification = CustomerContent;

            trigger OnValidate()
            begin
                if Price <= 0 then
                    Error('Course price cannot be negative');
            end;
        }
    }

    keys
    {
        key(PK; "Course Code")
        {
            Clustered = true;
        }
    }

    trigger OnInsert()
    begin
        Message('Record inserted successfully');
    end;

    trigger OnModify()
    begin
        Message('Record updated successfully');
    end;

    trigger OnDelete()
    begin
        Message('Record deleted successfully');
    end;
}
```


## One important detail: triggers aren't guaranteed to run for every AL operation

When a user edits a record through the Business Central interface, the system invokes the relevant triggers as part of the normal operation.

However, when you manipulate records directly through AL code, the trigger behavior can depend on the method and its arguments.

For example:

```al
CourseRec.Insert(true);
```

The `true` argument requests execution of the table's `OnInsert` trigger.

Similarly:

```al
CourseRec.Modify(true);
```

The `true` argument requests execution of the table's `OnModify` trigger.

This distinction matters when writing business logic because you shouldn't assume that every database operation automatically executes every relevant trigger. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/tableextension/devenv-oninsert-tableextension-trigger)

## Resources for further reading

- [Table triggers overview — Microsoft Learn](https://learn.microsoft.com/it-it/dynamics365/business-central/dev-itpro/developer/triggers-auto/devenv-triggers)
- [OnValidate field trigger — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/field/devenv-onvalidate-field-trigger)
- [Record.Validate method — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/record/record-validate-method)

### Your takeaway

For now, remember three things:

1. **`OnValidate`** — validate field values and enforce field-level business rules.
2. **`OnInsert`, `OnModify`, `OnDelete`, and `OnRename`** — respond to record lifecycle operations.
3. **Triggers are part of business logic**, so put rules at the appropriate level rather than implementing them only on one page.
