# Namespaces and Identifiers

## What Are Identifiers

An **identifier** is a name used to identify something in your code, such as a variable, procedure, table, page, or codeunit.

For example:

```al
var
    CustomerName: Text[100];
    TotalAmount: Decimal;
```

Here, `CustomerName` and `TotalAmount` are identifiers because they name variables.

Identifiers make it possible to refer to specific elements in your code.

### Naming Rules

When creating identifiers in AL:

- Names are case-insensitive. For example, `CustomerName` and `CUSTOMERNAME` refer to the same identifier.
- Names generally start with a letter or underscore.
- Names can contain letters, digits, and underscores.
- Reserved keywords, such as `begin`, cannot be used as ordinary identifiers.
- Names containing spaces or special characters must be enclosed in double quotation marks.

For example:

```al
var
    CustomerName: Text[100];
    "Customer No.": Code[20];
```

Notice that `"Customer No."` uses double quotation marks because its name contains a space and a period.

## What Is a Namespace?

A **namespace** is a way of organizing AL objects into logical groups and avoiding naming conflicts.

Imagine two extensions developed by different companies. Both developers create a codeunit called `CustomerManager`.

Namespaces help distinguish between these objects by giving each one a qualified name.

For example:

```al
namespace CompanyA.Sales;

codeunit 50100 CustomerManager
{
    // Sales-related functionality
}
```

Another extension could have:

```al
namespace CompanyB.Inventory;

codeunit 50100 CustomerManager
{
    // Inventory-related functionality
}
```

Although both codeunits share the same name, their namespaces distinguish them.

Think of namespaces like folders on your computer: two folders can contain files with the same name because their paths are different.

**Note:** AL namespaces are supported in Business Central 2023 release wave 2 (version 23) and later.

## Declaring a Namespace

Use the `namespace` keyword at the beginning of an AL file to declare its namespace.

```al
namespace MyCompany.Sales;

codeunit 50100 SalesManager
{
    // Sales-related functionality
}
```

In this example, `MyCompany.Sales` is the namespace, while `SalesManager` is the codeunit name.

Namespaces can contain multiple levels, separated by periods (`.`), to represent logical groupings.

For example:

- `MyCompany` — identifies the organization.
- `MyCompany.Sales` — groups sales-related functionality.
- `MyCompany.Sales.Reporting` — groups sales reporting functionality.

These are naming conventions for organizing code; the periods do not represent physical folders.

:::tip
The first part of a namespace should be tied to the developing organization or ann individual followed by a product name and logical grouping with inn the product. For example `namespace Acme.Products.Reports`
:::

## The `using` Directive

When you need to reference an object from another namespace, you can use its fully qualified name or import its namespace using the `using` directive.

A **fully qualified name** includes the namespace and the object's name.

For example:

```al
namespace MyCompany.Sales;

using MyCompany.Inventory;
```

The `using` directive allows you to reference objects in `MyCompany.Inventory` without repeatedly specifying the entire namespace.

It must appear after the namespace declaration and before the object declaration.

Think of `using` as telling AL which additional namespace to look in when resolving object names.

## Further Reading

- [Namespaces in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-namespaces-overview)
- [AL Variables and Naming Rules](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-variables)
- [Adopting Namespaces in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-namespaces-structure)

## Key Takeaway

**Identifiers name elements in your code, while namespaces organize AL objects and help distinguish between objects with the same name.** The `namespace` keyword declares a namespace, and the `using` directive makes objects from another namespace easier to reference.```