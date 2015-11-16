Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  root 'home#index'
  namespace :v1 do
    defaults format: 'json' do
      resources :meetings
    end
  end
end
