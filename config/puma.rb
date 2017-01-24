threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }.to_i
threads threads_count, threads_count

port 3000

environment ENV.fetch("RAILS_ENV") { "development" }
preload_app!

rackup DefaultRackup
bind "unix:///tmp/nginx.socket"

# Allow puma to be restarted by `rails restart` command.
plugin :tmp_restart
plugin :heroku

on_worker_fork do
  FileUtils.touch('/tmp/app-initialized')
end