import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Variables and Data Types","description":"","frontmatter":{},"headers":[],"relativePath":"variables-data-types-operators-and-control-flow/variables-and-data-types.md","filePath":"variables-data-types-operators-and-control-flow/variables-and-data-types.md"}`),a={name:`variables-data-types-operators-and-control-flow/variables-and-data-types.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="variables-and-data-types" tabindex="-1">Variables and Data Types <a class="header-anchor" href="#variables-and-data-types" aria-label="Permalink to “Variables and Data Types”">​</a></h1><p>Variables are named storage locations used to hold values while AL code executes. Every variable has a <strong>data type</strong>, which determines what kind of value it can store and which operations can be performed on it.</p><h2 id="declaring-variables" tabindex="-1">Declaring Variables <a class="header-anchor" href="#declaring-variables" aria-label="Permalink to “Declaring Variables”">​</a></h2><p>In AL, variables are declared in a <code>var</code> section.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    CustomerName: Text[100];</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>    UnitPrice: Decimal;</span></span>
<span class="line"><span>    IsAvailable: Boolean;</span></span></code></pre></div><p><strong>Syntax:</strong> <code>VariableName: DataType;</code></p><ul><li><code>var</code> begins the variable declaration section.</li><li><code>CustomerName</code> is the variable&#39;s name.</li><li><code>Text[100]</code> is its data type and maximum text length.</li><li>The semicolon terminates the declaration.</li></ul><p>You can declare multiple variables of the same type in one statement:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Quantity, TotalItems: Integer;</span></span></code></pre></div><h2 id="common-data-types" tabindex="-1">Common Data Types <a class="header-anchor" href="#common-data-types" aria-label="Permalink to “Common Data Types”">​</a></h2><table tabindex="0"><thead><tr><th>Data Type</th><th>Purpose</th><th>Example</th></tr></thead><tbody><tr><td><code>Integer</code></td><td>Stores whole numbers.</td><td><code>Quantity := 25;</code></td></tr><tr><td><code>Decimal</code></td><td>Stores numbers with fractional parts.</td><td><code>UnitPrice := 99.50;</code></td></tr><tr><td><code>Boolean</code></td><td>Stores <code>true</code> or <code>false</code>.</td><td><code>IsAvailable := true;</code></td></tr><tr><td><code>Text</code></td><td>Stores text, such as names and descriptions.</td><td><code>CustomerName := &#39;Contoso Ltd.&#39;;</code></td></tr><tr><td><code>Code</code></td><td>Stores code-like text, commonly used for identifiers such as customer numbers.</td><td><code>CustomerNumber := &#39;CUST001&#39;;</code></td></tr><tr><td><code>Date</code></td><td>Stores a calendar date without a time.</td><td><code>OrderDate := Today;</code></td></tr><tr><td><code>Time</code></td><td>Stores a time of day without a date.</td><td><code>CurrentTime := Time;</code></td></tr><tr><td><code>DateTime</code></td><td>Stores both a date and a time.</td><td><code>CurrentDateTimeValue := CurrentDateTime;</code></td></tr><tr><td><code>Record</code></td><td>Represents records from a Business Central table.</td><td><code>CustomerRec: Record Customer;</code></td></tr></tbody></table><h3 id="text-vs-code" tabindex="-1">Text vs. Code <a class="header-anchor" href="#text-vs-code" aria-label="Permalink to “Text vs. Code”">​</a></h3><p>Both <code>Text</code> and <code>Code</code> store textual values, but they serve different purposes.</p><ul><li><code>Text</code> is suitable for names, descriptions, messages, and other ordinary text.</li><li><code>Code</code> is commonly used for identifiers such as customer numbers and item numbers.</li></ul><p>For example:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    CustomerName: Text[100];</span></span>
<span class="line"><span>    CustomerNumber: Code[20];</span></span></code></pre></div><p><code>Text[100]</code> allows up to 100 characters, while <code>Code[20]</code> allows up to 20 characters. A <code>Code</code> value is normalized to uppercase, making it useful for identifiers that should not depend on letter casing.</p><h2 id="constants-and-assignments" tabindex="-1">Constants and Assignments <a class="header-anchor" href="#constants-and-assignments" aria-label="Permalink to “Constants and Assignments”">​</a></h2><p>An <strong>assignment</strong> stores a value in a variable. AL uses the <code>:=</code> operator for assignment.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>    UnitPrice: Decimal;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Quantity := 5;</span></span>
<span class="line"><span>    UnitPrice := 250.50;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>Here, <code>5</code> and <code>250.50</code> are literal values assigned to variables.</p><p>Add this small section under <strong>Declaring Variables</strong> in your notes:</p><h3 id="local-vs-global-variables" tabindex="-1">Local vs. Global Variables <a class="header-anchor" href="#local-vs-global-variables" aria-label="Permalink to “Local vs. Global Variables”">​</a></h3><p>AL supports two kinds of variables based on where they are declared:</p><ul><li><strong>Local variables:</strong> Declared in the <code>var</code> section of a procedure or trigger. They are accessible only within that procedure or trigger.</li><li><strong>Global variables:</strong> Declared in the object&#39;s global <code>var</code> section, outside individual procedures and triggers. They can be accessed by the procedures and triggers within that object.</li></ul><p><strong>Example:</strong></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        GlobalMessage: Text[50]; </span></span>
<span class="line"><span>        // Global variable - declared in the object&#39;s global </span></span>
<span class="line"><span>        //      var section outside any procedure or trigger</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        LocalQuantity: Integer;</span></span>
<span class="line"><span>        // Local variable: declared in the var section of the OnOpenPage trigger</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        GlobalMessage := &#39;Welcome to Business Central&#39;;</span></span>
<span class="line"><span>        LocalQuantity := 10;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Message(&#39;%1. Quantity: %2&#39;, GlobalMessage, LocalQuantity);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here, <code>GlobalMessage</code> is a global variable, while <code>LocalQuantity</code> is a local variable.</p><p><strong>Remember:</strong> Declare local variables in the <code>var</code> section before <code>begin</code>. Global variables are declared in the object&#39;s <code>var</code> section, outside individual triggers and procedures.</p><h3 id="labels-for-reusable-text" tabindex="-1">Labels for reusable text <a class="header-anchor" href="#labels-for-reusable-text" aria-label="Permalink to “Labels for reusable text”">​</a></h3><p>AL supports labels for text that may need translation.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    GreetingLbl: Label &#39;Welcome to Business Central&#39;;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Message(GreetingLbl);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><code>GreetingLbl</code> is a label containing reusable text. Labels are especially useful for user-facing messages in Business Central extensions.</p><h2 id="working-with-date-and-time" tabindex="-1">Working with Date and Time <a class="header-anchor" href="#working-with-date-and-time" aria-label="Permalink to “Working with Date and Time”">​</a></h2><p>AL provides built-in methods for retrieving the current date, time, and date-time.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage();</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        CurrentDate: Date;</span></span>
<span class="line"><span>        CurrentTime: Time;</span></span>
<span class="line"><span>        CurrentDateTimeVal: DateTime;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        CurrentDate := Today;</span></span>
<span class="line"><span>        CurrentTime := Time;</span></span>
<span class="line"><span>        CurrentDateTimeVal := CurrentDateTime;</span></span>
<span class="line"><span>        Message(&#39;Date: %1, Time: %2, Datetime: %3&#39;, CurrentDate, CurrentTime, CurrentDateTimeVal);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><code>Today</code> returns the current date according to the Business Central user&#39;s regional and time-zone settings.</li><li><code>Time</code> returns the current time.</li><li><code>CurrentDateTime</code> returns the current date and time.</li></ul><p>These values can be displayed using <code>Message()</code> and <code>Format()</code>.</p><h2 id="record-and-other-complex-types" tabindex="-1">Record and Other Complex Types <a class="header-anchor" href="#record-and-other-complex-types" aria-label="Permalink to “Record and Other Complex Types”">​</a></h2><p>A <code>Record</code> variable allows AL code to work with records stored in Business Central tables.</p><p>For example:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    CustomerRec: Record Customer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    if CustomerRec.FindFirst() then</span></span>
<span class="line"><span>        Message(&#39;Customer: %1&#39;, CustomerRec.Name)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        Message(&#39;No customers were found.&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><ul><li><code>Record Customer</code> declares a variable that represents records from the Customer table.</li><li><code>FindFirst()</code> attempts to retrieve the first record that matches the record&#39;s current filters.</li><li><code>CustomerRec.Name</code> accesses the Name field of the retrieved customer.</li><li>The <code>if</code> statement checks whether a record was found before accessing its fields.</li></ul><p>A <code>Record</code> variable does not automatically contain a customer. You must retrieve a record or initialize and populate one as appropriate.</p><p>Other complex AL types include <code>RecordRef</code>, <code>FieldRef</code>, <code>Guid</code>, and <code>Blob</code>. These provide additional ways to work with table records, fields, identifiers, and binary data.</p><h2 id="type-conversion" tabindex="-1">Type Conversion <a class="header-anchor" href="#type-conversion" aria-label="Permalink to “Type Conversion”">​</a></h2><p>Type conversion changes a value from one data type to another.</p><h3 id="automatic-conversion" tabindex="-1">Automatic conversion <a class="header-anchor" href="#automatic-conversion" aria-label="Permalink to “Automatic conversion”">​</a></h3><p>AL can automatically convert certain compatible types during assignment.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>    Amount: Decimal;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Quantity := 5;</span></span>
<span class="line"><span>    Amount := Quantity;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>The integer <code>5</code> is converted to the decimal value <code>5</code>.</p><p>However, not every conversion is automatic or safe.</p><h3 id="explicit-conversion-with-format" tabindex="-1">Explicit conversion with Format() <a class="header-anchor" href="#explicit-conversion-with-format" aria-label="Permalink to “Explicit conversion with Format()”">​</a></h3><p><code>Format()</code> converts a value into its textual representation.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>    QuantityText: Text;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Quantity := 25;</span></span>
<span class="line"><span>    QuantityText := Format(Quantity);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(QuantityText);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>The integer <code>25</code> becomes the text <code>&#39;25&#39;</code>.</p><h3 id="explicit-conversion-with-evaluate" tabindex="-1">Explicit conversion with Evaluate() <a class="header-anchor" href="#explicit-conversion-with-evaluate" aria-label="Permalink to “Explicit conversion with Evaluate()”">​</a></h3><p><code>Evaluate()</code> attempts to convert text into the data type of a destination variable.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>    InputText: Text;</span></span>
<span class="line"><span>    ConversionSucceeded: Boolean;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    InputText := &#39;25&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ConversionSucceeded := Evaluate(Quantity, InputText);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if ConversionSucceeded then</span></span>
<span class="line"><span>        Message(&#39;Quantity: %1&#39;, Quantity)</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        Message(&#39;The input is not a valid integer.&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><ul><li><code>Evaluate()</code> attempts to interpret the text as an integer.</li><li>It returns <code>true</code> when conversion succeeds and <code>false</code> when it fails.</li><li>Checking the return value lets you handle invalid input without immediately raising a conversion error.</li></ul><h2 id="practical-example-see-variables-in-business-central" tabindex="-1">Practical Example: See Variables in Business Central <a class="header-anchor" href="#practical-example-see-variables-in-business-central" aria-label="Permalink to “Practical Example: See Variables in Business Central”">​</a></h2><p><strong>File:</strong> <code>CustomerVariablesDemo.PageExt.al</code></p><p>This example extends the Customer List page and displays values of different data types when the page opens.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Quantity: Integer;</span></span>
<span class="line"><span>        UnitPrice: Decimal;</span></span>
<span class="line"><span>        IsAvailable: Boolean;</span></span>
<span class="line"><span>        ProductName: Text[50];</span></span>
<span class="line"><span>        ProductCode: Code[20];</span></span>
<span class="line"><span>        CurrentDate: Date;</span></span>
<span class="line"><span>        CurrentTime: Time;</span></span>
<span class="line"><span>        CurrentDateTimeValue: DateTime;</span></span>
<span class="line"><span>        CustomerRec: Record Customer;</span></span>
<span class="line"><span>        QuantityText: Text;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        // Assign values to variables.</span></span>
<span class="line"><span>        Quantity := 5;</span></span>
<span class="line"><span>        UnitPrice := 250.50;</span></span>
<span class="line"><span>        IsAvailable := true;</span></span>
<span class="line"><span>        ProductName := &#39;Laptop&#39;;</span></span>
<span class="line"><span>        ProductCode := &#39;laptop001&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        CurrentDate := Today;</span></span>
<span class="line"><span>        CurrentTime := Time;</span></span>
<span class="line"><span>        CurrentDateTimeValue := CurrentDateTime;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Convert an integer to text.</span></span>
<span class="line"><span>        QuantityText := Format(Quantity);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Display simple data types.</span></span>
<span class="line"><span>        Message(</span></span>
<span class="line"><span>            &#39;Product: %1\\Code: %2\\Quantity: %3\\Unit Price: %4\\Available: %5&#39;,</span></span>
<span class="line"><span>            ProductName,</span></span>
<span class="line"><span>            ProductCode,</span></span>
<span class="line"><span>            Quantity,</span></span>
<span class="line"><span>            UnitPrice,</span></span>
<span class="line"><span>            IsAvailable</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Display date and time values.</span></span>
<span class="line"><span>        Message(</span></span>
<span class="line"><span>            &#39;Date: %1\\Time: %2\\DateTime: %3&#39;,</span></span>
<span class="line"><span>            CurrentDate,</span></span>
<span class="line"><span>            CurrentTime,</span></span>
<span class="line"><span>            CurrentDateTimeValue</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Display the result of type conversion.</span></span>
<span class="line"><span>        Message(&#39;Quantity as text: %1&#39;, QuantityText);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Retrieve and display an existing customer.</span></span>
<span class="line"><span>        if CustomerRec.FindFirst() then</span></span>
<span class="line"><span>            Message(&#39;First customer: %1&#39;, CustomerRec.Name)</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            Message(&#39;No customers were found.&#39;);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="what-to-observe" tabindex="-1">What to observe <a class="header-anchor" href="#what-to-observe" aria-label="Permalink to “What to observe”">​</a></h3><ol><li>The first message displays the product details. Notice that <code>ProductCode</code> is normalized to uppercase.</li><li>The second message displays the current date, time, and date-time.</li><li>The third message displays the quantity after converting it to text.</li><li>The final message displays the first customer found, or a message indicating that no customers were found.</li></ol><p><strong>Note:</strong> This example assumes object ID <code>50100</code> is available in your configured ID range. If you&#39;ve already used that ID in another object in your extension, choose an available ID.</p><h2 id="further-reading" tabindex="-1">Further Reading <a class="header-anchor" href="#further-reading" aria-label="Permalink to “Further Reading”">​</a></h2><ul><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-variables" target="_blank" rel="noreferrer">AL variables — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/library" target="_blank" rel="noreferrer">Data types and methods — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/date/date-data-type" target="_blank" rel="noreferrer">Date data type — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/system/system-today-method" target="_blank" rel="noreferrer">System.Today() method — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/system/system-evaluate-method" target="_blank" rel="noreferrer">System.Evaluate() method — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-type-conversion-expressions" target="_blank" rel="noreferrer">AL type conversion in expressions — Microsoft Learn</a></li></ul>`,69)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};