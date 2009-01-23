task :default => :build

desc 'Build the website.'
task :build => :clean do
  jekyll
end

desc 'Delete the generated website.'
task :clean do
  sh 'rm -rf public'
end

desc 'Serve the website on localhost:3000.'
task :serve => :clean do
  jekyll '--auto', '--server', '3000'
end

def jekyll(*args)
  puts_and_run('jekyll', 'website', 'public', '--pygments', *args)
end

def puts_and_run(*args)
  puts(args.join(' '))
  sh(*args)
end
