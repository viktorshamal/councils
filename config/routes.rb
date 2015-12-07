Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'v1/auth'
  root 'home#index'
  namespace :v1 do
    defaults format: 'json' do
      resources :meetings do
        resources :users, shallow: true
      end
      resources :attendances
      resources :documents
    end
  end
end
