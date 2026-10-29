# Practical Exercises

## Product Order Validation, Pricing, and Discounts

In this exercise, we simulate a product-ordering system that validates customer orders, calculates their total cost, and applies discounts based on the order value.

We will:
- Create a product catalogue using a dictionary that maps product names to their prices.
- Initialize the catalogue through a procedure that returns a dictionary.
- Represent a customer order using a dictionary that maps product names to their quantities.
- Create a procedure that checks whether a product exists in the catalogue.
- Validate the entire order by checking that every ordered product exists in the catalogue.
- Calculate the total order price by multiplying each product's unit price by its quantity.
- Apply discounts based on the total order value:
    - Below $100: No discount.
    - $100–$200, inclusive: 10% discount.
    - Above $200: 20% discount.
- Display the original total and the discounted price when applicable.
- Organize the program into focused, reusable procedures that demonstrate parameters, return values, local variables, conditionals, loops, and early returns using `exit`.

```al
namespace LearningAl;

using Microsoft.Sales.Customer;

pageextension 50100 CustomerListExt extends "Customer List"
{
    local procedure InitCatalogue(): Dictionary of [Text, Decimal]
    var
        Catalogue: Dictionary of [Text, Decimal];
    begin
        Catalogue.Add('Laptop', 300);
        Catalogue.Add('Mouse', 20);
        Catalogue.Add('Keyboard', 35);
        Catalogue.Add('Monitor', 100);
        Catalogue.Add('Headset', 25);
        Catalogue.Add('Router', 30);
        Catalogue.Add('Mouse Pad', 20);
        exit(Catalogue);
    end;

    local procedure ProductExists(Item: Text; Catalogue: Dictionary of [Text, Decimal]): Boolean
    begin
        if Catalogue.ContainsKey(Item) then exit(true);
        exit(false);
    end;

    local procedure IsValidOrder(Order: Dictionary of [Text, Integer]; Catalogue: Dictionary of [Text, Decimal]): Boolean
    var
        Items: List of [Text];
        Item: Text;
    begin
        Items := Order.Keys();

        foreach Item in Items do begin
            if not ProductExists(Item, Catalogue) then exit(false);
        end;

        exit(true);
    end;

    // Discount for
    // below 100 - no discount
    // 100 - 200 - 10%
    // above 200 - 20%
    local procedure CalculateDiscount(CostPrice: Decimal): Decimal
    var
        DiscountedPrice: Decimal;
    begin
        if CostPrice < 100 then exit(CostPrice);
        if (CostPrice >= 100) and (CostPrice <= 200) then exit(CostPrice * 0.9);
        exit(CostPrice * 0.8);
    end;

    // This method assumes the order contains valid products
    local procedure CalculateTotal(Order: Dictionary of [Text, Integer]; Catalogue: Dictionary of [Text, Decimal]): Decimal
    var
        Total: Decimal;
        Products: List of [Text];
        Product: Text;
    begin
        Total := 0;
        Products := Order.Keys();

        foreach Product in Products do begin
            Total += Catalogue.Get(Product) * Order.Get(Product);
        end;

        exit(Total);
    end;

    trigger OnOpenPage();
    var
        ProductCatalogue: Dictionary of [Text, Decimal];
        Order: Dictionary of [Text, Integer];
        TotalPrice, DiscountedPrice : Decimal;
    begin
        ProductCatalogue := InitCatalogue();

        Order.Add('Laptop', 2);
        Order.Add('Mouse', 1);
        // Order.Add('Foo', 2);
        Order.Add('Monitor', 5);

        if not IsValidOrder(Order, ProductCatalogue) then begin
            Message('One or more items in your order is not in our catalogue');
            exit;
        end;

        TotalPrice := CalculateTotal(Order, ProductCatalogue);
        DiscountedPrice := CalculateDiscount(TotalPrice);

        if TotalPrice = DiscountedPrice then
            Message('Total price $%1', TotalPrice)
        else
            Message('Total price $%1\Discounted price $%2!', TotalPrice, DiscountedPrice);
    end;
}
```