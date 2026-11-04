import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Page Layout and Controls in AL","description":"","frontmatter":{},"headers":[],"relativePath":"pages-and-user-interfaces/page-layout-and-controls.md","filePath":"pages-and-user-interfaces/page-layout-and-controls.md"}`),a={name:`pages-and-user-interfaces/page-layout-and-controls.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="page-layout-and-controls-in-al" tabindex="-1">Page Layout and Controls in AL <a class="header-anchor" href="#page-layout-and-controls-in-al" aria-label="Permalink to “Page Layout and Controls in AL”">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to “Introduction”">​</a></h2><p>Now that we understand Page Objects and Page Types, let&#39;s look at how we actually construct the user interface of a page.</p><p>In AL, the layout defines how elements are organized and presented on a page, while controls are the individual elements users interact with or use to view information.</p><p>For example, consider a Product Card page. It might contain:</p><ul><li>A section displaying basic product information.</li><li>Another section displaying pricing information.</li><li>Fields for entering the product number, name, and price.</li><li>Actions for performing operations on the product.</li></ul><p>All these elements contribute to the page&#39;s user interface.</p><p>A page&#39;s visual structure is primarily defined inside the <code>layout</code> section of a page object.</p><h2 id="the-layout-section" tabindex="-1">The Layout Section <a class="header-anchor" href="#the-layout-section" aria-label="Permalink to “The Layout Section”">​</a></h2><p>The <code>layout</code> section defines the structure and arrangement of controls on a page.</p><p>It is declared inside a page object using the <code>layout</code> keyword.</p><p>Example:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>page 50100 ProductCard</span></span>
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
<span class="line"><span>                field(&quot;No.&quot;; Rec.&quot;No.&quot;)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(Name; Rec.Name)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The important thing to understand is the hierarchy:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Page Object</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |-- Properties</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |-- layout</span></span>
<span class="line"><span>    |     |</span></span>
<span class="line"><span>    |     |-- area</span></span>
<span class="line"><span>    |           |</span></span>
<span class="line"><span>    |           |-- group</span></span>
<span class="line"><span>    |                 |</span></span>
<span class="line"><span>    |                 |-- field</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |-- actions</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |-- triggers</span></span></code></pre></div><p>We&#39;ll explore each of these elements.</p><h3 id="areas" tabindex="-1">Areas <a class="header-anchor" href="#areas" aria-label="Permalink to “Areas”">​</a></h3><p>An Area defines a specific region or placement within a page. Controls are placed inside areas to determine where their content appears.</p><p>Some commonly used areas include:</p><table tabindex="0"><thead><tr><th>Area</th><th>Purpose</th></tr></thead><tbody><tr><td><code>Content</code></td><td>Contains the main content of a page.</td></tr><tr><td><code>FactBoxes</code></td><td>Displays additional information, usually on the right side of a page.</td></tr><tr><td><code>RoleCenter</code></td><td>Contains the main content of a RoleCenter page.</td></tr><tr><td><code>Prompt</code></td><td>Provides the prompt area for Copilot interactions on PromptDialog pages.</td></tr></tbody></table><p>Example:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>layout</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Content)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // Main page content goes here.</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    area(FactBoxes)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // FactBoxes go here.</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Important: The available areas depend on the selected page type. For example, a normal Card page commonly uses <code>Content</code> and <code>FactBoxes</code>, while a RoleCenter has its own layout structure.</p><h3 id="group-controls" tabindex="-1">Group Controls <a class="header-anchor" href="#group-controls" aria-label="Permalink to “Group Controls”">​</a></h3><p>A Group control organizes related controls together.</p><p>For example, on a Product Card page, we might want to organize product information into separate sections:</p><ul><li>General: Product number and name.</li><li>Pricing: Unit price and cost.</li><li>Inventory: Inventory quantity and reorder level.</li></ul><p>Groups help make pages easier to navigate by organizing related information.</p><p>Example:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>layout</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Content)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        group(General)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;General&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            field(&quot;No.&quot;; Rec.&quot;No.&quot;)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                ApplicationArea = All;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            field(Name; Rec.Name)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                ApplicationArea = All;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        group(Pricing)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Pricing&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            field(&quot;Unit Price&quot;; Rec.&quot;Unit Price&quot;)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                ApplicationArea = All;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>In this example, we have two groups: <code>General</code> and <code>Pricing</code>.</p><p>On a Card page, top-level groups typically appear as expandable and collapsible sections called FastTabs.</p><p>Groups can also be nested inside other groups to create additional levels of organization.</p><h3 id="repeater-controls" tabindex="-1">Repeater Controls <a class="header-anchor" href="#repeater-controls" aria-label="Permalink to “Repeater Controls”">​</a></h3><p>A Repeater control is used to display a collection of records in rows and columns.</p><p>It is particularly important when building List pages.</p><p>For example, a Product List page might display:</p><table tabindex="0"><thead><tr><th>No.</th><th>Name</th><th>Unit Price</th></tr></thead><tbody><tr><td>P001</td><td>Laptop</td><td>75,000</td></tr><tr><td>P002</td><td>Keyboard</td><td>2,500</td></tr><tr><td>P003</td><td>Mouse</td><td>1,200</td></tr></tbody></table><p>Each row represents a record, while each column represents a field.</p><p>Example:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>page 50101 ProductList</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    PageType = List;</span></span>
<span class="line"><span>    SourceTable = Product;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    layout</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        area(Content)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            repeater(General)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                field(&quot;No.&quot;; Rec.&quot;No.&quot;)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(Name; Rec.Name)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(&quot;Unit Price&quot;; Rec.&quot;Unit Price&quot;)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Notice that each field is placed inside the repeater.</p><p>Business Central uses the repeater to generate the rows and columns based on the records available in the source table.</p><p>Important: A List page is designed around a single repeater in its Content area. If you need more complex layouts with additional controls, consider using a Worksheet page instead.</p><h3 id="field-controls" tabindex="-1">Field Controls <a class="header-anchor" href="#field-controls" aria-label="Permalink to “Field Controls”">​</a></h3><p>A Field control displays a field from a table or another supported data source on a page.</p><p>For example:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>field(Name; Rec.Name)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here:</p><ul><li><code>field</code> declares a field control.</li><li><code>Name</code> is the control&#39;s identifier.</li><li><code>Rec.Name</code> specifies the data source for the control.</li><li><code>ApplicationArea</code> determines where the control is available.</li></ul><p>Field controls can allow users to view or edit information depending on the page configuration and field properties.</p><p>We&#39;ll dedicate a separate topic to Fields and Data Bindings, where we&#39;ll properly examine <code>Rec</code>, field references, and how page controls connect to data.</p><h3 id="part-controls" tabindex="-1">Part Controls <a class="header-anchor" href="#part-controls" aria-label="Permalink to “Part Controls”">​</a></h3><p>A Part control allows you to embed another page inside the current page.</p><p>This is particularly useful when building pages that need to display additional related information.</p><p>For example, a Customer Card could contain a FactBox showing the customer&#39;s sales statistics.</p><p>Example:</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>layout</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(FactBoxes)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        part(ProductDetails; ProductDetailsPart)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            ApplicationArea = All;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here:</p><ul><li><code>part</code> declares a page part control.</li><li><code>ProductDetails</code> is the name of the control.</li><li><code>ProductDetailsPart</code> is the page object being embedded.</li></ul><p>The referenced page would typically be a <code>CardPart</code> or <code>ListPart</code>, depending on the information being displayed.</p><p>We&#39;ll explore page parts and how pages communicate with one another separately.</p><h2 id="other-layout-controls-worth-knowing" tabindex="-1">Other Layout Controls Worth Knowing <a class="header-anchor" href="#other-layout-controls-worth-knowing" aria-label="Permalink to “Other Layout Controls Worth Knowing”">​</a></h2><p>Besides the controls we&#39;ve discussed, AL provides other controls for specialized layouts.</p><table tabindex="0"><thead><tr><th>Control</th><th>Purpose</th></tr></thead><tbody><tr><td><code>CueGroup</code></td><td>Groups Cue controls, commonly used on RoleCenter pages to display business statistics.</td></tr><tr><td><code>GridLayout</code></td><td>Arranges controls in a grid of rows and columns.</td></tr><tr><td><code>FixedLayout</code></td><td>Provides a fixed arrangement of controls in rows and columns.</td></tr><tr><td><code>SystemPart</code></td><td>Embeds built-in Business Central functionality, such as Notes or Links.</td></tr><tr><td><code>UserControl</code></td><td>Embeds a custom user control, such as one built using JavaScript and the Business Central control add-in framework.</td></tr></tbody></table><p>You don&#39;t need to master these yet. The most important controls to understand initially are:</p><ul><li><code>area</code></li><li><code>group</code></li><li><code>repeater</code></li><li><code>field</code></li><li><code>part</code></li></ul><h2 id="putting-everything-together" tabindex="-1">Putting Everything Together <a class="header-anchor" href="#putting-everything-together" aria-label="Permalink to “Putting Everything Together”">​</a></h2><p>Let&#39;s look at a simplified Product Card page that brings together the concepts we&#39;ve covered.</p><div class="language-"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>page 50100 ProductCard</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    PageType = Card;</span></span>
<span class="line"><span>    SourceTable = Product;</span></span>
<span class="line"><span>    Caption = &#39;Product Card&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    layout</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        area(Content)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            group(General)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;General&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(&quot;No.&quot;; Rec.&quot;No.&quot;)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(Name; Rec.Name)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            group(Pricing)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;Pricing&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                field(&quot;Unit Price&quot;; Rec.&quot;Unit Price&quot;)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Notice how:</p><ol><li><code>layout</code> defines the page structure.</li><li><code>area(Content)</code> defines the main content area.</li><li><code>group</code> organizes related information into sections.</li><li><code>field</code> controls display individual pieces of information.</li></ol><p>This is essentially how we construct the user interface of a Business Central page.</p><h2 id="key-takeaways" tabindex="-1">Key Takeaways <a class="header-anchor" href="#key-takeaways" aria-label="Permalink to “Key Takeaways”">​</a></h2><ul><li>The <code>layout</code> section defines the visual structure of a page.</li><li>Areas define where controls are placed.</li><li>Groups organize related controls and can create FastTabs.</li><li>Repeaters display collections of records in rows and columns.</li><li>Field controls display individual pieces of information.</li><li>Part controls embed other pages within the current page.</li><li>The available layout areas and supported controls depend on the page type.</li></ul><h2 id="further-reading" tabindex="-1">Further Reading <a class="header-anchor" href="#further-reading" aria-label="Permalink to “Further Reading”">​</a></h2><ol><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-pages-overview" target="_blank" rel="noreferrer">Microsoft Learn – Pages Overview</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-page-types-and-layouts" target="_blank" rel="noreferrer">Microsoft Learn – Page Types and Layouts</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-repeater-controls" target="_blank" rel="noreferrer">Microsoft Learn – Working with Repeater Controls</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-designing-listparts" target="_blank" rel="noreferrer">Microsoft Learn – Working with ListPart Pages</a></li></ol>`,77)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};