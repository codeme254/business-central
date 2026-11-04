# Event-Driven Architecture

Event-driven architecture (EDA) is a software design approach where different parts of an application communicate by **producing and responding to events**.

An **event** is a notification that something has happened in the application.

For example, in Business Central:
- A sales order is released.
- A customer record is created.
- An invoice is posted.

Other parts of the application can respond to these events without needing to be directly called by the code that produced them.

## How It Works

EDA involves three main concepts:

1. **Event Publisher:** The component that raises or announces an event.
2. **Event:** The notification that something has happened.
3. **Event Subscriber:** The component that listens for an event and executes code when it occurs.

### Example

Imagine a customer record is created in Business Central.

- The customer creation process raises an event.
- A subscriber listens for that event.
- When the event occurs, the subscriber executes additional logic, such as sending a notification.

The original customer creation process doesn't need to know about the subscriber.

## Why Use Event-Driven Architecture?

- **Loose coupling:** Components can communicate without depending directly on one another.
- **Extensibility:** Developers can add functionality without modifying existing application code.
- **Maintainability:** Changes to one component are less likely to affect others.
- **Reusability:** Multiple subscribers can respond to the same event.

## Key Takeaway

In Business Central, event-driven architecture allows extensions to respond to application events and introduce additional functionality without unnecessarily modifying Microsoft's base application.

This makes applications easier to extend, maintain and upgrade.