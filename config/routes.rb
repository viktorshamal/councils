Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'v1/auth'
  root 'home#index'
  namespace :v1 do
    defaults format: 'json' do
      resources :meetings do
        resources :users, shallow: true
      end

      resources :documents do
        resources :paragraphs, shallow: true
      end

      resources :meeting_templates
      resources :paragraphs, only: [:create, :destroy]
      resources :councils, only: [:index]

      get 'paragraphs/:id/previous' => 'paragraphs#previous_version'
      post 'paragraphs/:id/accept' => 'paragraphs#accept'
      post 'attendances' => 'attendances#create'
    end
  end
end
