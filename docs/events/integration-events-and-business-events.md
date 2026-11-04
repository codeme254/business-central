# Integration Events and Business Events

Business Central supports two important custom event types: **Integration Events** and **Business Events**.

Both allow developers to publish events that other AL objects can subscribe to and respond to.

## Integration Events

An Integration Event is an event published by AL code to provide an extension point for other parts of an application or other extensions.

It allows developers to introduce additional functionality without modifying the original application code.

**Example:**

Suppose we have a process that creates a customer.

We could publish an Integration Event after the customer is created. Another extension could subscribe to that event and send a welcome email.

Integration Events:
- Allow extensions to hook into existing application functionality.
- Are useful for customization and extensibility.
- Can expose implementation details, such as specific tables and fields.
- Do not carry the same long-term compatibility commitment as Business Events.

## Business Events

A Business Event represents a meaningful occurrence in a business process.

It communicates *what happened* rather than the technical details of how it happened.

**Example:**

A sales order has been posted.

We could publish a Business Event called `OnSalesOrderPosted`.

Other components could subscribe to this event and perform actions such as updating another system or initiating another business process.

Business Events:
- Represent meaningful business occurrences.
- Are designed around business processes rather than implementation details.
- Provide a more stable contract for subscribers.
- Should ideally remain compatible across future application releases.

## Key Differences

| Integration Events | Business Events |
|---|---|
| Primarily provide extension points. | Represent meaningful business occurrences. |
| Can expose implementation details. | Should avoid exposing implementation details. |
| Don't carry the same compatibility commitment. | Carry an expectation of long-term stability. |
| Useful for application extensibility. | Useful for business process communication and integrations. |

## Declaring Events in AL

Both event types are declared using attributes placed above a procedure.

**Integration Event:**

```al
[IntegrationEvent(false, false)]
procedure OnCustomerCreated(CustomerNo: Code[20])
begin
end;
```

**Business Event:**

```al
[BusinessEvent(false)]
procedure OnSalesOrderPosted(OrderNo: Code[20])
begin
end;
```

Notice:
- `[IntegrationEvent(...)]` identifies an Integration Event publisher.
- `[BusinessEvent(...)]` identifies a Business Event publisher.
- The procedure declares the event and its parameters.

These publisher procedures don't contain business logic. They are declarations of events.

**Important:** Declaring an event does not automatically raise it. Your application must call the publisher procedure for subscribers to receive the event.

## Key Takeaway

Think of Integration Events as **extension points** and Business Events as **stable notifications of meaningful business occurrences**.

Both support loose coupling and extensibility, but Business Events have a stronger commitment to long-term compatibility.