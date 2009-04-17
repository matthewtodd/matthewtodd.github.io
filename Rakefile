task :default => :build

desc 'Build the website.'
task :build do
  jekyll
  sh 'cp', 'website/.htaccess', 'public/'
end

desc 'Delete the generated website.'
task :clean do
  sh 'rm', '-rf', 'public'
end

desc 'Publish the website.'
task :publish => :build do
  sh 'rsync', '--recursive', 'public/', 'woodward:web/public'
end

desc 'Serve the website on localhost:3000.'
task :reserve do
  jekyll '--auto', '--server', '3000'
end

desc 'Serve the website on localhost:3000.'
task :serve do
  jekyll '--server', '3000'
end

def jekyll(*args)
  sh 'jekyll', 'website', 'public', '--pygments', *args
end
