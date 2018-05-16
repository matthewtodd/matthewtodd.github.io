---
title: Rake::StakeoutTask
layout: post
---
I've been writing a bunch of rdoc lately, and <span title="Save">&#x2318;S</span>/<span title="Run Rake Task">&#x2303;&#x21e7;R</span>/<span title="Select default rerdoc task from last time">&#x21a9;</span>/<span title="Close RakeMate window">&#x2318;W</span>/<span title="Switch to Safari">&#x2318;&#x21e5;</span>/<span title="Reload Page">&#x2318;R</span> was starting to get pretty cumbersome. (That's <code>rake rerdoc</code> from TextMate, close the output window, switch to Safari and reload.)

So, I remembered and downloaded Mike Clark's <a href="http://www.pragmaticautomation.com/cgi-bin/pragauto.cgi/Monitor/StakingOutFileChanges.rdoc"><code>stakeout.rb</code></a>, and now I'm down to <span title="Save">&#x2318;S</span>/<span title="Switch to Safari">&#x2318;&#x21e5;</span>/<span title="Reload Page">&#x2318;R</span>---not bad!

Except I was a little troubled by the packaging, so I threw together a <a href="http://matthewtodd.org/svn/public/rake-stakeout/lib/rake/stakeouttask.rb">new RubyGem</a>, adding in <a href="http://www.growl.info">Growl</a> support along the way:

<a href="http://www.flickr.com/photos/mtodd/482514518/" title="Photo Sharing"><img src="http://farm1.static.flickr.com/193/482514518_e0c39cb1a2.jpg" width="500" height="375" alt="Rake::StakeoutTask" style="border: 1px solid #ccc;" /></a>

Think of it as a poor-man's <a href="http://www.zenspider.com/ZSS/Products/ZenTest/"><code>autotest</code></a>, without being <a href="http://zentest.rubyforge.org/ZenTest/classes/Autotest.html">tied to testing</a>.

<h2>Installation and Usage</h2>
{% highlight bash %}
svn co http://matthewtodd.org/svn/public/rake-stakeout
cd rake-stakeout
rake gem
sudo gem install pkg/*.gem
{% endhighlight %}

{% highlight ruby %}
require 'rake/stakeouttask'

Rake::StakeoutTask.new(:stakeout_rdoc) do |stakeout|
  stakeout.stakeout_files = FileList['README', 'lib/**/*.rb']
  stakeout.stakeout_task = :rerdoc
  stakeout.notification_method = :growl
end
{% endhighlight %}

{% highlight bash %}
rake stakeout_rdoc
{% endhighlight %}

Have fun! I'd love to hear if you decide to give this a try.
