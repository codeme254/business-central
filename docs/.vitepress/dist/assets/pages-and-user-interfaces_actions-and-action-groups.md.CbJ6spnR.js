import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Actions and Action Groups in AL","description":"","frontmatter":{},"headers":[],"relativePath":"pages-and-user-interfaces/actions-and-action-groups.md","filePath":"pages-and-user-interfaces/actions-and-action-groups.md"}`),a={name:`pages-and-user-interfaces/actions-and-action-groups.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="actions-and-action-groups-in-al" tabindex="-1">Actions and Action Groups in AL <a class="header-anchor" href="#actions-and-action-groups-in-al" aria-label="Permalink to “Actions and Action Groups in AL”">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to “Introduction”">​</a></h2><p>So far, we&#39;ve learned how to create pages, organize their layouts, and display data using fields and repeaters.</p><p>However, displaying information is only part of what users need. They also need to perform operations on that information.</p><p>For example, when viewing a Product Card, a user might want to:</p><ul><li>Delete a product.</li><li>View product transactions.</li><li>Calculate the product&#39;s inventory value.</li><li>Open a related page.</li><li>Generate a product report.</li></ul><p>In Business Central, we use <strong>Actions</strong> to provide these operations through the user interface.</p><p>An Action is an interactive element that allows users to trigger functionality, navigate to other pages, or execute business logic.</p><p><strong>Action Groups</strong> help organize related actions into logical menus and submenus.</p><h2 id="declaring-actions" tabindex="-1">Declaring Actions <a class="header-anchor" href="#declaring-actions" aria-label="Permalink to “Declaring Actions”">​</a></h2><p>Actions are defined inside the <code>actions</code> section of a page object.</p><p>The general structure is:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>actions</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Processing)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        action(ActionName)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            // Action properties and triggers</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Let&#39;s understand the structure:</p><table tabindex="0"><thead><tr><th>Component</th><th>Description</th></tr></thead><tbody><tr><td><code>actions</code></td><td>Defines the actions available on the page.</td></tr><tr><td><code>area(Processing)</code></td><td>Specifies where the actions belong in the action bar.</td></tr><tr><td><code>action(ActionName)</code></td><td>Declares an individual action.</td></tr><tr><td><code>{ }</code></td><td>Contains the action&#39;s properties and triggers.</td></tr></tbody></table><h3 id="practical-example" tabindex="-1">Practical Example <a class="header-anchor" href="#practical-example" aria-label="Permalink to “Practical Example”">​</a></h3><p>Let&#39;s create an action on our Product Card page that displays a message when selected.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>actions</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Processing)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        action(ShowProductInfo)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Show Product Info&#39;;</span></span>
<span class="line"><span>            ApplicationArea = All;</span></span>
<span class="line"><span>            Image = Info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            trigger OnAction()</span></span>
<span class="line"><span>            begin</span></span>
<span class="line"><span>                Message(&#39;Product: %1&#39;, Rec.Name);</span></span>
<span class="line"><span>            end;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here:</p><ul><li><code>action(ShowProductInfo)</code> declares the action.</li><li><code>Caption</code> specifies the text displayed to the user.</li><li><code>ApplicationArea</code> determines its availability.</li><li><code>Image</code> specifies the icon displayed alongside the action.</li><li><code>OnAction()</code> executes when the user selects the action.</li><li><code>Message()</code> displays the product name.</li></ul><p><strong>Important:</strong> <code>OnAction()</code> is the trigger used to execute AL code when a user invokes an action.</p><p>We&#39;ll explore triggers in more detail separately.</p><h2 id="action-areas" tabindex="-1">Action Areas <a class="header-anchor" href="#action-areas" aria-label="Permalink to “Action Areas”">​</a></h2><p>Just as page layouts have areas such as <code>Content</code> and <code>FactBoxes</code>, actions also have areas that determine where actions appear in the Business Central interface.</p><p>The most important action areas are:</p><table tabindex="0"><thead><tr><th>Action Area</th><th>Purpose</th><th>Example</th></tr></thead><tbody><tr><td><code>Processing</code></td><td>Contains actions that perform operations or process records.</td><td>Post a sales order.</td></tr><tr><td><code>Creation</code></td><td>Contains actions for creating new documents or records.</td><td>Create a sales invoice.</td></tr><tr><td><code>Navigation</code></td><td>Contains actions that navigate to related pages.</td><td>Open customer ledger entries.</td></tr><tr><td><code>Reporting</code></td><td>Contains actions for running reports.</td><td>Generate a customer report.</td></tr></tbody></table><p><strong>Example:</strong></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>actions</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Processing)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        action(CalculateInventory)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Calculate Inventory&#39;;</span></span>
<span class="line"><span>            ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            trigger OnAction()</span></span>
<span class="line"><span>            begin</span></span>
<span class="line"><span>                Message(&#39;Calculating inventory...&#39;);</span></span>
<span class="line"><span>            end;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    area(Navigation)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        action(ViewProducts)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;View Products&#39;;</span></span>
<span class="line"><span>            ApplicationArea = All;</span></span>
<span class="line"><span>            RunObject = page ProductList;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    area(Reporting)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        action(ProductReport)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Product Report&#39;;</span></span>
<span class="line"><span>            ApplicationArea = All;</span></span>
<span class="line"><span>            RunObject = report ProductReport;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Each action appears in the appropriate menu within the page&#39;s action bar.</p><p><strong>A note on action areas:</strong></p><ul><li><code>Processing</code> actions generally appear under the Actions menu.</li><li><code>Creation</code> actions appear under the New menu.</li><li><code>Navigation</code> actions appear under the Navigate menu.</li><li><code>Reporting</code> actions appear under the Reports menu.</li></ul><p>The actual presentation depends on the page type and the Business Central action bar. <a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-actions-overview" target="_blank" rel="noreferrer">Microsoft Learn</a></p><h2 id="action-groups" tabindex="-1">Action Groups <a class="header-anchor" href="#action-groups" aria-label="Permalink to “Action Groups”">​</a></h2><p>An <strong>Action Group</strong> is used to organize related actions under a common menu or submenu.</p><p>Imagine our Product Card page has several inventory-related operations:</p><ul><li>Calculate Inventory.</li><li>Adjust Inventory.</li><li>View Inventory Entries.</li></ul><p>Instead of displaying all these actions separately, we can group them under an Inventory menu.</p><p>We declare an action group using the <code>group</code> keyword inside an action area.</p><p><strong>Example:</strong></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>actions</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Processing)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        group(Inventory)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Inventory&#39;;</span></span>
<span class="line"><span>            Image = Inventory;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            action(CalculateInventory)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;Calculate Inventory&#39;;</span></span>
<span class="line"><span>                ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                trigger OnAction()</span></span>
<span class="line"><span>                begin</span></span>
<span class="line"><span>                    Message(&#39;Calculating inventory...&#39;);</span></span>
<span class="line"><span>                end;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            action(AdjustInventory)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;Adjust Inventory&#39;;</span></span>
<span class="line"><span>                ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                trigger OnAction()</span></span>
<span class="line"><span>                begin</span></span>
<span class="line"><span>                    Message(&#39;Adjusting inventory...&#39;);</span></span>
<span class="line"><span>                end;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The resulting structure looks something like this:</p><div class="language-text"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Actions</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   |-- Inventory</span></span>
<span class="line"><span>          |</span></span>
<span class="line"><span>          |-- Calculate Inventory</span></span>
<span class="line"><span>          |</span></span>
<span class="line"><span>          |-- Adjust Inventory</span></span></code></pre></div><p>When users open the Inventory menu, they can select either operation.</p><h3 id="nested-action-groups" tabindex="-1">Nested Action Groups <a class="header-anchor" href="#nested-action-groups" aria-label="Permalink to “Nested Action Groups”">​</a></h3><p>Action groups can also contain other action groups.</p><p>For example, suppose we want to organize our product-related operations into two categories:</p><ul><li>Inventory</li><li>Pricing</li></ul><p>Each category contains its own actions.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>actions</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Processing)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        group(ProductManagement)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Product Management&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            group(Inventory)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;Inventory&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                action(CalculateInventory)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    Caption = &#39;Calculate Inventory&#39;;</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            group(Pricing)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Caption = &#39;Pricing&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                action(UpdatePrice)</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    Caption = &#39;Update Price&#39;;</span></span>
<span class="line"><span>                    ApplicationArea = All;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This creates a hierarchical menu structure.</p><p><strong>Important distinction:</strong></p><ul><li><code>action</code> defines an individual operation.</li><li><code>group</code> organizes multiple actions into a menu or submenu.</li></ul><h2 id="what-can-an-action-do" tabindex="-1">What Can an Action Do? <a class="header-anchor" href="#what-can-an-action-do" aria-label="Permalink to “What Can an Action Do?”">​</a></h2><p>Actions are not limited to displaying messages. They can perform different operations depending on how they are configured.</p><p>Here are some common approaches.</p><h3 id="execute-al-code-using-onaction" tabindex="-1">Execute AL Code Using OnAction <a class="header-anchor" href="#execute-al-code-using-onaction" aria-label="Permalink to “Execute AL Code Using OnAction”">​</a></h3><p>You can execute custom AL code when a user selects an action.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>action(ShowMessage)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Caption = &#39;Show Message&#39;;</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    trigger OnAction()</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        Message(&#39;Hello from Business Central!&#39;);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This is useful when implementing custom business logic.</p><h3 id="open-another-page-using-runobject" tabindex="-1">Open Another Page Using RunObject <a class="header-anchor" href="#open-another-page-using-runobject" aria-label="Permalink to “Open Another Page Using RunObject”">​</a></h3><p>You can configure an action to open another page.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>action(ViewProducts)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Caption = &#39;View Customers&#39;;</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span>    RunObject = page &quot;Customer List&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>When selected, Business Central opens the <code>Customer List</code> page.</p><h3 id="run-a-report" tabindex="-1">Run a Report <a class="header-anchor" href="#run-a-report" aria-label="Permalink to “Run a Report”">​</a></h3><p>Actions can also execute reports.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>action(ProductReport)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Caption = &#39;Product Report&#39;;</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span>    RunObject = report ProductReport;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This is useful when users need to generate reports directly from a page.</p><h3 id="run-a-codeunit" tabindex="-1">Run a Codeunit <a class="header-anchor" href="#run-a-codeunit" aria-label="Permalink to “Run a Codeunit”">​</a></h3><p>You can also configure an action to execute a codeunit.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>action(ProcessProducts)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Caption = &#39;Process Products&#39;;</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span>    RunObject = codeunit ProductProcessor;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This is particularly useful when the operation involves reusable business logic implemented in a codeunit.</p><p><strong>Note:</strong> <code>RunObject</code> is a declarative way of specifying which object to run. You can also execute objects programmatically from an <code>OnAction</code> trigger when you need more control over the operation.</p><h2 id="promoted-actions" tabindex="-1">Promoted Actions <a class="header-anchor" href="#promoted-actions" aria-label="Permalink to “Promoted Actions”">​</a></h2><p>Sometimes, certain actions are more important or frequently used than others.</p><p>For example, on a Product List page, users might frequently need to:</p><ul><li>Create a new product.</li><li>Edit a product.</li><li>Delete a product.</li></ul><p>Rather than requiring users to navigate through menus every time, Business Central allows us to <strong>promote actions</strong> so they appear more prominently in the action bar.</p><p>These are called Promoted Actions.</p><p>In modern Business Central development, promoted actions are defined using the <code>actionref</code> syntax inside <code>area(Promoted)</code>.</p><p><strong>Example:</strong></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>actions</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    area(Processing)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        action(CalculateInventory)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Caption = &#39;Calculate Inventory&#39;;</span></span>
<span class="line"><span>            ApplicationArea = All;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            trigger OnAction()</span></span>
<span class="line"><span>            begin</span></span>
<span class="line"><span>                Message(&#39;Calculating inventory...&#39;);</span></span>
<span class="line"><span>            end;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    area(Promoted)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        actionref(CalculateInventoryRef; CalculateInventory)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Notice something important:</p><p>We define the actual action under <code>area(Processing)</code> and then reference it under <code>area(Promoted)</code>.</p><p>The <code>actionref</code> does not create another independent action. It references an existing action and makes it available in the promoted action area.</p><p><strong>Important:</strong> Older examples may use properties such as <code>Promoted</code> and <code>PromotedCategory</code>. These belong to the legacy promotion syntax. The recommended modern approach is <code>actionref</code>. <a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-promoted-actions" target="_blank" rel="noreferrer">Microsoft Learn</a></p><h2 id="common-action-properties" tabindex="-1">Common Action Properties <a class="header-anchor" href="#common-action-properties" aria-label="Permalink to “Common Action Properties”">​</a></h2><p>Actions support several properties that determine their appearance and behavior.</p><table tabindex="0"><thead><tr><th>Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Caption</code></td><td>Specifies the text displayed to the user.</td></tr><tr><td><code>ToolTip</code></td><td>Provides additional information about the action.</td></tr><tr><td><code>ApplicationArea</code></td><td>Determines where the action is available.</td></tr><tr><td><code>Image</code></td><td>Specifies the icon displayed alongside the action.</td></tr><tr><td><code>Enabled</code></td><td>Determines whether the action can be interacted with.</td></tr><tr><td><code>Visible</code></td><td>Determines whether the action is displayed.</td></tr><tr><td><code>RunObject</code></td><td>Specifies an object to execute when the action is selected.</td></tr><tr><td><code>RunPageMode</code></td><td>Specifies how a page opened through <code>RunObject</code> should be displayed.</td></tr><tr><td><code>Promoted</code></td><td>Legacy property for promoting actions.</td></tr></tbody></table><p>Example:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>action(DeleteProduct)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Caption = &#39;Delete Product&#39;;</span></span>
<span class="line"><span>    ToolTip = &#39;Deletes the selected product.&#39;;</span></span>
<span class="line"><span>    ApplicationArea = All;</span></span>
<span class="line"><span>    Image = Delete;</span></span>
<span class="line"><span>    Enabled = true;</span></span>
<span class="line"><span>    Visible = true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>These properties allow us to customize how users interact with actions.</p><h2 id="key-takeaways" tabindex="-1">Key Takeaways <a class="header-anchor" href="#key-takeaways" aria-label="Permalink to “Key Takeaways”">​</a></h2><ul><li>Actions provide interactive functionality on Business Central pages.</li><li>Actions are declared inside the <code>actions</code> section of a page object.</li><li><code>action</code> defines an individual operation.</li><li><code>group</code> organizes related actions into menus and submenus.</li><li><code>OnAction()</code> executes AL code when an action is selected.</li><li><code>RunObject</code> allows actions to open pages, run reports, or execute codeunits.</li><li>Action areas determine where actions appear in the action bar.</li><li>Promoted actions provide quicker access to frequently used operations.</li><li>Modern action promotion uses <code>actionref</code>.</li></ul><h2 id="further-reading" tabindex="-1">Further Reading <a class="header-anchor" href="#further-reading" aria-label="Permalink to “Further Reading”">​</a></h2><ol><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-actions-overview" target="_blank" rel="noreferrer">Microsoft Learn – Actions Overview</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-adding-actions-to-a-page" target="_blank" rel="noreferrer">Microsoft Learn – Adding Actions to a Page</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-promoted-actions" target="_blank" rel="noreferrer">Microsoft Learn – Promoted Actions</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-common-promoted-action-groups" target="_blank" rel="noreferrer">Microsoft Learn – Common Promoted Action Groups</a></li></ol><hr><h2 id="practical-exercise" tabindex="-1">Practical Exercise <a class="header-anchor" href="#practical-exercise" aria-label="Permalink to “Practical Exercise”">​</a></h2><p>Let&#39;s put these concepts into practice using your existing <code>Product</code> table.</p><p>On your <code>ProductList</code> page, implement the following:</p><p><strong>1. Product Management group</strong></p><p>Create an action group containing:</p><ul><li><code>Show Product Details</code>: Displays the selected product&#39;s name using <code>Message()</code>.</li><li><code>Delete Product</code>: Deletes the selected product.</li></ul><p><strong>2. Inventory group</strong></p><p>Create another action group containing:</p><ul><li><code>View Inventory</code>: Displays the selected product&#39;s inventory quantity.</li><li><code>Calculate Inventory</code>: Displays a message indicating that inventory calculation has started.</li></ul><p><strong>3. Promoted Action</strong></p><p>Promote the <code>Calculate Inventory</code> action using <code>actionref</code>.</p><p>Publish your extension and test the actions from Business Central.</p><p><em>Hint:</em> You can use <code>Rec.Delete(true)</code> to delete the current record, but be careful when testing this action. It permanently deletes the selected record unless your environment provides a way to restore it.</p>`,109)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};