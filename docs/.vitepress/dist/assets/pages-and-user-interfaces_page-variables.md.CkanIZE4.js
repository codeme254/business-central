import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Page Variables","description":"","frontmatter":{},"headers":[],"relativePath":"pages-and-user-interfaces/page-variables.md","filePath":"pages-and-user-interfaces/page-variables.md"}`),a={name:`pages-and-user-interfaces/page-variables.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="page-variables" tabindex="-1">Page Variables <a class="header-anchor" href="#page-variables" aria-label="Permalink to “Page Variables”">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to “Introduction”">​</a></h2><p>Page variables are variables declared inside a page object. They allow us to store and manipulate temporary information while the page is running.</p><p>For example, we can use page variables to:</p><ul><li>Store temporary user input.</li><li>Perform calculations.</li><li>Keep track of whether a particular condition has been met.</li><li>Store values used by page triggers, actions, and procedures.</li><li>Display information that does not necessarily come from a database table.</li></ul><p><strong>Important:</strong> Page variables are held in memory at runtime. They are not automatically saved to the database.</p><h2 id="declaring-page-variables" tabindex="-1">Declaring Page Variables <a class="header-anchor" href="#declaring-page-variables" aria-label="Permalink to “Declaring Page Variables”">​</a></h2><p>Page variables are declared using the <code>var</code> keyword at the object level.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>page 50100 ProductCard</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    PageType = Card;</span></span>
<span class="line"><span>    SourceTable = Product;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    layout</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        area(Content)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            group(General)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                field(Name; Rec.Name)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        TemporaryNote: Text[100];</span></span>
<span class="line"><span>        IsApproved: Boolean;</span></span>
<span class="line"><span>        TotalValue: Decimal;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>In this example:</p><ul><li><code>TemporaryNote</code> stores temporary text.</li><li><code>IsApproved</code> stores a Boolean value.</li><li><code>TotalValue</code> stores a decimal number.</li></ul><p>These variables can be accessed by the page&#39;s triggers, actions, and procedures.</p><h2 id="using-page-variables" tabindex="-1">Using Page Variables <a class="header-anchor" href="#using-page-variables" aria-label="Permalink to “Using Page Variables”">​</a></h2><p>Let&#39;s create a simple example where a user enters a temporary note and clicks an action to display it.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>page 50100 ProductCard</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    PageType = Card;</span></span>
<span class="line"><span>    SourceTable = Product;</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    layout</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        area(Content)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            group(General)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                field(Name; Rec.Name)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(TemporaryNote; TemporaryNote)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    Caption = &#39;Temporary Note&#39;;</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    actions</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        area(Processing)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            action(ShowNote)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;Show Note&#39;;</span></span>
<span class="line"><span>                ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                trigger OnAction()</span></span>
<span class="line"><span>                begin</span></span>
<span class="line"><span>                    Message(&#39;Your note: %1&#39;, TemporaryNote);</span></span>
<span class="line"><span>                end;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        TemporaryNote: Text[100];</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Notice the following:</p><ul><li><code>TemporaryNote</code> is declared in the page&#39;s <code>var</code> section.</li><li>The page field is bound to the variable instead of a table field.</li><li>The action accesses the same variable and displays its current value.</li></ul><p><strong>The important distinction:</strong> <code>field(Name; Rec.Name)</code> is bound to a database table field, whereas <code>field(TemporaryNote; TemporaryNote)</code> is bound to a page variable.</p><p>Changes to <code>TemporaryNote</code> are not automatically persisted to the database.</p><h2 id="global-and-local-variables" tabindex="-1">Global and Local Variables <a class="header-anchor" href="#global-and-local-variables" aria-label="Permalink to “Global and Local Variables”">​</a></h2><p>AL supports both global and local variables.</p><h3 id="global-variables" tabindex="-1">Global Variables <a class="header-anchor" href="#global-variables" aria-label="Permalink to “Global Variables”">​</a></h3><p>Variables declared in the object&#39;s <code>var</code> section are global to that object.</p><p>In a page, they can be accessed from its triggers and procedures.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    TotalValue: Decimal;</span></span></code></pre></div><h3 id="local-variables" tabindex="-1">Local Variables <a class="header-anchor" href="#local-variables" aria-label="Permalink to “Local Variables”">​</a></h3><p>Local variables are declared inside a procedure or trigger using a local <code>var</code> section. They are only accessible within that procedure or trigger.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>local procedure CalculateTotal()</span></span>
<span class="line"><span>var</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>    UnitPrice: Decimal;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Quantity := 5;</span></span>
<span class="line"><span>    UnitPrice := 100;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    TotalValue := Quantity * UnitPrice;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>Here:</p><ul><li><code>Quantity</code> and <code>UnitPrice</code> are local variables.</li><li><code>TotalValue</code> is a global page variable and can therefore be accessed outside this procedure.</li></ul><p><strong>Remember:</strong> Global and local describe the variable&#39;s scope within the AL object. A global page variable is not automatically accessible from other objects.</p><h2 id="page-variables-vs-system-defined-variables" tabindex="-1">Page Variables vs. System-Defined Variables <a class="header-anchor" href="#page-variables-vs-system-defined-variables" aria-label="Permalink to “Page Variables vs. System-Defined Variables”">​</a></h2><p>Business Central also provides variables that are automatically declared and maintained by the system.</p><p>Some examples include:</p><table tabindex="0"><thead><tr><th>Variable</th><th>Description</th></tr></thead><tbody><tr><td><code>Rec</code></td><td>Represents the current record being processed by the page.</td></tr><tr><td><code>xRec</code></td><td>Represents the previous version of a record before modification.</td></tr><tr><td><code>CurrPage</code></td><td>Represents the current page instance.</td></tr></tbody></table><p>Unlike user-defined variables, you do not need to declare these yourself.</p><p>For example:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>trigger OnOpenPage()</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Message(&#39;Current product: %1&#39;, Rec.Name);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>Here, <code>Rec</code> is a system-defined variable that gives us access to the current product record.</p><h2 id="key-takeaways" tabindex="-1">Key Takeaways <a class="header-anchor" href="#key-takeaways" aria-label="Permalink to “Key Takeaways”">​</a></h2><ul><li>Page variables store temporary information while a page is running.</li><li>Declare global page variables using the object&#39;s <code>var</code> section.</li><li>Declare local variables inside procedures or triggers.</li><li>Global page variables can be accessed by different triggers and procedures within the same page.</li><li>Page variables are not automatically stored in the database.</li><li><code>Rec</code>, <code>xRec</code>, and <code>CurrPage</code> are examples of system-defined variables.</li></ul><h2 id="further-reading" tabindex="-1">Further Reading <a class="header-anchor" href="#further-reading" aria-label="Permalink to “Further Reading”">​</a></h2><ul><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-variables" target="_blank" rel="noreferrer">AL Variables</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-system-defined-variables" target="_blank" rel="noreferrer">System-Defined Variables</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-programming-in-al" target="_blank" rel="noreferrer">Programming in AL</a></li></ul>`,43)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};