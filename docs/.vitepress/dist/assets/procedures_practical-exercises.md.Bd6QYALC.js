import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Practical Exercises","description":"","frontmatter":{},"headers":[],"relativePath":"procedures/practical-exercises.md","filePath":"procedures/practical-exercises.md"}`),a={name:`procedures/practical-exercises.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="practical-exercises" tabindex="-1">Practical Exercises <a class="header-anchor" href="#practical-exercises" aria-label="Permalink to “Practical Exercises”">​</a></h1><h2 id="product-order-validation-pricing-and-discounts" tabindex="-1">Product Order Validation, Pricing, and Discounts <a class="header-anchor" href="#product-order-validation-pricing-and-discounts" aria-label="Permalink to “Product Order Validation, Pricing, and Discounts”">​</a></h2><p>In this exercise, we simulate a product-ordering system that validates customer orders, calculates their total cost, and applies discounts based on the order value.</p><p>We will:</p><ul><li>Create a product catalogue using a dictionary that maps product names to their prices.</li><li>Initialize the catalogue through a procedure that returns a dictionary.</li><li>Represent a customer order using a dictionary that maps product names to their quantities.</li><li>Create a procedure that checks whether a product exists in the catalogue.</li><li>Validate the entire order by checking that every ordered product exists in the catalogue.</li><li>Calculate the total order price by multiplying each product&#39;s unit price by its quantity.</li><li>Apply discounts based on the total order value: <ul><li>Below $100: No discount.</li><li>$100–$200, inclusive: 10% discount.</li><li>Above $200: 20% discount.</li></ul></li><li>Display the original total and the discounted price when applicable.</li><li>Organize the program into focused, reusable procedures that demonstrate parameters, return values, local variables, conditionals, loops, and early returns using <code>exit</code>.</li></ul><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace LearningAl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    local procedure InitCatalogue(): Dictionary of [Text, Decimal]</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Catalogue: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Laptop&#39;, 300);</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Mouse&#39;, 20);</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Keyboard&#39;, 35);</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Monitor&#39;, 100);</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Headset&#39;, 25);</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Router&#39;, 30);</span></span>
<span class="line"><span>        Catalogue.Add(&#39;Mouse Pad&#39;, 20);</span></span>
<span class="line"><span>        exit(Catalogue);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    local procedure ProductExists(Item: Text; Catalogue: Dictionary of [Text, Decimal]): Boolean</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        if Catalogue.ContainsKey(Item) then exit(true);</span></span>
<span class="line"><span>        exit(false);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    local procedure IsValidOrder(Order: Dictionary of [Text, Integer]; Catalogue: Dictionary of [Text, Decimal]): Boolean</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Items: List of [Text];</span></span>
<span class="line"><span>        Item: Text;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        Items := Order.Keys();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        foreach Item in Items do begin</span></span>
<span class="line"><span>            if not ProductExists(Item, Catalogue) then exit(false);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        exit(true);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Discount for</span></span>
<span class="line"><span>    // below 100 - no discount</span></span>
<span class="line"><span>    // 100 - 200 - 10%</span></span>
<span class="line"><span>    // above 200 - 20%</span></span>
<span class="line"><span>    local procedure CalculateDiscount(CostPrice: Decimal): Decimal</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        DiscountedPrice: Decimal;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        if CostPrice &lt; 100 then exit(CostPrice);</span></span>
<span class="line"><span>        if (CostPrice &gt;= 100) and (CostPrice &lt;= 200) then exit(CostPrice * 0.9);</span></span>
<span class="line"><span>        exit(CostPrice * 0.8);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // This method assumes the order contains valid products</span></span>
<span class="line"><span>    local procedure CalculateTotal(Order: Dictionary of [Text, Integer]; Catalogue: Dictionary of [Text, Decimal]): Decimal</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Total: Decimal;</span></span>
<span class="line"><span>        Products: List of [Text];</span></span>
<span class="line"><span>        Product: Text;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        Total := 0;</span></span>
<span class="line"><span>        Products := Order.Keys();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        foreach Product in Products do begin</span></span>
<span class="line"><span>            Total += Catalogue.Get(Product) * Order.Get(Product);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        exit(Total);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    trigger OnOpenPage();</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        ProductCatalogue: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>        Order: Dictionary of [Text, Integer];</span></span>
<span class="line"><span>        TotalPrice, DiscountedPrice : Decimal;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        ProductCatalogue := InitCatalogue();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Order.Add(&#39;Laptop&#39;, 2);</span></span>
<span class="line"><span>        Order.Add(&#39;Mouse&#39;, 1);</span></span>
<span class="line"><span>        // Order.Add(&#39;Foo&#39;, 2);</span></span>
<span class="line"><span>        Order.Add(&#39;Monitor&#39;, 5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if not IsValidOrder(Order, ProductCatalogue) then begin</span></span>
<span class="line"><span>            Message(&#39;One or more items in your order is not in our catalogue&#39;);</span></span>
<span class="line"><span>            exit;</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        TotalPrice := CalculateTotal(Order, ProductCatalogue);</span></span>
<span class="line"><span>        DiscountedPrice := CalculateDiscount(TotalPrice);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if TotalPrice = DiscountedPrice then</span></span>
<span class="line"><span>            Message(&#39;Total price $%1&#39;, TotalPrice)</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            Message(&#39;Total price $%1\\Discounted price $%2!&#39;, TotalPrice, DiscountedPrice);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,6)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};