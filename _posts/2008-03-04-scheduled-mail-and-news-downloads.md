---
title: Scheduled Mail and News Downloads
layout: post
---
Turning off automatic downloading in Mail and NetNewsWire has been good for me: I've had fewer interruptions and freer bandwidth during the workday.

But this does mean that I have to check them manually every morning, which is cumbersome since I can't refresh both at the same time if I want to avoid timeout errors. (C'est la internet connection.)

So, in the interest of <a href="http://www.netropolis.org/hash/perl/virtue.html">laziness</a>, I've just added a couple of delightfully short <code>crontab</code> entries, hoping they'll save me some time in the morning:

```
 5  7 * * * osascript -e 'tell application "Mail" to check for new mail'
10  7 * * * osascript -e 'tell application "NetNewsWire" to refreshAll'
```
