---
title: VMware Networking
layout: post
---

<p>VMware Fusion lets you choose the <em>style</em> of network offered to your Guest OSes (NAT, bridged, private), but it doesn't let you pick the actual addresses. So, you're stuck with 192.168.0.0/24 and 172.16.73.0/24.</p>

<p>Unless you drop down to the shell:</p>

<h3>Changing the Default Network Addresses</h3>

{% highlight bash %}
cd /Library/Application Support/VMware Fusion
sudo ./boot.sh --stop        # bring down the vmnet interfaces
sudo vi locations            # <-- THE MAGIC HAPPENS HERE
sudo ./vmware-config-net.pl  # re-generate files in vmnet1/ and vmnet8/
sudo ./boot.sh --start       # bring the vmnet interfaces back up
{% endhighlight %}

<h3>Spelunking</h3>

<p>If you'd like to read more, start with <tt>/Library/LaunchDaemons/com.vmware.launchd.vmware.plist</tt>, which has <tt>/Library/Application Support/VMware Fusion/boot.sh</tt> run when your system comes up.</p>
