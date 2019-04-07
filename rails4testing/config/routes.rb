Rails.application.routes.draw do
  resources :foods do
    resources :flavors
  end
  resources :flavors
  post 'user_token' => 'user_token#create'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
