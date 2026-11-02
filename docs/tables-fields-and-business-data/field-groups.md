# Field Groups in AL

Field groups let you **group selected table fields for specific purposes in the Business Central user interface**.

We've already learned how to define fields in a table. For example, our `Course` table has `Course Code`, `Course Name`, `Description`, and `Price`.

But sometimes, Business Central needs to know which fields to use for a particular UI feature, rather than simply storing them in the table.

That's where field groups come in.

## The main field group you'll encounter: `DropDown`

Suppose you have a list of courses and another page where users need to select a course from a lookup.

Instead of showing only the course code, you might want the lookup to display both the **Course Code** and **Course Name**.

A `DropDown` field group can specify which fields Business Central displays in supported dropdown and lookup experiences.

Business Central also supports a `Brick` field group, which is used for displaying records as tiles in supported list-page tile views. [Microsoft Learn](https://learn.microsoft.com/da-dk/dynamics365/business-central/dev-itpro/developer/devenv-field-groups)

## Add a `DropDown` field group to our Course table

Let's use our existing `Course` table for a practical example.

Open `Course.Table.al` and add the following block **after the `keys` block, but inside the table object**:

```al
fieldgroups
{
    fieldgroup(DropDown; "Course Code", "Course Name")
    {
    }
}
```

Your table should now have this general structure:

```al
namespace LearningAl;

table 50102 Course
{
    Caption = 'Course';
    DataClassification = CustomerContent;

    fields
    {
        // Your existing fields remain here.
    }

    keys
    {
        key(PK; "Course Code")
        {
            Clustered = true;
        }
    }

    fieldgroups
    {
        fieldgroup(DropDown; "Course Code", "Course Name")
        {
        }
    }
}
```

**Keep your existing field definitions.** The comments above simply indicate where they belong.

### Understanding the syntax

```al
fieldgroup(DropDown; "Course Code", "Course Name")
```

- `fieldgroups` introduces the field-group definitions.
- `fieldgroup` declares one group.
- `DropDown` identifies the type of group.
- `"Course Code"` and `"Course Name"` specify the fields to include.

Notice that the field names are separated by **commas**, unlike the semicolons separating the arguments in our earlier `field(...)` declaration.

## What happens when we publish?

Save your file and press **F5**.

The field group tells Business Central which fields to use in supported dropdown and lookup experiences involving the Course table.

One important caveat: defining a field group doesn't automatically make every page display a dropdown containing those fields. The result depends on how the relevant page and lookup are implemented.

## What about field groups in table extensions?

You can also extend field groups on existing tables.

For example, suppose we wanted to add our custom `Training Level` field to the Customer table's dropdown field group. We could extend `CustomerExt.TableExt.al` with:

```al
fieldgroups
{
    addlast(DropDown; "Training Level")
    {
    }
}
```

Here, `addlast` adds the field to the end of the specified field group. The field must already exist on the table, and the target field group must support the operation. [Microsoft Learn](https://learn.microsoft.com/da-dk/dynamics365/business-central/dev-itpro/developer/devenv-field-groups)

## Key takeaways

- **`DropDown`** specifies fields for supported dropdown and lookup experiences.
- **`Brick`** specifies fields used when displaying records as tiles in supported tile views.
- Field groups are defined on tables or extended through table extensions.
- Field groups influence how records are presented; they don't create new database fields.

**Microsoft documentation:** [Field groups in Business Central](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-field-groups)

That's the core concept. We can now move on to **Table Relationships (`TableRelation`)**, where we'll learn how to connect fields across tables and restrict which records users can select.