import{U as e,W as t,nt as n,t as r}from"./chunks/framework.CPHJXLir.js";var i=JSON.parse(`{"title":"Control Flow","description":"","frontmatter":{},"headers":[],"relativePath":"variables-data-types-operators-and-control-flow/control-flow.md","filePath":"variables-data-types-operators-and-control-flow/control-flow.md"}`),a={name:`variables-data-types-operators-and-control-flow/control-flow.md`};function o(r,i,a,o,s,c){return n(),e(`div`,null,[...i[0]||=[t(`<h1 id="control-flow" tabindex="-1">Control Flow <a class="header-anchor" href="#control-flow" aria-label="Permalink to “Control Flow”">​</a></h1><p><strong>Control flow</strong> determines the order in which statements execute in a program.</p><p>By default, AL executes statements sequentially, from top to bottom. Control-flow statements let us make decisions, repeat operations, and interrupt execution when necessary.</p><h2 id="if-then-and-else" tabindex="-1"><code>if</code>, <code>then</code>, and <code>else</code> <a class="header-anchor" href="#if-then-and-else" aria-label="Permalink to “if, then, and else”">​</a></h2><p>The <code>if</code> statement executes code conditionally, depending on whether a Boolean expression evaluates to <code>true</code> or <code>false</code>.</p><h3 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to “Syntax”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>if Condition then</span></span>
<span class="line"><span>    Statement;</span></span></code></pre></div><p>When multiple statements need to execute, use a <code>begin ... end</code> block.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>if Condition then begin</span></span>
<span class="line"><span>    Statement1;</span></span>
<span class="line"><span>    Statement2;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>An <code>else</code> clause specifies what happens when the condition is false.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>if Condition then</span></span>
<span class="line"><span>    Statement1</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    Statement2;</span></span></code></pre></div><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to “Example”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Stock: Integer;</span></span>
<span class="line"><span>        OrderAmount: Integer;</span></span>
<span class="line"><span>        IsAvailable: Boolean;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        Stock := 200;</span></span>
<span class="line"><span>        OrderAmount := 55;</span></span>
<span class="line"><span>        IsAvailable := true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (Stock &gt;= OrderAmount) and IsAvailable then begin</span></span>
<span class="line"><span>            Stock := Stock - OrderAmount;</span></span>
<span class="line"><span>            Message(&#39;Order placed&#39;);</span></span>
<span class="line"><span>            Message(&#39;%1 items remaining in stock&#39;, Stock);</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>        else begin</span></span>
<span class="line"><span>            Message(&#39;Unable to place order&#39;);</span></span>
<span class="line"><span>            Message(&#39;This could be due to unavalability or low stock&#39;);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Explanation:</strong></p><ul><li>If <code>(Stock &gt;= OrderAmount) and IsAvailable</code> evaluates to <code>true</code>, the if part executes.</li><li>Otherwise, the <code>else</code> branch executes.</li></ul><div class="info custom-block"><p class="custom-block-title custom-block-title-default">INFO</p><p>Do not place a semicolon immediately before <code>else</code>. The semicolon would terminate the <code>if</code> statement prematurely.</p></div><h2 id="else-if-statements" tabindex="-1"><code>else if</code> Statements <a class="header-anchor" href="#else-if-statements" aria-label="Permalink to “else if Statements”">​</a></h2><p>Use <code>else if</code> to check additional conditions when the preceding <code>if</code> or <code>else if</code> condition is <code>false</code>.</p><p><strong>Syntax:</strong></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>if Condition1 then begin</span></span>
<span class="line"><span>    // Runs if Condition1 is true</span></span>
<span class="line"><span>end else if Condition2 then begin</span></span>
<span class="line"><span>    // Runs if Condition1 is false and Condition2 is true</span></span>
<span class="line"><span>end else begin</span></span>
<span class="line"><span>    // Runs if all preceding conditions are false</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>Example:</strong></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>trigger OnOpenPage()</span></span>
<span class="line"><span>var</span></span>
<span class="line"><span>    Stock: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Stock := 25;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if Stock &gt; 100 then begin</span></span>
<span class="line"><span>        Message(&#39;Stock is sufficient&#39;);</span></span>
<span class="line"><span>    end else if Stock &gt; 0 then begin</span></span>
<span class="line"><span>        Message(&#39;Stock is running low&#39;);</span></span>
<span class="line"><span>    end else begin</span></span>
<span class="line"><span>        Message(&#39;Out of stock&#39;);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>Key points:</strong></p><ul><li>You can chain multiple <code>else if</code> conditions.</li><li>Conditions are evaluated from top to bottom. The first condition that evaluates to <code>true</code> determines which branch executes.</li><li>The final <code>else</code> is optional and executes when all preceding conditions are <code>false</code>.</li><li><strong>Do not place a semicolon before <code>else if</code> or <code>else</code>.</strong> Write <code>end else if</code>, not <code>end; else if</code>.</li></ul><h2 id="the-case-statement" tabindex="-1">The <code>case</code> Statement <a class="header-anchor" href="#the-case-statement" aria-label="Permalink to “The case Statement”">​</a></h2><p>A <code>case</code> statement selects an action based on the value of an expression. It is useful when there are several possible alternatives.</p><h3 id="syntax-1" tabindex="-1">Syntax <a class="header-anchor" href="#syntax-1" aria-label="Permalink to “Syntax”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>case Expression of</span></span>
<span class="line"><span>    Value1:</span></span>
<span class="line"><span>        Statement1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Value2:</span></span>
<span class="line"><span>        Statement2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        DefaultStatement;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>The <code>else</code> branch is optional. If no value matches and there is no <code>else</code>, nothing happens.</p><h3 id="example-1" tabindex="-1">Example <a class="header-anchor" href="#example-1" aria-label="Permalink to “Example”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        OrderStatus: Integer;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        OrderStatus := 2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        case OrderStatus of</span></span>
<span class="line"><span>            1:</span></span>
<span class="line"><span>                begin</span></span>
<span class="line"><span>                    // Wrap multiple statements with begin and end</span></span>
<span class="line"><span>                    Message(&#39;Order is pending&#39;);</span></span>
<span class="line"><span>                    Message(&#39;Will start processing soon&#39;);</span></span>
<span class="line"><span>                end;</span></span>
<span class="line"><span>            2:</span></span>
<span class="line"><span>                // Single statements don&#39;t need a begin and end</span></span>
<span class="line"><span>                Message(&#39;Order is confirmed&#39;);</span></span>
<span class="line"><span>            3:</span></span>
<span class="line"><span>                Message(&#39;Order is shipping&#39;);</span></span>
<span class="line"><span>            4:</span></span>
<span class="line"><span>                Message(&#39;Order is delivered&#39;);</span></span>
<span class="line"><span>            else</span></span>
<span class="line"><span>                Message(&#39;Unknown order status&#39;);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Explanation:</strong></p><p>AL evaluates <code>OrderStatus</code> and executes the statement associated with the matching value. Since its value is <code>2</code>, the confirmation message appears.</p><p>Multiple values can share the same action:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>case OrderStatus of</span></span>
<span class="line"><span>    1, 2:</span></span>
<span class="line"><span>        Message(&#39;Order is being processed.&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    3:</span></span>
<span class="line"><span>        Message(&#39;Order is shipped.&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>You can also specify ranges using <code>..</code>:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        StockQuantity: Integer;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        StockQuantity := 77;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        case StockQuantity of</span></span>
<span class="line"><span>            1 .. 10:</span></span>
<span class="line"><span>                Message(&#39;Very Low Quantity&#39;);</span></span>
<span class="line"><span>            11 .. 20:</span></span>
<span class="line"><span>                Message(&#39;Low Quantity&#39;);</span></span>
<span class="line"><span>            21 .. 50:</span></span>
<span class="line"><span>                Message(&#39;Medium Quantity&#39;);</span></span>
<span class="line"><span>            50 .. 100:</span></span>
<span class="line"><span>                Message(&#39;High Quantity&#39;);</span></span>
<span class="line"><span>        // Notice we don&#39;t need else part</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>When to use which?</strong></p><ul><li>Use <code>if</code> when evaluating conditions, especially comparisons and combinations of conditions.</li><li>Use <code>case</code> when selecting between multiple possible values of one expression.</li></ul><h2 id="the-for-loop" tabindex="-1">The <code>for</code> Loop <a class="header-anchor" href="#the-for-loop" aria-label="Permalink to “The for Loop”">​</a></h2><p>A <code>for</code> loop repeats a statement for a specified range of values.</p><h3 id="syntax-2" tabindex="-1">Syntax <a class="header-anchor" href="#syntax-2" aria-label="Permalink to “Syntax”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>for Counter := StartValue to EndValue do</span></span>
<span class="line"><span>    Statement;</span></span></code></pre></div><p>The loop counter increases by one after each iteration.</p><h3 id="example-2" tabindex="-1">Example <a class="header-anchor" href="#example-2" aria-label="Permalink to “Example”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Counter: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    for Counter := 1 to 5 do</span></span>
<span class="line"><span>        Message(&#39;Iteration: %1&#39;, Counter);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p>This displays five messages, with counter values from <code>1</code> through <code>5</code>.</p><p>Use <code>downto</code> to count backwards:</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>for Counter := 5 downto 1 do</span></span>
<span class="line"><span>    Message(&#39;Countdown: %1&#39;, Counter);</span></span></code></pre></div><p>This counts from <code>5</code> down to <code>1</code>.</p><p>Enclose multiple statement with <code>begin</code> and <code>end</code></p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Counter: Integer;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        for Counter := 5 downto 1 do begin</span></span>
<span class="line"><span>            Message(&#39;Iteration %1&#39;, Counter);</span></span>
<span class="line"><span>            Message(&#39;Loops are awesome&#39;);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Important points:</strong></p><ul><li>The starting and ending values are inclusive.</li><li>If the starting value is already beyond the ending value for a <code>to</code> loop, the loop body does not execute.</li><li>Avoid modifying the loop counter inside the loop; AL documentation warns that doing so can produce unpredictable behavior.</li><li>The loop counter&#39;s value is undefined outside the <code>for</code> loop&#39;s scope.</li></ul><p><strong>When to use it:</strong> When you know the range of values you want to iterate over.</p><h2 id="the-while-loop" tabindex="-1">The <code>while</code> Loop <a class="header-anchor" href="#the-while-loop" aria-label="Permalink to “The while Loop”">​</a></h2><p>A <code>while</code> loop repeats a statement as long as its condition evaluates to <code>true</code>.</p><h3 id="syntax-3" tabindex="-1">Syntax <a class="header-anchor" href="#syntax-3" aria-label="Permalink to “Syntax”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>while Condition do</span></span>
<span class="line"><span>    Statement;</span></span></code></pre></div><h3 id="example-3" tabindex="-1">Example <a class="header-anchor" href="#example-3" aria-label="Permalink to “Example”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Counter: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Counter := 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while Counter &lt;= 5 do begin</span></span>
<span class="line"><span>        Message(&#39;Iteration: %1&#39;, Counter);</span></span>
<span class="line"><span>        Counter := Counter + 1;</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>Explanation:</strong></p><ol><li><code>Counter</code> starts at <code>1</code>.</li><li>AL checks whether <code>Counter &lt;= 5</code>.</li><li>If true, the message is displayed and the counter increases.</li><li>The condition is checked again.</li><li>When the counter reaches <code>6</code>, the condition becomes false and the loop ends.</li></ol><p><strong>Important:</strong> The condition is checked before each iteration. If it is false initially, the loop body never executes.</p><p>Always ensure that something eventually makes the condition false; otherwise, you may create an infinite loop.</p><p><strong>When to use it:</strong> When repetition depends on a condition rather than a predetermined number of iterations.</p><h2 id="_5-the-repeat-until-loop" tabindex="-1">5. The <code>repeat ... until</code> Loop <a class="header-anchor" href="#_5-the-repeat-until-loop" aria-label="Permalink to “5. The repeat ... until Loop”">​</a></h2><p>A <code>repeat ... until</code> loop repeats its statements until its condition becomes <code>true</code>.</p><h3 id="syntax-4" tabindex="-1">Syntax <a class="header-anchor" href="#syntax-4" aria-label="Permalink to “Syntax”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>repeat</span></span>
<span class="line"><span>    Statements;</span></span>
<span class="line"><span>until Condition;</span></span></code></pre></div><h3 id="example-4" tabindex="-1">Example <a class="header-anchor" href="#example-4" aria-label="Permalink to “Example”">​</a></h3><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Counter: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Counter := 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    repeat</span></span>
<span class="line"><span>        Message(&#39;Iteration: %1&#39;, Counter);</span></span>
<span class="line"><span>        Counter := Counter + 1;</span></span>
<span class="line"><span>    until Counter &gt; 5;</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>Explanation:</strong></p><p>The loop displays values from <code>1</code> through <code>5</code>. Once the counter reaches <code>6</code>, the condition becomes true and the loop ends.</p><h2 id="break-and-exit" tabindex="-1"><code>break</code> and <code>exit</code> <a class="header-anchor" href="#break-and-exit" aria-label="Permalink to “break and exit”">​</a></h2><p>Both statements interrupt execution, but they do different things.</p><h3 id="break" tabindex="-1"><code>break</code> <a class="header-anchor" href="#break" aria-label="Permalink to “break”">​</a></h3><p>The <code>break</code> statement immediately terminates the loop in which it appears. Execution then continues with the statement following that loop.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Counter: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    for Counter := 1 to 10 do begin</span></span>
<span class="line"><span>        if Counter = 4 then</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Message(&#39;Counter: %1&#39;, Counter);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;Loop finished.&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>What happens?</strong></p><ul><li>Messages appear for <code>1</code>, <code>2</code>, and <code>3</code>.</li><li>When the counter reaches <code>4</code>, <code>break</code> terminates the loop.</li><li>The message <code>Loop finished.</code> then appears.</li></ul><p>Notice that <code>Counter: 4</code> is never displayed because <code>break</code> executes before the message.</p><h3 id="exit" tabindex="-1"><code>exit</code> <a class="header-anchor" href="#exit" aria-label="Permalink to “exit”">​</a></h3><p>The <code>exit</code> statement terminates the current AL trigger or procedure immediately. If used inside a loop, it does not merely terminate the loop; it exits the surrounding trigger or procedure as well.</p><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>var</span></span>
<span class="line"><span>    Quantity: Integer;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    Quantity := 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if Quantity &lt;= 0 then begin</span></span>
<span class="line"><span>        Message(&#39;Quantity must be greater than zero.&#39;);</span></span>
<span class="line"><span>        exit;</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Message(&#39;Quantity accepted.&#39;);</span></span>
<span class="line"><span>end;</span></span></code></pre></div><p><strong>What happens?</strong></p><p>The first message appears, and <code>exit</code> ends the trigger. The <code>Quantity accepted.</code> message is never displayed.</p><p>If you change <code>Quantity</code> to <code>5</code>, execution continues and the acceptance message appears.</p><h3 id="key-difference" tabindex="-1">Key difference <a class="header-anchor" href="#key-difference" aria-label="Permalink to “Key difference”">​</a></h3><table tabindex="0"><thead><tr><th>Statement</th><th>Effect</th></tr></thead><tbody><tr><td><code>break</code></td><td>Exits the current loop.</td></tr><tr><td><code>exit</code></td><td>Exits the current trigger or procedure.</td></tr></tbody></table><p><strong>Additional detail:</strong> AL also supports <code>exit(Value)</code> in procedures that return a value. It exits the procedure and returns the specified value. You cannot use a return value with <code>exit</code> in a system-defined trigger such as <code>OnOpenPage()</code>.</p><h2 id="practical-example-try-control-flow-in-business-central" tabindex="-1">Practical Example: Try Control Flow in Business Central <a class="header-anchor" href="#practical-example-try-control-flow-in-business-central" aria-label="Permalink to “Practical Example: Try Control Flow in Business Central”">​</a></h2><div class="language-al"><button title="Copy code" data-copied="Copied" class="copy"></button><span class="lang">al</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>namespace HelloWorld;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using Microsoft.Sales.Customer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pageextension 50100 CustomerListExt extends &quot;Customer List&quot;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    trigger OnOpenPage()</span></span>
<span class="line"><span>    var</span></span>
<span class="line"><span>        Quantity: Integer;</span></span>
<span class="line"><span>        Counter: Integer;</span></span>
<span class="line"><span>        OrderStatus: Integer;</span></span>
<span class="line"><span>    begin</span></span>
<span class="line"><span>        // IF / ELSE</span></span>
<span class="line"><span>        Quantity := 15;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if Quantity &gt;= 10 then</span></span>
<span class="line"><span>            Message(&#39;Bulk order&#39;)</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            Message(&#39;Regular order&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // CASE</span></span>
<span class="line"><span>        OrderStatus := 2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        case OrderStatus of</span></span>
<span class="line"><span>            1:</span></span>
<span class="line"><span>                Message(&#39;Order is pending.&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            2:</span></span>
<span class="line"><span>                Message(&#39;Order is confirmed.&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            3:</span></span>
<span class="line"><span>                Message(&#39;Order is shipped.&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            else</span></span>
<span class="line"><span>                Message(&#39;Unknown order status.&#39;);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // FOR</span></span>
<span class="line"><span>        for Counter := 1 to 3 do</span></span>
<span class="line"><span>            Message(&#39;For loop: %1&#39;, Counter);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // WHILE</span></span>
<span class="line"><span>        Counter := 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        while Counter &lt;= 3 do begin</span></span>
<span class="line"><span>            Message(&#39;While loop: %1&#39;, Counter);</span></span>
<span class="line"><span>            Counter := Counter + 1;</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // REPEAT ... UNTIL</span></span>
<span class="line"><span>        Counter := 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        repeat</span></span>
<span class="line"><span>            Message(&#39;Repeat loop: %1&#39;, Counter);</span></span>
<span class="line"><span>            Counter := Counter + 1;</span></span>
<span class="line"><span>        until Counter &gt; 3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // BREAK</span></span>
<span class="line"><span>        for Counter := 1 to 5 do begin</span></span>
<span class="line"><span>            if Counter = 3 then</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            Message(&#39;Break demonstration: %1&#39;, Counter);</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Message(&#39;Execution continues after break.&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // EXIT</span></span>
<span class="line"><span>        if Quantity &lt;= 0 then begin</span></span>
<span class="line"><span>            Message(&#39;Invalid quantity.&#39;);</span></span>
<span class="line"><span>            exit;</span></span>
<span class="line"><span>        end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Message(&#39;Execution continues after the exit check.&#39;);</span></span>
<span class="line"><span>    end;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="what-to-observe" tabindex="-1">What to observe <a class="header-anchor" href="#what-to-observe" aria-label="Permalink to “What to observe”">​</a></h3><p>When you open the Customer List page, the example demonstrates each control structure in sequence.</p><ul><li><code>if</code> selects between two messages.</li><li><code>case</code> selects the message associated with the order status.</li><li><code>for</code>, <code>while</code>, and <code>repeat ... until</code> each display three iterations.</li><li><code>break</code> stops the loop when the counter reaches <code>3</code>.</li><li>The statement after the <code>break</code> loop still executes.</li><li>Because <code>Quantity</code> is <code>15</code>, the <code>exit</code> condition is false, so the final message appears.</li></ul><p>To see <code>exit</code> terminate the trigger, change <code>Quantity := 15</code> to <code>Quantity := 0</code>. The trigger will display <code>Invalid quantity.</code> and stop before displaying the final message.</p><p><strong>Note:</strong> The example assumes object ID <code>50100</code> is available in your configured ID range. Use a different available ID if you&#39;ve already assigned it to another object in your extension.</p><h2 id="further-reading" tabindex="-1">Further Reading <a class="header-anchor" href="#further-reading" aria-label="Permalink to “Further Reading”">​</a></h2><ul><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-control-statements" target="_blank" rel="noreferrer">AL control statements — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-simple-statements" target="_blank" rel="noreferrer">AL simple statements — Microsoft Learn</a></li><li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-syntax" target="_blank" rel="noreferrer">AL syntax and snippets — Microsoft Learn</a></li></ul>`,100)]])}var s=r(a,[[`render`,o]]);export{i as __pageData,s as default};