source 'https://rubygems.org'

#server
ruby '2.2.1'
gem 'rails', '4.2.4'
gem 'pg'
gem 'thin'
gem 'rack-cors'
gem 'active_model_serializers', :git => 'https://github.com/rails-api/active_model_serializers.git'
gem 'paper_trail', '~> 4.0.0'

#front-end
gem 'bower-rails'
gem 'angular-rails-templates'
gem 'sprockets', '2.12.3'

#pre-processing
gem 'haml'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc

#assets
gem 'google-api-client', '0.9.pre4'

source 'https://rails-assets.org' do
  gem 'rails-assets-tether', '>= 1.1.0'
end

#account
gem 'devise'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'
gem 'devise_token_auth'
gem 'pundit'
gem 'rolify'
gem 'foreman'

group :production, :staging do
  gem 'newrelic_rpm'
  gem 'rails_12factor'
  gem 'rails_stdout_logging'
  gem 'rails_serve_static_assets'
end

group :test, :development do
  gem 'figaro'
  gem 'rspec-rails', '~> 2.0'
  gem 'factory_girl_rails', '~> 4.0'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'selenium-webdriver'
  gem 'byebug'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
