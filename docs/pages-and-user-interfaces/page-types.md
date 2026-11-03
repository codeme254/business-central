# Page Types in AL

## What are Page Types?

In Business Central, a Page Type determines the general purpose and behavior of a page object.

Remember, a page object defines the user interface through which users interact with Business Central data and functionality.

However, not all pages serve the same purpose.

For example:

- Some pages display lists of records, such as customers or products.
- Others display detailed information about a single record.
- Some pages allow users to enter information into a dialog.
- Others provide a dashboard containing business information and activities.

Business Central provides different page types to support these different use cases.

We specify the type of a page using the `PageType` property.

Example:

```
page 50100 ProductList
{
    PageType = List;
}
```

Here, `PageType = List` tells Business Central that this page is intended to display a list of records.

## Common Page Types

Let's explore the important page types you'll encounter when developing Business Central extensions.

## Card

A Card page is used to display and manage information about a single business entity or record.

A business entity is something the business needs to keep track of, such as a customer, vendor, item, or employee.

For example, a Customer Card displays information about one customer, including:

- Customer number.
- Customer name.
- Address and contact details.
- Payment terms.
- Credit limit.

When to use it: When users need to view or manage the detailed information of one record at a time.

### Example Card Page

Filename: `CourseCard.Page.al`
```
namespace LearningAl;

page 50103 "Course Card"
{
    Caption = 'Course Card';
    PageType = Card;
    SourceTable = Course;
    ApplicationArea = All;
    UsageCategory = None;

    layout
    {
        area(Content)
        {
            group(General)
            {
                Caption = 'General';

                field("Course Code"; Rec."Course Code")
                {
                    ToolTip = 'Specifies the unique code for the course.';
                }
                field(CourseName; Rec.CourseName)
                {
                    ToolTip = 'Specifies the name of the course.';
                }
                field(CourseDescription; Rec.CourseDescription)
                {
                    ToolTip = 'Specifies a description of the course.';
                    MultiLine = true;
                }
            }
            group(Pricing)
            {
                Caption = 'Pricing & Status';

                field(Price; Rec.Price)
                {
                    ToolTip = 'Specifies the price of the course.';
                }
                field(Status; Rec.Status)
                {
                    ToolTip = 'Specifies the current status of the course.';
                }
            }
        }
    }
}
```

Here, `PageType = Card` tells Business Central that this page is intended for managing an individual product record.

Make sure in the `CourseList` Page (see below), you have `CoursePageId = "Course Card"`, this way, when you click on an ID, this course card page will open.

![card page](/card-page.png)

## List

A List page displays a collection of records from a table.

For example, a Customer List displays multiple customers, usually in rows and columns.

Users can:

- Browse multiple records.
- Search for records.
- Apply filters.
- Sort records.
- Open individual records for more details.
- Edit records directly where permitted.

When to use it: When users need an overview of multiple records and a way to navigate between them.

### Example of List Page

File: `CourseList.Page.al`:
```
namespace LearningAl;

page 50102 CourseList
{
    PageType = List;
    SourceTable = Course;
    Caption = 'Course List';
    ApplicationArea = All;
    UsageCategory = Lists;
    CardPageId = "Course Card";

    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field("Course Code"; Rec."Course Code")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the unique code for the course.';
                }

                field(CourseName; Rec.CourseName)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the name of the course';
                }

                field(CourseDescription; Rec.CourseDescription)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the description of the course.';
                }
                field(Price; Rec.Price)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies a description of the course';
                }
                field(Status; Rec.Status)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the current status of the course';
                }
            }
        }
    }
}
```

![List Page](/list-page.png)

## Document

A Document page is used to manage business transactions or important business events.

Examples include:

- Sales Orders.
- Purchase Orders.
- Sales Invoices.
- Purchase Invoices.
- Sales Quotes.

A document typically consists of two major sections:

1. Header: Contains general information about the transaction, such as customer, document number, and posting date.
2. Lines: Contains the individual items or services involved in the transaction, including quantities and prices.

When to use it: When users need to create, view, or manage business documents involving a header and associated lines.

### Example Document Page

```
page 50102 ProductDocument
{
    PageType = Document;
    SourceTable = Product;
    Caption = 'Product Document';
}
```

Note: This is only a simplified illustration of the declaration. A real document page would normally have an appropriate document header table and an associated lines table.

## RoleCenter

A RoleCenter is the main dashboard or starting page presented to a user based on their assigned role.

It provides an overview of relevant business activities, performance indicators, and shortcuts to commonly used functionality.

For example, a Business Manager RoleCenter might display:

- Sales performance.
- Outstanding invoices.
- Pending approvals.
- Cash flow information.
- Frequently used business activities.

When to use it: When designing a personalized workspace for a particular business role.

Example:

```
page 50103 ProductManagerRoleCenter
{
    PageType = RoleCenter;
    Caption = 'Product Manager';
}
```

Unlike most page types, a RoleCenter does not require a `SourceTable`. Its content is generally assembled from embedded parts.

## Worksheet

A Worksheet page is designed for tasks that involve working with multiple entries in a tabular format, particularly data-entry and inquiry activities.

Examples include:

- Item Journals.
- General Journals.
- Payment Reconciliation Journals.
- Planning Worksheets.

Unlike a typical List page, a Worksheet is often designed around a particular task or process.

For example, an Item Journal allows users to enter multiple inventory adjustments before processing them.

When to use it: When users need to enter, review, or process multiple related entries as part of a business task.

Example:

```
page 50104 ProductWorksheet
{
    PageType = Worksheet;
    SourceTable = Product;
    Caption = 'Product Worksheet';
}
```

## CardPart

[Pages - The Interactive Interface | Programming Microsoft Dynamics 365 Business Central](https://images.openai.com/static-rsc-4/F_X3B-TKwl-GAk9Jb8NVjFxjIE1TH194HJIiRsQhZk_Ummb-mJyQ12jos0fmBGfh8ASwaz-H1CWTCXjVw-dOYMGHIO7nofQJ18HROFkouYW4fXhkBVneF1jrfjcrG1UehCzQQJTnlRUXyNU5JZvbHafdxIkfdJKmEI5ET2FYC4c?purpose=inline)

[subscription.packtpub.com](https://subscription.packtpub.com/book/business-and-other/9781789137798/4/ch04lvl1sec34/card-page?utm_source=chatgpt.com)

A CardPart is a smaller page designed to be embedded inside another page.

It displays information about a single entity, usually as part of a FactBox or another page composition.

For example, while viewing a Customer Card, a FactBox might display additional information about the selected customer, such as:

- Customer statistics.
- Outstanding balances.
- Sales history.

When to use it: When you want to display additional information about a single record without requiring users to navigate away from the current page.

Example:

```
page 50105 ProductDetailsPart
{
    PageType = CardPart;
    SourceTable = Product;
    Caption = 'Product Details';
}
```

## 2.7 ListPart

[Adding a FactBox to a page - Business Central | Microsoft Learn](https://images.openai.com/static-rsc-4/Pga1BHB3yk5fDo5v5fkzX4qn8btEaE90NkTjEX_yKJy_9o-y02CnrftQbwxLoFSjqBSrr4_9j3ReyjxiT3H4J8MPaRIeCEf5xusgF_zbPB-FqNgQnx-yEv-OBjuMmkkE_hiWzdM1AyVIOCM23ofBi6f5d-YJpz5L9xDQBKxUDXY?purpose=inline)

[learn.microsoft.com](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-adding-a-factbox-to-page?utm_source=chatgpt.com)

A ListPart is a smaller page designed to display a collection of records inside another page.

For example, a Sales Order Document page can contain a ListPart displaying the individual sales order lines.

A ListPart can also be embedded in a FactBox to display related records.

When to use it: When you need to display multiple related records within another page.

Example:

```
page 50106 ProductHistoryPart
{
    PageType = ListPart;
    SourceTable = Product;
    Caption = 'Product History';
}
```

Important distinction:

- `CardPart` displays information about a single record.
- `ListPart` displays a collection of records.

Both are designed to be embedded inside other pages rather than used as standalone pages.

## 2.8 ListPlus

[Designing List Pages for Business Central - Business Central | Microsoft Learn](https://images.openai.com/static-rsc-4/1SaH0O5h7_0MQbOpx8HacILMz7gqMls1HL23Twr_gzet3Qnuec2taBaP7Xae-rLVSwMabRsYQcGb0Wo8im2agcOtS7Plr-rULu4j5AW7fpMMGOAWr6X8M-HIObcZoIq6gU2ZPRPvmG1Xw_QPO3YLFmG4YDj2KW7n6Jd21Hj7Cm0?purpose=inline)

[learn.microsoft.com](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-designing-list-pages?utm_source=chatgpt.com)

A ListPlus page combines information about a single entity with a prominent embedded list.

For example, you might have a page displaying information about a particular customer alongside a list of related transactions.

When to use it: When users need to view details about one entity alongside a collection of related records, with the list being a prominent part of the page.

Example:

```
page 50107 ProductOverview
{
    PageType = ListPlus;
    SourceTable = Product;
    Caption = 'Product Overview';
}
```

Unlike a Card page, a ListPlus page must contain at least one `ListPart`.

## 2.9 StandardDialog

[Linked Customer and Vendor](https://images.openai.com/static-rsc-4/_bAb2vKwT3abrTlzhaXRtrDmdjknokLZwRPXBO8S8RN0Z23uRLUgNkwMwv5CJLrTYsgeeAqLe9FTXmk3cEfCAR0q6haidB-x9llqP3zlQ_-mkhd5PashD3k1OGzcsM6OVhcp3xmYNmOcuTUz4LjcsFgnyF2rcw_gIDXO_nEgHQo?purpose=inline)

[learn.d365.global](https://learn.d365.global/Tutorials/D365Guides/D365BusinessCentral/BusinessCentralTips/CustomerVendor/LinkedCustomerVendor?utm_source=chatgpt.com)

A StandardDialog page is used to present users with a dialog containing fields or other inputs needed to perform a task.

For example, you could ask a user to:

- Select a date.
- Enter a quantity.
- Choose a product category.
- Provide parameters for an operation.

When to use it: When users need to provide input or information before proceeding with a particular operation.

Example:

```
page 50108 ProductDialog
{
    PageType = StandardDialog;
    Caption = 'Product Selection';
}
```

## 2.10 ConfirmationDialog

[Siehe verbesserte Nutzungsfreundlichkeit für Lager und Bestand | Microsoft Learn](https://images.openai.com/static-rsc-4/63uoOyLNLPzdan1InYT13GW18Uom_0zL0amq-wn4pySpoi6MWbf-O54tHp5lXm3ngzfS06uDRkEACvwQ-2AoH7I_E1K5ZERc_NDh6s-QOGvbyFmafcXF1TmRY417vfbdnHVAOIas3FLYEsTMo49UCzBHq04fHck3sY5dPkXkqoU?purpose=inline)

[learn.microsoft.com](https://learn.microsoft.com/de-de/dynamics365/release-plan/2023wave2/smb/dynamics365-business-central/usability-improves-warehouse-inventory?utm_source=chatgpt.com)

A ConfirmationDialog page is used to ask users to confirm an action or acknowledge an exceptional situation.

For example:

- Are you sure you want to delete this product?
- Do you want to continue with this operation?
- Are you sure you want to post this document?

When to use it: When an operation requires explicit confirmation from the user.

Example:

```
page 50109 DeleteConfirmation
{
    PageType = ConfirmationDialog;
    Caption = 'Confirm Deletion';
}
```

## 2.11 NavigatePage

[Designing Assisted Setup Guides - Business Central | Microsoft Learn](https://images.openai.com/static-rsc-4/PC591xgP4twjfw5YCcRQhgf8hT_KdPlmUbJ3U-YEPIXDtZenT_BPmviIlUGOa-E1xNFJPbVkVtMMqdYhQNjllxzqjS1TdgufcWFcnXoxzScfw_L68v3PZJ7A8M8JhlHOCuxSNp8qREtxrFmc8C4cHYyXrgie9stdcEbj2NSqvI8?purpose=inline)

[learn.microsoft.com](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-designing-navigate-pages?utm_source=chatgpt.com)

A NavigatePage is used to create a wizard-like experience that guides users through a sequence of steps to complete a task.

For example, imagine setting up a new product:

1. Enter basic product information.
2. Select a product category.
3. Configure pricing.
4. Review the information.
5. Complete the setup.

Instead of presenting everything on one page, a NavigatePage can guide the user through these steps.

When to use it: When a task involves multiple sequential steps and users need guidance through the process.

Example:

```
page 50110 ProductSetupWizard
{
    PageType = NavigatePage;
    Caption = 'Product Setup Wizard';
}
```

## 2.12 HeadlinePart

[Simple Role Center example - Business Central | Microsoft Learn](https://images.openai.com/static-rsc-4/9CDZLAwkVKU6r3V4chHfcjoUi6zvGSoDpjcdJZYCK2dOqLXoZUfvQeyLSd8SRu5iixlmaUL-3FlbnRs_Iuei_tgiI5530gpJs8bFHrERk5ROELIXLRE2Fb2XYa7tegMpv3mnrBbm3uBfAsJYR3kUki7Ay8tDJB1ajSDaDhdi2VE?purpose=inline)

[learn.microsoft.com](https://learn.microsoft.com/es-mx/dynamics365/business-central/dev-itpro/developer/devenv-simple-role-center-example?utm_source=chatgpt.com)

A HeadlinePart is a page designed to display contextual headlines and insights within a RoleCenter.

For example, a Business Manager RoleCenter might display headlines about:

- Business performance.
- Sales activities.
- Outstanding tasks.
- Relevant business insights.

When to use it: When you want to display changing or contextual headlines on a RoleCenter.

Example:

```
page 50111 ProductHeadline
{
    PageType = HeadlinePart;
}
```

## 2.13 API

An API page is a special page type used to expose Business Central data and functionality to external applications through web services.

Unlike the page types we've discussed so far, API pages are not designed for users to interact with through the Business Central user interface.

For example, suppose you have a React application that needs to retrieve customer records from Business Central.

You can create an API page that exposes customer data, allowing your React application to communicate with Business Central through HTTP requests.

When to use it: When integrating Business Central with external applications and services.

Example:

```
page 50112 ProductsAPI
{
    PageType = API;
    APIPublisher = 'learning';
    APIGroup = 'inventory';
    APIVersion = 'v1.0';

    EntityName = 'product';
    EntitySetName = 'products';

    SourceTable = Product;
    ODataKeyFields = SystemId;
}
```

We'll cover API pages and integrations separately when we get to Business Central integrations.

Important: API pages generate web service endpoints and cannot be displayed as ordinary user interface pages.

## 2.14 PromptDialog

A PromptDialog is a specialized page type for creating generative AI experiences with the Copilot look and feel.

It allows developers to build interactions where users provide prompts and receive AI-generated responses.

When to use it: When developing Copilot-style experiences within Business Central.

This is an advanced page type introduced in runtime 12.1. It also requires the `PromptMode` property.

You don't need to master this one yet.

## 3. Other Specialized Page Types

There are additional page types worth recognizing, even though you won't encounter them as frequently when building ordinary business application interfaces.

| Page type              | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `ReportPreview`        | Used for previewing reports.                                             |
| `ReportProcessingOnly` | Used for report processing without presenting a normal report output.    |
| `XmlPort`              | Used for XMLPort-related page functionality.                             |
| `UserControlHost`      | Hosts a single user control in the Business Central client.              |
| `ConfigurationDialog`  | Intended for collecting configuration input for a process or automation. |

`ConfigurationDialog` is currently under development and cannot be used in an extension, according to Microsoft's documentation.

You don't need to implement these for now. Just recognize their purpose.

Source: [Microsoft – PageType Property](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-pagetype-property?wt.mc_id=DX-MVP-5004336\&utm_source=chatgpt.com).

## 4. Understanding Page Types by Their Purpose

Rather than memorizing all these page types individually, let's organize them according to the problems they solve.

| Category            | Page types                                                     | Main purpose                                                  |
| ------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Entity-oriented     | Card, Document, ListPlus                                       | Work with an individual business entity or transaction.       |
| Collection-oriented | List, Worksheet                                                | Work with multiple records or entries.                        |
| Embedded pages      | CardPart, ListPart, HeadlinePart                               | Display information inside other pages.                       |
| Dashboard           | RoleCenter                                                     | Provide a workspace for a particular business role.           |
| Dialogs             | StandardDialog, ConfirmationDialog, NavigatePage, PromptDialog | Collect input, confirm actions, or guide users through tasks. |
| Integration         | API                                                            | Expose data and functionality to external applications.       |

One particularly important distinction is between entity-oriented and collection-oriented pages.

- Entity-oriented pages focus on one business entity, such as a customer, product, or sales order.
- Collection-oriented pages focus on multiple records, such as a list of customers or journal entries.

This distinction helps you choose the appropriate page type when designing an extension.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://learn.microsoft.com\&sz=32)

Microsoft Learn+1



## 5. Quick Comparison: Card vs List vs Document vs Worksheet

These four are particularly important when developing ordinary Business Central applications.

[Dynamics 365 Business Central vs Customer Engagement](https://images.openai.com/static-rsc-4/M6DLAiL5pLzrh_hO_Po93dGUYVAUumt5FL71k2nfjHUCEYsAIOIhLUdgfebWF4Yb8X8JaNdT1B8IrxukvEz9ShABGBkOaYKOg7twb2kKRK-jVE2r5dlX5-NNdqsbwF_FOrbWvD79GlSNwtVFpBZ1pzPFb6tOZgDptSsEkoTHExQ?purpose=inline)

Card

Manages one record.

Example: Customer Card.

[cmty_blog_detail](https://images.openai.com/static-rsc-4/zaoaJjhlAwKwd_ze2KPRNNDpn8AhtpLyIEvGwOK_RvhhMNrNgyXj4itHCxQcqKc7RKQKoNCS86BzG7HFUdEAaC9Jlguryi_40exiDZsKcy6vZhm5Q_q3XjmAuxlElTmP0l5n3WRmg0VLB0nxrW9o9a3yojdH0-Ym34qtJnoTrj4?purpose=inline)

List

Displays multiple records.

Example: Customer List.

[How to Manage the Sales Process in Microsoft Dynamics 365 Business Central](https://images.openai.com/static-rsc-4/E5N7DHWtRYwSwXeJaS7l8k5BfdVzvZ7uU8u6h89T503zp1vi8aaShbTKscpt6nZS7FrOVK0DkLO0FAdheHXur4nsVG_vwtvZ6S2cd6kOC2WmsTEq4Qf5QbQ2kORh5EuCnWvl9yQ09cLoNDKzR4ArQO_f9OehhasLVR39MURtMhc?purpose=inline)

Document

Manages a business transaction, typically with a header and lines.

Example: Sales Order.

[Standard General Journal Business Central at David Sells blog](https://images.openai.com/static-rsc-4/wtBplJ1YtvHbpnBjgA-deiLyZbtz6W-q4txaACo7bUq27U4-TAlo51smxJGtOh3sdI7ibPEAUQG60ixZ0AMMfn8HNNR-ZgqEdsGRFd9rNxkUVzWpd1v9AfeBXAyX8fspchW2dXe0M4wwd_z6pVOQqQ4szXkG8LOVxU0Xy2kskFU?purpose=inline)

Worksheet

Supports task-oriented, line-based data entry.

Example: General Journal.

## 6. Important Things to Remember

1. The `PageType` property determines the general purpose and layout behavior of a page.
2. A Card page manages an individual record, while a List page displays multiple records.
3. Document pages represent business transactions and commonly contain headers and lines.
4. RoleCenter pages provide a starting workspace for users.
5. CardPart and ListPart pages are designed to be embedded inside other pages.
6. API pages expose Business Central data to external applications rather than displaying a user interface.
7. Not every page type is associated with a `SourceTable`.

## Further Reading

- [Microsoft Learn – Page Types and Layouts](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-types-and-layouts)
- [Microsoft Learn – PageType Property](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-pagetype-property)
- [Microsoft Learn – API Pages](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-api-pagetype)
