# Page Variables

## Introduction

Page variables are variables declared inside a page object. They allow us to store and manipulate temporary information while the page is running.

For example, we can use page variables to:

- Store temporary user input.
- Perform calculations.
- Keep track of whether a particular condition has been met.
- Store values used by page triggers, actions, and procedures.
- Display information that does not necessarily come from a database table.

**Important:** Page variables are held in memory at runtime. They are not automatically saved to the database.

## Declaring Page Variables

Page variables are declared using the `var` keyword at the object level.

```al
page 50100 ProductCard
{
    PageType = Card;
    SourceTable = Product;

    layout
    {
        area(Content)
        {
            group(General)
            {
                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                }
            }
        }
    }

    var
        TemporaryNote: Text[100];
        IsApproved: Boolean;
        TotalValue: Decimal;
}
```

In this example:

- `TemporaryNote` stores temporary text.
- `IsApproved` stores a Boolean value.
- `TotalValue` stores a decimal number.

These variables can be accessed by the page's triggers, actions, and procedures.

## Using Page Variables

Let's create a simple example where a user enters a temporary note and clicks an action to display it.

```al
page 50100 ProductCard
{
    PageType = Card;
    SourceTable = Product;
    ApplicationArea = All;

    layout
    {
        area(Content)
        {
            group(General)
            {
                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                }

                field(TemporaryNote; TemporaryNote)
                {
                    Caption = 'Temporary Note';
                    ApplicationArea = All;
                }
            }
        }
    }

    actions
    {
        area(Processing)
        {
            action(ShowNote)
            {
                Caption = 'Show Note';
                ApplicationArea = All;

                trigger OnAction()
                begin
                    Message('Your note: %1', TemporaryNote);
                end;
            }
        }
    }

    var
        TemporaryNote: Text[100];
}
```

Notice the following:

- `TemporaryNote` is declared in the page's `var` section.
- The page field is bound to the variable instead of a table field.
- The action accesses the same variable and displays its current value.

**The important distinction:** `field(Name; Rec.Name)` is bound to a database table field, whereas `field(TemporaryNote; TemporaryNote)` is bound to a page variable.

Changes to `TemporaryNote` are not automatically persisted to the database.

## Global and Local Variables

AL supports both global and local variables.

### Global Variables

Variables declared in the object's `var` section are global to that object.

In a page, they can be accessed from its triggers and procedures.

```al
var
    TotalValue: Decimal;
```

### Local Variables

Local variables are declared inside a procedure or trigger using a local `var` section. They are only accessible within that procedure or trigger.

```al
local procedure CalculateTotal()
var
    Quantity: Integer;
    UnitPrice: Decimal;
begin
    Quantity := 5;
    UnitPrice := 100;

    TotalValue := Quantity * UnitPrice;
end;
```

Here:

- `Quantity` and `UnitPrice` are local variables.
- `TotalValue` is a global page variable and can therefore be accessed outside this procedure.

**Remember:** Global and local describe the variable's scope within the AL object. A global page variable is not automatically accessible from other objects.

## Page Variables vs. System-Defined Variables

Business Central also provides variables that are automatically declared and maintained by the system.

Some examples include:

| Variable | Description |
|---|---|
| `Rec` | Represents the current record being processed by the page. |
| `xRec` | Represents the previous version of a record before modification. |
| `CurrPage` | Represents the current page instance. |

Unlike user-defined variables, you do not need to declare these yourself.

For example:

```al
trigger OnOpenPage()
begin
    Message('Current product: %1', Rec.Name);
end;
```

Here, `Rec` is a system-defined variable that gives us access to the current product record.

## Key Takeaways

- Page variables store temporary information while a page is running.
- Declare global page variables using the object's `var` section.
- Declare local variables inside procedures or triggers.
- Global page variables can be accessed by different triggers and procedures within the same page.
- Page variables are not automatically stored in the database.
- `Rec`, `xRec`, and `CurrPage` are examples of system-defined variables.

## Further Reading

- [AL Variables](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-variables)
- [System-Defined Variables](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-system-defined-variables)
- [Programming in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-programming-in-al)