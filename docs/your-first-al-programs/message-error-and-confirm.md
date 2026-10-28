# `Message()`, `Error()`, and `Confirm()`

Business Central provides built-in methods for communicating with users. Three commonly used methods are `Message()`, `Error()`, and `Confirm()`.

| Method | Purpose | Effect |
|---|---|---|
| `Message()` | Displays information to the user. | Does not stop execution. |
| `Error()` | Reports a problem that prevents an operation from continuing. | Stops AL execution and raises an error. |
| `Confirm()` | Asks the user a yes/no question. | Returns a Boolean (`true` or `false`). |

## `Message()`

The `Message()` method displays an informational message to the user.

### Example

**Create a new file:** `MessageDemo.Codeunit.al`

```al
codeunit 50100 MessageDemo
{
    trigger OnRun()
    begin
        Message('Welcome to Business Central!');

        Message('Your operation completed successfully.');
    end;
}
```

### Explanation

- `pageextension 50100 CustomerListExt extends "Customer List"` &mdash; Creates a page extension with ID 50100, named CustomerListExt, that extends the existing Customer List page..
- `trigger OnOpenPage()` — Runs when the page opens.
- `Message()` displays the supplied text to the user.
- Both messages are displayed after the code finishes executing, so the user can see them in sequence.

**Note:** A `Message()` call does not immediately interrupt execution to display its message. Business Central normally displays queued messages when the AL code finishes or pauses for user interaction.

### Displaying Variable Values

You can use `%1`, `%2`, and so on as placeholders for values you want to include in a message.

```al
namespace DefaultPublisher.HelloWorldBC;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        CustomerName: Text;
        TotalAmount: Decimal;
    begin
        CustomerName := 'John';
        TotalAmount := 1500;
        Message('Customer : %1. Total amount: %2.', CustomerName, TotalAmount);
    end;
}
```

**Output:**

![output](/message-output.png)

Here, `%1` is replaced with `CustomerName`, while `%2` is replaced with `TotalAmount`.

## `Error()`

The `Error()` method displays an error message and stops the execution of AL code.

Use it when an operation cannot safely continue because a business rule has been violated or a required condition has not been met.

### Example

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        AvailableStock: Integer;
        RequestedQuantity: Integer;
    begin
        AvailableStock := 10;
        RequestedQuantity := 25;

        if RequestedQuantity > AvailableStock then
            Error('Insufficient stock available');
        Message('Order processed successfully');
    end;
}

```

![output](/error-output.png)

### Explanation

1. We have 10 items in stock, but the customer requests 25.
2. The `if` statement checks whether the requested quantity exceeds available stock.
3. Since 25 is greater than 10, `Error()` executes.
4. Business Central displays the error and stops execution.

The message `Order processed successfully.` is **never displayed** because the error terminates execution before that line is reached.

:::info
When an error occurs during a database transaction, Business Central normally rolls back the transaction's changes. This helps prevent partially completed operations, although the exact behavior depends on the execution context and transaction boundaries.
:::

## `Confirm()`

The `Confirm()` method asks the user a question and returns a Boolean value based on their answer.

- `true` means the user selected **Yes**.
- `false` means the user selected **No**.

Unlike `Message()`, `Confirm()` returns a value that your code can use to decide what happens next.

### Example

**Create a new file:** `ConfirmDemo.Codeunit.al`

```al
namespace HelloWorld;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    begin
        if Confirm('Do you want to continue', false) then
            Message('You chose to continue')
        else
            Message('Operation cancelled');
    end;
}

```

![Output](/confirm-output.png)

### Explanation

The `Confirm()` method takes two arguments here:

```al
Confirm('Do you want to continue?', false)
```

- The first argument is the question displayed to the user.
- The second argument specifies the default answer. `false` means **No** is selected by default.

The `if` statement evaluates the Boolean value returned by `Confirm()`.

- If the user selects **Yes**, the first `Message()` executes.
- If the user selects **No**, the second `Message()` executes.

This allows the application to respond differently depending on the user's decision.

### Why Is `Confirm()` Useful?

Imagine a user is about to delete a customer record. You could ask for confirmation before proceeding.

```al
if Confirm('Are you sure you want to delete this customer?', false) then
    // Perform the deletion
else
    Message('Deletion cancelled.');
```

This is a simplified illustration of the decision-making logic. Actual deletion code would need to be implemented in the appropriate context.

## Quick Comparison

Consider the following scenarios:

- **`Message()`**: Inform the user that an operation completed successfully.
- **`Error()`**: Stop an operation because the requested quantity exceeds available stock.
- **`Confirm()`**: Ask whether the user wants to proceed with deleting a record.

Remember that these methods interact with the user interface. Avoid relying on interactive dialogs in background jobs and web service operations, where a user may not be available to respond.

## Further Reading

- [Dialog.Message Method](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/dialog/dialog-message-method)
- [Dialog.Error Method](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/dialog/dialog-error-string-joker-method)
- [Dialog.Confirm Method](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/dialog/dialog-confirm-method)
- [Progress Windows, Message, Error, and Confirm Methods](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-progress-windows-message-error-and-confirm-methods)
