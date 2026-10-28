# Comments and Naming Conventions

## Comments

**Comments** are notes written inside code to explain its purpose. They are ignored by the compiler and do not affect program execution.

AL supports single-line comments using `//`.

```al
// Calculate the total price including tax
TotalAmount := Subtotal + Tax;
```

AL also supports block comments:
```al
/* Calculate total price including tax */
TotalAmount := Subtotal + Tax;
```

Comments are useful for explaining business rules or decisions that might not be obvious from the code.


### XML Documentation Comments

AL also supports XML documentation comments, which begin with `///`. These can document procedures and other elements, helping developers understand your code through IntelliSense in Visual Studio Code.

```al
/// Calculates the discount for an eligible customer.
local procedure CalculateDiscount(Amount: Decimal): Decimal
begin
    exit(Amount * 0.10);
end;
```

Unlike ordinary comments, XML documentation comments can provide structured documentation for other developers.

## Naming Conventions

**Naming conventions** are agreed-upon rules for naming variables, procedures, fields, and objects consistently.

Good names make code easier to read, understand, and maintain.

### PascalCase

AL commonly uses **PascalCase**, where each word starts with a capital letter.

Examples:

```al
var
    CustomerName: Text[100];
    TotalAmount: Decimal;
    IsOrderApproved: Boolean;
```

Use meaningful names that describe what an identifier represents.

| Avoid | Prefer |
|---|---|
| `x` | `TotalAmount` |
| `cust` | `CustomerName` |
| `flag` | `IsOrderApproved` |
| `calc` | `CalculateDiscount` |

### Naming AL Objects

Give objects descriptive names that communicate their purpose.

```al
table 50100 Employee
{
    // Table definition
}

page 50101 EmployeeList
{
    // Page definition
}

codeunit 50102 EmployeeManagement
{
    // Business logic
}
```

These names make it easy to identify what each object does.

### Naming Variables That Reference Objects

When a variable references a Business Central object, include the object's name in the variable name where practical.

```al
var
    Customer: Record Customer;
    SalesHeader: Record "Sales Header";
```

This makes it clear which records the variables represent.

## File Naming Conventions

Microsoft recommends including the object name and object type in AL filenames.

For example:

| Object | Recommended filename |
|---|---|
| Employee table | `Employee.Table.al` |
| Employee list page | `EmployeeList.Page.al` |
| Employee management codeunit | `EmployeeManagement.Codeunit.al` |
| Customer table extension | `CustomerExtension.TableExt.al` |

Consistent filenames make it easier to locate objects as your project grows.

## Further Reading

- [Best Practices for AL Code](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/compliance/apptest-bestpracticesforalcode)
- [XML Documentation Comments in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-xml-comments)

## Key Takeaway

**Comments explain code, while naming conventions make code easier to understand and maintain.** Use comments to clarify important business rules, choose meaningful PascalCase identifiers, and follow consistent naming conventions for objects and files.