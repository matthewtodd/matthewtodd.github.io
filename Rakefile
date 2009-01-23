task :default => :build

desc 'Build the website.'
task :build => :clean do
  jekyll
end

desc 'Delete the generated website.'
task :clean do
  sh 'rm -rf public'
end

desc 'Publish the website.'
task :publish => :build do
  puts_and_run('rsync', '--recursive', 'public/', 'woodward:web/public')
end

desc 'Serve the website on localhost:3000.'
task :serve do
  jekyll '--auto', '--server', '3000'
end

def jekyll(*args)
  puts_and_run('jekyll', 'website', 'public', '--pygments', *args)
end

def puts_and_run(*args)
  puts(args.join(' '))
  sh(*args)
end
