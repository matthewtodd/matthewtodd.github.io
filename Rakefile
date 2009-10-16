desc 'Remove ignored files'
task :clean do
  sh 'git clean -fdX'
end

desc 'Build the website'
task :default do
  sh 'rm -rf public'
  sh 'bin/jekyll app public --lsi --pygments'
end

desc 'Publish the website'
task :publish => :default do
  sh 'rsync --recursive --delete public/ woodward:web/public'

  require 'net/http'
  require 'uri'
  feedburner_ping_uri       = URI.parse('http://feedburner.google.com/fb/a/pingSubmit')
  feedburner_ping_uri.query = "bloglink=#{URI.escape('http://matthewtodd.org/feed.atom')}"
  Net::HTTP.get(feedburner_ping_uri)
end

desc 'Serve the website locally'
task :serve do
  require 'webrick'
  server = WEBrick::HTTPServer.new(:Port => 3000, :DocumentRoot => 'public')
  thread = Thread.new { server.start }
  trap('INT') { server.shutdown }
  thread.join
end
