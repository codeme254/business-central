# Page Objects

## What is a Page Object?

A Page Object in AL defines the user interface through which users interact with Business Central data and functionality.

Think of it this way:

- Table objects define how data is stored.
- Page objects define how users interact with that data.
- Codeunits contain reusable business logic.

For example, suppose we have a `Product` table containing product information.

We can create a page object that allows users to:

- View products.
- Open individual product records.
- Create new products.
- Modify existing products.

A page object does not necessarily store data itself. Instead, it provides an interface for accessing and interacting with data stored in tables.

## Declaring a Page Object

A page object is declared using the `page` keyword, followed by its object ID, name, and body.

Example:

```
page 50100 ProductList
{
    PageType = List;
    SourceTable = Product;

    ApplicationArea = All;
    UsageCategory = Lists;

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
            }
        }
    }
}
```

Let's break down the declaration:

| Component     | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| `page`        | Declares a page object.                                                  |
| `50100`       | The unique object ID within the relevant object ID range.                |
| `ProductList` | The name of the page object.                                             |
| `{ }`         | Contains the page's properties, layout, triggers, and other definitions. |

Note: We'll cover `PageType`, `SourceTable`, `layout`, `area`, `repeater`, and `field` in their respective topics. For now, focus on understanding the overall page object structure.

## Page Object Properties

Page objects have properties that determine their identity, behavior, and how they are presented or accessed within Business Central.

Some important properties include:

| Property          | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `Caption`         | Specifies the user-facing title of the page.                                    |
| `PageType`        | Determines the type and general behavior of the page.                           |
| `SourceTable`     | Specifies the table from which the page retrieves its records.                  |
| `ApplicationArea` | Controls the application areas in which the page or its elements are available. |
| `UsageCategory`   | Determines how the page is categorized in Tell Me search.                       |
| `Editable`        | Determines whether users can edit records through the page.                     |

Example:

```
page 50100 ProductList
{
    Caption = 'Products';
    PageType = List;
    SourceTable = Product;
    ApplicationArea = All;
    UsageCategory = Lists;
    Editable = true;
}
```

We'll explore these properties in more detail as we progress through the chapter.

## Page Object IDs and Naming

Like other AL application objects, page objects require an ID and a name.

- Object ID: A unique numeric identifier for the page object within the application.
- Object Name: An identifier used to reference the page in AL code.

For example:

```
page 50100 ProductList
{
    // Page definition
}
```

Here:

- `50100` is the page ID.
- `ProductList` is the page name.

You can reference this page elsewhere in AL using its name or ID, depending on the context.

Important: Object IDs must not conflict with other objects in the same application scope. When developing extensions, use an assigned object ID range to avoid conflicts with other applications.

## Where Do Page Objects Appear in Business Central?

Page objects provide the user-facing experience in Business Central.

Depending on their configuration, they can appear in different places, including:

- Role Center: The user's starting workspace.
- Lists: Pages displaying collections of records.
- Cards: Pages displaying individual records and their details.
- Documents: Pages used to work with business documents.
- Dialogs: Pages used for specific interactions with users.

We'll examine these page types separately in the next topic.

## Key Takeaways

- A Page Object defines a user interface in Business Central.
- Page objects allow users to interact with data stored in tables.
- Every page object has an ID and a name.
- Page objects contain properties, layout definitions, triggers, and other AL constructs.
- The `page` keyword is used to declare a page object.
- The `SourceTable` property associates a page with a table.

## Further Reading

- [Microsoft Learn – Page Object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-object)
- [Microsoft Learn – Page Properties](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-properties)

