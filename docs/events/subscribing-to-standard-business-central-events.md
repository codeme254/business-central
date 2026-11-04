# Subscribing to Standard Business Central Events

Business Central provides standard events that developers can subscribe to when they want to respond to existing application functionality.

Instead of modifying Microsoft's base application code, we create event subscribers in our extensions.

## Example: Customer Table Events

Business Central provides several standard table trigger events:

| Event | When it executes |
|---|---|
| `OnBeforeInsertEvent` | Before a record is inserted. |
| `OnAfterInsertEvent` | After a record is inserted. |
| `OnBeforeModifyEvent` | Before a record is modified. |
| `OnAfterModifyEvent` | After a record is modified. |
| `OnBeforeDeleteEvent` | Before a record is deleted. |
| `OnAfterDeleteEvent` | After a record is deleted. |

## Creating a Subscriber

Suppose we want to display a message whenever a new customer is inserted.

```al
codeunit 50100 CustomerSubscribers
{
    [EventSubscriber(
        ObjectType::Table,
        Database::Customer,
        'OnAfterInsertEvent',
        '',
        false,
        false)]
    local procedure AfterCustomerInsert(
        var Rec: Record Customer;
        RunTrigger: Boolean)
    begin
        Message('New customer created: %1', Rec.Name);
    end;
}
```

### Understanding the Code

- `ObjectType::Table`: We are subscribing to a table event.
- `Database::Customer`: The Customer table publishes the event.
- `OnAfterInsertEvent`: We want to respond after a record is inserted.
- `Rec`: Represents the customer record involved in the operation.
- `RunTrigger`: Indicates whether the table's `OnInsert` trigger was executed.

Notice that we didn't create an event publisher or explicitly raise the event.

Business Central raises this system event automatically when the corresponding database operation occurs.

## Discovering Standard Events

How do you know which events are available?

You can use:

- **VS Code IntelliSense:** Helps discover available events and their parameters.
- **AL Event Subscriber snippet:** Type `teventsub` to generate subscriber syntax.
- **Event Recorder:** Records events raised while you perform operations in Business Central, helping you discover which events are triggered by a particular process.

You can also inspect Microsoft's application source code and downloaded AL symbols.

## Key Takeaways

- Business Central provides standard events for tables, pages and codeunits.
- You can subscribe to these events without modifying Microsoft's base application.
- Table events are particularly useful for responding to database operations.
- `OnBefore...` events allow you to execute logic before an operation.
- `OnAfter...` events allow you to execute logic after an operation.
- Event Recorder helps discover which events are raised during application processes.