# Tables, Pages, Codeunits and Enums
In Business Central, AL development revolves around different types of objects. Each object serves a particular purpose, and understanding these objects will help you understand how extensions are structured.

Let's look at four important ones.

## Tables

A **table** defines the structure of business data and stores its records.

Tables contain fields, which define the individual pieces of information stored for each record.

**Example:** A `Course` table might store information about training courses.

| Course Code | Course Name | Price |
|---|---|---:|
| CS101 | Introduction to Programming | 1500 |
| CS102 | Database Fundamentals | 2000 |
| CS103 | Web Development | 2500 |

In this example:
- The table is `Course`.
- The columns represent fields.
- Each row represents a record.

**Think of a table as the place where your business data lives.**

Other examples of tables in Business Central include Customer, Vendor, Item, and Sales Header.

## Pages

A **page** provides the user interface through which users view and interact with business data and functionality.

Pages can display records, accept user input, and provide actions for performing tasks.

For example, a Course List page could display the courses stored in our `Course` table.

| Course Code | Course Name | Price |
|---|---|---:|
| CS101 | Introduction to Programming | 1500 |
| CS102 | Database Fundamentals | 2000 |
| CS103 | Web Development | 2500 |

A user could open the page in Business Central, view the courses, and—if the page and permissions allow it—create or edit records.

Common page types include:
- **List:** Displays multiple records.
- **Card:** Focuses on one record.
- **Document:** Presents a business document, such as a sales order.
- **Role Center:** Provides a workspace with information and links relevant to a user's role.

**Think of a page as the window through which users interact with business data.**

The table stores the data; the page makes it accessible through the interface.

## Codeunits

A **codeunit** is an AL object used to organize and execute business logic.

Unlike a page, which primarily provides an interface, a codeunit focuses on performing operations.

For example, imagine we want to calculate a discount for a training course.

We could place the discount-calculation logic in a codeunit so that different parts of our application can reuse it.

Other examples of tasks a codeunit could perform include:
- Calculating order totals.
- Processing business transactions.
- Sending notifications.
- Validating business rules.
- Coordinating operations across multiple tables.

A codeunit can contain procedures and other supported AL constructs. Its logic can be invoked by pages, other codeunits, event subscribers, or other parts of the application.

**Think of a codeunit as a container for reusable business logic.**

For example, our course catalogue might eventually have a codeunit responsible for calculating course fees and discounts.

## Enums

An **enum**, short for *enumeration*, defines a set of named values from which a field or variable can select.

Enums are useful when a value must belong to a predefined set of choices.

For example, each training course might have a status.

We could define a `Course Status` enum with these values:

- Draft
- Published
- Archived

A course's status could then be set to one of those defined values rather than accepting arbitrary text such as `"Still Working On It"` or `"Available Soon"`.

Enums are commonly used with table fields to represent statuses, categories, and other predefined choices.

**Think of an enum as a predefined set of valid options.**

Other examples include payment status, approval status, and shipment status.


## Quick summary

| Object | Primary purpose | Example in our course catalogue |
|---|---|---|
| **Table** | Defines and stores business data | Stores course names, codes, and prices |
| **Page** | Provides a user interface | Displays courses in Business Central |
| **Codeunit** | Organizes and executes business logic | Calculates course discounts |
| **Enum** | Defines a set of named values | Defines Draft, Published, and Archived statuses |

### How they work together

Imagine we're building our training-course application:

1. A **table** stores each course and its details.
2. An **enum** defines the valid statuses a course can have.
3. A **page** lets users view and manage courses.
4. A **codeunit** performs operations such as calculating discounts.

Together, these objects help us build an organized Business Central extension.

One final distinction worth remembering: these are different AL object types, not four mandatory components of every extension. A small extension might use only a page extension and a codeunit, for example, while a larger application may use all four alongside many other objects.

Other important objects worth looking at are:
- **Report**: processes and presents data, often for printing or analysis.
- **Query**: defines a structured way to retrieve data.
- **XMLport**: handles structured data import and export.