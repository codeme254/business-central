# Subscriber Attributes and Signatures

## Subscriber Attributes

The `[EventSubscriber]` attribute tells Business Central which event a procedure should listen to.

Its syntax is:

```al
[EventSubscriber(
    ObjectType,
    ObjectId,
    EventName,
    ElementName,
    SkipOnMissingLicense,
    SkipOnMissingPermission)]
```

| Parameter | Meaning |
|---|---|
| `ObjectType` | Type of object publishing the event (`Codeunit`, `Table`, `Page`, etc.). |
| `ObjectId` | ID or name of the publisher object. |
| `EventName` | Name of the event being subscribed to. |
| `ElementName` | Used for field-related trigger events; otherwise usually `''`. |
| `SkipOnMissingLicense` | Whether to skip execution if the required license is missing. |
| `SkipOnMissingPermission` | Whether to skip execution if the required permission is missing. |

**Example:**

```al
[EventSubscriber(
    ObjectType::Codeunit,
    Codeunit::CustomerEvents,
    'OnCustomerCreated',
    '',
    false,
    false)]
```

This subscribes to `OnCustomerCreated` published by the `CustomerEvents` codeunit.

## Subscriber Signatures

A subscriber's signature refers to its procedure declaration, particularly its parameters and their data types.

**Important rule:** The subscriber must have the same parameters, in the same order and with matching data types, as the event publisher.

For example, our publisher:

```al
[IntegrationEvent(false, false)]
procedure OnCustomerCreated(CustomerNo: Code[20]; CustomerName: Text[100])
begin
end;
```

Its subscriber:

```al
[EventSubscriber(
    ObjectType::Codeunit,
    Codeunit::CustomerEvents,
    'OnCustomerCreated',
    '',
    false,
    false)]
local procedure HandleCustomerCreated(
    CustomerNo: Code[20];
    CustomerName: Text[100])
begin
    Message('Created: %1 - %2', CustomerNo, CustomerName);
end;
```

Notice that both procedures have:
- Two parameters.
- The same parameter order.
- Matching data types.

### What about `var` parameters?

The `var` keyword indicates that a parameter is passed by reference, allowing the procedure to modify the original variable.

If the publisher declares a parameter using `var`, the subscriber must also declare the corresponding parameter using `var`.

For example:

```al
[IntegrationEvent(false, false)]
procedure OnBeforeCustomerInsert(var CustomerRec: Record Customer)
begin
end;
```

Subscriber:

```al
[EventSubscriber(
    ObjectType::Codeunit,
    Codeunit::CustomerEvents,
    'OnBeforeCustomerInsert',
    '',
    false,
    false)]
local procedure BeforeCustomerInsert(var CustomerRec: Record Customer)
begin
    CustomerRec.Name := 'Updated Customer';
end;
```

The subscriber can modify the record because it receives the parameter by reference.
