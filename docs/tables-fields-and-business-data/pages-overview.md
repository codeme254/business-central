# Pages in AL: Overview and Creating Our First Page

A **page** is the user interface through which people view and interact with data in Business Central. Pages can display records, accept user input, and provide actions for performing business tasks. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-pages-overview?trk=article-ssr-frontend-pulse_little-text-block)

We've already created our `Course` table. Now let's create a page that displays its data.

## Common page types

Business Central has several page types, each designed for a particular purpose.

| Page type | Purpose | Example |
|---|---|---|
| `List` | Displays multiple records in rows. | A list of training courses |
| `Card` | Displays and edits one record at a time. | Details of a particular course |
| `Document` | Presents a business document, often combining a header and lines. | A sales order |
| `RoleCenter` | Provides a user's main workspace. | A sales manager's home page |
| `ListPart` | Displays a list within another page. | Related records in a FactBox |
| `StandardDialog` | Collects user input for a task. | A dialog asking for parameters |

For now, we'll focus on **List** and **Card** pages. These will be sufficient for our course catalogue. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-pages-overview?trk=article-ssr-frontend-pulse_little-text-block)

## How do we create a page?

Let's create a List page for our `Course` table.

In VS Code, create a new file named `CourseList.Page.al`.

Add the following code:

```al
namespace LearningAl;

page 50103 "Course List"
{
    PageType = List;
    SourceTable = Course;
    Caption = 'Course List';
    ApplicationArea = All;
    UsageCategory = Lists;

    layout
    {
        area(Content)
        {
            repeater(General)
            {
                field("Course Code"; Rec."Course Code")
                {
                    ApplicationArea = All;
                }

                field("Course Name"; Rec."Course Name")
                {
                    ApplicationArea = All;
                }

                field(Description; Rec.Description)
                {
                    ApplicationArea = All;
                }

                field(Price; Rec.Price)
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

Let's understand the important parts without getting too deep into page development yet.

### A. Declaring the page

```al
page 50103 "Course List"
```

This declares a page object with ID `50103` and the name `Course List`.

Like tables, pages have object IDs. Make sure the ID is available in your project's permitted range.

### B. Connecting the page to our table

```al
PageType = List;
SourceTable = Course;
```

These two properties are particularly important.

- `PageType = List` tells Business Central to display records in a list.
- `SourceTable = Course` tells Business Central that the page works with records from our `Course` table.

**The page doesn't store the course data itself.** It displays and interacts with records stored in the table.

### C. Defining the layout

```al
layout
{
    area(Content)
    {
        repeater(General)
        {
            // Fields go here
        }
    }
}
```

The `layout` section defines the page's visual structure.

- `area(Content)` defines the main content area.
- `repeater(General)` defines a group of controls that repeats for each record in the list.

Because this is a List page, each course will appear as a row.

### D. Displaying table fields

Consider this control:

```al
field("Course Name"; Rec."Course Name")
{
    ApplicationArea = All;
}
```

It tells Business Central to display the `Course Name` field from the current record.

`Rec` is the page's record variable. Since our source table is `Course`, `Rec` represents a course record.

We've included four fields in our page, so those fields will appear as columns in the list.

The other two properties are:

- `Caption = 'Course List'`: Provides the page's display title.
- `UsageCategory = Lists`: Categorizes the page for discovery through Business Central's navigation and Tell Me search.

These properties help make the page accessible to users. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-object)

## Publish and view the page in Business Central

Let's see our work!

**Step 1:** Save `CourseList.Page.al`.

**Step 2:** Press **F5** in VS Code to publish your extension.

**Step 3:** Wait for publishing to complete successfully.

**Step 4:** Open Business Central in your browser.

**Step 5:** Press `Alt+Q` to open Tell Me, then search for **Course List**.

**Step 6:** Open the page.

You should see a list with these columns:

| Course Code | Course Name | Description | Price |
|---|---|---|---:|
| | | | |

If there are no records in the table yet, the list will be empty. That's expected.

### Add some sample records

If the page allows editing, create a few courses:

| Course Code | Course Name | Description | Price |
|---|---|---|---:|
| CS101 | Introduction to Programming | Learn programming fundamentals | 1500 |
| CS102 | Database Fundamentals | Learn relational databases | 2000 |
| CS103 | Web Development | Build web applications | 2500 |

Save each record by completing the row and moving out of it.

If editing is unavailable, check the page's editability and your permissions.

Once saved, the records should appear in your list.

**Congratulations!** You've created a table, connected a page to it, and displayed your business data in Business Central.

## What we've learned

The relationship between our objects is now:

**`Course` table → `Course List` page → Business Central interface**

The table defines the structure and stores the data. The page presents that data to users.

We'll keep this page throughout the rest of the tables module. Whenever we introduce a new field or data-related concept, we can update the page to see the results.

### Official documentation

- [Microsoft Learn: Pages overview](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-pages-overview?trk=article-ssr-frontend-pulse_little-text-block)
- [Microsoft Learn: Page object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-object)
- [Microsoft Learn: Page types and layouts](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-types-and-layouts)