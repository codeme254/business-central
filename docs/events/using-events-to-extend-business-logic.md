# Using Events to Extend Existing Business Logic

In Business Central, developers can use events to extend existing application functionality without modifying Microsoft's base application code.

This is particularly useful when customizing standard business processes.

## How It Works

Suppose Business Central has a standard process for creating customers.

We want to introduce additional functionality, such as sending a notification whenever a customer is created.

Instead of modifying Microsoft's customer creation logic:

1. Identify an appropriate event published by Business Central.
2. Create an event subscriber in your extension.
3. Implement the additional business logic inside the subscriber.
4. Business Central executes the subscriber when the event is raised.

## Example: Extending Customer Creation

Suppose we want to display a notification whenever a customer is inserted.

We can subscribe to the standard Customer table event:

```al id="wq8v2n"
codeunit 50100 CustomerExtension
{
    [EventSubscriber(
        ObjectType::Table,
        Database::Customer,
        'OnAfterInsertEvent',
        '',
        false,
        false)]
    local procedure NotifyCustomerCreated(
        var Rec: Record Customer;
        RunTrigger: Boolean)
    begin
        Message('Customer %1 has been created.', Rec.Name);
    end;
}
```

We haven't modified the original customer creation process.

We've simply added our own behaviour that executes when the appropriate event occurs.

## Why Use Events?

- **Upgrade compatibility:** Avoid modifying Microsoft's base application, making upgrades easier.
- **Loose coupling:** The original application doesn't need to know about your extension's additional functionality.
- **Maintainability:** Custom logic remains separate from standard application logic.
- **Extensibility:** Multiple extensions can respond to the same event.

## Important Considerations

- Choose the appropriate event for the business operation.
- Prefer standard Business Central events where suitable.
- Avoid placing excessive or unrelated logic inside subscribers.
- Be careful with `OnBefore` and `OnAfter` events, especially when modifying records or influencing business processes.
- Avoid introducing unnecessary dependencies between extensions.

## Key Takeaway

Events allow developers to extend existing Business Central business logic by subscribing to published events and executing additional functionality without directly modifying the original application code.