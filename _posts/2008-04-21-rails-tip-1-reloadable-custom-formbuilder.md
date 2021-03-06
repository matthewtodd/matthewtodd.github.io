---
title: "Rails tip #1: Reloadable custom FormBuilder"
layout: post
---
August Lilleaas has <a href="http://august.lilleaas.net/posts/form-builders-are-easy">a nice writeup</a> on making your own <code>FormBuilder</code>. Towards the end, he describes wiring it up as the default:

> Create a new file called <code>config/initializers/setup.rb</code>. Or, if you're on pre-2.0, add it to the bottom of <code>config/environment.rb</code>:
>
> ```ruby
> ActionView::Base.default_form_builder = LabellingFormBuilder
> ```

Though "proper," this approach requires restarting the server to see changes in <code>LabellingFormBuilder</code>.

You can avoid restarting the server by doing this instead:

```ruby
class ActionView::Base
  def self.default_form_builder
    LabellingFormBuilder
  end
end
```

It's a subtle difference, but it provides a nice window into understanding the <code>Dependencies</code> mechanism:

In August's version, <a href="http://github.com/rails/rails/tree/f757f5838818ce35f7927a10a8cda6f9583869c5/activesupport/lib/active_support/dependencies.rb#L446"><code>const_missing</code></a> loads the <code>LabellingFormBuilder</code> class only once, when the initializer is run.

In our version, we've tricked <code>const_missing</code> into running on each request by <em>not holding onto the class it loads</em>. That is, instead of caching the class lookup in <code>@@default_form_builder</code>, we're allowing the lookup to be performed on demand.

Sweet.

<h2>5 Rails tips</h2>

Each day this week, <a href="http://youtube.com/watch?v=J35CuC3ywnc">Joachim</a> and I will post something we've learned in our time programming together. It's fun to do, and we might just <a href="http://railscasts.com/contest">win something</a> as well.
