---
title: Preventing Commits with Unadded Files
layout: post
---
<p class="update"><strong>Update, 17 April 2009:</strong> doh lives <a href="/2008/04/09/doh-021.html">as a gem</a> <a href="http://github.com/matthewtodd/doh">on github</a> now.</p>

Today I added a new file to an in-progress Rails app, watched all the tests pass, and committed. Except I forgot to <code>svn add</code> the new file. <strong>Again.</strong>

Doh.

<h2>Never Again</h2>

Subversion should <em>prevent me from checking in</em> if I've got unadded files in a project, right?

But looking through the <a href="http://svnbook.red-bean.com">Subversion book</a> and <code>man</code> pages, I couldn't find how to make it so. (<a href="http://svnbook.red-bean.com/nightly/en/svn.ref.reposhooks.pre-commit.html">Pre-commit hooks</a> run on the repository side, so they don't have access to your working copy.)

So, I've written a short Ruby script to help.

<h2>Introducing Doh</h2>

Whenever you <code>svn ci</code> with unadded files lying around, <code>doh</code> stops your commit:

<img src="/images/2007/08/17/doh.png" width="500" height="375" alt="Doh" />

Cool, huh?

<h2>Installation</h2>

```bash
wget http://matthewtodd.org/svn/public/doh/bin/doh
```

And then create an alias, you know the drill:

```bash
alias svn='/full/path/to/doh'
```

<h2>Usage</h2>

Most of the time <code>doh</code> just does "<code>exec 'svn', *ARGV</code>", so it's safe as your full-time <code>svn</code> wrapper. It only kicks in if "<code>ci</code>" is one of the command-line arguments, and only then if there are unadded files in the current directory.

To temporarily override <code>doh</code>'s behavior and commit anyway, just prefix the <code>svn</code> with a backslash:

```bash
\svn ci -m "don't worry, I know what I'm doing"
```

<h2>Feedback</h2>

I'd love to hear if you decide to give <code>doh</code> a try---or if there's some built-in way to achieve the same goal in Subversion! I'll be glad to turn this into a gem if there's any demand for it.

Enjoy!
