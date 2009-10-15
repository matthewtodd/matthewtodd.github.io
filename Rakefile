desc 'Remove ignored files'
task :clean do
  sh 'git clean -fdX'
end

desc 'Publish the website'
task :publish do
  sh 'bin/jekyll app public'
  sh 'rsync --recursive --delete public/ woodward:web/public'
  sh 'curl http://feedburner.google.com/fb/a/pingSubmit?bloglink=http%3A%2F%2Fmatthewtodd.org%2Ffeed.atom'
end
