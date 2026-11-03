# Page Layout and Controls in AL

## Introduction

Now that we understand Page Objects and Page Types, let's look at how we actually construct the user interface of a page.

In AL, the layout defines how elements are organized and presented on a page, while controls are the individual elements users interact with or use to view information.

For example, consider a Product Card page. It might contain:

- A section displaying basic product information.
- Another section displaying pricing information.
- Fields for entering the product number, name, and price.
- Actions for performing operations on the product.

All these elements contribute to the page's user interface.

A page's visual structure is primarily defined inside the `layout` section of a page object.

## The Layout Section

The `layout` section defines the structure and arrangement of controls on a page.

It is declared inside a page object using the `layout` keyword.

Example:

```
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
                field("No."; Rec."No.")
                {
                    ApplicationArea = All;
                }

                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

The important thing to understand is the hierarchy:

```
Page Object
    |
    |-- Properties
    |
    |-- layout
    |     |
    |     |-- area
    |           |
    |           |-- group
    |                 |
    |                 |-- field
    |
    |-- actions
    |
    |-- triggers
```

We'll explore each of these elements.

### Areas

An Area defines a specific region or placement within a page. Controls are placed inside areas to determine where their content appears.

Some commonly used areas include:

| Area         | Purpose                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| `Content`    | Contains the main content of a page.                                     |
| `FactBoxes`  | Displays additional information, usually on the right side of a page.    |
| `RoleCenter` | Contains the main content of a RoleCenter page.                          |
| `Prompt`     | Provides the prompt area for Copilot interactions on PromptDialog pages. |

Example:

```
layout
{
    area(Content)
    {
        // Main page content goes here.
    }

    area(FactBoxes)
    {
        // FactBoxes go here.
    }
}
```

Important: The available areas depend on the selected page type. For example, a normal Card page commonly uses `Content` and `FactBoxes`, while a RoleCenter has its own layout structure.

### Group Controls

A Group control organizes related controls together.

For example, on a Product Card page, we might want to organize product information into separate sections:

- General: Product number and name.
- Pricing: Unit price and cost.
- Inventory: Inventory quantity and reorder level.

Groups help make pages easier to navigate by organizing related information.

Example:

```
layout
{
    area(Content)
    {
        group(General)
        {
            Caption = 'General';

            field("No."; Rec."No.")
            {
                ApplicationArea = All;
            }

            field(Name; Rec.Name)
            {
                ApplicationArea = All;
            }
        }

        group(Pricing)
        {
            Caption = 'Pricing';

            field("Unit Price"; Rec."Unit Price")
            {
                ApplicationArea = All;
            }
        }
    }
}
```

In this example, we have two groups: `General` and `Pricing`.

On a Card page, top-level groups typically appear as expandable and collapsible sections called FastTabs.

Groups can also be nested inside other groups to create additional levels of organization.

### Repeater Controls

A Repeater control is used to display a collection of records in rows and columns.

It is particularly important when building List pages.

For example, a Product List page might display:

| No.  | Name     | Unit Price |
| ---- | -------- | ---------- |
| P001 | Laptop   | 75,000     |
| P002 | Keyboard | 2,500      |
| P003 | Mouse    | 1,200      |

Each row represents a record, while each column represents a field.

Example:

```
page 50101 ProductList
{
    PageType = List;
    SourceTable = Product;

    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field("No."; Rec."No.")
                {
                    ApplicationArea = All;
                }

                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                }

                field("Unit Price"; Rec."Unit Price")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

Notice that each field is placed inside the repeater.

Business Central uses the repeater to generate the rows and columns based on the records available in the source table.

Important: A List page is designed around a single repeater in its Content area. If you need more complex layouts with additional controls, consider using a Worksheet page instead.


### Field Controls

A Field control displays a field from a table or another supported data source on a page.

For example:

```
field(Name; Rec.Name)
{
    ApplicationArea = All;
}
```

Here:

- `field` declares a field control.
- `Name` is the control's identifier.
- `Rec.Name` specifies the data source for the control.
- `ApplicationArea` determines where the control is available.

Field controls can allow users to view or edit information depending on the page configuration and field properties.

We'll dedicate a separate topic to Fields and Data Bindings, where we'll properly examine `Rec`, field references, and how page controls connect to data.

### Part Controls

A Part control allows you to embed another page inside the current page.

This is particularly useful when building pages that need to display additional related information.

For example, a Customer Card could contain a FactBox showing the customer's sales statistics.

Example:

```
layout
{
    area(FactBoxes)
    {
        part(ProductDetails; ProductDetailsPart)
        {
            ApplicationArea = All;
        }
    }
}
```

Here:

- `part` declares a page part control.
- `ProductDetails` is the name of the control.
- `ProductDetailsPart` is the page object being embedded.

The referenced page would typically be a `CardPart` or `ListPart`, depending on the information being displayed.

We'll explore page parts and how pages communicate with one another separately.

## Other Layout Controls Worth Knowing

Besides the controls we've discussed, AL provides other controls for specialized layouts.

| Control       | Purpose                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `CueGroup`    | Groups Cue controls, commonly used on RoleCenter pages to display business statistics.                              |
| `GridLayout`  | Arranges controls in a grid of rows and columns.                                                                    |
| `FixedLayout` | Provides a fixed arrangement of controls in rows and columns.                                                       |
| `SystemPart`  | Embeds built-in Business Central functionality, such as Notes or Links.                                             |
| `UserControl` | Embeds a custom user control, such as one built using JavaScript and the Business Central control add-in framework. |

You don't need to master these yet. The most important controls to understand initially are:

- `area`
- `group`
- `repeater`
- `field`
- `part`

## Putting Everything Together

Let's look at a simplified Product Card page that brings together the concepts we've covered.

```
page 50100 ProductCard
{
    PageType = Card;
    SourceTable = Product;
    Caption = 'Product Card';

    layout
    {
        area(Content)
        {
            group(General)
            {
                Caption = 'General';

                field("No."; Rec."No.")
                {
                    ApplicationArea = All;
                }

                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                }
            }

            group(Pricing)
            {
                Caption = 'Pricing';

                field("Unit Price"; Rec."Unit Price")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```


Notice how:

1. `layout` defines the page structure.
2. `area(Content)` defines the main content area.
3. `group` organizes related information into sections.
4. `field` controls display individual pieces of information.

This is essentially how we construct the user interface of a Business Central page.

## Key Takeaways

- The `layout` section defines the visual structure of a page.
- Areas define where controls are placed.
- Groups organize related controls and can create FastTabs.
- Repeaters display collections of records in rows and columns.
- Field controls display individual pieces of information.
- Part controls embed other pages within the current page.
- The available layout areas and supported controls depend on the page type.

## Further Reading

1. [Microsoft Learn – Pages Overview](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-pages-overview)
2. [Microsoft Learn – Page Types and Layouts](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-types-and-layouts)
3. [Microsoft Learn – Working with Repeater Controls](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-repeater-controls)
4. [Microsoft Learn – Working with ListPart Pages](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-designing-listparts)
