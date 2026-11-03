# Page Extensions

## Introduction

A page extension allows us to extend an existing Business Central page without modifying its original definition.

For example, imagine Business Central already has a standard `Customer Card` page, but your organization wants to:

- Add additional fields.
- Introduce new actions.
- Rearrange existing fields.
- Change the captions of existing controls.
- Modify the behavior of certain controls.

Instead of modifying Microsoft's original `Customer Card` object, we create a **Page Extension**.

This is part of Business Central's extensibility model, which allows developers to customize the application while keeping the original application objects intact.

## Creating a Page Extension

We use the `pageextension` keyword to define a page extension.

### Syntax

```al
pageextension ObjectID ExtensionName extends TargetPage
{
    layout
    {
        // Add or modify page controls.
    }

    actions
    {
        // Add or modify page actions.
    }

    var
        // Declare variables.
}
```

Notice the following:

- `ObjectID`: The unique ID assigned to the extension object.
- `ExtensionName`: The name of our page extension.
- `extends`: Specifies the existing page we want to extend.
- `layout`: Used to add, modify, or reposition controls.
- `actions`: Used to add, modify, or reposition actions.
- `var`: Used to declare variables for the extension.

**Important:** The target page must have its `Extensible` property set to `true`. Also, API pages cannot be extended using a page extension.

## Adding Fields to Existing Pages

One of the most common uses of page extensions is adding new fields to an existing page.

Suppose we want to add a new field called `RewardPoints` to the standard Customer Card.

First, we need to understand something:

A page extension does not create new database fields. If we want to store additional data, we first need to create the field using a **Table Extension**.

For example:

```al
tableextension 50100 CustomerTableExt extends Customer
{
    fields
    {
        field(50100; RewardPoints; Integer)
        {
            Caption = 'Reward Points';
            DataClassification = CustomerContent;
        }
    }
}
```

Now that the field exists in the Customer table, we can display it on the Customer Card using a page extension.

```al
pageextension 50101 CustomerCardExt extends "Customer Card"
{
    layout
    {
        addlast(General)
        {
            field(RewardPoints; Rec.RewardPoints)
            {
                ApplicationArea = All;
            }
        }
    }
}
```

Here, `addlast(General)` tells Business Central to add the new field at the end of the existing `General` group.

Notice that we use `Rec.RewardPoints` to access the field we created in the Customer table extension.

**Remember:** A table extension adds the database field; a page extension makes that field available on an existing page.

## Adding Actions to Existing Pages

We can also introduce new actions to existing pages.

For example, let's add an action to the Customer Card that displays a message.

```al
pageextension 50101 CustomerCardExt extends "Customer Card"
{
    actions
    {
        addlast(Processing)
        {
            action(ShowCustomerInfo)
            {
                Caption = 'Show Customer Info';
                ApplicationArea = All;
                Image = Info;

                trigger OnAction()
                begin
                    Message('Customer: %1', Rec.Name);
                end;
            }
        }
    }
}
```

Here:

- `actions` contains our action modifications.
- `addlast(Processing)` places the new action at the end of the existing Processing action area.
- `action(ShowCustomerInfo)` defines our new action.
- `OnAction()` executes when the user selects the action.

We can also introduce entirely new action groups.

## Modifying Existing Controls

Sometimes, we don't need to introduce new fields or actions. We simply want to modify controls that already exist.

We use the `modify` keyword.

For example, let's change the caption of the existing Address 2 field on the Customer Card.

```al
pageextension 50101 CustomerCardExt extends "Customer Card"
{
    layout
    {
        modify("Address 2")
        {
            Caption = 'Additional Address';
        }
    }
}
```

The `modify` keyword identifies an existing control that we want to change.

We can modify supported properties of existing controls, such as:

- `Caption`
- `ToolTip`
- `Visible`
- `Enabled`
- `Importance`

**Important:** You cannot modify every property of an existing control. Only properties supported for modification through page extensions can be changed.

## Repositioning Existing Controls

Page extensions also allow us to change the position of existing controls.

We use the following keywords:

| Keyword | Description |
|---|---|
| `addfirst` | Adds a new control or action at the beginning of a group or area. |
| `addlast` | Adds a new control or action at the end of a group or area. |
| `addafter` | Adds a new control or action after an existing one. |
| `addbefore` | Adds a new control or action before an existing one. |
| `movefirst` | Moves an existing control or action to the beginning of a group or area. |
| `movelast` | Moves an existing control or action to the end of a group or area. |
| `moveafter` | Moves an existing control or action after another one. |
| `movebefore` | Moves an existing control or action before another one. |

### Example: addafter

Suppose we want to add a field immediately after the existing Name field.

```al
layout
{
    addafter(Name)
    {
        field(RewardPoints; Rec.RewardPoints)
        {
            ApplicationArea = All;
        }
    }
}
```

### Example: moveafter

Suppose we want to move the existing Address field after the Name field.

```al
layout
{
    moveafter(General; Name, Address)
}
```

Here, `General` is the group containing the controls, and `Name` and `Address` are the controls being repositioned.

The same positioning concepts apply to actions in the `actions` section.

## Page Extension Triggers

Page extensions can also implement certain page triggers to introduce additional behavior.

For example:

```al
pageextension 50101 CustomerCardExt extends "Customer Card"
{
    trigger OnOpenPage()
    begin
        Message('Customer Card opened!');
    end;
}
```

This displays a message when the Customer Card page opens.

You can also implement supported triggers such as `OnAfterGetRecord` and `OnAfterGetCurrRecord`.

However, page extensions do not support every trigger available in regular page objects. Always check the documentation for the specific trigger.

## 8. Important Things to Remember

- Page extensions allow us to customize existing pages without modifying their original definitions.
- Use `pageextension` to define a page extension.
- The target page must be extensible.
- Use `layout` to modify page controls.
- Use `actions` to modify page actions.
- Use `addfirst`, `addlast`, `addafter`, and `addbefore` to introduce new controls or actions at specific positions.
- Use `modify` to change supported properties of existing controls.
- Use `movefirst`, `movelast`, `moveafter`, and `movebefore` to reposition existing controls.
- Use a table extension when you need to introduce additional database fields.

## Further Reading

- [Page Extension Object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-ext-object)
- [Table Extension Object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object)
- [Extensible Property](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-extensible-property)