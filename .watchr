# $server contains server.
# vim: ft=ruby

ENV['NODE_ENV'] = 'development'

def quit_server
  return unless $server
  puts "Attempting to kill #{$server}"
  Process.kill('TERM', $server)
  Process.wait($server, Process::WNOHANG)
end

def run_server
  quit_server if $server
  $server = fork do
    system('make')
    #Dir.chdir(ENV['DIST'])
    exec('make server-only')
  end
end

watch('^src') do |_|
  run_server
end

run_server

Signal.trap('QUIT') do
  quit_server
end

Signal.trap('INT') do
  quit_server
end
