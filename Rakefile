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
  sh 'curl http://feedburner.google.com/fb/a/pingSubmit?bloglink=http%3A%2F%2Fmatthewtodd.org%2Ffeed.atom'
end

desc 'Serve the website locally'
task :serve do
  require 'webrick'
  server = WEBrick::HTTPServer.new(:Port => 3000, :DocumentRoot => 'public')
  thread = Thread.new { server.start }
  trap('INT') { server.shutdown }
  thread.join()
end
