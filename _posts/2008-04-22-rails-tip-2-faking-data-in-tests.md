---
title: "Rails tip #2: Faking DATA in tests"
layout: post
---
<p>Ruby gives you access to the raw text after an <code>__END__</code> statement in the currently running file through the <code>DATA</code> <code>IO</code> object.</p>

<p>Sometimes you'd like to use <code>DATA</code> in a test. You'll find it works when you run the test individually but then fails when you run the whole suite. (Remember <code>DATA</code> comes from <code>$0</code>, the currently running file, only.)</p>

<p>We've found <a href="http://codeforpeople.rubyforge.org/svn/rubyforge/tags/0.4.5/lib/rubyforge.rb">a nice way to fake it</a> in the rubyforge gem: <code>read</code> <code>__FILE__</code> instead, then <code>split</code> the results.</p>

<p>Here's an example of the technique in use, functionally testing a wiki parser we've been tinkering with. It can often be <a href="http://blog.jayfields.com/2008/03/testing-anti-pattern-metaprogrammed.html">painful to work with metaprogrammed tests</a> like this, but on balance, we like the results here:</p>

```ruby
require 'test_helper'

class TestParser < Test::Unit::TestCase
  EXAMPLES = /={80}\n/m
  PARTS    = /-{80}\n/m

  # Faking data = DATA.read
  data = File.read(__FILE__).split('__END__').last

  data.split(EXAMPLES).map { |example| example.split(PARTS) }.each do |comment, markup, html|
    define_method "test_#{comment.strip.downcase.gsub(/\W/, '_')}" do
      assert_equal html, Parser.new.parse(markup).result.to_html
    end
  end
end

__END__
A single wiki word should be linked and wrapped in a paragraph.
--------------------------------------------------------------------------------
WikiWord
--------------------------------------------------------------------------------
<p><a href="WikiWord">WikiWord</a></p>
================================================================================
Two wiki words on separate lines should become two paragraphs
--------------------------------------------------------------------------------
WikiWord
WikiWord
--------------------------------------------------------------------------------
<p><a href="WikiWord">WikiWord</a></p>
<p><a href="WikiWord">WikiWord</a></p>

```

<h2>5 Rails tips</h2>

<p>Each day this week, <a href="http://youtube.com/watch?v=J35CuC3ywnc">Joachim</a> and I will post something we've learned in our time programming together. It's fun to do, and we might just <a href="http://railscasts.com/contest">win something</a> as well.</p>

<p>So far, we've written:</p>

<ol>
  <li><a href="/2008/04/21/rails-tip-1-reloadable-custom-formbuilder.html">Reloadable custom FormBuilder</a></li>
  <li>Faking DATA in tests</li>
</ol>
