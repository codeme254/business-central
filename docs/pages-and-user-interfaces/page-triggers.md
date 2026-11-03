# Page Triggers in AL

## Introduction

In Business Central, **Page Triggers** are predefined execution points that allow developers to execute AL code in response to specific events occurring within a page.

For example, imagine we have a Product Card page.

We might want to:

- Display a welcome message when the page opens.
- Perform calculations when a record is retrieved.
- Initialize default values when a new product is created.
- Validate information when a user changes a field.
- Execute custom logic when a user closes the page.

Instead of manually calling these operations, we use page triggers to execute code automatically when the corresponding events occur.

**Key idea:** Page triggers allow us to control how a page behaves during its lifecycle and when users interact with it.

## Declaring Page Triggers

Page triggers are declared inside the page object using the `trigger` keyword.

**General syntax:**

```al
trigger TriggerName()
begin
    // AL statements
end;
```

For example:

```al
page 50100 ProductCard
{
    PageType = Card;
    SourceTable = Product;

    trigger OnOpenPage()
    begin
        Message('Welcome to the Product Card!');
    end;
}
```

Here, `OnOpenPage()` executes when the page is opened.

Notice that we don't manually call the trigger. Business Central invokes it automatically when the corresponding event occurs.

## Common Page Triggers

Let's explore the important page triggers you'll encounter when developing Business Central extensions.

### OnInit

The `OnInit` trigger executes when the page is initialized, immediately after its variables have been cleared and the page is loaded.

It is commonly used to initialize page variables and configure properties.

**Example:**

```al
trigger OnInit()
begin
    Message('Initializing Product Card...');
end;
```

**When to use it:** When you need to initialize variables or configure dynamic properties during page initialization.

**Important:** At this stage, the page controls haven't been instantiated. Therefore, you cannot interact with controls or call control add-in methods from this trigger.

### OnOpenPage

The `OnOpenPage` trigger executes after the page has been initialized and run.

It is useful when you need to perform operations as the page opens.

**Example:**

```al
trigger OnOpenPage()
begin
    Message('Product Card opened successfully!');
end;
```

**When to use it:**
- Initializing page-specific behavior.
- Applying filters.
- Configuring dynamic properties.
- Performing initialization logic when the page opens.

One particularly important use is dynamically controlling the `Visible` property of page columns.

**Important:** If an error occurs in this trigger, the page closes.

### OnClosePage

The `OnClosePage` trigger executes when a page closes, after the `OnQueryClosePage` trigger has been executed.

**Example:**

```al
trigger OnClosePage()
begin
    Message('Product Card closed.');
end;
```

**When to use it:** When you need to execute cleanup or other logic as a page closes.

**Important:** This trigger is only invoked when the page is hosted in a modal popup window (MPO). Don't assume it executes whenever any page closes.

### OnQueryClosePage

The `OnQueryClosePage` trigger executes when Business Central is about to close a page.

Unlike `OnClosePage`, this trigger allows you to control whether the page should be closed.

**Example:**

```al
trigger OnQueryClosePage(CloseAction: Action): Boolean
begin
    exit(Confirm('Are you sure you want to close this page?'));
end;
```

Here:

- `Confirm()` asks the user to confirm the operation.
- `exit()` returns the result of the confirmation.
- If the user selects Yes, the page can close.
- If the user selects No, the page remains open.

**When to use it:** When you need to perform checks or obtain confirmation before allowing a page to close.

### OnAfterGetRecord

The `OnAfterGetRecord` trigger executes after a record has been retrieved from the source table but before it is displayed to the user.

It is particularly useful when working with calculated values that depend on the current record.

**Example:**

```al
trigger OnAfterGetRecord()
begin
    Message('Retrieved product: %1', Rec.Name);
end;
```

**When to use it:** When you need to calculate or initialize values based on the record currently being retrieved.

**Important distinction:** This trigger is not limited to the record currently selected by the user.

For example, on a List page, Business Central can retrieve several records in batches. Consequently, `OnAfterGetRecord` can execute for multiple records before the page is displayed.

This is particularly important when working with List pages.

### OnAfterGetCurrRecord

The `OnAfterGetCurrRecord` trigger executes after Business Central retrieves the current record.

Unlike `OnAfterGetRecord`, this trigger specifically relates to the current record in the page.

**Example:**

```al
trigger OnAfterGetCurrRecord()
begin
    Message('Current product: %1', Rec.Name);
end;
```

**When to use it:** When you need to execute logic based on the currently selected record.

For example, you might want to update certain page variables whenever the user navigates between products.

**Remember:**

| Trigger | Purpose |
|---|---|
| `OnAfterGetRecord` | Executes when a record is retrieved, before it is displayed. |
| `OnAfterGetCurrRecord` | Executes after the current record is retrieved. |

This distinction is especially important when working with List pages.

### OnNewRecord

The `OnNewRecord` trigger executes after a new record has been initialized but before it is inserted into the table.

It is commonly used to assign default values to newly created records.

**Example:**

```al
trigger OnNewRecord(BelowxRec: Boolean)
begin
    Rec."Unit Price" := 0;
    Rec.Inventory := 0;
end;
```

Here, whenever a user creates a new product through the page, the Unit Price and Inventory fields are initialized to zero.

**When to use it:** When you need to initialize values or perform other operations before a new record is inserted.

### OnInsertRecord

The `OnInsertRecord` trigger executes before a new record is inserted into the table.

It allows you to perform additional checks before allowing the insertion.

**Example:**

```al
trigger OnInsertRecord(BelowxRec: Boolean): Boolean
begin
    if Rec.Name = '' then
        Error('Product name cannot be empty.');

    exit(true);
end;
```

Here:

- Business Central checks whether the product name is empty.
- If it is empty, `Error()` stops the insertion.
- Otherwise, `exit(true)` allows the insertion to proceed.

The Boolean return value determines whether the insertion is allowed:

| Return value | Meaning |
|---|---|
| `true` | Allow the insertion. |
| `false` | Cancel the insertion. |

**When to use it:** When you need to perform page-specific checks before a new record is inserted.

### OnModifyRecord

The `OnModifyRecord` trigger executes before an existing record is modified in the table.

It allows you to perform checks before accepting modifications.

**Example:**

```al
trigger OnModifyRecord(): Boolean
begin
    if Rec."Unit Price" < 0 then
        Error('Unit Price cannot be negative.');

    exit(true);
end;
```

Here, Business Central checks whether the product's unit price is negative before allowing the modification.

The Boolean return value determines whether the modification is allowed.

| Return value | Meaning |
|---|---|
| `true` | Allow the modification. |
| `false` | Cancel the modification. |

**When to use it:** When you need to execute page-specific validation or checks before modifying a record.

### OnDeleteRecord

The `OnDeleteRecord` trigger executes before a record is deleted from the table.

It allows you to perform additional checks before allowing the deletion.

**Example:**

```al
trigger OnDeleteRecord(): Boolean
begin
    if Rec.Inventory > 0 then
        Error('Cannot delete a product with available inventory.');

    exit(true);
end;
```

Here, Business Central checks whether the product has available inventory before allowing its deletion.

The Boolean return value determines whether deletion is allowed.

| Return value | Meaning |
|---|---|
| `true` | Allow deletion. |
| `false` | Cancel deletion. |

**When to use it:** When you need to enforce page-specific restrictions before a record is deleted.

### OnValidate (Page Field)

So far, we've looked at triggers associated with the page itself.

However, individual page fields can also have triggers.

One important example is the `OnValidate` trigger.

It executes when a user changes a field's value and the field is validated.

**Example:**

```al
field("Unit Price"; Rec."Unit Price")
{
    ApplicationArea = All;

    trigger OnValidate()
    begin
        if Rec."Unit Price" < 0 then
            Error('Unit Price cannot be negative.');
    end;
}
```

Here, whenever a user changes the Unit Price field, Business Central checks whether the entered value is negative.

If it is, an error is displayed.

**Important distinction:**

There are two places where you can define an `OnValidate` trigger:

1. **Table field OnValidate:** Defined on a table field. It implements validation logic associated with that field, regardless of which page is used to modify it.
2. **Page field OnValidate:** Defined on a page field control. It implements validation logic specific to that page control.

Generally, business rules that must apply regardless of where data is modified should be implemented at the table level.

We'll explore table triggers in a separate topic.

## Understanding Page Trigger Execution

It's useful to understand the general order in which some of these triggers execute.

When a page is opened, the general sequence is:

```text
Page Initialization
       |
       v
    OnInit
       |
       v
   OnOpenPage
       |
       v
 Records Retrieved
       |
       v
 OnAfterGetRecord
       |
       v
OnAfterGetCurrRecord
       |
       v
 Page Interaction
       |
       v
  OnQueryClosePage
       |
       v
   OnClosePage
```

This is an illustrative overview, not a guaranteed complete execution sequence for every page.

For example, record retrieval triggers can execute multiple times as users navigate through a page or as Business Central loads additional records.

Also, `OnClosePage` only executes in its supported modal-page scenario.

## Page Triggers vs Table Triggers

This is an important distinction to understand as you continue learning AL.

Although both page triggers and table triggers execute AL code automatically, they serve different purposes.

| Page Triggers | Table Triggers |
|---|---|
| Associated with page objects. | Associated with table objects. |
| Handle page lifecycle and user interactions. | Handle record and field operations. |
| Can execute when a page opens or closes. | Execute when records are inserted, modified, or deleted. |
| Can implement page-specific validation. | Can implement business rules that apply across different pages and operations. |

For example, suppose we want to prevent users from entering a negative product price.

If we implement the validation only in a page's `OnValidate` trigger, another process that modifies the table directly might bypass that page-specific validation.

If the rule is implemented in the table field's `OnValidate` trigger, it can apply wherever that field is validated.

**General rule:** Put business rules at the table level when they must apply consistently across the application. Use page triggers for behavior specific to the user interface.

## Key Takeaways

- Page triggers are predefined execution points invoked automatically by Business Central.
- `OnInit` initializes page variables.
- `OnOpenPage` executes when a page opens.
- `OnClosePage` executes when a supported modal page closes.
- `OnQueryClosePage` allows you to control whether a page can close.
- `OnAfterGetRecord` executes when records are retrieved.
- `OnAfterGetCurrRecord` executes after the current record is retrieved.
- `OnNewRecord` initializes a new record before insertion.
- `OnInsertRecord`, `OnModifyRecord`, and `OnDeleteRecord` allow you to control record operations through a page.
- `OnValidate` can be defined on individual page fields.
- Page triggers should not replace table-level business validation.

## Further Reading

1. [Microsoft Learn – OnInit Trigger](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/page/devenv-oninit-page-trigger)
2. [Microsoft Learn – OnOpenPage Trigger](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/page/devenv-onopenpage-page-trigger)
3. [Microsoft Learn – OnAfterGetRecord Trigger](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/page/devenv-onaftergetrecord-page-trigger)
4. [Microsoft Learn – OnNewRecord Trigger](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/page/devenv-onnewrecord-page-trigger)

---

## Practical Exercise

Let's use your existing `ProductCard` page.

Implement the following:

1. **OnOpenPage:** Display a message welcoming the user to the Product Card.
2. **OnNewRecord:** Initialize the Unit Price and Inventory fields to zero.
3. **OnAfterGetCurrRecord:** Display the name of the currently selected product.
4. **OnModifyRecord:** Prevent users from saving a product with a negative Unit Price.
5. **OnDeleteRecord:** Prevent users from deleting products whose Inventory is greater than zero.

Publish your extension and test each trigger.

**One challenge:** Try creating a new product and observe when `OnNewRecord` executes relative to `OnInsertRecord`.
