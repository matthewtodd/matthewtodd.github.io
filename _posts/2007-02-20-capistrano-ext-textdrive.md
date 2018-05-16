---
title: capistrano-ext-textdrive
layout: post
---
I've finally found a workable set of deployment practices for getting my little rails apps up and running in shared hosting at TextDrive. None of the actual mechanics are particularly en vogue these days -- I'm just using plain old lighttpd with external fcgi processes.

What is kind of fun, though, is that I've reduced almost all of the duplication across my deploy.rb files, so now they look like this:

```ruby
require 'capistrano/ext/textdrive'

set :application, 'reading'
set :domain,      'matthewtodd.org'
```

This is exceedingly pleasing to me, because these are the only 2 settings I'd ever change from app to app---precisely what belongs in an application-specific configuration file.

Herewith, a description of the behavior that `require` line provides:

<h3>textdrive_configure_lighttpd</h3>
Run this once for your account.

<ul>
<li>creates lighttpd configuration file and supporting directory structure for virtual hosts, logs and PID files</li>
<li>writes an rc.d start/stop/restart script for lighttpd, and a crontab entry to run it at server startup</li>
</ul>

[code](http://matthewtodd.org/svn/public/capistrano-ext-textdrive/lib/capistrano/ext/textdrive/recipes/lighttpd.rb)

<h3>textdrive_after_setup</h3>
Run this once for your application. <a href="http://matthewtodd.org/svn/public/capistrano-ext-textdrive/lib/capistrano/ext/textdrive/recipes/hooks.rb">An after_setup task</a> has been defined to call this automatically, but if you write your own, you'll clobber it---see <a href="http://matthewtodd.org/svn/public/capistrano-ext-textdrive/test/multiple_after_tasks_test.rb">this test case</a> -- so be sure to call textdrive\_after\_setup if you write a custom after\_setup task.

<ul>
<li>creates an empty mysql database named <code>"#{user}_#{application}"</code> and writes <code>"#{shared_path}/database.yml"</code> referencing it</li>
<li>writes an rc.d start/stop/restart script for the application and a crontab entry to run it at server startup</li>
<li>writes a lighttpd virtual host configuration and restarts lighttpd</li>
<li><a href="{{ "/2006/10/13/htaccess-goodness.html" | absolute_url }}">configures apache</a> to proxy requests for <code>"#{application}.#{domain}</code> to lighttpd</li>
</ul>

[code](http://matthewtodd.org/svn/public/capistrano-ext-textdrive/lib/capistrano/ext/textdrive/recipes/setup.rb)

<h3>textdrive_after_update_code</h3>
Run this every time you deploy. An after\_update\_code convenience task has been defined just as above, with the same clobberability caveats.

<ul>
<li>create symlinks to <code>"#{shared_path}/database.yml"</code> and <code>"#{shared_path}/sockets"</code> from the appropriate places under <code>"#{release_path}"</code></li>
</ul>

[code](http://matthewtodd.org/svn/public/capistrano-ext-textdrive/lib/capistrano/ext/textdrive/recipes/deploy.rb)

<h2>If you'd like to try it out</h2>

This code's packaged as a gem, but I haven't released it anywhere yet. So:

```bash
svn export http://matthewtodd.org/svn/public/capistrano-ext-textdrive
cd capistrano-ext-textdrive
rake install
```

And then your deploy.rb is going to need a few more lines than mine, since I made the defaults fit my needs and tastes. It will probably end up looking something like this:

```ruby
require 'capistrano/ext/textdrive'

set :application,   YOUR_APPLICATION
set :domain,        YOUR_DOMAIN
set :user,          YOUR_USERNAME
set :lighttpd_port, YOUR_LIGHTTPD_PORT
set :repository,    YOUR_REPOSITORY_PATH
```

Do be sure to read through the gem code first to understand what it's doing -- I expect things will generally work fine, but it would be a shame to run into trouble with it.

<h3>A few notes</h3>
One last unautomated bit is that you'll need to set <a href="http://httpd.apache.org/docs/2.2/mod/mod_proxy.html#proxypreservehost"><code>ProxyPreserveHost On</code></a> for each Apache virtual host into which you're deploying rails apps this way. (See steps 10-12 in <a href="http://help.textdrive.com/index.php?pg=kb.page&amp;id=255">this bit of TextDrive documentation</a>.)

Most of this approach comes from <a href="http://help.textdrive.com/index.php?pg=kb.chapter&amp;id=71">Installing a Rails Application at TextDrive</a>, in the TextDrive knowledge base.

See also <a href="http://nubyonrails.com/pages/shovel">Shovel</a>, from Geoffrey Grosenbach.
