---
title: "Rails tip #5: Atom param parser"
layout: post
---
<p>The Atom Publishing Protocol is wonderfully RESTful, so it's a natural fit for a Rails application.</p>

<p>One thing you'll run into, though, is that AtomPub posts <code>application/atom+xml</code> data rather than the usual <code>application/x-www-form-urlencoded</code> stuff, so you'll have to write some extra code to handle it.</p>

<p>The good news is that <code>ActionController::Base</code> helps you out. Instead of having to branch on the request type and fatten your controller, you can <a href="http://github.com/rails/rails/tree/c8da518bbfedc2a06b1d96912ddae00e57f21748/actionpack/lib/action_controller/base.rb#L292">register a custom <code>param_parser</code></a>.</p>

<p>So, we wrote <code>Hash.from_atom</code> to transform the incoming xml into the usual <code>{&nbsp;:entry&nbsp;=> {&nbsp;...&nbsp;}&nbsp;}</code> params. Then, we registered it in an initializer:</p>

```ruby
ActionController::Base.param_parsers[Mime::ATOM] = lambda do |body|
  Hash.from_atom(body)
end
```

<p>And our controller can now handle either regular form postings or AtomPub entries with the same line of code:</p>

```ruby
class EntriesController < ApplicationController
  def create
    @entry = @collection.entries.build(params[:entry])
    # ...
  end
end
```

<p>Not bad.</p>

<h2>5 Rails tips</h2>

<p>Each day this week, <a href="http://youtube.com/watch?v=J35CuC3ywnc">Joachim</a> and I will post something we've learned in our time programming together. It's fun to do, and we might just <a href="http://railscasts.com/contest">win something</a> as well.</p>

<p>So far, we've written:</p>

<ol>
  <li><a href="/2008/04/21/rails-tip-1-reloadable-custom-formbuilder.html">Reloadable custom FormBuilder</a></li>
  <li><a href="/2008/04/22/rails-tip-2-faking-data-in-tests.html">Faking DATA in tests</a></li>
  <li><a href="/2008/04/23/rails-tip-3-filter-blobs-from-activerecord-logging.html">Filter BLOBs from ActiveRecord logging</a></li>
  <li><a href="/2008/04/24/rails-tip-4-writing-capistrano-recipes-to-be-loaded-from-gems.html">Writing Capistrano recipes to be loaded from gems</a></li>
  <li>Atom param parser</li>
</ol>
