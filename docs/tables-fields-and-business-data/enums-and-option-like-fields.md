# Enum and Option-Like Fields in AL

So far, our `Course` table has fields such as `Course Name`, `Description`, and `Price`. These fields accept values of types like `Text` and `Decimal`.

But what if we want a field that only accepts values from a predefined set?

For example, suppose every course must have a status:

- Planned
- In Progress
- Completed

We don't want users typing `"In progress"`, `"in progress"`, `"Progress"`, or `"Started"` and ending up with inconsistent data.

**Enums solve this problem by defining a fixed set of named values.**

## What is an Enum?

An **enum** (enumeration) is a data type that represents a predefined set of named values.

Think of it as a dropdown whose available choices are defined in code.

For our Course table, we could define a `Course Status` enum with these values:

| Enum value | Meaning |
|---|---|
| `Planned` | The course hasn't started. |
| `InProgress` | The course is underway. |
| `Completed` | The course has finished. |

Rather than accepting arbitrary text, a field using this enum stores one of the defined choices.

Enums are separate AL objects, so you can reuse the same enum in multiple fields or tables.

## Create our first Enum

Let's implement this using our existing `Course` table.

### Step 1: Create `CourseStatus.Enum.al`

In VS Code, create a new file named `CourseStatus.Enum.al`:

```al
namespace LearningAl;

enum 50106 "Course Status"
{
    Extensible = true;

    value(0; Planned)
    {
        Caption = 'Planned';
    }

    value(1; InProgress)
    {
        Caption = 'In Progress';
    }

    value(2; Completed)
    {
        Caption = 'Completed';
    }
}
```

Let's understand the important parts:

- `enum 50106 "Course Status"` declares an enum object with ID `50106`.
- `value(0; Planned)` defines a possible value, with value ID `0` and the name `Planned`.
- `Caption` specifies how the value is displayed to users.
- `Extensible = true` allows other extensions to add values to this enum.

**One important distinction:** The enum's value ID is not the same thing as its name or caption. The ID identifies the value internally, the name is used in AL code, and the caption is intended for display.

For example, we can refer to the `InProgress` value in code, while users see **In Progress**.

### Step 2: Add the Enum to our Course table

Open `Course.Table.al` and add a fifth field inside the existing `fields` block:

```al
field(5; Status; Enum "Course Status")
{
    Caption = 'Status';
    DataClassification = CustomerContent;
}
```

Our new field uses the enum we just created.

Conceptually, the Course table now contains:

| Course Code | Course Name | Price | Status |
|---|---|---:|---|
| CS101 | Introduction to Programming | 1500 | Planned |
| CS102 | Database Fundamentals | 2000 | In Progress |
| CS103 | Web Development | 2500 | Completed |

These are illustrative records. You'll be able to enter actual data after exposing the field through your page.

### Step 3: Publish and test

Save both files and press **F5**.

Our existing Course List page won't automatically display the new field. For now, you can add `Status` to the page's `repeater`:

```al
field(Status; Rec.Status)
{
    ApplicationArea = All;
}
```

Publish again, open Course List, and try editing a record's status. Business Central should offer the defined enum choices rather than allowing arbitrary text.

## What about `Option` fields?

Before enums became the preferred approach for this kind of extensible design, AL developers commonly used the `Option` data type.

For example, an older field might look like this:

```al
field(5; Status; Option)
{
    Caption = 'Status';
    OptionMembers = Planned,InProgress,Completed;
    OptionCaption = 'Planned,In Progress,Completed';
}
```

Here:
- `OptionMembers` defines the available values.
- `OptionCaption` defines the captions displayed to users.

The field restricts values to the options specified in its declaration.

### Option vs Enum

| Feature | `Option` | `Enum` |
|---|---|---|
| Defines predefined choices | Yes | Yes |
| Has named values | Yes | Yes |
| Can be reused as a separately defined AL object | No; options are declared on fields or variables | Yes |
| Can be extended by another extension | Not in the same way | Yes, when extensibility is enabled |
| Preferred for new, extensible designs | Generally no | Yes |

**The practical rule:** For new AL development, prefer `Enum` when a field needs a fixed set of named choices. You'll encounter `Option` in older code, so it's worth understanding, but you generally shouldn't choose it for new fields.

## A subtle but important detail

An enum field doesn't necessarily require the user to choose a value explicitly before the record is saved. For example, if the enum's first value is `Planned`, a new record may initially have that value as its default.

If a business rule requires a particular status or transition, you'll need to implement that rule separately.

Also, changing an enum's existing value IDs or removing values after deployment can have data-compatibility implications. Treat deployed enum values as part of your data model.

### Official documentation

- [Enum object — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-extensible-enums)
- [Option data type — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/option/option-data-type)
