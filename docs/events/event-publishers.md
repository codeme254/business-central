# Event Publishers

An **event publisher** is an AL object (such as a codeunit, table or page) that declares an event, making it available for other objects to subscribe to.

In Business Central, Integration Events and Business Events are published using event publisher procedures.

## Creating an Event Publisher

An event publisher is an ordinary AL procedure decorated with an event attribute.

Example:

```al
codeunit 50100 CustomerEvents
{
    [IntegrationEvent(false, false)]
    procedure OnCustomerCreated(CustomerNo: Code[20])
    begin
    end;
}
```

Here:
- `[IntegrationEvent(false, false)]` identifies the procedure as an Integration Event publisher.
- `OnCustomerCreated` is the event name.
- `CustomerNo` is a parameter passed to subscribers.

You can also use `[BusinessEvent(false)]` to declare a Business Event.

## Publishing vs Raising an Event

These are two different operations.

**Publishing:** Declaring the event using an event publisher procedure makes it available for subscription.

**Raising:** Calling the publisher procedure triggers the event and executes its subscribers.

For example:

```al
var
    CustomerEvents: Codeunit CustomerEvents;
begin
    CustomerEvents.OnCustomerCreated(Rec."No.");
end;
```

When this procedure is called, all subscribers listening to that event are executed.

**Important:** Declaring an event does not automatically trigger it. You must explicitly call the publisher procedure.

## Important Rules

- Event publisher procedures must not contain business logic; their bodies should be empty.
- They cannot have return values or local variables.
- They can accept parameters, which provide information to subscribers.
- You can declare publishers in codeunits, tables, pages and other AL objects.
- Multiple subscribers can listen to the same event.
- A publisher does not need to know whether any subscribers exist.

## Key Takeaway

Publishing an event exposes an extension point. Raising the event invokes the subscribers listening to that extension point.

Remember the sequence:

**Publish → Raise → Subscribers execute.**