function githubCallback(data) {
  var repositories = data.user.repositories;
  var repositoryFragments = new Array(repositories.length);
  for (var i=0; i < repositories.length; i++) {
    repositoryFragments[i] = "<li><a href=\"" + repositories[i].url + "\">" + repositories[i].name + "</a></li>";
  }
  document.getElementById("github_repository_list").innerHTML = repositoryFragments.sort().join("");
}

function twitterCallback(tweets) {
  var tweetFragments = new Array(tweets.length);
  for (var i=0; i < tweets.length; i++) {
    tweetFragments[i] = "<li>" + tweets[i].text + " <a href=\"http://twitter.com/" + tweets[i].user.screen_name + "/statuses/" + tweets[i].id + "\">" + relativeTime(tweets[i].created_at) + "</a></li>";
  }
  document.getElementById("twitter_update_list").innerHTML = tweetFragments.join("");
}

function relativeTime(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return "less than a minute ago";
  } else if(delta < 120) {
    return "about a minute ago";
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + " minutes ago";
  } else if(delta < (120*60)) {
    return "about an hour ago";
  } else if(delta < (24*60*60)) {
    return "about " + (parseInt(delta / 3600)).toString() + " hours ago";
  } else if(delta < (48*60*60)) {
    return "1 day ago";
  } else {
    return (parseInt(delta / 86400)).toString() + " days ago";
  }
}
