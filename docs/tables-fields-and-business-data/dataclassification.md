# DataClassification in AL

We've been adding this property to almost every field in our tables:

```al
DataClassification = CustomerContent;
```

But what does it actually do? And why does Business Central care about how we classify our data?

Let's break it down.

## What is `DataClassification`?

`DataClassification` is an AL property that describes the type of data a table or field contains.

It helps organizations understand what kind of information their Business Central application stores, supporting data governance, privacy assessments, and compliance activities.

For example, consider our `Course` table:

| Field | Example value | Data classification |
|---|---|---|
| Course Code | CS101 | `CustomerContent` |
| Course Name | Introduction to Programming | `CustomerContent` |
| Description | Learn programming fundamentals | `CustomerContent` |
| Price | 1500 | `CustomerContent` |

These fields contain information created or maintained by the organization using Business Central, so `CustomerContent` is a reasonable classification.

**Important:** `DataClassification` does not encrypt data, control who can access it, or automatically make the application compliant with privacy regulations. It describes the nature of the data.

## Common data classifications

Here are several classifications worth knowing.

| Classification | Meaning | Example |
|---|---|---|
| `CustomerContent` | Content created or maintained by the Business Central customer organization | Course descriptions, product details |
| `EndUserIdentifiableInformation` | Information that can identify an individual end user | A person's name or email address |
| `EndUserPseudonymousIdentifiers` | Identifiers associated with a user that don't directly reveal their identity | A pseudonymous user identifier |
| `AccountData` | Data associated with an account | Account-related information |
| `OrganizationIdentifiableInformation` | Information that identifies an organization | An organization's name or identifying details |
| `SystemMetadata` | Technical or operational metadata about the system | System-generated metadata |
| `ToBeClassified` | Data whose classification hasn't yet been determined | A field awaiting review |

These are examples, not an exhaustive list. Choose the classification that best reflects the information being stored, rather than automatically assigning the same value to every field.

You can find the complete list in Microsoft's [DataClassification property documentation](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-dataclassification-property).

## How do we use it in AL?

Let's look at our existing `Course` table:

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

Notice that `DataClassification` appears twice at different levels:

- **At the table level:** Provides a classification for the table.
- **At the field level:** Classifies the individual field.

Classifying fields individually is particularly useful because a single table can contain different types of information.

For example, an `Enrollment` table might contain a course code, a student's name, and an internal processing identifier. Those fields might warrant different classifications.

## Is `DataClassification` mandatory?

Business Central allows you to define tables and fields without explicitly specifying this property, but leaving data unclassified is generally poor practice.

For our learning project, **continue specifying `DataClassification` explicitly on the table and its fields**.

That gives us a consistent habit and makes our intentions clear when someone reviews the code.

## Does it change how the application behaves?

Not in the way a validation rule or permission does.

For example:

```al
field(4; Price; Decimal)
{
    Caption = 'Price';
    DataClassification = CustomerContent;
}
```

This does not prevent unauthorized users from seeing the price. Access control must be handled separately.

Likewise, classifying a field as `EndUserIdentifiableInformation` does not automatically anonymize its contents.

Think of `DataClassification` as a **label describing the data**, not a mechanism enforcing security.


### Official documentation

- [DataClassification property — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-dataclassification-property)
- [Data classification in Business Central — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/admin-classifying-data-sensitivity)
