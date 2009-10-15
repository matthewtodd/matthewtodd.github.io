---
title: Too much fun
layout: post
---
{% highlight ruby %}
# ~/.autotest
Autotest.add_hook(:red)      { `say oops` }
Autotest.add_hook(:green)    { `say ok` }
Autotest.add_hook(:all_good) { `say sweet` }
{% endhighlight %}