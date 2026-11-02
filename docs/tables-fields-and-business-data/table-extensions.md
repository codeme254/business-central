# Table Extensions in AL

So far, we've been creating our own tables, such as `Course`. But what happens when you need to add information to a table that already exists in Business Central?

For example, suppose Business Central already has a **Customer** table, and your company wants to store each customer's website URL. You want to add that information without modifying Microsoft's original table.

That's where **table extensions** come in.

## What is a table extension?

A table extension lets you extend an existing table by adding things such as:
- New fields.
- Additional field groups.
- Certain triggers and validation logic.

You don't replace the original table, and you don't directly modify Microsoft's base application. Instead, your extension adds functionality to it.

**Think of it this way:**
- `table` creates a new table.
- `tableextension` adds to an existing table.

This is an important part of Business Central's extensibility model: you can customize the application while keeping your changes separate from the base application.

## Create our first table extension

Let's make this practical.

We'll extend Business Central's built-in **Customer** table by adding a field called `Training Level`.

Imagine we're customizing Business Central for a training company and want to classify customers according to their training level.

### Step 1: Create the AL file

In VS Code, create a new file called `CustomerExt.TableExt.al`.

### Step 2: Add the following code

```al
namespace LearningAl;

tableextension 50104 CustomerExt extends Customer
{
    fields
    {
        field(50104; "Training Level"; Text[30])
        {
            Caption = 'Training Level';
            DataClassification = CustomerContent;
        }
    }
}
```

Let's break down the new syntax.

| Code | Meaning |
|---|---|
| `tableextension` | Declares a table extension object. |
| `50104` | The object ID of our extension. |
| `CustomerExt` | The name of our extension object. |
| `extends Customer` | Specifies the existing table we want to extend. |
| `fields` | Contains the additional fields we're introducing. |
| `field(50104; "Training Level"; Text[30])` | Declares our new field, using field ID `50104`. |

**Notice something important:** We use `50104` for both the extension object ID and the new field ID. That's allowed because object IDs and field IDs belong to different numbering scopes. However, each ID must be unique within its own relevant scope.

Also, `Customer` is an existing Business Central table. We're not creating another Customer table or copying customer records into a new table. [Microsoft Learn](https://learn.microsoft.com/uk-ua/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object)

### Step 3: Publish the extension

1. Save the file.
2. Press **F5** to publish.
3. Wait for publishing to complete successfully.

At this point, you've defined the new field, but you haven't necessarily made it visible on any page.

That's an important distinction: **tables store data; pages provide the user interface for viewing and editing it.**

## How do we see our new field?

Our next task is to expose `Training Level` on the Customer Card page.

For now, here's the concept without going deep into page extensions:

- **Table extension:** Adds the `Training Level` field to the Customer table.
- **Page extension:** Adds that field to an existing Customer Card page so users can see and edit it.

We'll cover page extensions properly when we revisit pages in the next chapter.

You can read Microsoft's documentation on the [Table extension object](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object) for more details. [Microsoft Learn](https://learn.microsoft.com/uk-ua/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object)

---

## Rules to remember

1. **You cannot extend every table.** The target table must support extensibility.
2. **Don't modify Microsoft's original table directly.** Use an extension to add your custom fields.
3. **Use appropriate field IDs.** Your custom IDs must not conflict with IDs already used in the target table or by other extensions.
4. **Existing data remains part of the same table.** A table extension adds fields to the existing table rather than creating a separate table.
5. **Adding a field doesn't automatically display it on a page.** You may need a page extension.
