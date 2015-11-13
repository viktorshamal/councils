Rails.application.routes.draw do
  resources :meetings
  root 'home#index'
end
