import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Collections in AL","description":"","frontmatter":{},"headers":[],"relativePath":"variables-data-types-operators-and-control-flow/collections.md","filePath":"variables-data-types-operators-and-control-flow/collections.md"}`),a={name:`variables-data-types-operators-and-control-flow/collections.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="collections-in-al" tabindex="-1">Collections in AL <a class="header-anchor" href="#collections-in-al" aria-label="Permalink to “Collections in AL”">​</a></h1><p>Collections allow us to store multiple values in a single variable. AL provides three main collection types:</p><ul><li><strong>Arrays</strong> — store a fixed number of elements of the same data type.</li><li><strong>Lists</strong> — store an ordered, dynamically sized collection of elements of the same data type.</li><li><strong>Dictionaries</strong> — store key-value pairs, allowing us to retrieve values using their keys.</li></ul><h2 id="arrays" tabindex="-1">Arrays <a class="header-anchor" href="#arrays" aria-label="Permalink to “Arrays”">​</a></h2><p>An array stores a fixed number of elements of the same data type. Each element is accessed using its index, starting at <strong>1</strong>.</p><h3 id="declaration-and-initialization" tabindex="-1">Declaration and Initialization <a class="header-anchor" href="#declaration-and-initialization" aria-label="Permalink to “Declaration and Initialization”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Scores: array[5] of Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Scores[1] := 85;</span></span>
<span class="line"><span>    Scores[2] := 90;</span></span>
<span class="line"><span>    Scores[3] := 78;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;First score: %1&#39;, Scores[1]);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>Here, <code>Scores</code> can hold five integers. The remaining elements are still available even though we haven&#39;t assigned values to them.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace LearningAl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage();</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Scores: array[5] of Integer;</span></span>
<span class="line"><span>        Count: Integer;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        Scores[1] := 10;</span></span>
<span class="line"><span>        Scores[2] := 20;</span></span>
<span class="line"><span>        Scores[3] := 30;</span></span>
<span class="line"><span>        Scores[4] := 40;</span></span>
<span class="line"><span>        Scores[5] := 50;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Get the length of an array using ArrayLen method</span></span>
<span class="line"><span>        Message(&#39;The array has %1 elements&#39;, ArrayLen(Scores));</span></span>
<span class="line"><span>        for Count := 1 to 5 do</span></span>
<span class="line"><span>            Message(&#39;Scores[%1] = %2&#39;, Count, Scores[Count]);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="multidimensional-arrays" tabindex="-1">Multidimensional Arrays <a class="header-anchor" href="#multidimensional-arrays" aria-label="Permalink to “Multidimensional Arrays”">​</a></h3><p>Arrays can have multiple dimensions, useful for representing data arranged in rows and columns.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Grid: array[3, 3] of Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Grid[1, 1] := 10;</span></span>
<span class="line"><span>    Grid[1, 2] := 20;</span></span>
<span class="line"><span>    Grid[2, 1] := 30;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><h3 id="looping-through-an-array" tabindex="-1">Looping Through an Array <a class="header-anchor" href="#looping-through-an-array" aria-label="Permalink to “Looping Through an Array”">​</a></h3><p>Use a <code>for</code> loop to iterate through its elements.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Scores: array[3] of Integer;</span></span>
<span class="line"><span>    Index: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Scores[1] := 80;</span></span>
<span class="line"><span>    Scores[2] := 90;</span></span>
<span class="line"><span>    Scores[3] := 70;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for Index := 1 to 3 do</span></span>
<span class="line"><span>        Message(&#39;Score: %1&#39;, Scores[Index]);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><h3 id="array-considerations" tabindex="-1">Array Considerations <a class="header-anchor" href="#array-considerations" aria-label="Permalink to “Array Considerations”">​</a></h3><ul><li>The dimensions are specified at declaration and cannot be dynamically resized.</li><li>Array indexes start at <code>1</code>, not <code>0</code>.</li><li>Arrays do not have the same built-in collection methods as lists and dictionaries.</li><li>You can read or modify an element using its index.</li></ul><p><strong>Useful resource:</strong> <a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods/devenv-array-methods" target="_blank" rel="noreferrer">Microsoft Learn — Array methods</a></p><hr><h2 id="lists" tabindex="-1">Lists <a class="header-anchor" href="#lists" aria-label="Permalink to “Lists”">​</a></h2><p>A <code>List</code> stores an ordered collection of elements of the same type. Unlike an array, its size can grow or shrink dynamically.</p><h3 id="declaration-and-adding-elements" tabindex="-1">Declaration and Adding Elements <a class="header-anchor" href="#declaration-and-adding-elements" aria-label="Permalink to “Declaration and Adding Elements”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    CustomerNames: List of [Text];</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Alice&#39;);</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Bob&#39;);</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Charlie&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;Number of customers: %1&#39;, CustomerNames.Count());</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><code>List of [Text]</code> means the list stores text values. You can also declare lists of other supported types, such as <code>Integer</code> or <code>Decimal</code>.</p><h3 id="accessing-elements" tabindex="-1">Accessing Elements <a class="header-anchor" href="#accessing-elements" aria-label="Permalink to “Accessing Elements”">​</a></h3><p>Use <code>Get()</code> to retrieve an element by its one-based index.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    CustomerNames: List of [Text];</span></span>
<span class="line"><span>    CustomerName: Text;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Alice&#39;);</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Bob&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    CustomerName := CustomerNames.Get(2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;Customer: %1&#39;, CustomerName);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>This displays <code>Bob</code>.</p><h3 id="looping-through-a-list" tabindex="-1">Looping Through a List <a class="header-anchor" href="#looping-through-a-list" aria-label="Permalink to “Looping Through a List”">​</a></h3><p>Use <code>foreach</code> to process every element without manually managing an index.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    CustomerNames: List of [Text];</span></span>
<span class="line"><span>    CustomerName: Text;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Alice&#39;);</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Bob&#39;);</span></span>
<span class="line"><span>    CustomerNames.Add(&#39;Charlie&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    foreach CustomerName in CustomerNames do</span></span>
<span class="line"><span>        Message(&#39;Customer: %1&#39;, CustomerName);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><h3 id="common-list-methods" tabindex="-1">Common List Methods <a class="header-anchor" href="#common-list-methods" aria-label="Permalink to “Common List Methods”">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Purpose</th></tr></thead><tbody><tr><td><code>Add(Value)</code></td><td>Adds an element to the end of the list.</td></tr><tr><td><code>AddRange(...)</code></td><td>Adds multiple elements or another list&#39;s elements.</td></tr><tr><td><code>Count()</code></td><td>Returns the number of elements.</td></tr><tr><td><code>Contains(Value)</code></td><td>Checks whether an element exists.</td></tr><tr><td><code>Get(Index)</code></td><td>Retrieves an element by its index.</td></tr><tr><td><code>Set(Index, Value)</code></td><td>Replaces an element at a specified index.</td></tr><tr><td><code>IndexOf(Value)</code></td><td>Returns the one-based index of the first matching element.</td></tr><tr><td><code>LastIndexOf(Value)</code></td><td>Returns the one-based index of the last matching element.</td></tr><tr><td><code>Insert(Index, Value)</code></td><td>Inserts an element at a specified index.</td></tr><tr><td><code>Remove(Value)</code></td><td>Removes the first occurrence of a value.</td></tr><tr><td><code>RemoveAt(Index)</code></td><td>Removes an element at a specified index.</td></tr><tr><td><code>RemoveRange(Index, Count)</code></td><td>Removes a range of elements.</td></tr><tr><td><code>Reverse()</code></td><td>Reverses the order of the elements.</td></tr><tr><td><code>GetRange(Index, Count)</code></td><td>Retrieves a range of elements as a new list.</td></tr></tbody></table><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace LearningAl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage();</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Scores: List of [Integer];</span></span>
<span class="line"><span>        Count: Integer;</span></span>
<span class="line"><span>        Score: Integer;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        for Count := 1 to 5 do</span></span>
<span class="line"><span>            // Use the Add method to add elements to a list</span></span>
<span class="line"><span>            Scores.Add(Count * 10);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for Count := 1 to Scores.Count() do</span></span>
<span class="line"><span>            // Use Get() to retrieve by index</span></span>
<span class="line"><span>            Message(&#39;Score is %1&#39;, Scores.Get(Count));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Use foreach to loop a list if you don&#39;t want to manage indexes manually</span></span>
<span class="line"><span>        foreach Score in Scores do</span></span>
<span class="line"><span>            Message(&#39;Score is %1&#39;, Score);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="finding-and-removing-elements" tabindex="-1">Finding and Removing Elements <a class="header-anchor" href="#finding-and-removing-elements" aria-label="Permalink to “Finding and Removing Elements”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Products: List of [Text];</span></span>
<span class="line"><span>    Removed: Boolean;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Products.Add(&#39;Laptop&#39;);</span></span>
<span class="line"><span>    Products.Add(&#39;Keyboard&#39;);</span></span>
<span class="line"><span>    Products.Add(&#39;Mouse&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if Products.Contains(&#39;Keyboard&#39;) then</span></span>
<span class="line"><span>        Message(&#39;Keyboard found&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Removed := Products.Remove(&#39;Keyboard&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if Removed then</span></span>
<span class="line"><span>        Message(&#39;Keyboard removed&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>Important:</strong> <code>Remove(Value)</code> removes the first occurrence of a matching value. If you need to remove an element by position, use <code>RemoveAt(Index)</code>.</p><p>Methods such as <code>Remove()</code> and <code>RemoveAt()</code> can return a Boolean indicating whether the operation succeeded.</p><p><strong>Useful resource:</strong> <a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/list/list-data-type" target="_blank" rel="noreferrer">Microsoft Learn — List data type and methods</a></p><hr><h2 id="dictionaries" tabindex="-1">Dictionaries <a class="header-anchor" href="#dictionaries" aria-label="Permalink to “Dictionaries”">​</a></h2><p>A <code>Dictionary</code> stores values as key-value pairs.</p><p>Each entry consists of:</p><ul><li><strong>Key:</strong> Uniquely identifies an entry.</li><li><strong>Value:</strong> The data associated with that key.</li></ul><p>Unlike a list, a dictionary is designed to retrieve values using keys rather than numeric positions.</p><h3 id="declaration-and-adding-elements-1" tabindex="-1">Declaration and Adding Elements <a class="header-anchor" href="#declaration-and-adding-elements-1" aria-label="Permalink to “Declaration and Adding Elements”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    ProductPrices: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Laptop&#39;, 75000);</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Keyboard&#39;, 2500);</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Mouse&#39;, 1200);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;Laptop price: %1&#39;, ProductPrices.Get(&#39;Laptop&#39;));</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>In this example:</p><ul><li>The key type is <code>Text</code>.</li><li>The value type is <code>Decimal</code>.</li><li>Each product name is a unique key associated with a price.</li></ul><h3 id="retrieving-values" tabindex="-1">Retrieving Values <a class="header-anchor" href="#retrieving-values" aria-label="Permalink to “Retrieving Values”">​</a></h3><p>Use <code>Get(Key)</code> to retrieve a value associated with a key.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    ProductPrices: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>    Price: Decimal;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Laptop&#39;, 75000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Price := ProductPrices.Get(&#39;Laptop&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;Price: %1&#39;, Price);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>Caution:</strong> Calling <code>Get(Key)</code> when the key does not exist can cause a runtime error. Use <code>ContainsKey()</code> when you need to check first.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>if ProductPrices.ContainsKey(&#39;Laptop&#39;) then</span></span>
<span class="line"><span>    Message(&#39;Price: %1&#39;, ProductPrices.Get(&#39;Laptop&#39;))</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    Message(&#39;Product not found&#39;);</span></span></code></pre></div><h3 id="updating-values" tabindex="-1">Updating Values <a class="header-anchor" href="#updating-values" aria-label="Permalink to “Updating Values”">​</a></h3><p>Use <code>Set(Key, Value)</code> to associate a key with a new value.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>ProductPrices.Set(&#39;Laptop&#39;, 80000);</span></span></code></pre></div><p>This updates the laptop&#39;s price to <code>80000</code>. The key must already exist for <code>Set()</code> to succeed.</p><h3 id="removing-entries" tabindex="-1">Removing Entries <a class="header-anchor" href="#removing-entries" aria-label="Permalink to “Removing Entries”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Removed: Boolean;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Removed := ProductPrices.Remove(&#39;Mouse&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if Removed then</span></span>
<span class="line"><span>        Message(&#39;Mouse removed&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><code>Remove(Key)</code> removes the entry associated with the specified key and returns a Boolean indicating whether the removal succeeded.</p><h3 id="common-dictionary-methods" tabindex="-1">Common Dictionary Methods <a class="header-anchor" href="#common-dictionary-methods" aria-label="Permalink to “Common Dictionary Methods”">​</a></h3><table tabindex="0"><thead><tr><th>Method</th><th>Purpose</th></tr></thead><tbody><tr><td><code>Add(Key, Value)</code></td><td>Adds a new key-value pair.</td></tr><tr><td><code>ContainsKey(Key)</code></td><td>Checks whether a key exists.</td></tr><tr><td><code>Count()</code></td><td>Returns the number of entries.</td></tr><tr><td><code>Get(Key)</code></td><td>Retrieves the value associated with a key.</td></tr><tr><td><code>Set(Key, Value)</code></td><td>Updates the value associated with an existing key.</td></tr><tr><td><code>Remove(Key)</code></td><td>Removes an entry by its key.</td></tr><tr><td><code>Keys()</code></td><td>Returns a list containing the dictionary&#39;s keys.</td></tr><tr><td><code>Values()</code></td><td>Returns a list containing its values.</td></tr></tbody></table><p><strong>Important:</strong> Dictionary keys must be unique. Attempting to add a key that already exists can fail. Check <code>ContainsKey()</code> when appropriate.</p><h3 id="looping-through-dictionary-entries" tabindex="-1">Looping Through Dictionary Entries <a class="header-anchor" href="#looping-through-dictionary-entries" aria-label="Permalink to “Looping Through Dictionary Entries”">​</a></h3><p>Use <code>Keys()</code> to obtain the keys, then retrieve each corresponding value.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    ProductPrices: Dictionary of [Text, Decimal];</span></span>
<span class="line"><span>    ProductNames: List of [Text];</span></span>
<span class="line"><span>    ProductName: Text;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Laptop&#39;, 75000);</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Keyboard&#39;, 2500);</span></span>
<span class="line"><span>    ProductPrices.Add(&#39;Mouse&#39;, 1200);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ProductNames := ProductPrices.Keys();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    foreach ProductName in ProductNames do</span></span>
<span class="line"><span>        Message(&#39;%1 costs %2&#39;, ProductName, ProductPrices.Get(ProductName));</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>This lets us process each product and its associated price.</p><p><strong>Note:</strong> A dictionary is an unordered collection. Do not rely on its keys or values being returned in a particular order.</p><p><strong>Useful resource:</strong> <a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/dictionary/dictionary-data-type" target="_blank" rel="noreferrer">Microsoft Learn — Dictionary data type and methods</a></p><hr><h2 id="choosing-the-right-collection" tabindex="-1">Choosing the Right Collection <a class="header-anchor" href="#choosing-the-right-collection" aria-label="Permalink to “Choosing the Right Collection”">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Array</th><th>List</th><th>Dictionary</th></tr></thead><tbody><tr><td>Stores multiple values</td><td>Yes</td><td>Yes</td><td>Yes</td></tr><tr><td>Dynamic size</td><td>No</td><td>Yes</td><td>Yes</td></tr><tr><td>Access by numeric index</td><td>Yes</td><td>Yes</td><td>No</td></tr><tr><td>Access by key</td><td>No</td><td>No</td><td>Yes</td></tr><tr><td>Duplicate values allowed</td><td>Yes</td><td>Yes</td><td>Values can repeat; keys must be unique</td></tr><tr><td>Built-in search methods</td><td>Limited</td><td>Yes</td><td>Yes</td></tr><tr><td>Typical use</td><td>Fixed-size data</td><td>Ordered collections</td><td>Key-value lookups</td></tr></tbody></table><h3 id="which-should-you-use" tabindex="-1">Which Should You Use? <a class="header-anchor" href="#which-should-you-use" aria-label="Permalink to “Which Should You Use?”">​</a></h3><ul><li><strong>Array:</strong> When the number of elements is fixed and known in advance.</li><li><strong>List:</strong> When you need an ordered collection that can grow or shrink.</li><li><strong>Dictionary:</strong> When you need to associate keys with values and retrieve values by key.</li></ul><h3 id="important-al-considerations" tabindex="-1">Important AL Considerations <a class="header-anchor" href="#important-al-considerations" aria-label="Permalink to “Important AL Considerations”">​</a></h3><ol><li><strong>Indexing:</strong> Arrays and lists use one-based indexes, so their first element is at index <code>1</code>.</li><li><strong>Bounds:</strong> Accessing an invalid array or list index can cause a runtime error. Check the valid range when necessary.</li><li><strong>Type safety:</strong> A list&#39;s elements share one declared type, and a dictionary has declared key and value types.</li><li><strong>Lists and dictionaries are reference types:</strong> Assigning one collection variable to another does not create an independent copy. Both variables can refer to the same underlying collection.</li><li><strong>Collection versus database:</strong> These collections hold data in memory. If you need to store and manage persistent Business Central business records, use tables and AL record operations instead.</li></ol>`,77)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};