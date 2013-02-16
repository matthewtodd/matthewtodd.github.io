desc 'Start a new post'
task :new, :title do |task, args|
  if args.title
    require 'date'
    filename = "_posts/#{Date.today}-#{args.title.downcase.gsub(/\W/, '-')}.markdown"
    File.open(filename, 'w') do |stream|
      stream.puts('---')
      stream.puts("title: #{args.title}")
      stream.puts('layout: post')
      stream.puts('---')
      stream.puts
      stream.puts
    end
    sh "vim #{filename}"
  else
    abort 'Please specify a title.'
  end
end

desc 'Publish the website'
task :publish do
  sh 'which pygmentize'
  sh 'rm -rf _site'
  sh 'jekyll --no-auto --no-server --pygments --url http://matthewtodd.org'
  sh 'rsync --recursive --progress --delete --exclude=downloads _site/ college:web/public'
  sh 'curl --head http://feedburner.google.com/fb/a/pingSubmit?bloglink=http://matthewtodd.org/feed.atom'
end
