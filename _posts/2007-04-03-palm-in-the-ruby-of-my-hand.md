---
title: Palm in the Ruby of my hand
layout: post
---
Today I've been playing with <a href="http://www.pilot-link.org/pilot-link">pilot-link</a> and <a href="http://rubyinline.rubyforge.org/">RubyInline</a>.

Holy crap, this is fun stuff!

```ruby
Palm.connect do |handheld|
  handheld.open_database('ToDoDB') do |todo_list|
    assert_equal ['Unfiled'], todo_list.categories
  end
end
```

More coming in <a href="http://matthewtodd.org/svn/public/palm/">subversion</a> through the week.

<p class="update"><strong>Update:</strong> changed subversion location.</p>
