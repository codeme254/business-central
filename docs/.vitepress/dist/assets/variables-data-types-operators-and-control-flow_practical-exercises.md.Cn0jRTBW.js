import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Practical Exercises","description":"","frontmatter":{},"headers":[],"relativePath":"variables-data-types-operators-and-control-flow/practical-exercises.md","filePath":"variables-data-types-operators-and-control-flow/practical-exercises.md"}`),a={name:`variables-data-types-operators-and-control-flow/practical-exercises.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="practical-exercises" tabindex="-1">Practical Exercises <a class="header-anchor" href="#practical-exercises" aria-label="Permalink to “Practical Exercises”">​</a></h1><h2 id="calculate-the-total-price-of-an-order-with-order-items-having-no-quantity" tabindex="-1">Calculate the Total Price of An Order With Order Items Having No Quantity <a class="header-anchor" href="#calculate-the-total-price-of-an-order-with-order-items-having-no-quantity" aria-label="Permalink to “Calculate the Total Price of An Order With Order Items Having No Quantity”">​</a></h2><p>In this example, we simulate a customer ordering several products and calculate the total cost of their order.</p><p>We will:</p><ul><li>Create a product catalogue using a dictionary, mapping each product name to its price.</li><li>Represent the customer&#39;s order using an array of product names.</li><li>Iterate through the order and retrieve each product&#39;s price from the catalogue.</li><li>Calculate the total price of all ordered products.</li><li>Handle invalid orders by raising an error if a product doesn&#39;t exist in the catalogue.</li></ul><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace LearningAl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage();</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        ProductsCatalogue: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>        Orders: array[5] of Text;</span></span>
<span class="line"><span>        CurrentIdx: Integer;</span></span>
<span class="line"><span>        TotalPrice: Decimal;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        // Menu</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Laptop&#39;, 300);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Mouse&#39;, 20);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Keyboard&#39;, 35);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Monitor&#39;, 100);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Headset&#39;, 25);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Router&#39;, 30);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Mouse Pad&#39;, 20);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Simulate Purchasing</span></span>
<span class="line"><span>        Orders[1] := &#39;Laptop&#39;;</span></span>
<span class="line"><span>        Orders[2] := &#39;Mouse Pad&#39;;</span></span>
<span class="line"><span>        Orders[3] := &#39;Monitor&#39;;</span></span>
<span class="line"><span>        Orders[4] := &#39;Keyboard&#39;;</span></span>
<span class="line"><span>        Orders[5] := &#39;Monitor&#39;;</span></span>
<span class="line"><span>        // Orders[5] := &#39;Bugatti&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Calculate Total price</span></span>
<span class="line"><span>        TotalPrice := 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for CurrentIdx := 1 to ArrayLen(Orders) do begin</span></span>
<span class="line"><span>            if ProductsCatalogue.ContainsKey(Orders[CurrentIdx]) then begin</span></span>
<span class="line"><span>                TotalPrice += ProductsCatalogue.Get(Orders[CurrentIdx])</span></span>
<span class="line"><span>            end else</span></span>
<span class="line"><span>                Error(&#39;%1 could not be found in catalogue&#39;, Orders[CurrentIdx]);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Message(&#39;Total price is %1&#39;, TotalPrice);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="calculate-the-total-price-of-an-order-with-order-items-having-quantities" tabindex="-1">Calculate the Total Price of an Order With Order Items Having Quantities <a class="header-anchor" href="#calculate-the-total-price-of-an-order-with-order-items-having-quantities" aria-label="Permalink to “Calculate the Total Price of an Order With Order Items Having Quantities”">​</a></h2><p>In this example, we simulate a customer placing an order containing multiple products and quantities.</p><p>We will:</p><ul><li>Create a product catalogue using a dictionary that maps product names to their prices.</li><li>Represent the order using a dictionary that maps product names to their ordered quantities.</li><li>Retrieve the product names from the order using the dictionary&#39;s <code>Keys()</code> method.</li><li>Iterate through the ordered products, look up their prices, and multiply each price by its quantity.</li><li>Calculate the total order price.</li><li>Raise an error if an ordered product does not exist in the catalogue.</li></ul><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace LearningAl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage();</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        ProductsCatalogue: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>        OrderItems: Dictionary of [Text, Integer];</span></span>
<span class="line"><span>        Orders: List of [Text];</span></span>
<span class="line"><span>        Item: Text;</span></span>
<span class="line"><span>        TotalPrice: Decimal;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        // Menu</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Laptop&#39;, 300);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Mouse&#39;, 20);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Keyboard&#39;, 35);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Monitor&#39;, 100);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Headset&#39;, 25);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Router&#39;, 30);</span></span>
<span class="line"><span>        ProductsCatalogue.Add(&#39;Mouse Pad&#39;, 20);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        OrderItems.Add(&#39;Laptop&#39;, 3);</span></span>
<span class="line"><span>        OrderItems.Add(&#39;Mouse Pad&#39;, 5);</span></span>
<span class="line"><span>        OrderItems.Add(&#39;Monitor&#39;, 3);</span></span>
<span class="line"><span>        OrderItems.Add(&#39;Keyboard&#39;, 1);</span></span>
<span class="line"><span>        OrderItems.Add(&#39;Router&#39;, 1);</span></span>
<span class="line"><span>        // OrderItems.Add(&#39;Foo&#39;, 5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Orders := OrderItems.Keys();</span></span>
<span class="line"><span>        TotalPrice := 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        foreach Item in Orders do begin</span></span>
<span class="line"><span>            if ProductsCatalogue.ContainsKey(Item) then begin</span></span>
<span class="line"><span>                TotalPrice += ProductsCatalogue.Get(Item) * OrderItems.Get(Item);</span></span>
<span class="line"><span>            end else</span></span>
<span class="line"><span>                Error(&#39;%1 does not exist in catalogue&#39;, Item);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Message(&#39;Total price is $%1&#39;, TotalPrice);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,11)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};