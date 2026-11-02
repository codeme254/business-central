# Relationships Between Tables in AL

So far, our `Course` table has stored information about courses independently. But real business applications rarely work with isolated tables.

Imagine we're building a training management system. We have courses, students, and enrollments.

- A **Course** table stores the courses available.
- A **Student** table stores student details.
- An **Enrollment** table records which students have enrolled in which courses.

How do we connect these tables so that an enrollment refers to a valid student and course?

In AL, one of the key tools for doing this is the **`TableRelation` property**.

## What is `TableRelation`?

`TableRelation` specifies a relationship between a field and a field in another table. It helps Business Central determine which records are valid when a user selects a related value.

For example, we could have an `Enrollment` table with a `"Course Code"` field that refers to the `"Course Code"` field in our existing `Course` table.

That way, users can select an existing course instead of manually typing an arbitrary course code.

## Understanding relationship types

In database design, we commonly describe relationships in three ways.

| Relationship | Example | Meaning |
|---|---|---|
| One-to-one | A person and their passport record | Each person has one associated passport record, and vice versa. |
| One-to-many | One course and many enrollments | A course can have many enrollment records. |
| Many-to-many | Students and courses | A student can take many courses, and a course can have many students. |

For a many-to-many relationship, we usually introduce a linking table. In our example, `Enrollment` connects `Student` and `Course`.

These are database design concepts. In AL, the `TableRelation` property helps define field-level relationships, but it doesn't automatically design every aspect of a one-to-many or many-to-many relationship for you. [Microsoft Learn](https://learn.microsoft.com/de-de/dynamics365/business-central/dev-itpro/developer/devenv-set-relationships-between-tables)

## Practical example: Connect Enrollment to Course

Let's build a simple relationship using the `Course` table we already created.

Our `Enrollment` table will store:
- An enrollment number.
- The course code for the course being enrolled in.
- The student's name.

For now, we'll focus on connecting the enrollment to a course. We'll use a student's name directly rather than introducing a separate Student table, keeping the example manageable.

### Step 1: Create `Enrollment.Table.al`

Use the next available object ID in your project. Based on our earlier examples, we'll use `50105`.

```al
namespace LearningAl;

table 50105 Enrollment
{
    Caption = 'Enrollment';
    DataClassification = CustomerContent;

    fields
    {
        field(1; "Enrollment No."; Code[20])
        {
            Caption = 'Enrollment No.';
            DataClassification = CustomerContent;
        }

        field(2; "Course Code"; Code[20])
        {
            Caption = 'Course Code';
            DataClassification = CustomerContent;
            TableRelation = Course."Course Code";
        }

        field(3; "Student Name"; Text[100])
        {
            Caption = 'Student Name';
            DataClassification = CustomerContent;
        }
    }

    keys
    {
        key(PK; "Enrollment No.")
        {
            Clustered = true;
        }
    }
}
```

### Step 2: Understand the relationship

Focus on this line:

```al
TableRelation = Course."Course Code";
```

Let's break it down:

- `TableRelation` is the property defining the relationship.
- `Course` is the table we want to reference.
- `"Course Code"` is the field in that table whose values we want to use.

Our Enrollment table's `"Course Code"` field is now related to the Course table's `"Course Code"` field.

**Why is that useful?**

Suppose our Course table contains these records:

| Course Code | Course Name |
|---|---|
| CS101 | Introduction to Programming |
| CS102 | Database Fundamentals |
| CS103 | Web Development |

When a user selects a course through a supported lookup, Business Central can offer these existing courses.

The relationship also helps validate entries against the referenced table. See Microsoft's [TableRelation property documentation](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-tablerelation-property). [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-tablerelation-property)

### Step 3: What kind of relationship have we created?

Conceptually, this is a **one-to-many relationship**:

- One Course can be associated with many Enrollment records.
- Each Enrollment record references a Course through its Course Code.

For example:

**Course table**

| Course Code | Course Name |
|---|---|
| CS101 | Introduction to Programming |

**Enrollment table**

| Enrollment No. | Course Code | Student Name |
|---|---|---|
| ENR001 | CS101 | Jane |
| ENR002 | CS101 | Peter |
| ENR003 | CS101 | Amina |

Three enrollment records refer to the same course. We haven't duplicated the course's name and description in every enrollment record.

One important detail: `TableRelation` doesn't automatically display the course name in the Enrollment table. It establishes the relationship for lookup and validation. Displaying related information is something we'll explore through pages and calculated fields later.


## What about `WHERE` filters in a table relation?

`TableRelation` can do more than reference an entire table. It can also filter the available records.

For example, suppose our Course table eventually includes an `Active` Boolean field, and we only want users to select active courses.

We could write:

```al
TableRelation = Course."Course Code" where(Active = const(true));
```

This tells Business Central to filter the related Course records so that only records with `Active = true` are eligible for the lookup.

**Don't add this example to your current code yet.** Our Course table doesn't have an `Active` field at the moment, so we'd need to add that field first.

You can also create conditional relationships based on other field values, but the simple relationship we've implemented is enough for now. [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/properties/devenv-tablerelation-property)
