# Triggers and When They Execute

In AL, **triggers are special code blocks that execute automatically when a particular event occurs**. They allow us to respond to actions such as opening a page, inserting a record, or modifying a field.

## Page Triggers

Page triggers execute in response to events involving a page.

| Trigger | When It Executes |
|---|---|
| `OnInit` | When the page is initialized, before its normal initialization process completes. |
| `OnOpenPage` | When the page is opened. |
| `OnAfterGetRecord` | When a record is retrieved and made available to the page. |
| `OnAfterGetCurrRecord` | After the current record has been retrieved. |
| `OnClosePage` | When the page is closed. |

### Example

**File:** `CustomerList.PageExt.al`

```al
pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage()
    begin
        Message('The Customer List page has opened.');
    end;
}
```

When a user opens the Customer List page, the `OnOpenPage` trigger executes and displays the message.

## Table Triggers

Table triggers execute in response to operations involving table records.

| Trigger | When It Executes |
|---|---|
| `OnInsert` | When a record is inserted through the AL record insertion process. |
| `OnModify` | When an existing record is modified through the AL record modification process. |
| `OnDelete` | When a record is deleted through the AL record deletion process. |
| `OnRename` | When a record's primary key is changed through the AL record renaming process. |
| `OnBeforeInsertEvent` | When the corresponding table event is raised before a record is inserted. |
| `OnAfterInsertEvent` | When the corresponding table event is raised after a record is inserted. |

### Example

```al
tableextension 50101 CustomerTableExt extends Customer
{
    trigger OnAfterInsert()
    begin
        Message('A customer record has been inserted.');
    end;
}
```

**Important:** `OnAfterInsert()` is not a table trigger in AL. The table trigger is `OnInsert()`. To subscribe to the after-insert table event, use an event subscriber such as `[EventSubscriber(ObjectType::Table, Database::Customer, 'OnAfterInsertEvent', '', false, false)]`.

For example, a table extension can use `OnInsert()` to execute logic as part of the insertion process.

## Field Triggers

Field triggers execute in response to changes to table fields.

| Trigger | When It Executes |
|---|---|
| `OnValidate` | When a field is validated, allowing you to check or react to its value. |

### Example

```al
tableextension 50102 CustomerTableExt extends Customer
{
    fields
    {
        modify(Name)
        {
            trigger OnAfterValidate()
            begin
                Message('The customer name has been validated.');
            end;
        }
    }
}
```

Here, `OnAfterValidate()` runs after the `Name` field's validation logic completes.

## Codeunit Triggers

| Trigger | When It Executes |
|---|---|
| `OnRun` | When the codeunit is executed, for example, through `Codeunit.Run()`. |

### Example

```al
codeunit 50103 GreetingCodeunit
{
    trigger OnRun()
    begin
        Message('The codeunit is running.');
    end;
}
```

The message appears when this codeunit is executed.

## Key Takeaways

- Triggers let you execute code in response to specific events.
- Different triggers belong to different AL objects.
- The trigger's execution depends on the event or operation that activates it.

## Further Reading

- [Page triggers — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/page/devenv-page-triggers)
- [Table triggers — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/table/devenv-table-triggers)
- [Field triggers — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/field/devenv-field-triggers)
- [Codeunit triggers — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/codeunit/devenv-codeunit-triggers)
- [Event subscribers — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-events-in-al)