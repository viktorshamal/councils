Rails.application.routes.draw do
  root 'home#index'
  namespace :v1 do
    defaults format: 'json' do
      resources :meetings
    end
  end
end
