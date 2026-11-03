# Actions and Action Groups in AL

## Introduction

So far, we've learned how to create pages, organize their layouts, and display data using fields and repeaters.

However, displaying information is only part of what users need. They also need to perform operations on that information.

For example, when viewing a Product Card, a user might want to:

- Delete a product.
- View product transactions.
- Calculate the product's inventory value.
- Open a related page.
- Generate a product report.

In Business Central, we use **Actions** to provide these operations through the user interface.

An Action is an interactive element that allows users to trigger functionality, navigate to other pages, or execute business logic.

**Action Groups** help organize related actions into logical menus and submenus.

## Declaring Actions

Actions are defined inside the `actions` section of a page object.

The general structure is:

```al
actions
{
    area(Processing)
    {
        action(ActionName)
        {
            // Action properties and triggers
        }
    }
}
```

Let's understand the structure:

| Component | Description |
|---|---|
| `actions` | Defines the actions available on the page. |
| `area(Processing)` | Specifies where the actions belong in the action bar. |
| `action(ActionName)` | Declares an individual action. |
| `{ }` | Contains the action's properties and triggers. |

### Practical Example

Let's create an action on our Product Card page that displays a message when selected.

```al
actions
{
    area(Processing)
    {
        action(ShowProductInfo)
        {
            Caption = 'Show Product Info';
            ApplicationArea = All;
            Image = Info;

            trigger OnAction()
            begin
                Message('Product: %1', Rec.Name);
            end;
        }
    }
}
```

Here:

- `action(ShowProductInfo)` declares the action.
- `Caption` specifies the text displayed to the user.
- `ApplicationArea` determines its availability.
- `Image` specifies the icon displayed alongside the action.
- `OnAction()` executes when the user selects the action.
- `Message()` displays the product name.

**Important:** `OnAction()` is the trigger used to execute AL code when a user invokes an action.

We'll explore triggers in more detail separately.

## Action Areas

Just as page layouts have areas such as `Content` and `FactBoxes`, actions also have areas that determine where actions appear in the Business Central interface.

The most important action areas are:

| Action Area | Purpose | Example |
|---|---|---|
| `Processing` | Contains actions that perform operations or process records. | Post a sales order. |
| `Creation` | Contains actions for creating new documents or records. | Create a sales invoice. |
| `Navigation` | Contains actions that navigate to related pages. | Open customer ledger entries. |
| `Reporting` | Contains actions for running reports. | Generate a customer report. |

**Example:**

```al
actions
{
    area(Processing)
    {
        action(CalculateInventory)
        {
            Caption = 'Calculate Inventory';
            ApplicationArea = All;

            trigger OnAction()
            begin
                Message('Calculating inventory...');
            end;
        }
    }

    area(Navigation)
    {
        action(ViewProducts)
        {
            Caption = 'View Products';
            ApplicationArea = All;
            RunObject = page ProductList;
        }
    }

    area(Reporting)
    {
        action(ProductReport)
        {
            Caption = 'Product Report';
            ApplicationArea = All;
            RunObject = report ProductReport;
        }
    }
}
```

Each action appears in the appropriate menu within the page's action bar.

**A note on action areas:**

- `Processing` actions generally appear under the Actions menu.
- `Creation` actions appear under the New menu.
- `Navigation` actions appear under the Navigate menu.
- `Reporting` actions appear under the Reports menu.

The actual presentation depends on the page type and the Business Central action bar. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-actions-overview)

## Action Groups

An **Action Group** is used to organize related actions under a common menu or submenu.

Imagine our Product Card page has several inventory-related operations:

- Calculate Inventory.
- Adjust Inventory.
- View Inventory Entries.

Instead of displaying all these actions separately, we can group them under an Inventory menu.

We declare an action group using the `group` keyword inside an action area.

**Example:**

```al
actions
{
    area(Processing)
    {
        group(Inventory)
        {
            Caption = 'Inventory';
            Image = Inventory;

            action(CalculateInventory)
            {
                Caption = 'Calculate Inventory';
                ApplicationArea = All;

                trigger OnAction()
                begin
                    Message('Calculating inventory...');
                end;
            }

            action(AdjustInventory)
            {
                Caption = 'Adjust Inventory';
                ApplicationArea = All;

                trigger OnAction()
                begin
                    Message('Adjusting inventory...');
                end;
            }
        }
    }
}
```

The resulting structure looks something like this:

```text
Actions
   |
   |-- Inventory
          |
          |-- Calculate Inventory
          |
          |-- Adjust Inventory
```

When users open the Inventory menu, they can select either operation.

### Nested Action Groups

Action groups can also contain other action groups.

For example, suppose we want to organize our product-related operations into two categories:

- Inventory
- Pricing

Each category contains its own actions.

```al
actions
{
    area(Processing)
    {
        group(ProductManagement)
        {
            Caption = 'Product Management';

            group(Inventory)
            {
                Caption = 'Inventory';

                action(CalculateInventory)
                {
                    Caption = 'Calculate Inventory';
                    ApplicationArea = All;
                }
            }

            group(Pricing)
            {
                Caption = 'Pricing';

                action(UpdatePrice)
                {
                    Caption = 'Update Price';
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

This creates a hierarchical menu structure.

**Important distinction:**

- `action` defines an individual operation.
- `group` organizes multiple actions into a menu or submenu.

## What Can an Action Do?

Actions are not limited to displaying messages. They can perform different operations depending on how they are configured.

Here are some common approaches.

### Execute AL Code Using OnAction

You can execute custom AL code when a user selects an action.

```al
action(ShowMessage)
{
    Caption = 'Show Message';
    ApplicationArea = All;

    trigger OnAction()
    begin
        Message('Hello from Business Central!');
    end;
}
```

This is useful when implementing custom business logic.

### Open Another Page Using RunObject

You can configure an action to open another page.

```al
action(ViewProducts)
{
    Caption = 'View Customers';
    ApplicationArea = All;
    RunObject = page "Customer List";
}
```

When selected, Business Central opens the `Customer List` page.

### Run a Report

Actions can also execute reports.

```al
action(ProductReport)
{
    Caption = 'Product Report';
    ApplicationArea = All;
    RunObject = report ProductReport;
}
```

This is useful when users need to generate reports directly from a page.

### Run a Codeunit

You can also configure an action to execute a codeunit.

```al
action(ProcessProducts)
{
    Caption = 'Process Products';
    ApplicationArea = All;
    RunObject = codeunit ProductProcessor;
}
```

This is particularly useful when the operation involves reusable business logic implemented in a codeunit.

**Note:** `RunObject` is a declarative way of specifying which object to run. You can also execute objects programmatically from an `OnAction` trigger when you need more control over the operation.

## Promoted Actions

Sometimes, certain actions are more important or frequently used than others.

For example, on a Product List page, users might frequently need to:

- Create a new product.
- Edit a product.
- Delete a product.

Rather than requiring users to navigate through menus every time, Business Central allows us to **promote actions** so they appear more prominently in the action bar.

These are called Promoted Actions.

In modern Business Central development, promoted actions are defined using the `actionref` syntax inside `area(Promoted)`.

**Example:**

```al
actions
{
    area(Processing)
    {
        action(CalculateInventory)
        {
            Caption = 'Calculate Inventory';
            ApplicationArea = All;

            trigger OnAction()
            begin
                Message('Calculating inventory...');
            end;
        }
    }

    area(Promoted)
    {
        actionref(CalculateInventoryRef; CalculateInventory)
        {
        }
    }
}
```

Notice something important:

We define the actual action under `area(Processing)` and then reference it under `area(Promoted)`.

The `actionref` does not create another independent action. It references an existing action and makes it available in the promoted action area.

**Important:** Older examples may use properties such as `Promoted` and `PromotedCategory`. These belong to the legacy promotion syntax. The recommended modern approach is `actionref`. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-promoted-actions)

## Common Action Properties

Actions support several properties that determine their appearance and behavior.

| Property | Description |
|---|---|
| `Caption` | Specifies the text displayed to the user. |
| `ToolTip` | Provides additional information about the action. |
| `ApplicationArea` | Determines where the action is available. |
| `Image` | Specifies the icon displayed alongside the action. |
| `Enabled` | Determines whether the action can be interacted with. |
| `Visible` | Determines whether the action is displayed. |
| `RunObject` | Specifies an object to execute when the action is selected. |
| `RunPageMode` | Specifies how a page opened through `RunObject` should be displayed. |
| `Promoted` | Legacy property for promoting actions. |

Example:

```al
action(DeleteProduct)
{
    Caption = 'Delete Product';
    ToolTip = 'Deletes the selected product.';
    ApplicationArea = All;
    Image = Delete;
    Enabled = true;
    Visible = true;
}
```

These properties allow us to customize how users interact with actions.

## Key Takeaways

- Actions provide interactive functionality on Business Central pages.
- Actions are declared inside the `actions` section of a page object.
- `action` defines an individual operation.
- `group` organizes related actions into menus and submenus.
- `OnAction()` executes AL code when an action is selected.
- `RunObject` allows actions to open pages, run reports, or execute codeunits.
- Action areas determine where actions appear in the action bar.
- Promoted actions provide quicker access to frequently used operations.
- Modern action promotion uses `actionref`.

## Further Reading

1. [Microsoft Learn – Actions Overview](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-actions-overview)
2. [Microsoft Learn – Adding Actions to a Page](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-adding-actions-to-a-page)
3. [Microsoft Learn – Promoted Actions](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-promoted-actions)
4. [Microsoft Learn – Common Promoted Action Groups](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-common-promoted-action-groups)

---

## Practical Exercise

Let's put these concepts into practice using your existing `Product` table.

On your `ProductList` page, implement the following:

**1. Product Management group**

Create an action group containing:

- `Show Product Details`: Displays the selected product's name using `Message()`.
- `Delete Product`: Deletes the selected product.

**2. Inventory group**

Create another action group containing:

- `View Inventory`: Displays the selected product's inventory quantity.
- `Calculate Inventory`: Displays a message indicating that inventory calculation has started.

**3. Promoted Action**

Promote the `Calculate Inventory` action using `actionref`.

Publish your extension and test the actions from Business Central.

*Hint:* You can use `Rec.Delete(true)` to delete the current record, but be careful when testing this action. It permanently deletes the selected record unless your environment provides a way to restore it.
