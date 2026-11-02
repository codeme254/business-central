# Creating Tables in AL

We'll learn these topics by building a small **training course catalogue** in Business Central. We'll start with a basic table, then examine its fields, object IDs, primary key, and properties. After that, we'll create a page to view the data.

The goal is to understand not just how to write the code, but why each part exists.

## Creating a table

As we discussed, a table defines the structure of business data and stores its records.

Imagine we're building a training management application. We need to store information about the courses our organization offers.

Each course might have:
- A unique course code.
- A course name.
- A description.
- A price.

In AL, we define a table using the `table` object.

Create a new file in your AL project called `Course.Table.al` and add the following:

```al
namespace LearningAl;

table 50102 Course
{
    Caption = 'Course';
    DataClassification = CustomerContent;

    fields
    {
        field(1; "Course Code"; Code[20])
        {
            Caption = 'Course Code';
            DataClassification = CustomerContent;
        }

        field(2; "Course Name"; Text[100])
        {
            Caption = 'Course Name';
            DataClassification = CustomerContent;
        }

        field(3; Description; Text[250])
        {
            Caption = 'Description';
            DataClassification = CustomerContent;
        }

        field(4; Price; Decimal)
        {
            Caption = 'Price';
            DataClassification = CustomerContent;
        }
    }

    keys
    {
        key(PK; "Course Code")
        {
            Clustered = true;
        }
    }
}
```

Save the file. We'll break down the important parts before publishing it.

## Defining fields and field data types

Look at this part of our table:

```al
field(1; "Course Code"; Code[20])
{
    Caption = 'Course Code';
    DataClassification = CustomerContent;
}
```

Every field declaration has three essential components:

`field(Field ID; Field Name; Data Type)`

| Component | Example | Purpose |
|---|---|---|
| Field ID | `1` | Identifies the field within the table |
| Field name | `"Course Code"` | Identifies the field in AL code |
| Data type | `Code[20]` | Defines what kind of value the field can hold |

### Understanding the data types

Our table uses four fields with three different data types.

| Field | Data type | Why we chose it |
|---|---|---|
| `"Course Code"` | `Code[20]` | Course codes are identifiers, such as `CS101`. |
| `"Course Name"` | `Text[100]` | Stores a course name of up to 100 characters. |
| `Description` | `Text[250]` | Stores a longer description of up to 250 characters. |
| `Price` | `Decimal` | Stores a numeric value that can include a fractional part. |

Here are some other data types you'll encounter frequently:

| Data type | Purpose | Example |
|---|---|---|
| `Integer` | Whole numbers | Number of lessons |
| `Boolean` | True or false values | Whether a course is active |
| `Date` | Calendar dates | Course start date |
| `DateTime` | Date and time | When a course was created |
| `Time` | Time of day | Course start time |
| `Enum` | A predefined set of named values | Course status |
| `Guid` | A globally unique identifier | An identifier for a record or resource |

**A useful rule:** Choose the data type based on what the value represents, not just what it looks like.

For example, `CS101` contains numbers, but it's an identifier, not a number you need to perform arithmetic on. That's why `Code[20]` is appropriate.

Likewise, `Price` uses `Decimal` rather than `Integer` because prices can include fractional amounts.


## Object IDs and naming conventions

Look at our table declaration:

```al
table 50102 Course
```

There are three important parts:

- `table` tells AL that we're declaring a table object.
- `50102` is the object's ID.
- `Course` is the object's name.

### What are object IDs?

Business Central uses object IDs to identify application objects.

For example, our project currently has these objects:

| Object | ID |
|---|---:|
| Product table | 50100 |
| Product List page | 50101 |
| Course table | 50102 |

These IDs must comply with the permitted object ID range for your project and must not conflict with other objects in the applicable scope.

For this exercise, we're using IDs in the `50100` range, assuming that range is available in your environment.

### What are naming conventions?

Naming conventions are guidelines that help developers name objects consistently.

For example:

| Object | Example name |
|---|---|
| Table | `Course` |
| List page | `Course List` |
| Card page | `Course Card` |
| Codeunit | `Course Management` |
| Enum | `Course Status` |

Notice that the names describe the objects' purposes.

In AL, table and field names can contain spaces and punctuation when appropriately quoted. For example, `"Course Code"` is valid.

**Why does this matter?**

Consistent naming makes a project easier to navigate, understand, and maintain, especially when an extension contains dozens or hundreds of objects.

One additional convention: custom AL objects generally use IDs from the range assigned to your extension. In real projects, always check your team's ID allocation and naming standards rather than assuming a particular range is available.

## Primary keys

Now look at the bottom of our table:

```al
keys
{
    key(PK; "Course Code")
    {
        Clustered = true;
    }
}
```

This defines the table's primary key.

A **primary key uniquely identifies a record in a table**.

Imagine our course table contains the following data:

| Course Code | Course Name | Price |
|---|---|---:|
| CS101 | Introduction to Programming | 1500 |
| CS102 | Database Fundamentals | 2000 |
| CS103 | Web Development | 2500 |

Each course has a unique code.

If we attempted to create another record with course code `CS101`, it would violate the primary key's uniqueness requirement.

### Breaking down the key declaration

```al
key(PK; "Course Code")
{
    Clustered = true;
}
```

- `key` declares a key on the table.
- `PK` is the name we assigned to the key. It's a common abbreviation for *primary key*.
- `"Course Code"` is the field used to identify each record.
- `Clustered = true` specifies that this key is clustered.

The key name `PK` is a developer-chosen name; the important part is that the key identifies records according to the fields specified.

### Can a primary key contain multiple fields?

Yes. A primary key can consist of multiple fields.

For example, imagine a table storing course sessions. A course might have multiple sessions, so the course code alone wouldn't uniquely identify each session.

A composite key could use both `Course Code` and `Session Code` to identify each record.

For our current table, however, a single field is sufficient.

**Remember:** A table's primary key is essential for uniquely identifying its records. Other keys can also be defined to support different access patterns.

---

## Field properties

Fields can have properties that control their metadata, behavior, and how they're used.

We've already used two:

```al
field(4; Price; Decimal)
{
    Caption = 'Price';
    DataClassification = CustomerContent;
}
```

Let's understand them.

### `Caption`

```al
Caption = 'Price';
```

The caption is the user-friendly label associated with the field.

A caption can be displayed in the Business Central interface instead of relying solely on the field's technical name.

For example, a field named `CourseName` could have the caption `Course Name`.

### `DataClassification`

```al
DataClassification = CustomerContent;
```

This property classifies the type of data stored in the field.

`CustomerContent` is appropriate for information such as course descriptions and names entered or maintained by users.

Data classification supports data governance and privacy-related processes. **It does not, by itself, secure or encrypt the data.**

More values:
| Value | Meaning | Example |
|---|---|---|
| `CustomerContent` | Business content supplied or maintained by the customer | Course descriptions |
| `EndUserIdentifiableInformation` | Information that directly identifies an end user | A person's name or email address |
| `EndUserPseudonymousIdentifiers` | Identifiers associated with an end user that are pseudonymous rather than directly identifying | A pseudonymous user identifier |
| `AccountData` | Information associated with an account | Account-related information |
| `OrganizationIdentifiableInformation` | Information that identifies an organization | An organization's identifying details |
| `SystemMetadata` | Technical information about the system | System-generated metadata |
| `ToBeClassified` | Data whose classification has not yet been determined | A field awaiting classification |

### Other useful field properties

Here are a few additional properties you'll encounter as we progress:

| Property | Purpose |
|---|---|
| `Caption` | Specifies the user-facing label. |
| `DataClassification` | Classifies the data stored in the field. |
| `Editable` | Controls whether the field can be edited in supported contexts. |
| `NotBlank` | Requires a nonblank value for a field when applicable. |
| `InitValue` | Specifies an initial value for the field. |
| `MinValue` | Specifies the minimum permitted value for applicable data types. |
| `MaxValue` | Specifies the maximum permitted value for applicable data types. |

We'll explore these when we need them. Some properties have specific limitations or behaviors depending on the field's data type and the operation being performed.

For example, setting a field's `Editable` property to `false` isn't the same as enforcing a business rule that prevents the underlying data from being changed. Field validation and table logic require separate consideration.

---

## What happens when we publish this table?

At this point, we've defined the table's structure, but we haven't created any course records.

After saving the file, publish your extension using your usual AL workflow.

If compilation succeeds, the table definition will be included in your extension. However, **you won't automatically get a visible page for managing courses**.

That's why our next practical step will be to create a List page connected to the `Course` table. We can then return to the table topics and see the effects of our changes directly in Business Central.

### Official documentation

- [Table object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-object)
- [Table keys](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-keys)
- [AL data types](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/library)

### Quick knowledge check

Before we move on, make sure you can answer these five questions:

1. What is the difference between a table and a field?
2. Why would we use `Code[20]` for a course code rather than `Integer`?
3. What is the purpose of an object's ID?
4. Why did we choose `"Course Code"` as our primary key?
5. What is the difference between a field's `Caption` and its `DataClassification`?

You don't need to memorize every property right now. The important thing is to understand how a table is structured and why we've defined it this way.