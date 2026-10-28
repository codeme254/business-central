# Practical Exercises
## Calculate the Total Price of An Order With Order Items Having No Quantity

In this example, we simulate a customer ordering several products and calculate the total cost of their order.

We will:
- Create a product catalogue using a dictionary, mapping each product name to its price.
- Represent the customer's order using an array of product names.
- Iterate through the order and retrieve each product's price from the catalogue.
- Calculate the total price of all ordered products.
- Handle invalid orders by raising an error if a product doesn't exist in the catalogue.

```al
namespace LearningAl;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        ProductsCatalogue: Dictionary of [Text, Decimal];
        Orders: array[5] of Text;
        CurrentIdx: Integer;
        TotalPrice: Decimal;
    begin
        // Menu
        ProductsCatalogue.Add('Laptop', 300);
        ProductsCatalogue.Add('Mouse', 20);
        ProductsCatalogue.Add('Keyboard', 35);
        ProductsCatalogue.Add('Monitor', 100);
        ProductsCatalogue.Add('Headset', 25);
        ProductsCatalogue.Add('Router', 30);
        ProductsCatalogue.Add('Mouse Pad', 20);

        // Simulate Purchasing
        Orders[1] := 'Laptop';
        Orders[2] := 'Mouse Pad';
        Orders[3] := 'Monitor';
        Orders[4] := 'Keyboard';
        Orders[5] := 'Monitor';
        // Orders[5] := 'Bugatti';

        // Calculate Total price
        TotalPrice := 0;

        for CurrentIdx := 1 to ArrayLen(Orders) do begin
            if ProductsCatalogue.ContainsKey(Orders[CurrentIdx]) then begin
                TotalPrice += ProductsCatalogue.Get(Orders[CurrentIdx])
            end else
                Error('%1 could not be found in catalogue', Orders[CurrentIdx]);
        end;

        Message('Total price is %1', TotalPrice);
    end;
}
```

## Calculate the Total Price of an Order With Order Items Having Quantities

In this example, we simulate a customer placing an order containing multiple products and quantities.

We will:
- Create a product catalogue using a dictionary that maps product names to their prices.
- Represent the order using a dictionary that maps product names to their ordered quantities.
- Retrieve the product names from the order using the dictionary's `Keys()` method.
- Iterate through the ordered products, look up their prices, and multiply each price by its quantity.
- Calculate the total order price.
- Raise an error if an ordered product does not exist in the catalogue.

```al
namespace LearningAl;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    trigger OnOpenPage();
    var
        ProductsCatalogue: Dictionary of [Text, Decimal];
        OrderItems: Dictionary of [Text, Integer];
        Orders: List of [Text];
        Item: Text;
        TotalPrice: Decimal;
    begin
        // Menu
        ProductsCatalogue.Add('Laptop', 300);
        ProductsCatalogue.Add('Mouse', 20);
        ProductsCatalogue.Add('Keyboard', 35);
        ProductsCatalogue.Add('Monitor', 100);
        ProductsCatalogue.Add('Headset', 25);
        ProductsCatalogue.Add('Router', 30);
        ProductsCatalogue.Add('Mouse Pad', 20);

        OrderItems.Add('Laptop', 3);
        OrderItems.Add('Mouse Pad', 5);
        OrderItems.Add('Monitor', 3);
        OrderItems.Add('Keyboard', 1);
        OrderItems.Add('Router', 1);
        // OrderItems.Add('Foo', 5);

        Orders := OrderItems.Keys();
        TotalPrice := 0;

        foreach Item in Orders do begin
            if ProductsCatalogue.ContainsKey(Item) then begin
                TotalPrice += ProductsCatalogue.Get(Item) * OrderItems.Get(Item);
            end else
                Error('%1 does not exist in catalogue', Item);
        end;

        Message('Total price is $%1', TotalPrice);
    end;
}
```