# Event Subscribers

An **event subscriber** is an AL procedure that listens for a particular event and executes its code when that event is raised.

Event subscribers are normally placed inside codeunits.

## Creating an Event Subscriber

We use the `[EventSubscriber]` attribute to subscribe to an event.

Example:

```al
codeunit 50101 CustomerEventSubscriber
{
    [EventSubscriber(
        ObjectType::Codeunit,
        Codeunit::CustomerEvents,
        'OnCustomerCreated',
        '',
        false,
        false)]
    local procedure HandleCustomerCreated(CustomerNo: Code[20])
    begin
        Message('Customer %1 was created.', CustomerNo);
    end;
}
```

This subscriber listens to the `OnCustomerCreated` event published by our `CustomerEvents` codeunit.

When that event is raised, `HandleCustomerCreated()` executes.

## Understanding EventSubscriber Parameters

The `[EventSubscriber]` attribute accepts six arguments:

| Argument | Description |
|---|---|
| `ObjectType` | Type of object publishing the event. |
| `ObjectId` | ID or name of the object publishing the event. |
| `EventName` | Name of the published event. |
| `ElementName` | Field name for applicable table trigger events; otherwise, usually empty (`''`). |
| `SkipOnMissingLicense` | Whether to skip the subscriber if the required license is missing. |
| `SkipOnMissingPermission` | Whether to skip the subscriber if the required permission is missing. |

**Note:** Using `true` for either skip parameter means the subscriber is skipped when the corresponding requirement is missing. Using `false` causes an error instead.

## Important Things to Remember

- Event subscribers are normally defined inside codeunits.
- A subscriber must reference the correct publisher object and event name.
- The subscriber's parameters must match the publisher's event parameters.
- Multiple subscribers can listen to the same event.
- Subscribers execute when the corresponding event is raised.
- You cannot specify the execution order of multiple subscribers.
- Subscribers are commonly declared as `local procedure`.

## Subscribing to Standard Business Central Events

You don't have to create your own event publishers.

Business Central already provides many standard events that extensions can subscribe to.

For example, you can subscribe to the Customer table's `OnAfterInsertEvent`:

```al
codeunit 50102 CustomerTableSubscriber
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
        Message('A new customer was inserted: %1', Rec.Name);
    end;
}
```

This subscriber executes after a Customer record is inserted.

Unlike our custom Integration Event, this is a **table trigger event** raised automatically by Business Central.

## Key Takeaway

An event subscriber listens for an event and contains the logic that should execute when that event occurs.

Remember:

- Publisher: Declares and raises the event.
- Subscriber: Listens and responds to the event.
- Event: The notification connecting them.