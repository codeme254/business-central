# Codeunits

## What Is a Codeunit?

A codeunit is an AL object that contains reusable business logic and procedures that can be called from other Business Central objects.

Codeunits help us separate business logic from the user interface and database structure.

For example, imagine we are developing a customer management application.

We might need functionality to:

- Calculate customer discounts.
- Validate customer information.
- Update customer records.
- Check customer eligibility.

Instead of putting all this logic inside page triggers, we can organize it into codeunits.

## Why Do We Need Codeunits?

Consider a scenario where we want to calculate a customer's discount.

We could implement the calculation directly inside the Customer Card page.

However, what happens if we also need that calculation in another page, a report, or another codeunit?

We would have to duplicate the logic.

Codeunits solve this problem by allowing us to write business logic once and reuse it wherever necessary.

### Benefits

- **Reusability:** Write logic once and call it from multiple objects.
- **Separation of concerns:** Keep business logic separate from page layouts and database definitions.
- **Maintainability:** Changes to business logic can be made in one central location.
- **Organization:** Group related functionality into dedicated objects.

## Where Do Codeunits Fit in Business Central?

Remember the main objects we've discussed:

| Object | Responsibility |
|---|---|
| Table | Defines and stores business data. |
| Page | Provides the user interface for interacting with data. |
| Page Extension | Extends an existing page. |
| Table Extension | Extends an existing table. |
| Codeunit | Contains reusable business logic. |

These objects work together.

For example, when a user opens the Customer Card:

1. The page displays customer information from the Customer table.
2. The user performs an action.
3. The page calls a procedure in a codeunit.
4. The codeunit executes the required business logic.
5. The codeunit can read or modify Customer records using record variables.

## Codeunits and Record Variables

Codeunits can use the same record variables and methods we've already learned.

For example, a codeunit could contain logic that:

- Retrieves a customer using `Get()`.
- Checks customer information using record fields.
- Updates customer information using `Validate()`.
- Saves changes using `Modify()`.

The important thing is that codeunits don't need to be associated with a particular table to work with its records.

They can declare their own record variables and interact with different tables.

## How Are Codeunits Executed?

Codeunits can be invoked from different parts of Business Central.

Common examples include:

- **Pages:** A user clicks an action that calls codeunit functionality.
- **Other codeunits:** One codeunit calls functionality in another.
- **Reports:** A report invokes business logic during processing.
- **Job queues:** Codeunits can execute scheduled background tasks.
- **Event subscribers:** Codeunits can respond to events raised by other application objects.

A codeunit can also have an `OnRun()` trigger, which executes when the codeunit itself is run.

We'll explore this when we start creating codeunits.

## Important Things to Remember

- A codeunit is a container for reusable AL business logic.
- Codeunits help separate business logic from the user interface.
- They contain procedures that can be called from other application objects.
- They can work with record variables to retrieve, insert, modify, and delete database records.
- They are not tied to a particular table unless explicitly configured.
- Codeunits do not provide a user interface like pages.

## Further Reading

- [Codeunit Object – Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-codeunit-object)
- [Codeunit Data Type](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/codeunit/codeunit-data-type)
- [OnRun Codeunit Trigger](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/triggers-auto/codeunit/devenv-onrun-codeunit-trigger)