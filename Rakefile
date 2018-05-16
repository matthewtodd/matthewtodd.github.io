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
