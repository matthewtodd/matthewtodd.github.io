---
title: Default Association Attributes in ActiveRecord
layout: post
---

I cringe a little bit when I see a controller like this:

```ruby
class Admin::Subscribers::InvitationsController < Admin::ApplicationController
  before_filter :load_subscriber
  before_filter :build_invitation, :only => [:new, :create]

  def build_invitation
    @invitation = @subscriber.invitations.build(params[:invitation])
    @invitation.email = @subscriber.email # *shudder*
  end
end
```

While it's almost okay, it irks me to have to explicitly set the Invitations's email address in the controller[^1][^2].

## An Insight

What I really want is to set the email address _when I make an Invitation for a Subscriber_. There should only be two ways to say that:

```ruby
@subscriber.invitations.build
@subscriber.invitations.create
```

## A Solution

So, let's place the responsibility for setting the Invitation's email address directly inside the Subscriber's `has_many` association:

```ruby
class Subscriber < ActiveRecord::Base
  has_many :invitations, :as => :source, :extend => DefaultAssociationAttributes do
    def default_attributes
      { :email => proxy_owner.email }
    end
  end
end

module DefaultAssociationAttributes
  def build_record(attrs, &block)
    super(with_default_attributes(attrs), &block)
  end

  def create_record(attrs, &block)
    super(with_default_attributes(attrs), &block)
  end

  def with_default_attributes(attrs)
    default_attributes.merge((attrs || {}).symbolize_keys)
  end
end
```

And then clean up our controller:

```ruby
class Admin::Subscribers::InvitationsController < Admin::ApplicationController
  before_filter :load_subscriber
  before_filter :build_invitation, :only => [:new, :create]

  def build_invitation
    @invitation = @subscriber.invitations.build(params[:invitation])
  end
end
```

## Feedback?

I'm feeling pretty happy with this idea, so I'm thinking I'll keep the code around and maybe throw a small gem up on GitHub.

**UPDATE**: The gem's now in my GitHub account as [default\_association\_attributes](http://github.com/matthewtodd/default_association_attributes).

I may have missed another solution though, so I'd love to hear from you---how have you solved this problem? How have you felt about your solution?

[^1]: Having Invitation hang onto its own email address allows it to be re-used in non-Subscriber contexts---like when a User wants to create an Invitation for a friend.

[^2]: Somehow, using a custom method like `Subscriber#build_invitation_with_email` doesn't feel much better---then I have to remember to use it instead of the default.
