---
title: Unix geek bathes in warm water
layout: post
---
So I don't burden my poor brain trying to remember stuff, I've rigged up some <tt>crontab</tt> entries that fire off <a href="http://www.growl.info/">Growl</a> reminder messages every so often:

<a href="http://www.flickr.com/photos/mtodd/479524562/" title="Photo Sharing"><img src="http://farm1.static.flickr.com/183/479524562_f8ac6d4183.jpg" width="500" height="375" alt="Lest I Forget" /></a>

Arguably, I could have just put a bunch of event reminders in iCal, but it's nice to avoid cluttering the calendar and I like the way these Growl notifications look. :)

<h2><tt>crontab</tt></h2>

The <tt><a href="http://en.wikipedia.org/wiki/Crontab">crontab</a></tt> file is an old-school unixy configuration file on the Mac (and many other platforms) that expresses a schedule of recurring tasks.

For what it's worth, here's mine:

{% highlight bash %}
15 10,14 * * 1-5  /usr/local/bin/remind 'Take a minute to pray for Valerie and our marriage.'
0  16    * * 1-5  /usr/local/bin/remind 'Open the gate for Valerie if she honks.'
30 16    * * 1-5  /usr/local/bin/remind 'Now would be a great time to turn on the water heater.'
{% endhighlight %}

(The schedule information is a little cryptic---the last line makes sure I turn on the water heater every weekday (1-5) at 4:30pm.)

<h2><tt>remind</tt></h2>

Here's the <tt>remind</tt> script, just a simple wrapper around <tt><a href="http://www.growl.info/documentation/growlnotify.php">growlnotify</a></tt>:

{% highlight bash %}
#!/bin/sh
/opt/local/bin/growlnotify     \
  --appIcon iCal               \
  --message "$*"               \
  --sticky                     \
  --title 'Just a reminder'
{% endhighlight %}
