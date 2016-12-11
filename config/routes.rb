Rails.application.routes.draw do
  root 'home#index'

  get 'meetings', to: 'v1/meetings#index'
  mount_devise_token_auth_for 'User', at: 'v1/auth'
  namespace :v1 do
    defaults format: 'json' do
      resources :meetings do
        resources :users, shallow: true
        resources :attendances, shallow: true
      end

      get 'tokens/:id' => 'attendances#token'

      resources :users

      resources :documents do
        resources :paragraphs, shallow: true
      end

      resources :meeting_templates
      resources :paragraphs, only: [:create, :destroy]
      resources :councils, only: [:index]
      resources :roles

      delete 'roles' => 'roles#destroy'

      get 'paragraphs/:id/previous' => 'paragraphs#previous_version'
      post 'paragraphs/:id/accept' => 'paragraphs#accept'
    end
  end
end
