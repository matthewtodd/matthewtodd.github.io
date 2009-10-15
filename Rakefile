task :default => :build

desc 'Build the website.'
task :build do
  jekyll
end

desc 'Delete the generated website.'
task :clean do
  sh 'rm', '-rf', 'public'
end

desc 'Publish the website.'
task :publish => :build do
  sh 'rsync', '--recursive', '--delete', 'public/', 'woodward:web/public'
  sh 'curl', 'http://feedburner.google.com/fb/a/pingSubmit?bloglink=http%3A%2F%2Fmatthewtodd.org%2Ffeed.atom'
end

desc 'Serve the website on localhost:3000.'
task :reserve do
  jekyll '--auto', '--server'
end

desc 'Serve the website on localhost:3000.'
task :serve do
  jekyll '--server'
end

def jekyll(*args)
  sh 'bin/jekyll', 'app', 'public', *args
end
