---
title: "Rails tip #3: Filter BLOBs from ActiveRecord logging"
layout: post
---
<p>We threw <a href="http://github.com/technoweenie/attachment_fu"><code>attachment_fu</code></a> into our app the other day, starting off with the default <code>:db_file</code> setting to store images in the database. (I've been bitten by this approach before, but this time around I'm intrigued by page caching. We'll see.)</p>

<p>In the meantime, we've got blob after blob flying by in the <code>script/server</code> output, and it's messing up our <code>Terminal</code> fonts. No good.</p>

<p>Here's a quick fix, <code>config/initializers/filter_db_files_logging.rb</code>:</p>

```ruby
class ActiveRecord::ConnectionAdapters::AbstractAdapter
  def format_log_entry_with_db_files_filtering(message, dump = nil)
    dump = 'INSERT INTO db_files' if dump.to_s =~ /^INSERT INTO db_files/
    dump = 'UPDATE db_files'      if dump.to_s =~ /^UPDATE db_files/
    format_log_entry_without_db_files_filtering(message, dump)
  end

  alias_method_chain :format_log_entry, :db_files_filtering
end
```

<p>Note that this isn't yet a general solution (other tables' blobs will still be logged), but it's good enough for our needs, and we've got a known place we can come back to should we need to filter more blobs in the future.</p>

<p>Also, looking at <a href="http://github.com/rails/rails/tree/c8da518bbfedc2a06b1d96912ddae00e57f21748/activerecord/lib/active_record/connection_adapters/abstract_adapter.rb#L120"><code>AbstractAdapter#log_info</code></a> just now, we notice that could have written our own <code>Logger</code> and saved the monkeypatch. Maybe we'll look into doing that some day.</p>

<h2>5 Rails tips</h2>

<p>Each day this week, <a href="http://youtube.com/watch?v=J35CuC3ywnc">Joachim</a> and I will post something we've learned in our time programming together. It's fun to do, and we might just <a href="http://railscasts.com/contest">win something</a> as well.</p>

<p>So far, we've written:</p>

<ol>
  <li><a href="/2008/04/21/rails-tip-1-reloadable-custom-formbuilder.html">Reloadable custom FormBuilder</a></li>
  <li><a href="/2008/04/22/rails-tip-2-faking-data-in-tests.html">Faking DATA in tests</a></li>
  <li>Filter BLOBs from ActiveRecord logging</li>
</ol>
