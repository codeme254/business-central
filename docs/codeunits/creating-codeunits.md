# Creating Codeunits

## Creating a codeunit in VS Code

In your existing AL project:

1. Create a new `.al` file, for example, `CustomerManager.Codeunit.al`.
2. Type `tcodeunit` and press Enter. VS Code generates a basic codeunit structure.
3. Give it a unique object ID and a meaningful name.

A basic codeunit looks like this:

```al
codeunit 50100 CustomerManager
{
    trigger OnRun()
    begin
        
    end;
}
```

Let's understand the structure:

- `codeunit`: Declares the object type.
- `50100`: The object's unique ID within the relevant object ID range.
- `CustomerManager`: The object's name.
- `OnRun()`: A trigger that executes when the codeunit itself is run.

**Important:** A codeunit doesn't have to contain an `OnRun()` trigger. You can create a codeunit containing only procedures.

## Adding procedures to a codeunit

Remember procedures from our earlier lessons?

A codeunit can contain multiple procedures. These procedures hold the actual business logic that other objects can reuse.

Let's create a procedure that retrieves a customer using their customer number.

```al
codeunit 50100 CustomerManager
{
    procedure DisplayCustomer(CustomerNo: Code[20])
    var
        CustomerRec: Record Customer;
    begin
        if CustomerRec.Get(CustomerNo) then
            Message('Customer: %1', CustomerRec.Name)
        else
            Message('Customer not found.');
    end;
}
```

Let's break this down:

**1. Procedure declaration**

```al
procedure DisplayCustomer(CustomerNo: Code[20])
```

- `DisplayCustomer` is the procedure name.
- `CustomerNo` is a parameter.
- `Code[20]` is the parameter's data type.

The procedure expects a customer number when called.

**2. Record variable**

```al
var
    CustomerRec: Record Customer;
```

We're using the `Record` data type we learned earlier to access the Customer table.

**3. Retrieving the customer**

```al
if CustomerRec.Get(CustomerNo) then
```

Remember `Get()`? It retrieves a record using its primary key.

If the customer exists, we display their name. Otherwise, we display a message indicating that the customer wasn't found.

Notice that we're reusing concepts we've already covered: record variables, `Get()`, conditional statements and `Message()`.

## Calling a codeunit from another object

Creating a codeunit is only half the job. We also need to understand how other objects use it.

Suppose we want to call our `DisplayCustomer()` procedure from the Customer Card page.

We can create a page extension:

```al
pageextension 50101 CustomerCardExt extends "Customer Card"
{
    actions
    {
        addlast(Processing)
        {
            action(ShowCustomerDetails)
            {
                Caption = 'Show Customer Details';
                ApplicationArea = All;

                trigger OnAction()
                var
                    CustomerManager: Codeunit CustomerManager;
                begin
                    CustomerManager.DisplayCustomer(Rec."No.");
                end;
            }
        }
    }
}
```

There are two important things here.

**First, declaring a codeunit variable:**

```al
CustomerManager: Codeunit CustomerManager;
```

Just as we declare record variables using `Record`, we declare codeunit variables using `Codeunit`.

**Second, calling a procedure:**

```al
CustomerManager.DisplayCustomer(Rec."No.");
```

We call the procedure using the codeunit variable followed by a dot and the procedure name.

`Rec."No."` refers to the customer number of the currently displayed customer on the Customer Card page.

When the user clicks **Show Customer Details**, the page calls our codeunit, which retrieves the customer and displays their name.

This is one of the main reasons codeunits are useful: the page handles the user interaction, while the codeunit handles the business logic.

## Understanding the OnRun() trigger

We briefly introduced `OnRun()` earlier. Now let's distinguish it from procedures.

Consider this codeunit:

```al
codeunit 50102 CustomerProcessor
{
    trigger OnRun()
    begin
        Message('Customer Processor is running.');
    end;
}
```

The `OnRun()` trigger executes when the codeunit itself is run.

For example:

```al
Codeunit.Run(Codeunit::CustomerProcessor);
```

However, when you declare a codeunit variable and call one of its procedures:

```al
CustomerManager.DisplayCustomer('10000');
```

**The `OnRun()` trigger does not execute automatically.** You're calling the procedure directly.

This distinction is important.

| How you invoke the codeunit | What executes |
|---|---|
| `Codeunit.Run(Codeunit::CustomerProcessor)` | `OnRun()` |
| `CustomerManager.DisplayCustomer('10000')` | `DisplayCustomer()` |

You don't need to use `OnRun()` for every codeunit. In fact, many codeunits primarily expose reusable procedures.

### Further reading

- [Microsoft Learn: Codeunit Object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-codeunit-object)
- [Microsoft Learn: OnRun Codeunit Trigger](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/codeunit/devenv-onrun-codeunit-trigger)
- [Microsoft Learn: Work with Codeunits](https://learn.microsoft.com/en-us/training/modules/work-with-codeunits/)
