desc 'Remove ignored files'
task :clean do
  sh 'rm -rf public'
end

desc 'Build the website'
task :default => :clean do
  sh 'script/jekyll --pygments'
end

desc 'Publish the website'
task :publish => :default do
  sh 'rsync --recursive --delete public/ woodward:web/public'
  sh 'curl --head http://feedburner.google.com/fb/a/pingSubmit?bloglink=http://matthewtodd.org/feed.atom'
end
